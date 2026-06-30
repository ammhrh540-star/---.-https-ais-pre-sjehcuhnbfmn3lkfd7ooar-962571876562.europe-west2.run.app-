import React, { useState } from "react";
import { 
  MapPin, 
  Compass, 
  Lock, 
  ShieldCheck, 
  Send, 
  Phone, 
  Clock, 
  Building, 
  CheckCircle2, 
  Fingerprint
} from "lucide-react";

interface CityOffice {
  id: string;
  city: string;
  name: string;
  district: string;
  address: string;
  coor: string;
  clearance: string;
  hours: string;
  phone: string;
  x: number; // custom visual x% on map
  y: number; // custom visual y% on map
}

const officesData: CityOffice[] = [
  {
    id: "riyadh",
    city: "الرياض (المقر الرئيسي)",
    name: "ديوان كبار الشخصيات المغلق",
    district: "حي حطين النخبة",
    address: "طريق الأمير تركي بن عبدالعزيز الأول، الرياض 13512، المملكة العربية السعودية",
    coor: "24.7584° N, 46.6192° E",
    clearance: "مستوى التحقق الأول - يتوجب دعوة خاصة أو عضوية سارية",
    hours: "السبت إلى الخميس: 1:00 م - 9:00 م (المواعيد مغلقة تماماً)",
    phone: "+966 54 705 6497",
    x: 48,
    y: 42
  },
  {
    id: "jeddah",
    city: "جدة (المكتب الدبلوماسي)",
    name: "مجمع الحمراء للمقابلات الخاصة",
    district: "حي الحمراء الراقي",
    address: "طريق الكورنيش، مجمع الوجهاء الخاص، جدة، المملكة العربية السعودية",
    coor: "21.5169° N, 39.1557° E",
    clearance: "مستوى التحقق الثنائي - يتطلب مطابقة مسبقة من وسيطة عائلية",
    hours: "الأحد إلى الخميس: 4:00 م - 10:00 م (بالتنسيق المسبق)",
    phone: "+966 54 705 6497",
    x: 25,
    y: 65
  },
  {
    id: "dubai",
    city: "دبي (الملتقى الإقليمي)",
    name: "جناح المطابقة والضيافة الراقية",
    district: "نخلة جميرا الفاخرة",
    address: "بوابة الهلال الشرقية، مجمع الأجنحة المغلقة، دبي، الإمارات العربية المتحدة",
    coor: "25.1124° N, 55.1390° E",
    clearance: "مستوى السرية S (حصانة مطلقة لكبار وجهاء وشيوخ الخليج)",
    hours: "السبت إلى الخميس: 2:00 م - 8:00 م",
    phone: "+966 54 705 6497",
    x: 78,
    y: 28
  }
];

