import React, { Component } from 'react';
import { View } from 'react-native';
import { BottomNavigation, Text } from 'react-native-paper';
import { revoke } from 'react-native-app-auth';

import MostViral from '../MostViral/MostViral'
import LogIn, { config } from '../LogIn/LogIn'
import Home from '../Home/Home'
import Upload from '../Upload/Upload'
import Search from '../Search/Search'
import Profile from '../Profile/Profile'

export default class BottomNavbar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			index: 0,
			routes: [
				{ key: 'mostviral', title: 'Most Viral', icon: 'home', color: '#000000' },
				{ key: 'login', title: 'Log In', icon: 'account-circle', color: '#2a2a2a', loginFunc: this._logInHandler },
			],
			isLoged: false
		};
		this._logInHandler = this._logInHandler.bind(this);
		this._logOffHandler = this._logOffHandler.bind(this);
	}

	_logInHandler = (result) => {
		this.setState({
			isLoged: true,
			index: 0,
			routes: [
				{ key: 'home', title: 'Home', icon: 'home', color: '#000000', token: result.accessToken, accounInfo: result.additionalParameters },
				{ key: 'upload', title: 'Upload', icon: 'add-a-photo', color: '#2a2a2a', token: result.accessToken, accounInfo: result.additionalParameters },
				{ key: 'search', title: 'Search', icon: 'search', color: '#4b4b4b', token: result.accessToken, accounInfo: result.additionalParameters },
				{ key: 'profile', title: 'Profile', icon: 'account-circle', color: '#6c6c6c', token: result.accessToken, accounInfo: result.additionalParameters, logOffFunction: this._logOffHandler },
			]
		})
	}

	_logOffHandler = async (token) => {
		this.setState({
			index: 0,
			routes: [
				{ key: 'mostviral', title: 'Most Viral', icon: 'home', color: '#000000' },
				{ key: 'login', title: 'Log In', icon: 'account-circle', color: '#2a2a2a', loginFunc: this._logInHandler },
			],
			isLoged: false
		})
	}

	_handleIndexChange = index => this.setState({ index });

	_renderScene = BottomNavigation.SceneMap({
		mostviral: MostViral,
		login: LogIn,
		home: Home,
		upload: Upload,
		search: Search,
		profile: Profile
	});

	render() {
		return (
			<View style={{ flex: 1 }}>
				<BottomNavigation
					shifting={true}
					navigationState={this.state}
					onIndexChange={this._handleIndexChange}
					renderScene={this._renderScene}
				/>
			</View>
		);
	}
}