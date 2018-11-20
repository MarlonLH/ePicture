import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { FAB } from 'react-native-paper';

export default class MyFAB extends Component {
	constructor(props) {
		super(props)
		if (this.props.tag.isFollowed === 'true') {
			this.isFollowed = true
			this.icon = 'done'
		} else {
			this.isFollowed = false
			this.icon = 'add'
		}
		this.state = {
			isFollowed: this.isFollowed
		}
		this.bgColor = this._randomColor()
	}

	_tagPressedHandler = () => {
		if (this.state.isFollowed === true) {
			this.setState({
				isFollowed: false
			})
			this.icon = 'add'
		} else {
			this.setState({
				isFollowed: true
			})
			this.icon = 'done'
		}
	}

	getRandomInt(max) {
		return Math.floor(Math.random() * Math.floor(max));
	}

	_randomColor = () => {
		r = this.getRandomInt(255)
		g = this.getRandomInt(255)
		b = this.getRandomInt(255)
		return 'rgb(' + r + ', ' + g + ', ' + b + ')'
	}

	render() {
		return (
			<FAB
				icon={this.icon}
				label={this.props.tag.name}
				onPress={() => this._tagPressedHandler()}
				color='white'
				style={{ backgroundColor: this.bgColor, marginBottom: 20 }}
			/>
		)
	}
}
