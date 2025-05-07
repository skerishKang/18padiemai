/**
 * 모바일 메뉴 관리 스크립트
 * 모바일 메뉴 토글 및 드롭다운 메뉴 기능을 처리합니다.
 */

// 모바일 메뉴 초기화 함수
function initMobileMenu() {
    console.log('[mobile-menu.js] 모바일 메뉴 초기화 시작');
    console.log('[mobile-menu.js] 현재 화면 너비:', window.innerWidth + 'px');
    
    // 초기화 플래그 설정 - 중복 초기화 방지
    if (window.mobileMenuInitialized) {
        console.log('[mobile-menu.js] 모바일 메뉴가 이미 초기화되었습니다.');
        return;
    }
    
    // 모바일 메뉴 토글 버튼
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navbarLinks = document.querySelector('.navbar-links');
    
    console.log('[mobile-menu.js] 모바일 메뉴 요소 확인:', {
        mobileMenuBtn: mobileMenuBtn ? `버튼 요소 발견: ${mobileMenuBtn.className}` : '버튼 요소 발견되지 않음',
        navbarLinks: navbarLinks ? `네비게이션 요소 발견: ${navbarLinks.className}` : '네비게이션 요소 발견되지 않음'
    });
    
    // 추가 디버깅: 모바일 메뉴 버튼의 스타일 상태 확인
    if (mobileMenuBtn) {
        const style = window.getComputedStyle(mobileMenuBtn);
        console.log('[mobile-menu.js] 모바일 메뉴 버튼 스타일:', {
            display: style.display,
            position: style.position,
            zIndex: style.zIndex,
            visibility: style.visibility,
            width: style.width,
            height: style.height
        });
    }
    
    if (mobileMenuBtn && navbarLinks) {
        console.log('[mobile-menu.js] 모바일 메뉴 요소 준비됨');
        
        // 기존 이벤트 리스너 모두 제거 (중복 방지)
        mobileMenuBtn.removeEventListener('click', toggleMobileMenu);
        
        // 새 이벤트 리스너 추가
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
        
        // 모바일 메뉴 토글 함수
        function toggleMobileMenu(e) {
            console.log('[mobile-menu.js] 모바일 메뉴 버튼 클릭됨');
            e.preventDefault();
            e.stopPropagation();
            
            // 현재 메뉴 상태 확인
            const isMenuActive = mobileMenuBtn.classList.contains('active');
            
            // 메뉴 버튼 상태 토글
            mobileMenuBtn.classList.toggle('active');
            
            // 메뉴 상태 토글
            navbarLinks.classList.toggle('active');
            
            // 메뉴를 닫을 때는 모든 하위 드롭다운도 함께 닫기
            if (isMenuActive) {
                closeAllDropdowns();
            }
            
            console.log('[mobile-menu.js] 모바일 메뉴 토글 후 상태:', {
                btnActive: mobileMenuBtn.classList.contains('active'),
                menuActive: navbarLinks.classList.contains('active')
            });
        }
        
        // 모든 드롭다운 메뉴 닫기 함수
        function closeAllDropdowns() {
            const dropdowns = document.querySelectorAll('.dropdown.show-dropdown');
            if (dropdowns.length > 0) {
                console.log('[mobile-menu.js] 모든 드롭다운 메뉴 닫기 실행');
                dropdowns.forEach(dropdown => {
                    dropdown.classList.remove('show-dropdown');
                });
            }
        }
        
        // 초기화 플래그 설정
        window.mobileMenuInitialized = true;
    } else {
        console.error('[mobile-menu.js] 모바일 메뉴 요소를 찾을 수 없음', {
            mobileMenuBtn: !!mobileMenuBtn,
            navbarLinks: !!navbarLinks
        });
    }
    
    // 드롭다운 메뉴 토글 설정
    setupDropdownMenus();
    
    // 문서 클릭 시 메뉴 닫기
    setupDocumentClickHandler(mobileMenuBtn, navbarLinks);
    
    // 윈도우 크기 변경 시 메뉴 상태 초기화
    setupResizeHandler(mobileMenuBtn, navbarLinks);
    
    console.log('[mobile-menu.js] 모바일 메뉴 초기화 완료');
}

