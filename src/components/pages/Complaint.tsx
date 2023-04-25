import React, { FC, useEffect, useReducer, useState } from 'react';
import { Text, Button } from 'react-native-elements';
import { View, TextInput, ScrollView } from 'react-native';
import { default as RNFirestore } from '@react-native-firebase/firestore';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Address from '../molecules/Address';
import Alert from '../molecules/Alert';
import PhoneNumber from '../molecules/PhoneNumber';
import Salary from '../organisms/Complaint/Salary';
import LendMoney from '../organisms/Complaint/LendMoney';
import TrafficAccident from '../organisms/Complaint/TrafficAccident';
import SecurityDeposit from '../organisms/Complaint/SecurityDeposit';
import TradingValue from '../organisms/Complaint/TradingValue';
import Information from '../organisms/Complaint/Information';
import SNS from '../organisms/Complaint/SNS';
import PersonInfoInputForm from '../organisms/PersonInfoInputForm';
import RNPickerSelect from 'react-native-picker-select';
import {
  styles,
  pickerSelectStylesWide,
  pickerSelectStyles,
  pickerSelectStylesNarrow,
} from '../../styles/form';
import {
  ComplaintCommon,
  ComplaintInformation,
  ComplaintSNS,
  ComplaintSalary,
  ComplaintTradingValue,
  ComplaintSecurityDeposit,
  ComplaintTrafficAccident,
  ComplaintLendMoney,
  blankComplaintCommon,
  blankComplaintSNS,
  blankComplaintInformation,
  blankComplaintSalary,
  blankComplaintTradingValue,
  blankComplaintSecurityDeposit,
  blankComplaintTrafficAccident,
  blankComplaintLendMoney,
} from '../../models/complaint';
import _ from 'lodash';
import { useNavigation } from '@react-navigation/native';
import firebase from 'firebase/app';
import 'firebase/firestore';

type Props = {
  type: string;
  caseId: string;
};