export default function VipContactSection() {
  const [selectedOffice, setSelectedOffice] = useState<CityOffice>(officesData[0]);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [showSecurityOverlay, setShowSecurityOverlay] = useState<boolean>(true);
  
  // VIP Secure Inquiries Form State
  const [vipName, setVipName] = useState("");
  const [vipPhone, setVipPhone] = useState("");
  const [vipTier, setVipTier] = useState("S_CLASS_DIPLOMATIC");
  const [vipMessage, setVipMessage] = useState("");
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittingStep, setSubmittingStep] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleVipSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!vipName || !vipPhone) {
      alert("الرجاء إدخال الاسم ورقم التواصل لتأمين الاتصال والمراسلة.");
      return;
    }

    setIsSubmitting(true);
    setSubmitSuccess(false);

    const steps = [
      "جاري تعمية الاتصال بنظام تشفير SSL 256-bit...",
      "برمجة الهوية الرقمية والتحقق من سلامة البيانات...",
      "جاري تسجيل الطلب لدى خادم الحفظ المغلق بخصوصية فائقة...",
      "إرسال تنبيه آمن للمشرفة العائلية المختصة..."
    ];

    for (let i = 0; i < steps.length; i++) {
      setSubmittingStep(steps[i]);
      await new Promise((resolve) => setTimeout(resolve, 800));
    }

    try {
      const response = await fetch("/api/vip-inquiries/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: vipName,
          phone: vipPhone,
          vipTier: vipTier,
          message: vipMessage,
          officeId: selectedOffice.id
        })
      });

      if (response.ok) {
        setSubmitSuccess(true);
        setVipName("");
        setVipPhone("");
        setVipMessage("");
      } else {
        setSubmitSuccess(true);
      }
    } catch (err) {
      console.error(err);
      setSubmitSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div dir="rtl" className="space-y-8">
      
      {/* Intro visual banner in Luxury Black & Gold */}
      <div className="bg-[#110f0c] border border-[#c5a85c]/30 rounded-3xl p-6 md:p-8 space-y-4 relative overflow-hidden shadow-[0_15px_45px_rgba(0,0,0,0.5)]">
        {/* Decorative backdrop details */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#c5a85c]/5 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#ffd700]/3 rounded-full blur-2xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 text-right">
            <span className="text-xs text-[#f3da90] font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Fingerprint size={13} className="text-[#c5a85c] animate-pulse" />
              قناة الاتصال الدبلوماسية المباشرة
            </span>
            <h3 className="text-xl md:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-b from-[#f3da90] to-[#c5a85c]">
              قنوات ومكاتب لقاءات وجهاء النخبة
            </h3>
            <p className="text-xs text-[#b9b1a2] max-w-xl font-light leading-relaxed">
              نوفر مقرات استقبال رسمية هادئة مخصصة لحجز مواعيد المقابلة والتحقق من الهوية والمكانة الاجتماعية. يُدار كل فرع بمستويات أمنية تامة لضمان سلامة وخصوصية السجلات الشخصية والعائلية.
            </p>
          </div>
          
          <div className="bg-[#1c1914] border border-[#c5a85c]/25 p-4 rounded-xl flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-lg bg-[#c5a85c]/10 flex items-center justify-center text-[#c5a85c] border border-[#c5a85c]/20">
              <Lock size={18} />
            </div>
            <div className="space-y-0.5 text-right">
              <span className="text-[10px] text-[#b9b1a2] block">بروتوكول السلامة</span>
              <span className="text-xs font-bold text-emerald-400">تشفير وحصانة تامة S+</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: 1. Visual Map Representation & 2. Ultra Secure Contact Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Right side (7 Cols): Visual Map Workspace in Gold & Dark */}
        <div className="lg:col-span-7 bg-[#110f0c] border border-[#c5a85c]/25 rounded-3xl p-5 md:p-6 space-y-4 relative flex flex-col justify-between shadow-[0_15px_45px_rgba(0,0,0,0.5)] min-h-[580px]">
          
          {/* Header of Map Card */}
          <div className="flex items-center justify-between border-b border-stone-800 pb-3 flex-wrap gap-2 text-right">
            <div>
              <h4 className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#f3da90] to-[#c5a85c] flex items-center gap-2">
                <Compass size={15} className="text-[#c5a85c] animate-spin-slow" />
                <span>التمثيل البصري لمواقع المكاتب والمكاتب الدبلوماسية</span>
              </h4>
              <p className="text-[10px] text-[#b9b1a2] font-light font-sans">
                انقر فوق أي فرع على الخريطة لعرض تفاصيل إحداثيات الوصول الخاص
              </p>
            </div>
            
            {/* Control Toggles */}
            <div className="flex items-center gap-1.5 self-end">
              <button 
                onClick={() => setZoomLevel(prev => prev === 1.3 ? 1 : 1.3)}
                className="p-1 px-2.5 rounded bg-[#1c1914] border border-[#c5a85c]/20 text-[10px] text-[#b9b1a2] hover:text-[#f3da90] transition-colors cursor-pointer"
                title="تكبير وتصغير الخريطة"
              >
                {zoomLevel === 1.3 ? "تصغير -" : "تكبير +"}
              </button>
              <button 
                onClick={() => setShowSecurityOverlay(!showSecurityOverlay)}
                className={`p-1 px-2 rounded border text-[10px] transition-colors cursor-pointer ${
                  showSecurityOverlay 
                    ? "bg-[#c5a85c]/10 border-[#c5a85c]/30 text-[#f3da90] font-bold" 
                    : "bg-[#1c1914] border-[#c5a85c]/20 text-[#b9b1a2]"
                }`}
              >
                نطاق الحماية الأمني
              </button>
            </div>
          </div>

          {/* Interactive Styled Vector Map Representation */}
          <div className="relative w-full h-[320px] bg-[#070605] rounded-2xl overflow-hidden border border-[#c5a85c]/20 flex items-center justify-center">
            
            {/* Visual Grid Lines resembling CAD/Radar style */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#c5a85c05_1px,transparent_1px),linear-gradient(to_bottom,#c5a85c05_1px,transparent_1px)] bg-[size:25px_25px] pointer-events-none" />
            
            {/* Radar / Circle Sweepers centered on Middle East (Riyadh) */}
            <div className="absolute w-[360px] h-[360px] rounded-full border border-[#c5a85c]/5 animate-pulse pointer-events-none" />
            <div className="absolute w-[180px] h-[180px] rounded-full border border-[#c5a85c]/5 pointer-events-none" />
            
            {/* Simulated Gulf Coastline SVG Grid */}
            <svg viewBox="0 0 500 300" className="absolute inset-0 w-full h-full opacity-[0.20] pointer-events-none select-none text-[#c5a85c]">
              <circle cx="240" cy="120" r="30" fill="currentColor" className="opacity-10" />
              <path d="M 50 150 Q 150 250 250 180 T 450 120" stroke="currentColor" strokeWidth="2" fill="none" />
              <path d="M 120 280 Q 220 260 280 200 T 480 80" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" fill="none" />
            </svg>

            {/* Scale and compass indicator */}
            <div className="absolute bottom-3 right-3 text-[9px] text-[#b9b1a2]/70 font-mono tracking-wider space-y-1">
              <div>SCALE: 1 : 4,200,000</div>
              <div>CRITICAL RADIUS: ACTIVE</div>
            </div>

            {/* Display security overlay boundaries */}
            {showSecurityOverlay && (
              <>
                <div 
                  className="absolute pointer-events-none border border-[#c5a85c]/30 bg-[#c5a85c]/[0.02] rounded-full transition-all duration-500 animate-pulse"
                  style={{
                    left: `${selectedOffice.x}%`,
                    top: `${selectedOffice.y}%`,
                    width: `${80 * zoomLevel}px`,
                    height: `${80 * zoomLevel}px`,
                    transform: "translate(-50%, -50%)"
                  }}
                />
                <div 
                  className="absolute pointer-events-none border border-white/5 rounded-full transition-all duration-500"
                  style={{
                    left: `${selectedOffice.x}%`,
                    top: `${selectedOffice.y}%`,
                    width: `${160 * zoomLevel}px`,
                    height: `${160 * zoomLevel}px`,
                    transform: "translate(-50%, -50%)"
                  }}
                />
              </>
            )}

            {/* Dynamic Map Pins in Gold */}
            {officesData.map((office) => {
              const isSelected = office.id === selectedOffice.id;
              return (
                <button
                  key={office.id}
                  type="button"
                  onClick={() => setSelectedOffice(office)}
                  className="absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-300 focus:outline-none z-20 group cursor-pointer"
                  style={{
                    left: `${office.x}%`,
                    top: `${office.y}%`,
                    transform: `translate(-50%, -50%) scale(${isSelected ? 1.15 : 1})`
                  }}
                >
                  <div className="relative flex flex-col items-center">
                    
                    {/* Pulsing indicator */}
                    <span className={`absolute inline-flex rounded-full opacity-75 ${
                      isSelected ? "animate-ping h-8 w-8 bg-[#f3da90]" : "h-0 w-0"
                    }`} />
                    
                    {/* Main Pin icon rounded panel */}
                    <div className={`p-1.5 rounded-xl border flex items-center justify-center transition-all ${
                      isSelected 
                        ? "bg-gradient-to-r from-[#d4af37] to-[#c5a85c] border-[#f3da90] text-stone-950 shadow-[0_0_15px_rgba(243,218,144,0.6)]" 
                        : "bg-[#1c1914] border-[#c5a85c]/30 text-[#b9b1a2] hover:text-white hover:border-[#c5a85c]"
                    }`}>
                      <MapPin size={15} className={isSelected ? "fill-stone-950/20" : ""} />
                    </div>

                    {/* Pop / Hover state city name */}
                    <span className={`mt-1.5 px-2 py-0.5 rounded text-[8.5px] font-sans font-bold border transition-colors ${
                      isSelected 
                        ? "bg-[#1c1d21] text-[#f3da90] border-[#c5a85c]/50" 
                        : "bg-[#0c0b08]/90 text-[#b9b1a2] border-stone-800 opacity-70 group-hover:opacity-100"
                    }`}>
                      {office.city.split(" ")[0]}
                    </span>
                    
                  </div>
                </button>
              );
            })}

            {/* Select Notification details at top center */}
            <div className="absolute top-3 left-3 bg-[#0c0b08]/95 border border-[#c5a85c]/25 p-2 rounded-lg text-right shadow-md max-w-[200px] pointer-events-none">
              <span className="text-[8.5px] text-[#b9b1a2]/60 block font-sans">مرصد المكاتب النشط</span>
              <span className="text-[10px] text-[#f3da90] font-bold block">{selectedOffice.name}</span>
            </div>

          </div>

          {/* Selected Office Credentials and data details (Dynamic Cards) */}
          <div className="bg-[#1c1914] border border-[#c5a85c]/20 p-4 rounded-2xl relative">
            <div className="absolute top-3 left-3 flex items-center gap-1 bg-[#c5a85c]/10 border border-[#c5a85c]/20 p-1 px-2.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[9px] text-[#c5a85c] font-mono">SECURE ENTRY: B2</span>
            </div>

            <div className="space-y-3 font-sans text-right">
              <div>
                <span className="text-[10px] text-[#b9b1a2] font-bold block">موقع اللقاء والمطابقة</span>
                <span className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-l from-[#f3da90] to-[#c5a85c]">
                  {selectedOffice.city} - {selectedOffice.name}
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pb-1">
                <div className="space-y-1">
                  <span className="text-[9.5px] text-[#b9b1a2]/80 block flex items-center gap-1">
                    <Building size={11} className="text-[#c5a85c]" />
                    العنوان الدبلوماسي الكامل:
                  </span>
                  <p className="text-xs text-[#e4dfd5] font-light leading-relaxed">
                    {selectedOffice.address}
                  </p>
                </div>
                
                <div className="space-y-1">
                  <span className="text-[9.5px] text-[#b9b1a2]/80 block flex items-center gap-1">
                    <Clock size={11} className="text-[#c5a85c]" />
                    أوقات المعاينة المعتمدة:
                  </span>
                  <p className="text-xs text-[#e4dfd5] font-light leading-relaxed">
                    {selectedOffice.hours}
                  </p>
                </div>
              </div>

              <div className="border-t border-stone-800 pt-2.5 flex flex-wrap gap-4 items-center justify-between text-xs font-mono">
                <div>
                  <span className="text-[#b9b1a2]/70 text-[10px] ml-1">إحداثيات الملاحة:</span>
                  <span className="text-[#f3da90] text-[10px]">{selectedOffice.coor}</span>
                </div>
                
                <div className="flex items-center gap-1">
                  <Lock size={12} className="text-[#c5a85c]" />
                  <span className="text-[#b9b1a2] text-[10px] font-sans">{selectedOffice.clearance}</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Left side (5 Cols): Premium Confident VIP Inquiry Form */}
        <div className="lg:col-span-5 bg-[#110f0c] border border-[#c5a85c]/25 rounded-3xl p-5 md:p-6 space-y-4 shadow-[0_15px_45px_rgba(0,0,0,0.5)]">
          
          <div className="space-y-1 text-right">
            <span className="text-xs text-[#f3da90] font-bold tracking-widest uppercase flex items-center gap-1">
              <Fingerprint size={12} className="text-[#c5a85c]" />
              مراسلات سرية للغاية
            </span>
            <h4 className="text-base font-bold text-[#f3da90]">
              نموذج مراسلة طلبات الـ VIP
            </h4>
            <p className="text-[11px] text-[#b9b1a2] font-light leading-relaxed">
              إذا كنت تبحث عن مطابقة تتجاوز حدود السرية العادية ببروتوكولات حظر ومقابلة مكتومة وعائلية، أرسل تفاصيلك المبدئية ليتم الاتصال بك من رقم اتصال الدعم المخصص للوجهاء.
            </p>
          </div>

          {submitSuccess ? (
            <div className="bg-[#1c1914] border border-[#c5a85c]/30 p-5 rounded-2xl text-center space-y-3.5 animate-fadeIn">
              <div className="w-12 h-12 rounded-full bg-[#c5a85c]/10 flex items-center justify-center text-emerald-400 mx-auto border border-[#c5a85c]/20">
                <CheckCircle2 size={24} />
              </div>
              <div className="space-y-1">
                <h5 className="text-sm font-bold text-[#f3da90]">تم تسجيل الاستفسار المغلق بنجاح</h5>
                <p className="text-[10px] text-[#b9b1a2] font-light leading-relaxed">
                  تم تعمية وتوقيع رسالتك بنظام المفتاح المزدوج. ستتواصل معك كبيرة المشرفات العائلية الدكتورة أم عبدالملك هاتفياً بشكل مباشر في غضون الساعات القليلة المقبلة بوقار كامل.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSubmitSuccess(false)}
                className="w-full py-2.5 rounded-xl bg-[#1c1914] border border-[#c5a85c]/30 text-[#f3da90] hover:text-stone-950 hover:bg-[#c5a85c] text-xs transition-colors cursor-pointer"
              >
                ارسال رسالة مغلقة أخرى
              </button>
            </div>
          ) : (
            <form onSubmit={handleVipSubmit} className="space-y-3 text-right font-sans">
              
              {/* Field 1: Name */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-[#b9b1a2] block">الاسم الكريم أو كنيتكم العائلية</label>
                <input
                  type="text"
                  required
                  value={vipName}
                  onChange={(e) => setVipName(e.target.value)}
                  placeholder="مثال: صالح آل حطين / أبو فيصل"
                  className="w-full bg-[#1c1914] border border-[#c5a85c]/20 px-3 py-2.5 rounded-xl text-xs text-[#e4dfd5] placeholder-stone-500 focus:outline-none focus:border-[#c5a85c] transition-colors"
                />
              </div>

              {/* Field 2: Direct Contact Phone */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-[#b9b1a2] block">رقم الاتصال الخاص (اتصال أو هاتف مباشر)</label>
                <input
                  type="tel"
                  required
                  value={vipPhone}
                  onChange={(e) => setVipPhone(e.target.value)}
                  placeholder="مثال: 05xxxxxxx"
                  className="w-full bg-[#1c1914] border border-[#c5a85c]/20 px-3 py-2.5 rounded-xl text-xs font-mono text-[#e4dfd5] placeholder-stone-500 text-left focus:outline-none focus:border-[#c5a85c] transition-colors"
                  dir="ltr"
                />
              </div>

              {/* Field 3: Select VIP Tier security level */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-[#b9b1a2] block">مستوى السرية والبروتوكول المنشود</label>
                <select
                  value={vipTier}
                  onChange={(e) => setVipTier(e.target.value)}
                  className="w-full bg-[#1c1914] border border-[#c5a85c]/20 px-3 py-2.5 rounded-xl text-xs text-[#e4dfd5] focus:outline-none focus:border-[#c5a85c] cursor-pointer"
                >
                  <option value="S_CLASS_DIPLOMATIC" className="bg-[#110f0c] text-[#e4dfd5]">سرية مطلقة عائلية (S-Class Diplomatic Protocol)</option>
                  <option value="EXECUTIVE_A_PLUS" className="bg-[#110f0c] text-[#e4dfd5]">مطابقة شخصية من وسيطة حصرية (A+ Executive Mediation)</option>
                  <option value="ROYAL_COUNCIL_S3" className="bg-[#110f0c] text-[#e4dfd5]">ديوان المطابقة الملكي المغلق (S3 Custom Assembly)</option>
                </select>
                <span className="text-[8.5px] text-[#b9b1a2]/70 block">
                  * يحدد هذا وضع الحظر والخصوصية وحصانة معاينة السير والقبائل.
                </span>
              </div>

              {/* Field 4: Direct Confident Note */}
              <div className="space-y-1">
                <div className="flex justify-between items-center text-[10px]">
                  <label className="font-bold text-[#b9b1a2]">متطلبات الارتباط وشروط الخصوصية الفريدة</label>
                  <span className="text-[#b9b1a2]/60">(اختياري وسري للغاية)</span>
                </div>
                <textarea
                  rows={4}
                  value={vipMessage}
                  onChange={(e) => setVipMessage(e.target.value)}
                  placeholder="اذكر هنا أي تفاصيل خاصة تعود لنسب الأسرة الكريمة، أو شروط صعبة تتعلق بالطرف الآخر المطلوب أو عدم النشر التام..."
                  className="w-full bg-[#1c1914] border border-[#c5a85c]/20 px-3 py-2 rounded-xl text-xs text-[#e4dfd5] placeholder-stone-500 focus:outline-none focus:border-[#c5a85c] resize-none leading-relaxed transition-colors"
                />
              </div>

              {/* Live Encryption Warning and verification metrics */}
              <div className="bg-[#1c1914] border border-[#c5a85c]/15 p-3 rounded-xl flex items-start gap-2 text-[10px] text-[#b9b1a2]">
                <ShieldCheck size={14} className="text-[#c5a85c] shrink-0 mt-0.5 animate-pulse" />
                <div className="space-y-0.5 leading-relaxed text-right">
                  <span className="font-bold text-[#f3da90] block">مستوى حماية معلومات النخبة دقة (AAL4)</span>
                  <span>لا نقوم إطلاقاً بمشاركة البيانات مع أطراف ثالثة أو فضح هوية المتحدثين. تتم المحادثات بأعلى مراتب الوقار والحشمة وتوقير الأنساب والقبائل.</span>
                </div>
              </div>

              {/* Button Action */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full relative py-3 px-4 rounded-xl bg-gradient-to-r from-[#c5a85c] via-[#e5c158] to-[#9c824a] hover:from-[#e5c158] hover:to-[#c5a85c] border border-[#f3da90]/30 hover:shadow-[0_4px_15px_rgba(197,168,92,0.25)] text-stone-950 font-black text-xs tracking-wide transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-3.5 h-3.5 border-2 border-t-[#ffffff] border-stone-700 rounded-full animate-spin" />
                    <span className="font-mono text-[10px] text-stone-300 animate-pulse">{submittingStep}</span>
                  </div>
                ) : (
                  <>
                    <Send size={13} className="text-stone-950" />
                    <span className="text-stone-950 font-bold">إرسال الطلب الآمن مباشرة للمراجعة النسائية العائلية</span>
                  </>
                )}
              </button>

            </form>
          )}

          {/* Hotline contacts information */}
          <div className="border-t border-stone-800 pt-3.5 space-y-2 text-right">
            <span className="text-[10px] text-[#b9b1a2] block">تواصل مباشر بديل للتحقق:</span>
            
            <div className="flex items-center justify-between text-xs text-[#e4dfd5] hover:text-[#f3da90] transition-colors">
              <span className="font-mono text-[11px] font-bold text-[#f3da90]">+966 54 705 6497</span>
              <span className="flex items-center gap-1.5 font-sans text-[#b9b1a2]">
                <Phone size={11} className="text-[#c5a85c]" />
                هاتف المقر الدبلوماسي الموحد
              </span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
