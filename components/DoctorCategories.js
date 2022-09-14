import React from 'react'
import { Platform, StyleSheet, Text, View,FlatList, TouchableOpacity} from 'react-native'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar'

const Category = ({title,image,navigation}) => {
    return(
        <View style={styles.category}>
            <TouchableOpacity style={styles.touchable} onPress={() => navigation.navigate("SelectedDoctorCategoryScreen", {title, navigation})}>
                <View style={styles.container}>
                    <Avatar rounded size="large" 
                    source={{uri: 
                    image
                    }} title="ML"/>
                    <Text style={styles.title} >{title}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}
const DoctorCategories = (props) => {
  return (
    <View>
        
        <Text>Doctor categories</Text>
        <FlatList numColumns={2} data={props.data} renderItem={({item})=> (
            <Category title={item.title} image={item.image} navigation={props.navigation}/>
        )} />
        {/* <Category />
        <Category /> */}
    </View>
  )
}

const styles = StyleSheet.create({
    category :{
        flex: 1,
        margin: 15,
        height: 150,
        borderRadius: 10,
        // backgroundColor: 'transparent',
        overflow: Platform.OS=== 'android'? 'hidden': 'visible',
        elevation: 8,
        // justifyContent:'center',
        // alignContent:'center',
        backgroundColor:'#fff'
    },
    container : {
        flex: 1,
        width:'100%',
        borderRadius: 10,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 10,
        // borderColor:'red',
        // borderWidth:2,
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf:'center'
    },
    
    touchable: {
        flex: 1,
        backgroundColor: 'transparent'
    },
    title:{
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center'

    },
})

export default DoctorCategories