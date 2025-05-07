document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM 로드 완료');
    
    // 컴포넌트 로드 완료 이벤트를 확인
    if (window.includesLoaded) {
        initializeComponents();
    } else {
        // includesLoaded 이벤트가 발생하면 초기화 실행
        document.addEventListener('includesLoaded', initializeComponents);
    }
});

function initializeComponents() {
    console.log('컴포넌트 초기화 시작');
    
    // 모바일 메뉴 토글
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navbarLinks = document.querySelector('.navbar-links');
    
    if (mobileMenuBtn && navbarLinks) {
        console.log('모바일 메뉴 요소 찾음');
        mobileMenuBtn.addEventListener('click', function() {
            console.log('모바일 메뉴 토글');
            this.classList.toggle('active');
            navbarLinks.classList.toggle('active');
        });
    } else {
        console.log('모바일 메뉴 요소 없음');
    }

    // 드롭다운 메뉴 (모바일)
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            if (window.innerWidth <= 991) {
                e.preventDefault();
                const dropdown = this.parentElement;
                if (dropdown) {
                    dropdown.classList.toggle('show-dropdown');
                    
                    // 다른 활성화된 드롭다운 닫기
                    dropdownToggles.forEach(otherToggle => {
                        const parentEl = otherToggle.parentElement;
                        if (otherToggle !== toggle && parentEl) {
                            parentEl.classList.remove('show-dropdown');
                        }
                    });
                }
            }
        });
    });

    // 스크롤 애니메이션
    const fadeElements = document.querySelectorAll('.fade-in');
    const slideElements = document.querySelectorAll('.slide-in');

    function checkScroll() {
        const triggerBottom = window.innerHeight * 0.8;

        fadeElements.forEach(element => {
            if (!element) return;
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < triggerBottom) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });

        slideElements.forEach(element => {
            if (!element) return;
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
    window.handleStickyHeader = function() {
        const header = document.querySelector('header');
        if (header) {
            if (window.scrollY > scrollThreshold) {
                header.classList.add('sticky');
            } else {
                header.classList.remove('sticky');
            }
        }
    }

    const scrollThreshold = 100;
    
    // 스크롤 이벤트에 스티키 헤더 핸들러 추가
    window.addEventListener('scroll', window.handleStickyHeader);

    // 스크롤 시 네비게이션 하이라이트
    const sections = document.querySelectorAll('section[id]');

    function highlightNavigation() {
        const scrollPosition = window.scrollY;

        sections.forEach(section => {
            if (!section) return;
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            const navLink = document.querySelector(`.navbar-links a[href*=${sectionId}]`);
            if (navLink) {
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    navLink.classList.add('active');
                } else {
                    navLink.classList.remove('active');
                }
            }
        });
    }

    window.addEventListener('scroll', highlightNavigation);

    // 모바일 외부 클릭 시 메뉴 닫기
    document.addEventListener('click', function(e) {
        if (window.innerWidth < 992) {
            if (navbarLinks && mobileMenuBtn) { // 변수가 존재하는지 먼저 확인
                if (!e.target.closest('.navbar')) {
                    if (navbarLinks.classList.contains('active')) {
                        mobileMenuBtn.classList.remove('active');
                        navbarLinks.classList.remove('active');
                    }
                    
                    // 열려있는 모든 드롭다운 닫기
                    document.querySelectorAll('.dropdown').forEach(dropdown => {
                        if (dropdown) {
                            dropdown.classList.remove('show-dropdown');
                        }
                    });
                }
            }
        }
    });

    // 윈도우 크기 변경 시 모바일 메뉴 초기화
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 992) {
            if (mobileMenuBtn && navbarLinks && mobileMenuBtn.classList.contains('active')) {
                mobileMenuBtn.classList.remove('active');
                navbarLinks.classList.remove('active');
            }
            
            document.querySelectorAll('.dropdown').forEach(dropdown => {
                if (dropdown) {
                    dropdown.classList.remove('show-dropdown');
                }
            });
        }
    });

    // 스크롤 이벤트에 따른 헤더 스타일 변경
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (header) {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
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
            if (entry.isIntersecting && entry.target) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    if (fadeElements && fadeElements.length > 0) {
        fadeElements.forEach(el => {
            if (el) {
                fadeObserver.observe(el);
            }
        });
    }
    
    // Slide-in 애니메이션
    const slideObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.target) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    if (slideElements && slideElements.length > 0) {
        slideElements.forEach(el => {
            if (el) {
                slideObserver.observe(el);
            }
        });
    }

    // 현재 페이지 링크 활성화
    const currentLocation = window.location.pathname;
    const navLinks = document.querySelectorAll('.navbar-links a');
    
    if (navLinks && navLinks.length > 0) {
        navLinks.forEach(link => {
            if (!link) return;
            
            const linkPath = link.getAttribute('href');
            
            // 현재 페이지와 링크 경로가 일치하는 경우 active 클래스 추가
            if (linkPath && currentLocation.includes(linkPath) && linkPath !== '#' && linkPath !== 'index.html' && linkPath !== '/') {
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
    }
    
    // 폼 유효성 검사 (문의 양식이 있는 경우)
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 간단한 유효성 검사
            let isValid = true;
            const requiredFields = contactForm.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field || !field.value || !field.value.trim()) {
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
                // 여기에 폼 제출 로직 추가 (실제 서버로 전송 등)
                const formMessage = contactForm.querySelector('.form-message');
                if (formMessage) {
                    formMessage.textContent = '메시지가 성공적으로 전송되었습니다. 곧 연락드리겠습니다.';
                    formMessage.classList.add('success');
                    formMessage.classList.remove('error');
                }
                
                // 폼 초기화
                contactForm.reset();
            } else {
                const formMessage = contactForm.querySelector('.form-message');
                if (formMessage) {
                    formMessage.textContent = '입력 정보를 확인해주세요.';
                    formMessage.classList.add('error');
                    formMessage.classList.remove('success');
                }
            }
        });
        
        // 입력 필드 포커스 시 에러 클래스 제거
        contactForm.querySelectorAll('input, textarea').forEach(field => {
            if (field) {
                field.addEventListener('focus', function() {
                    this.classList.remove('error');
                    
                    const formMessage = contactForm.querySelector('.form-message');
                    if (formMessage) {
                        formMessage.textContent = '';
                        formMessage.classList.remove('error', 'success');
                    }
                });
            }
        });
    }
    
    // FAQ 아코디언 (있는 경우)
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems && faqItems.length > 0) {
        faqItems.forEach(item => {
            if (!item) return;
            
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            
            if (question && answer) {
                question.addEventListener('click', function() {
                    const isActive = item.classList.contains('active');
                    
                    // 다른 모든 아이템 닫기
                    faqItems.forEach(otherItem => {
                        if (otherItem && otherItem !== item) {
                            otherItem.classList.remove('active');
                            const otherAnswer = otherItem.querySelector('.faq-answer');
                            if (otherAnswer) {
                                otherAnswer.style.maxHeight = '0';
                            }
                        }
                    });
                    
                    // 현재 아이템 토글
                    if (isActive) {
                        item.classList.remove('active');
                        answer.style.maxHeight = '0';
                    } else {
                        item.classList.add('active');
                        answer.style.maxHeight = answer.scrollHeight + 'px';
                    }
                });
            }
        });
    }
    
    // 히어로 섹션 이미지 슬라이더 (index.html에만 있음)
    const heroSlider = document.querySelector('.hero-image-slider');
    
    if (heroSlider) {
        const heroImages = heroSlider.querySelectorAll('img');
        
        if (heroImages && heroImages.length > 1) {
            let activeIndex = 0;
            
            // 초기 이미지 활성화
            heroImages[activeIndex].classList.add('active');
            
            function changeActiveImage() {
                // 현재 활성 이미지 비활성화
                heroImages[activeIndex].classList.remove('active');
                
                // 다음 이미지 인덱스 계산
                activeIndex = (activeIndex + 1) % heroImages.length;
                
                // 새 이미지 활성화
                heroImages[activeIndex].classList.add('active');
            }
            
            // 일정 간격으로 이미지 변경
            setInterval(changeActiveImage, 5000);
        }
    }
    
    console.log('컴포넌트 초기화 완료');
} 