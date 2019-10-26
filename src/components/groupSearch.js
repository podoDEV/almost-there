import React, {useEffect, useState, useContext} from 'react';
import {StyleSheet, View, Text, TextInput, ScrollView} from 'react-native';
import {GlobalContext} from "../context";
import * as url from '../apiUrl';
import Navigation from './navigation';
import ActionButton from 'react-native-action-button';
import {Layout} from "../layout";
import {SimpleLineIcons} from "@expo/vector-icons";

export default function GroupSearch(props) {
	const {navigation} = props;
	const {accessToken} = useContext(GlobalContext);
	
	const CreateGroup = () => {
		const options = {
			method: 'GET',
			headers: {Authorization: `Bearer ${accessToken}`}
		};
		fetch(url.getGroups(), options)
			.then((res) => {
				if (res.status === 200) {
					return res.json();
				}
			})
			.then((resJson) => {
				setGroupList(resJson);
			})
			.catch((error) => {
				console.error(error);
			});
	}
	
	return (
		<Layout>
			<View style={styles.container}>
				<View style={styles.header}>
					<Text style={styles.headerText}>모임 찾기</Text>
				</View>
				<View style={styles.groupName}>
					<Text>모임 코드 입력</Text>
					<View>
						<TextInput/>
						<SimpleLineIcons/>
					</View>
				</View>
				<View style={styles.groupInfo}>
					<View style={styles.groupName}>
						<Text>포도</Text>
						<Text>6</Text>
					</View>
					<View style={styles.groupMember}>
						<Text>멤버</Text>
						<View>
							<Text>김자영</Text>
						</View>
					</View>
					<View>
						<View>
							<Text>모임장소</Text>
							<Text>할리스 강남역점 B1층</Text>
						</View>
						<View>
							<Text>모임시간</Text>
							<Text>매주 토요일 11:00 오전</Text>
						</View>
					</View>
					<ActionButton>
					</ActionButton>
				</View>
			</View>
		</Layout>
	)
	
	
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	header: {
		height: 50,
		backgroundColor: '#31ACF1',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingLeft: 15,
		paddingRight: 15,
		paddingTop: 5,
		paddingBottom: 5,
	},
	headerText: {
		color: '#fff',
		fontSize: 15,
		fontFamily: 'scdreamBold',
	},
});
