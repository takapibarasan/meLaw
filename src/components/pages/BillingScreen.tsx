import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  FC,
} from 'react';
import {
  EmitterSubscription,
  Platform,
  AppState,
  AsyncStorage,
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import RNIap, {
  InAppPurchase,
  SubscriptionPurchase,
  finishTransaction,
  purchaseErrorListener,
  purchaseUpdatedListener,
  Subscription,
  PurchaseError,
  getReceiptIOS,
  validateReceiptIos,
  IAPErrorCode,
} from 'react-native-iap';
import { default as RNFirestore } from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import firebase from 'firebase/app';
import 'firebase/firestore';

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    backgroundColor: 'white',
    alignItems: 'center',
  },
  image: {
    width: 60,
    height: 60,
    tintColor: '#EB5757',
  },
  text: {
    fontWeight: 'bold',
    color: '#535353',
    fontSize: 20,
  },
  title: {
    fontWeight: 'bold',
    color: '#EB5757',
    fontSize: 34,
    marginTop: 14,
    marginLeft: 12,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 40,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#EB5757',
    marginBottom: 50,
    width: '80%',
    padding: 8,
    marginTop: 40,
  },
  buttonTitle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  buttonSubtitle: {
    color: 'white',
    marginTop: 6,
  },
  description: {
    color: '#535353',
    fontSize: 16,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
  },
});

let purchaseUpdateSubscription: EmitterSubscription;
let purchaseErrorSubscription: EmitterSubscription;

const itemSubs = Platform.select({
  default: ['org.reactjs.native.example.purin.autoSubscription.plan1'],
});

const IAPContext = createContext<IAPContext>({
  isSubscription: false,
  subscription: undefined,
});

const checkReceipt = async (user: string | undefined, docId: string) => {
  let isValidated = false;
  const receipt = await AsyncStorage.getItem('receipt');

  if (receipt) {
    const newReceipt = await getReceiptIOS();
    const validated = await validateReceiptIos(
      {
        'receipt-data': newReceipt,
        password: '78a14ffb7693460bb7cf8b76755589ea',
      },
      __DEV__,
    );
    const data = {
      receipt: getReceiptIOS(),
      user: user,
      validated: validated,
      updatedAt: firebase.firestore.Timestamp.now(),
    };
    if (docId !== '') {
      RNFirestore().collection('receipts').doc(docId).update(data);
    } else {
      RNFirestore().collection('receipts').add(data);
    }

    if (validated !== false && validated.status === 0) {
      isValidated = true;
      AsyncStorage.setItem('receipt', newReceipt);
    } else {
      isValidated = false;
      AsyncStorage.removeItem('receipt');
    }
  }
  return isValidated;
};

const BillingScreen: FC = () => {
  const win = Dimensions.get('window');
  const user = auth().currentUser;
  const [docId, setDocId] = useState<string>('');
  const [isSubscription, setIsSubscription] = useState<boolean>(false);
  const [subscription, setSubscription] = useState<Subscription | undefined>(
    undefined,
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const _checkReceipt = async () => {
    setIsLoading(true);
    const isValidated = await checkReceipt(user?.uid, docId);
    setIsSubscription(isValidated);
    setIsLoading(false);
  };

  const _requestSubscription = () => {
    if (subscription) {
      RNIap.requestSubscription(subscription.productId);
    }
  };

  const _restorePurchases = () => {
    RNIap.getAvailablePurchases()
      .then((purchases) => {
        console.debug('restorePurchases');
        let receipt = purchases[0].transactionReceipt;
        if (Platform.OS === 'android' && purchases[0].purchaseToken) {
          receipt = purchases[0].purchaseToken;
        }
        AsyncStorage.setItem('receipt', receipt);
        setIsSubscription(true);
      })
      .catch((err) => {
        console.debug('restorePurchases');
        console.error(err);
        setIsSubscription(false);
        AsyncStorage.removeItem('receipt');
      });
  };

  const _initIAP = useCallback(async (): Promise<void> => {
    RNIap.clearProductsIOS();

    purchaseUpdateSubscription = purchaseUpdatedListener(
      (purchase: InAppPurchase | SubscriptionPurchase) => {
        console.debug('purchaseUpdatedListener');
        const receipt =
          Platform.OS === 'ios'
            ? purchase.transactionReceipt
            : purchase.purchaseToken;
        if (receipt) {
          finishTransaction(purchase)
            .then(() => {
              AsyncStorage.setItem('receipt', receipt);
              setIsSubscription(true);
            })
            .catch(() => {
              setIsSubscription(false);
            });
        }
      },
    );

    purchaseErrorSubscription = purchaseErrorListener(
      (error: PurchaseError) => {
        console.debug('purchaseErrorListener');
        console.error(error);
        if (error.code !== 'E_USER_CANCELLED') {
        }
      },
    );

    const subscriptions = await RNIap.getSubscriptions(itemSubs);
    setSubscription({
      ...subscriptions[0],
    });
  }, []);

  const handleAppStateChange = (nextAppState: string): void => {
    if (nextAppState === 'active') {
      _checkReceipt();
    }
  };

  const loadReceipt = async () => {
    await RNFirestore()
      .collection('receipts')
      .where('user', '==', user?.uid)
      .orderBy('updatedAt')
      .get()
      .then(async (querySnapshot) => {
        await querySnapshot.docs.map((doc) => {
          setDocId(doc.id);
        });
      });
  };
  useEffect(() => {
    loadReceipt();
    _initIAP();
    _restorePurchases();
    AppState.addEventListener('change', handleAppStateChange);
  }, []);

  return (
    <IAPContext.Provider
      value={{
        isSubscription,
        subscription,
      }}
    >
      <ScrollView
        style={
          isLoading
            ? {
                backgroundColor: 'white',
                opacity: 0.6,
              }
            : {
                backgroundColor: 'white',
              }
        }
      >
        <View style={styles.wrapper}>
          {isLoading ? (
            <ActivityIndicator
              size="large"
              style={{
                position: 'absolute',
                right: win.width / 2 - 20,
                bottom: 0,
              }}
            />
          ) : null}
          <View style={styles.container}>
            <Image
              style={styles.image}
              source={require('../../images/melaw.png')}
            />
            <Text style={styles.title}>meLaw</Text>
          </View>
          <Text style={styles.text}>少額訴訟のフローを確認し、</Text>
          <Text style={styles.text}>必要書類を作成しましょう</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={async () => {
              if (!isLoading) {
                setIsLoading(true);
                await _requestSubscription();
                setIsLoading(false);
              }
            }}
          >
            <Text style={styles.buttonTitle}>月額プランに登録</Text>
            <Text style={styles.buttonSubtitle}>1,800円(税込)/月</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.description}>
          無料プランでは「貸金返還請求」のみ利用できますが、
          月額プランでは以下の6類型について、
          請求・訴訟フローの確認と書類作成・保存機能を利用できます。
        </Text>
        <Text style={styles.description}>
          1. Twitterで受けた誹謗中傷に対する慰謝料請求
          {'\n'}2. 情報商材詐欺における返金請求
          {'\n'}3. 未払いの賃金請求
          {'\n'}4. 未払いの売買代金請求
          {'\n'}5. 敷金返還請求
          {'\n'}6. 交通事故による物損に基づく損害賠償請求
        </Text>
        <Text style={styles.description}>
          「Twitterで受けた誹謗中傷に対する慰謝料請求」については、
          内容証明郵便・訴状の作成だけでなく、
          IPアドレスの開示～加害者の特定も合わせてサポートしています。
        </Text>
      </ScrollView>
    </IAPContext.Provider>
  );
};

export default BillingScreen;
