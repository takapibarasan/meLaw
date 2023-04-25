import { useNavigation } from '@react-navigation/core';
import React, { FC } from 'react';
import { Linking, ScrollView, StyleSheet } from 'react-native';
import { ListItem, Text } from 'react-native-elements';
import auth from '@react-native-firebase/auth';

const styles = StyleSheet.create({
  buttonTitle: {
    color: '#535353',
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 5,
  },
  title: {
    color: '#535353',
    fontSize: 16,
    marginTop: 30,
    marginLeft: 10,
    marginBottom: 10,
  },
});

const HelpScreen: FC = () => {
  const navigation = useNavigation();

  return (
    <ScrollView>
      <Text style={styles.title}>アカウント</Text>
      <ListItem
        bottomDivider
        onPress={async () => {
          navigation.navigate('月額プランに登録');
        }}
        hasTVPreferredFocus
        tvParallaxProperties
      >
        <ListItem.Content>
          <ListItem.Title style={styles.buttonTitle}>プラン登録</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron tvParallaxProperties />
      </ListItem>
      <ListItem
        bottomDivider
        onPress={async () => {
          navigation.navigate('プラン解約');
        }}
        hasTVPreferredFocus
        tvParallaxProperties
      >
        <ListItem.Content>
          <ListItem.Title style={styles.buttonTitle}>プラン解約</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron tvParallaxProperties />
      </ListItem>
      <ListItem
        bottomDivider
        onPress={async () => {
          auth().signOut();
        }}
        hasTVPreferredFocus
        tvParallaxProperties
      >
        <ListItem.Content>
          <ListItem.Title style={styles.buttonTitle}>
            サインアウト
          </ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron tvParallaxProperties />
      </ListItem>
      <Text style={styles.title}>その他</Text>
      <ListItem
        bottomDivider
        onPress={async () => {
          navigation.navigate('よくあるご質問');
        }}
        hasTVPreferredFocus
        tvParallaxProperties
      >
        <ListItem.Content>
          <ListItem.Title style={styles.buttonTitle}>
            よくあるご質問
          </ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron tvParallaxProperties />
      </ListItem>
      <ListItem
        bottomDivider
        onPress={async () => {
          Linking.openURL('https://www.latamo.net/#contact').catch((err) =>
            console.error('URLを開けませんでした。', err),
          );
        }}
        hasTVPreferredFocus
        tvParallaxProperties
      >
        <ListItem.Content>
          <ListItem.Title style={styles.buttonTitle}>
            お問い合わせ
          </ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron tvParallaxProperties />
      </ListItem>
      <ListItem
        bottomDivider
        onPress={async () => {
          Linking.openURL('https://www.latamo.net/terms-of-use/').catch((err) =>
            console.error('URLを開けませんでした。', err),
          );
        }}
        hasTVPreferredFocus
        tvParallaxProperties
      >
        <ListItem.Content>
          <ListItem.Title style={styles.buttonTitle}>利用規約</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron tvParallaxProperties />
      </ListItem>
      <ListItem
        bottomDivider
        onPress={async () => {
          Linking.openURL('https://www.latamo.net/privacy-policy/').catch(
            (err) => console.error('URLを開けませんでした。', err),
          );
        }}
        hasTVPreferredFocus
        tvParallaxProperties
      >
        <ListItem.Content>
          <ListItem.Title style={styles.buttonTitle}>
            プライバシーポリシー
          </ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron tvParallaxProperties />
      </ListItem>
    </ScrollView>
  );
};

export default HelpScreen;
