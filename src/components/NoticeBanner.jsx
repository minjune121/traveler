import React, { useState } from 'react';
import { Megaphone, Edit3, Check, X, Clock, User } from 'lucide-react';

export default function NoticeBanner({ notice, onUpdateNotice }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draftText, setDraftText] = useState(notice?.text || '');
  const [author, setAuthor] = useState(notice?.author || '가이드');

  const handleOpenEdit = () => {
    setDraftText(notice?.text || '');
    setAuthor(notice?.author || '가이드');
    setIsEditing(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!draftText.trim()) return;

    const now = new Date();
    const timeStr = `${now.getMonth() + 1}.${now.getDate()} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    onUpdateNotice({
      ...notice,
      text: draftText.trim(),
      author: author.trim() || '가이드',
      updatedAt: timeStr,
    });
    setIsEditing(false);
  };

  return (
    <>
      {/* 화면 상단 고정 공지 배너 (Sticky) */}
      <div className="sticky top-0 z-30 w-full bg-gradient-to-r from-accent-400 via-accent-300 to-accent-400 text-slate-900 shadow-md border-b-2 border-accent-500">
        <div className="max-w-md mx-auto px-4 py-2.5 flex items-center justify-between gap-3">
          <div className="flex items-start gap-2.5 flex-1 min-w-0">
            <div className="p-1.5 bg-slate-900 text-accent-400 rounded-lg shrink-0 mt-0.5 shadow-sm animate-bounce">
              <Megaphone className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-800">
                <span className="bg-brand-600 text-white px-1.5 py-0.2 rounded text-[10px] font-bold">
                  긴급 공지
                </span>
                <span className="text-slate-600 truncate">
                  {notice?.author} • {notice?.updatedAt}
                </span>
              </div>
              <p className="text-xs font-semibold text-slate-900 truncate mt-0.5 leading-snug">
                {notice?.text}
              </p>
            </div>
          </div>

          <button
            onClick={handleOpenEdit}
            className="flex items-center gap-1 px-2.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-accent-300 text-xs font-bold rounded-xl shrink-0 shadow-sm transition active:scale-95"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>수정</span>
          </button>
        </div>
      </div>

      {/* 공지 수정 모달 */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-sm bg-white rounded-2xl p-6 shadow-elevated border border-slate-100 relative">
            <button
              onClick={() => setIsEditing(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 bg-accent-100 text-accent-700 rounded-xl">
                <Megaphone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">현장 공지 수정</h3>
                <p className="text-xs text-slate-500">모든 여행객 상단 배너에 즉시 반영됩니다</p>
              </div>
            </div>

            <form onSubmit={handleSave} className="space-y-3 mt-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  작성자 / 가이드명
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
                    placeholder="예: 김인솔 가이드"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  공지 내용
                </label>
                <textarea
                  rows={4}
                  value={draftText}
                  onChange={(e) => setDraftText(e.target.value)}
                  className="w-full p-3 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
                  placeholder="공지할 핵심 일정을 입력하세요 (예: 집합 시간, 조식 장소 등)"
                  required
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="flex-1 py-2.5 text-xs font-bold text-slate-600 bg-slate-100 rounded-xl hover:bg-slate-200"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 text-xs font-bold text-slate-900 bg-accent-400 hover:bg-accent-500 rounded-xl shadow-md flex items-center justify-center gap-1"
                >
                  <Check className="w-4 h-4" />
                  공지 등록하기
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
