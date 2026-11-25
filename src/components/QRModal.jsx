import React, { useState } from 'react';
import { X, Copy, Check, QrCode } from 'lucide-react';

export default function QRModal({ voucher, onClose }) {
  const [copied, setCopied] = useState(false);

  if (!voucher) return null;

  const handleCopy = () => {
    navigator.clipboard?.writeText(voucher.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-sm bg-white rounded-2xl p-6 shadow-elevated border border-slate-100 flex flex-col items-center text-center relative animate-scale-up">
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 transition"
          aria-label="닫기"
        >
          <X className="w-5 h-5" />
        </button>

        {/* 바우처 배지 & 제목 */}
        <span className="px-3 py-1 bg-brand-100 text-brand-700 font-bold text-xs rounded-full mb-2">
          {voucher.badge || '디지털 바우처'}
        </span>
        <h3 className="text-xl font-bold text-slate-900 leading-snug">
          {voucher.title}
        </h3>
        <p className="text-xs text-slate-500 mt-1">{voucher.issuer}</p>

        {/* 목업 QR 코드 그래픽 */}
        <div className="mt-5 p-4 bg-white border-2 border-dashed border-brand-300 rounded-2xl shadow-inner flex flex-col items-center">
          <div className="w-48 h-48 bg-slate-900 rounded-xl p-3 flex flex-col justify-between items-center relative overflow-hidden">
            {/* 고해상도 QR 패턴 시뮬레이션 */}
            <div className="w-full h-full grid grid-cols-6 grid-rows-6 gap-1 p-1 bg-white rounded-lg">
              {/* 모서리 위치 표시 마커 3개 */}
              <div className="col-span-2 row-span-2 bg-slate-950 p-1 rounded-sm flex items-center justify-center">
                <div className="w-full h-full border-2 border-white bg-slate-950 flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-xs"></div>
                </div>
              </div>
              <div className="col-span-2 bg-slate-900"></div>
              <div className="col-span-2 row-span-2 bg-slate-950 p-1 rounded-sm flex items-center justify-center">
                <div className="w-full h-full border-2 border-white bg-slate-950 flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-xs"></div>
                </div>
              </div>

              <div className="col-span-2 bg-slate-900"></div>
              <div className="bg-slate-900"></div>
              <div className="bg-slate-900"></div>

              <div className="col-span-2 row-span-2 bg-slate-950 p-1 rounded-sm flex items-center justify-center">
                <div className="w-full h-full border-2 border-white bg-slate-950 flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-xs"></div>
                </div>
              </div>
              <div className="bg-slate-900"></div>
              <div className="bg-slate-900"></div>
              <div className="col-span-2 bg-slate-900"></div>

              <div className="col-span-4 bg-slate-900"></div>

              <div className="bg-slate-900"></div>
              <div className="col-span-2 bg-slate-900"></div>
              <div className="col-span-3 bg-slate-900"></div>
            </div>

            {/* 가운데 로고 배지 */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-accent-400 text-slate-900 p-1.5 rounded-lg shadow-md border-2 border-white">
                <QrCode className="w-5 h-5" />
              </div>
            </div>
          </div>
          <span className="text-[11px] text-slate-400 mt-2 font-mono">
            현장 리더기에 스캔해 주세요
          </span>
        </div>

        {/* 예약 번호 & 복사 */}
        <div className="mt-4 w-full bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center justify-between">
          <div className="text-left">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block">
              예약 식별 번호 (Code)
            </span>
            <span className="text-sm font-mono font-bold text-slate-800">
              {voucher.code}
            </span>
          </div>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 px-3 py-1.5 bg-brand-600 hover:bg-brand-700 text-white rounded-lg text-xs font-semibold shadow-sm transition active:scale-95"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-accent-300" />
                <span>복사됨</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>복사</span>
              </>
            )}
          </button>
        </div>

        {/* 상세 안내 정보 */}
        <div className="mt-3 text-xs text-slate-600 bg-brand-50/60 p-2.5 rounded-xl w-full text-left border border-brand-100">
          <p className="font-semibold text-brand-900 mb-0.5">상세 내용</p>
          <p className="text-slate-600">{voucher.details}</p>
        </div>

        <button
          onClick={onClose}
          className="mt-5 w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-bold text-sm shadow-md transition"
        >
          확인 완료
        </button>
      </div>
    </div>
  );
}
