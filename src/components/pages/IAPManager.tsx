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
} from 'react-native';
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

let purchaseUpdateSubscription: EmitterSubscription;
let purchaseErrorSubscription: EmitterSubscription;

const itemSubs = Platform.select({
  default: ['org.reactjs.native.example.purin.autoSubscription.plan1'],
});

const IAPContext = createContext<IAPContext>({
  isSubscription: false,
  subscription: undefined,
});

const checkReceipt = async () => {
  let isValidated = false;
  const receipt = await AsyncStorage.getItem('receipt');
  console.log(receipt);
  if (receipt) {
    const newReceipt = await getReceiptIOS();
    const validated = await validateReceiptIos(
      {
        'receipt-data': newReceipt,
        password: '78a14ffb7693460bb7cf8b76755589ea',
      },
      __DEV__,
    );

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

const IAPManager: FC = () => {
  const [isSubscription, setIsSubscription] = useState<boolean>(false);
  const [subscription, setSubscription] = useState<Subscription | undefined>(
    undefined,
  );

  const _checkReceipt = async () => {
    const isValidated = await checkReceipt();
    setIsSubscription(isValidated);
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

  useEffect(() => {
    _initIAP();
    _checkReceipt();
    AppState.addEventListener('change', handleAppStateChange);

    return (): void => {
      if (purchaseUpdateSubscription) {
        purchaseUpdateSubscription.remove();
      }
      if (purchaseErrorSubscription) {
        purchaseErrorSubscription.remove();
      }
      if (handleAppStateChange) {
        AppState.removeEventListener('change', handleAppStateChange);
      }
    };
  }, []);

  return (
    <IAPContext.Provider
      value={{
        isSubscription,
        subscription,
      }}
    >
      {children}
    </IAPContext.Provider>
  );
};

export default IAPManager;
