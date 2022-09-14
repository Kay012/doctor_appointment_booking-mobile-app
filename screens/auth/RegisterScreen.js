import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { db } from '../../firebase/FirebaseConfig'
import { collection, doc, getDocs, setDoc } from '@firebase/firestore'
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile} from 'firebase/auth'
import { useDispatch } from 'react-redux'
import * as Actions from '../../store/actions'

const RegisterScreen = ({navigation}) => {
    const dispatch = useDispatch()
    const auth = getAuth()
    const usersCollectionRef = collection(db, 'users')
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")


    const loginHandler = async() => {
        
        if (!email.trim()) {
            Alert.alert("Please enter your email", "You need to enter your email!", [
                {text: "Ok"}
            ])
            return;
        }
        if (!password.trim()) {
            Alert.alert("Please enter your password", "You need to enter your password!", [
                {text: "Ok"}
            ])
            return;
        }
        try{
            await signInWithEmailAndPassword(auth,email, password)

            await dispatch( Actions.fetchUser(auth.currentUser.uid))
                // window.location.href='/'
            
            console.log("Logged in")
        }catch(err){
            console.log(err)
        }
            

    }
    const registerHandler = async() => {
        try{
            try{
                const newUser = await createUserWithEmailAndPassword(auth, email, password)
                await updateProfile(auth.currentUser, {displayName:name})
                console.log(newUser)
            }catch(err){
                return console.log(err)
            }

            try{
                const docRef = doc(db, "users", auth.currentUser.uid)
                await setDoc(docRef, {
                    email: email, 
                    username: name.toLowerCase(), 
                    role:0,
                    street_address : "",
                    building: "",
                    suburb : "",
                    town: "",
                    province: "",
                    postal_code: "",
                    profession: "",
                    opens: "",
                    closes:""
                })
        // console.log(newUser.id)
            }catch(err){
                return console.log(err)
            }
            
             
        console.log("Registered")
        loginHandler()
        }catch(err){
            console.log(err)
        }
    }
    return (
        <View style={{backgroundColor:'#fff', justifyContent: 'center', alignItems: 'center'}}>
            <View style={styles.register}>
                <Text style={{fontWeight:'bold', fontSize:18, color:'#555555'}}>SIGN UP</Text>
                <View>
                    <View>
                        <TextInput style={styles.input} placeholder="Name" onChangeText={(value) => setName(value)}/>
                        <TextInput style={styles.input} placeholder="Email" onChangeText={(value) => setEmail(value)} />
                        <TextInput style={styles.input} passwordRules={true} minLength={6} 
                        placeholder="Password" onChangeText={(value) => setPassword(value)} />
                    </View>
                    <View style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                        
                        <TouchableOpacity style={styles.btnContainer}>
                            <Text style={styles.appButtonText} onPress={registerHandler}>Sign Up</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.btnContainer, {backgroundColor:'#fff', borderColor:'#ffa500',borderWidth:2}]} 
                        onPress={() => {navigation.navigate("LoginScreen")}}>
                            <Text style={[styles.appButtonText ,{color:'#ffa500'}]}>Sign In</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    register: {
        width: '90%',
        borderColor: '#007bff',
        borderWidth: 2,
        borderRadius: 5,
        justifyContent: 'center',
        paddingHorizontal: 15,
        paddingVertical: 30,
        width: '90%',
        marginTop: 22
    },
    btnContainer:{
        paddingHorizontal: 6,
        paddingVertical: 4,
        elevation: 6,
        borderRadius:6,
        backgroundColor: '#007bff'
    },
    appButtonText: {
        fontSize: 14,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        // textTransform: "uppercase"
      },
      input:{
        borderColor: '#007bff',
        borderWidth: 0.5,
        padding: 5,
        marginVertical:10,
        
        // width: '100%'
      }
})
