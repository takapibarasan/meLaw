import React, { FC, useEffect, useState } from 'react';
import { Text } from 'react-native-elements';
import { View, TextInput } from 'react-native';
import Date from '../../molecules/Date';
import { styles } from '../../../styles/form';

const Information: FC = () => {
  return (
    <>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>会社名</Text>
        <Text style={styles.optional}>任意</Text>
      </View>
      <TextInput style={styles.textInputWide} />
      <Text style={styles.description}>
        契約条件に関する情報を入力しましょう{' '}
      </Text>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>サービス名</Text>
        <Text style={styles.required}>必須</Text>
      </View>
      <TextInput style={styles.textInputWide} />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>購入日</Text>
        <Text style={styles.required}>必須</Text>
      </View>
      <Date />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>購入金額</Text>
        <Text style={styles.required}>必須</Text>
      </View>
      <View style={{ flexDirection: 'row', marginLeft: 20 }}>
        <TextInput
          style={styles.numberInputWide}
          maxLength={3}
          keyboardType="numeric"
        />
        <Text style={styles.text}>円</Text>
      </View>
    </>
  );
};

export default Information;
