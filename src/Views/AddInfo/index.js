import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TextInput,
  View,
  Text,
  Button,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import Moment from 'moment';
import config from '../../config';

const AddProduct = ({ navigation, route }) => {
  const { itemId, name } = route.params;
  // variable, modifier, initial value.
  const [brand, setBrand] = useState('');
  const [price, setPrice] = useState('');
  const [purchasePlace, setPurchasePlace] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [data, setData] = useState({});
  const [isLoading, setLoading] = useState(false);

  const onPress = () => {
    setLoading(true);
    const data = {
      brand,
      price: parseFloat(price),
      purchase_place: purchasePlace,
      purchase_date: Moment(purchaseDate, 'DD/MM/YYYY').format(
        'YYYY-MM-DDTHH:mm:ssZ',
      ),
      expiration_date: Moment(expirationDate, 'DD/MM/YYYY').format(
        'YYYY-MM-DDTHH:mm:ssZ',
      ),
    };
    console.log(data);
    fetch(`${config.BASE_URL}/api/items/${itemId}/info`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((json) => {
        navigation.navigate('Product', {
          id: json.data.itemId,
        });
        setData(json.data);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Text>{name}</Text>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setBrand(text)}
            value={brand}
            autoCorrect={false}
            placeholder="Marca"
          />
          <TextInput
            style={styles.input}
            onChangeText={(text) => setPrice(text)}
            value={price}
            autoCorrect={false}
            placeholder="Precio"
          />
          <TextInput
            style={styles.input}
            onChangeText={(text) => setPurchasePlace(text)}
            value={purchasePlace}
            placeholder="Lugar de compra"
          />
          <TextInput
            style={styles.input}
            onChangeText={(text) => setPurchaseDate(text)}
            value={purchaseDate}
            placeholder="Fecha de compra"
          />
          <TextInput
            style={styles.input}
            onChangeText={(text) => setExpirationDate(text)}
            value={expirationDate}
            placeholder="Fecha de vencimiento"
          />
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <TouchableOpacity style={styles.button} onPress={onPress}>
              <Text>Actualizar</Text>
            </TouchableOpacity>
          )}

          <Button
            title="Go to products"
            onPress={() => navigation.navigate('Products')}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
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
  form: {
    padding: 10,
  },
  countContainer: {
    alignItems: 'center',
    padding: 10,
  },
  input: {
    paddingLeft: 8,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 8,
  },
});

export default AddProduct;
