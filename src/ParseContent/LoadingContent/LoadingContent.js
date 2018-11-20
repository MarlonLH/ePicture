import React from 'react';
import { StyleSheet, Text} from 'react-native';


export default class LoadingContent extends React.Component {

    render () {
        return(
            <Text style={styles.text}>Loading...</Text>
        )
    }
}

const styles = StyleSheet.create({
    text: {
        textAlign: 'center',
		color: 'white',
	},
})