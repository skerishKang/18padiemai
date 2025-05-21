/**
 * 디버깅 도구 - include.js와 mobile-menu.js 문제 해결용
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('[debug.js] 디버깅 시작 - DOMContentLoaded 발생');
    
    // 1. DOM에 삽입된 header 확인
    setTimeout(function() {
        console.log('[debug.js] 헤더 요소 확인 (지연 체크)');
        const headerElement = document.querySelector('header');
        console.log('[debug.js] header 요소 존재 여부:', !!headerElement);
        
        if (headerElement) {
            console.log('[debug.js] header 내부 HTML:', headerElement.innerHTML.substring(0, 200) + '...');
            
            // 2. mobile-menu-btn 확인
            const mobileMenuBtn = headerElement.querySelector('.mobile-menu-btn');
            console.log('[debug.js] .mobile-menu-btn 요소 존재 여부:', !!mobileMenuBtn);
            
            if (mobileMenuBtn) {
                const style = window.getComputedStyle(mobileMenuBtn);
                console.log('[debug.js] .mobile-menu-btn 계산된 스타일:', {
                    display: style.display,
                    position: style.position,
                    visibility: style.visibility,
                    width: style.width,
                    height: style.height,
                    zIndex: style.zIndex
                });
            }
        }
        
        // 3. data-include 속성을 가진 요소 확인
        const includeElements = document.querySelectorAll('[data-include]');
        console.log('[debug.js] data-include 속성 요소 수:', includeElements.length);
        
        includeElements.forEach((el, index) => {
            const path = el.getAttribute('data-include');
            console.log(`[debug.js] data-include[${index}] 경로:`, path);
            console.log(`[debug.js] data-include[${index}] innerHTML 길이:`, el.innerHTML.length);
            console.log(`[debug.js] data-include[${index}] 첫 100자:`, el.innerHTML.substring(0, 100) + '...');
        });
    }, 2000); // 2초 지연으로 include.js가 실행될 시간을 줌
    
    // 4. includesLoaded 이벤트 리스너
    document.addEventListener('includesLoaded', function() {
        console.log('[debug.js] includesLoaded 이벤트 발생 감지!');
        
        // 이벤트 발생 후 다시 DOM 확인
        setTimeout(function() {
            console.log('[debug.js] includesLoaded 이벤트 후 DOM 재확인');
            
            const headerAfterLoad = document.querySelector('header');
            console.log('[debug.js] header 요소 존재 여부 (이벤트 후):', !!headerAfterLoad);
            
            if (headerAfterLoad) {
                const mobileMenuBtnAfter = headerAfterLoad.querySelector('.mobile-menu-btn');
                console.log('[debug.js] .mobile-menu-btn 요소 존재 여부 (이벤트 후):', !!mobileMenuBtnAfter);
                
                if (mobileMenuBtnAfter) {
                    const styleAfter = window.getComputedStyle(mobileMenuBtnAfter);
                    console.log('[debug.js] .mobile-menu-btn 계산된 스타일 (이벤트 후):', {
                        display: styleAfter.display,
                        position: styleAfter.position,
                        visibility: styleAfter.visibility
                    });
                }
            }
        }, 500);
    });
    
    // 5. 윈도우 로드 이벤트
    window.addEventListener('load', function() {
        console.log('[debug.js] window.load 이벤트 발생');
        
        // 모든 것이 로드된 후 마지막 확인
        setTimeout(function() {
            console.log('[debug.js] window.load 이벤트 후 최종 확인');
            
            const finalHeader = document.querySelector('header');
            if (finalHeader) {
                const finalMobileMenuBtn = finalHeader.querySelector('.mobile-menu-btn');
                console.log('[debug.js] 최종 .mobile-menu-btn 존재 여부:', !!finalMobileMenuBtn);
                
                // viewport 너비 확인
                console.log('[debug.js] 현재 viewport 너비:', window.innerWidth + 'px');
                console.log('[debug.js] @media (max-width: 991px) 조건 충족 여부:', window.innerWidth <= 991);
                
                // CSS 파일 로드 확인
                const allStyles = document.styleSheets;
                console.log('[debug.js] 로드된 스타일시트 수:', allStyles.length);
                
                // responsive.css와 header.css가 로드되었는지 확인
                let foundResponsiveCSS = false;
                let foundHeaderCSS = false;
                
                for (let i = 0; i < allStyles.length; i++) {
                    try {
                        const href = allStyles[i].href || '';
                        if (href.includes('responsive.css')) {
                            foundResponsiveCSS = true;
                            console.log('[debug.js] responsive.css 로드 확인:', href);
                        }
                        if (href.includes('header.css')) {
                            foundHeaderCSS = true;
                            console.log('[debug.js] header.css 로드 확인:', href);
                        }
                    } catch (e) {
                        console.log('[debug.js] 스타일시트 접근 오류:', e.message);
                    }
                }
                
                console.log('[debug.js] responsive.css 로드됨:', foundResponsiveCSS);
                console.log('[debug.js] header.css 로드됨:', foundHeaderCSS);
            }
        }, 1000);
    });
}); 