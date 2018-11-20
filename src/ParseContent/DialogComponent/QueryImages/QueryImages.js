import React, { Component } from 'react'
import { Dimensions, View, Image } from 'react-native';
import Video from 'react-native-video';

export default class QueryImages extends Component {
	constructor (props) {
		super(props);
		this.state = {
			visible: false
		}
		this.windowSize = Dimensions.get('window');
		this.widthMax = this.windowSize.width - 40;
	}

	_displayContent = () => {
		this.images = []
		for (i = 0; this.props.images[i]; i++) {
			this.image = this.props.images[i];
			this.imageWidth = this.image.width;
			this.imageHeight = this.image.height;
			this.newWidth = this.widthMax;
			if (this.imageHeight === undefined || this.imageWidth === undefined)
				this.newHeight = this.newWidth;
			else {
				this.coef = this.imageHeight / this.imageWidth
				this.newHeight = this.widthMax * this.coef
			}
			if (this.image.link.match(/\.(jpg|png|gif)/g)) {
				this.images.push(
					<View style={{ width: this.newWidth, height: this.newHeight }} key={'QueryImg' + i}>
						<Image
							source={{ uri: this.image.link }}
							style={{ width: this.newWidth, height: this.newHeight }}
						/>
					</View>
				)
			} else {
				this.images.push(
					<View style={{ width: this.newWidth, height: this.newHeight }} key={'QueryVid' + i}>
						<Video
							ref={(ref) => {
								this.player = ref
							}}
							style={{ width: this.newWidth, height: this.newHeight }}
							source={{uri: this.image.link}}
							onBuffer={this.onBuffer}
							onEnd={this.onEnd}
							onError={this.onError}
							repeat={true}
						/>
					</View>
				)
			}
		}
		return this.images;
	}

	render() {
		return (
			<View style={{ flex: 0, marginTop: 10 }}>
				{
					this._displayContent()
				}
			</View>
		)
	}
}
