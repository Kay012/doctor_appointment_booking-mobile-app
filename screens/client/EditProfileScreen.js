import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Button } from 'react-native'
import { AirbnbRating, Rating  } from 'react-native-elements'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import ClientHomeScreen from './ClientHomeScreen'

const EditProfileScreen = ({doctorId, name, profession, town, opens, closes, stars, avatarSize, options, navigation}) => {

    
    return (
        // <View>
            <View style={styles.item}>
                {/* <View > */}
                    <View style={styles.top}>
                        <TouchableOpacity onPress={() => {navigation.navigate("ChangeProfilePhotoScreen")}}>
                            <Avatar rounded size="large" 
                                // onPress={() => {navigation.navigate("ChangeProfilePhotoScreen")}}
                                source={{uri: "https://media.istockphoto.com/photos/team-of-doctors-and-nurses-in-hospital-picture-id1307543618?b=1&k=20&m=1307543618&s=170667a&w=0&h=hXpYmNYXnhdD36C-8taPQvdpM9Oj-woEdge8nvPrsZY="}} 
                                title="ML"/>
                        </TouchableOpacity>
                        {/* <View style={styles.body}> */}
                            
                            <TouchableOpacity style={{alignItems:'flex-start',}} onPress={() => navigation.navigate("ChangeProfilePhotoScreen")}>
                                <Text style={{
                                    borderColor:'#1a73e8', color:'#1a73e8', borderWidth: 1, borderRadius: 5, paddingHorizontal:7, paddingVertical:2, marginVertical:12, justifyContent:'center'
                                    }}>Change profile photo</Text>
                            </TouchableOpacity>
                            
                        {/* </View> */}

                    </View>
                    <View>
                        <View style={styles.btns}>
                                <TextInput style={styles.txt} value={"John Ngomso"} />
                                <TextInput style={styles.txt} value={"jognNgomso@gmail.com"} />
                                <TextInput style={styles.txt} value={"0612345678"} />
                            </View>
                    </View>
                    
                {/* </View> */}

            </View>
    // </View>
    )
}

export default EditProfileScreen

const styles = StyleSheet.create({
    item:{
        display:'flex',
        flexDirection:'column',
        flex:1,
        margin: 5,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        // alignSelf:'center',
        justifyContent:'center'
    },
    top:{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    body:{
        flex:1,
        paddingTop: 15
    },
    txt:{
        marginVertical: 2,
        borderColor: '#ccc',
        borderBottomWidth: 1,
        fontSize: 16,
        paddingVertical: 5,
        marginVertical: 15
    },
    
    
})

