import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';

const styles = StyleSheet.create({
  confirm: {
    flexDirection: 'row',
    paddingTop: 30,
    paddingBottom: 30,
    borderColor: '#c8c8c8',
    width: '90%',
    borderBottomWidth: 0.5,
  },
  confirmTitle: {
    width: '30%',
    marginRight: 20,
    fontSize: 16,
  },
  confirmValue: {
    fontSize: 16,
    width: '60%',
  },
  required: {
    color: '#EB5757',
    fontSize: 12,
    height: 20,
    marginRight: 10,
    padding: 3,
    fontWeight: 'bold',
    borderWidth: 1,
    borderColor: '#EB5757',
  },
  optional: {
    color: '#4682b4',
    fontSize: 12,
    height: 20,
    marginRight: 10,
    padding: 3,
    fontWeight: 'bold',
    borderWidth: 1,
    borderColor: '#4682b4',
  },
});

type Props = {
  title: string;
  item: string;
  required?: boolean;
};

const FormConfirm: FC<Props> = ({ title, item, required }) => {
  return (
    <View style={styles.confirm}>
      {required ? (
        <Text style={styles.required}>必須</Text>
      ) : (
        <Text style={styles.optional}>任意</Text>
      )}
      <Text style={styles.confirmTitle}>{title}</Text>
      <Text style={styles.confirmValue}>{item}</Text>
    </View>
  );
};

export default FormConfirm;
