import React, { useState, useCallback, useRef, useEffect } from 'react';
import FocusItem from './FocusItem/FocusItem';
import WriteItem from './WriteItem/WriteItem';
import ClickItem from './ClickItem/ClickItem';
import ScenarioPlayer from './ScenarioPlayer/ScenarioPlayer';
import AudioPlayer from './AudioPlayer/AudioPlayer';
import './PageContent.css';
import StartButton from './StartButton/StartButton';
import IndicatorButton from './IndicatorButton/IndicatorButton';
import Speaker from './Speaker/Speaker';
import SubmitButton from './SubmitButton/SubmitButton';
import '../fonts/Font.css';
import titleArrow from '../assets/images/title-arrow.png';
import ReactSignatureCanvas from 'react-signature-canvas';

/*
    ReactSignatureCanvas 사용을 위해 라이브러리 설치가 필요합니다.
    설치: npm i -S react-signature-canvas
    참고: https://github.com/agilgur5/react-signature-canvas
*/

const PageContent = ({ pageData }) => {
    const page = pageData.pages[0];
    const [scenario, setScenario] = useState(page.scenarios[0]);
    const [itemVisibility, setItemVisibility] = useState(() => {
        // 초기 visibility 상태를 설정합니다.
        const initialVisibility = {};
        page.items.forEach(item => {
            initialVisibility[item.guid] = item.isVisible;
        });
        return initialVisibility;
    });

    const [isScenarioRunning, setIsScenarioRunning] = useState(false);
    const [isScenarioEnd, setIsScenarioEnd] = useState(false)
    const [isAudioPlaying, setIsAudioPlaying] = useState({});

    const startScenario = useCallback((newScenario) => {
        setScenario(newScenario);
        setIsScenarioRunning(true);
    }, []);

    const handleStartButtonClick = () => {
        startScenario(page.scenarios[0]); // 첫 번째 시나리오 시작
    };

    const handleClickItemInteraction = useCallback((scenarioGuid) => {
        const newScenario = page.scenarios.find((item) => item.guid === scenarioGuid);
        if (newScenario) {
            startScenario(newScenario);
        }
    }, [page.scenarios, startScenario]);

    const handleItemVisibilityChange = useCallback((itemGuid, isVisible) => {
        setItemVisibility(prev => ({
            ...prev,
            [itemGuid]: isVisible
        }));
    }, [page.scenarios]);

    // 시나리오가 끝났을 때 호출될 함수
    const handleScenarioEnd = useCallback(() => {
        console.log("활동 끝")
        setIsScenarioEnd(true);
    }, []);

    const handleScenarioRunning = useCallback((isRunning) => {
        setIsScenarioRunning(isRunning);
    });

    const handleAudioPlaying = useCallback((itemGuid, isPlaying) => {
        setIsAudioPlaying(prev => ({
            ...prev,
            [itemGuid]: isPlaying
        }));
    });

    // page 이미지 파일 경로 찾기
    const pageImg = pageData.resources[page.pageImg].path;
    const background = require(`../assets/images/${pageImg}`);

    
    // 오디오 파일 경로 찾기
    var audioSrc = null;

     // ReactSignatureCanvas
    const sigCanvas = useRef(null);
    const [appStyle, setAppStyle] = useState({top: 0, left: 0, width: 0, height: 0, zoom: 1});


    useEffect(() => {
        const resizeWindow = () => {
            const appElement = document.getElementById('App');
            if (appElement) {
                const zoom = window.getComputedStyle(appElement).zoom || 1;

                setAppStyle({
                    top: appElement.offsetTop,
                    left: appElement.offsetLeft,
                    width: appElement.offsetWidth,
                    height: appElement.offsetHeight,
                    zoom: parseFloat(zoom)
                });

                const canvas = sigCanvas.current.getCanvas();
                const context = canvas.getContext('2d');

                console.log(window.getComputedStyle(appElement).zoom)

                context.setTransform(1/zoom, 0, 0, 1/zoom,
                    appElement.offsetLeft*(1/zoom)-appElement.offsetLeft,
                    appElement.offsetTop*(1/zoom)-appElement.offsetTop);
            }
        };

        window.addEventListener('resize', resizeWindow);

        resizeWindow();

        // Clean up the event listener on component unmount
        return () => window.removeEventListener('resize', resizeWindow);
    }, []);

    return (
        <div className='page' style={{
          backgroundImage: `url(${background})`
        }}> 
            <ReactSignatureCanvas 
                ref={sigCanvas}
                penColor='black'
                canvasProps={{width: 1200, height: 2000, className: 'sigCanvas'}}
            />
            <div className='title'> 
                <p className='title-1'>{page.title_1}</p>
                <img className='title-arrow' src={`${titleArrow}`} />
                <p className='title-2'>{page.title_2}</p>
            </div>

            <div className='subTitle'> 
                <p className='subtitle-1'>{page.subtitle_1}</p>
                <p className='subtitle-2'>{page.subtitle_2}</p>
                <p className='subtitle-head'>{page.subtitle_head}</p>
            </div>
           
            
            {page.items.map(item => {
                
                const isVisible = itemVisibility[item.guid];
                const isPlaying = isAudioPlaying[item.guid];

                if (item.type === 'focus') {
                    return <FocusItem key={item.guid} position={item.position} isVisible={isVisible} focusIndex={item.focusIndex} />;
                } else if (item.type === 'write') {
                    return <WriteItem key={item.guid} position={item.position} enterEvent={item.enterEvent} finishEvent={item.finishEvent} onAudioPlaying={handleAudioPlaying} onScenarioPlay={handleClickItemInteraction}/>;
                } else if (item.type === 'click') {
                    return <ClickItem key={item.guid} position={item.position} isVisible={isVisible} clickEvent={item.clickEvent} onAudioPlaying={handleAudioPlaying} onScenarioStart={handleClickItemInteraction} />;
                } else if (item.type === 'sound'){
                    audioSrc = pageData.resources[item.resourceId].path;
                    return <AudioPlayer key={item.guid} item={item.guid} audioSrc={require(`../assets/audio/${audioSrc}`)} isPlaying={isPlaying} onAudioPlaying={handleAudioPlaying} />
                }
                
                return null;
            })}

            {isScenarioRunning && (
                <ScenarioPlayer
                    scenario={scenario}
                    onItemVisibilityChange={handleItemVisibilityChange}
                    onScenarioEnd={handleScenarioEnd}
                    onScenarioRunning={handleScenarioRunning}
                    onAudioPlaying={handleAudioPlaying}
                />
            )}

            <StartButton onClick={handleStartButtonClick} disabled={isScenarioRunning} />
            <IndicatorButton />
            <Speaker />

            <SubmitButton isScenarioEnd={isScenarioEnd} />


        </div>
    );
};

export default PageContent;