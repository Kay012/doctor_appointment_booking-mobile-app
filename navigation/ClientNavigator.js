import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import React from 'react'
import ClientProfileScreen from '../screens/client/ClientProfileScreen'
import ClientBookingsScreen from '../screens/client/ClientBookingsScreen'
import ClientHomeScreen from '../screens/client/ClientHomeScreen'
import { createStackNavigator } from '@react-navigation/stack'
import DoctorDetails from '../screens/client/DoctorDetails'
import EditProfileScreen from '../screens/client/EditProfileScreen'
import ChangeProfilePhotoScreen from '../screens/client/ChangeProfilePhotoScreen'
import SelectedDoctorCategoryScreen from '../screens/client/SelectedDoctorCategoryScreen'

const Stack = createStackNavigator();
const BottomTabsNavigator = createMaterialBottomTabNavigator();

export const ClientNavigator = () => {
   
    return (
        <Stack.Navigator >
            <Stack.Screen name="ClientHome" component={Tabs} options={{headerTitle: "Doctor"}}/>
            <Stack.Screen name="DoctorDetailsScreen" component={DoctorDetails} />
            <Stack.Screen name="SelectedDoctorCategoryScreen" component={SelectedDoctorCategoryScreen} />
            <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
            <Stack.Screen name="ChangeProfilePhotoScreen" component={ChangeProfilePhotoScreen} />
        </Stack.Navigator>
        
    )
}

export const Tabs = () => {
    return(
        <BottomTabsNavigator.Navigator>
            <BottomTabsNavigator.Screen name="ClientHomeScreen" component={ClientHomeScreen}
            options={{
                
                tabBarLabel: "Home",
                tabBarIcon: () => (
                    <MaterialCommunityIcons name="home" size={26} />
                )
                
            }}
            
            listeners ={({navigation}) => ({
                tabPress: (event) => {
                    event.preventDefault();
                    navigation.navigate("ClientHomeScreen")
                }
            })} 
            />
            <BottomTabsNavigator.Screen name="ClientBookingsScreen" component={ClientBookingsScreen}
            options={{
                tabBarLabel: "Bookings",
                tabBarIcon: () => (
                    <MaterialCommunityIcons name="pencil" size={26} />
                )
            }}
            
            listeners={({navigation}) => ({
                tabPress: (event) => {
                    event.preventDefault()
                    navigation.navigate("ClientBookingsScreen")
                }
            })}/>
            <BottomTabsNavigator.Screen name="ClientProfileScreen" component={ClientProfileScreen}
            options={{
                tabBarLabel: "Profile",
                tabBarIcon: () => {
                    <MaterialCommunityIcons name="account-circle" size={26} />
                }
            }}
            
            listeners={({navigation}) => ({
                tabPress: (event) => {
                    event.preventDefault()
                    navigation.navigate("ClientProfileScreen")
                }
            })}/>
        </BottomTabsNavigator.Navigator>
    )
}
