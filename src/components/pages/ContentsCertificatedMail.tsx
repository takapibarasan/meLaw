import React, { FC, useEffect, useState } from 'react';
import { Button, Text, Icon } from 'react-native-elements';
import { ScrollView, View, TextInput, Dimensions } from 'react-native';
import { default as RNFirestore } from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import LendMoney from '../organisms/ContentsCertificatedMail/LendMoney';
import TrafficAccident from '../organisms/ContentsCertificatedMail/TrafficAccident';
import SecurityDeposit from '../organisms/ContentsCertificatedMail/SecurityDeposit';
import TradingValue from '../organisms/ContentsCertificatedMail/TradingValue';
import Information from '../organisms/ContentsCertificatedMail/Information';
import Salary from '../organisms/ContentsCertificatedMail/Salary';
import SNS from '../organisms/ContentsCertificatedMail/SNS';
import Bank from '../molecules/Bank';
import Alert from '../molecules/Alert';
import PersonInfoInputForm from '../organisms/PersonInfoInputForm';
import { styles } from '../../styles/form';
import {
  ContentsCertifiedMailCommon,
  ContentsCertifiedMailSNS,
  ContentsCertifiedMailInformation,
  ContentsCertifiedMailSalary,
  ContentsCertifiedMailTradingValue,
  ContentsCertifiedMailSecurityDeposit,
  ContentsCertifiedMailTrafficAccident,
  ContentsCertifiedMailLendMoney,
  blankContentsCertifiedMailCommon,
  blankContentsCertifiedMailSNS,
  blankContentsCertifiedMailInformation,
  blankContentsCertifiedMailSalary,
  blankContentsCertifiedMailTradingValue,
  blankContentsCertifiedMailSecurityDeposit,
  blankContentsCertifiedMailTrafficAccident,
  blankContentsCertifiedMailLendMoney,
} from '../../models/contents-certified-mail';
import firebase from 'firebase/app';
import 'firebase/firestore';
import _ from 'lodash';
import { useNavigation } from '@react-navigation/native';

type Props = {
  type: string;
  caseId: string;
};

