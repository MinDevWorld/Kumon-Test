import './App.css';
import { parseJsonData } from './utils/jsonParser';
import PageContent from './components/PageContent';
// import pageDataRaw from './data/2A_21a.json';
import pageDataRaw from './data/B_1a.json';
import React, { useState, useEffect } from 'react';

// import axios from 'axios';

// getResizeEventListener 함수 정의
export const getResizeEventListener = (standardWidth, standardHeight) => {
  return () => {
    const root = document.querySelector("#root");
    const app = document.querySelector("#App");

    if (!app) return;

    // 원하는 해상도로 width, height 고정
    app.style.width = `${standardWidth}px`;
    app.style.height = `${standardHeight}px`;

    let width = root.clientWidth;
    let height = width * (standardHeight / standardWidth);
    
    // style.zoom을 이용하여, 화면을 크기를 조정
    app.style.zoom = height / standardHeight;

    // app.style.transform = `scale(${height / standardHeight})`;
    // app.style.transformOrigin = '50 50'; // Scale from the top-left corner

    if (height > root.clientHeight) {
      height = root.clientHeight;
      width = height * (standardWidth / standardHeight);
      
      // style.zoom을 이용하여, 화면을 크기를 조정
      app.style.zoom = width / standardWidth;
      // app.style.transform = `scale(${width / standardWidth})`;
    }
  };
};

function App() {

  const [pageData, setPageData] = useState(null);

  useEffect(() => {
    // 실제 환경에서는 API 호출 등을 통해 데이터를 가져올 수 있습니다.
    // 여기서는 예시로 JSON 데이터를 직접 사용합니다.
    const jsonData = parseJsonData(pageDataRaw);
    setPageData(jsonData);
  }, []);


  useEffect(() => {
    const resizeListener = getResizeEventListener(1200, 2000);

    if (pageData) {
      window.addEventListener('resize', resizeListener);
      resizeListener();
    }

    return () => {
      window.removeEventListener('resize', resizeListener);
    };
  }, [pageData]);

  if (!pageData) return <div>Loading...</div>;

  return (
    <div id="App" className='app-container'>
      <PageContent pageData={pageData} />
    </div>
  );
}

export default App;
