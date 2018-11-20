import React from 'react';
import { View, Image, Text, ImageBackground } from 'react-native';
import { IconButton } from 'react-native-paper';

import Post from './Post/Post'
import Favs from './Favs/Favs'
import MyGallery from './MyGallery/MyGallery'
import Coms from './Coms/Coms'

import BGImage from '../../assets/profileBg.png'
import NavigationBar from '../Utils/NavigationBar/NavigationBar'

import API from '../../apis/profileApi.js';

export default class Profile extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			apiRes: '',
			trophies: 0,
			index: 0
		}
		this.pages = [
			{ key: 'post', index: 0, label: 'Post', color: '#ffffff', fontSize: 18, bgColor: 'rgba(255, 255, 255, 0.1)' },
			{ key: 'favs', index: 1, label: 'Favs', color: '#ffffff', fontSize: 18, bgColor: 'rgba(255, 255, 255, 0.1)' },
			{ key: 'mygallery', index: 2, label: 'Gallery', color: '#ffffff', fontSize: 18, bgColor: 'rgba(255, 255, 255, 0.1)' },
			{ key: 'com', index: 3, label: 'Coms', color: '#ffffff', fontSize: 18, bgColor: 'rgba(255, 255, 255, 0.1)' }
		]
		this._changeIndexHandler = this._changeIndexHandler.bind(this)
		API.get('account/' + this.props.route.accounInfo.account_username, 'Bearer ' + this.props.route.token)
			.then((res) => {
				this.setState({
					apiRes: res.data
				})
			}, (err) => {
				console.log('error: ', err)
			}
		)
		API.get('account/' + this.props.route.accounInfo.account_username + '/gallery_profile', 'Bearer ' + this.props.route.token)
			.then((res) => {
				if (res.data.trophies.length <= 1)
					text = res.data.trophies.length + ' Trophy'
				else
					text = res.data.trophies.length + ' Trophies'
				this.setState({ trophies: text })
			}, (err) => {
				console.log('error: ', err)
			}
		)

	}

	_changeIndexHandler( index ) {
		this.setState({ index: index })
	}

	render() {
		return (
			<View style={{ flex: 1 }}>
			{
				this.state.apiRes === '' ?
				<Text>Loading...</Text> :
				<View style={{ flex: 1 }}>
					<View style={{ height: 200 }}>
						<ImageBackground
							source={BGImage}
							style={{width: '100%', height: '100%'}}>
							<View style={{ flex: 1, marginTop: 10 }}>
								<View style={{ flex: 1, flexDirection: 'row'}}>
									<View style={{ flex: 3, flexDirection: 'row', justifyContent: 'center', alignContent: 'center' }}>
										<Text style={{ height: 30, alignSelf: 'center', color: 'white', fontSize: 16 }}>{this.state.apiRes.reputation} Points</Text>
									</View>
									<View style={{ flex: 2, flexDirection: 'row', justifyContent: 'center' }}>
										<Image
											source={{uri: this.state.apiRes.avatar}}
											style={{ width: 50, height: 50, borderRadius: 100, alignSelf: 'center' }}
										/>
									</View>
									<View style={{ flex: 3, flexDirection: 'row', justifyContent: 'center', alignContent: 'center' }}>
										<Text style={{ height: 30, alignSelf: 'center', color: 'white', fontSize: 16 }}>{this.state.trophies}</Text>
									</View>
								</View>
							</View>
							<View style={{ flex: 1 }}>
								<IconButton
									icon='input'
									color='red'
									size={20}
									onPress={() => this.props.route.logOffFunction(this.props.route.token)}
									style={{ position: 'absolute', alignSelf: 'flex-end', bottom: 40 }}
								/>
								<View style={{ flex: 1 }}>
									<View style={{ flex: 1, flexDirection: 'row'}}>
										<View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignContent: 'center'}}>
											<Text style={{ alignSelf: 'center', color: 'white', fontSize: 18 }}>{this.state.apiRes.url}</Text>
										</View>
										<View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignContent: 'center'}}>
											<Text style={{ alignSelf: 'center', color: 'white', fontSize: 16 }}>{this.state.apiRes.reputation_name}</Text>
										</View>
									</View>
								</View>
								<View style={{ height: 70 }}>
									<NavigationBar
										style={{ height: 50, backgroundColor: 'rgba(255, 255, 255, 0.02)', marginTop: 20 }}
										pages={this.pages}
										changeIndex={this._changeIndexHandler}
										index={0} />
								</View>
							</View>
						</ImageBackground>
					</View>
					<View style={{ flex: 6 }}>
							{this.state.index === 0 && (<Post token={this.props.route.token} username={this.props.route.accounInfo.account_username}/>)}
							{this.state.index === 1 && (<Favs token={this.props.route.token} username={this.props.route.accounInfo.account_username}/>)}
							{this.state.index === 2 && (<MyGallery token={this.props.route.token} username={this.props.route.accounInfo.account_username}/>)}
							{this.state.index === 3 && (<Coms token={this.props.route.token} username={this.props.route.accounInfo.account_username}/>)}
					</View>
				</View>
			}
			</View>
		)
	}
}