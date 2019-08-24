import React, { useState } from 'react';
import { Text, View, Image, StyleSheet, Switch } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function personInfo({ member, editMode = false }) {
  const { name, admin } = member;
  const [isAdmin, toggleAdmin] = useState(admin);

  return (
    <View key={name} style={styles.personContainer}>
      <View style={styles.person}>
        <Image style={styles.personImage} source={require('../../../assets/thumb.jpeg')} />
        <Text style={styles.personName}>{name}</Text>
        {admin && (
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <MaterialCommunityIcons
              name="crown"
              color="#0099ED"
              size={15}
              style={{ marginLeft: 3 }}
            />
          </View>
        )}
      </View>
      {/* @TODO: 내가 admin 권한이 있을 경우에 */}
      {editMode && (
        <Switch
          // trackColor={{ true: '#fff', false: '#fff' }}
          ios_backgroundColor="white"
          thumbColor={isAdmin ? '#0099ED' : '#9d9d9d'}
          value={isAdmin}
          onValueChange={() => toggleAdmin(!isAdmin)}
          styles={{
            backgroundColor: '#FF0000',
            borderRadius: 50
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  personContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  person: {
    flex: 1,
    flexDirection: 'row'
  },
  personName: {
    fontFamily: 'scdream',
    color: '#0099ED',
    fontSize: 17,
    paddingVertical: 10
  },
  personImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#0099ED',
    marginVertical: 5,
    marginRight: 15,
    paddingHorizontal: 7,
    paddingVertical: 8
  }
});