// 드롭다운 메뉴 설정
function setupDropdownMenus() {
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    
    if (!dropdownToggles || dropdownToggles.length === 0) {
        console.log('드롭다운 메뉴 요소 없음');
        return;
    }
    
    console.log('드롭다운 토글 요소 수:', dropdownToggles.length);
    
    // 각 드롭다운 토글 요소에 이벤트 리스너 추가
    dropdownToggles.forEach((toggle, index) => {
        console.log(`드롭다운 토글 ${index} 설정:`, toggle);
        
        // 기존 이벤트 리스너 제거 (중복 방지)
        toggle.removeEventListener('click', toggleDropdown);
        
        // 새 이벤트 리스너 추가
        toggle.addEventListener('click', toggleDropdown);
    });
}

// 드롭다운 토글 함수
function toggleDropdown(e) {
    // 모바일 화면에서만 처리
    if (window.innerWidth <= 991) {
        console.log(`드롭다운 클릭됨`);
        e.preventDefault();
        e.stopPropagation();
        
        const dropdown = this.closest('.dropdown');
        
        if (!dropdown) {
            console.error('드롭다운 부모 요소를 찾을 수 없음');
            return;
        }
        
        console.log('클릭한 드롭다운 요소:', dropdown);
        
        // 현재 활성화 상태 확인
        const isActive = dropdown.classList.contains('show-dropdown');
        console.log(`드롭다운 활성화 상태:`, isActive);
        
        // 다른 모든 드롭다운 닫기 (주석 처리 - 여러 메뉴 동시 오픈 허용)
        // closeOtherDropdowns(dropdown);
        
        // 현재 드롭다운 토글
        dropdown.classList.toggle('show-dropdown');
        console.log('토글 후 드롭다운 클래스:', dropdown.className);
        
        // 하위 메뉴 상태 확인
        debugDropdownState(dropdown, this);
    }
}

// 드롭다운 상태 디버깅
function debugDropdownState(dropdown, toggle) {
    // 하위 메뉴 요소 확인
    const dropdownContent = dropdown.querySelector('.dropdown-content');
    if (dropdownContent) {
        console.log('하위 메뉴 요소:', dropdownContent);
        
        // 계산된 스타일 정보
        const computedStyle = window.getComputedStyle(dropdownContent);
        console.log('하위 메뉴 스타일:', {
            maxHeight: computedStyle.maxHeight,
            padding: computedStyle.padding,
            display: computedStyle.display,
            opacity: computedStyle.opacity,
            visibility: computedStyle.visibility,
            overflow: computedStyle.overflow
        });
        
        // 실제 스크롤 높이
        console.log('하위 메뉴 실제 높이:', dropdownContent.scrollHeight + 'px');
    } else {
        console.error('드롭다운 컨텐츠 요소를 찾을 수 없음');
    }
    
    // 아이콘 회전 상태 확인
    const icon = toggle.querySelector('i');
    if (icon) {
        console.log('아이콘 요소:', icon);
        const iconStyle = window.getComputedStyle(icon);
        console.log('아이콘 스타일:', {
            transform: iconStyle.transform,
            transition: iconStyle.transition
        });
    } else {
        console.warn('아이콘 요소를 찾을 수 없음');
    }
}

