import React, { FC, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image as RNImage } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import storage from '@react-native-firebase/storage';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { Image, Button } from 'react-native-elements';
import { Dimensions } from 'react-native';

type RootStackParamList = {
  Home: undefined;
  Profile: { imageId: string };
  Feed: { sort: 'latest' | 'top' } | undefined;
};

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'Profile'>;

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Profile'
>;

type Props = {
  route: ProfileScreenRouteProp;
  navigation: ProfileScreenNavigationProp;
};

const EvidenceDetailScreen = ({ route, navigation }: Props) => {
  const win = Dimensions.get('window');
  const [height, setHeight] = useState<number>(0);

  const { imageId } = route.params;
  const user = auth().currentUser;

  const [description, setDescription] = useState<string>('');
  const [descriptionEdited, setDescriptionEdited] = useState<string>('');
  const [url, setUrl] = useState<string>('');
  const [docId, setDocId] = useState<string>('');
  const [checked, setChecked] = useState<boolean>(false);
  const loadImage = async () => {
    if (user) {
      await firestore()
        .collection('images')
        .where('user', '==', user.uid)
        .where('imageId', '==', imageId)
        .get()
        .then((querySnapshot) => {
          querySnapshot.docs.map((doc) => {
            setDescription(doc.data().description);
            setDescriptionEdited(doc.data().description);
            setDocId(doc.id);
          });
        });
      await storage()
        .ref()
        .child(user.uid)
        .child(imageId + '.png')
        .getDownloadURL()
        .then(async (url) => {
          await setUrl(url);
          RNImage.getSize(url, (width, height) => {
            setHeight(height * (win.width / width));
            console.log(height);
            console.log(width);
            return { width, height };
          });
        });
    }
  };

  const updateImageDescription = (description: string) => {
    firestore().collection('images').doc(docId).update({
      user: user?.uid,
      imageId: imageId,
      description: description,
    });
  };

  useEffect(() => {
    loadImage();
  }, []);
  return (
    <ScrollView
      style={{ width: '100%', height: '100%', backgroundColor: 'white' }}
    >
      {url !== '' ? (
        <>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
            <Button
              buttonStyle={{
                backgroundColor: '#EB5757',
                width: 100,
                marginBottom: 10,
                marginRight: 10,
                marginTop: 10,
              }}
              containerStyle={{}}
              titleStyle={{ fontSize: 16 }}
              onPress={() => {
                if (checked) {
                  updateImageDescription(descriptionEdited);
                  setDescription(descriptionEdited);
                }
                setChecked(!checked);
              }}
              title={checked ? '完了' : 'メモの編集'}
            />
          </View>
          <View style={{ width: '100%' }}>
            <Image
              source={{ uri: url }}
              style={{ width: '100%', height: height }}
            />
          </View>
          <View style={{ flexDirection: 'row', margin: 20 }}>
            {checked ? (
              <TextInput
                onChangeText={(value) => setDescriptionEdited(value)}
                style={{
                  height: 160,
                  fontSize: 16,
                  paddingVertical: 12,
                  paddingHorizontal: 10,
                  borderWidth: 1,
                  borderColor: '#789',
                  borderRadius: 4,
                  color: '#789',
                  paddingRight: 30,
                  width: win.width - 40,
                }}
                multiline={true}
                value={descriptionEdited}
              />
            ) : (
              <Text
                style={{
                  marginTop: 3,
                  fontSize: 16,
                }}
              >
                {description === '' ? 'メモを追加' : description}
              </Text>
            )}
          </View>
        </>
      ) : null}
    </ScrollView>
  );
};

export default EvidenceDetailScreen;
