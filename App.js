import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppNavigator from './navigation/AppNavigator';

import {createStore, applyMiddleware, combineReducers} from 'redux'
import {Provider, useDispatch} from 'react-redux'
import ReduxThunk from 'redux-thunk'
import { bookStatusReducer, fetchAppointmentsReducer, fetchCurrentUserReducer, fetchDoctorsReducer } from './store/reducer';


import ClientProfileScreen from './screens/client/ClientProfileScreen';
import EditProfileScreen from './screens/client/EditProfileScreen';

const rootReducer = combineReducers({
  bookStatus: bookStatusReducer,
  doctorsList: fetchDoctorsReducer,
  currentUser: fetchCurrentUserReducer,
  appointmentsList: fetchAppointmentsReducer,
  favouritesBoolean: fetchCurrentUserReducer
})

const store = createStore(rootReducer, applyMiddleware(ReduxThunk))

export default function App() {

  return (
    <View style={styles.container}>
      <Provider store={store}>
        {/* <EditProfileScreen/> */}
        <AppNavigator/>
      </Provider>
      {/* <StatusBar style="auto" /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
