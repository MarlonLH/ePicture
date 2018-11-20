import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { IconButton, Snackbar } from 'react-native-paper';

export default class GalleryInfo extends Component {
	constructor(props) {
		super(props)
		this.state = {
			up: false,
			down: false,
			favorite: false,
			snackbar: false
		}
		this.transparent = 'rgba(0, 0, 0, 0)'
		this.upColor = 'black'
		this.DownColor = 'black'
		this.favoriteColor = 'black'
		this.upCnt = this.props.data.ups
		this.downCnt = this.props.data.downs
		this.favoriteCnt = this.props.data.favorite_count
		this.snackbarText = ''
	}

	componentWillMount = () => {
		if (this.props.data.favorite === true) {
			this.setState({
				favorite: true
			})
			this.favoriteColor = 'white'
		}
	}
	

	_upperHandler = () => {
		if (this.state.up === false) {
			this.upCnt += 1;
			if (this.state.down === true)
				this.downCnt -= 1;
			this.upColor = 'white'
			this.downColor = 'black'
			vote = 'up'
			this.snackbarText = 'Voted Up'
			this.setState({
				up: true,
				down: false
			})
		}
		else {
			this.upCnt -= 1;
			this.upColor = 'black'
			vote = 'veto'
			this.snackbarText = 'Unvoted'
			this.setState({
				up: false
			})
		}
		fetch('https://api.imgur.com/3/gallery/' + this.props.data.id + '/vote/' + vote, {
			method: 'POST',
			headers: {
				Authorization: 'Client-ID ' + '6ecaa1d0f211536',
				Authorization: 'Bearer ' +  this.props.token
			},
		}).then((response) => {
			response.json()
			this.setState({ snackbar: true })
		}).catch((error) => {
			console.error(error);
		});
	}

	_downHandler = () => {
		if (this.state.down === false) {
			this.downCnt += 1;
			if (this.state.up === true)
				this.upCnt -= 1;
			this.downColor = 'white'
			this.upColor = 'black'
			vote = 'down'
			this.snackbarText = 'Voted Down'
			this.setState({
				down: true,
				up: false
			})
		}
		else {
			this.downColor = 'black'
			this.downCnt -= 1;
			vote = 'veto'
			this.snackbarText = 'Unvoted'
			this.setState({
				down: false
			})
		}
		fetch('https://api.imgur.com/3/gallery/' + this.props.data.id + '/vote/' + vote, {
			method: 'POST',
			headers: {
				Authorization: 'Client-ID ' + '6ecaa1d0f211536',
				Authorization: 'Bearer ' +  this.props.token
			},
		}).then((response) => {
			response.json()
			this.setState({ snackbar: true })
		}).catch((error) => {
			console.error(error);
		});
	}

	_favoriteHandler = () => {
		if (this.state.favorite === false) {
			this.favoriteColor = 'white'
			this.favoriteCnt += 1;
			this.snackbarText = 'Added to favorite !';
			this.setState({
				favorite: true
			})
		}
		else {
			this.snackbarText = 'Removed from favorite !';
			this.favoriteColor = 'black'
			this.favoriteCnt -= 1;
			this.setState({
				favorite: false
			})
		}
		fetch('https://api.imgur.com/3/album/' + this.props.data.id + '/favorite', {
			method: 'POST',
			headers: {
				Authorization: 'Client-ID ' + '6ecaa1d0f211536',
				Authorization: 'Bearer ' +  this.props.token
			},
		}).then((response) => {
			response.json()
			this.setState({ snackbar: true })
		}).catch((error) => {
			console.error(error);
		});
	}

	render() {
		return (
			<View style={{ flex: 0, marginBottom: 20 }}>
				<View style={{ flex: 1, marginLeft: 20, marginRight: 20, marginBottom: 10, backgroundColor: '#6c6c6c', borderRadius: 10 }}>
					<View style={{ flex: 1, flexDirection: 'row'}}>
						<View style={{ flex: 1, flexDirection: 'row' }}>
							<IconButton
								icon='add-circle'
								color={this.upColor}
								size={28}
								onPress={() => this._upperHandler()}
								style={{ borderRadius: 50 }}
							/>
							<Text style={{ color: 'white', marginTop: 13 }}>{this.upCnt}</Text>
						</View>
						<View style={{ flex: 1, flexDirection: 'row' }}>
							<IconButton
								icon='remove-circle'
								color={this.downColor}
								size={28}
								onPress={() => this._downHandler()}
								style={{ borderRadius: 50 }}
							/>
							<Text style={{ color: 'white', marginTop: 13 }}>{this.downCnt}</Text>
						</View>
						<View style={{ flex: 1, flexDirection: 'row' }}>
							<IconButton
								icon='favorite'
								color={this.favoriteColor}
								size={28}
								onPress={() => this._favoriteHandler()}
								style={{ borderRadius: 50 }}
							/>
							<Text style={{ color: 'white', marginTop: 13 }}>{this.favoriteCnt}</Text>
						</View>
					</View>
				</View>
				<View style={{ height: 40 }}>
					<View style={{ flex: 1, flexDirection: 'row'}}>
						<View style={{ flex: 1, flexDirection: 'row', alignContent: 'center', justifyContent: 'center' }}>
							<Text style={{ color: 'grey', alignSelf: 'center' }}>{this.props.data.views} Views</Text>
						</View>
						<View style={{ flex: 1, flexDirection: 'row', alignContent: 'center', justifyContent: 'center' }}>
							<Text style={{ color: 'grey', alignSelf: 'center' }}>{this.props.data.comment_count} Comments</Text>
						</View>
					</View>
				</View>
				<Snackbar
                    visible={this.state.snackbar}
                    onDismiss={() => this.setState({ snackbar: false })}
                    action={{
                        label: 'Undo',
                        onPress: () => this.setState({ snackbar: false })
                    }}>
                    {this.snackbarText}
                </Snackbar>
			</View>
		)
	}
}
