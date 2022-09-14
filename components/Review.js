import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Avatar, Rating } from 'react-native-elements'

const Review = ({stars, review, date}) => {
    return (
        <View style={styles.item}>
            <View style={styles.top}>
                    <Avatar rounded size="small" 
                    source={{uri: "https://media.istockphoto.com/photos/team-of-doctors-and-nurses-in-hospital-picture-id1307543618?b=1&k=20&m=1307543618&s=170667a&w=0&h=hXpYmNYXnhdD36C-8taPQvdpM9Oj-woEdge8nvPrsZY="}} 
                    title="ML"
                    />
                    <View style={{paddingLeft:10}}>
                        <Text style={{fontWeight:'bold'}}>Lionel</Text>
                        <Text style={{fontSize: 10, color:'#808080'}}>{date}</Text>
                    </View>
                    
            </View>
            <View style={styles.body}>
                
                <View style={{display:'flex', flexDirection:'row', justifyContent: 'space-between', alignItems:'center'}}>
                    <Rating reviews={false} imageSize={14} readonly startingValue={parseFloat(stars).toFixed(1)} style={styles.rating} />
                </View>
                <View>
                    <Text style={{color:'#808080'}}>{review}</Text>
                </View>
            </View>
        </View>
    )
}

export default Review

const styles = StyleSheet.create({
    item:{
        margin: 5,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        display: 'flex',
        flexDirection: 'column',
        borderColor:'#ccc',
        borderBottomWidth: 1
    },
    top:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    body:{
        flex:1,
        paddingTop: 15
    },
    rating:{
        // paddingHorizontal: 10,
    },
})
