import React, { FC } from 'react';
import { Text, Button } from 'react-native-elements';
import { StyleSheet, View, ScrollView } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import {
  snsConfirmData,
  trafficAccidentConfirmData,
  lendMoneyConfirmData,
  securityDepositConfirmData,
  tradingValueConfirmData,
  salaryConfirmData,
  informationConfirmData,
  Confirm,
} from '../../data/confirms';

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'white',
    padding: 20,
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    marginTop: 20,
    marginBottom: 30,
  },
  content: {
    fontSize: 16,
    marginBottom: 20,
  },
  nextButtonWrapper: {
    width: '30%',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#EB5757',
    height: 45,
  },
});

type RootStackParamList = {
  Home: undefined;
  Profile: { constant: string; variable: string };
  Feed: { sort: 'latest' | 'top' } | undefined;
};

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'Profile'>;

type Props = {
  route: ProfileScreenRouteProp;
};

type TemplateProps = {
  confirmData: Confirm;
  screen: string;
  variable: string;
};

const PreRequestTemplate: FC<TemplateProps> = ({
  confirmData,
  screen,
  variable,
}) => {
  const navigation = useNavigation();
  return (
    <ScrollView contentContainerStyle={styles.wrapper}>
      <Text style={styles.header}>{confirmData.title}</Text>
      {confirmData.contents.map((item, i) => (
        <Text style={styles.content}>{item}</Text>
      ))}
      <View style={styles.nextButtonWrapper}>
        <Button
          title="次へ"
          type="solid"
          raised
          onPress={() => {
            navigation.navigate(screen, {
              type: variable,
            });
          }}
          buttonStyle={styles.button}
        />
      </View>
    </ScrollView>
  );
};

const PreRequestScreen: FC<Props> = ({ route }: Props) => {
  const { constant, variable } = route.params;
  return (
    <>
      {variable == '誹謗中傷' ? (
        <PreRequestTemplate
          confirmData={snsConfirmData}
          screen="慰謝料請求をしましょう"
          variable={variable}
        />
      ) : (
        <></>
      )}
      {variable == '返金請求' ? (
        <PreRequestTemplate
          confirmData={informationConfirmData}
          screen="返金請求をしましょう"
          variable={variable}
        />
      ) : (
        <></>
      )}
      {variable == '損害賠償請求' ? (
        <PreRequestTemplate
          confirmData={trafficAccidentConfirmData}
          screen="損害賠償請求をしましょう"
          variable={variable}
        />
      ) : (
        <></>
      )}
      {variable == '敷金返還請求' ? (
        <PreRequestTemplate
          confirmData={securityDepositConfirmData}
          screen="敷金返還請求をしましょう"
          variable={variable}
        />
      ) : (
        <></>
      )}
      {variable == '売買代金請求' ? (
        <PreRequestTemplate
          confirmData={tradingValueConfirmData}
          screen="売買代金請求をしましょう"
          variable={variable}
        />
      ) : (
        <></>
      )}
      {variable == '給料請求' ? (
        <PreRequestTemplate
          confirmData={salaryConfirmData}
          screen="給料請求をしましょう"
          variable={variable}
        />
      ) : (
        <></>
      )}
      {variable == '貸金返還請求' ? (
        <PreRequestTemplate
          confirmData={lendMoneyConfirmData}
          screen="貸金返還請求をしましょう"
          variable={variable}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default PreRequestScreen;
