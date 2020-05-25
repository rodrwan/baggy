import React from 'react';
import { StatusBar } from 'react-native';

import AddProductScreen from './Views/AddProduct';
import AddInfoScreen from './Views/AddInfo';
import ProductListScreen from './Views/ProductList';
import ProductScreen from './Views/Product';
import CameraScreen from './Views/Camera';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import { Provider } from 'react-redux';
// import store from './store';

const Stack = createStackNavigator();

const App = () => {
  return (
    // <Provider store={store}>
    <NavigationContainer>
      <StatusBar barStyle="dark-content" />
      <Stack.Navigator>
        <Stack.Screen
          name="Add"
          component={AddProductScreen}
          options={{ title: 'Añadir nuevo producto' }}
        />
        <Stack.Screen
          name="Products"
          component={ProductListScreen}
          options={{ title: 'Productos' }}
        />
        <Stack.Screen
          name="Product"
          component={ProductScreen}
          options={{ title: 'Producto' }}
        />
        <Stack.Screen
          name="AddInfo"
          component={AddInfoScreen}
          options={{ title: 'Información adicional' }}
        />
        <Stack.Screen
          name="Camera"
          component={CameraScreen}
          options={{ title: 'Camara' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
    // </Provider>
  );
};

export default App;
