import React, { useEffect, useState } from 'react';
import { X, Copy, Check, Phone, RotateCw, MapPin, Languages } from 'lucide-react';
import { INITIAL_DATA } from '../data/mockData';

/**
 * 현지어 택시 카드 모달
 * - 기사님께 그대로 보여주는 고대비 딥 다크 플래시카드 (DESIGN.md: Taxi Flashcard)
 * - 호텔명/주소를 큰 일본어 + 영어로 표시, 가로 모드(회전) 지원
 */
export default function TaxiCardModal({ hotelCard, onClose }) {
  const [copied, setCopied] = useState(false);
  const [landscape, setLandscape] = useState(false);
  const [lang, setLang] = useState('ja'); // 'ja' | 'en' — 주소 크게 보기 언어

  // 예전에 저장된 데이터(localStorage)에 영문 필드가 없을 수 있으므로 기본값으로 보완
  const fallback = INITIAL_DATA.hotelCard;
  const nameEn = hotelCard.nameEn || fallback.nameEn;
  const addressEn = hotelCard.addressEn || fallback.addressEn;
  const requestEn = hotelCard.requestEn || fallback.requestEn;

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

  const handleCopy = () => {
    const text = lang === 'ja' ? hotelCard.addressJa : addressEn;
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const card = (
    <div className="w-full h-full bg-gradient-to-br from-taxi to-taxi-deep text-white rounded-2xl shadow-elevated border border-slate-700 flex flex-col overflow-hidden">
      {/* 상단 바 */}
      <div className="flex items-center justify-between gap-2 px-5 pt-5">
        <span className="px-3 py-1 bg-secondary text-on-secondary font-extrabold text-xs rounded-full">
          🚕 運転手さんへ · To the Driver
        </span>
        <button
          onClick={onClose}
          className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
          aria-label="닫기"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
        {/* 요청 문구 */}
        <div>
          <p className="text-h2 font-extrabold leading-snug text-accent-300">
            {hotelCard.requestJa}
          </p>
          <p className="text-body-md font-semibold text-slate-300 mt-1">{requestEn}</p>
        </div>

        {/* 호텔명 */}
        <div className="bg-white/5 rounded-xl p-4 border border-accent-400/30">
          <span className="text-caption font-bold text-accent-300 uppercase tracking-wider">
            ホテル名 · Hotel
          </span>
          <p className="text-display font-extrabold leading-tight mt-1 break-keep">
            {hotelCard.nameJa}
          </p>
          <p className="text-h3 font-bold text-slate-200 mt-1">{nameEn}</p>
        </div>

        {/* 주소 (언어 전환) */}
        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
          <div className="flex items-center justify-between mb-1">
            <span className="text-caption font-bold text-accent-300 uppercase tracking-wider flex items-center gap-1">
              <MapPin className="w-3 h-3" /> 住所 · Address
            </span>
            <button
              onClick={() => setLang(lang === 'ja' ? 'en' : 'ja')}
              className="flex items-center gap-1 text-caption font-bold px-2 py-1 rounded-full bg-white/10 hover:bg-white/20 transition"
            >
              <Languages className="w-3 h-3" />
              {lang === 'ja' ? 'English' : '日本語'}
            </button>
          </div>
          <p className="text-h1 font-extrabold leading-snug">
            {lang === 'ja' ? hotelCard.addressJa : addressEn}
          </p>
          <p className="text-body-md text-slate-400 mt-1">
            {lang === 'ja' ? addressEn : hotelCard.addressJa}
          </p>
        </div>

        <p className="text-body-sm text-slate-400">
          📍 랜드마크: {hotelCard.landmark}
        </p>
      </div>

      {/* 하단 액션 */}
      <div className="grid grid-cols-3 gap-2 p-4 border-t border-white/10">
        <button
          onClick={() => setLandscape(!landscape)}
          className="flex flex-col items-center justify-center gap-1 py-2.5 bg-white/10 hover:bg-white/20 rounded-xl text-caption font-bold transition"
        >
          <RotateCw className="w-4 h-4" />
          {landscape ? '세로 보기' : '가로 보기'}
        </button>
        <button
          onClick={handleCopy}
          className="flex flex-col items-center justify-center gap-1 py-2.5 bg-white/10 hover:bg-white/20 rounded-xl text-caption font-bold transition"
        >
          {copied ? <Check className="w-4 h-4 text-accent-300" /> : <Copy className="w-4 h-4" />}
          {copied ? '복사됨' : '주소 복사'}
        </button>
        <a
          href={`tel:${hotelCard.tel}`}
          className="flex flex-col items-center justify-center gap-1 py-2.5 bg-secondary hover:bg-accent-500 text-on-secondary rounded-xl text-caption font-extrabold transition"
        >
          <Phone className="w-4 h-4" />
          호텔 전화
        </a>
      </div>
    </div>
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-taxi-deep/90 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-label="현지어 택시 카드"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={
          landscape
            ? // 화면을 90도 돌려 휴대폰을 가로로 들고 칸막이 너머 기사님께 보여줄 수 있도록
              'w-[92vh] h-[92vw] max-w-[720px] max-h-[440px] rotate-90'
            : 'w-full max-w-sm h-[88vh] max-h-[680px] p-4'
        }
      >
        {card}
      </div>
    </div>
  );
}
