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

import config from '../../config';

const AddProduct = ({ navigation }) => {
  // variable, modifier, initial value.
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setLoading] = useState(false);

  const onPress = () => {
    setLoading(true);
    fetch(`${config.BASE_URL}/api/items`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        description,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        navigation.navigate('AddInfo', {
          itemId: json.data.id,
          name: json.data.name,
        });
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={styles.form}>
          <Text>Nombre producto</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setName(text)}
            value={name}
            autoCorrect={false}
          />
          <Text>Descripción</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setDescription(text)}
            value={description}
          />
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <TouchableOpacity style={styles.button} onPress={onPress}>
              <Text>Agregar</Text>
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
  },
});

export default AddProduct;
