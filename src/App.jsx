import React, { useState, useEffect } from 'react';
import { loadState, saveState, resetToInitial } from './utils/storage';
import NoticeBanner from './components/NoticeBanner';
import Header from './components/Header';
import TimelineSection from './components/TimelineSection';
import ChecklistSection from './components/ChecklistSection';
import VoucherSection from './components/VoucherSection';
import HotelCard from './components/HotelCard';
import EmergencyContacts from './components/EmergencyContacts';

export default function App() {
  const [state, setState] = useState(() => loadState());
  const [activeMainTab, setActiveMainTab] = useState('all'); // 'all' | 'timeline' | 'checklist' | 'wallet'

  // 상태 변경 시 LocalStorage에 영속화
  useEffect(() => {
    saveState(state);
  }, [state]);

  // 공지사항 업데이트 핸들러
  const handleUpdateNotice = (updatedNotice) => {
    setState((prev) => ({
      ...prev,
      notice: updatedNotice,
    }));
  };

  // 일자별 일정 업데이트 핸들러
  const handleUpdateDays = (updatedDays) => {
    setState((prev) => ({
      ...prev,
      days: updatedDays,
    }));
  };

  // 체크리스트 업데이트 핸들러
  const handleUpdateChecklists = (updatedChecklists) => {
    setState((prev) => ({
      ...prev,
      checklists: updatedChecklists,
    }));
  };

  // 데이터 초기화
  const handleResetData = () => {
    if (window.confirm('기본 도쿄 2박 3일 패키지 투어 샘플 데이터로 초기화하시겠습니까?')) {
      const resetData = resetToInitial();
      setState(resetData);
      setActiveMainTab('all');
    }
  };

  return (
    <div className="min-h-screen bg-surface-container-low flex justify-center py-0 sm:py-6 selection:bg-brand-500 selection:text-white">
      {/* 모바일 퍼스트 반응형 컨테이너 (최대 440px) */}
      <div className="w-full max-w-[440px] min-h-screen bg-surface sm:rounded-[2.5rem] shadow-elevated sm:border sm:border-outline-variant flex flex-col relative overflow-hidden">
        
        {/* 1. 상단 긴급 공지 고정 배너 (Sticky Header) */}
        <NoticeBanner
          notice={state.notice}
          onUpdateNotice={handleUpdateNotice}
        />

        {/* 2. 메인 헤더 & 네비게이션 */}
        <Header
          tripTitle={state.tripTitle}
          destination={state.destination}
          period={state.period}
          activeMainTab={activeMainTab}
          setActiveMainTab={setActiveMainTab}
          onReset={handleResetData}
        />

        {/* 3. 메인 컨텐츠 영역 */}
        <main className="flex-1 p-4 pb-12 overflow-y-auto">
          {/* 전체 탭 또는 일정 타임라인 탭 */}
          {(activeMainTab === 'all' || activeMainTab === 'timeline') && (
            <TimelineSection
              days={state.days}
              onUpdateDays={handleUpdateDays}
            />
          )}

          {/* 전체 탭 또는 현장 점검 탭 */}
          {(activeMainTab === 'all' || activeMainTab === 'checklist') && (
            <ChecklistSection
              checklists={state.checklists}
              onUpdateChecklists={handleUpdateChecklists}
            />
          )}

          {/* 전체 탭 또는 바우처 & SOS 탭 */}
          {(activeMainTab === 'all' || activeMainTab === 'wallet') && (
            <>
              {/* 모바일 바우처 월렛 */}
              <VoucherSection vouchers={state.vouchers} />

              {/* 현지어 택시 카드 */}
              <HotelCard hotelCard={state.hotelCard} />

              {/* 현지 비상연락처 (SOS) */}
              <EmergencyContacts contacts={state.emergencyContacts} />
            </>
          )}
        </main>

        {/* 하단 푸터 바 */}
        <footer className="py-4 text-center text-[11px] text-outline border-t border-surface-container bg-white/70">
          <p>© 2026 Traveler Micro MVP • LocalStorage 영속 저장</p>
        </footer>
      </div>
    </div>
  );
}
