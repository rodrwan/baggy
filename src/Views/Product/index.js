import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  Button,
  Image,
  ScrollView,
  Dimensions,
  Modal,
  TouchableHighlight,
} from 'react-native';

import CameraRoll from '@react-native-community/cameraroll';
import config from '../../config';
import Moment from 'moment';

const PendingView = () => (
  <View
    style={{
      flex: 1,
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
    <Text>Waiting</Text>
  </View>
);

const dimensions = Dimensions.get('window');
const imageHeight = Math.round((dimensions.width * 9) / 16);
const imageWidth = dimensions.width;

const Product = ({ navigation, route }) => {
  const { id } = route.params;

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [index, setIndex] = useState([]);

  console.log(`${config.BASE_URL}/api/items/${id}`);
  useEffect(() => {
    fetch(`${config.BASE_URL}/api/items/${id}`)
      .then((response) => response.json())
      .then((json) => setData(json.data))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <SafeAreaView style={styles.safeContainer}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View style={styles.container}>
          <View style={styles.basicInfo}>
            <Text style={styles.basicInfoName}>{data.name}</Text>
            <Text>{data.description}</Text>
          </View>
          <View style={styles.extraInfo}>
            {!data.infos ? (
              <View>
                <Text>Aún no hay información de este producto</Text>
                <Button
                  title="Agregar información"
                  onPress={() =>
                    navigation.navigate('AddInfo', {
                      itemId: id,
                      name: data.name,
                    })
                  }
                />
              </View>
            ) : null}
            {data.infos &&
              data.infos.map((i) => {
                return (
                  <View key={i.id}>
                    {/* should put an image carrousel */}
                    <ScrollView
                      horizontal={true}
                      contentContainerStyle={{
                        width: `${100 * (i.images ? i.images.length : 1)}%`,
                      }}
                      showsHorizontalScrollIndicator={false}
                      scrollEventThrottle={200}
                      decelerationRate="fast"
                      pagingEnabled>
                      {i.images &&
                        i.images.map((img) => {
                          return (
                            <Image
                              style={{ width: imageWidth, height: imageHeight }}
                              key={img.id}
                              source={{
                                uri: img.image_url,
                              }}
                            />
                          );
                        })}
                    </ScrollView>
                    <View>
                      <Button
                        style={styles.capture}
                        title="Añadir imagen"
                        navigation={navigation}
                        onPress={() =>
                          navigation.navigate('Camera', {
                            id: id,
                          })
                        }
                      />
                      <Button
                        style={styles.capture}
                        title="Abrir imágenes"
                        onPress={() => {
                          CameraRoll.getPhotos({
                            first: 20,
                            assetType: 'All',
                          }).then((r) => {
                            setPhotos(r.edges);
                            setModalVisible(true);
                          });
                        }}
                      />
                    </View>
                    <View style={styles.priceContainer}>
                      <Text style={styles.price}>${i.price}</Text>
                    </View>
                    <View>
                      <Text style={styles.featuresTitle}>Caracteristicas</Text>
                      <View style={styles.featureRow}>
                        <Text style={styles.leftCol}>Marca</Text>
                        <Text>{i.brand}</Text>
                      </View>
                      <View style={styles.featureRow}>
                        <Text style={styles.leftCol}>Lugar de compra</Text>
                        <Text>{i.purchase_place}</Text>
                      </View>
                      <View style={styles.featureRow}>
                        <Text style={styles.leftCol}>Fecha de compra</Text>
                        <Text>
                          {Moment(i.purchase_date).format('DD/MM/YYYY')}
                        </Text>
                      </View>
                      <View style={styles.featureRow}>
                        <Text style={styles.leftCol}>Fecha de expiración</Text>
                        <Text>
                          {Moment(i.expiration_date).format('DD/MM/YYYY')}
                        </Text>
                      </View>
                    </View>
                  </View>
                );
              })}
          </View>
          {/* Actions here */}
          <Button
            title="Go to products"
            onPress={() => navigation.navigate('Products')}
          />
          <GaleryModal
            photos={photos}
            index={index}
            modalVisible={modalVisible}
            setIndex={setIndex}
            setModalVisible={setModalVisible}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const GaleryModal = ({
  photos,
  index,
  modalVisible,
  setIndex,
  setModalVisible,
}) => {
  return (
    <Modal
      animationType={'slide'}
      transparent={false}
      visible={modalVisible}
      onRequestClose={() => console.log('closed')}>
      <SafeAreaView style={styles.modalContainer}>
        <Button title="Close" onPress={setModalVisible} />
        <ScrollView contentContainerStyle={styles.scrollView}>
          {photos.map((p, i) => {
            return (
              <TouchableHighlight
                style={{ opacity: i === index ? 0.5 : 1 }}
                key={i}
                underlayColor="transparent"
                onPress={() => setIndex(i)}>
                <Image
                  style={{
                    width: imageWidth / 3,
                    height: imageWidth / 3,
                  }}
                  source={{ uri: p.node.image.uri }}
                />
              </TouchableHighlight>
            );
          })}
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};
const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  container: { flex: 1, padding: 8 },
  basicInfo: {
    borderBottomWidth: 1,
    borderBottomColor: '#dfdfdf',
    paddingBottom: 16,
  },
  basicInfoName: { fontSize: 16, fontWeight: 'bold' },
  extraInfo: {
    borderBottomWidth: 1,
    borderBottomColor: '#dfdfdf',
    paddingTop: 16,
    paddingBottom: 16,
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
  priceContainer: {
    paddingBottom: 8,
    paddingTop: 8,
  },
  featuresTitle: { paddingBottom: 8, fontWeight: 'bold' },
  featureRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  leftCol: { width: '50%' },
  price: { color: 'red', fontWeight: 'bold' },
  modalContainer: {
    paddingTop: 20,
    flex: 1,
  },
  scrollView: {
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
});

export default Product;
