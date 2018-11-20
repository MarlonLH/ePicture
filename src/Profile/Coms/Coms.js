import React, { Component } from 'react'
import { Text, View, ScrollView } from 'react-native'

import QueryComments from '../../ParseContent/DialogComponent/QueryComments/QueryComments'

export default class Coms extends Component {
	constructor(props) {
		super(props)
		this.state = {
			apiRes: ''
		}
		this.coms
	}

	componentWillMount = () => {
		this.coms = (<QueryComments username={this.props.username} name={'BESTS COMMENTS'} token={this.props.token} />)
	}

	render() {
		return (
			<View style={{ flex: 1 }}>
				{this.galleries === '' ?
					<Text>Loading ...</Text> :
					<ScrollView style={{ flex: 1 , padding: 20, backgroundColor: 'black', alignContent: 'center'}}>
						<View style={{ flex: 1, marginBottom: 10 }}>
							{this.coms}
						</View>
					</ScrollView>
				}
			</View>
		)
	}
}
