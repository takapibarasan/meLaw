import React, { FC } from 'react';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Text, StyleSheet, Linking } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'white',
    paddingLeft: 20,
    paddingRight: 20,
  },
  title: {
    fontSize: 20,
    marginTop: 20,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
  link: {
    fontSize: 16,
    color: '#202f55',
    marginBottom: 5,
  },
  number: {
    fontSize: 18,
  },
});

type RootStackParamList = {
  Home: undefined;
  Profile: { constant: string; variable: string; id: string };
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

const OtherDocumentsScreen = ({ route, navigation }: Props) => {
  const { constant, variable, id } = route.params;
  return (
    <ScrollView style={styles.wrapper}>
      {variable == 'その他書類の準備（仮処分命令）' ? (
        <>
          <Text style={styles.title}>
            ①　本件投稿記事（誹謗中傷を受けた投稿）
          </Text>
          <Text style={styles.text}>
            (1) 投稿内容 (2) 投稿日時 (3)
            投稿画面のURLが表示されている画面を打ち出す必要があります。
            {'\n'}
            １度の仮処分申立の中で、複数のアカウント・複数の投稿に対する申立てが可能ですので、名誉棄損にあたる投稿は、削除される前に保存しておきましょう。
            {'\n'}
            問題のツイートをそれぞれ印刷します。{'\n'}
            以下の手順で、投稿日時及び本件投稿記事のURLが見える形で印刷してください。
            {'\n\n'}
            1. Twitterを開き、問題のツイートの共有ボタンをクリック
            {'\n'}
            2. ツイートのリンクをコピーする
            {'\n'}
            3. コピーしたリンクをブラウザにペーストして開く
            {'\n'}
            4. 該当ツイートのアドレスが入った状態で、PDF保存し、印刷
          </Text>
          <Text style={styles.title}>②　Twitter社の資格証明書とその翻訳文</Text>
          <Text style={styles.text}>
            アメリカ版の登記簿謄本にあたります。アメリカから直接取寄せると数ヶ月かかり、ログの保存期間切れとなる可能性が高いため、販売している国内の法律事務所や業者から購入しましょう。
            {'\n'}
            Googleなどの検索エンジンにて「Twitter資格証明書翻訳文」などで調べると、見つけることができます。
          </Text>
          <Text style={styles.title}>③　Whois検索結果</Text>
          <Text
            style={styles.link}
            onPress={() =>
              Linking.openURL('https://tech-unlimited.com/whois.html').catch(
                (err) => console.error('URLを開けませんでした。', err),
              )
            }
          >
            https://tech-unlimited.com/whois.html
          </Text>
          <Text style={styles.text}>
            上記リンクより「twitter.com」を検索し、検索結果の画面を印刷します。
            また、申立人（ご自身）が法人であれば法人の登記簿謄本も必要となりますのでご用意ください。
          </Text>
        </>
      ) : (
        <></>
      )}
      {variable == 'その他書類の準備（発信者情報開示請求）' ? (
        <>
          <Text style={styles.title}>①　公的書類の写し</Text>
          <Text style={styles.text}>
            個人の場合は運転免許証、パスポート等本人を確認できる公的書類の写しを、法人の場合は資格証明書を添付してください。
          </Text>
          <Text style={styles.title}>②　印鑑証明書</Text>
          <Text style={styles.text}>
            発信者情報開示請求書が被害者本人が作成したものであるということを示すために、捺印した印鑑の印鑑証明書を添付しましょう。
          </Text>
          <Text style={styles.title}>③　誹謗中傷を受けた証拠</Text>
          <Text style={styles.text}>
            TwitterへIPアドレスへ開示請求した際、甲２号証「本件投稿記事」として用意した証拠を送ります。
            以下に改めて、作成方法を記載します。投稿日時及び本件投稿記事のURLが見える形で印刷してください。
            {'\n\n'}
            1. Twitterを開き、問題のツイートの共有ボタンをクリック
            {'\n'}
            2. ツイートのリンクをコピーする
            {'\n'}
            3. コピーしたリンクをブラウザにペーストして開く
            {'\n'}
            4. 該当ツイートのアドレスが入った状態で、PDF保存し、印刷{'\n\n'}
            また、発信者情報開示請求書の（注６）に記載がありますが、プロバイダにおいて使用するもの及び発信者への意見照会用の各２部を用意して、送付ください。
          </Text>
          <Text style={styles.title}>④　IPアドレスを証明する書類</Text>
          <Text style={styles.text}>
            Twitterより送付されたIPアドレスに関するメールを印刷し、添付します。`
          </Text>
        </>
      ) : (
        <></>
      )}
    </ScrollView>
  );
};

export default OtherDocumentsScreen;
