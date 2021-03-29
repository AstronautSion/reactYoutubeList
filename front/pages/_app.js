import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import Reset from '../style/Reset';
import FormReset from '../style/FromReset';
import wrapper from '../store/configureStore';
import { useDispatch, useSelector } from 'react-redux';
import { loadMusicList } from '../reducers/music';
import YoutubeAPI from '../components/YoutubeAPI';
import { StBackgroundYouTube } from '../style/components/AppLayout';
import withReduxSaga  from 'next-redux-saga';

const MusicBox = ({ Component }) => {	
	
	const dispatch = useDispatch();
	const isLoggedIn = useSelector(state => state.user.isLoggedIn);
	const link = useSelector(state => state.music.nowPlayList.link);
	useEffect(() => {
		if(isLoggedIn){ 
			dispatch(loadMusicList);
		}
	},[isLoggedIn]);
	
	return(
		<>
			<Head>
				<title>MusicBox</title>
				<meta charSet="utf-8" />
				<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css" />
				<link rel="preconnect" href="https://fonts.gstatic.com" />
				<link href="https://fonts.googleapis.com/css2?family=Arvo:ital,wght@0,400;0,700;1,400;1,700&family=Noto+Sans+KR:wght@300;400;500;700&display=swap" rel="stylesheet" />
			</Head>
			<Reset />
			{isLoggedIn && 
				<StBackgroundYouTube StImg={`https://img.youtube.com/vi/${link}/hqdefault.jpg`}>
					<YoutubeAPI />
				</StBackgroundYouTube>
			}
			<FormReset />
			<Component />
		</>
	);
}

MusicBox.propTypes = {
	Component : PropTypes.elementType.isRequired,
}

export default wrapper.withRedux(withReduxSaga(MusicBox));