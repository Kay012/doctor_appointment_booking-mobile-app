import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import React from 'react'
import DoctorProfileScreen from '../screens/doctor/DoctorProfileScreen'
import DoctorBookingsScreen from '../screens/doctor/DoctorBookingsScreen'
import DoctorHomeScreen from '../screens/doctor/DoctorHomeScreen'
import { createStackNavigator } from '@react-navigation/stack'
// import DoctorDetails from '../screens/doctor/DoctorDetails'
import EditProfileScreen from '../screens/client/EditProfileScreen'
import ChangeProfilePhotoScreen from '../screens/client/ChangeProfilePhotoScreen'

const Stack = createStackNavigator();
const BottomTabsNavigator = createMaterialBottomTabNavigator();

export const DoctorNavigator = () => {
   
    return (
        <Stack.Navigator >
            <Stack.Screen name="DoctorHome" component={Tabs} options={{headerTitle: "Doctor"}}/>
            {/* <Stack.Screen name="DoctorDetailsScreen" component={DoctorDetails} /> */}
            <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
            <Stack.Screen name="ChangeProfilePhotoScreen" component={ChangeProfilePhotoScreen} />
        </Stack.Navigator>
        
    )
}

export const Tabs = () => {
    return(
        <BottomTabsNavigator.Navigator>
            <BottomTabsNavigator.Screen name="DoctorHomeScreen" component={DoctorHomeScreen}
            options={{
                
                tabBarLabel: "Home",
                tabBarIcon: () => (
                    <MaterialCommunityIcons name="home" size={26} />
                )
                
            }}
            
            listeners ={({navigation}) => ({
                tabPress: (event) => {
                    event.preventDefault();
                    navigation.navigate("DoctorHomeScreen")
                }
            })} 
            />
            <BottomTabsNavigator.Screen name="DoctorBookingsScreen" component={DoctorBookingsScreen}
            options={{
                tabBarLabel: "Bookings",
                tabBarIcon: () => (
                    <MaterialCommunityIcons name="pencil" size={26} />
                )
            }}
            
            listeners={({navigation}) => ({
                tabPress: (event) => {
                    event.preventDefault()
                    navigation.navigate("DoctorBookingsScreen")
                }
            })}/>
            <BottomTabsNavigator.Screen name="DoctorProfileScreen" component={DoctorProfileScreen}
            options={{
                tabBarLabel: "Profile",
                tabBarIcon: () => {
                    <MaterialCommunityIcons name="account-circle" size={26} />
                }
            }}
            
            listeners={({navigation}) => ({
                tabPress: (event) => {
                    event.preventDefault()
                    navigation.navigate("DoctorProfileScreen")
                }
            })}/>
        </BottomTabsNavigator.Navigator>
    )
}
