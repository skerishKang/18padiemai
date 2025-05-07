// 페이지 내의 data-include 속성이 있는 모든 요소를 찾아서 해당 파일을 로드하는 함수
document.addEventListener('DOMContentLoaded', function() {
    // data-include 속성이 있는 모든 요소 찾기
    const includes = document.querySelectorAll('[data-include]');
    let loadedCount = 0;
    
    console.log(`총 ${includes.length}개의 include 요소를 찾았습니다.`);
    
    // 각 요소에 대해 처리
    includes.forEach(function(element, index) {
        const file = element.getAttribute('data-include');
        console.log(`[${index}] 로드할 파일 경로: "${file}"`);
        
        // XMLHttpRequest를 사용하여 파일 로드 (file:// 프로토콜에서도 동작)
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200 || (xhr.status === 0 && xhr.responseText)) {
                    // 가져온 콘텐츠로 요소 내용 채우기
                    console.log(`[${index}] 파일 로드 성공: ${file} (상태: ${xhr.status})`);
                    element.innerHTML = xhr.responseText;
                    
                    // 로드된 파일 내의 스크립트 실행
                    const scripts = Array.from(element.querySelectorAll('script'));
                    console.log(`[${index}] 스크립트 ${scripts.length}개 발견`);
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
                } else {
                    console.error(`[${index}] 파일 로드 실패: ${file} (상태: ${xhr.status})`);
                    element.innerHTML = `<p style="color:red;">Error loading: ${file}</p>`;
                }
                
                // 모든 include가 로드되었는지 확인
                loadedCount++;
                if (loadedCount === includes.length) {
                    console.log('모든 include 요소 로드 완료');
                    // 모든 컴포넌트가 로드되었음을 알리는 이벤트 디스패치
                    window.includesLoaded = true;
                    document.dispatchEvent(new CustomEvent('includesLoaded'));
                }
            }
        };
        
        try {
            console.log(`[${index}] 파일 요청 시작: ${file}`);
            xhr.open('GET', file, true);
            xhr.send();
        } catch (error) {
            console.error(`[${index}] 파일 요청 오류: ${file}`, error);
            element.innerHTML = `<p style="color:red;">Error loading: ${file}</p>`;
            
            // 오류가 있더라도 포함 항목 로드가 완료되었는지 확인
            loadedCount++;
            if (loadedCount === includes.length) {
                console.log('모든 include 요소 로드 완료 (오류 포함)');
                window.includesLoaded = true;
                document.dispatchEvent(new CustomEvent('includesLoaded'));
            }
        }
    });
    
    // include가 없는 경우 이벤트 발생
    if (includes.length === 0) {
        console.log('include 요소가 없습니다.');
        window.includesLoaded = true;
        document.dispatchEvent(new CustomEvent('includesLoaded'));
    }
}); 