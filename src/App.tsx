import 'react-native-gesture-handler';
import React, { FC, useState, useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeStackScreen from './navigations/HomeStackScreen';
import DocumentStackScreen from './navigations/DocumentStackScreen';
import EvidenceStackScreen from './navigations/EvidenceStackScreen';
import SettingsStackScreen from './navigations/SettingStackScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  View,
  Text,
  NativeModules,
  StyleSheet,
  Image,
  Linking,
} from 'react-native';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { twitterApp } from './config/twitter.json';
import { googleApp } from './config/google.json';
import { Button } from 'react-native-elements';
import firebase from 'firebase/app';
import { ScrollView } from 'react-native-gesture-handler';
import { appleAuth } from '@invertase/react-native-apple-authentication';
const { RNTwitterSignIn } = NativeModules;

firebase.initializeApp({
  apiKey: 'AIzaSyCe9VYyax8uql5U7caa-abUm0BTCskjXiA',
  authDomain: 'melaw-f6e92.firebaseapp.com',
  projectId: 'melaw-f6e92',
});

GoogleSignin.configure({
  webClientId: googleApp.webClientId,
});

RNTwitterSignIn.init(twitterApp.consumerKey, twitterApp.consumerSecret).then(
  () => console.log('Twitter SDK initialized'),
);

const Tab = createBottomTabNavigator();

async function onTwitterButtonPress() {
  // Perform the login request
  const { authToken, authTokenSecret } = await RNTwitterSignIn.logIn();

  // Create a Twitter credential with the tokens
  const twitterCredential = auth.TwitterAuthProvider.credential(
    authToken,
    authTokenSecret,
  );

  // Sign-in the user with the credential
  return auth().signInWithCredential(twitterCredential);
}

async function onGoogleButtonPress() {
  // Get the users ID token
  const { idToken } = await GoogleSignin.signIn();

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  // Sign-in the user with the credential
  return auth().signInWithCredential(googleCredential);
}

async function onAppleButtonPress() {
  // Start the sign-in request
  const appleAuthRequestResponse = await appleAuth.performRequest({
    requestedOperation: appleAuth.Operation.LOGIN,
    requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
  });

  // Ensure Apple returned a user identityToken
  if (!appleAuthRequestResponse.identityToken) {
    throw 'Apple Sign-In failed - no identify token returned';
  }

  // Create a Firebase credential from the response
  const { identityToken, nonce } = appleAuthRequestResponse;
  const appleCredential = auth.AppleAuthProvider.credential(
    identityToken,
    nonce,
  );

  // Sign the user in with the credential
  return auth().signInWithCredential(appleCredential);
}

function TwitterSignIn() {
  return (
    <Button
      icon={
        <Image
          style={{
            width: 20,
            height: 20,
          }}
          source={require('./images/twitter.png')}
        />
      }
      type="solid"
      containerStyle={styles.buttonContainer}
      buttonStyle={styles.twitterButton}
      titleStyle={styles.twitterButtonTitle}
      title="Twitterでサインイン"
      onPress={() =>
        onTwitterButtonPress().then(() =>
          console.log('Signed in with Twitter!'),
        )
      }
    />
  );
}

function GmailSignIn() {
  return (
    <Button
      icon={
        <Image
          style={{
            width: 20,
            height: 20,
          }}
          source={require('./images/gmail.png')}
        />
      }
      containerStyle={styles.buttonContainer}
      buttonStyle={styles.gmailButton}
      titleStyle={styles.gmailButtonTitle}
      title="Gmailでサインイン"
      onPress={() =>
        onGoogleButtonPress().then(() => console.log('Signed in with Google!'))
      }
    />
  );
}

function AppleSignIn() {
  return (
    <Button
      icon={<Ionicons name="logo-apple" color="white" size={24} />}
      type="solid"
      containerStyle={styles.buttonContainer}
      buttonStyle={styles.appleButton}
      titleStyle={styles.appleButtonTitle}
      title="Apple IDでサインイン"
      onPress={() =>
        onAppleButtonPress().then(() => console.log('Signed in with Apple ID!'))
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#c77f7f',
    minHeight: '100%',
    width: '100%',
    alignItems: 'center',
  },
  buttonWrapper: {
    position: 'absolute',
    top: '60%',
  },
  titleWrapper: {
    alignItems: 'center',
    marginBottom: 10,
    position: 'absolute',
    top: '15%',
  },
  title: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    letterSpacing: 4,
  },
  textWrapper: {
    position: 'absolute',
    top: '43%',
  },
  text: {
    color: 'white',
    fontSize: 20,
    letterSpacing: 1.3,
    fontWeight: 'bold',
  },
  description: {
    color: 'white',
    fontSize: 15,
  },
  regulations: {
    color: 'white',
    fontSize: 16,
    margin: 10,
    marginBottom: 40,
  },
  buttonContainer: {
    marginBottom: 20,
  },
  twitterButton: {
    backgroundColor: '#00acee',
    padding: 10,
    borderRadius: 20,
  },
  twitterButtonTitle: {
    width: '80%',
    fontSize: 18,
    fontWeight: 'bold',
  },
  gmailButton: {
    backgroundColor: '#DD5144',
    padding: 10,
    borderRadius: 20,
  },
  gmailButtonTitle: {
    width: '80%',
    fontSize: 18,
    fontWeight: 'bold',
  },
  appleButton: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 20,
  },
  appleButtonTitle: {
    color: 'white',
    width: '80%',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

const App: FC = () => {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  // Handle user state changes
  const onAuthStateChanged = (user) => {
    setUser(user);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>訴訟支援アプリ</Text>
            <Text style={styles.title}>meLaw</Text>
          </View>
          <Image
            style={{
              width: '33%',
              height: '16%',
              position: 'absolute',
              top: '24%',
            }}
            source={require('./images/melaw.png')}
          />
          <View style={styles.textWrapper}>
            <Text style={styles.text}>
              meLawは7つの訴訟類型について{'\n'}
              書類作成・証拠保存をサポートします
            </Text>
          </View>
          <View style={styles.buttonWrapper}>
            <TwitterSignIn />
            <GmailSignIn />
            <AppleSignIn />
          </View>
          <View
            style={{
              flexDirection: 'row',
              position: 'absolute',
              bottom: 0,
            }}
          >
            <Text
              style={styles.regulations}
              onPress={() =>
                Linking.openURL('https://www.latamo.net/terms-of-use/').catch(
                  (err) => console.error('URLを開けませんでした。', err),
                )
              }
            >
              利用規約
            </Text>
            <Text
              style={styles.regulations}
              onPress={() =>
                Linking.openURL('https://www.latamo.net/privacy-policy/').catch(
                  (err) => console.error('URLを開けませんでした。', err),
                )
              }
            >
              プライバシーポリシー
            </Text>
          </View>
        </View>
      </ScrollView>
    );
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === 'ホーム') {
                iconName = focused ? 'ios-home' : 'ios-home-outline';
              } else if (route.name === '書類') {
                iconName = focused ? 'ios-document' : 'ios-document-outline';
              } else if (route.name === '証拠') {
                iconName = focused ? 'ios-folder' : 'ios-folder-open';
              } else {
                iconName = focused ? 'help' : 'help-outline';
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
            headerShown: false,
          })}
        >
          <Tab.Screen name="ホーム" component={HomeStackScreen} />
          <Tab.Screen name="書類" component={DocumentStackScreen} />
          <Tab.Screen name="証拠" component={EvidenceStackScreen} />
          <Tab.Screen name="ヘルプ" component={SettingsStackScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
