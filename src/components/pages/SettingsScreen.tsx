import React, { FC } from 'react';
import { ScrollView } from 'react-native';
import { faqData } from '../../data/faqs';
import { Text } from 'react-native-elements';
import AccordionListItem from '../organisms/AccordionListItem';

const SettingsScreen: FC = () => {
  return (
    <ScrollView>
      {faqData.map((item, i) => (
        <AccordionListItem data={item} key={i} />
      ))}
    </ScrollView>
  );
};

export default SettingsScreen;