const ContentsCertificatedMail: FC<Props> = ({ type, caseId }) => {
  const navigation = useNavigation();
  const [docId, setDocId] = useState<string>('');
  const [isHidden, setIsHidden] = useState<boolean>(true);
  const [alerts, setAlerts] = useState<string[]>([]);
  const ref = RNFirestore().collection('contentsCertificatedMail');
  const user = auth().currentUser;

  const common: ContentsCertifiedMailCommon = _.cloneDeep({
    ...blankContentsCertifiedMailCommon,
    caseId: caseId,
    user: user?.uid,
    createdAt: firebase.firestore.Timestamp.now(),
  });
  const sns: ContentsCertifiedMailSNS = _.cloneDeep(
    blankContentsCertifiedMailSNS,
  );
  const information: ContentsCertifiedMailInformation = _.cloneDeep(
    blankContentsCertifiedMailInformation,
  );
  const salary: ContentsCertifiedMailSalary = _.cloneDeep(
    blankContentsCertifiedMailSalary,
  );
  const tradingValue: ContentsCertifiedMailTradingValue = _.cloneDeep(
    blankContentsCertifiedMailTradingValue,
  );
  const securityDeposit: ContentsCertifiedMailSecurityDeposit = _.cloneDeep(
    blankContentsCertifiedMailSecurityDeposit,
  );
  const trafficAccident: ContentsCertifiedMailTrafficAccident = _.cloneDeep(
    blankContentsCertifiedMailTrafficAccident,
  );
  const lendMoney: ContentsCertifiedMailLendMoney = _.cloneDeep(
    blankContentsCertifiedMailLendMoney,
  );

  const validateForm = () => {
    const blankForms = [];
    if (common.name === '') blankForms.push('氏名');
    if (common.postCode === '') blankForms.push('郵便番号');
    if (common.prefecture === '') blankForms.push('都道府県');
    if (common.city === '') blankForms.push('市区町村・番地');
    if (common.businessType === 2 && common.company === '')
      blankForms.push('会社名');
    if (common.oppositeName === '') blankForms.push('相手方の氏名');
    if (common.oppositePostCode === '') blankForms.push('相手方の郵便番号');
    if (common.oppositePrefecture === '') blankForms.push('相手方の都道府県');
    if (common.oppositeCity === '') blankForms.push('相手方の市区町村・番地');
    if (common.oppositeBusinessType === 2 && common.oppositeCompany === '')
      blankForms.push('相手方の会社名');

    if (type == '誹謗中傷') {
      if (sns.oppositeAccountName === '')
        blankForms.push('相手方のTwitterのアカウント名');
      if (
        sns.slanderStartYear === '' ||
        sns.slanderStartMonth === '' ||
        sns.slanderEndYear === '' ||
        sns.slanderEndMonth === ''
      )
        blankForms.push('誹謗中傷を受けた期間');
      if (sns.postedDate === null) blankForms.push('誹謗中傷1の投稿日時');
      if (sns.post === '') blankForms.push('誹謗中傷1の投稿内容');
      if (sns.postedDate2 === null) blankForms.push('誹謗中傷2の投稿日時');
      if (sns.post2 === '') blankForms.push('誹謗中傷2の投稿内容');
      if (sns.damageAmount === '') blankForms.push('損害賠償請求額');
    }
    if (type === '返金請求') {
      if (information.service === '') blankForms.push('購入した商品名');
      if (information.salesDate === null) blankForms.push('購入日');
      if (information.salesAmount === '') blankForms.push('購入金額');
    }
    if (type === '給料請求') {
      if (salary.workStartDate === null) blankForms.push('勤務開始日');
      if (
        salary.unpaidSalaryStartDate === null ||
        salary.unpaidSalaryEndDate === null
      )
        blankForms.push('給料未払期間');
      if (salary.unpaidSalary === '') blankForms.push('給料未払総額');
    }
    if (type === '売買代金請求') {
      if (tradingValue.product === '') blankForms.push('商品名と数量');
      if (tradingValue.salesDate === null) blankForms.push('販売日時');
      if (tradingValue.salesAmount === '') blankForms.push('販売金額');
    }
    if (type === '敷金返還請求') {
      if (securityDeposit.rentPostCode === '')
        blankForms.push('賃貸物件の郵便番号');
      if (securityDeposit.rentPrefecture === '')
        blankForms.push('賃貸物件の都道府県');
      if (securityDeposit.rentCity === '')
        blankForms.push('賃貸物件の市区町村・番地');
      if (securityDeposit.rent === '') blankForms.push('賃料');
      if (securityDeposit.depositAmount === '') blankForms.push('敷金');
      if (securityDeposit.leavingDate === null) blankForms.push('退去日');
    }
    if (type === '損害賠償請求') {
      if (
        trafficAccident.accidentDate === null ||
        trafficAccident.accidentHour === '' ||
        trafficAccident.accidentMinute === ''
      )
        blankForms.push('事故発生日時');
      if (trafficAccident.accidentLocation === '')
        blankForms.push('事故発生場所');
      if (trafficAccident.vehicleType === '')
        blankForms.push('あなたの車両の種類');
      if (trafficAccident.oppositeVehicleType === '')
        blankForms.push('相手方の車両の種類');
      if (trafficAccident.accidentReason === '') blankForms.push('事故の原因');
      if (
        trafficAccident.repairCost === '' &&
        trafficAccident.valuationLoss === '' &&
        trafficAccident.rentalCost === '' &&
        trafficAccident.replacementCost === '' &&
        trafficAccident.registrationExpenses === '' &&
        trafficAccident.suspensionLoss === ''
      )
        blankForms.push('損害');
    }
    if (type === '貸金返還請求') {
      if (lendMoney.loanAmount === '') blankForms.push('貸付金額');
      if (lendMoney.loanDate === null) blankForms.push('貸し付けた日付');
    }

    if (common.bank === '') blankForms.push('金融機関名');
    if (common.branch === '') blankForms.push('支店名');
    if (common.accountType === '') blankForms.push('口座種別');
    if (common.account === '') blankForms.push('口座番号');
    if (common.accountHolder === '') blankForms.push('口座名義人名');

    setAlerts(blankForms);
    if (blankForms.length === 0) return true;
    return false;
  };

  const addDoc = async () => {
    let data = {
      ...common,
      updatedAt: firebase.firestore.Timestamp.now(),
    };
    if (type === '誹謗中傷') {
      data = {
        ...data,
        ...sns,
        type: 1,
      };
    }
    if (type === '返金請求') {
      data = {
        ...data,
        ...information,
        type: 2,
      };
    }
    if (type === '給料請求') {
      data = {
        ...data,
        ...salary,
        type: 3,
      };
    }
    if (type === '売買代金請求') {
      data = {
        ...data,
        ...tradingValue,
        type: 4,
      };
    }
    if (type === '敷金返還請求') {
      data = {
        ...data,
        ...securityDeposit,
        type: 5,
      };
    }
    if (type === '損害賠償請求') {
      data = {
        ...data,
        ...trafficAccident,
        type: 6,
      };
    }
    if (type === '貸金返還請求') {
      data = {
        ...data,
        ...lendMoney,
        type: 7,
      };
    }
    if (data !== null) {
      await RNFirestore()
        .collection('contentsCertificatedMail')
        .orderBy('updatedAt', 'desc')
        .where('caseId', '==', caseId)
        .get()
        .then((querySnapshot) => {
          querySnapshot.docs.map((doc, i) => {
            if (i === 0) setDocId(doc.id);
          });
        });
      if (docId !== '') {
        const docRef = RNFirestore()
          .collection('contentsCertificatedMail')
          .doc(docId);
        await docRef.update(data);
      } else {
        await ref.add(data);
      }
    }
  };

  let setName: React.Dispatch<React.SetStateAction<string>>;
  [common.name, setName] = useState<string>('');
  let setPostCode: React.Dispatch<React.SetStateAction<string>>;
  [common.postCode, setPostCode] = useState<string>('');
  let setPrefecture: React.Dispatch<React.SetStateAction<string>>;
  [common.prefecture, setPrefecture] = useState<string>('');
  let setCity: React.Dispatch<React.SetStateAction<string>>;
  [common.city, setCity] = useState<string>('');
  let setBuilding: React.Dispatch<React.SetStateAction<string>>;
  [common.building, setBuilding] = useState<string>('');
  let setCompany: React.Dispatch<React.SetStateAction<string>>;
  [common.company, setCompany] = useState<string>('');
  let setPosition: React.Dispatch<React.SetStateAction<string>>;
  [common.position, setPosition] = useState<string>('');
  let setBusinessType: React.Dispatch<React.SetStateAction<number>>;
  [common.businessType, setBusinessType] = useState<number>(1);
  let setOppositeName: React.Dispatch<React.SetStateAction<string>>;
  [common.oppositeName, setOppositeName] = useState<string>('');
  let setOppositePostCode: React.Dispatch<React.SetStateAction<string>>;
  [common.oppositePostCode, setOppositePostCode] = useState<string>('');
  let setOppositePrefecture: React.Dispatch<React.SetStateAction<string>>;
  [common.oppositePrefecture, setOppositePrefecture] = useState<string>('');
  let setOppositeCity: React.Dispatch<React.SetStateAction<string>>;
  [common.oppositeCity, setOppositeCity] = useState<string>('');
  let setOppositeBuilding: React.Dispatch<React.SetStateAction<string>>;
  [common.oppositeBuilding, setOppositeBuilding] = useState<string>('');
  let setOppositeCompany: React.Dispatch<React.SetStateAction<string>>;
  [common.oppositeCompany, setOppositeCompany] = useState<string>('');
  let setOppositePosition: React.Dispatch<React.SetStateAction<string>>;
  [common.oppositePosition, setOppositePosition] = useState<string>('');
  let setOppositeBusinessType: React.Dispatch<React.SetStateAction<number>>;
  [common.oppositeBusinessType, setOppositeBusinessType] = useState<number>(1);
  let setBank: React.Dispatch<React.SetStateAction<string>>;
  [common.bank, setBank] = useState<string>('');
  let setBranch: React.Dispatch<React.SetStateAction<string>>;
  [common.branch, setBranch] = useState<string>('');
  let setAccountType: React.Dispatch<React.SetStateAction<string>>;
  [common.accountType, setAccountType] = useState<string>('');
  let setAccount: React.Dispatch<React.SetStateAction<string>>;
  [common.account, setAccount] = useState<string>('');
  let setAccountHolder: React.Dispatch<React.SetStateAction<string>>;
  [common.accountHolder, setAccountHolder] = useState<string>('');
  let setDueDate: React.Dispatch<React.SetStateAction<string>>;
  [common.dueDate, setDueDate] = useState<string>('');

  let setSalesDate: React.Dispatch<
    React.SetStateAction<firebase.firestore.Timestamp | null>
  >;
  let setSalesAmount: React.Dispatch<React.SetStateAction<string>>;
  // 誹謗中傷
  let setOppositeAccountName: React.Dispatch<React.SetStateAction<string>>;
  [sns.oppositeAccountName, setOppositeAccountName] = useState<string>('');
  let setSlanderStartYear: React.Dispatch<React.SetStateAction<string>>;
  [sns.slanderStartYear, setSlanderStartYear] = useState<string>('');
  let setSlanderStartMonth: React.Dispatch<React.SetStateAction<string>>;
  [sns.slanderStartMonth, setSlanderStartMonth] = useState<string>('');
  let setSlanderEndYear: React.Dispatch<React.SetStateAction<string>>;
  [sns.slanderEndYear, setSlanderEndYear] = useState<string>('');
  let setSlanderEndMonth: React.Dispatch<React.SetStateAction<string>>;
  [sns.slanderEndMonth, setSlanderEndMonth] = useState<string>('');
  let setPostedDate: React.Dispatch<
    React.SetStateAction<firebase.firestore.Timestamp | null>
  >;
  [sns.postedDate, setPostedDate] =
    useState<firebase.firestore.Timestamp | null>(null);
  let setPost: React.Dispatch<React.SetStateAction<string>>;
  [sns.post, setPost] = useState<string>('');
  let setPostedDate2: React.Dispatch<
    React.SetStateAction<firebase.firestore.Timestamp | null>
  >;
  [sns.postedDate2, setPostedDate2] =
    useState<firebase.firestore.Timestamp | null>(null);
  let setPost2: React.Dispatch<React.SetStateAction<string>>;
  [sns.post2, setPost2] = useState<string>('');
  let setIsPointedFact: React.Dispatch<React.SetStateAction<boolean>>;
  [sns.isPointedFact, setIsPointedFact] = useState<boolean>(false);
  let setDamageAmount: React.Dispatch<React.SetStateAction<string>>;
  [sns.damageAmount, setDamageAmount] = useState<string>('');
  // 返金請求
  let setService: React.Dispatch<React.SetStateAction<string>>;
  [information.service, setService] = useState<string>('');
  let setCoolingOffType: React.Dispatch<React.SetStateAction<number>>;
  [information.coolingOffType, setCoolingOffType] = useState<number>(1);
  if (type === '返金請求') {
    [information.salesDate, setSalesDate] =
      useState<firebase.firestore.Timestamp | null>(null);
    [information.salesAmount, setSalesAmount] = useState<string>('');
  }
  // 未払い給料請求
  let setWorkStartDate: React.Dispatch<
    React.SetStateAction<firebase.firestore.Timestamp | null>
  >;
  [salary.workStartDate, setWorkStartDate] =
    useState<firebase.firestore.Timestamp | null>(null);
  let setUnpaidSalaryStartDate: React.Dispatch<
    React.SetStateAction<firebase.firestore.Timestamp | null>
  >;
  [salary.unpaidSalaryStartDate, setUnpaidSalaryStartDate] =
    useState<firebase.firestore.Timestamp | null>(null);
  let setUnpaidSalaryEndDate: React.Dispatch<
    React.SetStateAction<firebase.firestore.Timestamp | null>
  >;
  [salary.unpaidSalaryEndDate, setUnpaidSalaryEndDate] =
    useState<firebase.firestore.Timestamp | null>(null);
  let setUnpaidSalary: React.Dispatch<React.SetStateAction<string>>;
  [salary.unpaidSalary, setUnpaidSalary] = useState<string>('');
  // 売買代金請求
  let setProduct: React.Dispatch<React.SetStateAction<string>>;
  [tradingValue.product, setProduct] = useState<string>('');
  let setPaymentDueDate: React.Dispatch<
    React.SetStateAction<firebase.firestore.Timestamp | null>
  >;
  [tradingValue.paymentDueDate, setPaymentDueDate] =
    useState<firebase.firestore.Timestamp | null>(null);
  let setPaidAmount: React.Dispatch<React.SetStateAction<string>>;
  [tradingValue.paidAmount, setPaidAmount] = useState<string>('');
  if (type === '売買代金請求') {
    [tradingValue.salesDate, setSalesDate] =
      useState<firebase.firestore.Timestamp | null>(null);
    [tradingValue.salesAmount, setSalesAmount] = useState<string>('');
  }
  // 敷金返還請求
  let setRentPostCode: React.Dispatch<React.SetStateAction<string>>;
  [securityDeposit.rentPostCode, setRentPostCode] = useState<string>('');
  let setRentPrefecture: React.Dispatch<React.SetStateAction<string>>;
  [securityDeposit.rentPrefecture, setRentPrefecture] = useState<string>('');
  let setRentCity: React.Dispatch<React.SetStateAction<string>>;
  [securityDeposit.rentCity, setRentCity] = useState<string>('');
  let setRentBuilding: React.Dispatch<React.SetStateAction<string>>;
  [securityDeposit.rentBuilding, setRentBuilding] = useState<string>('');
  let setRent: React.Dispatch<React.SetStateAction<string>>;
  [securityDeposit.rent, setRent] = useState<string>('');
  let setExpenses: React.Dispatch<React.SetStateAction<string>>;
  [securityDeposit.expenses, setExpenses] = useState<string>('');
  let setDepositAmount: React.Dispatch<React.SetStateAction<string>>;
  [securityDeposit.depositAmount, setDepositAmount] = useState<string>('');
  let setLeavingDate: React.Dispatch<
    React.SetStateAction<firebase.firestore.Timestamp | null>
  >;
  [securityDeposit.leavingDate, setLeavingDate] =
    useState<firebase.firestore.Timestamp | null>(null);
  // 損害賠償請求
  let setAccidentDate: React.Dispatch<
    React.SetStateAction<firebase.firestore.Timestamp | null>
  >;
  [trafficAccident.accidentDate, setAccidentDate] =
    useState<firebase.firestore.Timestamp | null>(null);
  let setAccidentHour: React.Dispatch<React.SetStateAction<string>>;
  [trafficAccident.accidentHour, setAccidentHour] = useState<string>('');
  let setAccidentMinute: React.Dispatch<React.SetStateAction<string>>;
  [trafficAccident.accidentMinute, setAccidentMinute] = useState<string>('');
  let setAccidentLocation: React.Dispatch<React.SetStateAction<string>>;
  [trafficAccident.accidentLocation, setAccidentLocation] =
    useState<string>('');
  let setVehicleType: React.Dispatch<React.SetStateAction<string>>;
  [trafficAccident.vehicleType, setVehicleType] = useState<string>('');
  let setOppositeVehicleType: React.Dispatch<React.SetStateAction<string>>;
  [trafficAccident.oppositeVehicleType, setOppositeVehicleType] =
    useState<string>('');
  let setAccidentReason: React.Dispatch<React.SetStateAction<string>>;
  [trafficAccident.accidentReason, setAccidentReason] = useState<string>('');
  let setRepairCost: React.Dispatch<React.SetStateAction<string>>;
  [trafficAccident.repairCost, setRepairCost] = useState<string>('');
  let setValuationLoss: React.Dispatch<React.SetStateAction<string>>;
  [trafficAccident.valuationLoss, setValuationLoss] = useState<string>('');
  let setRentalCost: React.Dispatch<React.SetStateAction<string>>;
  [trafficAccident.rentalCost, setRentalCost] = useState<string>('');
  let setReplacementCost: React.Dispatch<React.SetStateAction<string>>;
  [trafficAccident.replacementCost, setReplacementCost] = useState<string>('');
  let setRegistrationExpenses: React.Dispatch<React.SetStateAction<string>>;
  [trafficAccident.registrationExpenses, setRegistrationExpenses] =
    useState<string>('');
  let setSuspensionLoss: React.Dispatch<React.SetStateAction<string>>;
  [trafficAccident.suspensionLoss, setSuspensionLoss] = useState<string>('');
  // 貸金返還請求
  let setLoanAmount: React.Dispatch<React.SetStateAction<string>>;
  [lendMoney.loanAmount, setLoanAmount] = useState<string>('');
  let setLoanDate: React.Dispatch<
    React.SetStateAction<firebase.firestore.Timestamp | null>
  >;
  [lendMoney.loanDate, setLoanDate] =
    useState<firebase.firestore.Timestamp | null>(null);
  let setExistsReturnDate: React.Dispatch<React.SetStateAction<boolean>>;
  [lendMoney.existsReturnDate, setExistsReturnDate] = useState<boolean>(false);
  let setReturnDate: React.Dispatch<
    React.SetStateAction<firebase.firestore.Timestamp | null>
  >;
  [lendMoney.returnDate, setReturnDate] =
    useState<firebase.firestore.Timestamp | null>(null);
  let setInterest: React.Dispatch<React.SetStateAction<string>>;
  [lendMoney.interest, setInterest] = useState<string>('');
  let setExistsDelayPayment: React.Dispatch<React.SetStateAction<boolean>>;
  [lendMoney.existsDelayPayment, setExistsDelayPayment] =
    useState<boolean>(false);
  let setDelayPayment: React.Dispatch<React.SetStateAction<string>>;
  [lendMoney.delayPayment, setDelayPayment] = useState<string>('');
  let setReturnAmount: React.Dispatch<React.SetStateAction<string>>;
  [lendMoney.returnAmount, setReturnAmount] = useState<string>('');

  const loadDocument = async () => {
    await RNFirestore()
      .collection('contentsCertificatedMail')
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
            setCompany(data.company);
            setPosition(data.position);
            setBusinessType(data.businessType);
            setOppositeName(data.oppositeName);
            setOppositePostCode(data.oppositePostCode);
            setOppositePrefecture(data.oppositePrefecture);
            setOppositeCity(data.oppositeCity);
            setOppositeBuilding(data.oppositeBuilding);
            setOppositeCompany(data.oppositeCompany);
            setOppositePosition(data.oppositePosition);
            setOppositeBusinessType(data.oppositeBusinessType);
            setBank(data.bank);
            setBranch(data.branch);
            setAccountType(data.accountType);
            setAccount(data.account);
            setAccountHolder(data.accountHolder);
            setDueDate(data.dueDate);
            if (type == '誹謗中傷') {
              setOppositeAccountName(data.oppositeAccountName);
              setSlanderStartYear(data.slanderStartYear);
              setSlanderStartMonth(data.slanderStartMonth);
              setSlanderEndYear(data.slanderEndYear);
              setSlanderEndMonth(data.slanderEndMonth);
              setPostedDate(data.postedDate);
              setPost(data.post);
              setPostedDate2(data.postedDate2);
              setPost2(data.post2);
              setIsPointedFact(data.isPointedFact);
              setDamageAmount(data.damageAmount);
            }
            if (type === '返金請求') {
              setService(data.service);
              setSalesDate(data.salesDate);
              setSalesAmount(data.salesAmount);
              setCoolingOffType(data.coolingOffType);
            }
            if (type === '給料請求') {
              setWorkStartDate(data.workStartDate);
              setUnpaidSalaryStartDate(data.unpaidSalaryStartDate);
              setUnpaidSalaryEndDate(data.unpaidSalaryEndDate);
              setUnpaidSalary(data.unpaidSalary);
            }
            if (type === '売買代金請求') {
              setProduct(data.product);
              setSalesDate(data.salesDate);
              setSalesAmount(data.salesAmount);
              setPaymentDueDate(data.paymentDueDate);
              setPaidAmount(data.paidAmount);
            }
            if (type === '敷金返還請求') {
              setRentPostCode(data.rentPostCode);
              setRentPrefecture(data.rentPrefecture);
              setRentCity(data.rentCity);
              setRentBuilding(data.rentBuilding);
              setRent(data.rent);
              setExpenses(data.expenses);
              setDepositAmount(data.depositAmount);
              setLeavingDate(data.leavingDate);
            }
            if (type === '損害賠償請求') {
              setAccidentDate(data.accidentDate);
              setAccidentHour(data.accidentHour);
              setAccidentMinute(data.accidentMinute);
              setAccidentLocation(data.accidentLocation);
              setVehicleType(data.vehicleType);
              setOppositeVehicleType(data.oppositeVehicleType);
              setAccidentReason(data.accidentReason);
              setRepairCost(data.repairCost);
              setValuationLoss(data.valuationLoss);
              setRentalCost(data.rentalCost);
              setReplacementCost(data.replacementCost);
              setRegistrationExpenses(data.registrationExpenses);
              setSuspensionLoss(data.suspensionLoss);
            }
            if (type === '貸金返還請求') {
              setLoanAmount(data.loanAmount);
              setLoanDate(data.loanDate);
              setExistsReturnDate(data.existsReturnDate);
              setReturnDate(data.returnDate);
              setInterest(data.interest);
              setExistsDelayPayment(data.existsDelayPayment);
              setDelayPayment(data.delayPayment);
              setReturnAmount(data.returnAmount);
            }
          }
        });
      });
  };

  useEffect(() => {
    loadDocument();
  }, []);
  return (
    <ScrollView style={styles.wrapper}>
      <Text style={styles.title}>必要事項を入力しましょう</Text>
      <Text style={styles.description}>
        あなた（通告人）の情報を入力しましょう
      </Text>
      <PersonInfoInputForm
        name={common.name}
        postCode={common.postCode}
        prefecture={common.prefecture}
        city={common.city}
        building={common.building}
        company={common.company}
        position={common.position}
        businessType={common.businessType}
        setName={setName}
        setPostCode={setPostCode}
        setPrefecture={setPrefecture}
        setCity={setCity}
        setBuilding={setBuilding}
        setCompany={setCompany}
        setPosition={setPosition}
        setBusinessType={setBusinessType}
        required={true}
      />
      <Text style={styles.description}>
        相手方（被通告人）の情報を入力しましょう
      </Text>
      <PersonInfoInputForm
        name={common.oppositeName}
        postCode={common.oppositePostCode}
        prefecture={common.oppositePrefecture}
        city={common.oppositeCity}
        building={common.oppositeBuilding}
        company={common.oppositeCompany}
        position={common.oppositePosition}
        businessType={common.oppositeBusinessType}
        setName={setOppositeName}
        setPostCode={setOppositePostCode}
        setPrefecture={setOppositePrefecture}
        setCity={setOppositeCity}
        setBuilding={setOppositeBuilding}
        setCompany={setOppositeCompany}
        setPosition={setOppositePosition}
        setBusinessType={setOppositeBusinessType}
        required={true}
      />
      {type === '誹謗中傷' ? (
        <SNS
          oppositeAccountName={sns.oppositeAccountName}
          slanderStartYear={sns.slanderStartYear}
          slanderStartMonth={sns.slanderStartMonth}
          slanderEndYear={sns.slanderEndYear}
          slanderEndMonth={sns.slanderEndMonth}
          postedDate={sns.postedDate}
          post={sns.post}
          postedDate2={sns.postedDate2}
          post2={sns.post2}
          isPointedFact={sns.isPointedFact}
          damageAmount={sns.damageAmount}
          setOppositeAccountName={setOppositeAccountName}
          setSlanderStartYear={setSlanderStartYear}
          setSlanderStartMonth={setSlanderStartMonth}
          setSlanderEndYear={setSlanderEndYear}
          setSlanderEndMonth={setSlanderEndMonth}
          setPostedDate={setPostedDate}
          setPost={setPost}
          setPostedDate2={setPostedDate2}
          setPost2={setPost2}
          setIsPointedFact={setIsPointedFact}
          setDamageAmount={setDamageAmount}
        />
      ) : (
        <></>
      )}
      {type === '返金請求' ? (
        <Information
          service={information.service}
          salesDate={information.salesDate}
          salesAmount={information.salesAmount}
          coolingOffType={information.coolingOffType}
          setService={setService}
          setSalesDate={setSalesDate}
          setSalesAmount={setSalesAmount}
          setCoolingOffType={setCoolingOffType}
        />
      ) : (
        <></>
      )}
      {type === '給料請求' ? (
        <Salary
          workStartDate={salary.workStartDate}
          unpaidSalaryStartDate={salary.unpaidSalaryStartDate}
          unpaidSalaryEndDate={salary.unpaidSalaryEndDate}
          unpaidSalary={salary.unpaidSalary}
          setWorkStartDate={setWorkStartDate}
          setUnpaidSalaryStartDate={setUnpaidSalaryStartDate}
          setUnpaidSalaryEndDate={setUnpaidSalaryEndDate}
          setUnpaidSalary={setUnpaidSalary}
        />
      ) : (
        <></>
      )}
      {type === '売買代金請求' ? (
        <TradingValue
          product={tradingValue.product}
          salesDate={tradingValue.salesDate}
          salesAmount={tradingValue.salesAmount}
          paymentDueDate={tradingValue.paymentDueDate}
          paidAmount={tradingValue.paidAmount}
          setProduct={setProduct}
          setSalesDate={setSalesDate}
          setSalesAmount={setSalesAmount}
          setPaymentDueDate={setPaymentDueDate}
          setPaidAmount={setPaidAmount}
        />
      ) : (
        <></>
      )}
      {type === '敷金返還請求' ? (
        <SecurityDeposit
          rentPostCode={securityDeposit.rentPostCode}
          rentPrefecture={securityDeposit.rentPrefecture}
          rentCity={securityDeposit.rentCity}
          rentBuilding={securityDeposit.rentBuilding}
          rent={securityDeposit.rent}
          expenses={securityDeposit.expenses}
          depositAmount={securityDeposit.depositAmount}
          leavingDate={securityDeposit.leavingDate}
          setRentPostCode={setRentPostCode}
          setRentPrefecture={setRentPrefecture}
          setRentCity={setRentCity}
          setRentBuilding={setRentBuilding}
          setRent={setRent}
          setExpenses={setExpenses}
          setDepositAmount={setDepositAmount}
          setLeavingDate={setLeavingDate}
        />
      ) : (
        <></>
      )}
      {type === '損害賠償請求' ? (
        <TrafficAccident
          accidentDate={trafficAccident.accidentDate}
          accidentHour={trafficAccident.accidentHour}
          accidentMinute={trafficAccident.accidentMinute}
          accidentLocation={trafficAccident.accidentLocation}
          vehicleType={trafficAccident.vehicleType}
          oppositeVehicleType={trafficAccident.oppositeVehicleType}
          accidentReason={trafficAccident.accidentReason}
          repairCost={trafficAccident.repairCost}
          valuationLoss={trafficAccident.valuationLoss}
          rentalCost={trafficAccident.rentalCost}
          replacementCost={trafficAccident.replacementCost}
          registrationExpenses={trafficAccident.registrationExpenses}
          suspensionLoss={trafficAccident.suspensionLoss}
          setAccidentDate={setAccidentDate}
          setAccidentHour={setAccidentHour}
          setAccidentMinute={setAccidentMinute}
          setAccidentLocation={setAccidentLocation}
          setVehicleType={setVehicleType}
          setOppositeVehicleType={setOppositeVehicleType}
          setAccidentReason={setAccidentReason}
          setRepairCost={setRepairCost}
          setValuationLoss={setValuationLoss}
          setRentalCost={setRentalCost}
          setReplacementCost={setReplacementCost}
          setRegistrationExpenses={setRegistrationExpenses}
          setSuspensionLoss={setSuspensionLoss}
        />
      ) : (
        <></>
      )}
      {type === '貸金返還請求' ? (
        <LendMoney
          loanAmount={lendMoney.loanAmount}
          loanDate={lendMoney.loanDate}
          existsReturnDate={lendMoney.existsReturnDate}
          returnDate={lendMoney.returnDate}
          interest={lendMoney.interest}
          existsDelayPayment={lendMoney.existsDelayPayment}
          delayPayment={lendMoney.delayPayment}
          returnAmount={lendMoney.returnAmount}
          setLoanAmount={setLoanAmount}
          setLoanDate={setLoanDate}
          setExistsReturnDate={setExistsReturnDate}
          setReturnDate={setReturnDate}
          setInterest={setInterest}
          setExistsDelayPayment={setExistsDelayPayment}
          setDelayPayment={setDelayPayment}
          setReturnAmount={setReturnAmount}
        />
      ) : (
        <></>
      )}
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>内容証明郵便の対応期限</Text>
        <Text style={styles.optional}>任意</Text>
      </View>
      <Text style={styles.inputDescription}>
        指定なしの場合、10日になります。
      </Text>
      <View style={{ flexDirection: 'row', marginLeft: 10 }}>
        <TextInput
          style={styles.numberInput}
          maxLength={3}
          keyboardType="numeric"
          placeholder="10"
          onChangeText={(value) => setDueDate(value)}
          value={common.dueDate}
        />
        <Text style={styles.text}>日以内</Text>
      </View>
      <Text style={styles.description}>
        振込先口座に関する情報を入力しましょう
      </Text>
      <Bank
        bank={common.bank}
        branch={common.branch}
        accountType={common.accountType}
        account={common.account}
        accountHolder={common.accountHolder}
        setBank={setBank}
        setBranch={setBranch}
        setAccountType={setAccountType}
        setAccount={setAccount}
        setAccountHolder={setAccountHolder}
      />
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
            navigation.navigate('内容証明郵便の確認', {
              constant: type,
              variable: '内容証明郵便',
              id: caseId,
            });
          }
        }}
      />
    </ScrollView>
  );
};

export default ContentsCertificatedMail;
