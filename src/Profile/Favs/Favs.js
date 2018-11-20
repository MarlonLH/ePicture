import React from 'react';
import { View, ScrollView, RefreshControl } from 'react-native';
import { Text } from 'react-native-paper';
import ParseContent from '../../ParseContent/ParseContent'

import API from '../../../apis/profileApi';
import { refresh } from 'react-native-app-auth';

export default class Favs extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			apiRes: '',
			visible: false,
			refreshing: false
		}
		this.galleries = []
	}

	componentWillMount = () => {
		API.get('account/' + this.props.username + '/gallery_favorites/newest', 'Bearer ' + this.props.token)
			.then((res) => {
				this.galleries = (<ParseContent apiRes={res.data} token={this.props.token}/>)
				this.setState({
					apiRes: res.data
				})
			}, (err) => {
				console.log('error: ', err)
			}
		)
	}

	_onRefreshhandle = () => {
		this.setState({ refreshing: true })
		API.get('account/' + this.props.username + '/gallery_favorites/newest', 'Bearer ' + this.props.token)
			.then((res) => {
				this.galleries = (<ParseContent apiRes={res.data} token={this.props.token}/>)
				this.setState({
					apiRes: res.data,
					refreshing: false
				})
			}, (err) => {
				console.log('error: ', err)
			}
		)
	}

	render() {
		return(
			<View style={{ flex: 1 }}>
				{this.galleries === '' ?
					<Text>Loading ...</Text> :
					<ScrollView
						refreshControl={
							<RefreshControl 
							refreshing={this.state.refreshing}
							onRefresh={this._onRefreshhandle}
							/>
						}
						style={{ flex: 1 , paddingRight: 20, backgroundColor: 'black', alignContent: 'center'}}>
						<View style={{ flex: 1, marginLeft: 20, marginTop: 20, marginBottom: 10, alignContent: 'center' }}>
							{this.galleries}
						</View>
					</ScrollView>
				}
			</View>
		)
	}
}