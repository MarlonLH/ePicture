import React from 'react';
import { StyleSheet, View, ImageBackground, Image } from 'react-native';

import NavigationBar from '../Utils/NavigationBar/NavigationBar';
import MostViral from '../MostViral/MostViral'
import Feed from '../Feed/Feed'

export default class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            index: 0,
            token: this.props.route.token
        }
        this.pages = [
            { key: 'logmostviral', index: 0, label: 'Most Viral', color: '#ffffff', fontSize: 18, bgColor: '#93d820' },
            { key: 'feed', index: 1, label: 'Feed', color: '#ffffff', fontSize: 18, bgColor: '#93d820' }
        ]
        this._changeIndexHandler = this._changeIndexHandler.bind(this)
    }

    _changeIndexHandler( index ) {
        this.setState({ index: index })
    }

    render() {
        return(
            <View style={{ flex: 1 }}>
                <NavigationBar
                    style={{ height: 50, backgroundColor: '#89C623' }}
                    pages={this.pages}
                    changeIndex={this._changeIndexHandler}
                    index={0}
                />
                { this.state.index === 0 ?
                    <MostViral token={this.state.token}/>
                    :
                    <Feed token={this.props.route.token}/>
                }
            </View>
        )
    }
}