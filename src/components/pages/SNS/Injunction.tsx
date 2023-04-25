import React, { FC, useEffect, useState } from 'react';
import { Button, Icon, Text, CheckBox } from 'react-native-elements';
import { ScrollView, TextInput, TouchableOpacity, View } from 'react-native';
import { default as RNFirestore } from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Name from '../../molecules/Name';
import Address from '../../molecules/Address';
import Alert from '../../molecules/Alert';
import DateTemplate from '../../molecules/InjunctionDate';
import {
  styles,
  pickerSelectStylesWide,
  pickerSelectStylesTextarea,
} from '../../../styles/form';
import PhoneNumber from '../../molecules/PhoneNumber';
import RNPickerSelect from 'react-native-picker-select';
import firebase from 'firebase/app';
import 'firebase/firestore';
import _, { template } from 'lodash';
import { InjunctionSNS, blankInjunctionSNS } from '../../../models/injunction';
import { useNavigation } from '@react-navigation/native';
import { RadioButton } from 'react-native-paper';

type Props = {
  type: string;
  caseId: string;
};

const infringementTypes = [
  { label: '名誉感情の侵害', value: 1 },
  { label: '名誉毀損', value: 2 },
];
const Injunction: FC<Props> = ({ type, caseId }) => {
  const navigation = useNavigation();
  const [docId, setDocId] = useState<string>('');
  const [docIds, setDocIds] = useState<string[]>([]);
  const [isHidden, setIsHidden] = useState<boolean>(true);
  const [alerts, setAlerts] = useState<string[]>([]);
  const [posts, setPosts] = useState<
    {
      url: string;
      accountId: string;
      postedDate: firebase.firestore.Timestamp | null;
      postedHour: string;
      postedMinute: string;
      infringementType: number;
      identifiabilityType: number;
      post: string;
      updatedAt: firebase.firestore.Timestamp | null;
      createdAt: firebase.firestore.Timestamp | null;
    }[]
  >([
    {
      url: '',
      accountId: '',
      postedDate: null,
      postedHour: '',
      postedMinute: '',
      infringementType: 1,
      identifiabilityType: 1,
      post: '',
      updatedAt: null,
      createdAt: firebase.firestore.Timestamp.now(),
    },
  ]);
  const ref = RNFirestore().collection('injunction');
  const user = auth().currentUser;

  const sns: InjunctionSNS = _.cloneDeep({
    ...blankInjunctionSNS,
    caseId: caseId,
    user: user?.uid,
    createdAt: firebase.firestore.Timestamp.now(),
  });

  const validateForm = () => {
    const blankForms: string[] = [];
    if (sns.name === '') blankForms.push('氏名');
    if (sns.postCode === '') blankForms.push('郵便番号');
    if (sns.prefecture === '') blankForms.push('都道府県');
    if (sns.city === '') blankForms.push('市区町村・番地');
    posts.map((item, i) => {
      if (item.url === '')
        blankForms.push(
          '誹謗中傷(' + String(i + 1) + 'つ目)に該当する投稿のURL',
        );
      if (item.accountId === '')
        blankForms.push(
          '誹謗中傷(' +
            String(i + 1) +
            'つ目)に該当する投稿をしたアカウントのID',
        );
      if (
        item.postedDate === null ||
        item.postedHour === '' ||
        item.postedMinute === ''
      )
        blankForms.push(
          '誹謗中傷(' + String(i + 1) + 'つ目)に該当する投稿の投稿日時',
        );
      if (item.post === '')
        blankForms.push('誹謗中傷(' + String(i + 1) + 'つ目)の投稿内容');
    });

    setAlerts(blankForms);
    if (blankForms.length === 0) return true;
    return false;
  };

  const addDoc = async () => {
    const data = {
      ...sns,
      updatedAt: firebase.firestore.Timestamp.now(),
      type: 1,
    };
    await RNFirestore()
      .collection('injunction')
      .orderBy('updatedAt', 'desc')
      .where('caseId', '==', caseId)
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.map((doc, i) => {
          if (i === 0) setDocId(doc.id);
        });
      });
    if (docId !== '') {
      const docRef = RNFirestore().collection('injunction').doc(docId);
      await docRef.update(data);
    } else {
      await ref.add(data);
    }
    if (docIds.length > 0) {
      await posts.map((item, i) => {
        if (docIds.length < i)
          RNFirestore()
            .collection('posts')
            .doc(docIds[i])
            .update({
              ...item,
              updatedAt: firebase.firestore.Timestamp.now(),
              caseId: caseId,
              index: i,
            });
        else
          RNFirestore()
            .collection('posts')
            .add({
              ...item,
              updatedAt: firebase.firestore.Timestamp.now(),
              caseId: caseId,
              index: i,
            });
      });
    } else {
      await posts.map((item, i) => {
        RNFirestore()
          .collection('posts')
          .add({ ...item, caseId: caseId, index: i });
      });
    }
  };

  let setName: React.Dispatch<React.SetStateAction<string>>;
  [sns.name, setName] = useState<string>('');
  let setPostCode: React.Dispatch<React.SetStateAction<string>>;
  [sns.postCode, setPostCode] = useState<string>('');
  let setPrefecture: React.Dispatch<React.SetStateAction<string>>;
  [sns.prefecture, setPrefecture] = useState<string>('');
  let setCity: React.Dispatch<React.SetStateAction<string>>;
  [sns.city, setCity] = useState<string>('');
  let setBuilding: React.Dispatch<React.SetStateAction<string>>;
  [sns.building, setBuilding] = useState<string>('');
  let setPhoneNumber: React.Dispatch<React.SetStateAction<string>>;
  [sns.phoneNumber, setPhoneNumber] = useState<string>('');

  const loadDocument = async () => {
    await RNFirestore()
      .collection('injunction')
      .orderBy('updatedAt', 'desc')
      .where('caseId', '==', caseId)
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.map((doc, i) => {
          if (i === 0) {
            setDocId(doc.id);
            const data = doc.data();
            setName(data.name);
            setPostCode(data.postCode);
            setPrefecture(data.prefecture);
            setCity(data.city);
            setBuilding(data.building);
            setPhoneNumber(data.phoneNumber);
          }
        });
      });
    await RNFirestore()
      .collection('posts')
      .where('caseId', '==', caseId)
      .orderBy('index')
      .orderBy('updatedAt')
      .get()
      .then(async (querySnapshot) => {
        const newPosts = _.cloneDeep(posts);
        await querySnapshot.docs.map((doc) => {
          setDocIds([...docIds, doc.id]);
          const data = doc.data();
          const newPost = {
            url: data.url,
            accountId: data.accountId,
            postedDate: data.postedDate,
            postedHour: data.postedHour,
            postedMinute: data.postedMinute,
            infringementType: data.infringementType,
            identifiabilityType: data.identifiabilityType,
            post: data.post,
            updatedAt: data.updatedAt,
            createdAt: data.createdAt,
          };
          if (newPosts.length > data.index) {
            newPosts[data.index] = newPost;
          } else {
            newPosts.push(newPost);
          }
        });
        setPosts(newPosts);
      });
  };

  useEffect(() => {
    loadDocument();
  }, []);
  return (
    <ScrollView style={styles.wrapper}>
      <Text style={styles.title}>必要事項を入力しましょう</Text>
      <Text style={styles.description}>
        あなた（債権者）の情報を入力しましょう
      </Text>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>氏名</Text>
        <Text style={styles.required}>必須</Text>
      </View>
      <Name name={sns.name} setName={setName} />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>住所</Text>
        <Text style={styles.required}>必須</Text>
      </View>
      <Address
        postCode={sns.postCode}
        prefecture={sns.prefecture}
        city={sns.city}
        building={sns.building}
        setPostCode={setPostCode}
        setPrefecture={setPrefecture}
        setCity={setCity}
        setBuilding={setBuilding}
      />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>電話番号</Text>
        <Text style={styles.optional}>任意</Text>
      </View>
      <PhoneNumber
        phoneNumber={sns.phoneNumber}
        setPhoneNumber={setPhoneNumber}
      />
      {posts.map((item, i) => {
        return (
          <>
            <Text style={styles.description}>
              誹謗中傷({i + 1}つ目)に関する情報を入力しましょう
            </Text>
            <Text style={styles.inputDescription}>
              誹謗中傷したアカウントごとではなく、誹謗中傷されたツイートごとに情報を記載ください。
            </Text>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.label}>誹謗中傷に該当する投稿のURL</Text>
              <Text style={styles.required}>必須</Text>
            </View>
            <Text style={styles.inputDescription}>
              問題のツイートの共有ボタンをタップし、ツイートのリンクをコピーして貼り付けてください。
            </Text>
            <TextInput
              style={styles.textInputWide}
              onChangeText={(value) => {
                const newPosts = _.cloneDeep(posts);
                newPosts[i].url = value;
                setPosts(newPosts);
              }}
              value={item.url}
            />
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.label}>
                誹謗中傷に該当する投稿をしたアカウントのID
              </Text>
              <Text style={styles.required}>必須</Text>
            </View>
            <TextInput
              style={styles.textInput}
              onChangeText={(value) => {
                const newPosts = _.cloneDeep(posts);
                newPosts[i].accountId = value;
                setPosts(newPosts);
              }}
              value={item.accountId}
            />
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.label}>誹謗中傷に該当する投稿の投稿日時</Text>
              <Text style={styles.required}>必須</Text>
            </View>
            <Text style={styles.inputDescription}>
              時間は0〜24時で記載ください。
            </Text>
            <DateTemplate posts={posts} setPosts={setPosts} index={i} />
            <View
              style={{ flexDirection: 'row', marginTop: 20, marginLeft: 10 }}
            >
              <TextInput
                style={styles.numberInputNarrow}
                onChangeText={(value) => {
                  const newPosts = _.cloneDeep(posts);
                  newPosts[i].postedHour = value;
                  setPosts(newPosts);
                }}
                value={item.postedHour}
                maxLength={2}
              />
              <Text style={[styles.inputLabel, { marginLeft: 0 }]}>時</Text>
              <TextInput
                style={styles.numberInputNarrow}
                onChangeText={(value) => {
                  const newPosts = _.cloneDeep(posts);
                  newPosts[i].postedMinute = value;
                  setPosts(newPosts);
                }}
                value={item.postedMinute}
                maxLength={2}
              />
              <Text style={[styles.inputLabel, { marginLeft: 0 }]}>分頃</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.label}>侵害の種類</Text>
              <Text style={styles.required}>必須</Text>
            </View>
            <Text style={styles.inputDescription}>
              名誉感情（死ね、等の侮辱）か、名誉毀損（「詐欺をしている」など、虚偽の事実摘示）かでフォーマットが異なりますので、
              適切な方を選択ください。
            </Text>
            <RNPickerSelect
              onValueChange={(value) => {
                const newPosts = _.cloneDeep(posts);
                newPosts[i].infringementType = value;
                setPosts(newPosts);
              }}
              items={infringementTypes}
              style={pickerSelectStylesWide}
              value={item.infringementType}
            />
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.label}>同定可能性がある理由</Text>
              <Text style={styles.required}>必須</Text>
            </View>
            <Text style={styles.inputDescription}>
              問題のツイートに同定可能性（誹謗中傷の相手があなたを指している可能性）がある理由を選択ください。
            </Text>
            <RadioButton.Item
              labelStyle={{ fontSize: 14 }}
              value=""
              label="債権者（あなた）の実名が記載されている"
              status={item.identifiabilityType === 1 ? 'checked' : 'unchecked'}
              onPress={() => {
                const newPosts = _.cloneDeep(posts);
                newPosts[i].identifiabilityType = 1;
                setPosts(newPosts);
              }}
            />
            <RadioButton.Item
              labelStyle={{ fontSize: 14 }}
              value=""
              label="債権者（あなた）を特定することができる社会的な肩書きが記載されている"
              status={item.identifiabilityType === 2 ? 'checked' : 'unchecked'}
              onPress={() => {
                const newPosts = _.cloneDeep(posts);
                newPosts[i].identifiabilityType = 2;
                setPosts(newPosts);
              }}
            />
            <RadioButton.Item
              labelStyle={{ fontSize: 14 }}
              value=""
              label="債権者（あなた）のハンドルネームが記載されており、本ハンドルネームから実際に誰を指すか周囲が認識できるほどに浸透している"
              status={item.identifiabilityType === 3 ? 'checked' : 'unchecked'}
              onPress={() => {
                const newPosts = _.cloneDeep(posts);
                newPosts[i].identifiabilityType = 3;
                setPosts(newPosts);
              }}
            />
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.label}>投稿内容</Text>
              <Text style={styles.required}>必須</Text>
            </View>
            <Text style={styles.inputDescription}>
              問題のツイートの全文を記載ください。
            </Text>
            <TextInput
              style={styles.textarea}
              onChangeText={(value) => {
                const newPosts = _.cloneDeep(posts);
                newPosts[i].post = value;
                setPosts(newPosts);
              }}
              value={item.post}
            />
          </>
        );
      })}
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
          style={styles.add}
          onPress={() => {
            setPosts([
              ...posts,
              {
                url: '',
                accountId: '',
                postedDate: null,
                postedHour: '',
                postedMinute: '',
                infringementType: 1,
                identifiabilityType: 1,
                post: '',
                updatedAt: null,
                createdAt: firebase.firestore.Timestamp.now(),
              },
            ]);
          }}
        >
          <Icon
            tvParallaxProperties
            hasTVPreferredFocus
            reverse
            size={12}
            color="#EB5757"
            name="add"
          />
          <Text style={styles.addLabel}>誹謗中傷を追加</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.remove}
          onPress={() => {
            if (posts.length > 0) {
              setPosts(posts.slice(0, posts.length - 1));
            }
          }}
        >
          <Icon
            tvParallaxProperties
            hasTVPreferredFocus
            reverse
            size={12}
            color="#3399ff"
            name="remove"
          />
          <Text style={styles.removeLabel}>誹謗中傷を削除</Text>
        </TouchableOpacity>
      </View>
      {!isHidden ? <Alert alerts={alerts} /> : null}
      <Button
        title="保存"
        type="solid"
        buttonStyle={styles.button}
        raised
        onPress={async () => {
          const result = validateForm();
          setIsHidden(result);
          if (result) {
            await addDoc();
            navigation.navigate('仮処分命令申立書の確認', {
              constant: type,
              variable: '仮処分命令申立書',
              id: caseId,
            });
          }
        }}
      />
    </ScrollView>
  );
};

export default Injunction;
