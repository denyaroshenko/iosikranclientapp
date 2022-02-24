import React, { useState } from 'react';
import {
	StyleSheet,
	StatusBar,
	Dimensions,
	View,
	Text,
	Button,
	TouchableOpacity
} from 'react-native';

import { VLCPlayer } from 'react-native-vlc-media-player'
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';
import Spinner from 'react-native-loading-spinner-overlay'

import * as RootNavigation from '../helpers/RootNavigation'

import VideoZoomPlusIcon from '../assets/Icons/VideoZoomPlusIcon';
import VideoZoomMinusIcon from '../assets/Icons/VideoZoomMinusIcon';
import VideoZoomResetIcon from '../assets/Icons/VideoZoomResetIcon';
import VideoDefaultscreenIcon from '../assets/Icons/VideoDefaultscreenIcon'

const VideoStreamFullScreen = ({ navigation, route }) => {

	React.useLayoutEffect(() => {
		navigation.setOptions({
			'title': null,
			headerStyle: {
				backgroundColor: 'green',
				height: 0,
				elevation: 0,
				shadowOpacity: 0,
				borderBottomWidth: 0,
			},
		});
	}, [navigation, '']);

	const [loading, setLoading] = useState(true)
	const zoomableViewRef = React.createRef();

	let url

	if (route.params && route.params.videos.length) {
		url = route.params.videos[0].url
	} else {
		url = null
	}

	const isStatusBarHidden = (route) => {
		return route.name === 'VideoStreamFullScreen'
	}

	const logOutZoomState = (event, gestureState, zoomableViewEventObject) => {
		console.log('');
		console.log('');
		console.log('-------------');
		console.log('Event: ', event);
		console.log('GestureState: ', gestureState);
		console.log('ZoomableEventObject: ', zoomableViewEventObject);
		console.log('');
		console.log(`Zoomed from ${zoomableViewEventObject.lastZoomLevel} to  ${zoomableViewEventObject.zoomLevel}`);
	}

	return (
		<View style={styles.container}>
			{/* Прячем статус-бар */}
			<StatusBar hidden={isStatusBarHidden(route)} />

			{/* <Spinner visible={loading} /> */}

			<ReactNativeZoomableView
				ref={zoomableViewRef}
				bindToBorders={true}
				maxZoom={3}
				minZoom={0.5}
				zoomStep={0.5}
				initialZoom={1}
				bindToBorders={true}
				onZoomAfter={logOutZoomState}
				style={styles.videoWrapper}
			>
				<VLCPlayer
					source={{
						initType: 2,
						hwDecoderEnabled: 1,
						hwDecoderForced: 1,
						uri: url,
						initOptions: [
							'--codec=avcodec',
							'--no-audio',
							'--rtsp-tcp',
							'--network-caching=150',
							'--rtsp-caching=150',
							'--no-stats',
							'--tcp-caching=150',
							'--realrtsp-caching=150',
						],
					}}
					// autoplay={true}
					// autoAspectRatio={true}
					resizeMode="cover"
					// videoAspectRatio="16:9"
					isLive={true}
					autoReloadLive={true}
					style={styles.video}
					// onBuffering={() => { console.log('Буферизация видео-потока'); }}
					// onProgress={() => setLoading(true)}
					onPlaying={() => {
						setLoading(false)
					}}
					onError={() => { }} // Показываем ошибку
					fullscreen={true}
					// Orientation={'LANDSCAPE'}
					onStartFullScreen={true}
				// startFullScreen={true}
				// onVLCProgress={() => setLoading(true)}
				/>
			</ReactNativeZoomableView>

			<View style={styles.controlWrapper}>
				{/* <TouchableOpacity style={styles.button} onPress={() => zoomableViewRef.current.zoomTo(1)}>
					<VideoZoomResetIcon color='#fff' opacity={1} />
				</TouchableOpacity> */}

				<TouchableOpacity style={styles.button} onPress={() => zoomableViewRef.current.zoomBy(0.1)}>
					<VideoZoomPlusIcon color='#fff' opacity={1} />
				</TouchableOpacity>

				<TouchableOpacity style={styles.button} onPress={() => zoomableViewRef.current.zoomBy(-0.1)}>
					<VideoZoomMinusIcon color='#fff' opacity={1} />
				</TouchableOpacity>

				<TouchableOpacity style={[{ padding: 3 }, styles.button]} onPress={() => navigation.goBack(null)}>
					<VideoDefaultscreenIcon color='#fff' opacity={1} />
				</TouchableOpacity>

			</View>

		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'center',
		backgroundColor: '#000',
	},

	video: {
		width: Dimensions.get('window').height,
		height: Dimensions.get('window').width,

		// borderColor: 'green',
		// borderWidth: 2,

		transform: [{ rotate: '90deg' }],
	},

	videoWrapper: {
		backgroundColor: '#000',

		// borderColor: 'green',
		// borderWidth: 2,
	},

	controlWrapper: {
		display: 'flex',
		flexDirection: 'row',
		marginBottom: 50,
		position: 'absolute',
		bottom: 0,
	},

	button: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		width: 35,
		height: 35,
		margin: 5,

		// borderColor: 'red',
		// borderWidth: 1,
	}
});

export default VideoStreamFullScreen;
