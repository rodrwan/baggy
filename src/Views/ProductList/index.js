import React, { useState, useEffect } from 'react';

import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Button,
  ActivityIndicator,
} from 'react-native';

import config from '../../config';
import CustomListview from '../../components/CustomListview';

function ProductList({ navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    console.log(`${config.BASE_URL}/api/items`);
    fetch(`${config.BASE_URL}/api/items`)
      .then((response) => response.json())
      .then((json) => setData(json.data))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <SafeAreaView style={styles.container}>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <View style={{ flex: 1, padding: 8 }}>
            <Text>Lista de productos</Text>
            <CustomListview navigation={navigation} itemList={data} />
            <Button
              title="Go to Add"
              onPress={() => navigation.navigate('Add')}
            />
          </View>
        )}
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
    padding: 10,
  },
  h1: {
    fontSize: 18,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    borderRadius: 8,
    marginTop: 8,
    marginBottom: 8,
  },
  countContainer: {
    alignItems: 'center',
    padding: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
  },
});

export default ProductList;
