import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TextInput, View, Button, TouchableOpacity } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { useSelector } from 'react-redux'
import DoctorItem from '../../components/DoctorItem'
import Review from '../../components/Review'
import { collection, doc, getDocs, getDocFromServer, getDocsFromServer, getDoc, setDoc, addDoc, query, where, updateDoc,arrayUnion, arrayRemove } from '@firebase/firestore'
import {db} from '../../firebase/FirebaseConfig'
import DoctorItem2 from '../../components/DoctorItem2'
import { Rating, Overlay } from 'react-native-elements'
import ScheduleAppointment from '../../components/ScheduleAppointment'
import * as Actions from '../../store/actions'
import { useDispatch } from 'react-redux'

const initialState = {
    reviewer: "",
    stars: 0,
    review: "",
    timestamp: ""
}

const DoctorDetails = (props) => {
    const [doctor, setDoctor] = useState({})
    const doctors = useSelector(state => state.doctorsList.doctors)
    const currentUser = useSelector(state => state.currentUser.currentUserDetails)
    const dispatch = useDispatch()

    const [reviews, setReviews] = useState([])
    const [stars, setStars] = useState(0.0)
    const [drOpen, setDrOpen] = useState(false)
    const [reviewing, setReviewing] = useState(false)
    const [review, setReview] = useState(initialState)
    const [visible, setVisible] = useState(false)
    const [favouriteStatus, setFavouriteStatus] = useState(false)
    
    useEffect(() => {
        if(props.route.params){
            const indx = doctors.findIndex(doctor => props.route.params.doctorId === doctor.id)
            setDoctor(doctors[indx])
            console.log(indx)

            const faveStat = currentUser.favourite_doctors?.includes(props.route.params.doctorId)
            setFavouriteStatus(faveStat)
        }
        

        const fetchReviews = async() => {
            try{

                let me =[]

                    const snapshot = query(collection(db, "reviews"),where("doctor_Id","==", props.route.params.doctorId))
                    const querySnapshot = await getDocsFromServer(snapshot)
                    let doccs = querySnapshot.docs.map(doc => {
                        const data = doc.data();
                        const id = doc.id;
                        return {id}
                    })
                        doccs.forEach(async (d) => {
                            const snap = query(collection(db, "reviews", d.id, "reviewers"))
                            
                            const querySnap = await getDocsFromServer(snap)
                            let docccs = querySnap.docs.map( (dot) => {
                                const data = dot.data();
                                const id = dot.id;
                                me.push({id, ...data})
                                setReviews([...me])
                                // return {id, ...data}
                                });
                                
                        
                            // console.log(reviews)
                        })
                
                // console.log(me)
                // console.log(reviews)
                const reviewsAverage = () => {
                    let summ = 0.0;
                    reviews.forEach(rev => {
                        
                        summ += rev.stars
                        console.log("yooooo",summ, rev.stars)
                    })
                    setStars((summ/(reviews.length*5)) * 5)
                    console.log(stars)
                }
                reviewsAverage()
            }catch(err){
                console.log(err)
            }
        }
        fetchReviews()

    },[])

    const submitReview = async() => {
        try{
            const docRef = collection(db, "reviews")
            const dr =await addDoc(docRef, {
                doctor_Id: doctor.id    
            })
            
            const revRef = collection(db, "reviews", dr.id, "reviewers")
            await addDoc(revRef, {
                // reviewer: auth.currentUser.uid,
                stars: review.stars,
                review: review.review,
                time: new Date().toLocaleTimeString(),
                date: new Date().toDateString()
            })



            const fetchReviews = async() => {
                try{
    
                    let me =[]
                    // if(currentUser.role === 1){
                    //     const snapshot = query(collection(db, "reviews"),where("doctor_Id","==", currentUser.id))
                    //     const querySnapshot = await getDocsFromServer(snapshot)
                    //     let doccs = querySnapshot.docs.map(doc => {
                    //         const data = doc.data();
                    //         const id = doc.id;
                    //         // console.log(id, data, doc.metadata)
                    //         return {id}
                    //     })
                    //     //    console.log("first fetch")
                    //         doccs.forEach(async (d) => {
                    //             const snap = query(collection(db, "reviews", d.id, "reviewers"))
                                
                    //             const querySnap = await getDocsFromServer(snap)
                    //             let docccs = querySnap.docs.map( (dot) => {
                    //                 const data = dot.data();
                    //                 const id = dot.id;
                    //                 // console.log("yeah", {id, ...data})
                    //                 // console.log(me)
                    //                 me.push({id, ...data})
                    //                 setReviews(me)
                    //                 // return {id, ...data}
                    //                 });
                                    
                            
                    //             // console.log(reviews)
                    //         })
                    // }
                    // if(currentUser.role === 0){
                        const snapshot = query(collection(db, "reviews"),where("doctor_Id","==", doctor.id))
                        const querySnapshot = await getDocsFromServer(snapshot)
                        let doccs = querySnapshot.docs.map(doc => {
                            const data = doc.data();
                            const id = doc.id;
                            // console.log(id, data, doc.metadata)
                            return {id}
                        })
                        //    console.log("first fetch")
                            doccs.forEach(async (d) => {
                                const snap = query(collection(db, "reviews", d.id, "reviewers"))
                                
                                const querySnap = await getDocsFromServer(snap)
                                let docccs = querySnap.docs.map( (dot) => {
                                    const data = dot.data();
                                    const id = dot.id;
                                    // console.log("yeah", {id, ...data})
                                    // console.log(me)
                                    me.push({id, ...data})
                                    setReviews(me)
                                    // return {id, ...data}
                                    });
                                    
                            
                                // console.log(reviews)
                            })
                    // }
                    
                    // console.log(me)
                    // console.log(reviews)
                    const reviewsAverage = () => {
                        let summ = 0.0
                        reviews.forEach(rev => {
                            
                            summ += rev.stars
                            // console.log(summ, rev.stars)
                        })
                        setStars((parseFloat((summ+review.stars)/((reviews.length + 1)*5)) * 5))
                        console.log(summ+review.stars)
                        console.log((((summ+review.stars)/((reviews.length + 1)*5)) * 5))
                    }
                    reviewsAverage()
                }catch(err){
                    console.log(err)
                }
            }
            fetchReviews()
    

            console.log("starssss")
            const drRef = doc(db, "users", doctor.id)
            await updateDoc(drRef, {
                stars:stars
            })
            
        console.log("Review Successful")
        }catch(err){
            console.log(err)
        }

    }

    const toggleOverlay = () => {
        setVisible(!visible);
      };

    const addDoctorToFavorites = async() => {
        const snapshot = query(doc(db, "users",currentUser.id))
        const querySnapshot = await getDoc(snapshot)
        try {
            await updateDoc(snapshot,{
                favourite_doctors : arrayUnion(props.route.params.doctorId)
            })

            const updateFaves = [...currentUser.favourite_doctors,props.route.params.doctorId]
            // console.log(currentUser.favourite_doctors)
            // console.log([...currentUser.favourite_doctors,props.route.params.doctorId])
            await dispatch(Actions.addDoctorToFavorites([...currentUser.favourite_doctors,props.route.params.doctorId]))
            setFavouriteStatus(true)
        } catch (err) {
            console.log(err)
        }
        

    }

    const removeDoctorfromFavorites = async() => {
        const snapshot = query(doc(db, "users",currentUser.id))
        try {
            const updateFaves = []
            await updateDoc(snapshot,{
                favourite_doctors : arrayRemove(props.route.params.doctorId)
            })
            currentUser.favourite_doctors.forEach(id => {
                if(id !== props.route.params.doctorId){
                    updateFaves.push(id)
                }
            })
            console.log(updateFaves)
            
            await dispatch(Actions.removeFromFavorites(updateFaves))
            setFavouriteStatus(false)
        } catch (err) {
            console.log(err)
        }
       
    }

    return (
        <View style={{backgroundColor: '#fff', flex:1}}>
            <View style={{alignSelf:'center', alignItems:'flex-start'}}>
                <DoctorItem2 
                avatarSize="xlarge" 
                options={false}
                name={doctor.username} 
                profession={doctor.profession} 
                town={doctor.town} 
                opens={doctor.opens} 
                closes={doctor.closes}
                stars={doctor.stars}
                doctorId={doctor.id}
                ViewType={View}
                />
                <TouchableOpacity style={{marginLeft:15}} onPress={toggleOverlay}>
                    <Text  style={{
                        borderColor:'#1a73e8', color:'#1a73e8', borderWidth: 1, borderRadius: 5, padding:2, marginBottom:12, justifyContent:'center'
                        }}>Schedule Appointment</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{marginLeft:15}} onPress={favouriteStatus? removeDoctorfromFavorites :addDoctorToFavorites}>
                    <Text  style={{
                        borderColor:'#1a73e8', color:'#1a73e8', borderWidth: 1, borderRadius: 5, padding:2, marginBottom:12, justifyContent:'center'
                        }}>{favouriteStatus? "Remove from favourites" : "Add to Favourites"}</Text>
                </TouchableOpacity>
            </View>
            
            <Overlay isVisible={visible} onBackdropPress={toggleOverlay} fullScreen={true}>
                <ScheduleAppointment doctorName={doctor.username} doctorId={doctor.id} doctorProfession={doctor.profession}/>
                <Button title="Cancel" onPress={toggleOverlay}/>
            </Overlay>
            <View>
                <Text style={{fontWeight:'bold', marginVertical:15}}>Reviews</Text>
                <View>
                    <View style={{display: 'flex'}}>
                        <TouchableOpacity style={{alignItems:'flex-start'}}>
                            <Text onPress={() => setReviewing(true)} style={{
                                borderColor:'#1a73e8', color:'#1a73e8', borderWidth: 1, borderRadius: 5, padding:2, marginBottom:12, justifyContent:'center'
                                }}>Write a Review</Text>
                        </TouchableOpacity>
                        {/* {reviewing && */}
                        <Overlay isVisible={reviewing} onBackdropPress={toggleOverlay} fullScreen={false} >
                            <View style={{minWidth:'90%'}}>
                                <Text>Rate and Comment</Text>
                                <View style={{alignItems:'stretch', marginHorizontal:5, marginVertical:20}}>
                                    <Rating  imageSize={20} onFinishRating={(value) => setReview({...review, stars:value})}   startingValue={0} style={styles.rating} />
                                    <TextInput onChangeText={(value) => setReview({...review, review:value})} multiline={true} numberOfLines={4} style={styles.input}/>
                                    <View style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                                        <TouchableOpacity style={[styles.btnContainer, {backgroundColor:'#fff', borderColor:'#dc143c',borderWidth:2}]} onPress={() => setReviewing(false)}>
                                            <Text style={[styles.appButtonText ,{color:'#dc143c'}]}>Cancel</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.btnContainer}>
                                            <Text onPress={submitReview} style={styles.appButtonText}>Submit</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </Overlay>
                         {/* } */}
                    </View>
                    {/* {!reviewing &&  */}
                    <FlatList
                        data={reviews}
                        renderItem={({item}) => (
                            <Review 
                            stars={item.stars}
                            date={item.date}
                            review={item.review}
                            />
                        )}
                    />
                    {/* } */}
                </View>
            </View>
            
        </View>
    )
}

export default DoctorDetails

const styles = StyleSheet.create({
    item:{
        margin: 5,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        
    },
    top:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    body:{
        flex:1,
        // paddingLeft: 15
    },
    rating:{
        marginVertical: 10,
    },
    input:{
        borderWidth:1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginVertical:5,
        width: '100%'

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
      }
})
