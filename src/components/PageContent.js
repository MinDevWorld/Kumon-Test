import React, { useState, useCallback } from 'react';
import FocusItem from './FocusItem/FocusItem';
import WriteItem from './WriteItem/WriteItem';
import ClickItem from './ClickItem/ClickItem';
import ScenarioPlayer from './ScenarioPlayer/ScenarioPlayer';
import AudioPlayer from './AudioPlayer/AudioPlayer';
import './PageContent.css';
import StartButton from './StartButton/StartButton';

const PageContent = ({ pageData }) => {
    const page = pageData.pages[0];
    const startScenario = page.scenarios.find(s => s.id === 'Scenario_Start');
    const [itemVisibility, setItemVisibility] = useState({});
    const [isScenarioRunning, setIsScenarioRunning] = useState(false);
    const [isAudioPlaying, setIsAudioPlaying] = useState(false);

    const handleItemVisibilityChange = useCallback((itemGuid, isVisible) => {
        setItemVisibility(prev => ({
            ...prev,
            [itemGuid]: isVisible
        }));
    }, []);

    const handleStartScenario = () => {
        setIsScenarioRunning(true);
        setIsAudioPlaying(true);
    };

    // 시나리오가 끝났을 때 호출될 함수
    const handleScenarioEnd = useCallback(() => {
        setIsScenarioRunning(false);
        setIsAudioPlaying(false);
    }, []);

    // page 이미지 파일 경로 찾기
    const pageImg = pageData.resources[page.pageImg].path;
    const background = require(`../assets/images/${pageImg}`);

    // 오디오 파일 경로 찾기
    const audioSrc = pageData.resources[page.items.find(item => item.type === 'sound').resourceId]?.path;

    return (
        <div className='page' style={{
          backgroundImage: `url(${background})`
        }}>
            {page.items.map(item => {
                const isVisible = itemVisibility[item.guid];
                if (item.type === 'focus') {
                    return <FocusItem key={item.guid} position={item.position} isVisible={isVisible} focusIndex={item.focusIndex} />;
                } else if (item.type === 'write') {
                    return <WriteItem key={item.guid} item={item.position} />;
                } else if (item.type === 'click') {
                    return <ClickItem key={item.guid} item={item.position} />;
                }

                return null;
            })}
            {isScenarioRunning && (
                <ScenarioPlayer
                    scenario={startScenario}
                    onItemVisibilityChange={handleItemVisibilityChange}
                    onScenarioEnd={handleScenarioEnd}
                />
            )}
            <AudioPlayer audioSrc={require(`../assets/audio/${audioSrc}`)} isPlaying={isAudioPlaying} />
            {/* <button 
                style={{
                    position: 'absolute',
                    top: '10px',
                    width: '260px',
                    height: '60px',
                    fontSize: '46px'
                }}
                onClick={handleStartScenario}
                disabled={isScenarioRunning}
            >
                
            </button> */}

            <StartButton onClick={handleStartScenario} disabled={isScenarioRunning} />
        </div>
    );
};

export default PageContent;