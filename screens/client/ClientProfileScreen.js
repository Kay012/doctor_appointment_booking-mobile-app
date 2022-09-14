import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Button, FlatList } from 'react-native'
import { AirbnbRating, Rating  } from 'react-native-elements'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { signOut, getAuth } from '@firebase/auth'
import * as Actions from '../../store/actions'
import { useSelector, useDispatch } from 'react-redux'

import ClientHomeScreen from './ClientHomeScreen'
import DoctorItem from '../../components/DoctorItem'

const ClientProfileScreen = ({doctorId, name, profession, town, opens, closes, stars, avatarSize, options, navigation}) => {
    const doctors = useSelector(state => state.doctorsList.doctors)
    const currentUser = useSelector(state => state.currentUser.currentUserDetails)
    // const favouritesUpdated = useSelector(state => state.currentUser.favouritesCallback)

    const [favDoctors, setFavDoctores] = useState([])
    const [open, setOpen] = useState(false)
    const dispatch = useDispatch()
    const auth = getAuth()
    
    let faves = [];
    useEffect(()=> {
        if(currentUser.favourite_doctors?.length > 0){
                currentUser.favourite_doctors.forEach(dr => {
                    // const fave = doctors.find(docta => docta.id = dr)
                    doctors.forEach(docta => {
                        if(docta.id === dr){
                            faves.push(docta)
                        }
                        return
                    })
            })
            setFavDoctores([...faves])
        }
       
    }, [currentUser.favourite_doctors])
    const logoutHandler = async() => {
        await signOut(auth)
        await dispatch(Actions.SignOutUser())
        // navigation.navigate("LoginScreen")
    }
    
    // console.log(favouritesUpdated)
    return (
        <View style={styles.item}>
            {/* <View s> */}
                <View style={styles.top}>
                    <Avatar rounded size="large" 
                    source={{uri: "https://media.istockphoto.com/photos/team-of-doctors-and-nurses-in-hospital-picture-id1307543618?b=1&k=20&m=1307543618&s=170667a&w=0&h=hXpYmNYXnhdD36C-8taPQvdpM9Oj-woEdge8nvPrsZY="}} title="ML"/>
                    <View style={styles.body}>
                        <View>
                            <Text style={[styles.txt, {fontWeight:'bold'}]}>John Ngomso</Text>
                            <Text style={styles.txt}>jognNgomso@gmail.com</Text>
                            <Text style={styles.txt}>0612345678</Text>
                        </View>
                        <TouchableOpacity onPress={() => navigation.navigate("EditProfileScreen")} style={{alignItems:'flex-start'}}>
                            <Text style={{
                                borderColor:'#1a73e8', color:'#1a73e8', borderWidth: 1, 
                                borderRadius: 5, paddingHorizontal:7, paddingVertical:2, marginVertical:12, justifyContent:'center',
                                fontSize: 14,
                                }}>Edit Profile</Text>
                        </TouchableOpacity>
                        
                        
                        <TouchableOpacity onPress={logoutHandler} style={{alignItems:'flex-start'}}>
                            <Text style={{
                                borderColor:'#1a73e8', color:'#1a73e8', borderWidth: 1, 
                                borderRadius: 5, paddingHorizontal:7, paddingVertical:2, marginVertical:12, justifyContent:'center',
                                fontSize: 14,
                                }}>Sign Out</Text>
                        </TouchableOpacity>
                        
                    </View>

                </View>
                <View>
                    <Text>Favourite Doctors</Text>
                    <FlatList data={favDoctors}
                    renderItem={({item}) => (
                        <DoctorItem
                        avatarSize="large" 
                        options={true}
                        name={item.username} 
                        profession={item.profession} 
                        town={item.town} 
                        opens={item.opens} 
                        closes={item.closes}
                        stars={item.stars}
                        doctorId={item.id}
                        navigation={navigation}
                        ViewType={TouchableOpacity}
                        />
                    )}/>

                </View>
                
            {/* </View> */}

        </View>
    )
}

export default ClientProfileScreen

const styles = StyleSheet.create({
    item:{
        margin: 5,
        
        borderRadius: 10,
        padding: 10,
        flex:1
    },
    top:{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding:10,
        borderRadius:10
        // flex:1
    },
    body:{
        // flex:1,
        paddingTop: 15
    },
    txt:{
        marginVertical: 2
    }
})

