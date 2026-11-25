---
name: TripFlow Tokyo Healing
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e3ecff'
  surface-container-high: '#d8e5ff'
  surface-container-highest: '#cbdbf5'
  on-surface: '#0f1b2d'
  on-surface-variant: '#434752'
  outline: '#747783'
  outline-variant: '#c4c6d3'
  primary: '#b34fe6'
  primary-container: '#d580ff'
  on-primary: '#ffffff'
  on-primary-container: '#3b0a52'
  secondary: '#facc15'
  secondary-container: '#fef08a'
  on-secondary: '#713f12'
  on-secondary-container: '#854d0e'
  tertiary: '#06b6d4'
  tertiary-container: '#cffafe'
  on-tertiary: '#ffffff'
  on-tertiary-container: '#164e63'
  error: '#ba1a1a'
  error-container: '#ffdad6'
  on-error: '#ffffff'
  on-error-container: '#93000a'
typography:
  font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif
  heading-font: 'Plus Jakarta Sans', sans-serif
  scale:
    display: 2.25rem
    h1: 1.75rem
    h2: 1.375rem
    h3: 1.125rem
    body-lg: 1rem
    body-md: 0.875rem
    body-sm: 0.75rem
    caption: 0.6875rem
radii:
  sm: 0.375rem
  md: 0.5rem
  lg: 0.75rem
  xl: 1rem
  full: 9999px
shadows:
  card: 0 4px 20px -2px rgba(179, 79, 230, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.04)
  elevated: 0 10px 25px -3px rgba(179, 79, 230, 0.15)
---

# TripFlow Tokyo Healing Design System

## 1. Visual Direction & Identity
- **컨셉**: 도쿄 힐링 & 명소 투어 일정/가이드 관리 앱
- **무드**: 쨍한 퍼플 라일락(Vivid Purple Lilac)를 메인 테마로 채택하여 세련되고 산뜻한 여행 경험 전달
- **대비 요소**: 중요 알림 및 바우처 포인트에 선명한 옐로우(#FACC15) 악센트를 배치하고, 야간/현지 기사용 택시 카드에는 딥 다크 모드 카드 스타일 적용

## 2. Color Palette & Semantics
- **Primary (Vivid Purple Lilac)**: `#B34FE6` / `#D580FF` — 상단 헤더, 활성 탭, 주요 인터랙티브 버튼(+ 새 일정 추가), 체크 인디케이터
- **Secondary (Bright Yellow)**: `#FACC15` — 상단 긴급 공지 바, 바우처 액션 버튼, 중요 알림 뱃지
- **Dark Surface Accent (Taxi Flashcard)**: `#1E293B` ~ `#0F172A` — 기사용 일본어 목적지 안내 전용 고대비 카드
- **Base Surface**: `#F8F9FF` — 맑고 깨끗한 쿨톤 화이트/라벤더 배경
- **Status Colors**:
  - 진행 중 / 주의: `#F59E0B` (Amber)
  - 완료 / 확인: `#B34FE6` (Lilac Primary) / `#10B981` (Emerald)
  - SOS / 긴급: `#EF4444` (Red)

## 3. Typography & Components
- **Font**: Plus Jakarta Sans 베이스에 직관적인 볼드(Bold 700/800) 계층 구조 적용
- **Card UI**: 라운드 반경 12px~16px(`rounded-xl`, `rounded-2xl`) 및 은은한 퍼플 틴트 섀도우를 통한 부드러운 카드 입체감
- **Accessibility**: 야외 햇빛 아래에서도 확인 가능한 텍스트 대비율 유지
