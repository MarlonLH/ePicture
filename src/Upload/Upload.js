import React from 'react';
import { View } from 'react-native';

import NavigationBar from '../Utils/NavigationBar/NavigationBar'
import Gallery from '../Gallery/Gallery'
import CameraPage from '../Camera/Camera'

export default class Upload extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            index: 0
        }
        this.pages = [
            { key: 'gallery', index: 0, label: 'Gallery', color: '#ffffff', fontSize: 18, bgColor: '#93d820' },
            { key: 'camera', index: 1, label: 'Camera', color: '#ffffff', fontSize: 18, bgColor: '#93d820' }
        ]
        this._changeIndexHandler = this._changeIndexHandler.bind(this)
    }

    _changeIndexHandler( index ) {
        this.setState({ index: index })
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <NavigationBar
                    style={{ height: 50, backgroundColor: '#89C623' }}
                    pages={this.pages}
                    changeIndex={this._changeIndexHandler}
                    index={0}
                />
                { this.state.index === 0 ?
                    <Gallery token={this.props.route.token}/>
                    :
                    <CameraPage token={this.props.route.token}/>
                }
            </View>
        )
    }
}
