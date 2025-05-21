// 페이지 헤더 컴포넌트의 data-title과 data-image 속성을 처리하는 스크립트
document.addEventListener('includesLoaded', function() {
    console.log('페이지 헤더 초기화 시작...');
    
    // 페이지 헤더 컴포넌트 찾기
    const pageHeaderElements = document.querySelectorAll('[data-include*="page-header.html"]');
    
    if (pageHeaderElements.length === 0) {
        console.log('페이지 헤더 컴포넌트를 찾을 수 없습니다.');
        return;
    }
    
    // 페이지 유형별 이미지 매핑
    const defaultImages = {
        '음성 인식 기술': 'voice-recognition.jpeg',
        '음성 합성 기술': 'audiobook.jpeg',
        '실시간 번역': 'voice-translation-header.jpg',
        '실시간 통역 기술': 'voice-recognition-tech1.jpg',
        '영상 생성 기술': 'page-header-bg2.jpeg',
        '자동 요약 기술': 'page-header-bg3.jpeg',
        'default': 'page-header-bg1.jpg'  // 기본 이미지
    };
    
    // 페이지 유형별 설명 텍스트 매핑
    const descriptions = {
        '음성 인식 기술': '최첨단 AI 기술로 모든 언어와 상황에서 정확한 음성-텍스트 변환을<br>제공하는 PadiemAI의 혁신적인 음성 인식 솔루션',
        '음성 합성 기술': '자연스럽고 감정이 담긴 고품질 음성 생성 기술로<br>텍스트를 생생한 사람의 목소리로 변환하는 PadiemAI의 음성 합성 솔루션',
        '실시간 번역': '다국어 환경에서 언어 장벽 없는 원활한 커뮤니케이션을 위한<br>Padiem AI의 혁신적인 실시간 번역 솔루션',
        '실시간 통역 기술': '전 세계 어디서나 언어의 장벽 없이 자유로운 소통을 가능하게 하는<br>PadiemAI의 실시간 통역 서비스',
        '영상 생성 기술': '텍스트, 이미지, 영상을 활용한 혁신적인 AI 영상 제작 기술로<br>고품질 비디오 콘텐츠를 손쉽게 생성하는 PadiemAI의 영상 생성 솔루션',
        '자동 요약 기술': '방대한 정보를 핵심만 추출하여 정보 처리 효율성을 극대화하는<br>PadiemAI의 고급 자연어 처리 기반 자동 요약 솔루션',
        'default': 'PadiemAI의 최첨단 인공지능 기술로<br>더 나은 미래를 창조합니다'
    };
    
    // 각 페이지 헤더 컴포넌트 처리
    pageHeaderElements.forEach(function(headerContainer) {
        const titleValue = headerContainer.getAttribute('data-title');
        let imageValue = headerContainer.getAttribute('data-image');
        let descValue = headerContainer.getAttribute('data-description');
        
        console.log(`페이지 헤더 속성: data-title="${titleValue}", data-image="${imageValue}"`);
        
        // 제목 요소 찾기 및 설정
        const titleElement = headerContainer.querySelector('h1[data-title]');
        if (titleElement && titleValue) {
            console.log(`페이지 제목을 "${titleValue}"로 설정합니다.`);
            titleElement.textContent = titleValue;
            
            // 제목 기반으로 기본 이미지 결정 (이미지가 없을 경우)
            if (!imageValue && defaultImages[titleValue]) {
                imageValue = defaultImages[titleValue];
                console.log(`제목 "${titleValue}"에 기반하여 기본 이미지 "${imageValue}"를 사용합니다.`);
            }
            
            // 설명 텍스트 찾기 및 설정
            const descElement = headerContainer.querySelector('p[data-description]');
            if (descElement) {
                if (!descValue && descriptions[titleValue]) {
                    descValue = descriptions[titleValue];
                    console.log(`제목 "${titleValue}"에 기반하여 설명 텍스트를 설정합니다.`);
                } else if (!descValue) {
                    descValue = descriptions['default'];
                }
                
                descElement.innerHTML = descValue;
            }
        } else {
            console.warn('페이지 제목 요소 또는 data-title 속성을 찾을 수 없습니다.');
        }
        
        // 이미지가 지정되지 않은 경우 기본 이미지 사용
        if (!imageValue) {
            imageValue = defaultImages.default;
            console.log(`기본 이미지 "${imageValue}"를 사용합니다.`);
        }
        
        // 배경 이미지 설정
        const headerSection = headerContainer.querySelector('.service-header');
        if (headerSection) {
            console.log(`배경 이미지를 "${imageValue}"로 설정합니다.`);
            const currentStyle = headerSection.getAttribute('style');
            
            // URL 부분만 수정하고 높이 설정 유지
            let newStyle = currentStyle.replace(
                /url\(['"](.*?)['"]\)/,
                `url('/images/${imageValue}')`
            );
            
            // 이미지 스타일 향상
            if (!newStyle.includes('background-position')) {
                newStyle += ' background-position: center center;';
            }
            
            if (!newStyle.includes('background-size')) {
                newStyle += ' background-size: cover;';
            }
            
            // 이미지 로드 전에 최소 높이 보장
            headerSection.setAttribute('style', newStyle);
            
            // 이미지가 로드되면 실행할 함수
            const img = new Image();
            img.onload = function() {
                console.log(`이미지 ${imageValue} 로드 완료`);
            };
            
            img.onerror = function() {
                console.warn(`이미지 ${imageValue} 로드 실패, 기본 이미지로 대체합니다.`);
                // 이미지 로드 실패 시 기본 이미지로 교체
                newStyle = currentStyle.replace(
                    /url\(['"](.*?)['"]\)/,
                    `url('/images/${defaultImages.default}')`
                );
                headerSection.setAttribute('style', newStyle);
            };
            
            img.src = `/images/${imageValue}`;
        } else {
            console.warn('헤더 섹션 요소를 찾을 수 없습니다.');
        }
    });
    
    console.log('페이지 헤더 초기화 완료.');
}); 