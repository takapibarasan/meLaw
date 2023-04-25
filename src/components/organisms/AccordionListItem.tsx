import React, { FC } from 'react';
import { Text, ListItem } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { List } from 'react-native-paper';
import { FAQ } from '../../data/faqs';

type Props = {
  data: FAQ;
  key: number;
};

const AccordionListItem: FC<Props> = ({ data, key }) => {
  const [expanded, setExpanded] = React.useState(false);
  return (
    <>
      <List.Accordion
        expanded={expanded}
        onPress={() => {
          setExpanded(!expanded);
        }}
        title={data.title}
        titleStyle={
          expanded
            ? { color: 'white', fontWeight: 'bold' }
            : { color: '#535353', fontWeight: 'bold' }
        }
        style={
          expanded
            ? { backgroundColor: '#EB5757' }
            : { backgroundColor: 'white' }
        }
      >
        {data.content.map((item, i) => (
          <Text
            style={{
              fontSize: 16,
              backgroundColor: 'white',
              paddingLeft: 10,
              paddingRight: 10,
              paddingTop: 20,
              paddingBottom: 20,
              marginBottom: 3,
            }}
          >
            {item}
          </Text>
        ))}
      </List.Accordion>
    </>
  );
};

export default AccordionListItem;
