import React from 'react';
import { StyleSheet, ScrollView, View, Text, Image, Dimensions } from 'react-native';
import { TextInput } from 'react-native-paper';
import API from '../../apis/profileApi.js';
import ParseContent from '../ParseContent/ParseContent.js';

const screenWidth = Dimensions.get("window")

export default class Search extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            search: '',
            apiRes: [],
        }
    }

    _searchInputTextHandler(text) {
        this.setState({search: text})
        API.get('gallery/search?q=' + text, 'Bearer ' + this.props.route.token)
            .then((res) => {
                this.setState({
                    apiRes: res.data,
                })
            }, (err) => {
                console.log('error: ', err)
            })
    }

    renderImg() {
		return (<ParseContent apiRes={this.state.apiRes}/>)
	}

    render() {
        return(
            <View style={{ flex:1, backgroundColor: '#181817' }}>
                <View style={{ flex: 1, width: this.screenWidth - 20, marginLeft: 10}}>
                    <TextInput
                        style={styles.TextInputSearch}
                        label='Search'
                        mode='flat'
                        theme={{ colors: { primary: '#89C623' } }}
                        underlineColor='#89C623'
                        value={this.state.search}
                        onChangeText={text => this._searchInputTextHandler(text)}/>
                    <ScrollView contentContainerStyle={styles.scrollView} removeClippedSubviews={true}>
                        {this.renderImg()}
                    </ScrollView>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    TextInputSearch: {
        marginTop: 10
	},
	scrollView: {
		backgroundColor: '#181817',
		justifyContent: 'center',
		padding: 20
	},
	text: {
		color: 'white',
	},
});