import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import API from '../../apis/api';
import ParseContent from '../ParseContent/ParseContent';
import LoadingContent from '../ParseContent/LoadingContent/LoadingContent';


export default class MostViral extends React.Component {
	constructor (props) {
		super(props)
		this.state = {
			apiRes: [],
			loading: true,
		}
		API.get('gallery/hot/viral/0.json')
			.then((res) => {
				this.setState({
					apiRes: res.data,
					loading: false
				})
			}, (err) => {
				console.log('error: ', err)
			})
	}

	renderImg() {
		if (this.state.loading === false) {
			return (<ParseContent apiRes={this.state.apiRes} token={this.props.token} />)
		} else {
			return (<LoadingContent />)
		}
	}

	render () {
		return (
			<View style={styles.container}>
				<ScrollView contentContainerStyle={styles.scrollView} removeClippedSubviews={true}>
						{this.renderImg()}
				</ScrollView>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	scrollView: {
		backgroundColor: '#181817',
		justifyContent: 'center',
		padding: 20
	},
	text: {
		color: 'white',
	}
});