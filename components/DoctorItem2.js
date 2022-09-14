import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { AirbnbRating, Rating  } from 'react-native-elements'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
const DoctorItem2 = ({doctorId, name, profession, town, opens, closes, stars, avatarSize, options, navigation}) => {
    const [open, setOpen] = useState(false)
    useEffect(() => {
        console.log(opens, closes)
        const timee = () => {
            if(opens){
            if(Number(opens.slice(0,2)) > Number(new Date().toTimeString().slice(0,2))){  
                setOpen(false)
                }
            else if(Number(opens.slice(0,2)) <= Number(new Date().toTimeString().slice(0,2))
                &&
                Number(closes.slice(0,2)) >= Number(new Date().toTimeString().slice(0,2)) ){
                    setOpen(true)
                }
            else{
                setOpen(false)
            } 
        }
        }
        
        timee()
        
    },[avatarSize])

    const doctorDetailsHandler = () => {
        navigation.navigate("DoctorDetailsScreen", {doctorId} )
    }
    return (
        <View style={styles.item}>
            {/* <View > */}
                <View style={styles.top}>
                    <Avatar rounded size={avatarSize} 
                        source={{uri: "https://media.istockphoto.com/photos/team-of-doctors-and-nurses-in-hospital-picture-id1307543618?b=1&k=20&m=1307543618&s=170667a&w=0&h=hXpYmNYXnhdD36C-8taPQvdpM9Oj-woEdge8nvPrsZY="}} 
                        title="ML"/>
                    <View style={styles.body}>
                        <View style={{display:'flex', flexDirection:'row', justifyContent: 'space-between', alignItems:'center'}}>
                            <Text style={{fontWeight:'bold'}}>Dr {name}</Text>
                            {options && <MaterialCommunityIcons name="dots-horizontal" size={26} color="#696969"/>}
                            {/* <View style={styles.options}>
                                <View style={{display: 'flex', alignItems: 'flex-end'}}>
                                    <Text style={{color: 'red'}} >X</Text>
                                </View>
                                <Text style={{paddingTop: 9, color: 'lightseagreen'}}>View</Text>
                                <Text style={{paddingTop: 9, color: 'lightseagreen'}}>Book</Text>
                            </View> */}
                        </View>
                        <View style={{display:'flex', flexDirection:'row'}}>
                            {/* {stars &&  */}
                            <View style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                                <Text>{parseFloat(stars).toFixed(1)} </Text>
                                {/* <AirbnbRating reviews={false} size={14} readonly ratingCount={parseFloat(stars).toFixed(1)} style={styles.rating} /> */}
                                <Rating reviews={false} imageSize={14} readonly startingValue={parseFloat(stars).toFixed(1)} style={styles.rating} />
                            </View>
                            {/* } */}
                            <Text style={{color:'#808080'}}>{profession}</Text>
                        </View>
                        <Text style={{color:'#808080'}}>{town}</Text>
                        {open?
                                <View style={{display: 'flex',flexDirection: 'row'}}>
                                    <Text style={{color:'blue'}}>Open</Text>
                                    <Text style={{color:'crimson', paddingLeft:5}}>Closes at {closes} pm</Text>
                                </View>
                                :
                                <View  style={{display: 'flex',flexDirection: 'row'}}>
                                    <Text style={{color:'crimson'}}>Closed</Text>
                                    <Text style={{color:'blue', paddingLeft:5}}>Opens at {opens} am</Text>
                                    
                                </View>
                            }
                    </View>

                </View>
                
            {/* </View> */}

        </View>
    )
}

export default DoctorItem2

const styles = StyleSheet.create({
    item:{
        margin: 5,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        // flex:1
    },
    top:{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        // flex:1
    },
    body:{
        // flex:1,
        paddingTop: 15
    },
    rating:{
        paddingHorizontal: 10,
    },
    options: {
        backgroundColor: 'lightgray',
        height: '99%',
        width: 75,
        right: 0,
        top: 0,
        paddingBottom: 5,
        paddingLeft: 5,
        paddingRight: 5,
    }
})
