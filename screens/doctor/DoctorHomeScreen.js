import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useSelector } from 'react-redux'
import { collection, query, where, getDocsFromServer} from '@firebase/firestore' 
import { db } from '../../firebase/FirebaseConfig'
import DoctorBookingsScreen, { ShowAppointments } from './DoctorBookingsScreen'
import { applyActionCode } from 'firebase/auth'

const DoctorHomeScreen = () => {
    const currentUser = useSelector(state => state.currentUser.currentUserDetails)
    const doctors = useSelector(state => state.doctorsList.doctors)
    // const socket = useSelector(state => state.currentUser.socket)
    // const appointments = useSelector(state => state.appointmentList.appointments)
    const [userBookings, setUserBookings] = useState([])
    const [activeBookings, setActiveBookings] = useState([])
    const [bookingsHistory, setBookingsHistory] = useState([])
    const[callback, setCallback] = useState(false)
    let arra=[];
    let actives=[];
    let history=[];

    
    // useEffect(async() => {
    //     const fetchBookings = async()=>{
    //     //     console.log("geeting");
    //     //     let list = [];
            
    //     //     if(currentUser === undefined) return;
    //     //     console.log(currentUser);
    //     //     if(currentUser.role === 0){
            
    //     //         const colRef = query(collection(db,"bookings"), where("doctor_Id", "==", currentUser.id))
    //     //         const colRefSnapshot = await getDocsFromServer(colRef)

    //     //         const docs = colRefSnapshot.docs.map(doc => {
    //     //             const id = doc.id;
    //     //             return {id}
    //     //         })
    //     //         console.log("im a client");
    //     //         docs.forEach(async(doc) => {
    //     //             const snapshot = query(collection(db, "bookings", doc.id, "doctorBookings"));
    //     //             const querySnapshot = await getDocsFromServer(snapshot);

    //     //             let doccs = querySnapshot.docs.map(dot => {
    //     //                 const id = dot.id;
    //     //                 const data = dot.data();
    //     //                 list.push({id, ...data});
    //     //                 setUserBookings([...list]);
    //     //                 // return {id, ...data}
    //     //             })
                    
    //     //         });
    //     //     }
            
    //     //     else if(currentUser.role === 1){

    //     //         console.log("fklip");
    //     //         const colRef = query(collection(db,"bookings"), where("doctor_Id", "==", currentUser.id));
    //     //         const colRefSnapshot = await getDocsFromServer(colRef);

    //     //         const docs = colRefSnapshot.docs.map(doc => {
    //     //             const id = doc.id;
    //     //             return {id}
    //     //         })
    //     //         docs.forEach(async(doc) => {
    //     //             const snapshot = query(collection(db, "bookings", doc.id, "doctorBookings"))
    //     //             const querySnapshot = await getDocsFromServer(snapshot)

    //     //             querySnapshot.docs.map(dot => {
                        
    //     //                 const id = dot.id;
    //     //                 const data = dot.data();
    //     //                 console.log({id, ...data});

    //     //                 if(new Date(data.date) > new Date()){
    //     //                     console.log(new Date(data.date) > new Date())
    //     //                     actives.push({id, ...data})
    //     //                 }
    //     //                 else if(new Date(data.date) < new Date()){
    //     //                     console.log(new Date(data.date) < new Date())
    //     //                     history.push({id, ...data})                            
    //     //                 }
    //     //                 setBookingsHistory([...history])
    //     //                 setActiveBookings([...actives])
    //     //                 return
                      
    //     //             })
    //     //             console.log(list)
    //     //         });
    //     //     }

    //     appointments.forEach(async(item) => {
            
            
    
    //         if(new Date(item.date) > new Date()){
    //             console.log(new Date(item.date) > new Date())
    //             actives.push({...item})
    //         }
    //         else if(new Date(item.date) < new Date()){
    //             console.log(new Date(item.date) < new Date())
    //             history.push({...item})                            
    //         }
    //         //                 setBookingsHistory([...history])
    //         //                 setActiveBookings([...actives])
    //         //                 return
    //     })
    //     }
    //     await fetchBookings()
        
    //     // setCallback(false)
        
    // }, [])
    // useEffect(()=>{
    //     console.log(userBookings)
    // },[userBookings])
    // if(userBookings.length < 2) return (<View><Text>Loading...</Text></View>)
    return (
        <View>
            <Text>Doctor Home Screen</Text>
            <DoctorBookingsScreen home={true}/>
        </View>
    )
}

export default DoctorHomeScreen

const styles = StyleSheet.create({})
