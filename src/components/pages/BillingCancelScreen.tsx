import React, { FC } from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking,
} from 'react-native';

const styles = StyleSheet.create({
  text: {
    margin: 20,
    fontSize: 16,
  },
  button: {
    borderRadius: 30,
    alignItems: 'center',
    backgroundColor: '#EB5757',
    width: '60%',
    padding: 18,
  },
  buttonTitle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  description: {
    fontSize: 14,
    margin: 20,
  },
});

const BillingCancelScreen: FC = () => {
  return (
    <View
      style={{
        backgroundColor: 'white',
        height: '100%',
        alignItems: 'center',
      }}
    >
      <Text style={styles.text}>
        月額プランの解約は、下記のApp
        Storeの定期購読から実施をお願いいたします。
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={async () => {
          Linking.openURL('https://apps.apple.com/account/subscriptions').catch(
            (err) => console.error('URLを開けませんでした。', err),
          );
        }}
      >
        <Text style={styles.buttonTitle}>App Store 定期購読</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BillingCancelScreen;
