import React, { Component } from 'react';
import { View } from 'react-native';
import MyFAB from './MyFAB/MyFAB'

export default class QueryTags extends Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	_renderTags = () => {
		this.tags = [];
		for (i = 0; this.props.tags[i]; i++) {
			this.tag = this.props.tags[i];
			this.tags.push(
				<MyFAB tag={this.tag} key={'FABTag' + i}/>
			)
		}
		return this.tags;
	}

	render() {
		return (
			<View style={{ flex: 0, marginTop: 10, padding: 20 }}>
				{
					this._renderTags()
				}
			</View>
		)
	}
}
