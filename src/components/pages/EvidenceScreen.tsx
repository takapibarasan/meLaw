import React, { FC, useState, useEffect } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { FAB } from 'react-native-elements';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

const EvidenceScreen: FC = () => {
  const win = Dimensions.get('window');
  const navigation = useNavigation();
  const [images, setImage] = useState<
    {
      url: string;
      imageId: string;
    }[]
  >([]);
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const user = auth().currentUser;

  useEffect(() => {
    listFilesAndDirectories();
  }, []);

  const listFilesAndDirectories = async () => {
    setImage([]);

    if (user) {
      await storage()
        .ref('')
        .child(user.uid)
        .listAll()
        .then((res) => {
          res.items.forEach((itemRef) => {
            itemRef.getDownloadURL().then((url) => {
              setImage((images) => [
                ...images,
                { url: url, imageId: itemRef.name.replace('.png', '') },
              ]);
            });
          });
        })
        .catch((error) => {
          // Uh-oh, an error occurred!
        });
    }
  };

  const pickImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
      },
      async (response) => {
        if (!response.didCancel && response.assets && user) {
          const image = response.assets[0].uri;
          let imageCount = 0;
          let docId = '';
          await firestore()
            .collection('users')
            .where('user', '==', user.uid)
            .get()
            .then((querySnapshot) => {
              querySnapshot.docs.map((doc) => {
                imageCount = doc.data().imageCount;
                docId = doc.id;
              });
            });
          const reference = storage()
            .ref()
            .child(user.uid + '/' + String(imageCount + 1) + '.png');
          if (typeof image === 'string') {
            const task = reference.putFile(image);
            task.on('state_changed', (taskSnapshot) => {
              setIsLoading(true);
              console.log(
                `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
              );
            });
            task.then(() => {
              console.log('Image uploaded to the bucket!');
              setIsLoading(false);
              listFilesAndDirectories();
              setCount((count) => count + 1);
            });
            await firestore()
              .collection('images')
              .add({
                user: user?.uid,
                imageId: String(imageCount + 1),
                description: '',
              });
            if (docId === '') {
              await firestore()
                .collection('users')
                .add({
                  user: user.uid,
                  imageCount: imageCount + 1,
                });
            } else {
              await firestore()
                .collection('users')
                .doc(docId)
                .update({
                  user: user.uid,
                  imageCount: imageCount + 1,
                });
            }
          }
        }
      },
    );
  };

  return (
    <>
      <View
        style={{
          flex: 1,
          width: '100%',
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}
      >
        {isLoading ? (
          <ActivityIndicator
            size="large"
            style={{
              position: 'absolute',
              right: win.width / 2 - 20,
              bottom: '50%',
            }}
          />
        ) : null}
        {images.map((image) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('証拠詳細', {
                imageId: image.imageId,
              })
            }
            style={{ width: '33.33%', height: '20%' }}
          >
            <Image
              source={{
                uri: image.url,
              }}
              style={{ width: '100%', height: '100%' }}
            />
          </TouchableOpacity>
        ))}
      </View>
      <FAB
        size="large"
        color="#EB5757"
        style={{
          position: 'absolute',
          right: 16,
          bottom: 16,
        }}
        icon={{
          name: 'add',
          size: 25,
          color: 'white',
        }}
        onPress={() => pickImage()}
      />
    </>
  );
};

export default EvidenceScreen;
