document.addEventListener('DOMContentLoaded', function() {
    // 모바일 메뉴 토글
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navbarLinks = document.querySelector('.navbar-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            navbarLinks.classList.toggle('active');
        });
    }

    // 드롭다운 메뉴 (모바일)
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            if (window.innerWidth <= 991) {
                e.preventDefault();
                const dropdown = this.parentElement;
                dropdown.classList.toggle('active');
                
                // 다른 활성화된 드롭다운 닫기
                dropdownToggles.forEach(otherToggle => {
                    if (otherToggle !== toggle) {
                        otherToggle.parentElement.classList.remove('active');
                    }
                });
            }
        });
    });

    // 스크롤 애니메이션
    const fadeElements = document.querySelectorAll('.fade-in');
    const slideElements = document.querySelectorAll('.slide-in');

    function checkScroll() {
        const triggerBottom = window.innerHeight * 0.8;

        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < triggerBottom) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });

        slideElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < triggerBottom) {
                element.style.opacity = '1';
                element.style.transform = 'translateX(0)';
            }
        });
    }

    // 초기 체크
    checkScroll();

    // 스크롤 이벤트
    window.addEventListener('scroll', checkScroll);

    // 스티키 헤더
    const header = document.querySelector('header');
    const scrollThreshold = 100;

    function handleStickyHeader() {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    }

    // 초기 체크
    handleStickyHeader();

    // 스크롤 이벤트
    window.addEventListener('scroll', handleStickyHeader);

    // 스크롤 시 네비게이션 하이라이트
    const sections = document.querySelectorAll('section[id]');

    function highlightNavigation() {
        const scrollPosition = window.scrollY;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelector(`.navbar-links a[href*=${sectionId}]`)?.classList.add('active');
            } else {
                document.querySelector(`.navbar-links a[href*=${sectionId}]`)?.classList.remove('active');
            }
        });
    }

    window.addEventListener('scroll', highlightNavigation);

    // 모바일 외부 클릭 시 메뉴 닫기
    document.addEventListener('click', function(e) {
        if (window.innerWidth < 992) {
            if (!e.target.closest('.navbar')) {
                if (navbarLinks.classList.contains('active')) {
                    mobileMenuBtn.classList.remove('active');
                    navbarLinks.classList.remove('active');
                }
                
                // 열려있는 모든 드롭다운 닫기
                document.querySelectorAll('.dropdown').forEach(dropdown => {
                    dropdown.classList.remove('show-dropdown');
                });
            }
        }
    });

    // 윈도우 크기 변경 시 모바일 메뉴 초기화
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 992) {
            if (mobileMenuBtn.classList.contains('active')) {
                mobileMenuBtn.classList.remove('active');
                navbarLinks.classList.remove('active');
            }
            
            document.querySelectorAll('.dropdown').forEach(dropdown => {
                dropdown.classList.remove('show-dropdown');
            });
        }
    });

    // 스크롤 이벤트에 따른 헤더 스타일 변경
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 애니메이션 효과 (Intersection Observer API 사용)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    // Fade-in 애니메이션
    const fadeObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    fadeElements.forEach(el => {
        fadeObserver.observe(el);
    });
    
    // Slide-in 애니메이션
    const slideObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    slideElements.forEach(el => {
        slideObserver.observe(el);
    });

    // 현재 페이지 링크 활성화
    const currentLocation = window.location.pathname;
    const navLinks = document.querySelectorAll('.navbar-links a');
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        
        // 현재 페이지와 링크 경로가 일치하는 경우 active 클래스 추가
        if (currentLocation.includes(linkPath) && linkPath !== '#' && linkPath !== 'index.html' && linkPath !== '/') {
            link.classList.add('active');
            
            // 드롭다운 내부의 링크인 경우 부모 드롭다운도 활성화
            const parentDropdown = link.closest('.dropdown');
            if (parentDropdown) {
                const dropdownToggle = parentDropdown.querySelector('.dropdown-toggle');
                if (dropdownToggle) {
                    dropdownToggle.classList.add('active');
                }
            }
        } else if ((currentLocation === '/' || currentLocation.includes('index.html')) && (linkPath === 'index.html' || linkPath === '/')) {
            // 홈페이지인 경우 홈 링크 활성화
            link.classList.add('active');
        }
    });
    
    // 폼 유효성 검사 (문의 양식이 있는 경우)
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 간단한 유효성 검사
            let isValid = true;
            const requiredFields = contactForm.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
            
            // 이메일 형식 검사
            const emailField = contactForm.querySelector('input[type="email"]');
            if (emailField && emailField.value) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(emailField.value)) {
                    isValid = false;
                    emailField.classList.add('error');
                }
            }
            
            if (isValid) {
                // 여기서 실제 폼 제출 또는 AJAX 요청을 처리할 수 있습니다
                alert('폼이 성공적으로 제출되었습니다!');
                contactForm.reset();
            } else {
                alert('필수 항목을 모두 올바르게 입력해주세요.');
            }
        });
    }
}); 