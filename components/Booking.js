import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Booking = ({doctor, client, time, date, cancelled}) => {
    if(doctor) return (

        <View style={styles.booking}>
            <View style={{display: 'flex', flexDirection:'row'}}>
                <Text style={{}}>Dr {doctor}</Text>
                <Text style={{paddingLeft:15, color:'#adadad'}}>General Practitioner</Text>
            </View>
            
            {/* <Text style={{color:'#adadad'}}>51 Van Beek Street, New Doornfontein, Johannesburg</Text> */}
            <Text style={{fontWeight:'bold', color:'#000000'}}>{date}, {time}</Text>
            {cancelled && <Text style={{color:'#dc143c'}}>Cancelled</Text>}
        </View>
    )
    else return(
        <View style={styles.booking}>
            <View style={{display: 'flex', flexDirection:'row'}}>
                <Text style={{}}> {client}</Text>
            </View>
            
            <Text style={{color:'#adadad'}}>51 Van Beek Street, New Doornfontein, Johannesburg</Text>
            <Text style={{fontWeight:'bold', color:'#000000'}}>{date}, {time}</Text>
            {cancelled && <Text style={{color:'#dc143c'}}>Cancelled</Text>}
        </View>
        
    )
    
}

export default Booking

const styles = StyleSheet.create({
    booking:{
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding:5,
        margin:10
    }
})
