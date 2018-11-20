import React, { Component } from 'react'
import { Text, View, Dimensions } from 'react-native'
import { IconButton, Button } from 'react-native-paper';

import API from '../../../../apis/profileApi'

export default class QueryComments extends Component {
	constructor(props) {
		super(props);
		this.state = {
			up: false,
			down: false,
			comments: [],
			loading: false
		}
		this.upColor = 'black'
		this.DownColor = 'black'
		this.windowSize = Dimensions.get('window');
		this.limit = 10;
		this.commentSize = 0;
	}

	componentWillMount = () => {
		if (this.props.galleryId) {
			API.get('gallery/' + this.props.galleryId + '/comments/best', 'Client-ID ' + '6ecaa1d0f211536')
				.then((res) => {
					this.commentSize = res.data.length;
					this.setState({
						comments: res.data
					})
				}, (err) => {
					console.log('error: ', err)
				}
			)
		}
		else if (this.props.username) {
			API.get('account/' + this.props.username + '/comments/best', 'Bearer ' + this.props.token)
				.then((res) => {
					this.commentSize = res.data.length;
					this.setState({
						comments: res.data
					})
				}, (err) => {
					console.log('error: ', err)
				}
			)
		}
	}

	_increaseLimit = () => {
		if (this.limit < this.commentSize)
			this.limit += 10;
		this._displayComments();
		this.setState({ loading: false })
	}

	_displayComments = () => {
		this.comments = []
		for (i = 0; this.state.comments[i] && i < this.limit; i++) {
			this.comment = this.state.comments[i]
			text = ''
			if (this.comment.children.length === 1)
				text = '1 reply'
			else if (this.comment.children.length)
				text = this.comment.children.length + ' replies'
			this.comments.push(
				<View style={{ flex: 1, marginBottom: 20, borderBottomColor: 'darkgrey', borderBottomWidth: 1, borderStyle: 'solid' }} key={this.props.galleryId + 'CommentsNb' + i}>
					<View style={{ flex: 1, flexDirection: 'row', marginBottom: 10 }}>
						<View style={{ flex: 2, flexDirection: 'row' }}>
							<Text style={{ alignSelf: 'flex-start', color: '#c2d6d6' }}>{this.comment.author}</Text>
						</View>
						<View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
							{text !== '' && <Text style={{ color: 'grey' }}>{text}</Text>}
						</View>
					</View>
					<View>
						<Text style={{ color: 'white' }}>{this.comment.comment}</Text>
					</View>
					<View style={{ flex: 1, flexDirection: 'row', alignContent: 'center', justifyContent: 'center'}}>
						<View style={{ flex: 1, flexDirection: 'row' }}>
							<IconButton
								icon='add-circle'
								color={this.upColor}
								size={18}
								style={{ borderRadius: 50 }}
							/>
							<Text style={{ color: 'white', marginTop: 15, fontSize: 12 }}>{this.comment.ups}</Text>
						</View>
						<View style={{ flex: 1, flexDirection: 'row' }}>
							<IconButton
								icon='remove-circle'
								color={this.downColor}
								size={18}
								style={{ borderRadius: 50 }}
							/>
							<Text style={{ color: 'white', marginTop: 15, fontSize: 12 }}>{this.comment.downs}</Text>
						</View>
					</View>
				</View>
			)
		}
		return this.comments
	}

	render() {
		return (
			<View style={{ flex: 0, marginBottom: 10, backgroundColor: '#3d5c5c', padding: 20 }}>
				<View style={{ width: this.windowSize.width - 40, alignContent: 'center', marginBottom: 20 }}>
					<Text style={{ color: '#a3c2c2' }}>{this.props.name}</Text>
				</View>
				<View style={{ flex: 1 }}>
					{
						this._displayComments()
					}
					{
						this.limit < this.commentSize &&
						<Button
							mode='contained'
							style={{ backgroundColor: '#89C623' }}
							loading={ this.state.loading }
							onPress={() => this._increaseLimit()}>
							Load more
						</Button>
					}
				</View>
			</View>
		)
	}
}
