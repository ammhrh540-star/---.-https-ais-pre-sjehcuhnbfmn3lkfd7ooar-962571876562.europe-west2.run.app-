import React, { useState, useEffect } from "react";
import { Clock, ShieldAlert, Award, Radio } from "lucide-react";

export default function VettingStatusIndicator() {
  // Initialize countdown with a realistic duration, e.g., 18 minutes and 42 seconds (1122 seconds)
  const [timeLeft, setTimeLeft] = useState(1122);
  const [activeAuditors, setActiveAuditors] = useState(3);
  const [pendingApplications, setPendingApplications] = useState(5);

  useEffect(() => {
    // Live ticking countdown timer
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Reset to a randomized elegant duration (between 12 and 22 minutes) to keep the feel authentic
          return Math.floor(Math.random() * (1320 - 720 + 1)) + 720;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Dynamic slight variations in system metrics to feel live and genuine
    const statsInterval = setInterval(() => {
      setActiveAuditors((prev) => {
        const change = Math.random() > 0.5 ? 1 : -1;
        const newVal = prev + change;
        return newVal >= 2 && newVal <= 5 ? newVal : prev;
      });
      setPendingApplications((prev) => {
        const change = Math.random() > 0.6 ? 1 : -1;
        const newVal = prev + change;
        return newVal >= 3 && newVal <= 8 ? newVal : prev;
      });
    }, 8000);

    return () => clearInterval(statsInterval);
  }, []);

  // Format time as MM:SS with leading zeros
  const formatTime = (secondsTotal: number) => {
    const minutes = Math.floor(secondsTotal / 60);
    const seconds = secondsTotal % 60;
    const pad = (num: number) => String(num).padStart(2, "0");
    return {
      minutes: pad(minutes),
      seconds: pad(seconds),
    };
  };

  const timeFormatted = formatTime(timeLeft);

  return (
    <div 
      dir="rtl" 
      className="bg-[#110f0c] border border-[#c5a85c]/25 rounded-2xl p-5 md:p-6 shadow-[0_15px_45px_rgba(0,0,0,0.4)] relative overflow-hidden animate-fadeIn"
    >
      {/* Decorative luxury gold hairline glow */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#c5a85c]/40 to-transparent" />
      
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
        
        {/* Right Area: Core Message & Live Pulse */}
        <div className="space-y-2.5">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-emerald-400 text-xs font-bold font-sans">
              لوحة الفرز والتحقق اليدوي الخطي (مباشر الآن)
            </span>
          </div>
          
          <h3 className="text-base font-black text-transparent bg-clip-text bg-gradient-to-b from-[#f3da90] to-[#c5a85c] flex items-center gap-2">
            <Award size={18} className="text-[#c5a85c] shrink-0" />
            <span>نظام التدقيق العائلي فائق الخصوصية</span>
          </h3>
          
          <p className="text-xs text-[#b9b1a2] max-w-xl font-light leading-relaxed">
            تتم مراجعة الطلبات بدقة فائقة من قبل لجنة الإشراف النسائية والرجالية المختصة، للتحقق من المكانة الاجتماعية وتأكيد الجدية الكاملة لكل عضو لضمان بيئة تليق بصفوة المجتمع.
          </p>
        </div>

        {/* Left Area: Countdown and Stats Widgets */}
        <div className="grid grid-cols-2 lg:flex lg:items-center gap-4 lg:gap-6 shrink-0 border-t border-stone-800 pt-4 lg:pt-0 lg:border-t-0 lg:border-r lg:pr-6 border-[#c5a85c]/20">
          
          {/* Live Dynamic Ticking Countdown Box */}
          <div className="bg-[#1c1914] border border-[#c5a85c]/15 rounded-xl p-3 text-center min-w-[120px] lg:min-w-[140px] space-y-1">
            <span className="text-[10px] text-[#f3da90] font-bold block">الوقت التقديري للمراجعة</span>
            
            <div className="flex items-center justify-center gap-1 font-mono text-xl font-black text-[#f3da90]">
              <Clock size={14} className="text-[#c5a85c] opacity-85 animate-pulse" />
              <span className="bg-[#0c0b08] px-1.5 py-0.5 border border-[#c5a85c]/20 rounded text-[#f3da90]">{timeFormatted.minutes}</span>
              <span className="text-stone-500 text-sm animate-pulse">:</span>
              <span className="bg-[#0c0b08] px-1.5 py-0.5 border border-[#c5a85c]/20 rounded text-[#f3da90]">{timeFormatted.seconds}</span>
            </div>
            
            <span className="text-[9px] text-[#b9b1a2] font-light block">معدل متبقي لدورة الفرز</span>
          </div>

          {/* Secure Handcrafted Queue Stats */}
          <div className="space-y-2">
            {/* Stat Row 1 */}
            <div className="flex items-center gap-2 text-right">
              <Radio size={12} className="text-[#c5a85c] animate-pulse" />
              <span className="text-[10px] text-[#b9b1a2]">المشرفون النشطون:</span>
              <span className="text-[10.5px] font-mono font-bold text-emerald-400">
                {activeAuditors} خبراء
              </span>
            </div>
            {/* Stat Row 2 */}
            <div className="flex items-center gap-2 text-right">
              <ShieldAlert size={12} className="text-[#c5a85c]" />
              <span className="text-[10px] text-[#b9b1a2]">الطلبات قيد المراجعة:</span>
              <span className="text-[10.5px] font-mono font-bold text-[#f3da90]">
                {pendingApplications} طلبات
              </span>
            </div>
            {/* Stat Row 3 */}
            <div className="text-[9px] text-[#b9b1a2]/70 font-light text-center leading-none">
              معدل القبول النهائي: <span className="font-bold text-[#c5a85c]">4.2%</span> فقط
            </div>
          </div>

        </div>
        
      </div>
    </div>
  );
}
