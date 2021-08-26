import React, { FC, useEffect, useState } from 'react';
import { Text, CheckBox } from 'react-native-elements';
import { View, TextInput } from 'react-native';
import Date from '../../molecules/Date';
import DelayedDamage from '../../molecules/DelayedDamage';
import SecurityDepositTemplate from '../ContentsCertificatedMail/SecurityDeposit';
import { styles } from '../../../styles/form';

const SecurityDeposit: FC = () => {
  return (
    <>
      <SecurityDepositTemplate />
      <DelayedDamage />
      <CheckBox title="仮執行の有無" />
      <Text style={styles.label}>契約日</Text>
      <Date />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>賃貸物件の所在</Text>
        <Text style={styles.required}>必須</Text>
      </View>
      <TextInput
        style={styles.textInputWide}
        placeholder="◯◯県◯◯市◯◯町◯丁目◯番◯号"
      />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>
          賃貸物件の名称（アパート名等）及び棟室番号
        </Text>
        <Text style={styles.required}>必須</Text>
      </View>
      <TextInput
        style={styles.textInputWide}
        placeholder="◯◯アパート　203号室"
      />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>賃借期間</Text>
        <Text style={styles.optional}>任意</Text>
      </View>
      <View style={{ flexDirection: 'row', marginLeft: 20 }}>
        <TextInput
          style={styles.numberInput}
          maxLength={3}
          keyboardType="numeric"
        />
        <Text style={styles.text}>年</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>敷金返還についての約定</Text>
        <Text style={styles.optional}>任意</Text>
      </View>
      <TextInput
        style={styles.textInputWide}
        placeholder="建物明渡しの1ヶ月後に返還する。"
      />
      <Text style={styles.label}>賃貸借契約終了日</Text>
      <Date />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>参考情報</Text>
        <Text style={styles.optional}>任意</Text>
      </View>
      <TextInput
        style={styles.textarea}
        placeholder="被告は、敷金をリフォーム費用に充当したので、返すべき敷金はないと言って支払おうとしない。"
        multiline={true}
      />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>添付書類</Text>
        <Text style={styles.optional}>任意</Text>
      </View>
      <CheckBox title="賃貸借契約書" />
      <CheckBox title="登記事項証明書（商業登記簿謄本）" />
      <CheckBox title="内容証明郵便" />
      <CheckBox title="配達証明書" />
      <CheckBox title="敷金領収書" />
    </>
  );
};

export default SecurityDeposit;
