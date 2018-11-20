import React from 'react';
import { View, ScrollView, Image, Dimensions, TouchableHighlight } from 'react-native';
import { Text } from 'react-native-paper';
import ParseContent from '../../ParseContent/ParseContent'

import API from '../../../apis/profileApi';

export default class Post extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			apiRes: '',
			visible: false
		}
		this.galleries = []
	}

	componentWillMount = () => {
		API.get('account/' + this.props.username + '/submissions', 'Bearer ' + this.props.token)
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

	render() {
		return(
			<View style={{ flex: 1 }}>
				{this.galleries === '' ?
					<Text>Loading ...</Text> :
					<ScrollView style={{ flex: 1 , padding: 20, backgroundColor: 'black', alignContent: 'center'}}>
						<View style={{ flex: 1, marginBottom: 10 }}>
							{this.galleries}
						</View>
					</ScrollView>
				}
			</View>
		)
	}
}