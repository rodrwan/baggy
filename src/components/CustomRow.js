// extracted from https://medium.com/@benhur.quintino/react-native-creating-a-custom-listview-9cdc2868a6fa
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    // marginLeft: 8,
    // marginRight: 8,
    marginTop: 8,
    marginBottom: 8,
    borderRadius: 5,
    backgroundColor: '#FFF',
    elevation: 2,
  },
  title: {
    fontSize: 16,
    color: '#000',
  },
  container_text: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 12,
    justifyContent: 'center',
  },
  description: {
    fontSize: 11,
    fontStyle: 'italic',
  },
  photo: {
    height: 50,
    width: 50,
  },
});

const CustomRow = ({ navigation, name, description, id }) => (
  <TouchableOpacity
    onPress={() => {
      /* 1. Navigate to the Details route with params */
      navigation.navigate('Product', {
        id,
      });
    }}
  >
    <View style={styles.container}>
      {/* <Image source={{ uri: image_url }} style={styles.photo} /> */}
      <View style={styles.container_text}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

export default CustomRow;
