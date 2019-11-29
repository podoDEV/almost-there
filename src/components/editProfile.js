import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ImageBackground, TextInput } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

export default function editProfile(props) {
  const { userInfo } = props.navigation.state.params;
  console.log(userInfo.profileImageUrl);
  const [name, setName] = useState(userInfo.name);
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
        <TextInput style={styles.nameInput} onChangeText={(text) => setName(text)} value={name} />
      </View>
      <TouchableOpacity
        style={styles.finishBtnContainer}
        onPress={() => {
          alert('수정!');
        }}
      >
        <Text style={styles.finishBtn}>수정 완료</Text>
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
