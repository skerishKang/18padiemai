document.addEventListener('DOMContentLoaded', function() {
    // 모바일 메뉴 토글
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const body = document.querySelector('body');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            body.classList.toggle('no-scroll');
            
            // 아이콘 변경
            const icon = mobileMenuBtn.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // 모바일 드롭다운 토글
    const dropdownLinks = document.querySelectorAll('.dropdown > a');
    
    if (window.innerWidth <= 992) {
        dropdownLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const dropdown = this.nextElementSibling;
                
                // 다른 드롭다운 닫기
                document.querySelectorAll('.dropdown-content').forEach(item => {
                    if (item !== dropdown) {
                        item.classList.remove('show');
                    }
                });
                
                dropdown.classList.toggle('show');
            });
        });
    }
    
    // 윈도우 리사이즈 이벤트
    window.addEventListener('resize', function() {
        if (window.innerWidth > 992) {
            body.classList.remove('no-scroll');
            navLinks.classList.remove('active');
            
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
            
            // 모바일 드롭다운 리셋
            document.querySelectorAll('.dropdown-content').forEach(item => {
                item.classList.remove('show');
            });
        }
    });
    
    // 스크롤 애니메이션
    const animateElements = document.querySelectorAll('.animate');
    
    function checkScroll() {
        animateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('visible');
            }
        });
    }
    
    // 초기 체크
    checkScroll();
    window.addEventListener('scroll', checkScroll);
    
    // 타이핑 효과
    const typingElement = document.querySelector('.typing-effect');
    
    if (typingElement) {
        const text = typingElement.getAttribute('data-text');
        const typingDelay = 100;
        let charIndex = 0;
        
        function typeText() {
            if (charIndex < text.length) {
                typingElement.textContent += text.charAt(charIndex);
                charIndex++;
                setTimeout(typeText, typingDelay);
            }
        }
        
        typeText();
    }
    
    // 스크롤 시 헤더 스타일 변경
    const nav = document.querySelector('nav');
    
    function updateNavbar() {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', updateNavbar);
    
    // 스무스 스크롤
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // 모바일 메뉴가 열려있으면 닫기
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    body.classList.remove('no-scroll');
                    
                    const icon = mobileMenuBtn.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    });
}); 