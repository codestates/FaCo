import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { WiDaySunny, WiDayCloudy, WiRain, WiSnow } from "react-icons/wi";

import { RootState } from '../../modules';

type weatherListType ={
	[key:string]: string[];
}
type SelectType ={
	selectLocation: string
}

function Weather({selectLocation}:SelectType){
	const userInfo = useSelector((state: RootState) => state.userInfoReducer.userInfo);

	const api = {
		key: 'da646735954e126fccbdcd34e0005c8c', // 비공개 키로 만들기
		base: 'https://api.openweathermap.org/data/2.5/'
	}
	const userLocation = userInfo.location
	
	const [weather, setWeather] = useState<any>('');

	const weatherList:weatherListType = {
		Clear: ['Clear'],
		Clouds: ['Clouds','Smoke','Haze','Dust','Fog','Sand','Dust','Ash','Squall','Tornado'],
		Rain: ['Rain', 'Thunderstorm', 'drizzle'],
		Snow: ['Snow']
	}

	 const search = () => {
		fetch(`${api.base}weather?q=${selectLocation}&units=metric&APPID=${api.key}`)
		.then(res => res.json())
		.then(res => {
			const weatherSelected = res.weather[0].main
			function weatherChange(res:any) {
				for(let i = 0; i < Object.keys(weatherList).length; i++){
					if(weatherList[Object.keys(weatherList)[i]].includes(weatherSelected)){
						return Object.keys(weatherList)[i]
					}
				}
			}
			setWeather(weatherChange(res));
		})
}
	useEffect(() : void => {
		search()
	})


	return (
		<div className='weather-container'>
			<div className='weather-icon'>
			{weather==='Clear'?<WiDaySunny className='sunny'/>:''}
			{weather==='Clouds'?<WiDayCloudy className='cloud'/>:''}
			{weather==='Rain'?<WiRain className='rain'/>:''}
			{weather==='Snow'?<WiSnow className='snow'/>:''}
			{/* css적용시 사용
			 <WiDaySunny className='sunny'/>
			<WiDayCloudy className='cloud'/>
			<WiRain className='rain'/>
			<WiSnow className='snow'/> */}
			</div>
			<div className='weather-text'>
			{weather}
			</div>
		</div>
	);
}

export default Weather
