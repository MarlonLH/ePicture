import React from 'react';
import { StyleSheet, ScrollView, View, Dimensions, Picker, Text } from 'react-native';
import API from '../../apis/profileApi.js';
import ParseContent from '../ParseContent/ParseContent.js';
import LoadingContent from '../ParseContent/LoadingContent/LoadingContent';

export default class Feed extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            filter: '----',
            firstClick: false,
            searching: true,
            loading: true,
            tagsRes: null,
            apiRes:null
        }
        this.screenSize = Dimensions.get('window').width;

        API.get('tags/', 'Client-ID 6ecaa1d0f211536')
            .then((res) => {
                this.setState({
                    searching: false,
                    tagsRes: res,
                    filter: res.data.tags[0]
                })
            }, (err) => {
                console.log('error: ', err)
            })
    }

    _feedPerTagHandler(itemValue) {
        if (this.state.firstClick === false) {
            this.setState({
                firstClick: true,
                filter: itemValue
            })
        } else
            this.setState({ filter: itemValue })
        if (this.state.searching === false) {
            API.get('gallery/t/' + itemValue, 'Client-ID 6ecaa1d0f211536')
                .then((res) => {
                    this.setState({
                        apiRes: res.data.items,
                        loading: false
                    })
                }, (err) => {
                    console.log('error: ', err)
                })
        }
    }

    _renderImg() {
		if (this.state.loading === false) {
			return (<ParseContent apiRes={this.state.apiRes} token={this.props.token} />)
		} else if (this.state.firstClick === false) {
            return (<Text style={{ color: 'white', alignSelf: 'center' }}>Select a filter</Text>)
        } else {
			return (<LoadingContent />)
		}
	}

    render() {
        if (this.state.searching === false) {
            this.pickerItem = this.state.tagsRes.data.tags.map((tags, index) => {
                return (
                    <Picker.Item
                        key={index}
                        value={tags.name}
                        label={tags.display_name}
                    />
                )
            });
        }
        return (
            <View style={{ flex: 1, backgroundColor: 'black' }}>
                <View style={{ width: this.screenSize - 20, marginLeft: 10, backgroundColor: 'white', alignContent: 'center', justifyContent: 'center', borderRadius: 10, marginTop: 10 }}>
                    <Picker
                        selectedValue={this.state.filter}
                        style={{ width: this.screenSize - 30, height: 30, marginLeft: 5, color: 'black', alignSelf: 'center' }}
                        onValueChange={(itemValue) => this._feedPerTagHandler(itemValue)}>
                        {this.pickerItem}
                    </Picker>
                </View>
                <ScrollView contentContainerStyle={styles.scrollView} removeClippedSubviews={true}>
						{this._renderImg()}
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
		backgroundColor: 'black',
		justifyContent: 'center',
		padding: 20
	},
	text: {
		color: 'white',
	}
});
