import React, { Component } from 'react';
import { StyleSheet, View, ImageBackground, Image } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { authorize } from 'react-native-app-auth';

import BgImage from '../../assets/bglogin.png'
import IMGURLogo from '../../assets/imgurLogo.png'

const config = {
	issuer: 'https://api.imgur.com/',
	clientId: '6ecaa1d0f211536',
	clientSecret: '6757136dd60d213b01fa95abba8c95cd82304263',
	redirectUrl: 'com.epicture://callback',
	serviceConfiguration: {
		authorizationEndpoint: 'https://api.imgur.com/oauth2/authorize',
		tokenEndpoint: 'https://api.imgur.com/oauth2/token',
		revocationEndpoint: 'https://api.imgur.com/oauth2/revoke'
	}
};

export default class LogIn extends Component {
	constructor(props) {
		super(props)
		this.state = {
			loadingLog: false
		}
	}

	_sendRequestForLogin = async () => {
		try {
			const result = await authorize(config);
			this.props.route.loginFunc(result)
		} catch(error) {
			console.log(error);
		}
	}

	render () {
		return (
			<View style={{ flex: 1 }}>
				<ImageBackground
					source={BgImage}
					style={{width: '100%', height: '100%'}}>
					<View style={styles.container}>
						<View style={{ flex: 4 }}>
							<Image 
								source={IMGURLogo}
								style={{ width: undefined, height: undefined, flex: 1, alignSelf: 'stretch' }}
								resizeMode='center'
							/>
						</View>
						<View style={{ flex: 4 }}>
							<Button
								mode='contained'
								style={styles.loginButton}
								loading={ this.state.loadingLog }
								onPress={() => this._sendRequestForLogin()}>
								Log in with your account
							</Button>
						</View>
						<View style={{ flex: 1 }}>
							<Text style={styles.loginText}>Your informations wont be saved or sold.</Text>
							<Text style={styles.loginText}>2018 - Bullshit Industries.</Text>
						</View>
					</View>
				</ImageBackground>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
	  flex: 1,
	  justifyContent: 'flex-start',
	},
	textinputs: {
		backgroundColor: 'rgba(255, 255, 255, 0.50)',
		width: '80%',
		marginLeft: '10%',
		justifyContent: 'center',
		alignItems: 'center',
		padding: 0,
		marginBottom: 20,
	},
	loginButton: {
		width: '80%',
		alignItems: 'center',
		justifyContent: 'center',
		marginLeft: '10%',
		backgroundColor: '#89C623',
	},
	loginText: {
		color: 'white',
		alignSelf: 'center',
	}
  });