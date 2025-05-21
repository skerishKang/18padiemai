/**
 * 모바일 메뉴 디버깅 전용 스크립트
 * 특정 페이지에서 햄버거 메뉴가 보이지 않는 문제를 해결하기 위한 스크립트
 */

(function() {
    console.log('[menu-debug.js] 모바일 메뉴 디버깅 스크립트 로드됨');
    
    // DOM 로드 완료 시 실행
    document.addEventListener('DOMContentLoaded', function() {
        console.log('[menu-debug.js] DOM 로드 완료');
        
        // 5초 후 체크 (모든 리소스 로드 후)
        setTimeout(function() {
            checkMobileMenu();
        }, 5000);
        
        // includesLoaded 이벤트 발생 시 체크
        document.addEventListener('includesLoaded', function() {
            console.log('[menu-debug.js] includesLoaded 이벤트 발생');
            setTimeout(function() {
                checkMobileMenu();
            }, 1000);
        });
    });
    
    // 모바일 메뉴 요소 체크 및 로그 기록
    function checkMobileMenu() {
        console.log('[menu-debug.js] 모바일 메뉴 요소 체크 시작');
        
        // 현재 페이지 URL 확인
        console.log('[menu-debug.js] 현재 페이지:', window.location.pathname);
        
        // 헤더 요소 확인
        const header = document.querySelector('header');
        if (!header) {
            console.error('[menu-debug.js] 헤더 요소가 존재하지 않습니다!');
            return;
        }
        
        // 모바일 메뉴 버튼 확인
        const mobileMenuBtn = header.querySelector('.mobile-menu-btn');
        if (!mobileMenuBtn) {
            console.error('[menu-debug.js] 모바일 메뉴 버튼이 존재하지 않습니다!');
            return;
        }
        
        // 모바일 메뉴 버튼 스타일 확인
        const btnStyle = window.getComputedStyle(mobileMenuBtn);
        console.log('[menu-debug.js] 모바일 메뉴 버튼 스타일:', {
            display: btnStyle.display,
            position: btnStyle.position,
            visibility: btnStyle.visibility,
            zIndex: btnStyle.zIndex,
            top: btnStyle.top,
            right: btnStyle.right,
            width: btnStyle.width,
            height: btnStyle.height
        });
        
        // 모바일 뷰포트 확인
        console.log('[menu-debug.js] 현재 뷰포트 너비:', window.innerWidth + 'px');
        console.log('[menu-debug.js] 모바일 뷰 조건 충족 여부:', window.innerWidth <= 991);
        
        // 긴급 해결 - 스타일 강제 적용
        if (window.innerWidth <= 991 && btnStyle.display === 'none') {
            console.log('[menu-debug.js] 모바일 메뉴 버튼이 보이지 않음 - 강제 표시 시도');
            
            // 인라인 스타일로 강제 표시
            mobileMenuBtn.style.display = 'block';
            mobileMenuBtn.style.position = 'absolute';
            mobileMenuBtn.style.zIndex = '1002';
            
            console.log('[menu-debug.js] 강제 표시 스타일 적용 완료');
        }
    }
})(); 