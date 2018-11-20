import React from 'react';
import { ScrollView, View, Dimensions, Image, Text } from 'react-native';
import { ProgressBar, Button, Snackbar } from 'react-native-paper';
import ImagePicker from 'react-native-image-picker';
import API from '../../apis/profileApi.js';

const optionsPhoto = {
    title: null,
    mediaType: 'photo',
};

export default class Gallery extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            apiRes: null,
            mediaSelected: [],
            isSelected: false,
            imagesId: [],
            uploading: false,
            snackbar: false
        }
        this.screenSize = Dimensions.get('window').width
        this.buttonSize = this.screenSize / 2 - 20
    }

    _pickPhotoHandler() {
        ImagePicker.launchImageLibrary(optionsPhoto, (res) => {
            this.setState({
                isSelected: true,
                apiRes: res,
            })
        })
    }

    _uploadHandler() {
        this.setState({
            uploading: true,
            mediaSelected: []
        })
        if (this.state.mediaSelected.length >= 1) {
            for (i = 0; this.state.mediaSelected[i]; i++) {
                API.postImage('image', 'Bearer ' + this.props.token, this.state.mediaSelected[i])
                    .then((res) => {
                        this.images = []
                        this.setState({
                            uploading: false,
                            isSelected: false,
                            apiRes: '',
                            snackbar: true
                        })
                    }, (err) => {
                        console.log('error: ', err)
                    })
            }
        } else
            alert('You must pick a media before uploading!')
    }

    _renderMediaHandler() {
        this.images = []
        if (this.state.isSelected) {
            this.state.mediaSelected.push(this.state.apiRes)
            for (i = 0; this.state.mediaSelected[i]; i++) {
                this.images.push(
                    <View key={'images' + i} style={{ marginBottom: 10, alignContent: 'center' }}>
                        <View style={{ flex: 1, flexDirection: 'row', alignContent: 'center', justifyContent: 'center' }}>
                            <Image style={{ height: 150, width: 150, alignSelf: 'center' }} source={{uri: this.state.mediaSelected[i].uri}}/>
                        </View>
                    </View>
                )
            }
        }
        return this.images;
    }

    render() {
        return(
            <View style={{ flex: 1 }}>
                <View style={{ height: 60 }}>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <Button style={{ height: 40, width: this.buttonSize, marginLeft: 10 }} onPress={() => this._pickPhotoHandler()} mode='outlined' color='#89C623'>
                                Pick a Photo
                            </Button>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            { this.images &&
                                <Button style={{ height: 40, width: this.buttonSize, marginLeft: 10 }} onPress={() => this._uploadHandler()} mode='outlined' color='#89C623'>
                                    Upload
                                </Button>
                            }
                        </View>
                    </View>
                </View>
                { this.state.uploading === true &&
                    <View style={{ width: this.screenSize - 20, marginLeft: 10 }}>
                        <View>
                            <Text style={{ color: 'black' }}>Uploading ...</Text>
                        </View>
                        <ProgressBar progress={0.5} color='#89C623'/>
                    </View>
                }
                <ScrollView style={{ flex: 6, padding: 20, alignContent: 'center' }}>
                    {this._renderMediaHandler()}
                </ScrollView>
                <Snackbar
                    visible={this.state.snackbar}
                    onDismiss={() => this.setState({ snackbar: false })}
                    action={{
                        label: 'Undo',
                        onPress: () => this.setState({ snackbar: false })
                    }}>
                    Upload complete !
                </Snackbar>
            </View>
        )
    }
}