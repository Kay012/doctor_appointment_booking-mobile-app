import React, { useEffect, useState } from 'react'
import { Alert, Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { FlatList } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { db } from '../firebase/FirebaseConfig'
import {collection, query, getDocsFromServer, where, addDoc, deleteDoc, doc, setDoc, updateDoc} from '@firebase/firestore'

const ScheduleAppointment = (props) => {
    const currentUser = useSelector(state => state.currentUser.currentUserDetails)
    const socket = useSelector(state => state.currentUser.socket)
    const HeadTable = ["Time", "Status", "Schedule"]
    const [show, setShow] = useState(false);

    const [slots, setSlots] = useState([])
    const [existingBookings, setExistingBookings] = useState([])
    const [existingBookingsLength, setExistingBookingsLength] = useState(0)
    const [slotsDate, setSlotsDate] = useState(new Date())

    useEffect(() => {
        const fetchSlots = async() => {
            
            try{
                let preSlosts = []
                // if(params){
                    const snapshot = query(collection(db, "slots"), where("doctor_Id", "==", props.doctorId))
                    const querySnapshot = await getDocsFromServer(snapshot)
                    

                    let docs = querySnapshot.docs.map((doc) => {
                        const id = doc.id
                        return {id}
                    })
                    docs.forEach(async doc => {
                        const snap = query(collection(db, "slots", doc.id, "doctorSlots"))
                        const querySnap = await getDocsFromServer(snap)
                        querySnap.docs.map((docu) => {
                            const id = docu.id
                            const data = docu.data()
                            preSlosts.push({id, ...data})
                            setSlots([...preSlosts])
                        })

                    })
                    
                // }
            }catch(err){
                console.log(err)
            }
        }

        const selectedDateHandler = async() => {
            // e.preventDefault()
            
            let preBookings = []
            setSlotsDate(new Date())
            const snapshot = query(collection(db, "bookings"), where("doctor_Id","==", props.doctorId), where("date", "==", slotsDate.toDateString()))
    
            const querySnapshot = await getDocsFromServer(snapshot)
            
    
            let docs = querySnapshot.docs.map((doc) => {
                const id = doc.id
                return {id}
            })
            docs.forEach(async doc => {
                const snap = query(collection(db, "bookings", doc.id, "doctorBookings"))
                const querySnap = await getDocsFromServer(snap)
                querySnap.docs.map((docu) => {
                    const id = docu.id
                    const data = docu.data()
                    preBookings.push({id, ...data})
                    setExistingBookings([...preBookings])
                })
    
            })
            setExistingBookingsLength(preBookings.length)
        }
        fetchSlots()
        selectedDateHandler()
    }, [])

    useEffect(() => {
        let isMounted = true;
        
        const getMessage = () => {
            console.log("getting appont update 2", socket)
            if(socket)
            {
                console.log("getting appont update 1")
                socket.on("getAppointmentsUpdate", (docId) =>{
                    console.log("getting appont update", docId)
                    if (isMounted && docId ===props.doctorId ) {
                        selectedDateHandler()
                         
                    }
                })

                socket.on("getCancelAppointmentsUpdate", (docId) =>{
                    console.log("getting cancel appont update", docId)
                    if (isMounted && docId ===props.doctorId ) {
                        selectedDateHandler()
                         
                    }
                })
            }
        }
        getMessage()
        return () => { isMounted = false }
    },[socket])


    const selectedDateHandler = async (event, selectedDate) => {
        const currentDate = selectedDate || slotsDate;
        // setShow(Platform.OS === 'ios');
        setSlotsDate(currentDate);

        let preBookings = []
        const snapshot = query(collection(db, "bookings"), where("doctor_Id","==", props.doctorId), where("date", "==", currentDate.toDateString()))

        const querySnapshot = await getDocsFromServer(snapshot)
        
        // console.log(new Date(e.target.value).toDateString())

        let docs = querySnapshot.docs.map((doc) => {
            const id = doc.id
            // console.log(id)
            return {id}
        })
        docs.forEach(async doc => {
            const snap = query(collection(db, "bookings", doc.id, "doctorBookings"))
            const querySnap = await getDocsFromServer(snap)
            querySnap.docs.map((docu) => {
                const id = docu.id
                const data = docu.data()
                preBookings.push({id, ...data})
                setExistingBookings([...preBookings]) 
            })

        })
        setExistingBookingsLength(preBookings.length)
    }

    const submitAppointement = async(time) => {
        confirmBooking(time)
        // Alert.alert("Confirming","Confirm Appointment?", [
        //     {
        //         text:"Cancel",
        //         onPress :() => {return},
        //         style: "cancel"
        //     },
        //     {
        //         text: "Yes",
        //         onPress: () => {confirmBooking(time)}
        //     }
        // ])
        // const confirmBooking = window.confirm("Confirm Appointment")
        // if (!confirmBooking)return

        //writing to doctor bookings
     
    }
    const confirmBooking = async (time) => { 
        try{
            const colRef = query(collection(db, "bookings"), where("date", "==", slotsDate), where("doctor_Id", "==", props.doctorId))
            const res =await getDocsFromServer(colRef)
            
            let colExist = [];
            if(res.docs.length > 0){
                console.log("arric")
                colExist= res.docs.map(doc => {
                let id =doc.id
                return id
                })
            }
            // console.log(colExist[0], "ëish", slotsDate)
            if(colExist.length > 0){
                console.log("here")
                const drBookingRef = query(collection(db, "bookings", colExist[0], "doctorBookings"))
                const drDocRef1 = await addDoc(drBookingRef, {
                doctor_Id: props.doctorId,
                client_Id: currentUser.id,
                date: slotsDate.toDateString(),
                time: time,
                collection_Id: colExist[0],
                doctor_Name: props.doctorName,
                client_Name: currentUser.username,
                doctor_Profession: props.doctorProfession,
                client_Email: currentUser.email,
                client_Cellphone: currentUser.cellphone,
                cancelled:false,
                success: false
                })

                const clientBookingRef = query(doc(db, "bookings", colExist[0], "clientBookings", drDocRef1.id))
                await setDoc(clientBookingRef, {
                doctor_Id: props.doctorId,
                client_Id: currentUser.id,
                date: slotsDate.toDateString(),
                time: time,
                collection_Id: colExist[0],
                doctor_Name: props.doctorName,
                client_Name: currentUser.username,
                doctor_Profession: props.doctorProfession,
                client_Email: currentUser.email,
                client_Cellphone: currentUser.cellphone,
                cancelled:false,
                success: false

                })

            console.log("success")
            }
            else{
                const docRef = query(collection(db, "bookings"))
                const docum = await addDoc(docRef, {
                    doctor_Id: props.doctorId,
                    client_Id: currentUser.id,
                    date: slotsDate.toDateString()
                })

                const drBookingRef = query(collection(db, "bookings", docum.id, "doctorBookings"))
                const drDocRef2 = await addDoc(drBookingRef, {
                    doctor_Id: props.doctorId,
                    client_Id: currentUser.id,
                    date: slotsDate.toDateString(),
                    time: time,
                    collection_Id: docum.id,
                    doctor_Name: props.doctorName,
                    client_Name: currentUser.username,
                    doctor_Profession: props.doctorProfession,
                    client_Email: currentUser.email,
                    client_Cellphone: currentUser.cellphone,
                    cancelled:false,
                    success: false

                })

                const clientBookingRef = query(doc(db, "bookings", docum.id, "clientBookings", drDocRef2.id))
                await setDoc(clientBookingRef, {
                    doctor_Id: props.doctorId,
                    client_Id: currentUser.id,
                    date: slotsDate.toDateString(),
                    time: time,
                    collection_Id: docum.id,
                    doctor_Name: props.doctorName,
                    client_Name: currentUser.username,
                    doctor_Profession: props.doctorProfession,
                    client_Email: currentUser.email,
                    client_Cellphone: currentUser?.cellphone,
                    cancelled:false,
                    success: false
                })

                console.log("success")
                // Alert.alert("Success")
                console.log(socket)

                if(socket){
                    socket.emit("sendBooking", props.doctorId)
                }
                selectedDateHandler()
            }
        }catch(err){
            console.log(err)
            Alert.alert("Failed")
        }
    }


    const cancelAppointmentHandler = async(id, collection_id) => {
        confirmCancellation(id, collection_id)
        // Alert.alert("Cancelling","Cancel Appointment?", [
        //     {
        //         text:"No",
        //         onPress :() => {return},
        //         style: "cancel"
        //     },
        //     {
        //         text: "Yes",
        //         onPress: () => {confirmCancellation(id, collection_id)}
        //     }
        // ])
        
    }
    // console.log(existingBookings)

    const confirmCancellation = async (id, collection_id) => {
        console.log(existingBookings.length)
        const bookingRef = query(doc(db, "bookings", collection_id, "doctorBookings", id ))
        await updateDoc(bookingRef,{
            cancelled:true,
            success: false
        })

        const clientBookingRef = query(doc(db, "bookings", collection_id, "clientBookings", id ))
        await updateDoc(clientBookingRef,{
            cancelled:true,
            success: false
        })
        

        // if(existingBookings.length <= 1){
        //     const higherRef = query(doc(db, "bookings", collection_id))
        //     await updateDoc(higherRef, {
        //         cancelled:true,
        //         success: false
        //     })
        // }


        console.log("Cancelled")
        console.log(socket)

        if(socket){
            socket.emit("cancelBooking", props.doctorId)
        }
        selectedDateHandler()
    }

    // const onChange = (event, selectedDate) => {
    //     const currentDate = selectedDate || slotsDate.toDateString();
    //     setShow(Platform.OS === 'ios');
    //     setDate(currentDate);
    // };

    const showMode = () => {
        setShow(true);
    };
    console.log(existingBookings)
    return (
        <View>
            <Text>Schedule Appointment with Dr Mkhululi Cebani</Text>
            <View style={{display:'flex', flexDirection:'row'}}>
                <TextInput value={slotsDate.toDateString()} style={styles.input} onFocus={showMode}/>
                <MaterialCommunityIcons name="calendar-edit" size={26} onPress={showMode}/>
            </View>
            <View style={styles.container}>
                {/* { slots.length > 0 && */}
                <FlatList
                data={slots}
                    renderItem={({item}) => {
                        const booking = existingBookings.filter(bookin => bookin.date ==slotsDate.toDateString() && item.time == bookin.time && !bookin.cancelled)
                        console.log(booking)
                        if(booking[0]){
                            return(
                                <View style={{display:'flex', flexDirection:'row',  justifyContent:'space-evenly'}}>
                                    <Text>{item.time}</Text>
                                    <Text>Booked</Text>
                                    {
                                        booking[0].client_Id === currentUser.id?
                                        
                                        <TouchableOpacity style={{alignItems:'flex-start'}} disabled>
                                            <Text  
                                                onPress={() => {cancelAppointmentHandler(booking[0].id, booking[0].collection_Id)}}
                                                style={{
                                                borderColor:'crimson', color:'crimson', borderWidth: 1, 
                                                borderRadius: 5, marginBottom:12, justifyContent:'center',
                                                width:40, textAlign:'center',fontWeight:'bold', fontSize:20
                                                }}>x</Text>
                                        </TouchableOpacity>
                                        :
                                        <TouchableOpacity style={{alignItems:'flex-start'}} disabled={true}>
                                            <Text  style={{
                                                borderColor:'#ccc', color:'#ccc', borderWidth: 1, 
                                                borderRadius: 5, marginBottom:12, justifyContent:'center',
                                                width:40, textAlign:'center',fontWeight:'bold', fontSize:20
                                                }}>+</Text>
                                        </TouchableOpacity>
                                    }
                                </View>

                            )
                        }
                        else{
                            return(
                            <View style={{display:'flex', flexDirection:'row', justifyContent:'space-evenly'}}>
                                <Text>{item.time}</Text>
                                <Text>Available</Text>
                                {/* <Button onPress={() => submitAppointement(item.time)} 
                                title="+"
                                style={{backgroundColor: 'blue', color: '#fff', }}
                                /> */}
                                <TouchableOpacity style={{alignItems:'flex-start'}}>
                                    <Text onPress={() => submitAppointement(item.time)} style={{
                                        borderColor:'#1a73e8', color:'#1a73e8', borderWidth: 1, 
                                        borderRadius: 5, marginBottom:12, justifyContent:'center',
                                        width:40, textAlign:'center',fontWeight:'bold', fontSize:20
                                        }}>+</Text>
                                </TouchableOpacity>
                            </View>
                            )
                        }
                    }
                }
                />
            {/* } */}
            </View>
            {show &&
            <DateTimePicker
                testID="dateTimePicker"
                value={slotsDate}
                mode="date"
                is24Hour={true}
                display="default"
                onChange={selectedDateHandler}
                />
            }
        </View>
    )
}

export default ScheduleAppointment

const styles = StyleSheet.create({
    input:{
        borderBottomColor: '#ccc',
        borderBottomWidth:1
    },
    container: { 
        // flex: 1,
        // padding: 18,
        // paddingTop: 35,
        // backgroundColor: '#ffffff' 
      },
      HeadStyle: { 
        height: 50,
        alignContent: "center",
        backgroundColor: '#ffe0f0'
      },
      TableText: { 
        margin: 10
      }
})
