import React, { useEffect, useState } from 'react';
import {
	StyleSheet,
	Dimensions,
	View,
	Text,
	Button,
	Image,
	TouchableOpacity
} from 'react-native';

import VideoZoomPlusIcon from '../assets/Icons/VideoZoomPlusIcon';
import VideoZoomMinusIcon from '../assets/Icons/VideoZoomMinusIcon';
import VideoZoomResetIcon from '../assets/Icons/VideoZoomResetIcon';
import VideoFullscreenIcon from '../assets/Icons/VideoFullscreenIcon'

import * as RootNavigation from '../helpers/RootNavigation'

import { VLCPlayer } from 'react-native-vlc-media-player'
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';
import Spinner from 'react-native-loading-spinner-overlay'
import ProgressCircle from 'react-native-progress-circle'
import ErrorIcon from '../assets/Icons/ErrorIcon';

const VideoStreamScreen = ({ navigation, route }) => {

	React.useLayoutEffect(() => {
		navigation.setOptions({
			'title': 'Видео',
		});
	}, [navigation, 'Видео']);

	const { videos } = route.params

	let url

	if (videos.length) {
		url = videos[0].url
	} else {
		url = null
	}


	const [wait, setWait] = useState(false)
	const [isLoading, setLoading] = useState(false)
	const [progress, setProgress] = useState(0)
	const [progressVisible, setProgressVisible] = useState(true)
	const [timePassed, setTimePassed] = useState(false)
	const [videoLoaded, setVideoLoaded] = useState(false)
	const [showPlayer, setShowPlayer] = useState(false)
	const [error, setError] = useState(false)
	const [errorMessage, setErrorMessage] = useState(null)
	const [totalDuration, setTotalDuration] = useState(10);

	const win = Dimensions.get('window');
	const ratio = win.width / 541; // 541 is actual image width

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

	const zoomableViewRef = React.createRef();

	useEffect(() => {
		// setTimeout(() => {
		// 	setTimePassed(true)
		// 	setLoading(false)
		// }, 10000)
	}, [])

	return (
		<View style={styles.container}>

			{/* <Spinner visible={isLoading} /> */}

			{/* DEBUG */}
			{/* <Text>isLoading: {isLoading.toString()}</Text>
			<Text>ВРЕМЯ ПРОШЛО: {timePassed.toString()}</Text>
			<Text>ВИДЕО ЗАГРУЖЕНО: {videoLoaded.toString()}</Text>
			<Text>ОТОБРАЖЕНИЕ ПЛЕЕРА: {showPlayer.toString()}</Text> */}

			<View style={styles.loadingMessage}>
				<Text>Видео загружается...</Text>
			</View>

			{/* {!timePassed && (progress < 100) ? <View style={styles.progress}>
				<ProgressCircle
					percent={progress}
					radius={50}
					borderWidth={4}
					color="#FED400"
					shadowColor="#999"
					bgColor="#f5f5f5"
				>
					<Text style={{ fontSize: 18 }}>{progress + '%'}</Text>
				</ProgressCircle>
			</View> : null} */}

			{error ?
				<View style={styles.errorItem}>
					<ErrorIcon />
					<Text style={styles.errorText}>Видео недоступно.{"\n"}Попробуйте повторить позже.</Text>
				</View>
				:
				<View style={styles.player}>
					<View style={{ flex: 1 }}>
						<ReactNativeZoomableView
							ref={zoomableViewRef}
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
									uri:
										// 'rtsp://wowzaec2demo.streamlock.net/vod/mp4:BigBuckBunny_115k.mov',
										// 'rtsp://admin:1rk.xjnrhfyf!@178.176.104.251/ISAPI/Streaming/Channels/101',
										url,
									initOptions: [
										// '--codec=avcodec',
										// '--no-audio',
										// '--rtsp-tcp',
										// '--network-caching=150',
										// '--rtsp-caching=150',
										// '--no-stats',
										// '--tcp-caching=150',
										// '--realrtsp-caching=150',
									],
								}}
								autoplay={true}
								autoAspectRatio={true}
								resizeMode="cover"
								videoAspectRatio="16:9"
								isLive={true}
								autoReloadLive={true}
								style={styles.video}
								onBuffering={(buffer) => {
									console.log(buffer);
									setLoading(false)
									// console.log('Буферизация видео-потока',
									// setProgress(Math.round(buffer.bufferRate)))
								}}
								onPlaying={() => {
									setVideoLoaded(true)
									// setLoading(false)
									// setShowPlayer(true)
								}}
								onVLCProgress={(progress) => {
									console.log('progress', progress)
								}}
								onError={() => { setError(true) }} // Показываем ошибку
								fullscreen={true}
								Orientation={'PORTRAIT'}
								startFullScreen={true}
							/>
						</ReactNativeZoomableView>
					</View>

					{!isLoading ?
						<View style={styles.controlWrapper}>
							{/* <TouchableOpacity style={styles.button} onPress={() => zoomableViewRef.current.zoomTo(1)}>
							<VideoZoomResetIcon />
						</TouchableOpacity> */}

							<TouchableOpacity style={styles.button} onPress={() => zoomableViewRef.current.zoomBy(0.1)}>
								<VideoZoomPlusIcon />
							</TouchableOpacity>

							<TouchableOpacity style={styles.button} onPress={() => zoomableViewRef.current.zoomBy(-0.1)}>
								<VideoZoomMinusIcon />
							</TouchableOpacity>

							<TouchableOpacity style={[{ padding: 3 }, styles.button]} onPress={() => RootNavigation.navigate('VideoStreamFullScreen', { videos: videos })}>
								<VideoFullscreenIcon />
							</TouchableOpacity>

						</View>
						: <></>
					}

				</View>
			}

		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'center',
	},

	progress: {
		display: 'flex',
		width: '100%',
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute',
		zIndex: 999,

		// borderColor: 'red',
		// borderWidth: 2,
	},

	player: {
		display: 'flex',
		alignItems: 'center',
	},

	video: {
		alignSelf: 'center',
		width: '100%',
		height: 200,
	},

	videoWrapper: {
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height,

		// borderColor: 'green',
		// backgroundColor: 'red',
		// borderWidth: 2,
	},

	controlWrapper: {
		display: 'flex',
		flexDirection: 'row',
		position: 'absolute',
		bottom: 40,

		// borderColor: 'red',
		// borderWidth: 1,
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
	},

	errorItem: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		height: '100%',

		// borderWidth: 1,
		// borderColor: 'red',
	},

	errorText: {
		marginTop: 10,
		fontWeight: '400',
		fontSize: 18,
		lineHeight: 26,
		color: '#000',
		opacity: 0.8,
		textAlign: 'center',
	},

	loadingMessage: {
		position: 'absolute',
		top: '48%',
		marginTop: 10,
		fontWeight: '400',
		fontSize: 18,
		lineHeight: 26,
		color: '#000',
		opacity: 0.8,
		textAlign: 'center',
	}
});

export default VideoStreamScreen;
