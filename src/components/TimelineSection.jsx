import React, { useState } from 'react';
import { 
  Calendar, Clock, MapPin, Plus, Trash2, Edit2, 
  Car, Compass, Utensils, Hotel, CheckCircle, PlayCircle, Clock3, X, Check 
} from 'lucide-react';

const CATEGORY_MAP = {
  '이동': { icon: Car, bg: 'bg-tertiary-container text-on-tertiary-container border-cyan-200' },
  '관광': { icon: Compass, bg: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
  '식사': { icon: Utensils, bg: 'bg-amber-100 text-amber-700 border-amber-200' },
  '숙소': { icon: Hotel, bg: 'bg-brand-100 text-brand-800 border-brand-200' },
};

const STATUS_MAP = {
  'upcoming': { label: '예정', badge: 'bg-slate-100 text-slate-600', icon: Clock3 },
  'in_progress': { label: '진행 중', badge: 'bg-status-progress text-white font-extrabold animate-pulse', icon: PlayCircle },
  'completed': { label: '완료', badge: 'bg-brand-600 text-white font-bold', icon: CheckCircle },
};

export default function TimelineSection({ days, onUpdateDays }) {
  const [activeDayId, setActiveDayId] = useState(days[0]?.id || 'day-1');
  const [modalMode, setModalMode] = useState(null); // 'add' | 'edit' | null
  const [targetItem, setTargetItem] = useState(null);

  // 폼 상태
  const [time, setTime] = useState('10:00');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('관광');
  const [memo, setMemo] = useState('');
  const [status, setStatus] = useState('upcoming');

  const currentDay = days.find((d) => d.id === activeDayId) || days[0];

  // 상태 순환 토글 (upcoming -> in_progress -> completed -> upcoming)
  const handleCycleStatus = (itemId) => {
    const nextStatus = {
      upcoming: 'in_progress',
      in_progress: 'completed',
      completed: 'upcoming',
    };

    const updatedDays = days.map((day) => {
      if (day.id !== activeDayId) return day;
      return {
        ...day,
        items: day.items.map((it) =>
          it.id === itemId ? { ...it, status: nextStatus[it.status] || 'upcoming' } : it
        ),
      };
    });
    onUpdateDays(updatedDays);
  };

  // 모달 오픈 (추가)
  const handleOpenAdd = () => {
    setTime('10:00');
    setTitle('');
    setCategory('관광');
    setMemo('');
    setStatus('upcoming');
    setTargetItem(null);
    setModalMode('add');
  };

  // 모달 오픈 (수정)
  const handleOpenEdit = (item) => {
    setTime(item.time);
    setTitle(item.title);
    setCategory(item.category);
    setMemo(item.memo || '');
    setStatus(item.status);
    setTargetItem(item);
    setModalMode('edit');
  };

  // 삭제 핸들러
  const handleDelete = (itemId) => {
    if (!window.confirm('정말 이 일정을 삭제하시겠습니까?')) return;
    const updatedDays = days.map((day) => {
      if (day.id !== activeDayId) return day;
      return {
        ...day,
        items: day.items.filter((it) => it.id !== itemId),
      };
    });
    onUpdateDays(updatedDays);
  };

  // 저장 핸들러 (추가 및 수정)
  const handleSaveModal = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    let updatedDays;
    if (modalMode === 'add') {
      const newItem = {
        id: `item-${Date.now()}`,
        time,
        title: title.trim(),
        category,
        memo: memo.trim(),
        status,
      };
      updatedDays = days.map((day) => {
        if (day.id !== activeDayId) return day;
        const newItems = [...day.items, newItem].sort((a, b) => a.time.localeCompare(b.time));
        return { ...day, items: newItems };
      });
    } else if (modalMode === 'edit' && targetItem) {
      updatedDays = days.map((day) => {
        if (day.id !== activeDayId) return day;
        const newItems = day.items
          .map((it) =>
            it.id === targetItem.id
              ? { ...it, time, title: title.trim(), category, memo: memo.trim(), status }
              : it
          )
          .sort((a, b) => a.time.localeCompare(b.time));
        return { ...day, items: newItems };
      });
    }

    onUpdateDays(updatedDays);
    setModalMode(null);
  };

  return (
    <div className="bg-white rounded-2xl p-5 shadow-card border border-surface-container mb-6">
      {/* 섹션 헤더 */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-brand-100 text-brand-600 rounded-2xl">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-h3 font-extrabold text-on-surface">일자별 투어 타임라인</h2>
            <p className="text-xs text-slate-500">시간순 세부 여행 일정 관리</p>
          </div>
        </div>
        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-1 px-3 py-1.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold shadow-sm transition active:scale-95"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>일정 추가</span>
        </button>
      </div>

      {/* 일자별 Day 탭 바 */}
      <div className="flex gap-2 p-1.5 bg-surface-container-low rounded-2xl mb-5 overflow-x-auto no-scrollbar">
        {days.map((day) => {
          const isActive = day.id === activeDayId;
          return (
            <button
              key={day.id}
              onClick={() => setActiveDayId(day.id)}
              className={`flex-1 min-w-[90px] py-2 px-3 rounded-xl text-center transition flex flex-col items-center select-none ${
                isActive
                  ? 'bg-brand-600 text-white shadow-elevated'
                  : 'text-slate-600 hover:bg-white/60'
              }`}
            >
              <span className="text-xs font-extrabold tracking-wide">
                Day {day.dayNumber}
              </span>
              <span className={`text-[10px] mt-0.5 ${isActive ? 'text-brand-100' : 'text-slate-400'}`}>
                {day.date}
              </span>
            </button>
          );
        })}
      </div>

      {/* 현재 Day 테마 소개 */}
      <div className="mb-4 px-3 py-2 bg-brand-50/70 border border-brand-100 rounded-2xl flex items-center justify-between text-xs">
        <span className="font-bold text-brand-900">
          📍 Day {currentDay?.dayNumber} 테마: {currentDay?.title}
        </span>
        <span className="text-brand-600 font-medium">총 {currentDay?.items.length}개 일정</span>
      </div>

      {/* 타임라인 목록 */}
      <div className="relative pl-6 space-y-4 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-gradient-to-b before:from-brand-500 before:via-brand-300 before:to-slate-200">
        {currentDay?.items.length === 0 ? (
          <div className="text-center py-8 text-xs text-slate-400">
            등록된 일정이 없습니다. 우측 상단 '일정 추가'를 눌러보세요.
          </div>
        ) : (
          currentDay?.items.map((item) => {
            const CatIcon = CATEGORY_MAP[item.category]?.icon || Compass;
            const catStyle = CATEGORY_MAP[item.category]?.bg || 'bg-slate-100 text-slate-700';
            const statusConfig = STATUS_MAP[item.status] || STATUS_MAP.upcoming;
            const StatusIcon = statusConfig.icon;

            return (
              <div
                key={item.id}
                className="relative bg-white border border-slate-200 hover:border-brand-300 rounded-2xl p-3.5 shadow-card transition group"
              >
                {/* 타임라인 연결 점 */}
                <div className="absolute -left-[27px] top-4 w-4 h-4 rounded-full bg-white border-4 border-brand-500 shadow-card"></div>

                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    {/* 상단 태그 및 시간 */}
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-extrabold text-brand-700 font-mono bg-brand-50 px-2 py-0.5 rounded-lg border border-brand-200">
                        {item.time}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border flex items-center gap-1 ${catStyle}`}>
                        <CatIcon className="w-3 h-3" />
                        {item.category}
                      </span>
                      {/* 상태 토글 버튼 */}
                      <button
                        onClick={() => handleCycleStatus(item.id)}
                        className={`text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1 transition active:scale-95 ${statusConfig.badge}`}
                        title="클릭하여 상태 변경 (예정 → 진행 중 → 완료)"
                      >
                        <StatusIcon className="w-3 h-3" />
                        <span>{statusConfig.label}</span>
                      </button>
                    </div>

                    {/* 제목 */}
                    <h4 className="text-sm font-bold text-slate-900 mt-1 leading-snug">
                      {item.title}
                    </h4>

                    {/* 메모 */}
                    {item.memo && (
                      <p className="text-xs text-slate-500 mt-1 bg-slate-50 p-2 rounded-xl border border-slate-100">
                        {item.memo}
                      </p>
                    )}
                  </div>

                  {/* 편집 / 삭제 버튼 */}
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => handleOpenEdit(item)}
                      className="p-1.5 text-slate-400 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition"
                      title="수정"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition"
                      title="삭제"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* 일정 추가/수정 모달 */}
      {modalMode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-sm bg-white rounded-2xl p-6 shadow-elevated border border-slate-100 relative">
            <button
              onClick={() => setModalMode(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-slate-900 mb-1">
              {modalMode === 'add' ? `Day ${currentDay.dayNumber} 일정 추가` : '일정 수정'}
            </h3>
            <p className="text-xs text-slate-500 mb-4">시간과 카테고리, 세부 일정을 입력하세요</p>

            <form onSubmit={handleSaveModal} className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">시간</label>
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full p-2.5 text-xs rounded-xl border border-slate-200 font-mono font-bold focus:border-brand-500 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">카테고리</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full p-2.5 text-xs rounded-xl border border-slate-200 font-bold focus:border-brand-500 focus:outline-none"
                  >
                    <option value="관광">관광 🏛️</option>
                    <option value="식사">식사 🍜</option>
                    <option value="이동">이동 🚌</option>
                    <option value="숙소">숙소 🏨</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">일정 / 장소명</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="예: 시부야 스카이 전망대 관람"
                  className="w-full p-2.5 text-xs rounded-xl border border-slate-200 focus:border-brand-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">진행 상태</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full p-2.5 text-xs rounded-xl border border-slate-200 font-bold focus:border-brand-500 focus:outline-none"
                >
                  <option value="upcoming">예정 (Upcoming)</option>
                  <option value="in_progress">진행 중 (In Progress)</option>
                  <option value="completed">완료 (Completed)</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">상세 메모 / 안내</label>
                <textarea
                  rows={2}
                  value={memo}
                  onChange={(e) => setMemo(e.target.value)}
                  placeholder="예: 바우처 QR 지참 필수, 1층 로비 집합"
                  className="w-full p-2.5 text-xs rounded-xl border border-slate-200 focus:border-brand-500 focus:outline-none"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setModalMode(null)}
                  className="flex-1 py-2.5 text-xs font-bold text-slate-600 bg-slate-100 rounded-xl hover:bg-slate-200"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-md flex items-center justify-center gap-1"
                >
                  <Check className="w-4 h-4" />
                  저장하기
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
