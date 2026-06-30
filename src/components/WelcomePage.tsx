import React from "react";
import { motion } from "motion/react";
import { 
  ShieldCheck, 
  ArrowLeft,
  Lock,
  Heart,
  Crown
} from "lucide-react";

interface WelcomePageProps {
  onEnter: () => void;
}

export default function WelcomePage({ onEnter }: WelcomePageProps) {
  return (
    <div 
      dir="rtl" 
      className="min-h-screen bg-[#0a0907] text-[#e4dfd5] font-sans relative flex items-center justify-center overflow-hidden px-4 selection:bg-[#c5a85c]/30 selection:text-white"
    >
      {/* 🖤 Golden Radial luxury light leak */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#c5a85c]/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#9c824a]/3 rounded-full blur-[150px] pointer-events-none" />

      {/* 🖤 Top-Left Glossy Obsidian & Gold Metallic Wave (Matches the image but in Black & Gold) */}
      <div className="absolute top-0 left-0 w-[260px] h-[260px] md:w-[420px] md:h-[420px] pointer-events-none select-none z-0">
        <svg viewBox="0 0 100 100" className="w-full h-full fill-none">
          {/* Glossy Black body */}
          <path d="M 0,0 L 100,0 Q 65,35 35,65 Q 12,82 0,100 Z" fill="url(#glossyObsidian)" />
          {/* Gold highlights */}
          <path d="M 100,0 Q 65,35 35,65 Q 12,82 0,100" stroke="url(#goldMetallic)" strokeWidth="1.2" />
          <path d="M 97,0 Q 64,33 34,63 Q 11,80 0,97" stroke="#f3da90" strokeWidth="0.4" opacity="0.5" />
        </svg>
      </div>

      {/* 🖤 Bottom-Right Glossy Obsidian & Gold Metallic Wave */}
      <div className="absolute bottom-0 right-0 w-[260px] h-[260px] md:w-[420px] md:h-[420px] pointer-events-none select-none z-0">
        <svg viewBox="0 0 100 100" className="w-full h-full fill-none transform rotate-180">
          {/* Glossy Black body */}
          <path d="M 0,0 L 100,0 Q 65,35 35,65 Q 12,82 0,100 Z" fill="url(#glossyObsidian)" />
          {/* Gold highlights */}
          <path d="M 100,0 Q 65,35 35,65 Q 12,82 0,100" stroke="url(#goldMetallic)" strokeWidth="1.2" />
          <path d="M 97,0 Q 64,33 34,63 Q 11,80 0,97" stroke="#f3da90" strokeWidth="0.4" opacity="0.5" />
        </svg>
      </div>

      {/* 🍃 Top-Right Elite Plant Leaves/Branches in Royal Gold */}
      <div className="absolute top-0 right-0 w-[240px] h-[240px] md:w-[380px] md:h-[380px] pointer-events-none select-none z-0 opacity-80">
        <svg viewBox="0 0 100 100" className="w-full h-full text-[#c5a85c]/80">
          {/* Curved branch stem */}
          <path d="M 100,0 Q 75,12 52,32 Q 36,52 30,75" stroke="currentColor" strokeWidth="0.7" fill="none" />
          {/* Leaves along the branch */}
          <path d="M 85,8 Q 88,3 95,5 Q 92,12 85,8 Z" fill="currentColor" />
          <path d="M 76,17 Q 72,13 74,6 Q 81,10 76,17 Z" fill="currentColor" />
          <path d="M 68,23 Q 62,20 60,12 Q 67,15 68,23 Z" fill="currentColor" />
          <path d="M 59,31 Q 53,28 48,22 Q 55,24 59,31 Z" fill="currentColor" />
          <path d="M 52,40 Q 45,38 40,32 Q 47,33 52,40 Z" fill="currentColor" />
          <path d="M 45,50 Q 38,48 32,44 Q 40,43 45,50 Z" fill="currentColor" />
          {/* Opposite leaves */}
          <path d="M 88,14 Q 93,18 97,25 Q 91,22 88,14 Z" fill="currentColor" />
          <path d="M 78,22 Q 82,27 85,35 Q 80,31 78,22 Z" fill="currentColor" />
          <path d="M 70,30 Q 74,35 76,44 Q 71,39 70,30 Z" fill="currentColor" />
          <path d="M 62,39 Q 66,44 68,52 Q 63,48 62,39 Z" fill="currentColor" />
          <path d="M 54,49 Q 57,55 58,64 Q 53,59 54,49 Z" fill="currentColor" />
        </svg>
      </div>

      {/* 🍃 Bottom-Left Elite Plant Leaves/Branches in Royal Gold */}
      <div className="absolute bottom-0 left-0 w-[240px] h-[240px] md:w-[380px] md:h-[380px] pointer-events-none select-none z-0 opacity-80">
        <svg viewBox="0 0 100 100" className="w-full h-full text-[#c5a85c]/80 transform rotate-180">
          {/* Curved branch stem */}
          <path d="M 100,0 Q 75,12 52,32 Q 36,52 30,75" stroke="currentColor" strokeWidth="0.7" fill="none" />
          {/* Leaves along the branch */}
          <path d="M 85,8 Q 88,3 95,5 Q 92,12 85,8 Z" fill="currentColor" />
          <path d="M 76,17 Q 72,13 74,6 Q 81,10 76,17 Z" fill="currentColor" />
          <path d="M 68,23 Q 62,20 60,12 Q 67,15 68,23 Z" fill="currentColor" />
          <path d="M 59,31 Q 53,28 48,22 Q 55,24 59,31 Z" fill="currentColor" />
          <path d="M 52,40 Q 45,38 40,32 Q 47,33 52,40 Z" fill="currentColor" />
          <path d="M 45,50 Q 38,48 32,44 Q 40,43 45,50 Z" fill="currentColor" />
          {/* Opposite leaves */}
          <path d="M 88,14 Q 93,18 97,25 Q 91,22 88,14 Z" fill="currentColor" />
          <path d="M 78,22 Q 82,27 85,35 Q 80,31 78,22 Z" fill="currentColor" />
          <path d="M 70,30 Q 74,35 76,44 Q 71,39 70,30 Z" fill="currentColor" />
          <path d="M 62,39 Q 66,44 68,52 Q 63,48 62,39 Z" fill="currentColor" />
          <path d="M 54,49 Q 57,55 58,64 Q 53,59 54,49 Z" fill="currentColor" />
        </svg>
      </div>

      {/* SVG Definitions for Luxury Chrome/Silver & Glossy Obsidian Gradients */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id="goldMetallic" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#9c824a" />
            <stop offset="25%" stopColor="#d4af37" />
            <stop offset="50%" stopColor="#f3da90" />
            <stop offset="75%" stopColor="#c5a85c" />
            <stop offset="100%" stopColor="#8a6f37" />
          </linearGradient>
          <linearGradient id="glossyObsidian" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#080705" />
            <stop offset="40%" stopColor="#1a1813" />
            <stop offset="70%" stopColor="#12100d" />
            <stop offset="100%" stopColor="#020100" />
          </linearGradient>
        </defs>
      </svg>

      {/* Main Luxury Container Card in Black & Gold */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-2xl w-full bg-[#110f0c]/90 border border-[#c5a85c]/30 rounded-[36px] p-8 md:p-14 text-center relative z-10 shadow-[0_25px_60px_rgba(0,0,0,0.8)] backdrop-blur-xl"
      >
        {/* Fine gold ornament inner frames */}
        <div className="absolute inset-4 border border-[#c5a85c]/15 rounded-[28px] pointer-events-none" />
        <div className="absolute inset-5 border border-[#c5a85c]/5 rounded-[24px] pointer-events-none" />

        {/* 🏆 GOLD SHIELD BRAND EMBLEM (Exactly matching the image logo but in Gold) */}
        <div className="relative mb-8 flex justify-center">
          <motion.div 
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.9 }}
            className="relative w-48 h-48 rounded-full border-[2.5px] border-[#c5a85c]/60 flex flex-col items-center justify-center p-4 bg-gradient-to-b from-[#1c1914] to-[#0c0b08] shadow-[0_12px_35px_rgba(0,0,0,0.6)] overflow-hidden"
          >
            {/* Soft gold interior outline */}
            <div className="absolute inset-1 rounded-full border border-[#c5a85c]/15 pointer-events-none" />
            
            {/* Royal Crown Top in Polished Gold */}
            <div className="relative z-10 -mt-2 mb-1.5 text-[#e5c158]">
              <svg viewBox="0 0 100 100" className="w-9 h-9" fill="currentColor">
                <path d="M50,15 L62,35 L85,25 L75,65 L25,65 L15,25 L38,35 Z M25,70 L75,70 L75,76 L25,76 Z" />
              </svg>
            </div>

            {/* Intertwined Gold Rings Forming Hearts (Matchmaking Core Symbol) */}
            <div className="relative z-10 w-20 h-11 flex justify-center items-center my-1">
              <svg viewBox="0 0 100 60" className="w-full h-full stroke-current fill-none" strokeWidth="4.5">
                {/* Left Heart Ring in Gold Gradient */}
                <path 
                  d="M 38 48 C 22 48, 12 36, 12 24 C 12 10, 26 4, 38 18 C 50 4, 64 10, 64 24 C 64 36, 54 48, 38 48 Z" 
                  stroke="url(#goldMetallic)"
                  strokeWidth="5"
                  className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]" 
                />
                {/* Right Heart Ring Interlocking */}
                <path 
                  d="M 62 48 C 46 48, 36 36, 36 24 C 36 10, 50 4, 62 18 C 74 4, 88 10, 88 24 C 88 36, 78 48, 62 48 Z" 
                  stroke="url(#goldMetallic)"
                  strokeWidth="5"
                  className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]"
                  opacity="0.95"
                />
              </svg>
            </div>

            {/* Brand Title Latin (Elite Matrimony - Gold style) */}
            <div className="relative z-10 text-center space-y-0.5 mt-1">
              <span className="font-sans text-[11px] font-black tracking-[0.16em] text-[#f3da90]">
                ELITE MATRIMONY
              </span>
              <span className="block text-[6.5px] font-bold tracking-[0.22em] text-[#c5a85c] uppercase">
                UNITY • MATCHMAKING • PREMIUM
              </span>
            </div>
          </motion.div>
        </div>

        {/* 🌟 Elegant Gold Tagline */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-[#c5a85c]/10 border border-[#c5a85c]/25 text-[11px] font-bold text-[#f3da90] mb-5 tracking-wide"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#e5c158] animate-pulse" />
          <span>بوابة التوفيق الرسمية الفاخرة لكبار العائلات والمسؤولين بالمملكة والخليج العربي 🇸🇦 🇰🇼 🇦🇪 🇶🇦</span>
        </motion.div>

        {/* ✒️ Calligraphic Display Typography (Black & Gold luxury theme) */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.9 }}
          className="space-y-4"
        >
          <h1 className="text-4xl md:text-5xl font-serif font-black text-transparent bg-clip-text bg-gradient-to-b from-[#f3da90] via-[#d4af37] to-[#aa7c11] tracking-tight leading-tight drop-shadow-sm">
            خطّابة كبار الشخصيات
          </h1>
          
          {/* Elegant Vintage Gold Divider Line */}
          <div className="flex items-center justify-center gap-4 py-1 text-[#c5a85c]">
            <div className="h-0.5 w-20 bg-gradient-to-r from-transparent via-[#c5a85c]/50 to-[#f3da90]" />
            <span className="text-xs text-[#f3da90] select-none">❖ ✦ ❖</span>
            <div className="h-0.5 w-20 bg-gradient-to-l from-transparent via-[#c5a85c]/50 to-[#f3da90]" />
          </div>

          <p className="text-base md:text-[17px] text-[#e4dfd5] max-w-xl mx-auto font-sans font-medium leading-relaxed">
            بوابة توفيق فخمة مصممة خصيصًا للنخبة والعائلات العريقة في منطقة الخليج لربط الشركاء بسرية مطلقة واحترافية متكاملة.
          </p>

          <p className="text-xs text-[#b9b1a2] max-w-md mx-auto font-light leading-relaxed">
            مرحباً بكم في الصرح الأكثر خصوصية وموثوقية، والمصمم خصيصاً لوجهاء المجتمع، رجال الأعمال، والمثقفين. نمهد لكم دروب المودة ببروتوكول تحري عائلي بالغ الدقة والوقار.
          </p>
        </motion.div>

        {/* ⚜️ Elegant Royal Protocols */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-9 text-right"
        >
          {/* Feature 1 */}
          <div className="bg-[#1c1914]/80 border border-[#c5a85c]/20 p-4.5 rounded-2xl space-y-1.5 hover:border-[#c5a85c]/50 transition-all shadow-[0_4px_12px_rgba(0,0,0,0.4)]">
            <div className="flex items-center gap-2 text-[#f3da90]">
              <Lock size={15} strokeWidth={2} className="text-[#c5a85c]" />
              <h3 className="text-xs font-bold font-sans">سرية تامة ومطلقة</h3>
            </div>
            <p className="text-[10.5px] text-[#b9b1a2] leading-relaxed font-light">
              يتم حماية وتشفير سجلات المشتركين، ولا يتم عرض أي بيانات أو مشاركتها خارج قنوات التحري المعتمدة.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-[#1c1914]/80 border border-[#c5a85c]/20 p-4.5 rounded-2xl space-y-1.5 hover:border-[#c5a85c]/50 transition-all shadow-[0_4px_12px_rgba(0,0,0,0.4)]">
            <div className="flex items-center gap-2 text-[#f3da90]">
              <ShieldCheck size={15} strokeWidth={2} className="text-[#c5a85c]" />
              <h3 className="text-xs font-bold font-sans">تدقيق وفلترة يدوية</h3>
            </div>
            <p className="text-[10.5px] text-[#b9b1a2] leading-relaxed font-light">
              مراجعة نخبوية دقيقة لجميع الطلبات من قبل مشرفة مباشرة للتحقق من النسب، الكفاءة، والجدية التامة.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-[#1c1914]/80 border border-[#c5a85c]/20 p-4.5 rounded-2xl space-y-1.5 hover:border-[#c5a85c]/50 transition-all shadow-[0_4px_12px_rgba(0,0,0,0.4)]">
            <div className="flex items-center gap-2 text-[#f3da90]">
              <Heart size={15} strokeWidth={2} className="text-[#c5a85c]" />
              <h3 className="text-xs font-bold font-sans">احترام وتوافق عائلي</h3>
            </div>
            <p className="text-[10.5px] text-[#b9b1a2] leading-relaxed font-light">
              دراسة عميقة للأوضاع الاجتماعية والبيئات الثقافية لضمان التطابق التام وتجنب الإحراج مع العائلات الكريمة.
            </p>
          </div>
        </motion.div>

        {/* ⚜️ Action Button Block */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.9 }}
          className="mt-10 space-y-4"
        >
          <button 
            onClick={onEnter}
            className="group w-full md:w-auto relative inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#c5a85c] via-[#e5c158] to-[#9c824a] hover:from-[#e5c158] hover:to-[#c5a85c] text-stone-950 font-black px-12 py-4 rounded-xl text-sm tracking-wide transition-all duration-300 hover:shadow-[0_10px_25px_rgba(197,168,92,0.3)] hover:scale-[1.01] active:scale-[0.99] cursor-pointer border border-[#f3da90]/50"
          >
            <span className="font-sans text-stone-950 font-bold">الدخول لبوابة النخبة المغلقة</span>
            <ArrowLeft size={16} className="text-stone-950 transition-transform duration-300 group-hover:-translate-x-1" />
          </button>
          
          <p className="text-[10px] text-[#b9b1a2] font-light flex items-center justify-center gap-1.5">
            <ShieldCheck size={13} className="text-[#c5a85c]" />
            <span>نظام مشفر ومؤمن بالكامل يضمن حصانة الخصوصية الخليجية</span>
          </p>
        </motion.div>
      </motion.div>

      {/* Decorative Signature Watermark */}
      <div className="absolute bottom-6 inset-x-0 text-center pointer-events-none opacity-50">
        <p className="text-[9.5px] font-sans tracking-[0.2em] text-[#c5a85c] font-bold uppercase">
          سرية تامة • وقار متكامل • ثقة متوارثة
        </p>
      </div>
    </div>
  );
}
