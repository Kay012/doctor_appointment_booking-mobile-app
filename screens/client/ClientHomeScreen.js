import React, { useEffect, useState } from 'react'
import { Dimensions, StyleSheet, Text, SafeAreaView, View, TouchableOpacity } from 'react-native'
import { Avatar } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import DoctorCategories from '../../components/DoctorCategories';
import DoctorItem from '../../components/DoctorItem';
import * as Actions from '../../store/actions'


const CATEGORIES_DATA = [{
    title: "General Practitioner",
    image: "https://media.istockphoto.com/photos/team-of-doctors-and-nurses-in-hospital-picture-id1307543618?b=1&k=20&m=1307543618&s=170667a&w=0&h=hXpYmNYXnhdD36C-8taPQvdpM9Oj-woEdge8nvPrsZY="
    },
    {
        title: "Dentist" ,
        image: "https://media.istockphoto.com/photos/team-of-doctors-and-nurses-in-hospital-picture-id1307543618?b=1&k=20&m=1307543618&s=170667a&w=0&h=hXpYmNYXnhdD36C-8taPQvdpM9Oj-woEdge8nvPrsZY="
    },{
        title: "Surgeon Practitioner",
        image: "https://media.istockphoto.com/photos/team-of-doctors-and-nurses-in-hospital-picture-id1307543618?b=1&k=20&m=1307543618&s=170667a&w=0&h=hXpYmNYXnhdD36C-8taPQvdpM9Oj-woEdge8nvPrsZY="
    },
    {
        title: "yebo Practitioner",
        image: "https://media.istockphoto.com/photos/team-of-doctors-and-nurses-in-hospital-picture-id1307543618?b=1&k=20&m=1307543618&s=170667a&w=0&h=hXpYmNYXnhdD36C-8taPQvdpM9Oj-woEdge8nvPrsZY="
    },
    {
        title: "Esh Practitioner",
        image: "https://media.istockphoto.com/photos/team-of-doctors-and-nurses-in-hospital-picture-id1307543618?b=1&k=20&m=1307543618&s=170667a&w=0&h=hXpYmNYXnhdD36C-8taPQvdpM9Oj-woEdge8nvPrsZY="
    }]
const ClientHomeScreen = ({navigation}) => {
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch()
    useEffect(() => {
        
        const fetchdoctors = async() => {
            setIsLoading(true)
            
            await dispatch(Actions.fetchDoctors())
            setIsLoading(false)
        }
        
        fetchdoctors()
        
    }, [])
    const doctors = useSelector(state => state.doctorsList.doctors)
    console.log(doctors)

    if(isLoading) return (<View><Text>Loading...</Text></View>)

    return (
        <SafeAreaView style={styles.home}>
            <DoctorCategories data={CATEGORIES_DATA} navigation={navigation}/>
            {/* <FlatList data={doctors}
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
                navigation={navigation}
                ViewType={TouchableOpacity}
                />
            )}/>
            <DoctorItem/> */}

        
        </SafeAreaView>
    )
}

export default ClientHomeScreen

const styles = StyleSheet.create({
    home:{
        display: 'flex',
        // justifyContent: 'center',
        // alignItems: 'center',
        // flex:1,
        // margin: 50,
        // width: Dimensions.get('window').width,
        // height: Dimensions.get('window').height,
        
        
    },
    top:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    
})
