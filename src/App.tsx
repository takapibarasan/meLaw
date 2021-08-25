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
import { View, Text, Button, NativeModules } from 'react-native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { twitterApp } from './config/twitter.json';
const { RNTwitterSignIn } = NativeModules;

GoogleSignin.configure({
  webClientId: '',
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

function TwitterSignIn() {
  return (
    <Button
      title="Twitter Sign-In"
      onPress={() =>
        onTwitterButtonPress().then(() =>
          console.log('Signed in with Twitter!'),
        )
      }
    />
  );
}

const App: FC = () => {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <View>
        <Text>Login</Text>
        <Text>aaaaaaaaaaaaaa</Text>
        <TwitterSignIn />
      </View>
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
                iconName = focused ? 'ios-settings' : 'ios-settings';
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
          }}
        >
          <Tab.Screen name="ホーム" component={HomeStackScreen} />
          <Tab.Screen name="書類" component={DocumentStackScreen} />
          <Tab.Screen name="証拠" component={EvidenceStackScreen} />
          <Tab.Screen name="設定" component={SettingsStackScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
