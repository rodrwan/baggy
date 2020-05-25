// extracted from https://medium.com/@benhur.quintino/react-native-creating-a-custom-listview-9cdc2868a6fa
import React from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import CustomRow from './CustomRow';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const CustomListview = ({ navigation, itemList }) => (
  <View style={styles.container}>
    <FlatList
      data={itemList}
      renderItem={({ item }) => (
        <CustomRow
          navigation={navigation}
          name={item.name}
          description={item.description}
          id={item.id}
        />
      )}
    />
  </View>
);

export default CustomListview;
