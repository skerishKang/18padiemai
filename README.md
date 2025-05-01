# Padiem AI - 음성 및 영상 AI 기술 전문 기업 웹사이트

이 프로젝트는 Padiem AI 회사의 웹사이트로, 실시간 통역, 보이스 클로닝, 실시간 더빙, GPT 기반 보이스피싱 방지, 립싱크 AI, 음악 생성 등의 AI 기술 서비스를 소개하는 플랫폼입니다.

## 특징

- 모던한 UI/UX 디자인
- 반응형 웹 디자인 (모바일, 태블릿, 데스크톱)
- 다양한 AI 서비스 소개 페이지
- 애니메이션 효과
- 사용자 친화적인 네비게이션

## 기술 스택

- HTML5
- CSS3
- JavaScript (ES6+)
- Font Awesome 아이콘
- 구글 폰트 (Noto Sans KR)

## 폴더 구조 정리 안내

### 배경

프로젝트에 중복된 폴더 구조가 존재했습니다:
- `/assets/css`, `/assets/js`, `/assets/images`
- `/css`, `/js`, `/img`
- 루트 폴더의 `assets/css`, `assets/js`

이런 중복 구조는 유지보수를 어렵게 하고, 리소스 낭비 및 참조 혼란을 일으킬 수 있습니다.

### 해결 방법

중복된 폴더 구조를 통합하여 하나의 일관된 구조로 정리했습니다:

```
/unified/
  ├── css/          # 모든 CSS 파일
  ├── js/           # 모든 JS 파일
  └── images/       # 모든 이미지 파일
```

### 통합 내용

#### CSS 파일
- responsive.css
- style.css 
- styles.css

#### JS 파일
- include.js
- main.js

### 새 폴더 구조 사용 방법

1. HTML 파일에서 리소스 참조 경로를 변경해야 합니다:

변경 전:
```html
<link rel="stylesheet" href="../css/styles.css">
<script src="../js/main.js"></script>
```

변경 후:
```html
<link rel="stylesheet" href="../unified/css/styles.css">
<script src="../unified/js/main.js"></script>
```

2. 모든 HTML 파일에서 일관되게 통합된 폴더 구조를 사용하도록 합니다.

3. 기존 폴더 구조는 일정 기간 유지한 후, 문제가 없으면 제거할 수 있습니다.

### 장점

- 파일 관리 용이
- 중복 파일 제거로 디스크 공간 절약
- 참조 경로의 일관성 확보
- 유지보수 효율성 증가

## 프로젝트 구조

```
/
├── index.html           # 메인 페이지
├── pages/               # 각종 서브 페이지들
├── unified/             # 통합된 정적 리소스 파일
│   ├── css/             # 스타일시트 파일들
│   ├── js/              # 자바스크립트 파일들
│   └── images/          # 이미지 파일들
├── img/                 # (기존) 이미지 파일들
├── css/                 # (기존) 스타일시트 파일들
├── js/                  # (기존) 자바스크립트 파일들
└── assets/              # (기존) 애셋 파일들
    ├── css/             # (기존) 스타일시트 파일들
    ├── js/              # (기존) 자바스크립트 파일들
    └── images/          # (기존) 이미지 파일들
```

## 페이지 구성

- **홈페이지 (index.html)**: 회사 및 서비스 개요 소개
- **서비스 페이지**: 다양한 AI 기술 서비스 상세 소개
  - 실시간 통역
  - 보이스 클로닝
  - 실시간 더빙
  - 보이스피싱 방지
  - 립싱크 AI
  - 음악 생성
  - AI 가수 제작
- **기술 페이지**: AI 기술 분야별 상세 정보
- **활용 사례 페이지**: 다양한 산업 분야의 적용 사례
- **회사 소개 페이지**: 회사 정보 및 연혁
- **문의 페이지**: 고객 문의 양식

## 사용 방법

1. 해당 프로젝트를 다운로드하거나 클론합니다.
2. 웹 브라우저에서 `index.html` 파일을 엽니다.
3. 웹 서버를 통해 배포할 경우, 모든 파일과 폴더를 웹 서버의 적절한 디렉토리에 업로드합니다.

## 기여 방법

1. 이 저장소를 포크합니다.
2. 새 기능 브랜치를 생성합니다: `git checkout -b feature/amazing-feature`
3. 변경 사항을 커밋합니다: `git commit -m 'Add some amazing feature'`
4. 브랜치에 푸시합니다: `git push origin feature/amazing-feature`
5. Pull Request를 제출합니다.

## 라이센스

이 프로젝트는 MIT 라이센스 하에 배포됩니다.

## 연락처

Padiem AI - contact@padiem.ai

프로젝트 링크: [https://github.com/padiemAI/website](https://github.com/padiemAI/website)

## 향후 계획

1. 모든 HTML 파일의 리소스 참조 경로를 통합 폴더 구조로 업데이트
2. 통합된 구조가 정상 작동하는지 테스트
3. 기존 중복 폴더 구조 제거

## 참고 사항

- 이미지 파일의 경우 파일 크기가 크므로 점진적으로 이동할 예정입니다.
- CSS와 JS 파일 내부의 리소스 참조 경로도 확인하여 업데이트해야 합니다. 