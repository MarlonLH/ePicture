import React from 'react';
import { View, Text, StyleSheet, Button, TouchableHighlight } from 'react-native';

export default class NavigationBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            index: this.props.index,
        }
    }

    _changeIndexHandler( index ) {
        if (this.state.index === index)
            return;
        this.props.changeIndex(index)
        this.setState({ index: index })
    }

    render() {
        let buttons = (
            <View style={styles.ButtonStock}>
                {this.props.pages.map(( page, index ) => {
                    let bgColor = this.props.style.backgroundColor
                    if (page.index === this.state.index)
                        bgColor = page.bgColor;
                    return (
                        <TouchableHighlight
                            onPress={() => this._changeIndexHandler(page.index)}
                            underlayColor={bgColor}
                            style={{ flex: 1, flexDirection: 'row', height: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: bgColor }}
                            key={page.key}>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: bgColor, height: 50 }}>
                                <Text style={{ color: page.color, fontSize: page.fontSize}}>{page.label}</Text>
                            </View>
                        </TouchableHighlight>
                    )
                })
                }
            </View>
        )

        return(
            <View style={this.props.style}>
                {buttons}
            </View>
        )
    }
}

const styles = StyleSheet.create({
  ButtonStock: {
    height: 50,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }
});