import React, { Component } from 'react';
import { Text, View, Image, ScrollView } from 'react-native';
import { IconButton } from 'react-native-paper';

import QueryImages from './QueryImages/QueryImages'
import QueryTags from './QueryTags/QueryTags'
import GalleryInfo from './GalleryInfo/GalleryInfo'
import QueryComments from './QueryComments/QueryComments'

import API from '../../../apis/profileApi.js';

export default class DialogComponent extends Component {
	constructor(props) {
		super(props)
		this.state = {
			account: '',
			addStatus: 'add-circle'
		}
		this.images = []
		this.tags = []
	}

	componentWillMount = () => {
		if (this.props.data.images)
			this.images = this.props.data.images
		else {
			this.images.push({
				link: this.props.data.link,
				width: this.props.data.width,
				height: this.props.data.height
			})
		}
		this.tags = this.props.data.tags
		API.get('account/' + this.props.data.account_url, 'Bearer ' + this.props.token)
			.then((res) => {
				this.setState({
					account: res.data
				})
			}, (err) => {
				console.log('error: ', err)
			}
		)
	}

	_followUserHandler = () => {
		if (this.state.addStatus === 'add-circle')
			this.setState({ addStatus: 'done' })
		else
			this.setState({ addStatus: 'add-circle' })
	}

	render() {
		return (
			<View style={{ flex: 1 }}>
				<ScrollView style={{ paddingTop: 10 }}>
					<View style={{ flex: 0 }}>
						<View style={{ flex: 1, flexDirection: 'row' }}>
							<View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }} >
								<Image
									source={{uri: this.state.account.avatar}}
									style={{ width: 50, height: 50, borderRadius: 100, alignSelf: 'flex-start' }}
								/>
							</View>
							<View style={{ flex: 3, flexDirection: 'row'}} >
								<View style={{ flex: 1, flexDirection: 'column'}}>
									<View style={{ flex: 1, flexDirection: 'row'}}>
										<Text style={{ color: 'white', fontSize: 18 }}>{this.props.data.title}</Text>
									</View>
									<View style={{ flex: 1, flexDirection: 'row'}}>
										<Text style={{ color: 'grey', fontSize: 16 }}>{this.props.data.account_url}</Text>
										<IconButton
											icon={this.state.addStatus}
											color='grey'
											size={16}
											onPress={() => this._followUserHandler()}
											style={{ top: -13 }}
										/>
									</View>
								</View>
							</View>
						</View>
					</View>
					<QueryImages images={this.images} />
					<QueryTags tags={this.tags} />
					<GalleryInfo data={this.props.data} token={this.props.token} />
					<QueryComments name={'BEST COMMENTS'} galleryId={this.props.data.id} token={this.props.token} />
				</ScrollView>
			</View>
		)
	}
}
