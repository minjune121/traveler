import React, { useState } from 'react';
import { CheckSquare, Plus, Trash2, CheckCircle2, Circle, Sparkles } from 'lucide-react';

export default function ChecklistSection({ checklists, onUpdateChecklists }) {
  const [newTitle, setNewTitle] = useState('');
  const [category, setCategory] = useState('준비물');
  const [filter, setFilter] = useState('all'); // all, 준비물, 인원

  // 토글 핸들러
  const handleToggle = (id) => {
    const updated = checklists.map((item) =>
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    onUpdateChecklists(updated);
  };

  // 삭제 핸들러
  const handleDelete = (id) => {
    const updated = checklists.filter((item) => item.id !== id);
    onUpdateChecklists(updated);
  };

  // 신규 추가 핸들러
  const handleAdd = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newItem = {
      id: `check-${Date.now()}`,
      title: newTitle.trim(),
      category: category,
      completed: false,
    };
    onUpdateChecklists([...checklists, newItem]);
    setNewTitle('');
  };

  // 진행률 계산
  const total = checklists.length;
  const completedCount = checklists.filter((item) => item.completed).length;
  const percentage = total === 0 ? 0 : Math.round((completedCount / total) * 100);

  const filteredItems = checklists.filter((item) => {
    if (filter === 'all') return true;
    return item.category === filter;
  });

  return (
    <div className="bg-white rounded-2xl p-5 shadow-card border border-surface-container mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-brand-100 text-brand-600 rounded-2xl">
            <CheckSquare className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-h3 font-extrabold text-on-surface">현장 점검 & 준비물 체크</h2>
            <p className="text-xs text-slate-500">인원 출석 및 필수 소지품 현황</p>
          </div>
        </div>
        <span className="text-xs font-bold px-2.5 py-1 bg-secondary text-on-secondary rounded-full">
          {completedCount}/{total} 완료
        </span>
      </div>

      {/* 진행률 프로그레스 바 */}
      <div className="mb-5 bg-surface-container-low p-3.5 rounded-xl border border-surface-container">
        <div className="flex items-center justify-between text-xs font-bold mb-1.5">
          <span className="text-slate-600 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-accent-500" /> 전체 준비 완료율
          </span>
          <span className="text-brand-600 font-extrabold text-sm">{percentage}%</span>
        </div>
        <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden p-0.5">
          <div
            className="h-full bg-gradient-to-r from-brand-500 to-accent-400 rounded-full transition-all duration-500"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* 필터 탭 */}
      <div className="flex gap-1.5 mb-3">
        {['all', '준비물', '인원'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition ${
              filter === f
                ? 'bg-brand-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {f === 'all' ? '전체 보기' : f}
          </button>
        ))}
      </div>

      {/* 체크리스트 항목들 */}
      <div className="space-y-2 mb-4">
        {filteredItems.length === 0 ? (
          <div className="text-center py-6 text-xs text-slate-400">
            등록된 점검 항목이 없습니다.
          </div>
        ) : (
          filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => handleToggle(item.id)}
              className={`flex items-center justify-between p-3 rounded-2xl border transition cursor-pointer select-none ${
                item.completed
                  ? 'bg-brand-50/40 border-brand-200/60 text-slate-400'
                  : 'bg-white border-slate-200 hover:border-brand-300 shadow-card'
              }`}
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <button
                  type="button"
                  className="shrink-0 text-brand-600 focus:outline-none"
                >
                  {item.completed ? (
                    <CheckCircle2 className="w-5 h-5 text-brand-600 fill-brand-100" />
                  ) : (
                    <Circle className="w-5 h-5 text-slate-300 hover:text-brand-400" />
                  )}
                </button>
                <div className="flex-1 min-w-0">
                  <span
                    className={`text-xs font-medium block truncate ${
                      item.completed ? 'line-through text-slate-400' : 'text-slate-800'
                    }`}
                  >
                    {item.title}
                  </span>
                </div>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                    item.category === '인원'
                      ? 'bg-tertiary-container text-on-tertiary-container'
                      : 'bg-secondary-container text-on-secondary-container'
                  }`}
                >
                  {item.category}
                </span>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(item.id);
                }}
                className="ml-2 p-1.5 text-slate-300 hover:text-red-500 rounded-lg hover:bg-red-50 transition"
                title="삭제"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))
        )}
      </div>

      {/* 신규 항목 추가 폼 */}
      <form onSubmit={handleAdd} className="flex gap-2 items-center pt-2 border-t border-slate-100">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="text-xs font-bold py-2 px-2.5 bg-slate-100 rounded-xl border border-slate-200 text-slate-700 focus:outline-none focus:border-brand-500"
        >
          <option value="준비물">준비물</option>
          <option value="인원">인원</option>
        </select>
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="점검할 항목 입력 (예: 여권, 우산)"
          className="flex-1 text-xs py-2 px-3 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
        />
        <button
          type="submit"
          className="p-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl shadow-sm transition active:scale-95"
          title="추가"
        >
          <Plus className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
