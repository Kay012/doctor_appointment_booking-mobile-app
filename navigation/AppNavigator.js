import {NavigationContainer } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import { io } from 'socket.io-client';
import { ClientNavigator, Tabs } from './ClientNavigator'


import * as Actions from './../store/actions'
import { useDispatch, useSelector } from 'react-redux'
import AuthNavigator from './AuthNavigator'
import { getAuth, signOut } from '@firebase/auth'
import { DoctorNavigator } from './DoctorNavigator'
const AppNavigator = () => {
    const currentUser = useSelector(state => state.currentUser.currentUserDetails)

    const [isLoading, setIsLoading] = useState(false)
    const [isLogged, setIsLogged] = useState(false)
    const [socket, setSocket] = useState(null)
    const auth = getAuth()
    const dispatch = useDispatch()
  
    useEffect(() => {
        const esish = async() => {
           auth.onAuthStateChanged(async(user) => {
              if(user){
                //      await signOut(auth)
                //   await dispatch(Actions.SignOutUser())
                    setIsLogged(true)
                    setIsLoading(true)
                    const sockt = io("ws://localhost:8900");
                    console.log("initiating connection")
                    setSocket(sockt)
                    await dispatch(Actions.fetchUser(user.uid, sockt))
                    setIsLoading(false)
                    console.log("fetching data")
                    await dispatch(Actions.fetchAppointments())
              }
              else {console.log("Failed"); setIsLogged(false)}
          })
          
        }
        esish()
        
        console.log("mainopage", currentUser)
        
    }, [])
    
    if(isLoading) return <View><Text>Loading...</Text></View>

    if(!isLogged){
        return (
            <SafeAreaView style={{flex: 1}}>
                <NavigationContainer>
                    <AuthNavigator/>
                </NavigationContainer>
            </SafeAreaView>
            
        )
    }
    if(currentUser?.role === 0){
        socket.emit("addClient", (currentUser.id))
        return (
            <SafeAreaView style={{flex: 1}}>
                <NavigationContainer>
                    <ClientNavigator/>
                </NavigationContainer>
            </SafeAreaView>
        )
    }
    else if(currentUser?.role === 1){
        socket.emit("addDoctor", (currentUser.id))
        return(
            <SafeAreaView style={{flex: 1}}>
                <NavigationContainer>
                    <DoctorNavigator/>
                </NavigationContainer>
            </SafeAreaView>
        )
    }
    return (
         <View><Text>Loading...</Text></View>
        // <SafeAreaView style={{flex: 1}}>
        //     <NavigationContainer>
        //         <AuthNavigator/>
        //     </NavigationContainer>
        // </SafeAreaView>
        
    )
}

export default AppNavigator

const styles = StyleSheet.create({})
