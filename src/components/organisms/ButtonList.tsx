import { useNavigation } from '@react-navigation/native';
import React, { FC, useEffect, useState } from 'react';
import { Text, Icon, ListItem } from 'react-native-elements';
import { Menu } from '../../data/menus';
import { Alert, AsyncStorage, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { default as RNFirestore } from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { validateReceiptIos } from 'react-native-iap';

const styles = StyleSheet.create({
  number: {
    fontSize: 28,
    textAlign: 'center',
    color: 'white',
  },
  title: {
    color: '#535353',
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
  },
  outer: {
    height: 36,
    width: 36,
    borderRadius: 36,
    lineHeight: 36,
    textAlign: 'center',
    backgroundColor: '#EB5757',
  },
});

type Props = {
  buttons: Menu[];
  constant?: string;
  id?: string;
  isSubscription?: boolean;
};

const ButtonList: FC<Props> = ({ buttons, constant, id, isSubscription }) => {
  const navigation = useNavigation();

  const showAlert = () => {
    Alert.alert(
      '有料プランに登録しましょう',
      '「貸金返還請求」以外の類型は、有料プランに登録していただくことで利用可能となります',
      [
        { text: '今はしない', onPress: () => {}, style: 'cancel' },
        {
          text: 'プランを見る',
          onPress: () => {
            navigation.navigate('月額プランに登録');
          },
        },
      ],
      { cancelable: false },
    );
  };
  return (
    <ScrollView>
      {buttons.map((item, i) => (
        <ListItem
          key={i}
          bottomDivider
          onPress={async () => {
            if (
              !isSubscription &&
              constant == '' &&
              item.variable !== '貸金返還請求'
            ) {
              showAlert();
            } else {
              navigation.navigate(item.screen, {
                constant: constant,
                variable: item.variable,
                id: id,
              });
            }
            // }
          }}
          hasTVPreferredFocus
          tvParallaxProperties
        >
          {item.number ? (
            <View style={styles.outer}>
              <Text style={styles.number}>{item.number}</Text>
            </View>
          ) : (
            <></>
          )}
          <ListItem.Content>
            <ListItem.Title style={styles.title}>{item.title}</ListItem.Title>
            {item.subtitle ? (
              <ListItem.Subtitle style={styles.subtitle}>
                {item.subtitle}
              </ListItem.Subtitle>
            ) : (
              <></>
            )}
          </ListItem.Content>
          <ListItem.Chevron tvParallaxProperties />
        </ListItem>
      ))}
    </ScrollView>
  );
};

export default ButtonList;
