// 페이지 내의 data-include 속성이 있는 모든 요소를 찾아서 해당 파일을 로드하는 함수
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM 로드 완료 - include.js');
    
    // includesLoaded 플래그 초기화
    window.includesLoaded = false;
    
    // data-include 속성이 있는 모든 요소 찾기
    const includes = document.querySelectorAll('[data-include]');
    let loadedCount = 0;
    
    console.log(`총 ${includes.length}개의 include 요소를 찾았습니다.`);
    
    if (includes.length === 0) {
        window.includesLoaded = true;
        setTimeout(function() {
            document.dispatchEvent(new CustomEvent('includesLoaded'));
            console.log('includesLoaded 이벤트가 발생했습니다! (include 요소 없음)');
        }, 10);
        return;
    }
    
    const loadPromises = Array.from(includes).map((element, index) => {
        const file = element.getAttribute('data-include');
        console.log(`[${index}] fetch로 파일 요청: ${file}`);
        return fetch(file)
            .then(response => {
                if (!response.ok) throw new Error(`[${index}] 파일 로드 실패: ${file}`);
                return response.text();
            })
            .then(html => {
                element.innerHTML = html;
                // 스크립트 실행
                const scripts = Array.from(element.querySelectorAll('script'));
                scripts.forEach(originalScript => {
                    const newScript = document.createElement('script');
                    if (originalScript.src) {
                        newScript.src = originalScript.src;
                        if (originalScript.defer) newScript.defer = true;
                        if (originalScript.async) newScript.async = true;
                    } else {
                        newScript.textContent = originalScript.textContent;
                    }
                    if (originalScript.type) newScript.type = originalScript.type;
                    originalScript.parentNode.replaceChild(newScript, originalScript);
                });
                console.log(`[${index}] 성공적으로 로드됨: ${file}`);
            })
            .catch(error => {
                console.error(error);
                element.innerHTML = `<p style=\"color:red;\">Error loading: ${file}</p>`;
            });
    });
    
    Promise.all(loadPromises).then(() => {
        window.includesLoaded = true;
        setTimeout(function() {
            document.dispatchEvent(new CustomEvent('includesLoaded'));
            console.log('includesLoaded 이벤트가 발생했습니다! (fetch all)');
        }, 10);
    });
}); 