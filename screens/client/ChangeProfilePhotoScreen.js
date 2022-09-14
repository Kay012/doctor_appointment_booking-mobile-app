import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Button, Image } from 'react-native'
import { AirbnbRating, Rating  } from 'react-native-elements'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import ClientHomeScreen from './ClientHomeScreen'

const ChangeProfilePhotoScreen = ({doctorId, name, profession, town, opens, closes, stars, avatarSize, options, navigation}) => {
    const [open, setOpen] = useState(false)
    const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [openCamera, setOpenCamera] =useState(false)
  const [type, setType] = useState(Camera.Constants.Type.front);

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');

      const galleryStatus = await ImagePicker.requestCameraRollPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === 'granted');


    })();
  }, []);

  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync(null);
      setImage(data.uri);
    }
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  
  if (hasCameraPermission === null || hasGalleryPermission === false) {
    return <View />;
  }
  if (hasCameraPermission === false || hasGalleryPermission === false) {
    return <Text>No access to camera</Text>;
  }
    
    return (
        // <View>
            <View style={{ flex: 1 }}>
            
                <View style={styles.cameraContainer}>
                    <Camera
                    ref={ref => setCamera(ref)}
                    style={styles.fixedRatio}
                    type={type}
                    ratio={'1:1'} />
                </View>
                <View style={styles.btns}>
                  {/* <Button
                      style={styles.btn}
                      title="Flip Image"
                      onPress={() => {
                      setType(
                          type === Camera.Constants.Type.front
                          ? Camera.Constants.Type.front
                          : Camera.Constants.Type.back
                      );
                      }}>
                  </Button> */}
                  <TouchableOpacity style={styles.btnContainer}>
                      <Text style={styles.appButtonText}  onPress={() => setType(
                          type === Camera.Constants.Type.front
                          ? Camera.Constants.Type.front
                          : Camera.Constants.Type.back
                      )}>Flip Image</Text>
                  </TouchableOpacity>
                  {/* <Button style={styles.btn} title="Take Picture" onPress={() => takePicture()} /> */}
                  <TouchableOpacity style={styles.btnContainer}>
                      <Text style={styles.appButtonText}  onPress={() => takePicture()}>Take Picture</Text>
                  </TouchableOpacity>
                  {/* <Button style={styles.btn} title="Pick Image From Gallery" onPress={() => pickImage()} /> */}
                  <TouchableOpacity style={styles.btnContainer}>
                      <Text style={styles.appButtonText}  onPress={() => pickImage()}>Pick Image From Gallery</Text>
                  </TouchableOpacity>
                  {/* <Button style={styles.btn} title="Save" onPress={() => navigation.navigate('Save', { image })} /> */}
                  <TouchableOpacity style={styles.btnContainer}>
                      <Text style={styles.appButtonText}  onPress={() => navigation.navigate('Save', { image })}>Save</Text>
                  </TouchableOpacity>
                </View>
                {image && <Image source={{ uri: image }} style={{ flex: 1 }} />}
            </View>
        // </View>
    )
}

export default ChangeProfilePhotoScreen

const styles = StyleSheet.create({
  cameraContainer: {
      flex: 1,
      flexDirection: 'row'
    },
  fixedRatio: {
    flex: 1,
    aspectRatio: 1
  },
  btns:{
    alignSelf:'center'
  },
  btnContainer:{
    paddingHorizontal: 6,
    paddingVertical: 4,
    elevation: 6,
    borderRadius:6,
    backgroundColor: '#007bff',
    margin:5,
    width:200
},
appButtonText: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    // textTransform: "uppercase"
  },
})