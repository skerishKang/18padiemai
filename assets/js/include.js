document.addEventListener('DOMContentLoaded', function() {
    // HTML include 기능 구현
    const includes = document.querySelectorAll('[data-include]');
    
    includes.forEach(element => {
        const filePath = element.getAttribute('data-include');
        
        // XMLHttpRequest 사용 (CORS 제한이 있더라도 로컬 파일 시스템에서 작동)
        const xhr = new XMLHttpRequest();
        xhr.open('GET', filePath, true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    element.innerHTML = xhr.responseText;
                    
                    // 인클루드된 스크립트 태그 실행
                    element.querySelectorAll('script').forEach(script => {
                        const newScript = document.createElement('script');
                        Array.from(script.attributes).forEach(attr => {
                            newScript.setAttribute(attr.name, attr.value);
                        });
                        newScript.textContent = script.textContent;
                        script.parentNode.replaceChild(newScript, script);
                    });
                    
                    // 인클루드가 완료되면 이벤트 발생
                    const event = new CustomEvent('include-loaded', { 
                        detail: { element: element, path: filePath } 
                    });
                    document.dispatchEvent(event);
                } else {
                    // 오류 발생시 iframe으로 대체
                    console.warn('Include 로드에 실패했습니다. iframe으로 대체합니다:', filePath);
                    const iframe = document.createElement('iframe');
                    iframe.src = filePath;
                    iframe.style.border = 'none';
                    iframe.style.width = '100%';
                    iframe.style.height = '100%';
                    iframe.style.overflow = 'hidden';
                    iframe.onload = function() {
                        try {
                            // iframe 높이 자동 조정
                            const height = iframe.contentWindow.document.body.scrollHeight;
                            iframe.style.height = height + 'px';
                        } catch(e) {
                            console.error('iframe 높이 조정 실패:', e);
                        }
                    };
                    element.innerHTML = '';
                    element.appendChild(iframe);
                }
            }
        };
        xhr.send();
    });
}); 