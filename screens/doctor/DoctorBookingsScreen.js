import React, { useCallback, useEffect, useState } from 'react'
import { StyleSheet, Text, View,FlatList,ScrollView,SectionList } from 'react-native'
import Booking from '../../components/Booking'
import {useDispatch, useSelector } from 'react-redux'
import * as Actions from '../../store/actions'

const DoctorBookingsScreen = ({home}) => {
    const [activeBookings, setActiveBookings] = useState([])
    const [bookingsHistory, setBookingsHistory] = useState([])
    const appointments = useSelector(state => state.appointmentsList.appointments)
    const socket = useSelector(state => state.currentUser.socket)
    let actives=[];
    let history=[];
    let roooo;
    const dispatch = useDispatch()
    useEffect(() => {
        let isMounted = true;

        if(socket && isMounted){
            socket.on("getBooking", () => {
                console.log("new Booking Receivd")
                // fetchBookings()
                dispatch(Actions.fetchAppointments())
            })

            socket.on("getBookingCancellation", () => {
                console.log(" Booking Cancellation Receivd")
                // fetchBookings()
                dispatch(Actions.fetchAppointments())
            })
        }
        return () => { isMounted = false }
    },[socket])
    useEffect(() => {
        let isMounted = true;
        if(isMounted)
        {
            fetchBookings()
        }
        
        
        console.log(appointments[0])
        return () => { isMounted = false }
    }, [appointments])

    const fetchBookings = ()=>{
        // let list = [];
        console.log("transcersing")
        
    
        
        appointments?.forEach((item) => {
    
            // console.log(item.date)
    
            if(new Date(`${item.date} ${item.time}`) >= new Date()){
                actives.push({...item})
                // console.log("foooooo",`${item.date} ${item.time} > ${item.date}`)
            }
            else if(new Date(`${item.date} ${item.time}`) < new Date()){
                history.push({...item})                            
            }
            setBookingsHistory([...history])
            setActiveBookings([...actives])
            }
        )
    }

    
    
    
    // console.log(history)
    if(activeBookings.length <= 0) {
       
        return(<View><Text>Loading...</Text></View>)
    }

    if(bookingsHistory.length > 0 ) return (
        <View style={styles.bookings}>
            <Text>In here</Text>
            {activeBookings.length > 0 &&
                <View style={{flex: home? 1 : 1/2}}>
                    <Text style={!home?{fontSize:20} : {fontSize:16}}>Upcoming appointments</Text>
                    <FlatList 
                        horizontal={home? true : false}
                        // horizontal={false}
                        data={activeBookings.sort((a,b) => (new Date(`${a.date} ` + `${a.time}`) - new Date(`${b.date} ` + `${b.time}`)))} 
                        renderItem={({item}) => (
                            home ===true && item.cancelled? (
                            false
                            ):
                            (<Booking client={item.client_Name} date={item.date} time={item.time} cancelled={!item.cancelled? false : true}/>)
                        )} 
                    />
                    
                </View>
            }
            {home !==true && bookingsHistory.length > 0 &&
            <View style={activeBookings?.length >0? {flex:1/2} : {flex:1}}>
                <Text  style={{fontSize:20}}>Bookings History</Text>
                <FlatList 
                    horizontal={false}
                    data={bookingsHistory.sort((a,b) => (new Date(`${b.date} ` + `${b.time}`) - new Date(`${a.date} ` + `${a.time}`)))} 
                    renderItem={({item}) => (
                        <Booking  client={item.client_Name} date={item.date} time={item.time} cancelled={!item.cancelled? false : true}/>
                    )} 
                />
            </View>
            }
        </View>
    )
    return (<View><Text>Nothin to display...</Text></View>)
}

export default DoctorBookingsScreen

const styles = StyleSheet.create({
    bookings:{
        backgroundColor: '#fff',
        flex:1
    }
})
