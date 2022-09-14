import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import Booking from '../../components/Booking'
import { useSelector } from 'react-redux'
import { collection, query, where, getDocsFromServer} from '@firebase/firestore' 
import { db } from '../../firebase/FirebaseConfig'

const ClientBookingsScreen = () => {
    const [activeBookings, setActiveBookings] = useState([])
    const [bookingsHistory, setBookingsHistory] = useState([])
    const appointments = useSelector(state => state.appointmentsList.appointments)
    let actives=[];
    let history=[];

    useEffect(async() => {
        const fetchBookings = async()=>{
            // let list = [];
            appointments.forEach(async(item) => {
                if(new Date(item.date) > new Date()){
                    actives.push({...item})
                }
                else if(new Date(item.date) < new Date()){
                    history.push({...item})                            
                }
                setBookingsHistory([...history])
                setActiveBookings([...actives])
            })
            console.log(actives)
        }
        await fetchBookings()
        
        // setCallback(false)
        
    }, [appointments])
    
    
    // console.log(history)
    if(bookingsHistory.length <= 0) {
       
        return(<View><Text>Loading...</Text></View>)
    }

    if(bookingsHistory.length > 0 ) return (
        <View style={styles.bookings}>
            <Text>In here</Text>
            {activeBookings.length > 0 &&
                <View style={{flex:1/2}}>
                    <Text style={{fontSize:20}}>Active Booking</Text>
                    <FlatList 
                        horizontal={false}
                        data={activeBookings.sort((a,b) => (new Date(`${b.date} ` + `${b.time}`) - new Date(`${a.date} ` + `${a.time}`)))} 
                        renderItem={({item}) => (
                            <Booking client={item.client_Name} date={item.date} time={item.time} cancelled={item.cancelled}/>
                        )} 
                    />
                    
                </View>
            }
            {bookingsHistory.length > 0 &&
            <View style={{flex:1/2}}>
                <Text  style={{fontSize:20}}>Bookings History</Text>
                <FlatList 
                    horizontal={false}
                    data={bookingsHistory.sort((a,b) => (new Date(`${b.date} ` + `${b.time}`) - new Date(`${a.date} ` + `${a.time}`)))} 
                    renderItem={({item}) => (
                        <Booking  client={item.client_Name} date={item.date} time={item.time} cancelled={item.cancelled}/>
                    )} 
                />
            </View>
            }
        </View>
    )
    return (<View><Text>Nothin to display...</Text></View>)
}
export default ClientBookingsScreen

const styles = StyleSheet.create({
    bookings:{
        backgroundColor: '#fff',
        flex:1
    }
})
