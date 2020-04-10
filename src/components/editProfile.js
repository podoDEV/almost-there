import React, { useState, useContext, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ImageBackground,
  TextInput,
  ActivityIndicator,
  Alert,
  Image,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import { GlobalContext } from '../context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigationParam, useNavigation } from 'react-navigation-hooks';
import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import * as url from '../apiUrl';

export default function editProfile() {
  const globalUserInfo = useContext(GlobalContext);
  const userInfo = useNavigationParam('userInfo');
  const [nameStatus, setNameStatus] = useState('NONE'); // NONE -> CHANGE -> FINISH
  const [photoStatus, setPhotoStatus] = useState('NONE'); // NONE -> CHANGE -> UPLOAD -> FINISH
  const [name, setName] = useState(userInfo.name);
  const [profileImageUrl, setProfileImageUrl] = useState(userInfo.profileImageUrl);
  const { goBack } = useNavigation();

  useEffect(() => {
    setNameStatus(name === userInfo.name ? 'NONE' : 'CHANGE');
  }, [name]);

  useEffect(() => {
    setPhotoStatus(profileImageUrl === userInfo.profileImageUrl ? 'NONE' : 'CHANGE');
  }, [profileImageUrl]);

  useEffect(() => {
    if (nameStatus === 'FINISH' && photoStatus === 'FINISH') {
      setTimeout(() => {
        goBack();
      }, 1000);
    }

    if (nameStatus === 'ERROR' || photoStatus === 'ERROR') {
      Alert.alert('또잉👀', '뭔가 잘못된 것 같다! 잠시 후 다시 시도해주세요');
    }
  }, [nameStatus, photoStatus]);

  async function pickImage() {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        Alert.alert('띠용👀', '설정 > 진짜다와가 > 카메라 권한을 활성하세요');
      }
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1]
    });

    if (!result.cancelled) {
      setProfileImageUrl(result.uri);
    }
  }

  function changeName() {
    if (name !== userInfo.name) {
      const options = {
        method: 'PUT',
        body: JSON.stringify({
          name
        }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${globalUserInfo.accessToken}`
        }
      };

      return fetch(url.membersMe(), options)
        .then((res) => {
          if (res.status === 200) {
            return res.json();
          }
        })
        .then(() => {
          globalUserInfo.name = name;
          setNameStatus('FINISH');
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      setNameStatus('FINISH');
    }
  }

  function changePhoto() {
    // setImageUpload(true);
    if (photoStatus === 'CHANGE') {
      setPhotoStatus('UPLOAD');
      const uriParts = profileImageUrl.split('.');
      const fileType = uriParts[uriParts.length - 1];
      const formData = new FormData();
      formData.append('file', {
        uri: profileImageUrl,
        name: `file.${fileType}`,
        type: `image/${fileType}`
      });

      const options = {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${globalUserInfo.accessToken}`
        }
      };

      return fetch(url.uploadImage(), options)
        .then((res) => {
          if (res.status === 200) {
            return res.json();
          }
        })
        .then(() => {
          setPhotoStatus('FINISH');
          return true;
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      setPhotoStatus('FINISH');
    }
  }

  async function finishEditing() {
    if (!name.length || name.length > 10) {
      Alert.alert('흐음!!', '이름은 최소 한글자, 최대 열글자에요!🙋‍♂️');
      return;
    }

    changeName();
    changePhoto();
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <View style={styles.infoContainer}>
          <View style={styles.photoButtonContainer}>
            {photoStatus === 'NONE' || photoStatus === 'CHANGE' ? (
              <TouchableOpacity style={styles.imageUploadButton} onPress={pickImage}>
                <ImageBackground source={{ uri: profileImageUrl }} style={styles.image}>
                  <View style={styles.editIconContainer}>
                    <MaterialCommunityIcons
                      name="square-edit-outline"
                      size={25}
                      color="rgb(74,74,74)"
                    />
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            ) : (
              <View style={styles.imageUploadButton}>
                <Image source={{ uri: profileImageUrl }} style={styles.image} />
              </View>
            )}
          </View>
          {photoStatus === 'UPLOAD' && (
            <ActivityIndicator size="small" color="#ddd" style={{ marginTop: 10 }} />
          )}
          {photoStatus !== 'FINISH' && nameStatus !== 'FINISH' && (
            <TextInput
              style={styles.nameInput}
              onChangeText={(text) => setName(text)}
              value={name}
            />
          )}
        </View>

        <View style={styles.finishBtnContainer}>
          {photoStatus === 'FINISH' && nameStatus === 'FINISH' && (
            <Text style={styles.finishBtnText}>{name}</Text>
          )}
          {(photoStatus === 'CHANGE' || nameStatus === 'CHANGE') &&
            photoStatus !== 'FINISH' &&
            nameStatus !== 'FINISH' && (
              <TouchableOpacity
                style={styles.finishBtn}
                onPress={() => {
                  finishEditing();
                }}
              >
                <Text style={styles.finishBtnText}>완료</Text>
              </TouchableOpacity>
            )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  infoContainer: {
    flex: 8,
    justifyContent: 'center'
  },
  finishBtnContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  finishBtnText: {
    fontFamily: 'scdreamBold',
    color: '#0099ED',
    fontSize: 21
  },
  finishBtn: {
    borderWidth: 1,
    borderColor: '#0099ED',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    height: 50,
    marginBottom: 30,
    width: '90%'
  },
  photoButtonContainer: {
    alignItems: 'center'
  },
  image: {
    flex: 1,
    width: null,
    height: null
  },
  imageUploadButton: {
    justifyContent: 'center',
    alignContent: 'center',
    height: 130,
    width: 130,
    borderColor: 'rgb(74,74,74)',
    borderWidth: 1.5,
    borderRadius: 100,
    marginTop: 17,
    overflow: 'hidden'
  },
  nameInput: {
    fontFamily: 'scdream',
    color: '#000',
    fontSize: 19,
    textAlign: 'center',
    padding: 8,
    borderColor: '#fff',
    borderBottomColor: 'rgb(213,213,213)',
    borderWidth: 1,
    marginTop: 35,
    marginHorizontal: 25
  },
  editIconContainer: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
