// 페이지 내의 data-include 속성이 있는 모든 요소를 찾아서 해당 파일을 로드하는 함수
document.addEventListener('DOMContentLoaded', function() {
    // data-include 속성이 있는 모든 요소 찾기
    const includes = document.querySelectorAll('[data-include]');
    
    // 각 요소에 대해 처리
    includes.forEach(function(element) {
        const file = element.getAttribute('data-include');
        
        // AJAX 요청으로 파일 가져오기
        fetch(file)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.text();
            })
            .then(content => {
                // 가져온 콘텐츠로 요소 내용 채우기
                element.innerHTML = content;
                
                // 로드된 파일 내의 스크립트 실행
                const scripts = element.querySelectorAll('script');
                scripts.forEach(function(script) {
                    const newScript = document.createElement('script');
                    
                    if (script.src) {
                        newScript.src = script.src;
                    } else {
                        newScript.textContent = script.textContent;
                    }
                    
                    document.head.appendChild(newScript);
                    script.remove();
                });
            })
            .catch(error => {
                console.error('Error loading the include file:', error);
                element.innerHTML = `<p>Error loading the include file: ${file}</p>`;
            });
    });
}); 