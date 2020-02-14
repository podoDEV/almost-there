import React, { useState, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert
} from 'react-native';
import { useNavigation } from 'react-navigation-hooks';
import Constants from 'expo-constants';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { GlobalContext } from '../context';
import * as url from '../apiUrl';

const defaultThumb = require('../../assets/thumb.jpeg');

export default function RegisterName() {
  const { navigate } = useNavigation();
  const [pageStatus, setPageStatus] = useState('NONE'); // NONE -> UPLOAD -> FINISH
  const [image, setImage] = useState(null);
  const userInfo = useContext(GlobalContext);

  async function pickImage() {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        Alert.alert('흐음!!!', '동의하지 않으면 사진을 올릴 수 없어요😢');
      }
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1]
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  }

  function finishRegister() {
    if (!image) {
      setFinishAndNavigate();
      return;
    }

    const uriParts = image.split('.');
    const fileType = uriParts[uriParts.length - 1];
    const formData = new FormData();
    setPageStatus('UPLOAD');

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
        setFinishAndNavigate();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  const setFinishAndNavigate = () => {
    setPageStatus('FINISH');
    setTimeout(() => {
      navigate('GroupList');
    }, 2000);
  };

  return (
    <View style={styles.container}>
      {pageStatus === 'FINISH' ? (
        <Text style={styles.title}>환영합니다</Text>
      ) : (
        <Text style={styles.title}>앗, 사진도..</Text>
      )}
      <View style={styles.photoButtonContainer}>
        {pageStatus !== 'NONE' ? (
          <View style={styles.imageUploadButton}>
            <Image source={image ? { uri: image } : defaultThumb} style={styles.image} />
          </View>
        ) : (
          <TouchableOpacity style={styles.imageUploadButton} onPress={pickImage}>
            {image ? (
              <Image source={{ uri: image }} style={styles.image} />
            ) : (
              <Text style={styles.imageUploadButtonText}>고르기</Text>
            )}
          </TouchableOpacity>
        )}
        {pageStatus === 'NONE' && (
          <TouchableOpacity onPress={finishRegister} style={styles.arrowContainer}>
            <MaterialCommunityIcons name="arrow-right" size={32} color="#fff" />
          </TouchableOpacity>
        )}
        {pageStatus === 'FINISH' && <Text style={styles.finishText}>{userInfo.name}</Text>}
        {pageStatus === 'UPLOAD' && (
          <ActivityIndicator size="small" color="#fff" style={{ marginTop: 10 }} />
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
    fontSize: 34,
    marginBottom: 40
  },
  photoButtonContainer: {
    justifyContent: 'center',
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
  },
  arrowContainer: {
    position: 'absolute',
    right: 20,
    flex: 1,
    justifyContent: 'center'
  }
});
