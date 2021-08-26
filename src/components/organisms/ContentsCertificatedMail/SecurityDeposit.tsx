import React, { FC, useEffect, useState } from 'react';
import { Text } from 'react-native-elements';
import { StyleSheet, View, TextInput } from 'react-native';
import Address from '../../molecules/Address';
import Date from '../../molecules/Date';
import { styles } from '../../../styles/form';

const SecurityDeposit: FC = () => {
  return (
    <>
      <Text style={styles.description}>
        賃貸条件に関する情報を入力しましょう
      </Text>
      <Address />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>賃料</Text>
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
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>管理費</Text>
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
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>敷金</Text>
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
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>退去日（物件を明け渡した日）</Text>
        <Text style={styles.required}>必須</Text>
      </View>
      <Date />
    </>
  );
};

export default SecurityDeposit;
