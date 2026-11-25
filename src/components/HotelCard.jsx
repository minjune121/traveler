import React, { useState } from 'react';
import { Navigation, Copy, Check, Phone, Eye, X, MapPin } from 'lucide-react';

export default function HotelCard({ hotelCard }) {
  const [copied, setCopied] = useState(false);
  const [isZoomModalOpen, setIsZoomModalOpen] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard?.writeText(hotelCard.addressJa);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <div className="bg-gradient-to-br from-taxi to-taxi-deep text-white rounded-2xl p-5 shadow-elevated border border-slate-700 mb-6 relative overflow-hidden">
        {/* 배경 은은한 포인트 패턴 */}
        <div className="absolute top-0 right-0 w-36 h-36 bg-accent-400/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-accent-400 text-slate-900 rounded-xl font-bold text-xs flex items-center gap-1">
              🚕 TAXI CARD
            </span>
            <span className="text-xs font-medium text-slate-300">
              현지 택시 전용 카드
            </span>
          </div>

          <button
            onClick={() => setIsZoomModalOpen(true)}
            className="flex items-center gap-1 text-xs font-bold px-3 py-1 bg-white/10 hover:bg-white/20 text-accent-300 rounded-xl transition border border-white/15"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>기사님 보여주기 (확대)</span>
          </button>
        </div>

        {/* 택시 기사용 요청 문구 (일본어 강조) */}
        <div className="bg-black/30 rounded-xl p-4 border border-accent-400/30 my-3">
          <p className="text-[11px] font-bold text-accent-300 mb-1">
            📢 기사님께 바로 보여주세요!
          </p>
          <p className="text-h2 font-extrabold text-white leading-relaxed tracking-wide">
            {hotelCard.requestJa}
          </p>
          <p className="text-xs text-slate-300 mt-1 font-medium">
            ({hotelCard.requestKo})
          </p>
        </div>

        {/* 호텔 상세 주소 & 명칭 */}
        <div className="space-y-2 text-xs">
          <div>
            <span className="text-[10px] text-accent-300 font-bold block">
              호텔명 (Hotel Name)
            </span>
            <p className="text-sm font-extrabold text-white">
              {hotelCard.nameJa}{' '}
              <span className="text-xs font-normal text-slate-300">
                ({hotelCard.nameKo})
              </span>
            </p>
          </div>

          <div>
            <span className="text-[10px] text-accent-300 font-bold block">
              현지 일본어 주소 (Address)
            </span>
            <p className="text-xs text-slate-200 font-medium">
              {hotelCard.addressJa}
            </p>
          </div>

          <div className="pt-2 flex items-center justify-between text-[11px] text-slate-300 border-t border-white/10">
            <span>주요 랜드마크: {hotelCard.landmark}</span>
          </div>
        </div>

        {/* 하단 액션 버튼 (주소 복사 / 전화 걸기) */}
        <div className="grid grid-cols-2 gap-2 mt-4">
          <button
            onClick={handleCopyAddress}
            className="flex items-center justify-center gap-1.5 py-2.5 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-bold transition border border-white/10"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-accent-300" />
                <span>주소 복사됨</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>일본어 주소 복사</span>
              </>
            )}
          </button>

          <a
            href={`tel:${hotelCard.tel}`}
            className="flex items-center justify-center gap-1.5 py-2.5 bg-accent-400 hover:bg-accent-500 text-slate-900 rounded-xl text-xs font-bold transition shadow-md"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>호텔 프론트 전화</span>
          </a>
        </div>
      </div>

      {/* 기사님 보여주기 초대형 확대 모달 */}
      {isZoomModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-taxi-deep/90 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-sm bg-white rounded-2xl p-6 shadow-elevated relative text-slate-900 flex flex-col justify-between min-h-[460px]">
            <button
              onClick={() => setIsZoomModalOpen(false)}
              className="absolute top-4 right-4 p-2.5 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200"
            >
              <X className="w-6 h-6" />
            </button>

            <div>
              <div className="inline-block px-3 py-1 bg-accent-400 text-slate-900 font-black text-xs rounded-full mb-3">
                🚕 運転手さんへ (기사님께 보여주세요)
              </div>

              {/* 초대형 일본어 문구 */}
              <div className="p-4 bg-slate-100 rounded-2xl border-2 border-slate-300 mb-4">
                <p className="text-2xl font-black text-slate-950 leading-snug mb-2">
                  {hotelCard.requestJa}
                </p>
                <p className="text-xs text-slate-500 font-medium">
                  {hotelCard.requestKo}
                </p>
              </div>

              {/* 호텔명 및 상세 주소 (큰 글씨) */}
              <div className="space-y-3">
                <div className="bg-brand-50 p-3 rounded-2xl border border-brand-200">
                  <span className="text-[11px] font-bold text-brand-700 block">목적지 명칭</span>
                  <p className="text-xl font-black text-slate-900">
                    {hotelCard.nameJa}
                  </p>
                </div>

                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
                  <span className="text-[11px] font-bold text-slate-500 block">목적지 일본어 주소</span>
                  <p className="text-base font-bold text-slate-800 leading-normal">
                    {hotelCard.addressJa}
                  </p>
                </div>

                <p className="text-xs text-slate-500 text-center">
                  랜드마크: {hotelCard.landmark}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsZoomModalOpen(false)}
              className="mt-6 w-full py-3.5 bg-taxi-deep text-white rounded-xl font-bold text-sm"
            >
              닫기 (Close)
            </button>
          </div>
        </div>
      )}
    </>
  );
}
