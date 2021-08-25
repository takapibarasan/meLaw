import { useNavigation } from '@react-navigation/native';
import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Icon, Text } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';

const styles = StyleSheet.create({
  buttonWrapper: {
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
    flexDirection: 'row',
  },
  buttonTitle: {
    color: '#EB5757',
    fontWeight: 'bold',
    fontSize: 18,
    margin: 8,
  },
  button: {
    margin: 20,
  },
  wrapper: {
    padding: 20,
  },
});

const HomeScreen: FC = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.wrapper}>
      <View style={styles.buttonWrapper}>
        <Button
          type="clear"
          icon={<Ionicons name="ios-document" color="#EB5757" size={24} />}
          title="新規書類作成"
          titleStyle={styles.buttonTitle}
          buttonStyle={styles.button}
          onPress={() => navigation.navigate('書類作成')}
        ></Button>
        <Button
          type="clear"
          icon={<Ionicons name="ios-folder" color="#EB5757" size={24} />}
          title="証拠の保存"
          titleStyle={styles.buttonTitle}
          buttonStyle={styles.button}
          onPress={() => navigation.navigate('証拠の保存')}
        ></Button>
      </View>
    </View>
  );
};

export default HomeScreen;
