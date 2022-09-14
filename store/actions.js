import {db} from '../firebase/FirebaseConfig'
import { collection, doc, getDocs, setDoc,getDocsFromServer,where, query, getDocFromServer  } from '@firebase/firestore'
import { useState } from 'react'

export const BOOK_PAGE_STATUS ="BOOK_PAGE_STATUS"
export const FETCH_DOCTORS = "FETCH_DOCTORS"
export const FETCH_DOCTORS_BY_TOWN = "FETCH_DOCTORS_BY_TOWN"
export const FETCH_USER = "FETCH_USER"
export const CURRENT_USER = "CURRENT_USER"
export const SIGN_OUT_USER = "SIGN_OUT_USER"
export const FETCH_APPOINTMENTS = "FETCH_APPOINTMENTS"
export const ADD_TO_FAVOURITES = "ADD_TO_FAVOURITES"
export const REMOVE_FROM_FAVOURITES = "REMOVE_FROM_FAVOURITES"

export const bookStatuseHandler = (bookStatus) => {
    const bookStat = !bookStatus
    return async dispatch => {
        await dispatch({type:BOOK_PAGE_STATUS, bookStatus: bookStat})
    }
}

export const fetchDoctors = () => {
    return async dispatch => {
        const snapshot = query(collection(db, "users"),where("role","==", 1))
        const querySnapshot = await getDocsFromServer(snapshot)
        let doccs = querySnapshot.docs.map(doc => {
            const data = doc.data();
            const id = doc.id;
            return { id, ...data }
        });
        dispatch({type:FETCH_DOCTORS, doctors:doccs})
    }
    
}
export const fetchUser = (userId, socket) => {
    return async (dispatch) => {
        try{
            const snapshot = query(doc(db, "users", userId))
            const querySnapshot = await getDocFromServer(snapshot)
            let data = querySnapshot.data()
            let user = {id:userId, ...data}
            console.log(user)
            dispatch({type:FETCH_USER, user,socket})
        }catch(err){
            console.log(err)
        }
    }
    
    
}

export const SignOutUser = () =>{
    return async dispatch =>{
        dispatch({type: SIGN_OUT_USER})
    }
}

export const fetchDoctorsByTown = (search) => {

    return async dispatch => {
        dispatch({type: FETCH_DOCTORS_BY_TOWN, search:search})
    }
}

export const fetchAppointments= () =>{
    
    return async (dispatch,getState) => {
            console.log("geeting");
            // console.log(currentUser);
            
            let list=[];
            const currentUser = getState().currentUser.currentUserDetails;
            if(currentUser === undefined) return;
            console.log(currentUser);
            if(currentUser.role === 0){
            
                const colRef = query(collection(db,"bookings"), where("client_Id", "==", currentUser.id))
                const colRefSnapshot = await getDocsFromServer(colRef)
                const docs = colRefSnapshot.docs.map(doc => {
                    const id = doc.id;
                    return {id}
                })
                console.log("im a client");
                docs.forEach(async(doc) => {
                    const snapshot = query(collection(db, "bookings", doc.id, "clientBookings"));
                    const querySnapshot = await getDocsFromServer(snapshot);

                    let him = querySnapshot.docs.map(dot => {
                        
                        const id = dot.id;
                        const data = dot.data();
                        console.log({id, ...data});
                        list.push({id, ...data})
                        return [...list]
                      
                    })
                    // setBookingsHistory([...list])
                    console.log(list)
                    // return him
                    await dispatch({type:FETCH_APPOINTMENTS, appointments:[...list]})
                    
                    
                });
            }
            else if(currentUser.role === 1){

                console.log("fklip");
                const colRef = query(collection(db,"bookings"), where("doctor_Id", "==", currentUser.id));
                const colRefSnapshot = await getDocsFromServer(colRef);

                const docs = colRefSnapshot.docs.map(doc => {
                    const id = doc.id;
                    return {id}
                })
                docs.forEach(async(doc) => {
                    const snapshot = query(collection(db, "bookings", doc.id, "doctorBookings"))
                    const querySnapshot = await getDocsFromServer(snapshot)

                    let him = querySnapshot.docs.map(dot => {
                        
                        const id = dot.id;
                        const data = dot.data();
                        console.log({id, ...data});
                        list.push({id, ...data})
                        return [...list]
                      
                    })
                    // setBookingsHistory([...list])
                    console.log(list)
                    // return him
                    await dispatch({type:FETCH_APPOINTMENTS, appointments:[...list]})
                });
                console.log(list)
                // console.log([...him])
                // console.log("[...him]")
                
            }
            // await dispatch({type:FETCH_DOCTORS, appointments:list})
    }
}


export const addDoctorToFavorites = (updatedFaves) => {
    return async (dispatch, getState) => {
        const esih = getState().currentUser.currentUserDetails
        console.log({...esih, favourite_doctors:updatedFaves})
        await dispatch({type:ADD_TO_FAVOURITES, updatedUser:{...esih, favourite_doctors:updatedFaves}})
    }
}

export const removeFromFavorites = (updatedFaves) => {
    return async (dispatch, getState) => {
        const esih = getState().currentUser.currentUserDetails
        console.log({...esih, favourite_doctors:updatedFaves})
        await dispatch({type:REMOVE_FROM_FAVOURITES, updatedUser:{...esih, favourite_doctors:updatedFaves}})
    }
}

