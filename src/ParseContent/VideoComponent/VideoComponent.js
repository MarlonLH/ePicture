import React from 'react';
import { Dimensions, View, TouchableHighlight } from 'react-native';
import { Text } from 'react-native-paper';
import { Icon } from 'react-native-elements';
import Video from 'react-native-video';
import Dialog, { DialogContent } from 'react-native-popup-dialog';

import DialogComponent from '../DialogComponent/DialogComponent';

export default class VideoComponent extends React.Component {
	constructor( props ) {
		super(props);
		this.state = {
			visible: false
		}
		this.windowSize = Dimensions.get('window');
		this.widthMax = this.windowSize.width - 40;
		this.imageWidth = this.props.data.cover_width;
		this.imageHeight = this.props.data.cover_height;
		this.newWidth = this.widthMax;
		if (this.imageHeight === undefined || this.imageWidth === undefined)
			this.newHeight = this.newWidth;
		else {
			this.coef = this.imageHeight / this.imageWidth
			this.newHeight = this.widthMax * this.coef
		}
	}

	_zoomClickHandler = () => {
		if (this.props.token === undefined)
			return
		this.setState({ visible: true })
	}

	render () {
		return (
			<View style={{ flex: 1, backgroundColor: '#4b4b4b', borderRadius: 10, marginBottom: 20 }}>
				<View style={{ flex: 1, flexDirection: 'row', paddingTop: 7, paddingLeft: 10 }}>
					<Text style={{ color: 'white', fontSize: 18 }}>{this.props.data.title}</Text>
				</View>
				<View style={{ flex: 1, flexDirection: 'row', paddingLeft: 7, paddingBottom: 7 }}>
					<Icon
						name='arrow-upward'
						color='grey'
					/>
					<Text style={{ color: 'grey', paddingTop: 3, paddingLeft: 3 }}>{this.props.data.points} Points</Text>
				</View>
				<View style={{ flex: 1, flexDirection: 'row' }}>
					<TouchableHighlight onPress={() => {
						this.setState({ visible: true })
					}}>
						<Video
							ref={(ref) => {
								this.player = ref
							}}
							style={{ width: this.newWidth, height: this.newHeight }}
							source={{uri: this.props.video.link}}
							onBuffer={this.onBuffer}
							onEnd={this.onEnd}
							onError={this.onError}
							repeat={true}
						/>
					</TouchableHighlight>
					<Dialog
						visible={this.state.visible}
						onTouchOutside={() => {
							this.setState({ visible: false });
						}}
						width={this.widthMax}
						height={this.windowSize.height - 40}
						containerStyle={{ padding: 0 }}>
						<DialogContent style={{ flex: 1, backgroundColor: '#4b4b4b', paddingLeft: 0, paddingRight: 0, paddingBottom: 0 }}>
							<DialogComponent data={this.props.data} token={this.props.token} />
						</DialogContent>
					</Dialog>
				</View>
			</View>
		)
	}
}