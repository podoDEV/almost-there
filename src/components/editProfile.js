import React, { useState, useContext } from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
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
    <View>
      <TouchableOpacity onPress={pickImage}>
        <Image source={{ uri: profileImageUrl }} style={{ width: 100, height: 100 }} />
        <Text>{name}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});
