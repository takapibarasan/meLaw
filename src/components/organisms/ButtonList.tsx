import { useNavigation } from '@react-navigation/native';
import React, { FC } from 'react';
import { Text, Icon, ListItem } from 'react-native-elements';
import { Menu } from '../../data/menus';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
  number: {
    color: '#EB5757',
  },
  title: {
    fontSize: 20,
    color: 'black',
  },
  bold: {
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
  },
});

type Props = {
  buttons: Menu[];
  existsSubtitle: boolean;
  constant: string;
};

const ButtonList: FC<Props> = ({ buttons, existsSubtitle, constant }) => {
  const navigation = useNavigation();
  return (
    <ScrollView>
      {buttons.map((item, i) => (
        <ListItem
          key={i}
          bottomDivider
          onPress={() => {
            if (item.screen !== 'pass') {
              navigation.navigate(item.screen, {
                constant: constant,
                variable: item.variable,
              });
            }
          }}
        >
          {item.number ? (
            <Text h2 style={styles.number}>
              {item.number}
            </Text>
          ) : (
            <></>
          )}
          <ListItem.Content>
            <ListItem.Title
              style={(styles.title, existsSubtitle && styles.bold)}
            >
              {item.title}
            </ListItem.Title>
            {item.subtitle ? (
              <ListItem.Subtitle style={styles.subtitle}>
                {item.subtitle}
              </ListItem.Subtitle>
            ) : (
              <></>
            )}
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      ))}
    </ScrollView>
  );
};

export default ButtonList;
