import React, { useState } from 'react';
import { ShieldAlert, PhoneCall, Copy, Check, ExternalLink } from 'lucide-react';

export default function EmergencyContacts({ contacts }) {
  const [copiedId, setCopiedId] = useState(null);

  const handleCopy = (id, phone) => {
    navigator.clipboard?.writeText(phone);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="bg-white rounded-2xl p-5 shadow-card border border-surface-container mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-red-100 text-red-600 rounded-2xl">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-h3 font-extrabold text-on-surface">현지 긴급 연락처 (SOS)</h2>
            <p className="text-xs text-slate-500">인솔 가이드 및 재외공관 긴급 지원</p>
          </div>
        </div>
        <span className="text-[11px] font-bold px-2 py-0.5 bg-red-50 text-red-600 rounded-full">
          24시간 대응
        </span>
      </div>

      <div className="grid grid-cols-1 gap-2.5">
        {contacts.map((contact) => {
          return (
            <div
              key={contact.id}
              className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50/50 flex items-center justify-between gap-3 hover:border-slate-300 transition"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <h4 className="text-xs font-extrabold text-slate-900 truncate">
                    {contact.title}
                  </h4>
                  <span className="text-[10px] text-slate-500 font-medium">
                    • {contact.role}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-slate-700">
                    {contact.phone}
                  </span>
                  {contact.subPhone && (
                    <span className="text-[10px] text-slate-400 truncate">
                      ({contact.subPhone})
                    </span>
                  )}
                </div>
              </div>

              {/* 통화 & 복사 액션 버튼 */}
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={() => handleCopy(contact.id, contact.phone)}
                  className="p-2 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition shadow-2xs"
                  title="전화번호 복사"
                >
                  {copiedId === contact.id ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
                <a
                  href={`tel:${contact.phone}`}
                  className="flex items-center gap-1 px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl text-xs font-bold shadow-sm transition active:scale-95"
                  title="전화 걸기"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>연결</span>
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
