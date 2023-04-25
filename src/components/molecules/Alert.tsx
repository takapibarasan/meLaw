import React, { FC } from 'react';
import { Dimensions, Text, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

type Props = {
  alerts: string[];
};
const Alert: FC<Props> = ({ alerts }) => {
  const win = Dimensions.get('window');
  return (
    <View
      style={{
        borderColor: '#EB5757',
        borderWidth: 1,
        padding: 16,
        marginLeft: 20,
        marginRight: 20,
        flexDirection: 'row',
        maxWidth: '100%',
        marginTop: 40,
      }}
    >
      <FontAwesome
        name="exclamation-circle"
        size={24}
        color="#EB5757"
        style={{ marginRight: 14 }}
      />
      <View style={{ width: win.width - 100 }}>
        <Text style={{ fontSize: 16 }}>
          保存できませんでした。以下の項目を確認し再度保存をお試しください。
        </Text>
        {alerts.map((alert) => (
          <Text style={{ fontSize: 16, marginTop: 10 }}>
            <Text style={{ fontSize: 10 }}>●</Text>　{alert}
            を入力してください
          </Text>
        ))}
      </View>
    </View>
  );
};

export default Alert;
