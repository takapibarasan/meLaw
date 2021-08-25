import React, { FC } from 'react';
import { Text, ListItem } from 'react-native-elements';
import { FAQ } from '../../data/faqs';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  title: {
    color: 'black',
  },
});

type Props = {
  data: FAQ;
};

const AccordionListItem: FC<Props> = ({ data }) => {
  const [expanded, setExpanded] = React.useState(false);
  return (
    <ListItem.Accordion
      content={
        <ListItem.Content>
          <ListItem.Title style={styles.title}>{data.title}</ListItem.Title>
        </ListItem.Content>
      }
      isExpanded={expanded}
      onPress={() => {
        setExpanded(!expanded);
      }}
      containerStyle={expanded ? { backgroundColor: '#fedcbd' } : {}}
    >
      <ListItem>
        <Text>{data.content}</Text>
      </ListItem>
    </ListItem.Accordion>
  );
};

export default AccordionListItem;
