import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import LocaList from './Component/location';
import { RootState } from '../modules';

import RPost from './boardComponent/rPost';
import { PostType } from '../modules/posts';
import { LocationSelected } from "../modules/location";
import Weather from "./Component/weather";
import { userInfo } from "os";
import { postDummy } from '../dummyData/boardDummy';
import PostView from '../pages/postView';


function Home() {
	const dispatch = useDispatch();
  const stateLocation = useSelector((state: RootState) => state.locationReducer);
	const stateRPost = useSelector((state: RootState) => state.postsReducer.rLts);
	const stateQPost = useSelector((state: RootState) => state.postsReducer.qLts);
	const stateUserInfo = useSelector((state: RootState) => state.userInfoReducer);

  const locations = stateLocation.lLts.sort((a, b) => a.locationKr > b.locationKr ? 1 : -1);
	const recommand = stateRPost
	const question = stateQPost.slice(-5);
	
	// 지역별 초기값 설정
	const api = {
		key: 'da646735954e126fccbdcd34e0005c8c', // 비공개 키로 만들기
		base: 'https://api.openweathermap.org/data/2.5/'
	}
	const initialLocation = locations.filter(el=>String(el.id)===stateUserInfo.userInfo.location)[0]
	const [locationSelected, setLocationSelected ] = useState(initialLocation)
	const [selectedKr, setSelectedKr]= useState("서울")
	const [selectedEn, setSelectedEn]= useState("Seoul")
	const [weather, setWeather] = useState<string>('Clear');
	const [isPostClicked, setIspostClicked] = useState(false);
	const [currentPost, setCurrentPost] = useState(recommand[0]);
	

	// 오늘날짜
	const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	const days = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
	const todayDay:string = days[new Date().getDay()]
	const todayDate:number = new Date().getDate()
	const todayMonth:number = new Date().getMonth() + 1
	const todayYear:number = new Date().getFullYear()

	//날씨검색
	const search = () => {
			fetch(`${api.base}weather?q=${selectedEn}&units=metric&APPID=${api.key}`)
			.then(res => res.json())
			.then(res => {
				setWeather(res.weather[0].main);
			})
	}
	//지역선택
	const handleSelect = (e:React.ChangeEvent<HTMLSelectElement>) => {
		const target = locations.filter(el => el.id === Number(e.target.value))
		setSelectedKr(target[0].locationKr)
		setSelectedEn(target[0].locationEn)
		setWeather('Clouds')
  };
	//날씨별 RPost best5
	 function handleModalBackgroundClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (e.target === e.currentTarget) {
      setIspostClicked(false);
    }
  }
	function handleRecommandClick (el:any) {
		setCurrentPost(el)
		setIspostClicked(true)
	}
  return (
    <div className='home-container'>
			<div className='home-first-container'>
				<div className='home-weather-column'>
					<div><Weather selectLocation={selectedEn}/> </div>
					<div className='home-weather-text'>{todayYear}년 {todayMonth}월 {todayDate}일</div>
					<div className='home-weather-text'>{todayDay}</div>
					<div className='home-weather-text'>{selectedKr}</div>

					<select onChange={e=>handleSelect(e)} className='home-weather-location'>
						<option>{selectedKr}</option>
						{locations.map(loca => <LocaList key={loca.id} location={loca}/>)}
					</select>
				</div>
				<div className='home-best-column'>
					<ul className='home-ul'>
						{recommand.filter(post=>post.weather === weather).map(el =>
						<li key={el.id} onClick={()=>handleRecommandClick(el)}><img className='home-recommand-images'  src={el.img.length !== 0 ? el.img[0].url : ''} alt='ddd'/>
						</li>
						)}
					</ul>
				</div>
			</div>
			<div className='home-second-container'>
				<div className='home-board-column'>
					<div>인기게시글</div>
					<ul>
						{recommand/*.filter(post => post.weather === weather)*/.map(post => (
						<div key={post.id}>
							<li className='recommand-board'>
								<div>{post.title}</div>
								<div>{post.writer}</div>
							</li>			
						</div>
						))}
					</ul>
				</div>
				<div className='home-board-column'>
				<div>질문게시글</div>
					<ul>
						{question/*.filter(post => post.weather === weather)*/.map(post => <div key={post.id}>
							<li className='recommand-board'>
								<div>{post.title}</div>
								<div>{post.writer}</div>
							</li>		
						</div>)}
					</ul>
				</div>
			</div>
			{
				isPostClicked &&
				<div onClick={(e)=>{handleModalBackgroundClick(e)}} className='rboard-postview-modal-background'>
					<div className='rboard-postview-modal'>
						<PostView post={currentPost} />
					</div>
				</div>
			}
    </div>
		
  );
}

export default Home