const mailingTypes = [
  { label: '上記住所（あなたの住所）', value: 1 },
  { label: '勤務先', value: 2 },
  { label: 'その他の場所', value: 3 },
];
const recipientTypes = [
  { label: '自分', value: 1 },
  { label: 'その他', value: 2 },
];
const lawsuitCounts = [
  { label: '1', value: '1' },
  { label: '2', value: '2' },
  { label: '3', value: '3' },
  { label: '4', value: '4' },
  { label: '5', value: '5' },
  { label: '6', value: '6' },
  { label: '7', value: '7' },
  { label: '8', value: '8' },
  { label: '9', value: '9' },
  { label: '10', value: '10' },
];
const Complaint: FC<Props> = ({ type, caseId }) => {
  const navigation = useNavigation();
  const [docId, setDocId] = useState<string>('');
  const [isHidden, setIsHidden] = useState<boolean>(true);
  const [alerts, setAlerts] = useState<string[]>([]);
  let existsComaker = false;
  if (['誹謗中傷', '返金請求', '損害賠償請求', '貸金返還請求'].includes(type))
    existsComaker = true;

  const ref = RNFirestore().collection('complaint');
  const user = auth().currentUser;

  const common: ComplaintCommon = _.cloneDeep({
    ...blankComplaintCommon,
    caseId: caseId,
    user: user?.uid,
    createdAt: firebase.firestore.Timestamp.now(),
  });
  const sns: ComplaintSNS = _.cloneDeep(blankComplaintSNS);
  const information: ComplaintInformation = _.cloneDeep(
    blankComplaintInformation,
  );
  const salary: ComplaintSalary = _.cloneDeep(blankComplaintSalary);
  const tradingValue: ComplaintTradingValue = _.cloneDeep(
    blankComplaintTradingValue,
  );
  const securityDeposit: ComplaintSecurityDeposit = _.cloneDeep(
    blankComplaintSecurityDeposit,
  );
  const trafficAccident: ComplaintTrafficAccident = _.cloneDeep(
    blankComplaintTrafficAccident,
  );
  const lendMoney: ComplaintLendMoney = _.cloneDeep(blankComplaintLendMoney);

  const validateForm = () => {
    const blankForms = [];
    if (common.courtName === '') blankForms.push('簡易裁判所の名前');
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
    if (common.mailingType === 2 && common.mailingCompany === '')
      blankForms.push('書類送達場所の勤務先名称');
    if (common.mailingType === 3 && common.mailingCompany === '')
      blankForms.push('書類送達場所のあなたとの関係');
    if (
      [2, 3].indexOf(common.mailingType) !== -1 &&
      common.mailingPostCode === ''
    )
      blankForms.push('書類送達場所の郵便番号');
    if (
      [2, 3].indexOf(common.mailingType) !== -1 &&
      common.mailingPrefecture === ''
    )
      blankForms.push('書類送達場所の都道府県');
    if ([2, 3].indexOf(common.mailingType) !== -1 && common.mailingCity === '')
      blankForms.push('書類送達場所の市区町村・番地');
    if (common.recipientType === 2 && common.recipientName === '')
      blankForms.push('書類の受取人名');

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
      if (sns.providerName === '') blankForms.push('プロバイダー名');
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
      if (salary.business === '') blankForms.push('事業内容');
      if (salary.job === '') blankForms.push('仕事の内容');
      if (salary.salaryAmount === '') blankForms.push('給料');
      if (
        salary.paymentDueDay === '' ||
        salary.closingMonth === '' ||
        salary.closingDay === ''
      )
        blankForms.push('支払期日');
      if (salary.workEndDate === null) blankForms.push('勤務終了日');
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
      if (trafficAccident.accidentDescription === '')
        blankForms.push('事故の状況');
    }
    if (type === '貸金返還請求') {
      if (lendMoney.loanAmount === '') blankForms.push('貸付金額');
      if (lendMoney.loanDate === null) blankForms.push('貸し付けた日付');
    }

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
        .collection('complaint')
        .orderBy('updatedAt', 'desc')
        .where('caseId', '==', caseId)
        .get()
        .then((querySnapshot) => {
          querySnapshot.docs.map((doc, i) => {
            if (i === 0) setDocId(doc.id);
          });
        });
      if (docId !== '') {
        const docRef = RNFirestore().collection('complaint').doc(docId);
        await docRef.update(data);
      } else {
        await ref.add(data);
      }
    }
  };

  let setLawsuitCount: React.Dispatch<React.SetStateAction<string>>;
  [common.lawsuitCount, setLawsuitCount] = useState<string>('1');
  let setCourtName: React.Dispatch<React.SetStateAction<string>>;
  [common.courtName, setCourtName] = useState<string>('');
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
  let setPhoneNumber: React.Dispatch<React.SetStateAction<string>>;
  [common.phoneNumber, setPhoneNumber] = useState<string>('');
  let setMailingType: React.Dispatch<React.SetStateAction<number>>;
  [common.mailingType, setMailingType] = useState<number>(1);
  let setMailingDescription: React.Dispatch<React.SetStateAction<string>>;
  [common.mailingDescription, setMailingDescription] = useState<string>('');
  let setMailingCompany: React.Dispatch<React.SetStateAction<string>>;
  [common.mailingCompany, setMailingCompany] = useState<string>('');
  let setMailingPostCode: React.Dispatch<React.SetStateAction<string>>;
  [common.mailingPostCode, setMailingPostCode] = useState<string>('');
  let setMailingPrefecture: React.Dispatch<React.SetStateAction<string>>;
  [common.mailingPrefecture, setMailingPrefecture] = useState<string>('');
  let setMailingCity: React.Dispatch<React.SetStateAction<string>>;
  [common.mailingCity, setMailingCity] = useState<string>('');
  let setMailingBuilding: React.Dispatch<React.SetStateAction<string>>;
  [common.mailingBuilding, setMailingBuilding] = useState<string>('');
  let setMailingPhoneNumber: React.Dispatch<React.SetStateAction<string>>;
  [common.mailingPhoneNumber, setMailingPhoneNumber] = useState<string>('');
  let setRecipientType: React.Dispatch<React.SetStateAction<number>>;
  [common.recipientType, setRecipientType] = useState<number>(1);
  let setRecipientName: React.Dispatch<React.SetStateAction<string>>;
  [common.recipientName, setRecipientName] = useState<string>('');
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
  let setOppositePhoneNumber: React.Dispatch<React.SetStateAction<string>>;
  [common.oppositePhoneNumber, setOppositePhoneNumber] = useState<string>('');
  let setOpposite2Name: React.Dispatch<React.SetStateAction<string>>;
  [common.opposite2Name, setOpposite2Name] = useState<string>('');
  let setOpposite2PostCode: React.Dispatch<React.SetStateAction<string>>;
  [common.opposite2PostCode, setOpposite2PostCode] = useState<string>('');
  let setOpposite2Prefecture: React.Dispatch<React.SetStateAction<string>>;
  [common.opposite2Prefecture, setOpposite2Prefecture] = useState<string>('');
  let setOpposite2City: React.Dispatch<React.SetStateAction<string>>;
  [common.opposite2City, setOpposite2City] = useState<string>('');
  let setOpposite2Building: React.Dispatch<React.SetStateAction<string>>;
  [common.opposite2Building, setOpposite2Building] = useState<string>('');
  let setOpposite2Company: React.Dispatch<React.SetStateAction<string>>;
  [common.opposite2Company, setOpposite2Company] = useState<string>('');
  let setOpposite2Position: React.Dispatch<React.SetStateAction<string>>;
  [common.opposite2Position, setOpposite2Position] = useState<string>('');
  let setOpposite2BusinessType: React.Dispatch<React.SetStateAction<number>>;
  [common.opposite2BusinessType, setOpposite2BusinessType] =
    useState<number>(1);
  let setOpposite2PhoneNumber: React.Dispatch<React.SetStateAction<string>>;
  [common.opposite2PhoneNumber, setOpposite2PhoneNumber] = useState<string>('');

  let setExistsDelayPayment: React.Dispatch<React.SetStateAction<boolean>>;
  let setDelayPayment: React.Dispatch<React.SetStateAction<string>>;
  let setDelayPaymentStartType: React.Dispatch<React.SetStateAction<number>>;
  let setDelayPaymentStartDate: React.Dispatch<
    React.SetStateAction<firebase.firestore.Timestamp | null>
  >;
  let setExecute: React.Dispatch<React.SetStateAction<boolean>>;
  let setReference: React.Dispatch<React.SetStateAction<string>>;
  let setExistsReceipt: React.Dispatch<React.SetStateAction<boolean>>;
  let setExistsCertificate: React.Dispatch<React.SetStateAction<boolean>>;
  let setSalesDate: React.Dispatch<
    React.SetStateAction<firebase.firestore.Timestamp | null>
  >;
  let setSalesAmount: React.Dispatch<React.SetStateAction<string>>;
  let setExistsContract: React.Dispatch<React.SetStateAction<boolean>>;
  let setBusiness: React.Dispatch<React.SetStateAction<string>>;
  let setAgreement: React.Dispatch<React.SetStateAction<string>>;
  let setExistsMemorandum: React.Dispatch<React.SetStateAction<boolean>>;
  let setInterest: React.Dispatch<React.SetStateAction<string>>;
  let setInterestStartDate: React.Dispatch<
    React.SetStateAction<firebase.firestore.Timestamp | null>
  >;
  let setInterestEndDate: React.Dispatch<
    React.SetStateAction<firebase.firestore.Timestamp | null>
  >;
  // 誹謗中傷
  let setAccountName: React.Dispatch<React.SetStateAction<string>>;
  let setOppositeAccountName: React.Dispatch<React.SetStateAction<string>>;
  let setSlanderStartYear: React.Dispatch<React.SetStateAction<string>>;
  let setSlanderStartMonth: React.Dispatch<React.SetStateAction<string>>;
  let setSlanderEndYear: React.Dispatch<React.SetStateAction<string>>;
  let setSlanderEndMonth: React.Dispatch<React.SetStateAction<string>>;
  let setPostedDate: React.Dispatch<
    React.SetStateAction<firebase.firestore.Timestamp | null>
  >;
  let setPost: React.Dispatch<React.SetStateAction<string>>;
  let setPostedDate2: React.Dispatch<
    React.SetStateAction<firebase.firestore.Timestamp | null>
  >;
  let setPost2: React.Dispatch<React.SetStateAction<string>>;
  let setIsPointedFact: React.Dispatch<React.SetStateAction<boolean>>;
  let setDamageAmount: React.Dispatch<React.SetStateAction<string>>;
  let setExistsEvidence: React.Dispatch<React.SetStateAction<boolean>>;
  let setExistsDisclosureDocument: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  let setExistsProviderDocument: React.Dispatch<React.SetStateAction<boolean>>;
  let setProviderName: React.Dispatch<React.SetStateAction<string>>;
  let setIsTargetAccount: React.Dispatch<React.SetStateAction<boolean>>;
  let setExistsPosts: React.Dispatch<React.SetStateAction<boolean>>;
  // 返金請求
  let setService: React.Dispatch<React.SetStateAction<string>>;
  let setCoolingOffType: React.Dispatch<React.SetStateAction<number>>;
  let setContentsCertificatedMailDate: React.Dispatch<
    React.SetStateAction<firebase.firestore.Timestamp | null>
  >;
  let setExistsEmail: React.Dispatch<React.SetStateAction<boolean>>;
  let setExistsTranscriptCopy: React.Dispatch<React.SetStateAction<boolean>>;
  let setExistsScreenShot: React.Dispatch<React.SetStateAction<boolean>>;
  // 未払い給料請求
  let setWorkStartDate: React.Dispatch<
    React.SetStateAction<firebase.firestore.Timestamp | null>
  >;
  let setUnpaidSalaryStartDate: React.Dispatch<
    React.SetStateAction<firebase.firestore.Timestamp | null>
  >;
  let setUnpaidSalaryEndDate: React.Dispatch<
    React.SetStateAction<firebase.firestore.Timestamp | null>
  >;
  let setUnpaidSalary: React.Dispatch<React.SetStateAction<string>>;
  let setJob: React.Dispatch<React.SetStateAction<string>>;
  let setWorkEndDate: React.Dispatch<
    React.SetStateAction<firebase.firestore.Timestamp | null>
  >;
  let setSalaryType: React.Dispatch<React.SetStateAction<number>>;
  let setSalaryAmount: React.Dispatch<React.SetStateAction<string>>;
  let setPaymentDueDay: React.Dispatch<React.SetStateAction<string>>;
  let setClosingMonth: React.Dispatch<React.SetStateAction<string>>;
  let setClosingDay: React.Dispatch<React.SetStateAction<string>>;
  let setExistsStatement: React.Dispatch<React.SetStateAction<boolean>>;
  // 売買代金請求
  let setProduct: React.Dispatch<React.SetStateAction<string>>;
  let setPaymentDueDate: React.Dispatch<
    React.SetStateAction<firebase.firestore.Timestamp | null>
  >;
  let setPaidAmount: React.Dispatch<React.SetStateAction<string>>;
  let setExistsInvoice: React.Dispatch<React.SetStateAction<boolean>>;
  let setExistsDeliveryNote: React.Dispatch<React.SetStateAction<boolean>>;
  let setRentalCost: React.Dispatch<React.SetStateAction<string>>;
  // 敷金返還請求
  let setRentPostCode: React.Dispatch<React.SetStateAction<string>>;
  let setRentPrefecture: React.Dispatch<React.SetStateAction<string>>;
  let setRentCity: React.Dispatch<React.SetStateAction<string>>;
  let setRentBuilding: React.Dispatch<React.SetStateAction<string>>;
  let setRent: React.Dispatch<React.SetStateAction<string>>;
  let setExpenses: React.Dispatch<React.SetStateAction<string>>;
  let setDepositAmount: React.Dispatch<React.SetStateAction<string>>;
  let setLeavingDate: React.Dispatch<
    React.SetStateAction<firebase.firestore.Timestamp | null>
  >;
  let setContractDate: React.Dispatch<
    React.SetStateAction<firebase.firestore.Timestamp | null>
  >;
  let setLeasePeriod: React.Dispatch<React.SetStateAction<string>>;
  let setContractEndDate: React.Dispatch<
    React.SetStateAction<firebase.firestore.Timestamp | null>
  >;
  let setExistsContentsCertifiedMail: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  let setExistsDeliveryCertificate: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  // 損害賠償請求
  let setAccidentDate: React.Dispatch<
    React.SetStateAction<firebase.firestore.Timestamp | null>
  >;
  let setAccidentHour: React.Dispatch<React.SetStateAction<string>>;
  let setAccidentMinute: React.Dispatch<React.SetStateAction<string>>;
  let setAccidentLocation: React.Dispatch<React.SetStateAction<string>>;
  let setVehicleType: React.Dispatch<React.SetStateAction<string>>;
  let setOppositeVehicleType: React.Dispatch<React.SetStateAction<string>>;
  let setAccidentReason: React.Dispatch<React.SetStateAction<string>>;
  let setRepairCost: React.Dispatch<React.SetStateAction<string>>;
  let setValuationLoss: React.Dispatch<React.SetStateAction<string>>;
  let setReplacementCost: React.Dispatch<React.SetStateAction<string>>;
  let setRegistrationExpenses: React.Dispatch<React.SetStateAction<string>>;
  let setSuspensionLoss: React.Dispatch<React.SetStateAction<string>>;
  let setIsEmployer: React.Dispatch<React.SetStateAction<boolean>>;
  let setAccidentDescription: React.Dispatch<React.SetStateAction<string>>;
  let setExistsAccidentCertificate: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  let setExistsPhoto: React.Dispatch<React.SetStateAction<boolean>>;
  let setExistsEstimate: React.Dispatch<React.SetStateAction<boolean>>;
  let setExistsDiagram: React.Dispatch<React.SetStateAction<boolean>>;
  // 貸金返還請求
  let setLoanAmount: React.Dispatch<React.SetStateAction<string>>;
  let setLoanDate: React.Dispatch<
    React.SetStateAction<firebase.firestore.Timestamp | null>
  >;
  let setExistsReturnDate: React.Dispatch<React.SetStateAction<boolean>>;
  let setReturnDate: React.Dispatch<
    React.SetStateAction<firebase.firestore.Timestamp | null>
  >;
  let setReturnAmount: React.Dispatch<React.SetStateAction<string>>;
  let setPartialReturnDate: React.Dispatch<
    React.SetStateAction<firebase.firestore.Timestamp | null>
  >;
  let setExistsAcknowledgement: React.Dispatch<React.SetStateAction<boolean>>;

  if (type === '誹謗中傷') {
    [sns.accountName, setAccountName] = useState<string>('');
    [sns.oppositeAccountName, setOppositeAccountName] = useState<string>('');
    [sns.slanderStartYear, setSlanderStartYear] = useState<string>('');
    [sns.slanderStartMonth, setSlanderStartMonth] = useState<string>('');
    [sns.slanderEndYear, setSlanderEndYear] = useState<string>('');
    [sns.slanderEndMonth, setSlanderEndMonth] = useState<string>('');
    [sns.postedDate, setPostedDate] =
      useState<firebase.firestore.Timestamp | null>(null);
    [sns.post, setPost] = useState<string>('');
    [sns.postedDate2, setPostedDate2] =
      useState<firebase.firestore.Timestamp | null>(null);
    [sns.post2, setPost2] = useState<string>('');
    [sns.isPointedFact, setIsPointedFact] = useState<boolean>(false);
    [sns.damageAmount, setDamageAmount] = useState<string>('');
    [sns.existsDelayPayment, setExistsDelayPayment] = useState<boolean>(false);
    [sns.delayPayment, setDelayPayment] = useState<string>('');
    [sns.delayPaymentStartType, setDelayPaymentStartType] = useState<number>(1);
    [sns.delayPaymentStartDate, setDelayPaymentStartDate] =
      useState<firebase.firestore.Timestamp | null>(null);
    [sns.execute, setExecute] = useState<boolean>(false);
    [sns.existsEvidence, setExistsEvidence] = useState<boolean>(false);
    [sns.existsDisclosureDocument, setExistsDisclosureDocument] =
      useState<boolean>(false);
    [sns.existsProviderDocument, setExistsProviderDocument] =
      useState<boolean>(false);
    [sns.providerName, setProviderName] = useState<string>('');
    [sns.isTargetAccount, setIsTargetAccount] = useState<boolean>(false);
    [sns.existsPosts, setExistsPosts] = useState<boolean>(false);
  }
  if (type === '返金請求') {
    [information.service, setService] = useState<string>('');
    [information.coolingOffType, setCoolingOffType] = useState<number>(1);
    [information.salesDate, setSalesDate] =
      useState<firebase.firestore.Timestamp | null>(null);
    [information.salesAmount, setSalesAmount] = useState<string>('');
    [information.existsDelayPayment, setExistsDelayPayment] =
      useState<boolean>(false);
    [information.delayPayment, setDelayPayment] = useState<string>('');
    [information.delayPaymentStartType, setDelayPaymentStartType] =
      useState<number>(1);
    [information.delayPaymentStartDate, setDelayPaymentStartDate] =
      useState<firebase.firestore.Timestamp | null>(null);
    [information.execute, setExecute] = useState<boolean>(false);
    [
      information.contentsCertificatedMailDate,
      setContentsCertificatedMailDate,
    ] = useState<firebase.firestore.Timestamp | null>(null);
    [information.existsContract, setExistsContract] = useState<boolean>(false);
    [information.existsReceipt, setExistsReceipt] = useState<boolean>(false);
    [information.existsEmail, setExistsEmail] = useState<boolean>(false);
    [information.existsTranscriptCopy, setExistsTranscriptCopy] =
      useState<boolean>(false);
    [information.existsScreenShot, setExistsScreenShot] =
      useState<boolean>(false);
  }
  if (type === '給料請求') {
    [salary.workStartDate, setWorkStartDate] =
      useState<firebase.firestore.Timestamp | null>(null);
    [salary.unpaidSalaryStartDate, setUnpaidSalaryStartDate] =
      useState<firebase.firestore.Timestamp | null>(null);
    [salary.unpaidSalaryEndDate, setUnpaidSalaryEndDate] =
      useState<firebase.firestore.Timestamp | null>(null);
    [salary.unpaidSalary, setUnpaidSalary] = useState<string>('');
    [salary.existsDelayPayment, setExistsDelayPayment] =
      useState<boolean>(false);
    [salary.delayPayment, setDelayPayment] = useState<string>('');
    [salary.delayPaymentStartType, setDelayPaymentStartType] =
      useState<number>(1);
    [salary.delayPaymentStartDate, setDelayPaymentStartDate] =
      useState<firebase.firestore.Timestamp | null>(null);
    [salary.execute, setExecute] = useState<boolean>(false);
    [salary.business, setBusiness] = useState<string>('');
    [salary.job, setJob] = useState<string>('');
    [salary.workEndDate, setWorkEndDate] =
      useState<firebase.firestore.Timestamp | null>(null);
    [salary.salaryType, setSalaryType] = useState<number>(1);
    [salary.salaryAmount, setSalaryAmount] = useState<string>('');
    [salary.paymentDueDay, setPaymentDueDay] = useState<string>('');
    [salary.closingMonth, setClosingMonth] = useState<string>('');
    [salary.closingDay, setClosingDay] = useState<string>('');
    [salary.reference, setReference] = useState<string>('');
    [salary.existsStatement, setExistsStatement] = useState<boolean>(false);
    [salary.existsCertificate, setExistsCertificate] = useState<boolean>(false);
  }
  if (type === '売買代金請求') {
    [tradingValue.product, setProduct] = useState<string>('');
    [tradingValue.salesDate, setSalesDate] =
      useState<firebase.firestore.Timestamp | null>(null);
    [tradingValue.salesAmount, setSalesAmount] = useState<string>('');
    [tradingValue.paymentDueDate, setPaymentDueDate] =
      useState<firebase.firestore.Timestamp | null>(null);
    [tradingValue.paidAmount, setPaidAmount] = useState<string>('');
    [tradingValue.existsDelayPayment, setExistsDelayPayment] =
      useState<boolean>(false);
    [tradingValue.delayPayment, setDelayPayment] = useState<string>('');
    [tradingValue.delayPaymentStartType, setDelayPaymentStartType] =
      useState<number>(1);
    [tradingValue.delayPaymentStartDate, setDelayPaymentStartDate] =
      useState<firebase.firestore.Timestamp | null>(null);
    [tradingValue.execute, setExecute] = useState<boolean>(false);
    [tradingValue.business, setBusiness] = useState<string>('');
    [tradingValue.reference, setReference] = useState<string>('');
    [tradingValue.existsContract, setExistsContract] = useState<boolean>(false);
    [tradingValue.existsInvoice, setExistsInvoice] = useState<boolean>(false);
    [tradingValue.existsDeliveryNote, setExistsDeliveryNote] =
      useState<boolean>(false);
    [tradingValue.existsReceipt, setExistsReceipt] = useState<boolean>(false);
    [tradingValue.existsCertificate, setExistsCertificate] =
      useState<boolean>(false);
  }
  if (type === '敷金返還請求') {
    [securityDeposit.rentPostCode, setRentPostCode] = useState<string>('');
    [securityDeposit.rentPrefecture, setRentPrefecture] = useState<string>('');
    [securityDeposit.rentCity, setRentCity] = useState<string>('');
    [securityDeposit.rentBuilding, setRentBuilding] = useState<string>('');
    [securityDeposit.rent, setRent] = useState<string>('');
    [securityDeposit.expenses, setExpenses] = useState<string>('');
    [securityDeposit.depositAmount, setDepositAmount] = useState<string>('');
    [securityDeposit.leavingDate, setLeavingDate] =
      useState<firebase.firestore.Timestamp | null>(null);
    [securityDeposit.existsDelayPayment, setExistsDelayPayment] =
      useState<boolean>(false);
    [securityDeposit.delayPayment, setDelayPayment] = useState<string>('');
    [securityDeposit.delayPaymentStartType, setDelayPaymentStartType] =
      useState<number>(1);
    [securityDeposit.delayPaymentStartDate, setDelayPaymentStartDate] =
      useState<firebase.firestore.Timestamp | null>(null);
    [securityDeposit.execute, setExecute] = useState<boolean>(false);
    [securityDeposit.contractDate, setContractDate] =
      useState<firebase.firestore.Timestamp | null>(null);
    [securityDeposit.leasePeriod, setLeasePeriod] = useState<string>('');
    [securityDeposit.agreement, setAgreement] = useState<string>('');
    [securityDeposit.contractEndDate, setContractEndDate] =
      useState<firebase.firestore.Timestamp | null>(null);
    [securityDeposit.reference, setReference] = useState<string>('');
    [securityDeposit.existsContract, setExistsContract] =
      useState<boolean>(false);
    [securityDeposit.existsCertificate, setExistsCertificate] =
      useState<boolean>(false);
    [
      securityDeposit.existsContentsCertifiedMail,
      setExistsContentsCertifiedMail,
    ] = useState<boolean>(false);
    [securityDeposit.existsDeliveryCertificate, setExistsDeliveryCertificate] =
      useState<boolean>(false);
    [securityDeposit.existsReceipt, setExistsReceipt] =
      useState<boolean>(false);
  }
  if (type === '損害賠償請求') {
    [trafficAccident.accidentDate, setAccidentDate] =
      useState<firebase.firestore.Timestamp | null>(null);
    [trafficAccident.accidentHour, setAccidentHour] = useState<string>('');
    [trafficAccident.accidentMinute, setAccidentMinute] = useState<string>('');
    [trafficAccident.accidentLocation, setAccidentLocation] =
      useState<string>('');
    [trafficAccident.vehicleType, setVehicleType] = useState<string>('');
    [trafficAccident.oppositeVehicleType, setOppositeVehicleType] =
      useState<string>('');
    [trafficAccident.accidentReason, setAccidentReason] = useState<string>('');
    [trafficAccident.repairCost, setRepairCost] = useState<string>('');
    [trafficAccident.valuationLoss, setValuationLoss] = useState<string>('');
    [trafficAccident.rentalCost, setRentalCost] = useState<string>('');
    [trafficAccident.replacementCost, setReplacementCost] =
      useState<string>('');
    [trafficAccident.registrationExpenses, setRegistrationExpenses] =
      useState<string>('');
    [trafficAccident.suspensionLoss, setSuspensionLoss] = useState<string>('');
    [trafficAccident.existsDelayPayment, setExistsDelayPayment] =
      useState<boolean>(false);
    [trafficAccident.delayPayment, setDelayPayment] = useState<string>('');
    [trafficAccident.delayPaymentStartType, setDelayPaymentStartType] =
      useState<number>(1);
    [trafficAccident.delayPaymentStartDate, setDelayPaymentStartDate] =
      useState<firebase.firestore.Timestamp | null>(null);
    [trafficAccident.execute, setExecute] = useState<boolean>(false);
    [trafficAccident.isEmployer, setIsEmployer] = useState<boolean>(false);
    [trafficAccident.accidentDescription, setAccidentDescription] =
      useState<string>('');
    [trafficAccident.reference, setReference] = useState<string>('');
    [trafficAccident.existsAccidentCertificate, setExistsAccidentCertificate] =
      useState<boolean>(false);
    [trafficAccident.existsMemorandum, setExistsMemorandum] =
      useState<boolean>(false);
    [trafficAccident.existsPhoto, setExistsPhoto] = useState<boolean>(false);
    [trafficAccident.existsReceipt, setExistsReceipt] =
      useState<boolean>(false);
    [trafficAccident.existsEstimate, setExistsEstimate] =
      useState<boolean>(false);
    [trafficAccident.existsDiagram, setExistsDiagram] =
      useState<boolean>(false);
    [trafficAccident.existsCertificate, setExistsCertificate] =
      useState<boolean>(false);
  }
  if (type === '貸金返還請求') {
    [lendMoney.loanAmount, setLoanAmount] = useState<string>('');
    [lendMoney.loanDate, setLoanDate] =
      useState<firebase.firestore.Timestamp | null>(null);
    [lendMoney.existsReturnDate, setExistsReturnDate] =
      useState<boolean>(false);
    [lendMoney.returnDate, setReturnDate] =
      useState<firebase.firestore.Timestamp | null>(null);
    [lendMoney.interest, setInterest] = useState<string>('');
    [lendMoney.existsDelayPayment, setExistsDelayPayment] =
      useState<boolean>(false);
    [lendMoney.delayPayment, setDelayPayment] = useState<string>('');
    [lendMoney.returnAmount, setReturnAmount] = useState<string>('');
    [lendMoney.partialReturnDate, setPartialReturnDate] =
      useState<firebase.firestore.Timestamp | null>(null);
    [lendMoney.execute, setExecute] = useState<boolean>(false);
    [lendMoney.interestStartDate, setInterestStartDate] =
      useState<firebase.firestore.Timestamp | null>(null);
    [lendMoney.interestEndDate, setInterestEndDate] =
      useState<firebase.firestore.Timestamp | null>(null);
    [lendMoney.agreement, setAgreement] = useState<string>('');
    [lendMoney.reference, setReference] = useState<string>('');
    [lendMoney.existsContract, setExistsContract] = useState<boolean>(false);
    [lendMoney.existsAcknowledgement, setExistsAcknowledgement] =
      useState<boolean>(false);
    [lendMoney.existsMemorandum, setExistsMemorandum] =
      useState<boolean>(false);
    [lendMoney.existsCertificate, setExistsCertificate] =
      useState<boolean>(false);
  }

  const loadDocument = async () => {
    let data: FirebaseFirestoreTypes.DocumentData | null = null;
    await RNFirestore()
      .collection('complaint')
      .orderBy('updatedAt', 'desc')
      .where('caseId', '==', caseId)
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.map((doc, i) => {
          if (i === 0) {
            setDocId(doc.id);
            data = doc.data();
            setLawsuitCount(data.lawsuitCount);
            setCourtName(data.courtName);
            setName(data.name);
            setPostCode(data.postCode);
            setPrefecture(data.prefecture);
            setCity(data.city);
            setBuilding(data.building);
            setCompany(data.company);
            setPosition(data.position);
            setBusinessType(data.businessType);
            setPhoneNumber(data.phoneNumber);
            setMailingType(data.mailingType);
            setMailingDescription(data.mailingDescription);
            setMailingCompany(data.mailingCompany);
            setMailingPostCode(data.mailingPostCode);
            setMailingPrefecture(data.mailingPrefecture);
            setMailingCity(data.mailingCity);
            setMailingBuilding(data.mailingBuilding);
            setMailingPhoneNumber(data.mailingPhoneNumber);
            setRecipientType(data.recipientType);
            setRecipientName(data.recipientName);
            setOppositeName(data.oppositeName);
            setOppositePostCode(data.oppositePostCode);
            setOppositePrefecture(data.oppositePrefecture);
            setOppositeCity(data.oppositeCity);
            setOppositeBuilding(data.oppositeBuilding);
            setOppositeCompany(data.oppositeCompany);
            setOppositePosition(data.oppositePosition);
            setOppositeBusinessType(data.oppositeBusinessType);
            setOppositePhoneNumber(data.oppositePhoneNumber);
            setOpposite2Name(data.opposite2Name);
            setOpposite2PostCode(data.opposite2PostCode);
            setOpposite2Prefecture(data.opposite2Prefecture);
            setOpposite2City(data.opposite2City);
            setOpposite2Building(data.opposite2Building);
            setOpposite2Company(data.opposite2Company);
            setOpposite2Position(data.opposite2Position);
            setOpposite2BusinessType(data.opposite2BusinessType);
            setOpposite2PhoneNumber(data.opposite2PhoneNumber);
            if (type === '誹謗中傷') {
              setAccountName(data.accountName);
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
              setExistsDelayPayment(data.existsDelayPayment);
              setDelayPayment(data.delayPayment);
              setDelayPaymentStartType(data.delayPaymentStartType);
              setDelayPaymentStartDate(data.delayPaymentStartDate);
              setExecute(data.execute);
              setExistsEvidence(data.existsEvidence);
              setExistsDisclosureDocument(data.existsDisclosureDocument);
              setExistsProviderDocument(data.existsProviderDocument);
              setProviderName(data.providerName);
              setIsTargetAccount(data.isTargetAccount);
              setExistsPosts(data.existsPosts);
            }
            if (type === '返金請求') {
              setService(data.service);
              setSalesDate(data.salesDate);
              setSalesAmount(data.salesAmount);
              setCoolingOffType(data.coolingOffType);
              setExistsDelayPayment(data.existsDelayPayment);
              setDelayPayment(data.delayPayment);
              setDelayPaymentStartType(data.delayPaymentStartType);
              setDelayPaymentStartDate(data.delayPaymentStartDate);
              setExecute(data.execute);
              setContentsCertificatedMailDate(
                data.contentsCertificatedMailDate,
              );
              setExistsContract(data.existsContract);
              setExistsReceipt(data.existsReceipt);
              setExistsEmail(data.existsEmail);
              setExistsTranscriptCopy(data.existsTranscriptCopy);
              setExistsScreenShot(data.existsScreenShot);
            }
            if (type === '給料請求') {
              setWorkStartDate(data.workStartDate);
              setUnpaidSalaryStartDate(data.unpaidSalaryStartDate);
              setUnpaidSalaryEndDate(data.unpaidSalaryEndDate);
              setUnpaidSalary(data.unpaidSalary);
              setExistsDelayPayment(data.existsDelayPayment);
              setDelayPayment(data.delayPayment);
              setDelayPaymentStartType(data.delayPaymentStartType);
              setDelayPaymentStartDate(data.delayPaymentStartDate);
              setExecute(data.execute);
              setBusiness(data.business);
              setJob(data.job);
              setWorkEndDate(data.workEndDate);
              setSalaryType(data.salaryType);
              setSalaryAmount(data.salaryAmount);
              setPaymentDueDay(data.paymentDueDay);
              setClosingMonth(data.closingMonth);
              setClosingDay(data.closingDay);
              setReference(data.reference);
              setExistsStatement(data.existsStatement);
              setExistsCertificate(data.existsCertificate);
            }
            if (type === '売買代金請求') {
              setProduct(data.product);
              setSalesDate(data.salesDate);
              setSalesAmount(data.salesAmount);
              setPaymentDueDate(data.paymentDueDate);
              setPaidAmount(data.paidAmount);
              setExistsDelayPayment(data.existsDelayPayment);
              setDelayPayment(data.delayPayment);
              setDelayPaymentStartType(data.delayPaymentStartType);
              setDelayPaymentStartDate(data.delayPaymentStartDate);
              setExecute(data.execute);
              setBusiness(data.business);
              setReference(data.reference);
              setExistsContract(data.existsContract);
              setExistsInvoice(data.existsInvoice);
              setExistsDeliveryNote(data.existsDeliveryNote);
              setExistsReceipt(data.existsReceipt);
              setExistsCertificate(data.existsCertificate);
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
              setExistsDelayPayment(data.existsDelayPayment);
              setDelayPayment(data.delayPayment);
              setDelayPaymentStartType(data.delayPaymentStartType);
              setDelayPaymentStartDate(data.delayPaymentStartDate);
              setExecute(data.execute);
              setContractDate(data.contractDate);
              setLeasePeriod(data.leasePeriod);
              setAgreement(data.agreement);
              setContractEndDate(data.contractEndDate);
              setReference(data.reference);
              setExistsContract(data.existsContract);
              setExistsCertificate(data.existsCertificate);
              setExistsContentsCertifiedMail(data.existsContentsCertifiedMail);
              setExistsDeliveryCertificate(data.existsDeliveryCertificate);
              setExistsReceipt(data.existsReceipt);
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
              setExistsDelayPayment(data.existsDelayPayment);
              setDelayPayment(data.delayPayment);
              setDelayPaymentStartType(data.delayPaymentStartType);
              setDelayPaymentStartDate(data.delayPaymentStartDate);
              setExecute(data.execute);
              setIsEmployer(data.isEmployer);
              setAccidentDescription(data.accidentDescription);
              setReference(data.reference);
              setExistsAccidentCertificate(data.existsAccidentCertificate);
              setExistsMemorandum(data.existsMemorandum);
              setExistsPhoto(data.existsPhoto);
              setExistsReceipt(data.existsReceipt);
              setExistsEstimate(data.existsEstimate);
              setExistsDiagram(data.existsDiagram);
              setExistsCertificate(data.existsCertificate);
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
              setPartialReturnDate(data.partialReturnDate);
              setExecute(data.execute);
              setInterestStartDate(data.interestStartDate);
              setInterestEndDate(data.interestEndDate);
              setAgreement(data.agreement);
              setReference(data.reference);
              setExistsContract(data.existsContract);
              setExistsAcknowledgement(data.existsAcknowledgement);
              setExistsMemorandum(data.existsMemorandum);
              setExistsCertificate(data.existsCertificate);
            }
          }
        });
      });
    if (data === null) {
      await RNFirestore()
        .collection('contentsCertificatedMail')
        .orderBy('updatedAt', 'desc')
        .where('caseId', '==', caseId)
        .get()
        .then((querySnapshot) => {
          querySnapshot.docs.map((doc, i) => {
            if (i === 0) {
              data = doc.data();
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
              if (type === '誹謗中傷') {
                setOppositeAccountName(data.oppositeAccountName);
                setSlanderStartYear(data.slanderStartYear);
                setSlanderStartMonth(data.slanderStartMonth);
                setSlanderEndYear(data.slanderEndYear);
                setSlanderEndMonth(data.slanderEndMonth);
                setPostedDate(data.postedDate);
                setPost(data.post);
                setPostedDate2(data.postedDate2);
                setPost2(data.post2);
                setIsPointedFact(data.issPointedFact);
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
    }
    if (data !== null) {
    }
  };

  useEffect(() => {
    loadDocument();
  }, []);
  return (
    <ScrollView style={styles.wrapper}>
      <Text style={styles.title}>必要事項を入力しましょう</Text>
      <Text style={styles.description}>裁判に関する情報を入力しましょう</Text>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>
          今回訴訟を起こす裁判所での本年の少額訴訟の回数
        </Text>
        <Text style={styles.required}>必須</Text>
      </View>
      <Text style={styles.inputDescription}>
        同じ裁判所で提訴する少額訴訟の回数は年間10回までに制限されています。
      </Text>
      <View style={{ marginTop: 10 }}>
        <RNPickerSelect
          onValueChange={(value) => setLawsuitCount(value)}
          items={lawsuitCounts}
          style={pickerSelectStylesNarrow}
          value={common.lawsuitCount}
        />
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>簡易裁判所の名前</Text>
        <Text style={styles.required}>必須</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <TextInput
          style={styles.textInputNarrow}
          onChangeText={(value) => setCourtName(value)}
          value={common.courtName}
        />
        <Text style={[styles.inputLabel, { marginLeft: 0 }]}>簡易裁判所</Text>
      </View>
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
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>電話番号</Text>
        <Text style={styles.optional}>任意</Text>
      </View>
      <PhoneNumber
        phoneNumber={common.phoneNumber}
        setPhoneNumber={setPhoneNumber}
      />
      <Text style={styles.description}>
        書類の送達場所に関する情報を入力しましょう
      </Text>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>書類の送達場所</Text>
        <Text style={styles.required}>必須</Text>
      </View>
      <RNPickerSelect
        onValueChange={(value) => setMailingType(value)}
        items={mailingTypes}
        style={pickerSelectStylesWide}
        value={common.mailingType}
      />
      {[2, 3].includes(common.mailingType) ? (
        <>
          {common.mailingType === 3 ? (
            <>
              <Text style={styles.label}>あなたとの関係</Text>
              <TextInput
                style={styles.textInput}
                placeholder="父の家"
                onChangeText={(value) => setMailingDescription(value)}
                value={common.mailingDescription}
              />
            </>
          ) : (
            <>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.label}>勤務先名称</Text>
                <Text style={styles.required}>必須</Text>
              </View>
              <TextInput
                style={styles.textInputWide}
                onChangeText={(value) => setMailingCompany(value)}
                value={common.mailingCompany}
              />
            </>
          )}
          <Address
            postCode={common.mailingPostCode}
            prefecture={common.mailingPrefecture}
            city={common.mailingCity}
            building={common.mailingBuilding}
            setPostCode={setMailingPostCode}
            setPrefecture={setMailingPrefecture}
            setCity={setMailingCity}
            setBuilding={setMailingBuilding}
          />
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.label}>電話番号</Text>
            <Text style={styles.optional}>任意</Text>
          </View>
          <PhoneNumber
            phoneNumber={common.mailingPhoneNumber}
            setPhoneNumber={setMailingPhoneNumber}
          />
        </>
      ) : null}
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>書類の受取人</Text>
        <Text style={styles.required}>必須</Text>
      </View>
      <RNPickerSelect
        onValueChange={(value) => setRecipientType(value)}
        items={recipientTypes}
        style={pickerSelectStyles}
        value={common.recipientType}
      />
      {common.recipientType === 2 ? (
        <>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.label}>書類の受取人名</Text>
            <Text style={styles.required}>必須</Text>
          </View>
          <TextInput
            style={styles.textInput}
            onChangeText={(value) => setRecipientName(value)}
            value={common.recipientName}
          />
        </>
      ) : null}
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
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>電話番号</Text>
        <Text style={styles.optional}>任意</Text>
      </View>
      <PhoneNumber
        phoneNumber={common.oppositePhoneNumber}
        setPhoneNumber={setOppositePhoneNumber}
      />
      {existsComaker ? (
        <>
          <Text style={styles.description}>
            相手方（2人目）がいれば、情報を入力しましょう
          </Text>
          <PersonInfoInputForm
            name={common.opposite2Name}
            postCode={common.opposite2PostCode}
            prefecture={common.opposite2Prefecture}
            city={common.opposite2City}
            building={common.opposite2Building}
            company={common.opposite2Company}
            position={common.opposite2Position}
            businessType={common.opposite2BusinessType}
            setName={setOpposite2Name}
            setPostCode={setOpposite2PostCode}
            setPrefecture={setOpposite2Prefecture}
            setCity={setOpposite2City}
            setBuilding={setOpposite2Building}
            setCompany={setOpposite2Company}
            setPosition={setOpposite2Position}
            setBusinessType={setOpposite2BusinessType}
            required={false}
          />
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.label}>電話番号</Text>
            <Text style={styles.optional}>任意</Text>
          </View>
          <PhoneNumber
            phoneNumber={common.opposite2PhoneNumber}
            setPhoneNumber={setOpposite2PhoneNumber}
          />
        </>
      ) : (
        <></>
      )}
      {type === '誹謗中傷' ? (
        <SNS
          accountName={sns.accountName}
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
          existsDelayPayment={sns.existsDelayPayment}
          delayPayment={sns.delayPayment}
          delayPaymentStartType={sns.delayPaymentStartType}
          delayPaymentStartDate={sns.delayPaymentStartDate}
          execute={sns.execute}
          existsEvidence={sns.existsEvidence}
          existsDisclosureDocument={sns.existsDisclosureDocument}
          existsProviderDocument={sns.existsProviderDocument}
          providerName={sns.providerName}
          isTargetAccount={sns.isTargetAccount}
          existsPosts={sns.existsPosts}
          setAccountName={setAccountName}
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
          setExistsDelayPayment={setExistsDelayPayment}
          setDelayPayment={setDelayPayment}
          setDelayPaymentStartType={setDelayPaymentStartType}
          setDelayPaymentStartDate={setDelayPaymentStartDate}
          setExecute={setExecute}
          setExistsEvidence={setExistsEvidence}
          setExistsDisclosureDocument={setExistsDisclosureDocument}
          setExistsProviderDocument={setExistsProviderDocument}
          setProviderName={setProviderName}
          setIsTargetAccount={setIsTargetAccount}
          setExistsPosts={setExistsPosts}
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
          existsDelayPayment={information.existsDelayPayment}
          delayPayment={information.delayPayment}
          delayPaymentStartType={information.delayPaymentStartType}
          delayPaymentStartDate={information.delayPaymentStartDate}
          execute={information.execute}
          contentsCertificatedMailDate={
            information.contentsCertificatedMailDate
          }
          existsContract={information.existsContract}
          existsReceipt={information.existsReceipt}
          existsEmail={information.existsEmail}
          existsTranscriptCopy={information.existsTranscriptCopy}
          existsScreenShot={information.existsScreenShot}
          setService={setService}
          setSalesDate={setSalesDate}
          setSalesAmount={setSalesAmount}
          setCoolingOffType={setCoolingOffType}
          setExistsDelayPayment={setExistsDelayPayment}
          setDelayPayment={setDelayPayment}
          setDelayPaymentStartType={setDelayPaymentStartType}
          setDelayPaymentStartDate={setDelayPaymentStartDate}
          setExecute={setExecute}
          setContentsCertificatedMailDate={setContentsCertificatedMailDate}
          setExistsContract={setExistsContract}
          setExistsReceipt={setExistsReceipt}
          setExistsEmail={setExistsEmail}
          setExistsTranscriptCopy={setExistsTranscriptCopy}
          setExistsScreenShot={setExistsScreenShot}
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
          existsDelayPayment={salary.existsDelayPayment}
          delayPayment={salary.delayPayment}
          delayPaymentStartType={salary.delayPaymentStartType}
          delayPaymentStartDate={salary.delayPaymentStartDate}
          execute={salary.execute}
          business={salary.business}
          job={salary.job}
          workEndDate={salary.workEndDate}
          salaryType={salary.salaryType}
          salaryAmount={salary.salaryAmount}
          paymentDueDay={salary.paymentDueDay}
          closingMonth={salary.closingMonth}
          closingDay={salary.closingDay}
          reference={salary.reference}
          existsStatement={salary.existsStatement}
          existsCertificate={salary.existsCertificate}
          setWorkStartDate={setWorkStartDate}
          setUnpaidSalaryStartDate={setUnpaidSalaryStartDate}
          setUnpaidSalaryEndDate={setUnpaidSalaryEndDate}
          setUnpaidSalary={setUnpaidSalary}
          setExistsDelayPayment={setExistsDelayPayment}
          setDelayPayment={setDelayPayment}
          setDelayPaymentStartType={setDelayPaymentStartType}
          setDelayPaymentStartDate={setDelayPaymentStartDate}
          setExecute={setExecute}
          setBusiness={setBusiness}
          setJob={setJob}
          setWorkEndDate={setWorkEndDate}
          setSalaryType={setSalaryType}
          setSalaryAmount={setSalaryAmount}
          setPaymentDueDay={setPaymentDueDay}
          setClosingMonth={setClosingMonth}
          setClosingDay={setClosingDay}
          setReference={setReference}
          setExistsStatement={setExistsStatement}
          setExistsCertificate={setExistsCertificate}
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
          existsDelayPayment={tradingValue.existsDelayPayment}
          delayPayment={tradingValue.delayPayment}
          delayPaymentStartType={tradingValue.delayPaymentStartType}
          delayPaymentStartDate={tradingValue.delayPaymentStartDate}
          execute={tradingValue.execute}
          business={tradingValue.business}
          reference={tradingValue.reference}
          existsContract={tradingValue.existsContract}
          existsInvoice={tradingValue.existsInvoice}
          existsDeliveryNote={tradingValue.existsDeliveryNote}
          existsReceipt={tradingValue.existsReceipt}
          existsCertificate={tradingValue.existsCertificate}
          setProduct={setProduct}
          setSalesDate={setSalesDate}
          setSalesAmount={setSalesAmount}
          setPaymentDueDate={setPaymentDueDate}
          setPaidAmount={setPaidAmount}
          setExistsDelayPayment={setExistsDelayPayment}
          setDelayPayment={setDelayPayment}
          setDelayPaymentStartType={setDelayPaymentStartType}
          setDelayPaymentStartDate={setDelayPaymentStartDate}
          setExecute={setExecute}
          setBusiness={setBusiness}
          setReference={setReference}
          setExistsContract={setExistsContract}
          setExistsInvoice={setExistsInvoice}
          setExistsDeliveryNote={setExistsDeliveryNote}
          setExistsReceipt={setExistsReceipt}
          setExistsCertificate={setExistsCertificate}
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
          existsDelayPayment={securityDeposit.existsDelayPayment}
          delayPayment={securityDeposit.delayPayment}
          delayPaymentStartType={securityDeposit.delayPaymentStartType}
          delayPaymentStartDate={securityDeposit.delayPaymentStartDate}
          execute={securityDeposit.execute}
          contractDate={securityDeposit.contractDate}
          leasePeriod={securityDeposit.leasePeriod}
          agreement={securityDeposit.agreement}
          contractEndDate={securityDeposit.contractEndDate}
          reference={securityDeposit.reference}
          existsContract={securityDeposit.existsContract}
          existsCertificate={securityDeposit.existsCertificate}
          existsContentsCertifiedMail={
            securityDeposit.existsContentsCertifiedMail
          }
          existsDeliveryCertificate={securityDeposit.existsDeliveryCertificate}
          existsReceipt={securityDeposit.existsReceipt}
          setRentPostCode={setRentPostCode}
          setRentPrefecture={setRentPrefecture}
          setRentCity={setRentCity}
          setRentBuilding={setRentBuilding}
          setRent={setRent}
          setExpenses={setExpenses}
          setDepositAmount={setDepositAmount}
          setLeavingDate={setLeavingDate}
          setExistsDelayPayment={setExistsDelayPayment}
          setDelayPayment={setDelayPayment}
          setDelayPaymentStartType={setDelayPaymentStartType}
          setDelayPaymentStartDate={setDelayPaymentStartDate}
          setExecute={setExecute}
          setContractDate={setContractDate}
          setLeasePeriod={setLeasePeriod}
          setAgreement={setAgreement}
          setContractEndDate={setContractEndDate}
          setReference={setReference}
          setExistsContract={setExistsContract}
          setExistsCertificate={setExistsCertificate}
          setExistsContentsCertifiedMail={setExistsContentsCertifiedMail}
          setExistsDeliveryCertificate={setExistsDeliveryCertificate}
          setExistsReceipt={setExistsReceipt}
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
          existsDelayPayment={trafficAccident.existsDelayPayment}
          delayPayment={trafficAccident.delayPayment}
          delayPaymentStartType={trafficAccident.delayPaymentStartType}
          delayPaymentStartDate={trafficAccident.delayPaymentStartDate}
          execute={trafficAccident.execute}
          isEmployer={trafficAccident.isEmployer}
          accidentDescription={trafficAccident.accidentDescription}
          reference={trafficAccident.reference}
          existsAccidentCertificate={trafficAccident.existsAccidentCertificate}
          existsMemorandum={trafficAccident.existsMemorandum}
          existsPhoto={trafficAccident.existsPhoto}
          existsReceipt={trafficAccident.existsReceipt}
          existsEstimate={trafficAccident.existsEstimate}
          existsDiagram={trafficAccident.existsDiagram}
          existsCertificate={trafficAccident.existsCertificate}
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
          setExistsDelayPayment={setExistsDelayPayment}
          setDelayPayment={setDelayPayment}
          setDelayPaymentStartType={setDelayPaymentStartType}
          setDelayPaymentStartDate={setDelayPaymentStartDate}
          setExecute={setExecute}
          setIsEmployer={setIsEmployer}
          setAccidentDescription={setAccidentDescription}
          setReference={setReference}
          setExistsAccidentCertificate={setExistsAccidentCertificate}
          setExistsMemorandum={setExistsMemorandum}
          setExistsPhoto={setExistsPhoto}
          setExistsReceipt={setExistsReceipt}
          setExistsEstimate={setExistsEstimate}
          setExistsDiagram={setExistsDiagram}
          setExistsCertificate={setExistsCertificate}
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
          partialReturnDate={lendMoney.partialReturnDate}
          execute={lendMoney.execute}
          interestStartDate={lendMoney.interestStartDate}
          interestEndDate={lendMoney.interestEndDate}
          agreement={lendMoney.agreement}
          reference={lendMoney.reference}
          existsContract={lendMoney.existsContract}
          existsAcknowledgement={lendMoney.existsAcknowledgement}
          existsMemorandum={lendMoney.existsMemorandum}
          existsCertificate={lendMoney.existsCertificate}
          setLoanAmount={setLoanAmount}
          setLoanDate={setLoanDate}
          setExistsReturnDate={setExistsReturnDate}
          setReturnDate={setReturnDate}
          setInterest={setInterest}
          setExistsDelayPayment={setExistsDelayPayment}
          setDelayPayment={setDelayPayment}
          setReturnAmount={setReturnAmount}
          setPartialReturnDate={setPartialReturnDate}
          setExecute={setExecute}
          setInterestStartDate={setInterestStartDate}
          setInterestEndDate={setInterestEndDate}
          setAgreement={setAgreement}
          setReference={setReference}
          setExistsContract={setExistsContract}
          setExistsAcknowledgement={setExistsAcknowledgement}
          setExistsMemorandum={setExistsMemorandum}
          setExistsCertificate={setExistsCertificate}
        />
      ) : (
        <></>
      )}
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
            navigation.navigate('訴状の確認', {
              constant: type,
              variable: '訴状',
              id: caseId,
            });
          }
        }}
      />
    </ScrollView>
  );
};

export default Complaint;
