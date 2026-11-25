import React, { useState } from 'react';
import { Ticket, QrCode, Plane, Hotel, Sparkles, ChevronRight, Copy, Check } from 'lucide-react';
import QRModal from './QRModal';

export default function VoucherSection({ vouchers }) {
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  const handleCopyCode = (e, voucher) => {
    e.stopPropagation();
    navigator.clipboard?.writeText(voucher.code);
    setCopiedId(voucher.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="bg-white rounded-2xl p-5 shadow-card border border-surface-container mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-brand-100 text-brand-600 rounded-2xl">
            <Ticket className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-h3 font-extrabold text-on-surface">모바일 바우처 월렛</h2>
            <p className="text-xs text-slate-500">클릭 시 현장 제시용 QR코드 확대</p>
          </div>
        </div>
        <span className="text-xs font-bold px-2 py-0.5 bg-brand-50 text-brand-700 rounded-lg">
          {vouchers.length}개 보유
        </span>
      </div>

      <div className="space-y-3">
        {vouchers.map((voucher) => {
          return (
            <div
              key={voucher.id}
              onClick={() => setSelectedVoucher(voucher)}
              className="p-4 rounded-2xl border border-slate-200 hover:border-brand-400 bg-white shadow-card hover:shadow-elevated transition cursor-pointer select-none relative overflow-hidden group"
            >
              {/* 우측 상단 장식 바우처 배지 */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-extrabold px-2.5 py-0.5 bg-brand-100 text-brand-700 rounded-full">
                  {voucher.badge}
                </span>
                <span className="text-[11px] text-slate-400 font-medium">
                  {voucher.issuer}
                </span>
              </div>

              {/* 제목 및 세부내용 */}
              <h4 className="text-sm font-bold text-slate-900 group-hover:text-brand-700 transition">
                {voucher.title}
              </h4>
              <p className="text-xs text-slate-500 mt-1 leading-snug">
                {voucher.details}
              </p>

              {/* 하단 바코드/QR 버튼 영역 */}
              <div className="mt-3 pt-3 border-t border-dashed border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="font-mono text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md">
                    {voucher.code}
                  </span>
                  <button
                    onClick={(e) => handleCopyCode(e, voucher)}
                    className="p-1 text-slate-400 hover:text-slate-700 rounded hover:bg-slate-200 transition"
                    title="코드 복사"
                  >
                    {copiedId === voucher.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                <div className="flex items-center gap-1 text-xs font-bold text-on-secondary bg-secondary px-3 py-1 rounded-xl group-hover:bg-accent-500 transition">
                  <QrCode className="w-3.5 h-3.5" />
                  <span>QR 보기</span>
                  <ChevronRight className="w-3 h-3" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* QR 확대 모달 */}
      <QRModal
        voucher={selectedVoucher}
        onClose={() => setSelectedVoucher(null)}
      />
    </div>
  );
}
