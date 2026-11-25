import React from 'react';
import { PlaneTakeoff, RotateCcw, MapPin, CalendarDays, Compass } from 'lucide-react';

export default function Header({ 
  tripTitle, 
  destination, 
  period, 
  activeMainTab, 
  setActiveMainTab, 
  onReset 
}) {
  const tabs = [
    { id: 'all', label: '전체' },
    { id: 'timeline', label: '일정 타임라인' },
    { id: 'checklist', label: '점검 체크' },
    { id: 'wallet', label: '바우처 & SOS' },
  ];

  return (
    <header className="bg-gradient-to-br from-brand-500 via-brand-600 to-brand-700 text-white rounded-b-[2.5rem] p-6 shadow-elevated relative overflow-hidden">
      {/* 장식용 그래픽 요소 */}
      <div className="absolute top-0 right-0 -mr-8 -mt-8 w-44 h-44 bg-accent-400/20 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-8 -mb-8 w-36 h-36 bg-brand-400/20 rounded-full blur-xl pointer-events-none" />

      {/* 최상단 라인: 브랜드 & 초기화 버튼 */}
      <div className="flex items-center justify-between mb-4 relative z-10">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-white/20 backdrop-blur-md rounded-2xl border border-white/20 shadow-inner">
            <Compass className="w-5 h-5 text-accent-300" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-black tracking-widest text-accent-300 block">
              TRAVELER GUIDE MVP
            </span>
            <span className="text-xs font-bold text-white/90">
              스마트 여행 일정 관리
            </span>
          </div>
        </div>

        <button
          onClick={onReset}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white/80 hover:text-white rounded-xl text-xs font-semibold backdrop-blur-md transition border border-white/10 active:scale-95"
          title="목업 데이터로 초기화"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>초기화</span>
        </button>
      </div>

      {/* 여행 정보 헤드라인 */}
      <div className="mb-5 relative z-10">
        <div className="flex items-center gap-2 text-xs font-semibold text-accent-300 mb-1">
          <span className="flex items-center gap-1 bg-brand-950/25 px-2.5 py-0.5 rounded-full border border-white/10">
            <MapPin className="w-3 h-3 text-accent-400" /> {destination}
          </span>
          <span className="flex items-center gap-1 bg-brand-950/25 px-2.5 py-0.5 rounded-full border border-white/10">
            <CalendarDays className="w-3 h-3 text-accent-400" /> {period}
          </span>
        </div>
        <h1 className="text-h1 font-extrabold tracking-tight text-white drop-shadow-sm mt-1">
          {tripTitle}
        </h1>
      </div>

      {/* 네비게이션 탭 */}
      <div className="flex p-1 bg-brand-950/25 backdrop-blur-md rounded-2xl border border-white/15 relative z-10">
        {tabs.map((tab) => {
          const isActive = activeMainTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveMainTab(tab.id)}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition select-none ${
                isActive
                  ? 'bg-white text-brand-700 shadow-card font-extrabold'
                  : 'text-white/80 hover:text-white hover:bg-white/5'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </header>
  );
}
