import React, { FC, useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { FAB, Image } from 'react-native-elements';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import storage, { FirebaseStorageTypes } from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const EvidenceScreen: FC = () => {
  const [images, setImage] = useState<string[]>([]);
  const [count, setCount] = useState(0);

  const user = auth().currentUser;

  const reference = storage().ref('');
  useEffect(() => {
    listFilesAndDirectories(reference).then(() => {
      console.log('Finished listing');
    });
  }, [count]);

  const listFilesAndDirectories = (reference, pageToken) => {
    setImage([]);
    return reference.list({ pageToken }).then((result) => {
      // Loop over each item
      result.items.forEach(async (ref) => {
        const image = await ref.getDownloadURL();
        if (user && ref.fullPath.indexOf(user.uid) !== -1) {
          setImage((images) => [...images, image]);
        }
      });

      if (result.nextPageToken) {
        return listFilesAndDirectories(reference, result.nextPageToken);
      }

      return Promise.resolve();
    });
  };

  const pickImage = () => {
    launchImageLibrary(
      {
        mediaTypes: 'photo',
      },
      async (response) => {
        if (!response.didCancel) {
          const image = response.assets[0].uri;
          console.log(image);
          const reference = storage().ref(
            user?.uid + '_' + String(images.length) + '.png',
          );
          if (typeof image === 'string') {
            const task = reference.putFile(image);
            task.on('state_changed', (taskSnapshot) => {
              console.log(
                `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
              );
            });
            task.then(() => {
              console.log('Image uploaded to the bucket!');
              setCount((count) => count + 1)
            });
          }
        }
      },
    );
  };

  return (
    <View
      style={{
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
      }}
    >
      {images.map((item) => (
        <Image
          source={{
            uri: item,
          }}
          style={{ width: 130, height: 130 }}
          onPress={() => {}}
        />
      ))}
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
    </View>
  );
};

export default EvidenceScreen;
