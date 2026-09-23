import React, { useState } from 'react';
import { Gift, Copy, Check, QrCode, Heart, Sparkles } from 'lucide-react';
import { WeddingData, BankAccount } from '../types';
import { useLanguage } from '../i18n/LanguageContext';

interface GiftBoxSectionProps {
  weddingData: WeddingData;
}

export const GiftBoxSection: React.FC<GiftBoxSectionProps> = ({ weddingData }) => {
  const { t } = useLanguage();
  const [copiedBankId, setCopiedBankId] = useState<string | null>(null);

  const handleCopyNumber = (account: BankAccount) => {
    navigator.clipboard.writeText(account.accountNumber).then(() => {
      setCopiedBankId(account.id);
      setTimeout(() => setCopiedBankId(null), 2500);
    });
  };

  const generateVietQrUrl = (account: BankAccount) => {
    if (account.qrUrl) return account.qrUrl;
    const addInfo = encodeURIComponent(`Mung cuoi ${account.ownerType === 'groom' ? weddingData.groom.shortName : weddingData.bride.shortName}`);
    return `https://img.vietqr.io/image/${account.bankCode}-${account.accountNumber}-compact2.png?amount=&addInfo=${addInfo}&accountName=${encodeURIComponent(account.ownerName)}`;
  };

  return (
    <section id="hop-mung-cuoi" className="py-20 sm:py-24 bg-white relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAF2ED] border border-[#ECD9CC] text-[#915442] text-xs font-semibold uppercase tracking-widest mb-3">
            <Gift className="w-3.5 h-3.5 text-[#B87A65]" />
            <span>{t.giftBox.badge}</span>
          </div>
          <h2 className="font-serif-title text-3xl sm:text-4xl text-[#332620] font-bold">
            {t.giftBox.title}
          </h2>
          <p className="mt-3 text-[#6E5B4F] text-sm leading-relaxed">
            {t.giftBox.subtitle}
          </p>
        </div>

        {/* Bank Account Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {weddingData.bankAccounts.map((account) => {
            const isGroom = account.ownerType === 'groom';
            const qrImage = generateVietQrUrl(account);

            return (
              <div
                key={account.id}
                className="bg-[#FAF7F4] rounded-3xl p-6 sm:p-8 border border-[#EFE4DA] shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center relative"
              >
                {/* Badge */}
                <div
                  className={`px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-white mb-5 ${
                    isGroom ? 'bg-[#8A4F3D]' : 'bg-[#C8755D]'
                  }`}
                >
                  {isGroom ? t.giftBox.groomBadge : t.giftBox.brideBadge}
                </div>

                {/* QR Code Container */}
                <div className="bg-white p-3 rounded-2xl shadow-sm border border-[#E8DCD1] mb-5 group relative">
                  <img
                    src={qrImage}
                    alt={`Mã QR ${account.ownerName}`}
                    className="w-48 h-48 sm:w-52 sm:h-52 object-contain rounded-lg"
                    onError={(e) => {
                      // Fallback if VietQR fails or custom QR
                      (e.target as HTMLImageElement).src = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=STK:${account.accountNumber}-${account.bankName}`;
                    }}
                  />
                  <div className="mt-2 text-[11px] text-[#8C7467] font-medium flex items-center justify-center gap-1">
                    <QrCode className="w-3 h-3 text-[#B87A65]" />
                    <span>{t.giftBox.qrHint}</span>
                  </div>
                </div>

                {/* Bank Details */}
                <div className="space-y-1.5 w-full">
                  <div className="text-xs uppercase tracking-wider text-[#8A7367] font-medium">
                    {account.bankName}
                  </div>
                  <div className="font-semibold text-lg text-[#33251F]">
                    {account.ownerName}
                  </div>

                  {/* Account number with copy button */}
                  <div className="pt-2">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-[#DECBC0] text-sm text-[#4A3B32]">
                      <span className="font-mono font-bold text-base tracking-wider text-[#8A4F3D]">
                        {account.accountNumber}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopyNumber(account)}
                        className="p-1.5 rounded-lg hover:bg-[#FAF4EF] text-[#8A4F3D] transition-colors"
                        title={t.giftBox.copyAccount}
                      >
                        {copiedBankId === account.id ? (
                          <Check className="w-4 h-4 text-green-600" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                    {copiedBankId === account.id && (
                      <p className="text-xs text-green-600 font-medium mt-1 animate-in fade-in">
                        {t.giftBox.accountCopied}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Heartfelt Thank You Note */}
        <div className="mt-12 text-center max-w-lg mx-auto bg-[#FAF4EF] border border-[#ECD9CD] rounded-2xl p-6">
          <Heart className="w-5 h-5 fill-[#D48166] text-[#D48166] mx-auto mb-2" />
          <p className="text-xs sm:text-sm text-[#6E5B4F] leading-relaxed italic">
            {t.giftBox.thankYouNote}
          </p>
        </div>
      </div>
    </section>
  );
};
