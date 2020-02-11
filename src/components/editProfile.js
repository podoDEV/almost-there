import React, { useState, useContext } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ImageBackground,
  TextInput,
  ActivityIndicator
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
  const [name, setName] = useState(userInfo.name);
  const { goBack } = useNavigation();
  const [finish, setFinish] = useState(false);
  const [imageUpload, setImageUpload] = useState(false);
  const [profileImageUrl, setProfileImageUrl] = useState(userInfo.profileImageUrl);

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

          return true;
        })
        .catch((err) => {
          console.error(err);
        });
    }

    return true;
  }

  function changePhoto() {
    setImageUpload(true);

    if (profileImageUrl !== userInfo.profileImageUrl) {
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
          return true;
        })
        .catch((err) => {
          console.error(err);
        });
    }

    return true;
  }

  async function finishEditing() {
    const finishChangeName = await changeName();
    const finishChangePhoto = await changePhoto();

    if (finishChangeName && finishChangePhoto) {
      setFinish(true);
      setTimeout(() => {
        goBack();
      }, 1000);
    } else {
      alert('뭔가 잘못된 것 같다!');
      return;
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <View style={styles.photoButtonContainer}>
          <TouchableOpacity style={styles.imageUploadButton} onPress={pickImage}>
            <ImageBackground source={{ uri: profileImageUrl }} style={styles.image}>
              <View
                style={{
                  flex: 1,
                  backgroundColor: 'rgba(255, 255, 255, 0.4)',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <MaterialCommunityIcons
                  name="square-edit-outline"
                  size={25}
                  color="rgb(74,74,74)"
                />
              </View>
            </ImageBackground>
          </TouchableOpacity>
        </View>
        {!finish && imageUpload && (
          <ActivityIndicator size="small" color="#ddd" style={{ marginTop: 10 }} />
        )}
        {!finish && !imageUpload && (
          <TextInput style={styles.nameInput} onChangeText={(text) => setName(text)} value={name} />
        )}
      </View>
      <TouchableOpacity
        style={styles.finishBtnContainer}
        onPress={() => {
          finishEditing();
        }}
      >
        {finish && imageUpload && <Text style={styles.finishBtn}>{name}</Text>}
        {!finish && !imageUpload && <Text style={styles.finishBtn}>완료 ></Text>}
      </TouchableOpacity>
    </View>
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
  finishBtn: {
    fontFamily: 'scdreamBold',
    color: '#0099ED',
    fontSize: 21
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
  }
});
