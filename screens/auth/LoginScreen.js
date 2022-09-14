import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native'
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth'
import * as Actions from '../../store/actions'
const LoginScreen = ({navigation}) => {
    const auth = getAuth()
    const dispatch = useDispatch()
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
            Alert.alert("Oops", "Something went wrong!", [
                {text: "Ok"}
            ])
            return;
        }
            

    }
    return (
        <View style={{backgroundColor:'#fff', justifyContent: 'center', alignItems: 'center'}}>
            <View style={styles.login}>
                <Text style={{fontWeight:'bold', fontSize:18, color:'#555555'}}>SIGN IN</Text>
                <View>
                    <View>
                        <TextInput style={styles.input} placeholder="Email" onChangeText={(value) => setEmail(value)}/>
                        <TextInput style={styles.input} passwordRules={true} minLength={6} 
                        placeholder="Password" onChangeText={(value) => setPassword(value)} />
                    </View>
                    <View style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                        
                        <TouchableOpacity style={styles.btnContainer}>
                            <Text style={styles.appButtonText} onPress={loginHandler}>Sign In</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.btnContainer, {backgroundColor:'#fff', borderColor:'#ffa500',borderWidth:2}]} 
                        onPress={() => {navigation.navigate("RegisterScreen")}}>
                            <Text style={[styles.appButtonText ,{color:'#ffa500'}]}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    login: {
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