// 문서 클릭 시 메뉴 닫기 설정
function setupDocumentClickHandler(mobileMenuBtn, navbarLinks) {
    document.removeEventListener('click', handleDocumentClick);
    
    function handleDocumentClick(e) {
        // 모바일 메뉴 영역 밖 클릭 감지
        if (mobileMenuBtn && navbarLinks && 
            !mobileMenuBtn.contains(e.target) && 
            !navbarLinks.contains(e.target)) {
            
            console.log('메뉴 외부 클릭');
            
            // 활성화된 메뉴가 있으면 닫기
            if (navbarLinks.classList.contains('active')) {
                mobileMenuBtn.classList.remove('active');
                navbarLinks.classList.remove('active');
                console.log('외부 클릭으로 메뉴 닫힘');
                
                // 모든 드롭다운도 함께 닫기
                closeAllDropdownsOnDocumentClick();
            }
        }
    }
    
    // 문서 클릭 시 모든 드롭다운 닫기 함수
    function closeAllDropdownsOnDocumentClick() {
        document.querySelectorAll('.dropdown.show-dropdown').forEach(dropdown => {
            if (dropdown) {
                console.log('외부 클릭으로 드롭다운 닫힘:', dropdown);
                dropdown.classList.remove('show-dropdown');
            }
        });
    }
    
    document.addEventListener('click', handleDocumentClick);
}

// 윈도우 크기 변경 시 메뉴 상태 초기화
function setupResizeHandler(mobileMenuBtn, navbarLinks) {
    window.removeEventListener('resize', handleResize);
    
    function handleResize() {
        if (window.innerWidth >= 992) {
            // 모바일 메뉴가 활성화되어 있으면 초기화
            if (mobileMenuBtn && navbarLinks && mobileMenuBtn.classList.contains('active')) {
                console.log('윈도우 크기 변경으로 모바일 메뉴 초기화');
                mobileMenuBtn.classList.remove('active');
                navbarLinks.classList.remove('active');
            }
            
            // 모든 드롭다운 닫기
            document.querySelectorAll('.dropdown').forEach(dropdown => {
                if (dropdown && dropdown.classList.contains('show-dropdown')) {
                    console.log('윈도우 크기 변경으로 드롭다운 초기화:', dropdown);
                    dropdown.classList.remove('show-dropdown');
                }
            });
        }
    }
    
    window.addEventListener('resize', handleResize);
}

// 즉시 초기화 시도
console.log('모바일 메뉴 스크립트 로드됨');

// DOMContentLoaded 이벤트 리스너 등록
if (document.readyState === 'loading') {
    // 아직 DOM이 로드 중일 때
    document.addEventListener('DOMContentLoaded', handleDOMReady);
} else {
    // 이미 DOM이 로드 완료된 상태
    handleDOMReady();
}

// DOM 로드 완료 시 호출되는 함수
function handleDOMReady() {
    console.log('DOM 로드 완료 - 모바일 메뉴');
    
    // includesLoaded 이벤트 핸들러 등록
    if (window.includesLoaded) {
        console.log('Include가 이미 로드됨 - 모바일 메뉴 초기화');
        initMobileMenu();
    } else {
        console.log('Include 로드 대기 중...');
        document.addEventListener('includesLoaded', function() {
            console.log('Include 로드 완료 이벤트 감지 - 모바일 메뉴 초기화');
            initMobileMenu();
        });
    }
}

// 안전장치: 5초 후 자동 초기화
setTimeout(function() {
    console.log('시간 경과 - 모바일 메뉴 자동 초기화');
    if (!window.mobileMenuInitialized) {
        console.log('초기화되지 않은 상태에서 자동 초기화 실행');
        initMobileMenu();
    } else {
        console.log('이미 초기화됨 - 자동 초기화 건너뜀');
    }
}, 5000);

// 다른 모든 드롭다운 닫기 함수 (현재 미사용)
/*
function closeOtherDropdowns(currentDropdown) {
    document.querySelectorAll('.dropdown').forEach((item) => {
        if (item && item !== currentDropdown) {
            const wasActive = item.classList.contains('show-dropdown');
            if (wasActive) {
                console.log('다른 드롭다운 닫기:', item);
                item.classList.remove('show-dropdown');
            }
        }
    });
}
*/ 