import { StyleSheet, Text, View, SafeAreaView, FlatList } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'

import { useSelector } from 'react-redux'
import DoctorItem from '../../components/DoctorItem'
import { SearchBar } from 'react-native-elements'

const SelectedDoctorCategoryScreen = (props) => {
    const doctors = useSelector(state => state.doctorsList.doctors)
    const [displayDoctors,setDisplayDoctors] = useState([])

    const [showDoctors, setShowDoctors] = useState(doctors)
    
    
    const [townDoctors, setTownDoctors] = useState([])
    const [search, setSearch] = useState("")
    const [profession, setProfession] = useState("")
    // const searchRef = useRef()
    useEffect(() => {
        let lst = [];
        if(props.route.params){
            console.log(props.route.params)
            doctors.forEach(docta => {
                if(docta.profession === props.route.params.title){
                    console.log(docta)
                    lst.push(docta)
                    
                }
            })
            setDisplayDoctors([...lst])
        }
            
    }, [])

    function stringSearch(str, val){
        let count = 0
        for (let i = 0; i < str.length; i++){
            for (let j = 0; j< val.length; j++ ){
                console.log(val[j],  str[i+j])
                if(val[j] !== str[i+j]){
                    console.log("Break")
                    break
                }
                if(j === val.length -1){
                    console.log("Match Forund")
                    count ++
                }
            }
        }
        return count
    }

    useEffect(() => {
        let lst = [];
        // setTimeout(() => {
            if(search.length > 0){
                displayDoctors.forEach(docta => {
                    // if(search.toLowerCase().slice(0,search.length) === docta.username.toLowerCase().slice(0,search.length)){
                    //     // console.log(docta)
                    //     lst.push(docta)
                        
                    // }
                    const result  = (stringSearch(docta.username.toLowerCase(), search.toLowerCase()))
                    if(result === 1){
                        lst.push(docta)
                    }
                   
                })
                setShowDoctors([...lst])
                // setDisplayDoctors([...lst])
            }
            else{
                setShowDoctors([])
            }
        // }, 200);
    }, [search])

    const fetchDoctorsByTown = async (town) => {
        if(!town) {
            setShowDoctors([...doctors])
            setTownDoctors([...doctors])
        }
        else{
            let doctorsByTown = doctors.filter(doctor => doctor.town === town)
            console.log(doctorsByTown)
            setTownDoctors([...doctorsByTown])
            setShowDoctors([...doctorsByTown])
            console.log("ÿes")
        }
    }
    
  return (
      <SafeAreaView>
          <SearchBar style={{}} value={search}  onChangeText={(et) => {setSearch(et)}}/>
        <FlatList data={showDoctors.length > 0 ? showDoctors : displayDoctors}
            renderItem={({item}) => (
                <DoctorItem
                avatarSize="large" 
                options={true}
                name={item.username} 
                profession={item.profession} 
                town={item.town} 
                opens={item.opens} 
                closes={item.closes}
                stars={item.stars}
                doctorId={item.id}
                navigation={props.route.params.navigation}
                // ViewType={TouchableOpacity}
                />
            )}/>
        </SafeAreaView>
  )
}

export default SelectedDoctorCategoryScreen

const styles = StyleSheet.create({})