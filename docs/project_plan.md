## [2024-06] 폴더 구조 및 경로 통합 작업 완료

### 완료된 일
- public/images/로 모든 이미지 경로 통합 및 HTML 참조 경로 일괄 변경
- favicon, hero, case-study 등 모든 이미지 경로 일치화
- components/ 폴더로 header, footer 통합
- pages/ai/ 이하 voice, vision 등 모든 HTML 경로 정비
- tree.md 최신화

### 해야할 일
- 서비스/교육 등 신규 페이지 추가 시 동일 구조 유지
- 필요시 추가 리팩토링 및 테스트 

## [2024-06] 공통 컴포넌트 분할 및 적용 1차 작업

### 완료된 일
- components/meta.html, page-header.html, cta.html 생성 및 공통 UI 분리
- voice-translation.html에 컴포넌트 include 방식 적용
- 브라우저 테스트 및 실제 렌더링 확인
- 콘솔 에러(파일 경로 문제) 발생: 일부 리소스 파일이 file:// 경로에서 로드되지 않음

### 해야할 일
- include.js 등 컴포넌트 동적 삽입 스크립트의 file:// 환경 대응성 점검
- 추가 컴포넌트화 및 다른 페이지 일괄 적용 준비 