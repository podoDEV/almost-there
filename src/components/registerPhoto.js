import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { GlobalContext } from '../context';
import * as url from '../apiUrl';

export default function RegisterName(props) {
  const { navigation } = props;
  const [image, setImage] = useState(null);
  const [finish, setFinish] = useState(false);
  const [imageUpload, setImageUpload] = useState(false);
  const userInfo = useContext(GlobalContext);

  async function pickImage() {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('수락 안하면 못 올려!');
      }
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [1, 1]
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  }

  function finishRegister() {
    const uriParts = image.split('.');
    const fileType = uriParts[uriParts.length - 1];
    const formData = new FormData();
    setImageUpload(true);

    formData.append('file', {
      uri: image,
      name: `file.${fileType}`,
      type: `image/${fileType}`
    });

    const options = {
      method: 'POST',
      body: formData,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${userInfo.accessToken}`
      }
    };

    fetch(url.uploadImage(), options)
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      })
      .then(() => {
        setFinish(true);
        setTimeout(() => {
          navigation.navigate('GroupList');
        }, 2000);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <View style={styles.container}>
      {finish ? (
        <Text style={styles.title}>환영합니다</Text>
      ) : (
        <Text style={styles.title}>앗, 사진도..</Text>
      )}
      <View style={styles.photoButtonContainer}>
        <TouchableOpacity style={styles.imageUploadButton} onPress={pickImage}>
          {image ? (
            <Image source={{ uri: image }} style={styles.image} />
          ) : (
            <Text style={styles.imageUploadButtonText}>고르기</Text>
          )}
        </TouchableOpacity>
        {image && (
          <TouchableOpacity onPress={finishRegister}>
            {finish && imageUpload ? (
              <Text style={styles.finishText}>{userInfo.name}</Text>
            ) : imageUpload ? (
              <ActivityIndicator size="small" color="#fff" style={{ marginTop: 10 }} />
            ) : (
              <Text style={styles.finishText}>완료 ></Text>
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: '#0099ED'
  },
  title: {
    color: '#fff',
    fontFamily: 'scdream',
    textAlign: 'center',
    fontSize: 29
  },
  photoButtonContainer: {
    alignItems: 'center'
  },
  imageUploadButton: {
    justifyContent: 'center',
    alignContent: 'center',
    height: 130,
    width: 130,
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 100,
    marginTop: 17,
    overflow: 'hidden'
  },
  imageUploadButtonText: {
    color: '#fff',
    fontFamily: 'scdream',
    textAlign: 'center',
    fontSize: 17
  },
  image: {
    flex: 1,
    width: null,
    height: null
  },
  finishText: {
    marginTop: 10,
    fontFamily: 'scdreamBold',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff'
  }
});
