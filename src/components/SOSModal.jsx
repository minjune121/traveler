import React, { useEffect, useState } from 'react';
import { X, Siren, PhoneCall, Copy, Check, ShieldAlert, Landmark, Ambulance, UserRound } from 'lucide-react';

const TYPE_META = {
  police: { icon: ShieldAlert, label: '경찰 · 警察 · Police' },
  ambulance: { icon: Ambulance, label: '화재·구급 · 消防/救急' },
  embassy: { icon: Landmark, label: '대사관 · 大使館 · Embassy' },
};

/**
 * 긴급 SOS 모달
 * - 최상단: 인솔 가이드 원터치 전화 (현지/한국 번호)
 * - 중단: 현지 경찰(110) / 구급(119) 대형 다이얼 타일
 * - 하단: 대한민국 대사관 및 영사콜센터
 */
export default function SOSModal({ contacts, onClose }) {
  const [copiedId, setCopiedId] = useState(null);

  const guide = contacts.find((c) => c.type === 'guide');
  const quickDial = contacts.filter((c) => c.type === 'police' || c.type === 'ambulance');
  const embassies = contacts.filter((c) => c.type === 'embassy');

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  const handleCopy = (id, phone) => {
    navigator.clipboard?.writeText(phone);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="긴급 SOS"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[440px] max-h-[92vh] bg-surface rounded-t-2xl sm:rounded-2xl shadow-elevated overflow-hidden flex flex-col"
      >
        {/* 헤더 */}
        <div className="bg-status-sos text-white px-5 pt-5 pb-4 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/15 hover:bg-white/25 transition"
            aria-label="닫기"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-white text-status-sos rounded-xl">
              <Siren className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-h2 font-extrabold leading-tight">긴급 SOS</h2>
              <p className="text-body-sm text-white/85">탭 한 번으로 바로 전화 연결됩니다</p>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* 1. 가이드 전화 */}
          {guide && (
            <section className="bg-white rounded-2xl p-4 shadow-card border border-surface-container">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-2 bg-brand-100 text-brand-700 rounded-xl">
                  <UserRound className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-body-lg font-extrabold text-on-surface truncate">{guide.title}</h3>
                  <p className="text-body-sm text-on-surface-variant">{guide.role}</p>
                </div>
              </div>
              <div className="space-y-2">
                <a
                  href={`tel:${guide.subPhone || guide.phone}`}
                  className="flex items-center justify-between w-full px-4 py-3.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl shadow-elevated transition active:scale-[0.98]"
                >
                  <span className="flex items-center gap-2 text-body-lg font-extrabold">
                    <PhoneCall className="w-5 h-5" /> 가이드에게 전화
                  </span>
                  <span className="text-body-sm font-mono font-bold text-white/90">
                    {guide.subPhone || guide.phone}
                  </span>
                </a>
                {guide.subPhone && (
                  <a
                    href={`tel:${guide.phone}`}
                    className="flex items-center justify-between w-full px-4 py-2.5 bg-brand-50 hover:bg-brand-100 text-brand-800 rounded-xl border border-brand-200 transition"
                  >
                    <span className="text-body-md font-bold">한국 번호로 걸기 (로밍)</span>
                    <span className="text-body-sm font-mono font-bold">{guide.phone}</span>
                  </a>
                )}
              </div>
            </section>
          )}

          {/* 2. 현지 긴급 번호 (경찰 / 구급) */}
          {quickDial.length > 0 && (
            <section>
              <h3 className="text-body-sm font-extrabold text-on-surface-variant mb-2 px-1">
                일본 현지 긴급 신고
              </h3>
              <div className="grid grid-cols-2 gap-2.5">
                {quickDial.map((c) => {
                  const Icon = TYPE_META[c.type]?.icon || ShieldAlert;
                  return (
                    <a
                      key={c.id}
                      href={`tel:${c.phone}`}
                      className="bg-white rounded-2xl p-4 shadow-card border-2 border-red-100 hover:border-status-sos flex flex-col items-center text-center transition active:scale-[0.98]"
                    >
                      <Icon className="w-6 h-6 text-status-sos mb-1" />
                      <span className="text-display font-extrabold text-status-sos leading-none">
                        {c.phone}
                      </span>
                      <span className="text-body-sm font-bold text-on-surface mt-1.5">
                        {TYPE_META[c.type]?.label || c.title}
                      </span>
                      <span className="text-caption text-on-surface-variant mt-0.5">{c.role}</span>
                    </a>
                  );
                })}
              </div>
            </section>
          )}

          {/* 3. 대사관 */}
          {embassies.map((c) => (
            <section
              key={c.id}
              className="bg-white rounded-2xl p-4 shadow-card border border-surface-container"
            >
              <div className="flex items-center gap-2 mb-1">
                <Landmark className="w-4 h-4 text-tertiary" />
                <h3 className="text-body-md font-extrabold text-on-surface">{c.title}</h3>
              </div>
              <p className="text-body-sm text-on-surface-variant mb-3">{c.role}</p>
              <div className="flex items-center gap-2">
                <a
                  href={`tel:${c.phone}`}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-tertiary-container text-on-tertiary-container rounded-xl text-body-md font-extrabold transition hover:brightness-95"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span className="font-mono">{c.phone}</span>
                </a>
                <button
                  onClick={() => handleCopy(c.id, c.phone)}
                  className="p-2.5 rounded-xl bg-surface-container-low border border-surface-container text-on-surface-variant hover:text-on-surface transition"
                  aria-label="번호 복사"
                >
                  {copiedId === c.id ? (
                    <Check className="w-4 h-4 text-status-done" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
              {c.subPhone && (
                <p className="text-caption text-on-surface-variant mt-2">{c.subPhone}</p>
              )}
            </section>
          ))}

          <p className="text-caption text-center text-outline pb-1">
            110·119는 일본 국내 무료 긴급번호입니다. 영어로 &quot;English, please&quot;라고 말하면 통역 연결을 도와줍니다.
          </p>
        </div>
      </div>
    </div>
  );
}
