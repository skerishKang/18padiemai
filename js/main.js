document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM 로드 완료 [main.js]');
    
    // 컴포넌트 로드 완료 이벤트를 확인
    if (window.includesLoaded) {
        console.log('[main.js] includesLoaded 플래그가 이미 true입니다. initializeComponents() 호출.');
        initializeComponents();
    } else {
        // includesLoaded 이벤트가 발생하면 초기화 실행
        console.log('[main.js] includesLoaded 이벤트를 기다립니다.');
        document.addEventListener('includesLoaded', function() {
            console.log('[main.js] includesLoaded 이벤트 수신! initializeComponents() 호출.');
            initializeComponents();
        }, { once: true });
    }
});

function initializeComponents() {
    console.log('컴포넌트 초기화 시작');
    
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
    const heroSliderContainer = document.querySelector('.hero-image-container');
    console.log('[Hero Slider] 컨테이너 요소:', heroSliderContainer);
    
    if (heroSliderContainer) {
        const heroImages = heroSliderContainer.querySelectorAll('.hero-image');
        console.log('[Hero Slider] 이미지 요소들:', heroImages);
        console.log('[Hero Slider] 발견된 이미지 개수:', heroImages.length);
        
        if (heroImages && heroImages.length > 1) {
            let activeIndex = 0;
            
            console.log('[Hero Slider] 초기 스타일 설정 시작...');
            // 히어로 이미지 초기 스타일 설정
            heroImages.forEach((img, index) => {
                if (!img) {
                    console.warn(`[Hero Slider] ${index}번 이미지가 null입니다.`);
                    return;
                }
                img.style.opacity = '0';
                img.style.position = 'absolute';
                img.style.top = '0';
                img.style.left = '0';
                img.style.width = '100%';
                img.style.height = '100%';
                img.style.objectFit = 'cover';
                img.style.transition = 'opacity 0.8s ease-in-out';
                console.log(`[Hero Slider] ${index}번 이미지 초기 스타일 적용: opacity=${img.style.opacity}, position=${img.style.position}`);
            });
            
            // 초기 이미지 활성화
            if (heroImages[activeIndex]) {
                heroImages[activeIndex].style.opacity = '1';
                console.log(`[Hero Slider] 초기 활성화 이미지 인덱스: ${activeIndex}, opacity: ${heroImages[activeIndex].style.opacity}`);
            } else {
                console.error(`[Hero Slider] 초기 활성화할 ${activeIndex}번 이미지가 존재하지 않습니다.`);
            }
            
            function changeActiveImage() {
                if (!heroImages[activeIndex]) {
                    console.error(`[Hero Slider - changeActiveImage] 현재 activeIndex(${activeIndex})에 해당하는 이미지가 없습니다.`);
                    return;
                }
                console.log(`[Hero Slider] 이미지 변경 시도 - 현재 활성 인덱스: ${activeIndex}`);
                
                // 현재 활성 이미지 비활성화
                heroImages[activeIndex].style.opacity = '0';
                console.log(`[Hero Slider] 이전 이미지 (${activeIndex}) opacity: ${heroImages[activeIndex].style.opacity}`);
                
                // 다음 이미지 인덱스 계산
                activeIndex = (activeIndex + 1) % heroImages.length;
                
                if (!heroImages[activeIndex]) {
                    console.error(`[Hero Slider - changeActiveImage] 다음 activeIndex(${activeIndex})에 해당하는 이미지가 없습니다.`);
                    return;
                }
                
                // 새 이미지 활성화
                heroImages[activeIndex].style.opacity = '1';
                console.log(`[Hero Slider] 새 활성 인덱스: ${activeIndex}, opacity: ${heroImages[activeIndex].style.opacity}`);
            }
            
            // 일정 간격으로 이미지 변경 - 첫 실행은 지연시켜서 시작
            setTimeout(() => {
                console.log('[Hero Slider] 첫 이미지 변경 인터벌 시작...');
                setInterval(changeActiveImage, 4000);
            }, 100);
        } else if (heroImages && heroImages.length === 1) {
            console.log('[Hero Slider] 이미지가 1개만 있으므로 슬라이더를 작동하지 않습니다.');
            if (heroImages[0]) {
                heroImages[0].style.opacity = '1';
                heroImages[0].style.position = 'relative';
            }
        } else {
            console.log('[Hero Slider] 이미지를 찾지 못했거나 heroImages가 null입니다.');
        }
    } else {
        console.log('[Hero Slider] .hero-image-container 요소를 찾지 못했습니다. (index.html이 아닐 수 있음)');
    }
    
    console.log('컴포넌트 초기화 완료 [main.js]');
} 