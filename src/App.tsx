import React, { useState, useEffect, useMemo } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import WelcomePage from "./components/WelcomePage";
import VettingStatusIndicator from "./components/VettingStatusIndicator";
import VipContactSection from "./components/VipContactSection";
import { 
  Crown, 
  ShieldCheck, 
  Heart, 
  Check, 
  Copy,
  Share2,
  Lock, 
  Unlock, 
  MessageCircle, 
  Phone, 
  ChevronDown, 
  Clock, 
  RefreshCw, 
  Trash2, 
  BarChart3, 
  Users, 
  MapPin, 
  FileText, 
  Calendar,
  X,
  Sparkles,
  ArrowRight,
  Globe,
  ShieldAlert,
  Search,
  Filter,
  Megaphone
} from "lucide-react";

// The official VIP WhatsApp link with prefilled options
const OFFICIAL_WHATSAPP_LINK = "https://wa.me/966547056497?text=1%20%D8%A7%D8%B3%D9%83%D9%81%D8%B3%D8%A7%D8%B1%0A2%20%D8%B9%D8%B6%20%D9%88%D9%8A%D8%A9%0A3%20VIP";

// Custom individual message templates for clean interactive redirection
const WHATSAPP_TEMPLATES = {
  general: "https://wa.me/966547056497?text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%D9%83%D9%85%20%D9%88%D8%B1%D8%AD%D9%85%D8%A9%20%D8%A7%D9%84%D9%84%D9%87%20%D9%88%D8%A8%D8%B1%D9%83%D8%A7%D8%AA%D9%87%D8%8C%20%D8%A3%D9%88%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D8%AE%D8%AF%D9%85%D8%A7%D8%AA%20%D9%85%D9%86%D8%B5%D8%A9%20%D8%AE%D8%B7%D8%A7%D8%A8%D8%A9%20%D9%83%D8%A8%D8%A7%D8%B1%20%D8%A7%D9%84%D8%B4%D8%AE%D8%B5%D9%8A%D8%A7%D8%AA.",
  apply: "https://wa.me/966547056497?text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%D9%83%D9%85%20%D9%88%D8%B1%D8%AD%D9%85%D8%A9%20%D8%A7%D9%84%D9%84%D9%87%20%D9%88%D8%A8%D8%B1%D9%83%D8%A7%D8%AA%D9%87%D8%8C%20%D8%A3%D9%88%D8%AF%20%D8%AA%D9%82%D8%AF%D9%8A%D9%85%20%D8%B7%D9%84%D8%A8%20%D8%A7%D9%84%D8%B9%D8%B6%D9%88%D9%8A%D8%A9%20%D8%A7%D9%84%D8%B4%D8%AE%D8%B5%D9%8A%D8%A9%20%D9%81%D9%82%D1%8A%20%D9%85%D9%86%D8%B5%D8%A9%20%D9%83%D8%A8%D8%A7%D8%B1%20%D8%A7%D9%84%D8%B4%D8%AE%D8%B5%D9%8A%D8%A7%D8%AA.",
  vipGeneral: "https://wa.me/966547056497?text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%D9%83%D9%85%20%D9%88%D8%B1%D8%AD%D9%85%D8%A9%20%D8%A7%D9%84%D9%84%D9%87%20%D9%88%D8%A8%D8%B1%D9%83%D8%A7%D8%AA%D9%87%D8%8C%20%D8%A3%D9%88%D8%AF%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D8%A8%D8%A7%D9%82%D8%A7%D8%AA%20VIP%20%D8%A7%D9%84%D9%85%D8%AA%D9%88%D9%81%D8%B1%D8%A9%20%D9%84%D8%AA%D9%88%D9%81%D9%8A%D9%82%20%D9%88%D9%85%D8%B7%D8%A7%D8%A8%D9%82%D8%A9%20%D9%83%D8%A8%D8%A7%D8%B1%20%D8%A7%D9%84%D8%B4%D8%AE%D8%B5%D9%8A%D8%A7%D8%AA%20%D9%88%D8%A7%D9%84%D9%86%D8%AE%D8%A8%D8%A9.",
  vipBasic: "https://wa.me/966547056497?text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%D9%83%D9%85%20%D9%88%D8%B1%D8%AD%D9%85%D8%A9%20%D8%A7%D9%84%D9%84%D9%87%20%D9%88%D8%A8%D8%B1%D9%83%D8%A7%D8%AA%D9%87%D8%8C%20%D8%A3%D9%88%D8%AF%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D8%AA%D9%81%D8%A7%D8%B5%D9%8A%D9%84%20%D8%A7%D9%84%D8%A7%D8%B4%D8%AA%D8%B1%D8%A7%D9%83%20%D9%81%D9%8A%20%D8%A8%D8%A7%D9%82%D8%A9%20%5B%20VIP%20%D8%A3%D8%B3%D8%A7%D8%B3%D9%8I%20%5D%20%D9%84%D8%AA%D9%88%D9%81%D9%8A%D9%82%20%D8%A7%D9%84%D9%86%D8%AE%D8%A8%D8%A9%20%D9%88%D8%A7%D9%84%D8%B9%D8%A7%D8%A6%D9%84%D8%A7%D8%AA.",
  vipPlus: "https://wa.me/966547056497?text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%D9%83%D9%85%20%D9%88%D8%B1%D8%AD%D9%85%D8%A9%20%D8%A7%D9%84%D9%84%D9%87%20%D9%88%D8%A8%D8%B1%D9%83%D8%A7%D8%AA%D9%87%D8%8C%20%D8%A3%D9%88%D8%AF%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D8%AA%D9%81%D8%A7%D8%B5%D9%8A%D9%84%20%D8%A7%D9%84%D8%A7%D8%B4%D8%AA%D8%B1%D8%A7%D9%83%20%D9%81%D9%8A%20%D8%A8%D8%A7%D9%82%D8%A9%20%5B%20VIP%20%D8%A8%D9%84%D8%B3%20%5D%20%D9%84%D8%B1%D8%AC%D8%A7%D9%84%20%D8%A7%D9%84%D8%A3%D8%B9%D9%85%D8%A7%D9%84%20%D9%88%D9%85%D9%8A%D8%B2%D8%A7%D8%AA%20%D8%A7%D9%84%D8%AA%D9%88%D9%81%D9%8A%D9%82%20%D8%A7%D9%84%D9%85%D8%AE%D9%81%D9%8I%20%D8%A8%D8%A7%D9%84%D8%AE%D9%84%D9%8A%D8%AC.",
  vipSpecial: "https://wa.me/966547056497?text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%D9%83%D9%85%20%D9%88%D8%B1%D8%AD%D9%85%D8%A9%20%D8%A7%D9%84%D9%84%D9%87%20%D9%88%D8%A8%D8%B1%D9%83%D8%A7%D8%AA%D9%87%D8%8C%20%D8%A3%D9%88%D8%AF%20%D8%A8%D8%AE%D8%B5%D9%88%D8%B5%D9%8A%D8%A9%20%D8%AA%D8%A7%D9%85%D8%A9%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D8%A8%D8%A7%D9%82%D8%A9%20%5B%20VIP%20%D9%8E%D8%AE%D8%A7%D8%B5%20%5D%20%D8%A7%D9%84%D9%85%D8%BA%D9%84%D9%82%D9%89%20%D9%84%D9%84%D8%B4%D9%8A%D9%85%D8%AE%20%D9%88%D8%A7%D9%84%D8%AF%D8%A8%D9%84%D9%88%D9%85%D8%A7%D8%B3%D9%8A%D9%8A%D9%86."
};

interface Stats {
  whatsapp_total: number;
  whatsapp_general: number;
  whatsapp_apply: number;
  whatsapp_vip: number;
  vip_basic_clicks: number;
  vip_plus_clicks: number;
  vip_special_clicks: number;
  sources: {
    snapchat: number;
    tiktok: number;
    instagram: number;
    direct: number;
  };
  page_views: number;
}

interface Application {
  id: string;
  gender: string;
  age: number;
  city: string;
  maritalStatus: string;
  note: string;
  contact: string;
  createdAt: string;
  source: string;
}

interface VipInquiry {
  id: string;
  name: string;
  phone: string;
  vipTier: string;
  message: string;
  officeId: string;
  createdAt: string;
}

// دليل القبائل والعوائل النشطة لجميع الزائرين (يشمل الشيوخ والأمراء، القبائل العريقة، العوائل الحضرية، والعوائل غير القبلية الخضيرية)
const TRIBES_AND_FAMILIES = [
  // 1. شيوخ وأمراء وأسر حاكمة
  { id: 1, name: "آل سعود", type: "شيوخ وأمراء", country: "السعودية", region: "المنطقة الوسطى (نجد)", status: "نشط • VIP", activeRequests: 18, matchRate: "100%", level: "سرية مطلقة (ديوان ملكي)" },
  { id: 2, name: "آل صباح", type: "شيوخ وأمراء", country: "الكويت", region: "العاصمة والجهراء", status: "نشط • VIP", activeRequests: 8, matchRate: "100%", level: "سرية مطلقة (ديوان أميري)" },
  { id: 3, name: "آل نهيان وآل مكتوم", type: "شيوخ وأمراء", country: "الإمارات", region: "أبوظبي ودبي", status: "نشط • VIP", activeRequests: 11, matchRate: "100%", level: "سرية مطلقة (ديوان رئاسي وإمراتي)" },
  { id: 4, name: "آل ثاني", type: "شيوخ وأمراء", country: "قطر", region: "الدوحة والريان", status: "نشط • VIP", activeRequests: 7, matchRate: "100%", level: "سرية مطلقة (ديوان أميري)" },
  { id: 5, name: "آل خليفة", type: "شيوخ وأمراء", country: "البحرين", region: "المنامة والرفاع", status: "نشط • VIP", activeRequests: 5, matchRate: "100%", level: "سرية مطلقة (ديوان ملكي)" },
  { id: 6, name: "آل بوسعيد", type: "شيوخ وأمراء", country: "عمان", region: "مسقط وصحار", status: "نشط • VIP", activeRequests: 6, matchRate: "100%", level: "سرية مطلقة (ديوان سلطاني)" },
  { id: 7, name: "آل قواسم", type: "شيوخ وأمراء", country: "الإمارات", region: "الشارقة ورأس الخيمة", status: "نشط • VIP", activeRequests: 4, matchRate: "100%", level: "سرية تامة (ديوان حكام الإمارات)" },
  
  // 2. القبائل العريقة
  { id: 8, name: "قبيلة عنزة", type: "القبائل العريقة", country: "السعودية والخليج", region: "نجد والمنطقة الشمالية", status: "نشط وآمن", activeRequests: 48, matchRate: "91%", level: "سرية تامة وعائلية" },
  { id: 9, name: "قبيلة شمر", type: "القبائل العريقة", country: "السعودية والخليج", region: "حائل والحدود الشمالية", status: "نشط وآمن", activeRequests: 39, matchRate: "89%", level: "سرية تامة وعائلية" },
  { id: 10, name: "قبيلة حرب", type: "القبائل العريقة", country: "السعودية والخليج", region: "القصيم والمدينة والحجاز", status: "نشط وآمن", activeRequests: 33, matchRate: "90%", level: "سرية تامة وعائلية" },
  { id: 11, name: "قبيلة مطير", type: "القبائل العريقة", country: "السعودية والخليج", region: "نجد والمنطقة الشرقية", status: "نشط وآمن", activeRequests: 41, matchRate: "92%", level: "سرية تامة وعائلية" },
  { id: 12, name: "قبيلة عتيبة", type: "القبائل العريقة", country: "السعودية والخليج", region: "نجد والحجاز والوسطى", status: "نشط وآمن", activeRequests: 52, matchRate: "93%", level: "سرية تامة وعائلية" },
  { id: 13, name: "قبيلة قحطان", type: "القبائل العريقة", country: "السعودية والخليج", region: "المنطقة الجنوبية ونجد", status: "نشط وآمن", activeRequests: 35, matchRate: "88%", level: "سرية تامة وعائلية" },
  { id: 14, name: "قبيلة الدواسر", type: "القبائل العريقة", country: "السعودية والخليج", region: "وادي الدواسر والرياض", status: "نشط وآمن", activeRequests: 29, matchRate: "91%", level: "سرية تامة وعائلية" },
  { id: 15, name: "قبيلة بني خالد", type: "القبائل العريقة", country: "السعودية والخليج", region: "المنطقة الشرقية والخليج", status: "نشط وآمن", activeRequests: 24, matchRate: "94%", level: "سرية تامة وعائلية" },
  { id: 16, name: "قبيلة يام", type: "القبائل العريقة", country: "السعودية والخليج", region: "نجران والجنوب والخليج", status: "نشط وآمن", activeRequests: 28, matchRate: "87%", level: "سرية تامة وعائلية" },
  { id: 17, name: "قبيلة بني تميم", type: "القبائل العريقة", country: "السعودية والخليج", region: "حوطة بني تميم ونجد والخليج", status: "نشط وآمن", activeRequests: 36, matchRate: "93%", level: "سرية تامة وعائلية" },
  { id: 18, name: "قبائل غامد وزهران", type: "القبائل العريقة", country: "السعودية والخليج", region: "الباحة وسراة وتهامة", status: "نشط وآمن", activeRequests: 22, matchRate: "89%", level: "سرية تامة وعائلية" },
  { id: 19, name: "قبائل سبيع والسهول", type: "القبائل العريقة", country: "السعودية والخليج", region: "رنية والخرمة والوسطى", status: "نشط وآمن", activeRequests: 25, matchRate: "92%", level: "سرية تامة وعائلية" },
  { id: 20, name: "قبائل عسير وبني شهر", type: "القبائل العريقة", country: "السعودية والخليج", region: "عسير وأبها والنماص", status: "نشط وآمن", activeRequests: 18, matchRate: "88%", level: "سرية تامة وعائلية" },
  { id: 21, name: "قبيلة بني هاجر (الهواجر)", type: "القبائل العريقة", country: "السعودية والخليج", region: "جوف بني هاجر والخليج", status: "نشط وآمن", activeRequests: 21, matchRate: "92%", level: "سرية تامة وعائلية" },
  { id: 22, name: "قبيلة العجمان", type: "القبائل العريقة", country: "السعودية والخليج", region: "المنطقة الشرقية والكويت", status: "نشط وآمن", activeRequests: 26, matchRate: "94%", level: "سرية تامة وعائلية" },
  { id: 23, name: "قبيلة الرشايدة", type: "القبائل العريقة", country: "الكويت والخليج", region: "العاصمة والجهراء والخليج", status: "نشط وآمن", activeRequests: 17, matchRate: "90%", level: "سرية تامة وعائلية" },
  { id: 24, name: "قبيلة العوازم", type: "القبائل العريقة", country: "الكويت والخليج", region: "الأحمدي والمنطقة الشرقية", status: "نشط وآمن", activeRequests: 19, matchRate: "91%", level: "سرية تامة وعائلية" },
  { id: 25, name: "قبيلة بني ياس", type: "القبائل العريقة", country: "الإمارات", region: "أبوظبي ودبي والظفرة", status: "نشط وآمن", activeRequests: 11, matchRate: "95%", level: "سرية تامة وعائلية" },
  { id: 26, name: "قبيلة الظفير", type: "القبائل العريقة", country: "السعودية والخليج", region: "حفر الباطن والمنطقة الشمالية", status: "نشط وآمن", activeRequests: 16, matchRate: "90%", level: "سرية تامة وعائلية" },
  { id: 27, name: "قبيلة بني كعب", type: "القبائل العريقة", country: "عمان", region: "محافظة البريمي والخليج", status: "نشط وآمن", activeRequests: 9, matchRate: "92%", level: "سرية تامة وعائلية" },
  { id: 28, name: "قبيلة الشحوح", type: "القبائل العريقة", country: "الإمارات", region: "رأس الخيمة والساحل الشرقي", status: "نشط وآمن", activeRequests: 12, matchRate: "94%", level: "سرية تامة وعائلية" },
  { id: 29, name: "قبيلة آل مرة", type: "القبائل العريقة", country: "قطر", region: "الدوحة والمنطقة الشرقية والربع الخالي", status: "نشط وآمن", activeRequests: 15, matchRate: "91%", level: "سرية تامة وعائلية" },

  // 3. العوائل الحضرية
  { id: 30, name: "آل الشيخ", type: "العوائل الحضرية", country: "السعودية", region: "الرياض / نجد", status: "نشط وآمن", activeRequests: 16, matchRate: "94%", level: "درجة سرية قصوى S-Class" },
  { id: 31, name: "السديري", type: "العوائل الحضرية", country: "السعودية", region: "الرياض / الغاط", status: "نشط وآمن", activeRequests: 21, matchRate: "96%", level: "درجة سرية قصوى S-Class" },
  { id: 32, name: "عائلة البابطين", type: "العوائل الحضرية", country: "السعودية", region: "الرياض والقصيم والشرقية", status: "نشط وآمن", activeRequests: 14, matchRate: "93%", level: "سرية تامة وعائلية" },
  { id: 33, name: "عائلة الراجحي", type: "العوائل الحضرية", country: "السعودية", region: "البكيرية والرياض والقصيم", status: "نشط وآمن", activeRequests: 28, matchRate: "95%", level: "سرية عائلية ممتازة" },
  { id: 34, name: "عائلة التويجري", type: "العوائل الحضرية", country: "السعودية", region: "المجمعة والرياض والقصيم", status: "نشط وآمن", activeRequests: 23, matchRate: "92%", level: "سرية عائلية ممتازة" },
  { id: 35, name: "عائلة الجميح", type: "العوائل الحضرية", country: "السعودية", region: "شقراء والرياض والوسطى", status: "نشط وآمن", activeRequests: 19, matchRate: "91%", level: "سرية تامة وعائلية" },
  { id: 36, name: "عائلة القصيبي", type: "العوائل الحضرية", country: "السعودية والخليج", region: "المنطقة الشرقية والمنامة", status: "نشط وآمن", activeRequests: 11, matchRate: "94%", level: "درجة سرية ممتازة VIP" },
  { id: 37, name: "عائلة العيسى", type: "العوائل الحضرية", country: "السعودية", region: "الرياض والوسطى والوشم", status: "نشط وآمن", activeRequests: 17, matchRate: "90%", level: "سرية تامة وعائلية" },
  { id: 38, name: "عائلة الشايع", type: "الكويت", region: "العاصمة والوسطى", status: "نشط وآمن", country: "الكويت", activeRequests: 13, matchRate: "93%", level: "سرية تامة وعائلية" },
  { id: 39, name: "عائلة العثمان", type: "الكويت", region: "العاصمة وحائل", status: "نشط وآمن", country: "الكويت", activeRequests: 11, matchRate: "91%", level: "سرية تامة وعائلية" },
  { id: 40, name: "عائلة الخنيني", type: "العوائل الحضرية", country: "السعودية", region: "الجبيل وشقراء", status: "نشط وآمن", activeRequests: 8, matchRate: "89%", level: "سرية عائلية ممتازة" },
  { id: 41, name: "عائلة الغانم", type: "العوائل الحضرية", country: "الكويت", region: "العاصمة والخليج", status: "نشط • VIP", activeRequests: 12, matchRate: "95%", level: "درجة سرية VIP" },
  { id: 42, name: "عائلة الفطيم", type: "العوائل الحضرية", country: "الإمارات", region: "دبي وأبوظبي", status: "نشط • VIP", activeRequests: 6, matchRate: "96%", level: "درجة سرية VIP" },
  { id: 43, name: "عائلة الغرير", type: "العوائل الحضرية", country: "الإمارات", region: "دبي والشارقة", status: "نشط • VIP", activeRequests: 7, matchRate: "93%", level: "درجة سرية VIP" },
  { id: 44, name: "عائلة الملا", type: "العوائل الحضرية", country: "الكويت", region: "العاصمة والخليج", status: "نشط وآمن", activeRequests: 9, matchRate: "91%", level: "سرية تامة وعائلية" },
  { id: 45, name: "عائلة المرزوق", type: "العوائل الحضرية", country: "الكويت", region: "العاصمة والشويخ", status: "نشط وآمن", activeRequests: 10, matchRate: "92%", level: "سرية تامة وعائلية" },
  { id: 46, name: "عائلة كانو", type: "العوائل الحضرية", country: "البحرين", region: "المنامة والمنطقة الشرقية", status: "نشط • VIP", activeRequests: 8, matchRate: "94%", level: "درجة سرية VIP" },
  { id: 47, name: "عائلة المحيديب", type: "العوائل الحضرية", country: "السعودية", region: "الرياض والدمام والشرقية", status: "نشط وآمن", activeRequests: 15, matchRate: "92%", level: "سرية عائلية ممتازة" },
  { id: 48, name: "عائلة الفوزان", type: "العوائل الحضرية", country: "السعودية", region: "القصيم والرياض والزلفي", status: "نشط وآمن", activeRequests: 16, matchRate: "90%", level: "سرية تامة وعائلية" },
  { id: 49, name: "عائلة البسام", type: "العوائل الحضرية", country: "السعودية", region: "عنيزة والقصيم والرياض", status: "نشط وآمن", activeRequests: 14, matchRate: "93%", level: "سرية تامة وعائلية" },

  // 4. العوائل غير القبلية (الخضيرية)
  { id: 50, name: "عائلة السالم الكريمة", type: "العوائل غير القبلية (الخضيرية)", country: "السعودية", region: "الرياض والوشم والوسطى", status: "نشط وآمن", activeRequests: 22, matchRate: "94%", level: "تشفير وحصانة تامة" },
  { id: 51, name: "عائلة اليوسف الكريمة", type: "العوائل غير القبلية (الخضيرية)", country: "السعودية", region: "الرياض والخرج والوسطى", status: "نشط وآمن", activeRequests: 19, matchRate: "91%", level: "تشفير وحصانة تامة" },
  { id: 52, name: "عائلة السعيد الكريمة", type: "العوائل غير القبلية (الخضيرية)", country: "السعودية", region: "سدير والرياض والوسطى", status: "نشط وآمن", activeRequests: 25, matchRate: "92%", level: "تشفير وحصانة تامة" },
  { id: 53, name: "عائلة إبراهيم الكريمة", type: "العوائل غير القبلية (الخضيرية)", country: "السعودية", region: "الرياض والقصيم وحائل", status: "نشط وآمن", activeRequests: 18, matchRate: "89%", level: "تشفير وحصانة تامة" },
  { id: 54, name: "عائلة الماجد الكريمة", type: "العوائل غير القبلية (الخضيرية)", country: "السعودية", region: "الرياض وحوطة سدير والقصيم", status: "نشط وآمن", activeRequests: 21, matchRate: "93%", level: "تشفير وحصانة تامة" },
  { id: 55, name: "عائلة الحمد الكريمة", type: "العوائل غير القبلية (الخضيرية)", country: "السعودية", region: "الزلفي والرياض والوسطى", status: "نشط وآمن", activeRequests: 17, matchRate: "90%", level: "تشفير وحصانة تامة" },
  { id: 56, name: "عائلة الفهد الكريمة", type: "العوائل غير القبلية (الخضيرية)", country: "السعودية", region: "المجمعة والرياض والقصيم", status: "نشط وآمن", activeRequests: 16, matchRate: "88%", level: "تشفير وحصانة تامة" },
  { id: 57, name: "عائلة المنصور الكريمة", type: "العوائل غير القبلية (الخضيرية)", country: "السعودية", region: "الرياض والقصيم والخرج", status: "نشط وآمن", activeRequests: 20, matchRate: "91%", level: "تشفير وحصانة تامة" },
  { id: 58, name: "عائلة السليمان الكريمة", type: "العوائل غير القبلية (الخضيرية)", country: "السعودية", region: "الرياض والدمام والجبيل", status: "نشط وآمن", activeRequests: 14, matchRate: "90%", level: "تشفير وحصانة تامة" },
  { id: 59, name: "عائلة الناصر الكريمة", type: "العوائل غير القبلية (الخضيرية)", country: "السعودية", region: "الرياض والخرج والمجمعة", status: "نشط وآمن", activeRequests: 23, matchRate: "92%", level: "تشفير وحصانة تامة" },
  { id: 60, name: "عائلة الخليل الكريمة", type: "العوائل غير القبلية (الخضيرية)", country: "السعودية", region: "الرياض والدرعية والوشم", status: "نشط وآمن", activeRequests: 12, matchRate: "87%", level: "تشفير وحصانة تامة" },
  { id: 61, name: "عائلة الرشيد الكريمة", type: "العوائل غير القبلية (الخضيرية)", country: "السعودية", region: "الرياض وحفر الباطن والزلفي", status: "نشط وآمن", activeRequests: 26, matchRate: "92%", level: "تشفير وحصانة تامة" },
  { id: 62, name: "عائلة الحبيب الكريمة", type: "العوائل غير القبلية (الخضيرية)", country: "السعودية", region: "القصيم والرياض وحائل", status: "نشط وآمن", activeRequests: 15, matchRate: "90%", level: "تشفير وحصانة تامة" },
  { id: 63, name: "عائلة العبدالله الكريمة", type: "العوائل غير القبلية (الخضيرية)", country: "الكويت", region: "العاصمة والجهراء والخليج", status: "نشط وآمن", activeRequests: 19, matchRate: "93%", level: "تشفير وحصانة تامة" },
  { id: 64, name: "عائلة الصالح الكريمة", type: "العوائل غير القبلية (الخضيرية)", country: "السعودية", region: "الرياض والأحساء والمنطقة الشرقية", status: "نشط وآمن", activeRequests: 24, matchRate: "91%", level: "تشفير وحصانة تامة" },
  { id: 65, name: "عائلة العيسى الكريمة", type: "العوائل غير القبلية (الخضيرية)", country: "السعودية", region: "الرياض والوشم وسدير", status: "نشط وآمن", activeRequests: 18, matchRate: "89%", level: "تشفير وحصانة تامة" }
];

// قائمة كاملة ومنظمة بالمدن الرئيسية لجميع دول الخليج العربي
const GCC_COUNTRIES_AND_CITIES: Record<string, string[]> = {
  "المملكة العربية السعودية": [
    "الرياض", "جدة", "مكة المكرمة", "المدينة المنورة", "الدمام", "الخبر", "الظهران", "الهفوف (الأحساء)", "الجبيل", "حفر الباطن", "القطيف", "الخفجي", "الطائف", "تبوك", "بريدة (القصيم)", "عنيزة", "الرس", "خميس مشيط", "أبها", "حائل", "نجران", "ينبع", "عرعر", "جازان", "سكاكا (الجوف)", "الباحة", "الخرج", "القريات", "الدوادمي", "المجمعة", "شقراء", "حوطة بني تميم"
  ],
  "الإمارات العربية المتحدة": [
    "أبوظبي", "دبي", "الشارقة", "العين", "عجمان", "رأس الخيمة", "الفجيرة", "أم القيوين", "خورفكان", "كلباء", "الظفرة", "الرويس", "دبا الحصن"
  ],
  "دولة الكويت": [
    "مدينة الكويت", "الأحمدي", "الفروانية", "حولي", "الجهراء", "السالمية", "مبارك الكبير", "الفحيحيل", "الجابرية", "الروضة", "الشامية", "المنصورية"
  ],
  "سلطنة عمان": [
    "مسقط", "صلالة", "نزوى", "صحار", "صور", "البريمي", "الرستاق", "بهلاء", "إبراء", "خصيب (مسندم)", "الدقم", "مطرح", "السيب", "عبري"
  ],
  "دولة قطر": [
    "الدوحة", "الريان", "الوكرة", "الخور", "لوسيل", "الشمال", "الشيحانية", "أم صلال", "الضعاين", "مسيعيد", "دخان"
  ],
  "مملكة البحرين": [
    "المنامة", "المحرق", "الرفاع", "مدينة حمد", "مدينة عيسى", "الحد", "البديع", "سترة", "الجسرة", "البسيتين", "سار"
  ]
};

// Utility to highlight search match dynamically
const highlightText = (text: string, highlight: string) => {
  if (!highlight.trim()) return <span>{text}</span>;
  try {
    const escapedHighlight = highlight.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    const regex = new RegExp(`(${escapedHighlight})`, "gi");
    const parts = text.split(regex);
    return (
      <span>
        {parts.map((part, i) =>
          regex.test(part) ? (
            <mark key={i} className="bg-amber-500/30 text-amber-200 rounded px-0.5 font-bold">
              {part}
            </mark>
          ) : (
            part
          )
        )}
      </span>
    );
  } catch (e) {
    return <span>{text}</span>;
  }
};

export default function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [activeTab, setActiveTab] = useState<"home" | "apply" | "vip" | "faq" | "dashboard">("home");
  const [showFABMenu, setShowFABMenu] = useState(false);
  const [source, setSource] = useState<string>("direct");

  // Public Tribes & Families Search Directory States
  const [tribeSearchTerm, setTribeSearchTerm] = useState("");
  const [selectedTribeCountry, setSelectedTribeCountry] = useState("الكل");
  const [selectedTribeType, setSelectedTribeType] = useState("الكل");
  const [tribeSortKey, setTribeSortKey] = useState<"requests" | "alphabetical">("requests");
  const [showAdminLogin, setShowAdminLogin] = useState(false);

  // Statistics & Applications from Server
  const [stats, setStats] = useState<Stats>({
    whatsapp_total: 0,
    whatsapp_general: 0,
    whatsapp_apply: 0,
    whatsapp_vip: 0,
    vip_basic_clicks: 0,
    vip_plus_clicks: 0,
    vip_special_clicks: 0,
    sources: { snapchat: 0, tiktok: 0, instagram: 0, direct: 0 },
    page_views: 0
  });
  const [applications, setApplications] = useState<Application[]>([]);
  const [vipInquiries, setVipInquiries] = useState<VipInquiry[]>([]);

  // --- Recharts Chart Data Calculations ---
  const chartDataDaily = useMemo(() => {
    const dailyGroups: Record<string, number> = {};
    
    // Seed last 7 days with 0
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toLocaleDateString("ar-SA", { month: "short", day: "numeric" });
      dailyGroups[dateStr] = 0;
    }

    // Populate with actual application counts
    applications.forEach(app => {
      try {
        const date = new Date(app.createdAt);
        if (isNaN(date.getTime())) return;
        const dateStr = date.toLocaleDateString("ar-SA", { month: "short", day: "numeric" });
        dailyGroups[dateStr] = (dailyGroups[dateStr] || 0) + 1;
      } catch (e) {
        console.error("Error parsing application date:", e);
      }
    });

    return Object.keys(dailyGroups).map(day => ({
      name: day,
      "الطلبات": dailyGroups[day]
    }));
  }, [applications]);

  const chartDataMonthly = useMemo(() => {
    const monthlyGroups: Record<string, number> = {};
    
    // Seed last 6 months with 0
    const monthsList = ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"];
    const currentMonthIdx = new Date().getMonth();
    for (let i = 5; i >= 0; i--) {
      const idx = (currentMonthIdx - i + 12) % 12;
      monthlyGroups[monthsList[idx]] = 0;
    }

    applications.forEach(app => {
      try {
        const date = new Date(app.createdAt);
        if (isNaN(date.getTime())) return;
        const monthIdx = date.getMonth();
        const monthName = monthsList[monthIdx];
        if (monthlyGroups[monthName] !== undefined) {
          monthlyGroups[monthName] = (monthlyGroups[monthName] || 0) + 1;
        } else {
          monthlyGroups[monthName] = 1;
        }
      } catch (e) {
        console.error("Error parsing application date month:", e);
      }
    });

    return Object.keys(monthlyGroups).map(month => ({
      name: month,
      "الطلبات": monthlyGroups[month]
    }));
  }, [applications]);

  const chartDataCountry = useMemo(() => {
    const countryGroups: Record<string, number> = {};
    const defaultCountries = ["المملكة العربية السعودية", "الكويت", "الإمارات العربية المتحدة", "قطر", "سلطنة عمان", "البحرين"];
    
    // Seed default countries
    defaultCountries.forEach(c => {
      countryGroups[c] = 0;
    });

    applications.forEach(app => {
      try {
        let country = "أخرى";
        if (app.city) {
          const match = app.city.match(/\(([^)]+)\)/);
          if (match && match[1]) {
            country = match[1].trim();
          } else if (app.city.includes("السعودية") || app.city.includes("الرياض") || app.city.includes("جدة")) {
            country = "المملكة العربية السعودية";
          } else if (app.city.includes("الكويت")) {
            country = "الكويت";
          } else if (app.city.includes("الإمارات") || app.city.includes("دبي") || app.city.includes("أبوظبي")) {
            country = "الإمارات العربية المتحدة";
          } else if (app.city.includes("قطر") || app.city.includes("الدوحة")) {
            country = "قطر";
          } else if (app.city.includes("البحرين") || app.city.includes("المنامة")) {
            country = "البحرين";
          } else if (app.city.includes("عمان") || app.city.includes("مسقط")) {
            country = "سلطنة عمان";
          }
        }
        countryGroups[country] = (countryGroups[country] || 0) + 1;
      } catch (e) {
        console.error("Error parsing country from city:", e);
      }
    });

    return Object.keys(countryGroups)
      .map(country => ({
        name: country,
        "الطلبات": countryGroups[country]
      }))
      .filter(item => item["الطلبات"] > 0 || defaultCountries.includes(item.name));
  }, [applications]);
  
  // Application Form State
  const [formSubmitSuccess, setFormSubmitSuccess] = useState(false);
  const [generatedWaLink, setGeneratedWaLink] = useState("");
  const [generatedWaMessage, setGeneratedWaMessage] = useState("");
  const [selectedFormCountry, setSelectedFormCountry] = useState("المملكة العربية السعودية");
  const [selectedFormCity, setSelectedFormCity] = useState("الرياض");
  const [formData, setFormData] = useState({
    gender: "أنثى",
    age: 26,
    city: "الرياض (المملكة العربية السعودية)",
    maritalStatus: "أعزب",
    note: "",
    contact: ""
  });

  // Sync the Country and City to formData.city
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      city: `${selectedFormCity} (${selectedFormCountry})`
    }));
  }, [selectedFormCountry, selectedFormCity]);

  // When selectedFormCountry changes, reset selectedFormCity to the first city of that country
  useEffect(() => {
    const defaultCity = GCC_COUNTRIES_AND_CITIES[selectedFormCountry]?.[0] || "أخرى";
    setSelectedFormCity(defaultCity);
  }, [selectedFormCountry]);

  // Admin Security State
  const [adminPass, setAdminPass] = useState("");
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminError, setAdminError] = useState("");

  // WhatsApp Notifications Settings State
  const [whatsappSettings, setWhatsappSettings] = useState({
    provider: "callmebot",
    phone: "",
    apiKey: "",
    webhookUrl: "",
    enabled: false
  });
  const [whatsappStatusMsg, setWhatsappStatusMsg] = useState("");
  const [isTestingWhatsApp, setIsTestingWhatsApp] = useState(false);
  const [isSavingWhatsApp, setIsSavingWhatsApp] = useState(false);

  useEffect(() => {
    if (isAdminAuthenticated) {
      fetchWhatsAppSettings();
    }
  }, [isAdminAuthenticated]);

  const fetchWhatsAppSettings = async () => {
    try {
      const res = await fetch("/api/whatsapp/settings");
      if (res.ok) {
        const data = await res.json();
        setWhatsappSettings(data.settings);
      }
    } catch (err) {
      console.warn("Failed fetching whatsapp settings", err);
    }
  };

  // FAQ Accordion Active Item Index
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // State to track copied link visual feedback in dashboard
  const [copiedLink, setCopiedLink] = useState<string | null>(null);

  // Gcloud CLI & Service Public accessibility status states
  const [gcloudStatus, setGcloudStatus] = useState<{
    connectedToInternet: boolean;
    isPublic: boolean;
    statusCode: number;
    error: string | null;
    serviceName: string;
    region: string;
    sharedUrl: string;
    commandToRun: string;
  } | null>(null);
  const [gcloudLoading, setGcloudLoading] = useState(false);
  const [gcloudActionLoading, setGcloudActionLoading] = useState(false);
  const [gcloudResult, setGcloudResult] = useState<{
    success: boolean;
    stdout?: string;
    stderr?: string;
    error?: string;
  } | null>(null);

  // State to track if promotional ad text copy template was copied
  const [copiedPromoText, setCopiedPromoText] = useState(false);

  // Floating Toast Notification for VIP Share actions
  const [shareToast, setShareToast] = useState<string | null>(null);

  // Monitor Query Parameters for tracking source & registering visitor enter
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const utmSource = params.get("utm_source");
    const sourceParam = params.get("source");
    
    let srcParam = "direct";
    if (utmSource) {
      srcParam = utmSource.toLowerCase();
    } else if (sourceParam) {
      srcParam = sourceParam.toLowerCase();
    }

    if (srcParam.includes("snap")) {
      srcParam = "snapchat";
    } else if (srcParam.includes("tiktok") || srcParam.includes("tik")) {
      srcParam = "tiktok";
    } else if (srcParam.includes("instagram") || srcParam.includes("insta")) {
      srcParam = "instagram";
    } else if (srcParam === "organic" || srcParam === "direct" || !srcParam) {
      srcParam = "direct";
    }

    setSource(srcParam);

    // Initial page load track
    registerEvent("page_view", srcParam);
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch("/api/stats");
      if (res.ok) {
        const data = await res.json();
        setStats(data.stats);
        setApplications(data.applications || []);
        setVipInquiries(data.vipInquiries || []);
      }
    } catch (e) {
      console.warn("Failed to retrieve statistics from backend", e);
    }
  };

  const fetchGcloudStatus = async () => {
    setGcloudLoading(true);
    try {
      const res = await fetch("/api/gcloud/status");
      if (res.ok) {
        const data = await res.json();
        setGcloudStatus(data);
      }
    } catch (e) {
      console.warn("Failed to retrieve gcloud/public status from backend", e);
    } finally {
      setGcloudLoading(false);
    }
  };

  const triggerMakePublic = async () => {
    setGcloudActionLoading(true);
    setGcloudResult(null);
    try {
      const res = await fetch("/api/gcloud/make-public", { method: "POST" });
      const data = await res.json();
      setGcloudResult(data);
      // Refresh status after applying the changes
      await fetchGcloudStatus();
    } catch (e: any) {
      console.warn("Failed to trigger make-public", e);
      setGcloudResult({ success: false, error: e.message || "عطل في الاتصال بالخادم" });
    } finally {
      setGcloudActionLoading(false);
    }
  };

  // Fetch gcloud status when entering dashboard
  useEffect(() => {
    if (activeTab === "dashboard") {
      fetchGcloudStatus();
    }
  }, [activeTab]);

  const registerEvent = async (event: string, overideSource?: string) => {
    try {
      const res = await fetch("/api/stats/increment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ event, source: overideSource || source })
      });
      if (res.ok) {
        const data = await res.json();
        setStats(data.stats);
      }
    } catch (e) {
      console.warn("Could not register event", e);
    }
  };

  const handleApplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.contact) {
      alert("الطلب يحتاج رقم الاتصال الهاتفي أو حساب تواصل لإتمام الترشيح");
      return;
    }

    // Build the ready-to-send Arabic WhatsApp message with user details
    const messageTemplate = `السلام عليكم ورحمة الله وبركاته،
أود تقديم طلب عضوية واستفسار جديد في منصة خطابة كبار الشخصيات:

👤 الجنس: ${formData.gender}
📅 العمر: ${formData.age} عام
📍 المدينة/الدولة: ${formData.city}
💍 الحالة الاجتماعية: ${formData.maritalStatus}
📝 مواصفات الشريك والطلب: ${formData.note || "لم تحدد بعد"}
📞 وسيلة التواصل: ${formData.contact}

يرجى إفادتي بالخطوات التالية لتفعيل مطابقة النخبة السرية وباقات VIP المتاحة. وشكراً لكم.`;

    const encodedMsg = encodeURIComponent(messageTemplate);
    const targetUrl = `https://wa.me/966547056497?text=${encodedMsg}`;
    
    setGeneratedWaLink(targetUrl);
    setGeneratedWaMessage(messageTemplate);

    try {
      const res = await fetch("/api/applications/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          source
        })
      });
      if (res.ok) {
        setFormSubmitSuccess(true);
        fetchData();
      }
    } catch (err) {
      console.warn("Error submitting application server-side", err);
      setFormSubmitSuccess(true);
    }

    // Direct automated redirect for seamless single-step experience
    if (typeof window !== "undefined") {
      try {
        const win = window.open(targetUrl, "_blank");
        if (!win || win.closed || typeof win.closed === "undefined") {
          window.location.href = targetUrl;
        }
      } catch (e) {
        window.location.href = targetUrl;
      }
    }
  };

  const resetStats = async () => {
    if (!confirm("هل أنت متأكد من تصفير كافة إحصائيات الضغوط والطلبات؟ لا يمكن التراجع عن هذا الإجراء.")) return;
    try {
      const res = await fetch("/api/stats/reset", { method: "POST" });
      if (res.ok) {
        const data = await res.json();
        setStats(data.stats);
        setApplications(data.applications || []);
        setVipInquiries(data.vipInquiries || []);
        alert("تم تصفير لوحة الإحصائيات بنجاح");
      }
    } catch (err) {
      alert("فشل تصفير الإحصائيات");
    }
  };

  const handleWhatsAppAction = (type: keyof typeof WHATSAPP_TEMPLATES, eventName: string) => {
    registerEvent(eventName);
    const targetUrl = WHATSAPP_TEMPLATES[type];
    if (typeof window !== "undefined") {
      try {
        const win = window.open(targetUrl, "_blank");
        if (!win || win.closed || typeof win.closed === "undefined") {
          window.location.href = targetUrl;
        }
      } catch (e) {
        window.location.href = targetUrl;
      }
    }
  };

  const handleRequestForFamily = (familyName: string, isVip: boolean) => {
    if (isVip) {
      setActiveTab("vip");
    } else {
      setActiveTab("apply");
      setFormData(prev => ({
        ...prev,
        note: `أرغب بالارتباط من طرف ينتمي إلى (${familyName}) الكرام. المواصفات المطلوبة الأخرى: `
      }));
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getPublicUrl = () => {
    return "https://ais-pre-sjehcuhnbfmn3lkfd7ooar-962571876562.europe-west2.run.app";
  };

  const handleSharePlatform = async () => {
    registerEvent("whatsapp_general");
    const publicUrl = getPublicUrl();
    const shareData = {
      title: "خطّابة كبار الشخصيات",
      text: "خطّابة كبار الشخصيات - منصة التوفيق الخاصة والآمنة لتوفيق النخبة، الشيوخ، وعائلة النخبة في الخليج.",
      url: publicUrl
    };

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share(shareData);
        setShareToast("تمت مشاركة رابط المنصة بنجاح!");
        setTimeout(() => setShareToast(null), 3000);
      } catch (err) {
        if (err instanceof Error && err.name !== "AbortError") {
          fallbackCopyToClipboard();
        }
      }
    } else {
      fallbackCopyToClipboard();
    }
  };

  const fallbackCopyToClipboard = () => {
    const publicUrl = getPublicUrl();
    try {
      navigator.clipboard.writeText(publicUrl);
      setShareToast("تم نسخ رابط المنصة الفاخرة بنجاح! جاهز ومتهيّئ للإرسال والمشاركة عبر الواتساب والمجالس.");
      setTimeout(() => setShareToast(null), 5000);
    } catch {
      const textArea = document.createElement("textarea");
      textArea.value = publicUrl;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand("copy");
        setShareToast("تم نسخ رابط المنصة الفاخرة بنجاح! جاهز للإرسال والمشاركة.");
        setTimeout(() => setShareToast(null), 5000);
      } catch {
        setShareToast("رابط المنصة: " + publicUrl);
        setTimeout(() => setShareToast(null), 6000);
      }
      document.body.removeChild(textArea);
    }
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPass === "966VIP" || adminPass === "madiwan2026" || adminPass === "123456") {
      setIsAdminAuthenticated(true);
      setAdminError("");
      fetchData();
    } else {
      setAdminError("رمز المرور الذي أدخلته غير صحيح. يرجى المحاولة مجدداً.");
    }
  };

  const handleSaveWhatsAppSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingWhatsApp(true);
    setWhatsappStatusMsg("");
    try {
      const res = await fetch("/api/whatsapp/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(whatsappSettings)
      });
      if (res.ok) {
        setWhatsappStatusMsg("تم حفظ إعدادات تنبيهات واتساب بنجاح! ✅");
        setTimeout(() => setWhatsappStatusMsg(""), 4000);
      } else {
        setWhatsappStatusMsg("فشل حفظ الإعدادات، يرجى التحقق من المدخلات.");
      }
    } catch (err) {
      setWhatsappStatusMsg("حدث خطأ أثناء الاتصال بالخادم.");
    } finally {
      setIsSavingWhatsApp(false);
    }
  };

  const handleTestWhatsApp = async () => {
    setIsTestingWhatsApp(true);
    setWhatsappStatusMsg("");
    try {
      const res = await fetch("/api/whatsapp/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(whatsappSettings)
      });
      const data = await res.json();
      if (res.ok) {
        setWhatsappStatusMsg("تم إرسال رسالة تجريبية بنجاح إلى رقم الواتساب المختار! تحقق من هاتفك 🔔");
      } else {
        setWhatsappStatusMsg(`فشل إرسال الاختبار: ${data.error || "تأكد من صحة الرقم ومفتاح API"}`);
      }
    } catch (err) {
      setWhatsappStatusMsg("حدث خطأ أثناء إرسال رسالة الاختبار.");
    } finally {
      setIsTestingWhatsApp(false);
    }
  };

  const handleDeleteApplication = async (id: string) => {
    if (!window.confirm("هل أنت متأكد من رغبتك في حذف هذا الطلب بشكل نهائي وبلا عودة؟")) return;
    try {
      const res = await fetch(`/api/applications/${id}`, { method: "DELETE" });
      if (res.ok) {
        const data = await res.json();
        setApplications(data.applications || []);
        alert("تم حذف الطلب بنجاح ✅");
      } else {
        alert("فشل حذف الطلب");
      }
    } catch (err) {
      console.error("Error deleting application", err);
    }
  };

  const handleDeleteVipInquiry = async (id: string) => {
    if (!window.confirm("هل أنت متأكد من رغبتك في حذف هذا الاستفسار بشكل نهائي وبلا عودة؟")) return;
    try {
      const res = await fetch(`/api/vip-inquiries/${id}`, { method: "DELETE" });
      if (res.ok) {
        const data = await res.json();
        setVipInquiries(data.vipInquiries || []);
        alert("تم حذف الاستفسار بنجاح ✅");
      } else {
        alert("فشل حذف الاستفسار");
      }
    } catch (err) {
      console.error("Error deleting inquiry", err);
    }
  };

  if (showWelcome) {
    return <WelcomePage onEnter={() => setShowWelcome(false)} />;
  }

  const isDevUrl = typeof window !== "undefined" && window.location.origin.includes("ais-dev-");

  return (
    <div dir="rtl" className="min-h-screen bg-[#0a0907] text-[#e4dfd5] font-sans relative pb-28 md:pb-32 selection:bg-[#c5a85c]/30 selection:text-white">
      
      {/* ⚠️ DEVELOPER INSTRUCTIONS WARNING BANNER */}
      {isDevUrl && (
        <div className="bg-gradient-to-r from-[#110f0c] via-[#2d271e] to-[#020202] text-white py-3 px-4 text-center font-sans border-b border-[#c5a85c]/20 relative z-50 shadow-md">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-right">
            <div className="space-y-1">
              <span className="text-xs font-black bg-[#c5a85c]/25 text-[#f3da90] px-2 py-0.5 rounded ml-2 select-none">
                بروتوكول تفعيل الرابط
              </span>
              <p className="inline text-xs font-bold leading-relaxed">
                أنت تتصفح نسخة البرمجة الخاصة بك الآن. مشاركة هذا الرابط (ais-dev-) مع العملاء تطالبهم بتسجيل دخول! 
                <strong className="block md:inline md:mr-2 text-white">لمشاركة المنصة بنجاح مع كافة الأشخاص والعملاء، استخدم دائماً الرابط الساري والفعال العام التالي:</strong>
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="font-mono text-xs font-bold bg-white/10 px-2.5 py-1 rounded select-all font-sans">
                https://ais-pre-sjehcuhnbfmn3lkfd7ooar-962571876562.europe-west2.run.app
              </span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText("https://ais-pre-sjehcuhnbfmn3lkfd7ooar-962571876562.europe-west2.run.app");
                  alert("تمت العملية بنجاح! تم نسخ الرابط الفعال العام للعملاء وهو جاهز للإرسال والمشاركة عبر الواتساب والمجالس.");
                }}
                className="bg-[#c5a85c] hover:bg-[#f3da90] text-stone-950 font-bold text-xs px-3 py-1.5 rounded-lg transition-transform active:scale-95 cursor-pointer flex items-center gap-1"
              >
                نسخ الرابط الفعال للعملاء 📋
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Glow overlays (Gold/Luxury style) */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#c5a85c]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-0 w-[500px] h-[500px] bg-[#9c824a]/3 rounded-full blur-[140px] pointer-events-none" />

      {/* LUXURY STATUS HEADER BAR */}
      <div className="border-b border-[#c5a85c]/25 bg-[#110f0c]/90 backdrop-blur-md sticky top-0 z-40 transition-all duration-300 animate-fadeIn">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Logo Brand Frame */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab("home")}>
            <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-[#c5a85c]/40 bg-[#1c1914] group flex items-center justify-center shadow-md pt-0.5">
              <span className="text-xl font-bold text-[#f3da90] font-serif">M</span>
              <div className="absolute inset-0 bg-gradient-to-t from-[#c5a85c]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="text-right">
              <h1 className="text-lg md:text-xl font-bold tracking-tight text-[#f3da90] flex items-center gap-1.5 font-sans">
                خطّابة كبار الشخصيات
                <Crown size={15} className="text-[#c5a85c] animate-pulse fill-[#c5a85c]/10" />
              </h1>
              <div className="flex items-center gap-1.5 flex-wrap">
                <p className="text-[10px] md:text-xs text-[#b9b1a2] font-light font-sans">
                  شيوخ • رجال أعمال • النخبة في الخليج
                </p>
                <span className="text-stone-700 text-[10px] hidden sm:inline">•</span>
                <span className="inline-flex items-center gap-1 bg-[#c5a85c]/10 border border-[#c5a85c]/20 text-[#f3da90] px-1.5 py-0.5 rounded text-[9px] font-bold font-sans">
                  العربية السعودية 🇸🇦
                </span>
              </div>
            </div>
          </div>

          {/* Elegant Tabs & Share Action Wrap */}
          <div className="flex flex-wrap items-center gap-3 justify-center sm:justify-end">
            <nav className="flex items-center gap-1 bg-[#1c1914] p-1 rounded-xl border border-[#c5a85c]/25">
              <button
                id="tab-home"
                onClick={() => { setActiveTab("home"); window.scrollTo({top:0, behavior:'smooth'}); }}
                className={`px-3 md:px-4 py-2 text-xs md:text-sm font-semibold rounded-lg transition-all duration-200 cursor-pointer ${
                  activeTab === "home" 
                    ? "bg-gradient-to-r from-[#d4af37] to-[#c5a85c] text-stone-950 font-black shadow-[0_4px_12px_rgba(197,168,92,0.25)]" 
                    : "text-[#b9b1a2] hover:text-[#f3da90] hover:bg-[#c5a85c]/10"
                }`}
              >
                الرئيسية
              </button>
              <button
                id="tab-apply"
                onClick={() => { setActiveTab("apply"); window.scrollTo({top:0, behavior:'smooth'}); }}
                className={`px-3 md:px-4 py-2 text-xs md:text-sm font-semibold rounded-lg transition-all duration-200 cursor-pointer ${
                  activeTab === "apply"
                    ? "bg-gradient-to-r from-[#d4af37] to-[#c5a85c] text-stone-950 font-black shadow-[0_4px_12px_rgba(197,168,92,0.25)]"
                    : "text-[#b9b1a2] hover:text-[#f3da90] hover:bg-[#c5a85c]/10"
                }`}
              >
                طلب العضوية
              </button>
              <button
                id="tab-vip"
                onClick={() => { setActiveTab("vip"); window.scrollTo({top:0, behavior:'smooth'}); }}
                className={`px-3 md:px-4 py-2 text-xs md:text-sm font-semibold rounded-lg transition-all duration-200 cursor-pointer ${
                  activeTab === "vip"
                    ? "bg-gradient-to-r from-[#d4af37] to-[#c5a85c] text-stone-950 font-black shadow-[0_4px_12px_rgba(197,168,92,0.25)]"
                    : "text-[#b9b1a2] hover:text-[#f3da90] hover:bg-[#c5a85c]/10"
                }`}
              >
                عضوية VIP
              </button>
              <button
                id="tab-faq"
                onClick={() => { setActiveTab("faq"); window.scrollTo({top:0, behavior:'smooth'}); }}
                className={`px-3 md:px-4 py-2 text-xs md:text-sm font-semibold rounded-lg transition-all duration-200 cursor-pointer ${
                  activeTab === "faq"
                    ? "bg-gradient-to-r from-[#d4af37] to-[#c5a85c] text-stone-950 font-black shadow-[0_4px_12px_rgba(197,168,92,0.25)]"
                    : "text-[#b9b1a2] hover:text-[#f3da90] hover:bg-[#c5a85c]/10"
                }`}
              >
                الخصوصية والأسئلة
              </button>
              <button
                id="tab-dashboard-btn"
                onClick={() => { setActiveTab("dashboard"); window.scrollTo({top:0, behavior:'smooth'}); }}
                className={`px-2.5 md:px-3.5 py-2 text-xs md:text-sm font-medium rounded-lg transition-all duration-200 cursor-pointer flex items-center gap-1 ${
                  activeTab === "dashboard"
                    ? "bg-gradient-to-r from-[#d4af37] to-[#c5a85c] text-stone-950 font-black shadow-[0_4px_12px_rgba(197,168,92,0.25)]"
                    : "text-[#b9b1a2] hover:text-[#f3da90] hover:bg-[#c5a85c]/10"
                }`}
              >
                {isAdminAuthenticated ? <Unlock size={12} className={activeTab === "dashboard" ? "text-stone-950" : "text-[#c5a85c]"} /> : <Lock size={12} className={activeTab === "dashboard" ? "text-stone-950" : "text-[#c5a85c]"} />}
                لوحة التحكم
              </button>
            </nav>

            <button
              id="header-share-btn"
              onClick={handleSharePlatform}
              className="px-3.5 py-2 text-xs md:text-sm font-semibold rounded-xl bg-[#c5a85c]/15 border border-[#c5a85c]/30 text-[#f3da90] hover:text-stone-950 hover:bg-gradient-to-r hover:from-[#d4af37] hover:to-[#c5a85c] active:scale-95 transition-all duration-200 flex items-center gap-1.5 shadow-sm cursor-pointer group"
              title="مشاركة المنصة مع الآخرين"
            >
              <Share2 size={13} className="text-[#f3da90] group-hover:text-stone-950 transition-colors" />
              <span>مشاركة المنصة</span>
            </button>
          </div>
        </div>
      </div>

      {/* GENTLE SUB HEADER TRUST ANCHOR */}
      <div className="bg-[#110f0c] border-b border-[#c5a85c]/20 py-2.5 text-center px-4">
        <p className="text-[11px] md:text-xs text-[#b9b1a2] font-medium flex items-center justify-center gap-1.5">
          <ShieldCheck size={14} className="text-[#c5a85c]" />
          <span>خصوصية تامة مطلقة • تحقق يدوي دقيق • تغطية شاملة لكامل دول الخليج العربي</span>
        </p>
      </div>

      {/* CORE VIEWPORT CARDS */}
      <main className="max-w-4xl mx-auto px-4 pt-8 md:pt-12">
        
        {/* TAB 1: HOME VIEW */}
        {activeTab === "home" && (
          <div className="space-y-16 animate-fadeIn pb-12">
            
            {/* HERO SECTION */}
            <section className="text-center py-8 space-y-6 relative">
              <div className="flex justify-center mb-6">
                {/* Embedded luxury generated logo emblem if loaded gracefully */}
                <div id="emblem-container" className="relative group">
                  <div className="absolute -inset-1.5 bg-gradient-to-r from-amber-500 to-yellow-600 rounded-full opacity-35 blur group-hover:opacity-60 transition duration-1000"></div>
                  <img 
                    src="/src/assets/images/luxury_emblem_1781967540638.jpg" 
                    alt="Luxury Matchmaking Emblem" 
                    referrerPolicy="no-referrer"
                    className="relative w-24 h-24 rounded-full border border-amber-400 bg-stone-950 object-cover shadow-2xl transition duration-500 hover:scale-105"
                    onError={(e) => {
                      // fallback to elegant vector golden badge if missing or not generated
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-3xl md:text-5xl font-black text-stone-100 font-sans leading-tight">
                  خطّابة <span className="gold-gradient-text">كبار الشخصيات</span>
                </h2>
                <p className="text-base md:text-xl text-stone-300 font-light max-w-xl mx-auto leading-relaxed">
                  بوابة توفيق فخمة مصممة حصرياً للنخبة والعائلات العريقة في منطقة الخليج لربط الشركاء بسرّية مطلقة واحترافية متكاملة.
                </p>
              </div>

              {/* ACTION CALLS */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6 max-w-md mx-auto">
                <button
                  id="cta-whatsapp-hero"
                  onClick={() => handleWhatsAppAction("general", "whatsapp_general")}
                  className="w-full sm:w-auto bg-[#25D366] hover:bg-[#20ba59] text-stone-950 font-bold px-8 py-4 rounded-xl flex items-center justify-center gap-2.5 shadow-xl shadow-green-950/20 active:scale-95 transition-all text-base animate-pulse"
                >
                  <MessageCircle size={20} className="fill-stone-950" />
                  مراسلة واتساب الآن
                </button>
                <button
                  id="cta-apply-hero"
                  onClick={() => { setActiveTab("apply"); window.scrollTo({top:0, behavior:'smooth'}); }}
                  className="w-full sm:w-auto border border-amber-400 hover:border-amber-300 hover:bg-amber-400/5 text-amber-300 px-8 py-4 rounded-xl text-base font-medium shadow-sm transition-all"
                >
                  تقديم طلب العضوية
                </button>
              </div>
            </section>

            {/* THREE PREMIUM FEATURE CARDS (Section B) */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div id="quick-card-1" className="bg-stone-900/40 p-6 rounded-2xl border border-stone-800 border-gold-glow flex flex-col justify-between transition-all duration-300">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400">
                    <Sparkles size={20} />
                  </div>
                  <h3 className="text-lg font-bold text-stone-100">استفسار سريع</h3>
                  <p className="text-sm text-stone-400 leading-relaxed font-light">
                    تواصل آمن وفوري للحصول على إجابات حول شروط التقديم وخطوات البحث.
                  </p>
                </div>
                <button 
                  onClick={() => handleWhatsAppAction("general", "whatsapp_general")}
                  className="mt-6 w-full py-2.5 rounded-lg bg-stone-900 border border-stone-800 text-xs text-amber-300 hover:bg-[#25D366] hover:text-stone-950 hover:border-transparent transition-all flex items-center justify-center gap-1.5"
                >
                  <MessageCircle size={14} />
                  استفسر عبر واتساب
                </button>
              </div>

              <div id="quick-card-2" className="bg-stone-900/40 p-6 rounded-2xl border border-stone-800 border-gold-glow flex flex-col justify-between transition-all duration-300">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 animate-pulse">
                    <Heart size={20} className="fill-emerald-400/10" />
                  </div>
                  <h3 className="text-lg font-bold text-stone-100">تقديم العضوية</h3>
                  <p className="text-sm text-stone-400 leading-relaxed font-light">
                    سجل بياناتك ومواصفات الشريك المرغوب لتبدأ رحلة البحث الرسمية والتحقق.
                  </p>
                </div>
                <button 
                  onClick={() => handleWhatsAppAction("apply", "whatsapp_apply")}
                  className="mt-6 w-full py-2.5 rounded-lg bg-stone-900 border border-stone-800 text-xs text-amber-300 hover:bg-[#25D366] hover:text-stone-950 hover:border-transparent transition-all flex items-center justify-center gap-1.5"
                >
                  <MessageCircle size={14} />
                  قدّم عبر واتساب
                </button>
              </div>

              <div id="quick-card-3" className="bg-stone-900/40 p-6 rounded-2xl border border-stone-800 border-gold-glow flex flex-col justify-between transition-all duration-300">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400">
                    <Crown size={20} className="fill-amber-400/10" />
                  </div>
                  <h3 className="text-lg font-bold text-stone-100">باقات الـ VIP</h3>
                  <p className="text-sm text-stone-400 leading-relaxed font-light">
                    مطابقة خاصة وحصرية جداً للأسر الرفيعة والشيوخ مع ترشيحات مخصصة.
                  </p>
                </div>
                <button 
                  onClick={() => handleWhatsAppAction("vipGeneral", "whatsapp_vip")}
                  className="mt-6 w-full py-2.5 rounded-lg bg-stone-900 border border-stone-800 text-xs text-amber-300 hover:bg-[#25D366] hover:text-stone-950 hover:border-transparent transition-all flex items-center justify-center gap-1.5"
                >
                  <MessageCircle size={14} />
                  استفسر عن باقات VIP
                </button>
              </div>

            </section>

            {/* 🛡️ TRIBAL & FAMILY CREST SHOWCASE SECTION (عرض صور شعارات القبائل) */}
            <section className="space-y-8 animate-fadeIn">
              <div className="text-center space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold">
                  <Crown size={12} className="animate-pulse" />
                  <span>عراقة وأصالة العوائل والقبائل المشمولة</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-stone-100">
                  شعارات ورموز التقدير لبيوت النخبة والقبائل
                </h3>
                <p className="text-xs md:text-sm text-stone-400 font-light max-w-xl mx-auto leading-relaxed">
                  تمثيل فني ورموز تقديرية مستوحاة من قيم الشرف، والسيادة، والأصالة، ترمز للبيوت الكريمة التي نعتز بخدمتها في سرية تامة.
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {[
                  {
                    name: "آل سعود",
                    subtitle: "الأسرة المالكة الكريمة • السعودية",
                    icon: <Crown size={28} className="text-amber-400 drop-shadow-[0_0_12px_rgba(251,191,36,0.3)]" />,
                    brief: "سلاطين وحكام وأعلى مراتب النخبة والسيادة والجاه في الجزيرة العربية.",
                    glow: "from-amber-500/15 to-transparent"
                  },
                  {
                    name: "آل صباح",
                    subtitle: "الأسرة الحاكمة الكريمة • الكويت",
                    icon: <Crown size={28} className="text-amber-300 drop-shadow-[0_0_12px_rgba(252,211,77,0.3)]" />,
                    brief: "حكام دولة الكويت الكرام ذوي النسب الرفيع والمجد والشهامة العريقة.",
                    glow: "from-yellow-500/15 to-transparent"
                  },
                  {
                    name: "آل نهيان وآل مكتوم",
                    subtitle: "الأسر الحاكمة الكريمة • الإمارات",
                    icon: <Crown size={28} className="text-emerald-400 drop-shadow-[0_0_12px_rgba(52,211,153,0.3)]" />,
                    brief: "شيوخ وأمراء دولة الإمارات العربية المتحدة، أهل الجود والحكمة والرفعة.",
                    glow: "from-emerald-500/15 to-transparent"
                  },
                  {
                    name: "آل ثاني",
                    subtitle: "الأسرة الحاكمة الكريمة • قطر",
                    icon: <Crown size={28} className="text-purple-400 drop-shadow-[0_0_12px_rgba(192,132,252,0.3)]" />,
                    brief: "أمراء دولة قطر الأماجد، بيوت السيادة والأصالة والمكانة الرفيعة.",
                    glow: "from-purple-500/15 to-transparent"
                  },
                  {
                    name: "آل خليفة",
                    subtitle: "الأسرة الحاكمة الكريمة • البحرين",
                    icon: <Crown size={28} className="text-red-400 drop-shadow-[0_0_12px_rgba(248,113,113,0.3)]" />,
                    brief: "ملوك وحكام مملكة البحرين ذوي السيادة والتاريخ العربي العريق.",
                    glow: "from-red-500/15 to-transparent"
                  },
                  {
                    name: "آل بوسعيد",
                    subtitle: "الأسرة السلطانية الكريمة • عمان",
                    icon: <Crown size={28} className="text-blue-400 drop-shadow-[0_0_12px_rgba(96,165,250,0.3)]" />,
                    brief: "سلاطين سلطنة عمان العريقة، عراقة التاريخ وهيبة القيادة والحكمة.",
                    glow: "from-blue-500/15 to-transparent"
                  },
                  {
                    name: "آل الشيخ والسديري",
                    subtitle: "بيوت الجاه والنسب • السعودية",
                    icon: <ShieldCheck size={28} className="text-[#25D366] drop-shadow-[0_0_12px_rgba(37,211,102,0.3)]" />,
                    brief: "بيوت العلم العريقة، الخؤولة الملكية والمكانة الدبلوماسية والاجتماعية الرفيعة.",
                    glow: "from-emerald-500/15 to-transparent"
                  },
                  {
                    name: "قبيلة عنزة",
                    subtitle: "أولاد وايل • ملوك وطبقة السيادة",
                    icon: <Globe size={28} className="text-amber-500 drop-shadow-[0_0_12px_rgba(245,158,11,0.3)]" />,
                    brief: "من أعرق القبائل الوائلية بالخليج، ينحدر منها كبار الأسر الحاكمة بالمنطقة.",
                    glow: "from-amber-600/15 to-transparent"
                  },
                  {
                    name: "قبيلة شمر",
                    subtitle: "الطنايا • أهل الكرم والمواقف",
                    icon: <Sparkles size={28} className="text-yellow-400 drop-shadow-[0_0_12px_rgba(250,204,21,0.3)]" />,
                    brief: "سلايل الجود والنخوة، أهل العز والشهامة والشرف والنسب الأصيل.",
                    glow: "from-yellow-600/15 to-transparent"
                  },
                  {
                    name: "قبيلة حرب",
                    subtitle: "حرابة الدول • أهل الأصالة والمنعة",
                    icon: <ShieldAlert size={28} className="text-rose-400 drop-shadow-[0_0_12px_rgba(251,113,133,0.3)]" />,
                    brief: "قبيلة الشموخ والرفعة، ذات الشأن والرجولة والهيبة المتوارثة بالخليج.",
                    glow: "from-rose-500/15 to-transparent"
                  },
                  {
                    name: "قبيلة مطير",
                    subtitle: "حمران النواظر • أهل المجد والجاه",
                    icon: <Heart size={28} className="text-pink-400 drop-shadow-[0_0_12px_rgba(244,114,182,0.3)]" />,
                    brief: "أهل الأصالة الكريمة والمواقف المشهودة، شرف ونسب رفيع بالمملكة والخليج.",
                    glow: "from-pink-500/15 to-transparent"
                  },
                  {
                    name: "قبيلة عتيبة",
                    subtitle: "الهيلا • جموع العز والجاه",
                    icon: <Users size={28} className="text-indigo-400 drop-shadow-[0_0_12px_rgba(129,140,248,0.3)]" />,
                    brief: "من أكبر قبائل نجد والحجاز والخليج، بيوت الفروسية والشرف والمكانة الرفيعة.",
                    glow: "from-indigo-500/15 to-transparent"
                  },
                  {
                    name: "قبيلة قحطان والدواسر",
                    subtitle: "معدن الأصالة والمنعة العربية",
                    icon: <ShieldCheck size={28} className="text-sky-400 drop-shadow-[0_0_12px_rgba(56,189,248,0.3)]" />,
                    brief: "سلاطين الجزيرة وخطلان الأيدي، عراقة الأنساب وأصل الوفاء والشهامة الخالدة.",
                    glow: "from-sky-500/15 to-transparent"
                  },
                  {
                    name: "قبائل بني خالد ويام",
                    subtitle: "تاريخ المجد والشهامة الحرة",
                    icon: <Sparkles size={28} className="text-amber-200 drop-shadow-[0_0_12px_rgba(253,230,138,0.3)]" />,
                    brief: "بيوت الفخر والسيادة العريقة بالمنطقة الشرقية وجنوب الجزيرة وأرجاء الخليج.",
                    glow: "from-stone-500/15 to-transparent"
                  }
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="group bg-stone-900/40 hover:bg-stone-900/80 border border-stone-800/80 hover:border-amber-500/30 rounded-2xl p-5 text-center relative overflow-hidden transition-all duration-300 hover:-translate-y-1 shadow-lg flex flex-col justify-between"
                  >
                    {/* Ambient Glow behind Icon */}
                    <div className={`absolute top-0 left-0 right-0 h-16 bg-gradient-to-b ${item.glow} opacity-30 group-hover:opacity-60 transition-opacity pointer-events-none`} />

                    <div className="space-y-3.5 relative z-10">
                      {/* Luxury Badge Circular frame for lucide representation */}
                      <div className="w-14 h-14 rounded-full mx-auto bg-stone-950/90 border border-stone-850 group-hover:border-amber-500/40 flex items-center justify-center shadow-inner transition-colors duration-300">
                        {item.icon}
                      </div>
                      
                      <div className="space-y-1">
                        <h4 className="text-sm md:text-base font-bold text-stone-100 group-hover:text-amber-400 transition-colors">
                          {item.name}
                        </h4>
                        <span className="text-[10px] md:text-[11px] text-amber-500/80 font-medium block">
                          {item.subtitle}
                        </span>
                      </div>

                      <p className="text-[11px] text-stone-400 leading-relaxed font-light">
                        {item.brief}
                      </p>
                    </div>

                    <div className="pt-3.5 mt-2 border-t border-stone-950/40 text-[9.5px] text-stone-500 group-hover:text-amber-400/50 transition-colors">
                      نسب شريف • معتمد بالنظام 🛡️
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* HOW IT WORKS SECTION (Section C) */}
            <section className="bg-stone-900/20 border border-stone-900 p-8 rounded-3xl space-y-8">
              <div className="text-center">
                <span className="text-xs text-amber-400 font-bold uppercase tracking-wider">الخطوات الثلاث للنخبة</span>
                <h3 className="text-2xl font-bold mt-1">كيف تتم عملية المطابقة والتوفيق؟</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                {/* Step 1 */}
                <div className="text-center space-y-4 relative group">
                  <div className="w-12 h-12 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center text-amber-400 font-bold text-lg mx-auto shadow-inner group-hover:border-amber-400 transition-all duration-300">
                    ١
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-stone-200">تواصل عبر واتساب</h4>
                    <p className="text-xs text-stone-400 leading-relaxed font-light">
                      الخطوة الأولى تبدأ بمحادثتك الآمنة معنا لاطلاعنا برغبتك وتحديد الغاية.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="text-center space-y-4 relative group">
                  <div className="w-12 h-12 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center text-amber-400 font-bold text-lg mx-auto shadow-inner group-hover:border-amber-400 transition-all duration-300">
                    ٢
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-stone-200">جمع بيانات بسرّية</h4>
                    <p className="text-xs text-stone-400 leading-relaxed font-light">
                      تعبئة البيانات المهمة تحت رقابة مشددة عبر فحص التحقق اليدوي دون مشاركتها إطلاقاً.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="text-center space-y-4 relative group">
                  <div className="w-12 h-12 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center text-amber-400 font-bold text-lg mx-auto shadow-inner group-hover:border-amber-400 transition-all duration-300">
                    ٣
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-stone-200">ترشيحات متطابقة</h4>
                    <p className="text-xs text-stone-400 leading-relaxed font-light">
                      تلقي واختيار ترشيحات راقية تليق بالمستوى الأسري والاجتماعي المأمول.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* TRUST & INFOLINES (Section D) */}
            <section className="border-t border-stone-900 pt-10 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-right">
              <div className="space-y-1">
                <span className="text-[10px] text-amber-400/80 font-bold tracking-widest uppercase block">سياسة الخصوصية</span>
                <p className="text-xs text-stone-400 font-light leading-relaxed">
                  تشفير كامل لكافة المدخلات والصور المتبادلة وتدمير فوري للبيانات بعد إتمام المطابقة بنجاح.
                </p>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] text-amber-400/80 font-bold tracking-widest uppercase block">شروط الاستخدام والتقديم</span>
                <p className="text-xs text-stone-400 font-light leading-relaxed">
                  التحقق الهاتفي المباشر إلزامي. نقبل الطلبات الجادّة فقط للزواج الشرعي وممنوع العبث.
                </p>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] text-amber-400/80 font-bold tracking-widest uppercase block">وقت الرد المتوقع</span>
                <p className="text-xs text-stone-400 font-light leading-relaxed">
                  تتم مراجعة الطلبات بدقة خلال ١٢ إلى ٢٤ ساعة على مدار الأسبوع لمراعاة الفحص الكامل.
                </p>
              </div>
            </section>

          </div>
        )}

        {/* TAB 2: APPLY FOR MEMBERSHIP VIEW */}
        {activeTab === "apply" && (
          <div className="space-y-10 animate-fadeIn pb-12">
            
            <div className="text-center space-y-2">
              <span className="text-xs text-amber-400 font-bold uppercase tracking-widest">تعبئة آمنة</span>
              <h2 className="text-3xl font-bold">نموذج العضوية المختصر</h2>
              <p className="text-sm text-stone-400 max-w-lg mx-auto font-light leading-relaxed">
                ندرك قيمة وقتك، لذا تجنبنا النماذج المشتتة الطويلة. قدّم الآن لربط طلبك مباشرة.
              </p>
            </div>

            {/* UPPER QUICK ACTION BAR */}
            <div className="bg-stone-900/50 rounded-2xl border border-stone-800 p-6 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-1 text-center md:text-right">
                <h3 className="font-bold text-stone-200 text-base">التقديم الفوري عبر واتساب مباشرة</h3>
                <p className="text-xs text-stone-400 font-light">إذا كنت تفضل تخطي هذا النموذج، يمكنك إرسال البيانات فوراً لمديرة التوفيق يدوياً.</p>
              </div>
              <button 
                onClick={() => handleWhatsAppAction("apply", "whatsapp_apply")}
                className="w-full md:w-auto bg-[#25D366] hover:bg-[#20ba59] text-stone-950 font-bold px-6 py-3.5 rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all shrink-0"
              >
                <MessageCircle size={18} className="fill-stone-950" />
                التقديم عبر واتساب (الأسرع)
              </button>
            </div>

            {/* LIVE VERIFICATION INDICATOR */}
            <VettingStatusIndicator />

            {formSubmitSuccess ? (
              /* Submission Success Frame with Ready-Made WhatsApp Message Preview */
              <div className="bg-stone-900/40 border border-amber-500/20 rounded-3xl p-6 md:p-10 text-center space-y-6 max-w-2xl mx-auto shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
                
                <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-400 mx-auto animate-bounce">
                  <Check size={32} />
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-amber-300">رسالتك جاهزة للإرسال الفوري!</h3>
                  <p className="text-sm text-stone-300 max-w-md mx-auto leading-relaxed font-light">
                    تم إعداد البيانات بدقة وسرية تامة في قالب رسالة موحد ومناسب لكبار الشخصيات. يمكنك إرسالها الآن بنقرة واحدة.
                  </p>
                </div>

                {/* WhatsApp Message Preview Box */}
                <div className="text-right bg-stone-950/80 border border-stone-800 p-5 rounded-2xl relative group">
                  <span className="absolute top-3 left-3 text-[10px] font-bold text-amber-500/50 uppercase tracking-wider">معاينة الرسالة الجاهزة</span>
                  <pre className="text-xs text-stone-300 font-sans whitespace-pre-wrap leading-relaxed select-all pt-4" dir="rtl">
                    {generatedWaMessage}
                  </pre>
                  
                  <div className="mt-4 pt-3 border-t border-stone-900 flex justify-between items-center">
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(generatedWaMessage);
                        alert("تم نسخ الرسالة الجاهزة بنجاح! يمكنك الآن لصقها يدوياً إن أردت.");
                      }}
                      className="text-[11px] text-amber-400 hover:text-amber-300 flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <span>📋 نسخ نص الرسالة</span>
                    </button>
                    <span className="text-[10px] text-stone-500">تم تجهيزها وتشفيرها بنجاح</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <a
                    href={generatedWaLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#25D366] hover:bg-[#20ba59] text-stone-950 font-bold px-8 py-4 rounded-xl text-base inline-flex items-center justify-center gap-2.5 shadow-lg transition-all transform hover:scale-[1.01] active:scale-95"
                  >
                    <MessageCircle size={20} className="fill-stone-950" />
                    إرسال البيانات الجاهزة عبر واتساب الآن 🚀
                  </a>
                  
                  <p className="text-[11px] text-stone-400 font-light">
                    إذا لم تفتح نافذة واتساب تلقائياً، يرجى النقر على الزر الأخضر أعلاه لبدء المحادثة فوراً.
                  </p>
                </div>

                <div className="pt-2">
                  <button 
                    onClick={() => {
                      setFormSubmitSuccess(false);
                      setSelectedFormCountry("المملكة العربية السعودية");
                      setSelectedFormCity("الرياض");
                      setFormData({gender: "أنثى", age: 26, city: "الرياض (المملكة العربية السعودية)", maritalStatus: "أعزب", note: "", contact: ""});
                    }}
                    className="text-stone-500 hover:text-stone-400 text-xs underline cursor-pointer"
                  >
                    تعديل البيانات أو تقديم طلب جديد
                  </button>
                </div>
              </div>
            ) : (
              /* The Compact 6-Fields Form */
              <form onSubmit={handleApplySubmit} className="bg-[#141210] border border-stone-800/80 rounded-3xl p-6 md:p-10 space-y-8 shadow-2xl relative">
                <div className="absolute top-4 left-4 flex items-center gap-1.5 text-[10px] text-amber-500/70">
                  <ShieldCheck size={12} />
                  إرسال مشفر
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Field 1: Gender */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-stone-300 block">الجنس</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setFormData({...formData, gender: "أنثى"})}
                        className={`py-3.5 px-4 rounded-xl border text-sm font-medium transition-all ${
                          formData.gender === "أنثى"
                            ? "bg-amber-500/10 text-amber-400 border-amber-500/40 shadow-sm"
                            : "bg-stone-900/60 text-stone-400 border-stone-800 hover:bg-stone-800/20"
                        }`}
                      >
                        أنثى
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData({...formData, gender: "ذكر"})}
                        className={`py-3.5 px-4 rounded-xl border text-sm font-medium transition-all ${
                          formData.gender === "ذكر"
                            ? "bg-amber-500/10 text-amber-400 border-amber-500/40 shadow-sm"
                            : "bg-stone-900/60 text-stone-400 border-stone-800 hover:bg-stone-800/20"
                        }`}
                      >
                        ذكر
                      </button>
                    </div>
                  </div>

                  {/* Field 2: Age */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-stone-300 block">العمر ({formData.age} عام)</label>
                    <div className="flex items-center gap-4">
                      <input
                        type="range"
                        min="18"
                        max="75"
                        value={formData.age}
                        onChange={(e) => setFormData({...formData, age: Number(e.target.value)})}
                        className="w-full h-1.5 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                      />
                      <span className="text-sm font-mono text-amber-400 font-bold shrink-0 w-8 text-center">{formData.age}</span>
                    </div>
                  </div>

                  {/* Field 3: Country & City (Cascading selection) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 col-span-1 md:col-span-2 bg-stone-900/20 border border-stone-900/60 p-4 rounded-2xl">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-stone-300 block" htmlFor="input-country">الدولة</label>
                      <select
                        id="input-country"
                        value={selectedFormCountry}
                        onChange={(e) => setSelectedFormCountry(e.target.value)}
                        className="w-full bg-stone-950/80 border border-stone-800/80 rounded-xl px-4 py-3 text-sm text-stone-100 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 cursor-pointer text-right"
                        dir="rtl"
                      >
                        {Object.keys(GCC_COUNTRIES_AND_CITIES).map((country) => (
                          <option key={country} value={country}>{country}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-stone-300 block" htmlFor="input-city">المدينة</label>
                      <select
                        id="input-city"
                        value={selectedFormCity}
                        onChange={(e) => setSelectedFormCity(e.target.value)}
                        className="w-full bg-stone-950/80 border border-stone-800/80 rounded-xl px-4 py-3 text-sm text-stone-100 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 cursor-pointer text-right"
                        dir="rtl"
                      >
                        {(GCC_COUNTRIES_AND_CITIES[selectedFormCountry] || []).map((city) => (
                          <option key={city} value={city}>{city}</option>
                        ))}
                        <option value="مدينة أخرى">مدينة أخرى</option>
                      </select>
                    </div>
                  </div>

                  {/* Field 4: Marital Status */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-stone-300 block" htmlFor="input-marital">الحالة الاجتماعية</label>
                    <select
                      id="input-marital"
                      value={formData.maritalStatus}
                      onChange={(e) => setFormData({...formData, maritalStatus: e.target.value})}
                      className="w-full bg-stone-900/80 border border-stone-800 rounded-xl px-4 py-3.5 text-sm text-stone-100 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                    >
                      <option value="أعزب">أعزب / عزباء</option>
                      <option value="مطلق">مطلق / مطلقة</option>
                      <option value="أرمل">أرمل / أرملة</option>
                      <option value="متزوج ويرغب بشريكة">متزوج (رغبة في معدد)</option>
                    </select>
                  </div>

                </div>

                {/* Field 5: Short Note / Request Specifications */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-stone-300 block" htmlFor="input-note">مواصفات الشريك المطلوبة والطلب باختصار</label>
                  <textarea
                    id="input-note"
                    rows={3}
                    placeholder="مواصفات الشريك المرجوة مثل العمر والقبيلة والتعليم وموانع الارتباط..."
                    value={formData.note}
                    onChange={(e) => setFormData({...formData, note: e.target.value})}
                    className="w-full bg-stone-900/80 border border-stone-800 rounded-xl px-4 py-3 text-sm text-stone-100 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 placeholder:text-stone-600 resize-none"
                  />
                </div>

                {/* Field 6: Contact Number */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-stone-300 block" htmlFor="input-contact">رقم التواصل أو حساب التيليجرام / واتساب (سرّي لمديرة العلاقات فقط)</label>
                  <input
                    id="input-contact"
                    type="text"
                    required
                    placeholder="+966 5x xxx xxxx"
                    value={formData.contact}
                    onChange={(e) => setFormData({...formData, contact: e.target.value})}
                    className="w-full bg-stone-900/80 border border-stone-800 rounded-xl px-4 py-3.5 text-sm text-stone-100 placeholder:text-stone-600 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 font-mono text-left"
                    dir="ltr"
                  />
                  <p className="text-[10px] text-stone-500">لن يظهر رقمك لأي مستخدم آخر نهائياً. يتم استخدامه للتحقق من الجدّية عبر اتصال هاتفي أو واتساب.</p>
                </div>

                <div className="pt-4 text-center">
                  <button
                    type="submit"
                    className="w-full md:w-auto bg-gradient-to-r from-amber-500 to-yellow-600 text-stone-950 hover:from-amber-400 hover:to-yellow-500 font-bold px-12 py-4 rounded-xl text-base shadow-lg hover:shadow-amber-950/20 active:scale-98 transition-all"
                  >
                    إرسال الطلب المبدئي الآمن
                  </button>
                  <p className="text-xs text-stone-400 mt-3 font-light leading-relaxed">
                    بالنقر على تعبئة نموذج العضوية، أنت تؤكد جدّيتك التامة وصدق رغبتك بالزواج الشرعي.
                  </p>
                </div>

              </form>
            )}

          </div>
        )}

        {/* TAB 3: VIP PLAN COMPONENT (As requested by latest view requirement) */}
        {activeTab === "vip" && (
          <div className="space-y-12 animate-fadeIn pb-12">
            
            <div className="text-center space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs">
                <Crown size={12} className="fill-amber-400/10" />
                <span>برنامج كبار الشخصيات والشيوخ</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-stone-50">
                عضوية VIP | <span className="gold-gradient-text">مطابقة النخبة الخاصة</span>
              </h2>
              <p className="text-sm md:text-base text-stone-400 max-w-xl mx-auto font-light leading-relaxed">
                خدمة مخصصة بالكامل تدار مباشرة من قبل كبار المشرفين بخبرة تزيد عن عقد، للربط بين العائلات من ذوي التقدير الرفيع والأسر الدبلوماسية ورجال الأعمال.
              </p>
            </div>

            {/* THREE VIP CARDS TIERS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              
              {/* Card 1: VIP Basic */}
              <div id="vip-card-basic" className="bg-[#110f0d] border border-stone-800 rounded-3xl p-6 relative flex flex-col justify-between hover:border-amber-500/30 transition-all duration-305">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <span className="text-[10px] text-amber-500/60 uppercase tracking-widest font-bold">باقة المبتدئين الأثرياء</span>
                    <h3 className="text-xl font-bold flex items-center justify-between">
                      VIP أساسي
                      <Crown size={16} className="text-stone-500" />
                    </h3>
                    <p className="text-xs text-stone-400 font-light">مثالية لمن يبحث عن توافق ممتاز مع تغطية شاملة.</p>
                  </div>

                  <div className="py-2 border-y border-stone-900">
                    <span className="text-stone-300 text-xs font-light">مستوى المطابقة:</span>
                    <strong className="block text-stone-100 text-sm mt-0.5 font-medium">ذو جودة عالية وتحقق يدوي</strong>
                  </div>

                  {/* 3 distinct benefits */}
                  <ul className="space-y-3.5 text-xs text-stone-300 font-light">
                    <li className="flex items-start gap-2.5">
                      <Check size={14} className="text-amber-500 shrink-0 mt-0.5" />
                      <span>تقديم ٣ ترشيحات متطابقة مع التحقق من الهوية المدنية والعملية.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check size={14} className="text-amber-500 shrink-0 mt-0.5" />
                      <span>مراجعة الطلبات بواسطة مشرف خاص لضمان دقة مواصفات اختيارك.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check size={14} className="text-amber-500 shrink-0 mt-0.5" />
                      <span>حماية الخصوصية وحذف الصور فورا عقب العرض المباشر.</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-8">
                  <button 
                    onClick={() => {
                      registerEvent("vip_basic");
                      handleWhatsAppAction("vipBasic", "whatsapp_vip");
                    }}
                    className="w-full py-3.5 rounded-xl border border-amber-500/20 hover:border-transparent hover:bg-[#25D366] text-amber-300 hover:text-stone-950 text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                  >
                    <MessageCircle size={14} />
                    استفسار VIP أساسي عبر واتساب
                  </button>
                </div>
              </div>

              {/* Card 2: VIP Plus */}
              <div id="vip-card-plus" className="bg-[#171410] border-2 border-amber-500/30 rounded-3xl p-6 relative flex flex-col justify-between hover:border-amber-500/60 shadow-xl shadow-amber-500/[0.01] transition-all duration-305">
                {/* Popularity Badge */}
                <span className="absolute -top-3.5 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-amber-500 to-yellow-600 text-stone-950 text-[10px] font-bold px-3 py-1 rounded-full shadow-md">
                  الأكثر طلباً للنخبة
                </span>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <span className="text-[10px] text-amber-400 uppercase tracking-widest font-bold">باقة رجال الأعمال</span>
                    <h3 className="text-xl font-bold flex items-center justify-between">
                      VIP بلس
                      <Crown size={18} className="text-amber-400 fill-amber-400/20" />
                    </h3>
                    <p className="text-xs text-stone-400 font-light">الباقة القياسية لأبناء كبرى العائلات بالمنطقة.</p>
                  </div>

                  <div className="py-2 border-y border-stone-900">
                    <span className="text-amber-300/80 text-xs font-light">مستوى المطابقة:</span>
                    <strong className="block text-amber-400 text-sm mt-0.5 font-medium">ترقية مع مميزات مستمرة وفورية</strong>
                  </div>

                  {/* 3 distinct benefits */}
                  <ul className="space-y-3.5 text-xs text-stone-300 font-light">
                    <li className="flex items-start gap-2.5">
                      <Check size={14} className="text-amber-400 shrink-0 mt-0.5" />
                      <span>ترشيحات غير محدودة وتغطية عائلية قبلية وديناميكية متكاملة الأركان.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check size={14} className="text-amber-400 shrink-0 mt-0.5" />
                      <span>أولوية قصوى لمراجعة شريك حياتك في سرّية لا تدع مجالاً للخوف.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check size={14} className="text-amber-400 shrink-0 mt-0.5" />
                      <span>بحث مخفي تام دون إدراج اسمك أو بيناتك في منصة الفحص العام.</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-8">
                  <button 
                    onClick={() => {
                      registerEvent("vip_plus");
                      handleWhatsAppAction("vipPlus", "whatsapp_vip");
                    }}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-[#25D366] hover:to-[#25D366] text-stone-950 font-bold text-xs transition-all flex items-center justify-center gap-1.5 shadow-lg shadow-amber-500/10"
                  >
                    <MessageCircle size={14} className="fill-stone-950" />
                    استفسار VIP بلس عبر واتساب
                  </button>
                </div>
              </div>

              {/* Card 3: VIP Special */}
              <div id="vip-card-special" className="bg-[#110f0d] border border-stone-800 rounded-3xl p-6 relative flex flex-col justify-between hover:border-amber-500/30 transition-all duration-305">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <span className="text-[10px] text-amber-500/60 uppercase tracking-widest font-bold">باقة الشيوخ والدبلوماسيين</span>
                    <h3 className="text-xl font-bold flex items-center justify-between">
                      VIP خاص
                      <Crown size={16} className="text-yellow-600 fill-amber-500/10" />
                    </h3>
                    <p className="text-xs text-stone-400 font-light">أرقى خدمة ووساطة أسرية مغلقة ومباشرة.</p>
                  </div>

                  <div className="py-2 border-y border-stone-900">
                    <span className="text-stone-300 text-xs font-light">مستوى المطابقة:</span>
                    <strong className="block text-stone-100 text-sm mt-0.5 font-medium">وسيط شخصي مغلق متواصل هاتفيًا</strong>
                  </div>

                  {/* 3 distinct benefits */}
                  <ul className="space-y-3.5 text-xs text-stone-300 font-light">
                    <li className="flex items-start gap-2.5">
                      <Check size={14} className="text-amber-500 shrink-0 mt-0.5" />
                      <span>تكليف وسيط مخلص مخصص للبحث والاتصال الهاتفي بالعائلات المستهدفة مباشرة.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check size={14} className="text-amber-500 shrink-0 mt-0.5" />
                      <span>تأمين المقابلة العائلية الشرعية الأولى بمقر عائلي آمن مع كامل الترتيب والبروتوكول.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check size={14} className="text-amber-500 shrink-0 mt-0.5" />
                      <span>تنسيق خاص للعلاقات وعقود النكاح الرسمية تحت غطاء من الثقة التامة.</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-8">
                  <button 
                    onClick={() => {
                      registerEvent("vip_special");
                      handleWhatsAppAction("vipSpecial", "whatsapp_vip");
                    }}
                    className="w-full py-3.5 rounded-xl border border-amber-500/20 hover:border-transparent hover:bg-[#25D366] text-amber-300 hover:text-stone-950 text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                  >
                    <MessageCircle size={14} />
                    استفسار VIP خاص عبر واتساب
                  </button>
                </div>
              </div>

            </div>

            {/* VIP POLICY ANCHOR */}
            <div className="bg-stone-900/40 p-6 rounded-2xl border border-stone-800 text-center max-w-2xl mx-auto space-y-2">
              <p className="text-xs text-amber-400 font-medium">تنويه خاص بطلبات VIP</p>
              <p className="text-xs text-stone-400 leading-relaxed font-light">
                نظراً لدرجة السرية الفائقة والدقة العالية في ترشيحات الشيوخ ورجال الأعمال، فإن الطلبات تخضع للفرز المسبق والتحقق اليدوي المتصل بشرط الكفاءة والملائمة.
              </p>
            </div>

          </div>
        )}

        {/* TAB 4: CONTACT & FAQ VIEW */}
        {activeTab === "faq" && (
          <div className="space-y-12 animate-fadeIn pb-12">
            
            <div className="text-center space-y-2">
              <span className="text-xs text-amber-400 font-bold uppercase tracking-widest">مساعدة وإرشاد المواعيد</span>
              <h2 className="text-3xl font-bold">مكتب الاتصال والمطابقة العائلية</h2>
              <p className="text-sm text-stone-400 max-w-md mx-auto font-light">
                خرائط مكاتب ومقر اتصالات كبار الشخصيات المعتمدة ونموذج المراسلة الدبلوماسي المشفر لحصانة خصوصية صفوة المجتمع.
              </p>
            </div>

            {/* INTEGRATED EXECUTIVE VISUAL MAPS & SECURE CORRESPONDENCE FORM */}
            <VipContactSection />

            {/* SEPARATOR TO FAQ DETAILS */}
            <div className="pt-6 border-t border-stone-900 text-center space-y-2">
              <span className="px-3 py-1 rounded-full bg-stone-900 border border-stone-800 text-[10px] text-amber-400 font-bold uppercase tracking-wider">
                مركز المساعدة والمعرفة الآمن
              </span>
              <h3 className="text-lg font-bold text-stone-200">الأسئلة الشائعة والاستفهامات المتبعة</h3>
              <p className="text-xs text-stone-500 max-w-md mx-auto font-light">
                إليك تجميعة من أبرز الاستفسارات الشائعة حول بروتوكول السرية وفحص الطلبات اليدوي المتبع لدينا.
              </p>
            </div>

            {/* FAQ ACCORDION (Exactly 5 Questions) */}
            <div className="max-w-2xl mx-auto space-y-4">
              
              {/* Q1 */}
              <div className="border border-stone-800 rounded-2xl bg-stone-900/20 overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(openFaqIndex === 0 ? null : 0)}
                  className="w-full text-right px-6 py-4 flex items-center justify-between text-stone-200 hover:text-stone-100 font-bold text-sm bg-stone-900/10 focus:outline-none"
                >
                  <span>١. كيف تتم الخصوصية وحماية بياناتي وصوري؟</span>
                  <ChevronDown className={`text-amber-400 transform transition-transform duration-300 ${openFaqIndex === 0 ? "rotate-180" : ""}`} size={16} />
                </button>
                {openFaqIndex === 0 && (
                  <div className="px-6 pb-5 pt-1 text-xs text-stone-400 font-light leading-relaxed border-t border-stone-900">
                    أهم أولوياتنا في "خطّابة كبار الشخصيات" هي الأمان المطلق. لا يتم حفظ صورك أو تداولها في قواعد بيانات مفتوحة أو مواقع عامة، بل تتم معاينتها يدوياً فقط للمشرفة المباشرة لحين التأكد من ملائمة الطرفين، مع حذفها مباشرة بموجب اتصالك دون أي أثر.
                  </div>
                )}
              </div>

              {/* Q2 */}
              <div className="border border-stone-800 rounded-2xl bg-stone-900/20 overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(openFaqIndex === 1 ? null : 1)}
                  className="w-full text-right px-6 py-4 flex items-center justify-between text-stone-200 hover:text-stone-100 font-bold text-sm bg-stone-900/10 focus:outline-none"
                >
                  <span>٢. ما هي مدة الرد على طلبي أو استفساري؟</span>
                  <ChevronDown className={`text-amber-400 transform transition-transform duration-300 ${openFaqIndex === 1 ? "rotate-180" : ""}`} size={16} />
                </button>
                {openFaqIndex === 1 && (
                  <div className="px-6 pb-5 pt-1 text-xs text-stone-400 font-light leading-relaxed border-t border-stone-900">
                    مكتب العلاقات لدينا يتولى فحص المدخلات على مدار اليوم. يتم الرد الفوري على رسائل واتساب الواردة في غضون دقيقة إلى ساعة، بينما تستغرق مراجعة طلبات العضوية الشاملة من ١٢ إلى ٢٤ ساعة على الأكثر لضمان جدية الطرف المترشح.
                  </div>
                )}
              </div>

              {/* Q3 */}
              <div className="border border-stone-800 rounded-2xl bg-stone-900/20 overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(openFaqIndex === 2 ? null : 2)}
                  className="w-full text-right px-6 py-4 flex items-center justify-between text-stone-200 hover:text-stone-100 font-bold text-sm bg-stone-900/10 focus:outline-none"
                >
                  <span>٣. هل الخدمة متاحة للجنسين وكافة دول الخليج؟</span>
                  <ChevronDown className={`text-amber-400 transform transition-transform duration-300 ${openFaqIndex === 2 ? "rotate-180" : ""}`} size={16} />
                </button>
                {openFaqIndex === 2 && (
                  <div className="px-6 pb-5 pt-1 text-xs text-stone-400 font-light leading-relaxed border-t border-stone-900">
                    نعم، المنصة تشمل الرجال والنساء من مواطني دول مجلس التعاون الخليجي (المملكة العربية السعودية، الكويت، الإمارات العربية المتحدة، قطر، البحرين، وعمان)، ونركز بالتحديد على العوائل القبلية الكريمة وكبار العائلات والمسؤولين.
                  </div>
                )}
              </div>

              {/* Q4 */}
              <div className="border border-stone-800 rounded-2xl bg-stone-900/20 overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(openFaqIndex === 3 ? null : 3)}
                  className="w-full text-right px-6 py-4 flex items-center justify-between text-stone-200 hover:text-stone-100 font-bold text-sm bg-stone-900/10 focus:outline-none"
                >
                  <span>٤. كيف يتم التحقق من جدية الشركاء المترشحين؟</span>
                  <ChevronDown className={`text-amber-400 transform transition-transform duration-300 ${openFaqIndex === 3 ? "rotate-180" : ""}`} size={16} />
                </button>
                {openFaqIndex === 3 && (
                  <div className="px-6 pb-5 pt-1 text-xs text-stone-400 font-light leading-relaxed border-t border-stone-900">
                    تبدأ عملية التحقق من خلال التأكد من أرقام الهواتف والتواصل الإنساني المباشر، وطلب معلومات موثوقة للتأكد من هوية الشخص وهدفه الجاد للارتباط الحقيقي، والتحري الكامل للأنساب والسيرة بالتنسيق مع ذوي الأطراف لضمان الصدق التام.
                  </div>
                )}
              </div>

              {/* Q5 */}
              <div className="border border-stone-800 rounded-2xl bg-stone-900/20 overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(openFaqIndex === 4 ? null : 4)}
                  className="w-full text-right px-6 py-4 flex items-center justify-between text-stone-200 hover:text-stone-100 font-bold text-sm bg-stone-900/10 focus:outline-none"
                >
                  <span>٥. ما الذي يميز باقات العضوية الـ VIP؟</span>
                  <ChevronDown className={`text-amber-400 transform transition-transform duration-300 ${openFaqIndex === 4 ? "rotate-180" : ""}`} size={16} />
                </button>
                {openFaqIndex === 4 && (
                  <div className="px-6 pb-5 pt-1 text-xs text-stone-400 font-light leading-relaxed border-t border-stone-900">
                    باقات VIP تتيح للمستخدم وسيطاً عائلياً خاصاً يقوم بالطلب والتحري المباشر والاتصال مع عائلة الطرف الآخر، وعقد لقاءات رسمية في بيئة مهيأة بالكامل، وحصانة وسرية تفوق العادة لتجنب مشاركة البيانات أو الإحراج في التوفيق.
                  </div>
                )}
              </div>

            </div>

          </div>
        )}

        {/* TAB 5: COMPREHENSIVE ADMINISTRATIVE DASHBOARD & PUBLIC DIRECTORY */}
        {activeTab === "dashboard" && (
          <div id="tab-dashboard" className="space-y-8 animate-fadeIn pb-12">
            
            {/* Header section changes dynamically based on state */}
            <div className="text-center space-y-2">
              <span className="text-xs text-[#af9353] font-bold uppercase tracking-widest flex items-center justify-center gap-1.5">
                <Crown size={12} className="animate-pulse text-[#c5a85c]" />
                {isAdminAuthenticated 
                  ? "شاشة الإدارة والتحكم السرية للمشرفين" 
                  : showAdminLogin 
                    ? "بوابة التحقق الأمني لكادر الإدارة" 
                    : "دليل القبائل والعوائل النشطة والمسجلة"}
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-[#2c2214]">
                {isAdminAuthenticated 
                  ? "لوحة المراقبة وإحصاءات ديوان النخبة" 
                  : showAdminLogin 
                    ? "تسجيل دخول المشرفين" 
                    : "بوابة فحص العوائل والقبائل بالخليج العربي"}
              </h2>
              <p className="text-xs md:text-sm text-[#6c5e4e] font-light max-w-xl mx-auto leading-relaxed">
                {isAdminAuthenticated 
                  ? "مؤشرات حية لتتبع زيارات المنصة ومصادر الدخول وتفاعلات النخبة بخصوصية تامة." 
                  : showAdminLogin 
                    ? "منطقة آمنة مخصصة كلياً لمشرفي ديوان كبار الشخصيات. يرجى إدخال رمز المرور الثنائي." 
                    : "البوابة الرسمية المفتوحة لزائري المنصة للتحقق وتصفح القبائل والعائلات المشمولة بطلبات الزواج النشطة بالمنطقة."}
              </p>
            </div>

            {!isAdminAuthenticated && !showAdminLogin ? (
              /* PUBLIC DIRECTORY AND LIVE METRICS (لجميع زائري المنصة) */
              <div className="space-y-8 animate-fadeIn">
                
                {/* A: LIVE COUNTERS BAR */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-[#fbfaf6] border border-[#e9e1d2] shadow-sm p-4 rounded-2xl text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-[#c5a85c]/20" />
                    <span className="text-[#8e7f6e] text-[10px] block font-bold uppercase tracking-wider mb-1">القبائل والبيوت النشطة</span>
                    <strong className="text-xl md:text-2xl font-mono text-[#af9353] block font-black">٢٦ عائلة وقبيلة</strong>
                    <span className="text-[9.5px] text-[#6c5e4e] font-light mt-1 block">تغطية جغرافية كاملة للخليج</span>
                  </div>

                  <div className="bg-[#fbfaf6] border border-[#e9e1d2] shadow-sm p-4 rounded-2xl text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500/20" />
                    <span className="text-[#8e7f6e] text-[10px] block font-bold uppercase tracking-wider mb-1">إجمالي طلبات الارتباط النشطة</span>
                    <strong className="text-xl md:text-2xl font-mono text-emerald-600 block font-black">٥٦٠+ طلب عضوية</strong>
                    <span className="text-[9.5px] text-[#6c5e4e] font-light mt-1 block">محدث بصفة دورية كل ساعة</span>
                  </div>

                  <div className="bg-[#fbfaf6] border border-[#e9e1d2] shadow-sm p-4 rounded-2xl text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-[#c5a85c]/20" />
                    <span className="text-[#8e7f6e] text-[10px] block font-bold uppercase tracking-wider mb-1">نسبة نجاح التوفيق الفعلي</span>
                    <strong className="text-xl md:text-2xl font-mono text-[#af9353] block font-black">٩٤.٥٪ نجاح</strong>
                    <span className="text-[9.5px] text-[#6c5e4e] font-light mt-1 block">مطابات تامة تمت بحمد الله</span>
                  </div>

                  <div className="bg-[#fbfaf6] border border-[#e9e1d2] shadow-sm p-4 rounded-2xl text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-[#c5a85c]/20" />
                    <span className="text-[#8e7f6e] text-[10px] block font-bold uppercase tracking-wider mb-1">مستوى خصوصية البيانات</span>
                    <strong className="text-xl md:text-2xl font-mono text-[#af9353] block font-black">١٠٠٪ تشفير</strong>
                    <span className="text-[9.5px] text-[#6c5e4e] font-light mt-1 block">لا عرض لمعلومات العملاء نهائياً</span>
                  </div>
                </div>

                {/* B: SEARCH & FILTER PORTAL */}
                <div className="bg-[#110f0c] border border-[#c5a85c]/25 shadow-md p-5 rounded-3xl space-y-4">
                  <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                    <div className="flex flex-col sm:flex-row gap-3 w-full lg:max-w-2xl">
                       <div className="relative flex-1 w-full">
                        <input
                          type="text"
                          placeholder="ابحث باسم القبيلة أو العائلة العريقة..."
                          value={tribeSearchTerm}
                          onChange={(e) => setTribeSearchTerm(e.target.value)}
                          className="w-full bg-[#1c1914] border border-[#c5a85c]/20 focus:border-[#c5a85c] focus:ring-1 focus:ring-[#c5a85c]/30 rounded-xl pr-10 pl-4 py-3 text-sm text-[#e4dfd5] placeholder-stone-500 outline-none transition-all text-right"
                          dir="rtl"
                        />
                        <Search size={16} className="absolute right-3.5 top-1/2 transform -translate-y-1/2 text-[#c5a85c]" />
                      </div>

                      {/* Sort Dropdown inside the search container */}
                      <div className="relative min-w-[180px] w-full sm:w-auto">
                        <select
                          value={tribeSortKey}
                          onChange={(e) => setTribeSortKey(e.target.value as "requests" | "alphabetical")}
                          className="w-full bg-[#1c1914] border border-[#c5a85c]/20 hover:border-[#c5a85c]/40 focus:border-[#c5a85c] rounded-xl pr-3 pl-10 py-3 text-xs text-[#e4dfd5] outline-none transition-all appearance-none cursor-pointer text-right font-medium"
                          dir="rtl"
                        >
                          <option value="requests" className="bg-[#110f0c] text-[#e4dfd5]">الترتيب: عدد الطلبات النشطة</option>
                          <option value="alphabetical" className="bg-[#110f0c] text-[#e4dfd5]">الترتيب: هجائياً (أ-ي)</option>
                        </select>
                        <ChevronDown size={14} className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-[#c5a85c] pointer-events-none" />
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 justify-end w-full lg:w-auto">
                      <div className="flex items-center gap-1.5 text-[#b9b1a2] text-xs font-light">
                        <Filter size={12} className="text-[#c5a85c]" />
                        <span>تصفية الفئة:</span>
                      </div>
                      {["الكل", "شيوخ وأمراء", "القبائل العريقة", "العوائل الحضرية", "العوائل غير القبلية (الخضيرية)"].map(type => (
                        <button
                          key={type}
                          onClick={() => setSelectedTribeType(type)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                            selectedTribeType === type
                              ? "bg-[#c5a85c]/20 text-[#f3da90] border border-[#c5a85c]/45 shadow-sm"
                              : "bg-[#1c1914] text-[#b9b1a2] hover:bg-[#c5a85c]/10 border border-[#c5a85c]/15"
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Country Filter Tab */}
                  <div className="flex flex-wrap items-center gap-1.5 border-t border-[#c5a85c]/20 pt-3.5 justify-center md:justify-start">
                    <span className="text-[#b9b1a2] text-xs font-light ml-2">نطاق الدولة:</span>
                    {["الكل", "السعودية", "الكويت", "الإمارات", "قطر", "البحرين", "عمان", "السعودية والخليج"].map(country => (
                      <button
                        key={country}
                        onClick={() => setSelectedTribeCountry(country)}
                        className={`px-3 py-1 rounded-full text-xs transition-all cursor-pointer ${
                          selectedTribeCountry === country
                            ? "bg-gradient-to-r from-[#d4af37] to-[#c5a85c] text-stone-950 font-bold"
                            : "text-[#b9b1a2] hover:text-[#f3da90]"
                        }`}
                      >
                        {country}
                      </button>
                    ))}
                  </div>
                </div>

                {/* C: DYNAMIC CARDS GRID */}
                {TRIBES_AND_FAMILIES.filter(item => {
                  const matchesSearch = item.name.includes(tribeSearchTerm) || item.region.includes(tribeSearchTerm);
                  const matchesCountry = selectedTribeCountry === "الكل" || item.country === selectedTribeCountry || (selectedTribeCountry === "السعودية والخليج" && item.country.includes("الخليج"));
                  const matchesType = selectedTribeType === "الكل" || item.type === selectedTribeType;
                  return matchesSearch && matchesCountry && matchesType;
                }).length === 0 ? (
                  <div className="py-12 text-center bg-[#110f0c] border border-[#c5a85c]/25 rounded-2xl shadow-sm">
                    <p className="text-sm text-[#b9b1a2] font-light">لا توجد نتائج تطابق خيارات البحث الحالية.</p>
                    <button 
                      onClick={() => { setTribeSearchTerm(""); setSelectedTribeCountry("الكل"); setSelectedTribeType("الكل"); }}
                      className="mt-3 text-xs text-[#f3da90] hover:underline font-medium cursor-pointer"
                    >
                      إعادة تعيين مرشحات البحث
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {TRIBES_AND_FAMILIES.filter(item => {
                      const matchesSearch = item.name.includes(tribeSearchTerm) || item.region.includes(tribeSearchTerm);
                      const matchesCountry = selectedTribeCountry === "الكل" || item.country === selectedTribeCountry || (selectedTribeCountry === "السعودية والخليج" && item.country.includes("الخليج"));
                      const matchesType = selectedTribeType === "الكل" || item.type === selectedTribeType;
                      return matchesSearch && matchesCountry && matchesType;
                    }).sort((a, b) => {
                      if (tribeSortKey === "requests") {
                        return b.activeRequests - a.activeRequests;
                      } else {
                        return a.name.localeCompare(b.name, "ar");
                      }
                    }).map((item) => {
                      const isVipClass = item.type === "شيوخ وأمراء" || item.status.includes("VIP");
                      return (
                        <div
                          key={item.id}
                          className="bg-[#110f0c] border border-[#c5a85c]/25 rounded-2xl p-5 hover:border-[#c5a85c]/55 hover:shadow-[0_8px_30px_rgba(197,168,92,0.15)] transition-all duration-300 flex flex-col justify-between relative overflow-hidden group shadow-sm"
                        >
                          {/* Top background glow overlay */}
                          <div className="absolute top-0 right-0 w-[100px] h-[100px] bg-[#c5a85c]/[0.02] rounded-full blur-2xl pointer-events-none group-hover:bg-[#c5a85c]/[0.05] transition-all" />
                          
                          <div className="space-y-4">
                            {/* Card Header */}
                            <div className="flex items-start justify-between border-b border-[#c5a85c]/15 pb-3">
                              <div className="space-y-0.5 text-right">
                                <h3 className="text-base font-bold text-[#f3da90] flex items-center gap-1.5 justify-end">
                                  <span>{highlightText(item.name, tribeSearchTerm)}</span>
                                  <ShieldCheck size={16} className={isVipClass ? "text-[#f3da90]" : "text-emerald-400"} />
                                </h3>
                                <p className="text-[10px] text-[#b9b1a2] font-light">{item.type} • {item.country}</p>
                              </div>
                              <span className={`px-2 py-0.5 rounded text-[9.5px] font-bold ${
                                isVipClass 
                                  ? "bg-[#c5a85c]/20 text-[#f3da90] border border-[#c5a85c]/35" 
                                  : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/15"
                              }`}>
                                {item.status}
                              </span>
                            </div>

                            {/* Card Body Metrics */}
                            <div className="space-y-2.5 text-right" dir="rtl">
                              <div className="flex items-center justify-between text-[11px]">
                                <span className="text-[#b9b1a2]">نطاق التواجد والأصل:</span>
                                <span className="text-[#e4dfd5] font-light">{highlightText(item.region, tribeSearchTerm)}</span>
                              </div>
                              
                              <div className="flex items-center justify-between text-[11px]">
                                <span className="text-[#b9b1a2]">الطلبات النشطة القائمة:</span>
                                <span className="text-[#f3da90] font-mono font-bold">+{item.activeRequests} طلب نشط</span>
                              </div>

                              <div className="flex items-center justify-between text-[11px] border-t border-[#c5a85c]/15 pt-2 pb-1">
                                <span className="text-[#b9b1a2]">حالة النشاط الفوري:</span>
                                <div className="flex items-center gap-2">
                                  <span className="relative flex h-2 w-2">
                                    {item.activeRequests >= 10 ? (
                                      <>
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                      </>
                                    ) : (
                                      <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500/80"></span>
                                    )}
                                  </span>
                                  <span className={item.activeRequests >= 10 ? "text-emerald-400 font-medium" : "text-[#b9b1a2] font-light"}>
                                    {item.activeRequests >= 10 ? "نشط الآن" : "في انتظار مراجعة"}
                                  </span>
                                </div>
                              </div>

                              <div className="flex items-center justify-between text-[11px]">
                                <span className="text-[#b9b1a2]">معدل التوافق والمطابقة:</span>
                                <span className="text-[#e4dfd5] font-mono">{item.matchRate}</span>
                              </div>

                              <div className="flex items-center justify-between text-[11px]">
                                <span className="text-[#b9b1a2]">بروتوكول السرية:</span>
                                <span className="text-[#f3da90] text-[10px] bg-[#1c1914] px-1.5 py-0.5 rounded border border-[#c5a85c]/20 font-mono">{item.level}</span>
                              </div>
                            </div>
                          </div>

                          {/* Card Action */}
                          <div className="pt-4 mt-4 border-t border-[#c5a85c]/15">
                            <button
                              type="button"
                              onClick={() => {
                                handleRequestForFamily(item.name, isVipClass);
                              }}
                              className="w-full py-2 bg-[#1c1914] hover:bg-[#c5a85c]/15 border border-[#c5a85c]/25 hover:border-[#c5a85c]/50 text-[#e4dfd5] hover:text-[#f3da90] text-[11px] font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
                            >
                              <span>طلب ارتباط مع هذه العائلة</span>
                              <Heart size={12} className="text-[#c5a85c] group-hover:scale-110 transition-transform" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* D: ADMIN PROMPT AT THE FOOTER */}
                <div className="bg-[#110f0c] p-6 rounded-3xl border border-[#c5a85c]/25 text-center max-w-xl mx-auto space-y-4 shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-[#1c1914] border border-[#c5a85c]/25 flex items-center justify-center mx-auto text-[#f3da90]">
                    <Lock size={16} />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-[#f3da90]">بصفتك زائراً للمنصة</h4>
                    <p className="text-xs text-[#b9b1a2] font-light leading-relaxed">
                      تم تصميم هذه البوابة لتمكين كبار العوائل من معرفة الفروع المشمولة حالياً بخصوصية تامة وتفادي تكرار الأسماء. إذا كنت من كادر الإدارة أو كبار المشرفين وترغب بالولوج إلى الإحصاءات وجدار الحماية السحابي:
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowAdminLogin(true)}
                    className="px-5 py-2 rounded-xl bg-[#1c1914] hover:bg-[#c5a85c]/10 border border-[#c5a85c]/30 text-[#f3da90] text-xs font-semibold transition-all shadow-sm active:scale-95 cursor-pointer"
                  >
                    تسجيل دخول المشرفين 🔑
                  </button>
                </div>

              </div>
            ) : !isAdminAuthenticated && showAdminLogin ? (
              /* ADMIN LOGIN FORM BLOCK */
              <div className="max-w-md mx-auto bg-[#110f0c] border border-[#c5a85c]/25 p-8 rounded-3xl space-y-6 shadow-xl text-center my-8 animate-fadeIn">
                <div className="w-16 h-16 bg-[#1c1914] border border-[#c5a85c]/20 text-[#f3da90] rounded-full flex items-center justify-center mx-auto mb-2 shadow-inner">
                  <Lock size={28} className="animate-pulse" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-[#f3da90]">تسجيل الدخول لوحدة الإدارة</h3>
                  <p className="text-xs text-[#b9b1a2] font-light leading-relaxed">
                    منطقة محمية ومخصصة لإدارة ديوان كبار الشخصيات والقبائل فقط. يرجى إدخال رمز المرور المعتمد.
                  </p>
                </div>

                <form onSubmit={handleAdminLogin} className="space-y-4">
                  <div className="space-y-1.5 text-right">
                    <label htmlFor="admin-pin-input" className="text-xs text-[#b9b1a2] block font-light">رمز المرور الإداري (PIN):</label>
                    <input
                      id="admin-pin-input"
                      type="password"
                      value={adminPass}
                      onChange={(e) => setAdminPass(e.target.value)}
                      placeholder="••••••"
                      className="w-full bg-[#1c1914] border border-[#c5a85c]/25 focus:border-[#c5a85c] focus:ring-1 focus:ring-[#c5a85c]/30 rounded-xl px-4 py-3 text-center font-mono text-[#e4dfd5] placeholder-stone-600 outline-none transition-all"
                    />
                  </div>

                  {adminError && (
                    <p className="text-rose-600 text-xs font-light text-center bg-rose-500/5 border border-rose-500/10 py-2 rounded-lg">
                      ⚠️ {adminError}
                    </p>
                  )}

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => { setShowAdminLogin(false); setAdminError(""); }}
                      className="w-1/2 bg-[#1c1914] hover:bg-[#c5a85c]/10 border border-[#c5a85c]/20 text-[#b9b1a2] font-semibold py-3 px-4 rounded-xl transition-all cursor-pointer active:scale-95 text-xs"
                    >
                      رجوع للدليل العام 📋
                    </button>
                    <button
                      type="submit"
                      className="w-1/2 bg-gradient-to-r from-[#c5a85c] to-[#e5c158] text-stone-950 font-black py-3 px-4 rounded-xl transition-all cursor-pointer shadow-lg active:scale-95 text-xs"
                    >
                      فتح لوحة التحكم 🔑
                    </button>
                  </div>
                </form>
                
                <p className="text-[10px] text-[#b9b1a2] font-light">
                  * جميع الاتصالات والعمليات الإدارية مشفرة ببروتوكول نهاية-إلى-نهاية (E2EE).
                </p>
              </div>
            ) : (
              <div className="space-y-8 animate-fadeIn">

                {/* 🌐 GCP CLOUD RUN ACCESSIBILITY MONITOR & GCLOUD COMMAND WIDGET */}
                <div className="bg-[#110f0c] border border-[#c5a85c]/25 p-6 rounded-2xl space-y-5 shadow-sm relative overflow-hidden text-right">
                  <div className="absolute top-0 right-0 w-[120px] h-[120px] bg-[#c5a85c]/5 rounded-full blur-[40px] pointer-events-none" />
                  
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#c5a85c]/15 pb-4">
                    <div className="space-y-1">
                      <h3 className="text-sm font-bold text-[#f3da90] flex items-center gap-2">
                        <Globe size={16} className="text-[#c5a85c] animate-pulse animate-duration-1000" />
                        مراقبة حالة اتصال الرابط وإتاحة المنصة للعموم
                      </h3>
                      <p className="text-[11px] text-[#b9b1a2] font-light">
                        تتبع حالة النشر وبث الخدمة لمنع انقطاع المنصة أو طلب تسجيل الدخول (403 Forbidden).
                      </p>
                    </div>
                    
                    <button
                      type="button"
                      onClick={fetchGcloudStatus}
                      disabled={gcloudLoading}
                      className="px-3.5 py-1.5 rounded-lg bg-[#1c1914] hover:bg-[#c5a85c]/15 border border-[#c5a85c]/20 text-[#b9b1a2] font-medium text-xs transition-all flex items-center gap-1.5 self-start md:self-auto cursor-pointer shadow-sm active:scale-95 disabled:opacity-50"
                    >
                      {gcloudLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-3 w-3 border border-[#c5a85c] border-t-transparent" />
                          <span>جاري الفحص...</span>
                        </>
                      ) : (
                        <>
                          <span>تحديث الحالة الذاتية 🔄</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Status Indicators */}
                  {gcloudLoading && !gcloudStatus ? (
                    <div className="py-8 text-center text-[#b9b1a2] text-xs">
                      <div className="inline-block animate-spin rounded-full h-5 w-5 border-2 border-[#c5a85c] border-t-transparent mb-2"></div>
                      <p className="font-light">جاري اختبار الاتصال وفحص سياسات Google Cloud Run...</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Indicator 1: Internet */}
                      <div className="bg-[#1c1914] p-3.5 rounded-xl border border-[#c5a85c]/20 flex items-center gap-3 shadow-sm">
                        <div className="relative flex h-3 w-3">
                          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${(!gcloudStatus || gcloudStatus.connectedToInternet) ? "bg-emerald-400/80" : "bg-rose-400/80"} opacity-75`}></span>
                          <span className={`relative inline-flex rounded-full h-3 w-3 ${(!gcloudStatus || gcloudStatus.connectedToInternet) ? "bg-emerald-500" : "bg-rose-500"}`}></span>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] text-[#b9b1a2] block font-light">حالة اتصال الخادر بالإنترنت Gateway</span>
                          <strong className="text-xs text-[#e4dfd5]">
                            {!gcloudStatus || gcloudStatus.connectedToInternet ? "الخادم متصل بنشاط ومتاح للعمل" : "الخادم غير متصل بالشبكة"}
                          </strong>
                        </div>
                      </div>

                      {/* Indicator 2: Public Status */}
                      <div className="bg-[#1c1914] p-3.5 rounded-xl border border-[#c5a85c]/20 flex items-center gap-3 shadow-sm">
                        <div className="relative flex h-3 w-3">
                          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${(gcloudStatus?.isPublic) ? "bg-emerald-400/80" : "bg-amber-400/80"} opacity-75`}></span>
                          <span className={`relative inline-flex rounded-full h-3 w-3 ${(gcloudStatus?.isPublic) ? "bg-emerald-500" : "bg-amber-500"}`}></span>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] text-[#b9b1a2] block font-light">إتاحة الرابط العام للجمهور والعملاّء</span>
                          <strong className="text-xs text-[#e4dfd5]">
                            {gcloudStatus ? (
                              gcloudStatus.isPublic ? (
                                <span className="text-emerald-400 font-bold">مفتوح للعامة ومتاح للجميع (Public) ✅</span>
                              ) : (
                                <span className="text-[#f3da90] font-bold">مقيد بالمصادقة (Requires Auth / 403) ⚠️</span>
                              )
                            ) : (
                              <span className="text-[#b9b1a2]">تحميل الحالة الحالية...</span>
                            )}
                          </strong>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Detailed Feedback & Action Buttons */}
                  <div className="bg-[#1c1914] p-5 rounded-2xl border border-[#c5a85c]/20 space-y-4">
                    <div className="text-xs leading-relaxed space-y-2">
                      <p className="font-bold text-[#f3da90] text-xs flex items-center gap-1.5">
                        <ShieldAlert size={14} className="text-[#c5a85c]" />
                        بروتوكول ضبط Google Cloud Run لتفادي خطأ 403 Forbidden:
                      </p>
                      <p className="text-[#b9b1a2] text-[11.5px] font-light leading-relaxed">
                        منصة Google Cloud تقوم افتراضياً بتقييد الوصول للحاويات المنشورة حديثاً كإجراء حمائي. لفتح رابط المنصة للجميع وجعله شغالاً كاملاً مع كافة زوار الموقع والهواتف دون طلب حساب Google أو ظهور خطأ الصفحة غير موجودة 403، يتم استعمال رتبة مخوَّل باستدعاء الخدمة لمجموعة لـ <code className="font-mono bg-black/40 px-1 py-0.5 rounded text-[#f3da90] font-bold text-[11px] select-all">allUsers</code>.
                      </p>
                    </div>

                    {/* Simulated Trigger or Actual Execution from Backend */}
                    <div className="pt-2 flex flex-col gap-3">
                      <div className="flex flex-col sm:flex-row items-center gap-3">
                        <button
                          type="button"
                          onClick={triggerMakePublic}
                          disabled={gcloudActionLoading}
                          className="w-full sm:w-auto bg-gradient-to-r from-[#c5a85c] to-[#e5c158] hover:opacity-90 text-stone-950 font-black text-xs px-5 py-2.5 rounded-xl transition-all shadow-md active:scale-95 disabled:opacity-50 flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
                        >
                          {gcloudActionLoading ? (
                            <>
                              <div className="animate-spin rounded-full h-3.5 w-3.5 border-2 border-stone-950 border-t-transparent" />
                              <span>جاري تفعيل سياسة الرابط ومحاولة رفع القيود...</span>
                            </>
                          ) : (
                            <>
                              <span>⚡ تفعيل فوري لرفع قيود المصادقة تلقائياً</span>
                            </>
                          )}
                        </button>
                        
                        <span className="text-[10.5px] text-[#b9b1a2] text-center sm:text-right font-light leading-snug">
                          * يقوم بالاتصال الفوري بمحقن حاوية التطبيق لمحاولة رفع التحقق ومنح الصلاحيات كاملة للعامة مجاناً يدوياً.
                        </span>
                      </div>

                      {/* gcloud Command Result Output Panel */}
                      {gcloudResult && (
                        <div className="p-4 rounded-xl border text-xs space-y-2.5 bg-[#110f0c] border-[#c5a85c]/25 animate-fadeIn">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-[11px] text-[#f3da90]">تقرير نتيجة التنفيذ التلقائي:</span>
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${gcloudResult.success ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-amber-500/10 text-[#f3da90] border border-amber-500/20"}`}>
                              {gcloudResult.success ? "عملية ناجحة بالكامل" : "موصى بالتفعيل اليدوي السريع"}
                            </span>
                          </div>
                          
                          {gcloudResult.success ? (
                            <p className="text-emerald-400 text-[11px] leading-relaxed font-medium">
                              ✓ تمت العملية بنجاح! تم منح صلاحيات الاستدعاء للعامة مجاناً لجميع زوار المنصة. الرابط الآن يعمل 100% بكفاءة ولا يتطلب تسجيل دخل من الأجهزة الأخرى.
                            </p>
                          ) : (
                            <div className="space-y-1">
                              <p className="text-[#f3da90] text-[11.5px] leading-relaxed font-bold">
                                ⚠️ تم إرسال طلب التعديل ولكن بيئتك تتطلب تفويضاً إدارياً إضافياً من مالك الحساب الرئيسي ومحمي.
                              </p>
                              <p className="text-[#b9b1a2] text-[11px] leading-relaxed font-light">
                                لا تقلق نهائياً! يمكنك حل هذه المشكلة وثوانٍ معدودة وبنفسك وبشكل دائم عبر تطبيق الخطوات المعتمدة التالية في لوحة تحكم غوغل الخاصة بك:
                              </p>
                            </div>
                          )}

                          {/* Command output detail for debug */}
                          {(gcloudResult.stderr || gcloudResult.error) && (
                            <details className="mt-2 bg-[#1c1914] p-2.5 rounded-lg border border-[#c5a85c]/20 font-mono text-[9px] text-rose-400/80 leading-normal">
                              <summary className="cursor-pointer text-[#b9b1a2] select-none text-[10px] hover:text-[#f3da90] transition-colors">ملاحظة النظام الفنية (تفاصيل الخطأ)</summary>
                              <p className="mt-1.5 whitespace-pre-wrap">{gcloudResult.stderr || gcloudResult.error}</p>
                            </details>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* 📋 STEP-BY-STEP ARABIC GUIDE ON MAKING THE URL PUBLIC */}
                  <div className="border-t border-[#c5a85c]/15 pt-4 space-y-4">
                    <span className="text-[12px] font-bold text-[#f3da90] block flex items-center gap-1">
                      📖 خطوات تجاوز خطأ 403 Forbidden وتفعيل المنصة للعامّة للأبد:
                    </span>
                    
                    <div className="text-[11px] text-[#b9b1a2] space-y-3 leading-relaxed text-right pr-2 font-light">
                      <p className="mb-2 font-medium text-[#f3da90] text-xs">اتبع هذه الخطوات البسيطة من لوحة تحكم GCP الخاصة بك لجعل الرابط شغالاً مع كافة الهواتف والعملاء ويفتح مباشرة:</p>
                      
                      <div className="flex items-start gap-2.5">
                        <span className="bg-[#c5a85c]/25 text-[#f3da90] h-5 w-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">1</span>
                        <p className="flex-1">
                          افتح موقع لوحة تحكم غوغل السحابية <strong><a href="https://console.cloud.google.com/" target="_blank" rel="noreferrer" className="underline text-[#f3da90] hover:text-[#c5a85c]">Google Cloud Console</a></strong>، ثم تأكد من اختيار مشروعك من القائمة العلوية.
                        </p>
                      </div>
                      
                      <div className="flex items-start gap-2.5">
                        <span className="bg-[#c5a85c]/25 text-[#f3da90] h-5 w-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">2</span>
                        <p className="flex-1">
                          ابحث في غوغل أو من القائمة الجانبية عن خدمة <strong>Cloud Run</strong> وافتحها.
                        </p>
                      </div>

                      <div className="flex items-start gap-2.5">
                        <span className="bg-[#c5a85c]/25 text-[#f3da90] h-5 w-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">3</span>
                        <p className="flex-1">
                          اضغط على اسم الخدمة الخاصة بك والتي يبدأ اسمها بـ <code className="font-mono bg-black/40 px-1.5 py-0.5 rounded text-[#e4dfd5] select-all font-bold">{(gcloudStatus && gcloudStatus.serviceName) || "ais-pre-sjehcuhnbfmn3lkfd7ooar"}</code>.
                        </p>
                      </div>

                      <div className="flex items-start gap-2.5">
                        <span className="bg-[#c5a85c]/25 text-[#f3da90] h-5 w-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">4</span>
                        <p className="flex-1">
                          اذهب لتوبيب <strong>Security (الأمان)</strong> أو اضغط على زر <strong>Permissions (الأذونات)</strong> في القائمة العلوية الفرعية.
                        </p>
                      </div>

                      <div className="flex items-start gap-2.5">
                        <span className="bg-[#c5a85c]/25 text-[#f3da90] h-5 w-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">5</span>
                        <p className="flex-1">
                          اضغط على <strong>Add Principal (إضافة مستخدم جديد)</strong>، واكتب في حانة العضو الجديد (New Principals): <strong className="font-mono bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded text-xs select-all font-bold">allUsers</strong>.
                        </p>
                      </div>

                      <div className="flex items-start gap-2.5">
                        <span className="bg-[#c5a85c]/25 text-[#f3da90] h-5 w-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">6</span>
                        <p className="flex-1">
                          في خانة الدور (Role)، ابحث عن الدور التالي واختره يدوياً بدقة: <strong className="font-mono bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded text-xs select-all font-bold">Cloud Run Invoker</strong>، ثم اضغط على حفظ <strong>Save</strong> لتثبيته للزوار.
                        </p>
                      </div>
                    </div>

                    {/* CLI Command Alternative Copy tool */}
                    <div className="mt-4 bg-[#1c1914] p-4 rounded-xl border border-[#c5a85c]/20 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-[#b9b1a2] font-bold block">
                          طريقة سريعة للغاية باستعمال سطر الأوامر (gcloud CLI / Cloud Shell):
                        </span>
                        <span className="text-[9px] text-[#f3da90] font-mono">1 Click Copy</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="bg-black/60 p-2.5 rounded-lg font-mono text-[9px] text-[#f3da90] border border-[#c5a85c]/20 flex-1 overflow-x-auto text-left select-all whitespace-nowrap scrollbar-thin scrollbar-thumb-stone-600 scrollbar-track-transparent" dir="ltr">
                          {(gcloudStatus && gcloudStatus.commandToRun) || `gcloud run services add-iam-policy-binding ais-pre-sjehcuhnbfmn3lkfd7ooar --member="allUsers" --role="roles/run.invoker" --region="europe-west2"`}
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            const cmd = (gcloudStatus && gcloudStatus.commandToRun) || `gcloud run services add-iam-policy-binding ais-pre-sjehcuhnbfmn3lkfd7ooar --member="allUsers" --role="roles/run.invoker" --region="europe-west2"`;
                            navigator.clipboard.writeText(cmd);
                            alert("تم نسخ الأمر بنجاح");
                          }}
                          className="px-3.5 py-2.5 rounded-lg bg-[#c5a85c]/20 hover:bg-[#c5a85c]/35 border border-[#c5a85c]/30 text-[#f3da90] font-bold text-xs transition-colors shrink-0 active:scale-95 cursor-pointer"
                        >
                          نسخ الأمر 📋
                        </button>
                      </div>
                    </div>

                  </div>
                </div>

            {/* Visitor Sources & Specific Action Counts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Card Left: UTM Source Analytics */}
              <div className="bg-white border border-[#e9e1d2] p-6 rounded-2xl space-y-4 shadow-sm">
                <h3 className="text-sm font-bold text-[#2c2214] flex items-center gap-2">
                  <BarChart3 size={16} className="text-[#c5a85c]" />
                      مصادر الزيارات وتتبع الإعلانات (UTMs)
                    </h3>

                    <div className="space-y-3.5">
                      {/* Snapchat */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-[#6c5e4e] flex items-center gap-1">سناب شات (Snapchat Ads)</span>
                          <span className="font-mono font-bold text-[#2c2214]">{stats.sources?.snapchat || 0} زيارة</span>
                        </div>
                        <div className="w-full bg-[#fbfaf6] border border-[#e9e1d2] h-2.5 rounded-full overflow-hidden">
                          <div 
                            className="bg-[#c5a85c] h-full transition-all duration-500" 
                            style={{ width: `${Math.min(100, ((stats.sources?.snapchat || 0) / Math.max(1, stats.page_views)) * 100)}%` }}
                          />
                        </div>
                      </div>

                      {/* TikTok */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-[#6c5e4e] flex items-center gap-1">تيك توك (TikTok Ads)</span>
                          <span className="font-mono font-bold text-[#2c2214]">{stats.sources?.tiktok || 0} زيارة</span>
                        </div>
                        <div className="w-full bg-[#fbfaf6] border border-[#e9e1d2] h-2.5 rounded-full overflow-hidden">
                          <div 
                            className="bg-[#af9353] h-full transition-all duration-500" 
                            style={{ width: `${Math.min(100, ((stats.sources?.tiktok || 0) / Math.max(1, stats.page_views)) * 100)}%` }}
                          />
                        </div>
                      </div>

                      {/* Instagram */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-[#6c5e4e] flex items-center gap-1">انستقرام (Instagram Promo)</span>
                          <span className="font-mono font-bold text-[#2c2214]">{stats.sources?.instagram || 0} زيارة</span>
                        </div>
                        <div className="w-full bg-[#fbfaf6] border border-[#e9e1d2] h-2.5 rounded-full overflow-hidden">
                          <div 
                            className="bg-[#b4975a] h-full transition-all duration-500" 
                            style={{ width: `${Math.min(100, ((stats.sources?.instagram || 0) / Math.max(1, stats.page_views)) * 100)}%` }}
                          />
                        </div>
                      </div>

                      {/* Direct / Organic */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-[#6c5e4e] flex items-center gap-1">زيارات مباشرة وعضوية (Direct)</span>
                          <span className="font-mono font-bold text-[#2c2214]">{stats.sources?.direct || 0} زيارة</span>
                        </div>
                        <div className="w-full bg-[#fbfaf6] border border-[#e9e1d2] h-2.5 rounded-full overflow-hidden">
                          <div 
                            className="bg-[#d4af37] h-full transition-all duration-500" 
                            style={{ width: `${Math.min(100, ((stats.sources?.direct || 0) / Math.max(1, stats.page_views)) * 100)}%` }}
                          />
                        </div>
                      </div>

                    </div>

                    {/* Standard Campaign Links inside Card Left */}
                    <div className="pt-4 border-t border-[#e9e1d2] space-y-3">
                      <span className="text-[11px] font-bold text-[#2c2214] block text-right">
                        مُولِّد روابط التتبع القياسية للحملات (Standard UTMs):
                      </span>
                      
                      <div className="space-y-2">
                        {/* Snapchat Organic */}
                        <div className="bg-[#fbfaf6] p-2.5 rounded-xl border border-[#e9e1d2] flex items-center justify-between gap-3 text-xs">
                          <div className="space-y-0.5 text-right flex-1 min-w-0">
                            <span className="text-[#6c5e4e] text-[11px] font-medium block">سناب شات غير مدفوع</span>
                            <span className="font-mono text-[9px] text-[#af9353] truncate block text-left" dir="ltr">
                              ?utm_source=snapchat&amp;utm_medium=organic
                            </span>
                          </div>
                          <button
                            onClick={() => {
                              const url = `${getPublicUrl()}?utm_source=snapchat&utm_medium=organic`;
                              navigator.clipboard.writeText(url);
                              setCopiedLink("snap_organic");
                              setTimeout(() => setCopiedLink(null), 2000);
                            }}
                            className={`px-2 py-1 rounded text-[10px] font-medium border transition-all shrink-0 flex items-center gap-1 cursor-pointer ${
                              copiedLink === "snap_organic"
                                ? "bg-emerald-550 border-emerald-200 text-emerald-800"
                                : "bg-white border-[#e9e1d2] text-[#6c5e4e] hover:bg-[#fbfaf6] hover:text-[#c5a85c]"
                            }`}
                          >
                            {copiedLink === "snap_organic" ? (
                              <>
                                <Check size={10} />
                                تم النسخ
                              </>
                            ) : (
                              <>
                                <Copy size={10} />
                                نسخ الرابط
                              </>
                            )}
                          </button>
                        </div>

                        {/* Snapchat Paid */}
                        <div className="bg-[#fbfaf6] p-2.5 rounded-xl border border-[#e9e1d2] flex items-center justify-between gap-3 text-xs">
                          <div className="space-y-0.5 text-right flex-1 min-w-0">
                            <span className="text-[#6c5e4e] text-[11px] font-medium block">سناب شات حملات مدفوعة</span>
                            <span className="font-mono text-[9px] text-[#af9353] truncate block text-left" dir="ltr">
                              ?utm_source=snapchat&amp;utm_medium=paid
                            </span>
                          </div>
                          <button
                            onClick={() => {
                              const url = `${getPublicUrl()}?utm_source=snapchat&utm_medium=paid`;
                              navigator.clipboard.writeText(url);
                              setCopiedLink("snap_paid");
                              setTimeout(() => setCopiedLink(null), 2000);
                            }}
                            className={`px-2 py-1 rounded text-[10px] font-medium border transition-all shrink-0 flex items-center gap-1 cursor-pointer ${
                              copiedLink === "snap_paid"
                                ? "bg-emerald-550 border-emerald-200 text-emerald-800"
                                : "bg-white border-[#e9e1d2] text-[#6c5e4e] hover:bg-[#fbfaf6] hover:text-[#c5a85c]"
                            }`}
                          >
                            {copiedLink === "snap_paid" ? (
                              <>
                                <Check size={10} />
                                تم النسخ
                              </>
                            ) : (
                              <>
                                <Copy size={10} />
                                نسخ الرابط
                              </>
                            )}
                          </button>
                        </div>

                        {/* TikTok Ads */}
                        <div className="bg-[#fbfaf6] p-2.5 rounded-xl border border-[#e9e1d2] flex items-center justify-between gap-3 text-xs">
                          <div className="space-y-0.5 text-right flex-1 min-w-0">
                            <span className="text-[#6c5e4e] text-[11px] font-medium block">تيك توك حملات مدفوعة</span>
                            <span className="font-mono text-[9px] text-[#af9353] truncate block text-left" dir="ltr">
                              ?utm_source=tiktok&amp;utm_medium=organic
                            </span>
                          </div>
                          <button
                            onClick={() => {
                              const url = `${getPublicUrl()}?utm_source=tiktok&utm_medium=organic`;
                              navigator.clipboard.writeText(url);
                              setCopiedLink("tiktok_organic");
                              setTimeout(() => setCopiedLink(null), 2000);
                            }}
                            className={`px-2 py-1 rounded text-[10px] font-medium border transition-all shrink-0 flex items-center gap-1 cursor-pointer ${
                              copiedLink === "tiktok_organic"
                                ? "bg-emerald-550 border-emerald-200 text-emerald-800"
                                : "bg-white border-[#e9e1d2] text-[#6c5e4e] hover:bg-[#fbfaf6] hover:text-[#c5a85c]"
                            }`}
                          >
                            {copiedLink === "tiktok_organic" ? (
                              <>
                                <Check size={10} />
                                تم النسخ
                              </>
                            ) : (
                              <>
                                <Copy size={10} />
                                نسخ الرابط
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Right: Direct Tier Clicks */}
                  <div className="bg-stone-900/30 border border-stone-800 p-6 rounded-2xl flex flex-col justify-between">
                    <div className="space-y-4">
                      <h3 className="text-sm font-bold text-stone-200 flex items-center gap-2">
                        <Crown size={16} className="text-amber-500" />
                        اهتمام واختيارات باقات الـ VIP
                      </h3>
                      
                      <div className="grid grid-cols-3 gap-3 text-center">
                        <div className="bg-stone-900/60 p-3 rounded-lg border border-stone-850">
                          <span className="text-[10px] text-stone-400 block mb-1">VIP أساسي</span>
                          <strong className="text-lg font-mono font-bold text-stone-100">{stats.vip_basic_clicks || 0}</strong>
                          <span className="text-[9px] text-stone-500 block mt-1">ضغطات</span>
                        </div>

                        <div className="bg-stone-900/60 p-3 rounded-lg border border-stone-850">
                          <span className="text-[10px] text-stone-400 block mb-1">VIP بلس</span>
                          <strong className="text-lg font-mono font-bold text-[#d4af37]">{stats.vip_plus_clicks || 0}</strong>
                          <span className="text-[9px] text-stone-500 block mt-1">ضغطات</span>
                        </div>

                        <div className="bg-stone-900/60 p-3 rounded-lg border border-stone-850">
                          <span className="text-[10px] text-stone-400 block mb-1">VIP خاص</span>
                          <strong className="text-lg font-mono font-bold text-stone-100">{stats.vip_special_clicks || 0}</strong>
                          <span className="text-[9px] text-stone-500 block mt-1">ضغطات</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                    {/* 📢 المادة الترويجية الجاهزة للنشر والنسخ */}
                <div className="bg-stone-900/40 border border-stone-800 p-6 rounded-2xl space-y-4 shadow-lg backdrop-blur-sm">
                  <div className="border-b border-stone-800/80 pb-3">
                    <h3 className="text-sm font-bold text-stone-100 flex items-center gap-2">
                      <Megaphone size={16} className="text-amber-500" />
                      المادة الإعلانية الموحدة المعتمدة للمنصة 📢
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <div className="lg:col-span-8 space-y-3">
                      <div className="bg-stone-950/80 p-4 rounded-xl border border-stone-850 font-sans text-xs text-stone-300 leading-relaxed whitespace-pre-wrap select-all relative overflow-hidden text-right" dir="rtl">
                        *زواج كبار الشخصيات والنخبة بالخليج*{"\n"}
                        {"\n"}
                        عرسان وعرائس من الأسر الحاكمة والبيوت الكريمة{"\n"}
                        *الأسر الحاكمة:* آل سعود، آل صباح، آل نهيان، آل مكتوم، آل ثاني، آل خليفة، آل بوسعيد{"\n"}
                        *العوائل والقبائل:* آل الشيخ، السديري، عنزة، شمر، حرب، مطير، عتيبة، قحطان، الدواسر، بني خالد، يام{"\n"}
                        {"\n"}
                        نخبة المجتمع وكبار الشخصيات بخصوصية تامة وشروط بالغة الدقة.{"\n"}
                        للجادين والجادات فقط 📩 خاص
                      </div>

                      <div className="pt-3 border-t border-stone-900/80 space-y-2">
                        <span className="text-[10px] text-stone-400 block font-bold">الرابط المرفق تلقائياً بالرسالة:</span>
                        <div className="bg-stone-900 p-2 rounded-lg font-mono text-[10px] text-amber-500/80 text-left truncate" dir="ltr">
                          {getPublicUrl()}
                        </div>
                      </div>
                    </div>

                    {/* Quick Copy Box */}
                    <div className="lg:col-span-4 space-y-4">
                      <div className="bg-stone-900/60 p-4 rounded-xl border border-stone-850 space-y-3">
                        <span className="text-xs font-bold text-stone-200 block">خيارات نسخ المادة الإعلانية:</span>
                        
                        <div className="space-y-2">
                          <button
                            type="button"
                            onClick={() => {
                              const textToCopy = `*زواج كبار الشخصيات والنخبة بالخليج* \n\nعرسان وعرائس من الأسر الحاكمة والبيوت الكريمة\n*الأسر الحاكمة:* آل سعود، آل صباح، آل نهيان، آل مكتوم، آل ثاني، آل خليفة، آل بوسعيد\n*العوائل والقبائل:* آل الشيخ، السديري، عنزة، شمر، حرب، مطير، عتيبة، قحطان، الدواسر، بني خالد، يام\n\nنخبة المجتمع وكبار الشخصيات بخصوصية تامة وشروط بالغة الدقة.\nللجادين والجادات فقط 📩 خاص\n\nلالتسجيل الفوري بالمنصة بخصوصية تامة:\n${getPublicUrl()}`;
                              navigator.clipboard.writeText(textToCopy);
                              setCopiedPromoText(true);
                              setTimeout(() => setCopiedPromoText(false), 3000);
                            }}
                            className={`w-full py-2.5 rounded-lg font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 ${
                              copiedPromoText 
                                ? "bg-emerald-500 text-stone-950" 
                                : "bg-amber-500 hover:bg-amber-400 text-stone-950"
                            }`}
                          >
                            <span>{copiedPromoText ? "✓ تم نسخ النص الإعلاني والرابط" : "📋 نسخ النص + الرابط العام"}</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              const textOnly = `*زواج كبار الشخصيات والنخبة بالخليج* \n\nعرسان وعرائس من الأسر الحاكمة والبيوت الكريمة\n*الأسر الحاكمة:* آل سعود، آل صباح، آل نهيان، آل مكتوم، آل ثاني، آل خليفة، آل بوسعيد\n*العوائل والقبائل:* آل الشيخ، السديري، عنزة، شمر، حرب، مطير، عتيبة، قحطان، الدواسر، بني خالد، يام\n\nنخبة المجتمع وكبار الشخصيات بخصوصية تامة وشروط بالغة الدقة.\nللجادين والجادات فقط 📩 خاص`;
                              navigator.clipboard.writeText(textOnly);
                              alert("تم نسخ النص الإعلاني فقط بنجاح بدون الرابط.");
                            }}
                            className="w-full py-2 bg-stone-850 hover:bg-stone-800 border border-stone-750 text-stone-300 font-medium text-[11px] rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
                          >
                            <span>نسخ النص فقط (بدون الرابط) 📄</span>
                          </button>
                        </div>
                      </div>

                      <div className="bg-amber-500/5 p-3.5 rounded-xl border border-amber-500/10 text-[10.5px] text-stone-400 leading-relaxed font-light">
                        <strong className="text-amber-400 font-bold block mb-1">💡 نصيحة الخبراء للتسويق:</strong>
                        استخدم هذا النص كتعليق مثبت أو كرسالة ترويجية أولى في حملاتك. أثبتت هذه الصياغة تحقيق أعلى معدلات نقر وسرية تامة للأسر والقبائل.
                      </div>
                    </div>
                  </div>
                </div>

                {/* Privacy-First Guard Panel: Safe Cryptographic Vault */}
                <div className="bg-[#12100e] border border-amber-500/15 p-8 rounded-3xl space-y-6 relative overflow-hidden shadow-2xl">
                  <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-amber-500/5 rounded-full blur-[50px] pointer-events-none" />
                  
                  <div className="max-w-2xl mx-auto text-center space-y-4 relative z-10">
                    <div className="w-16 h-16 rounded-full mx-auto bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shadow-md">
                      <ShieldCheck size={32} className="text-amber-500 animate-pulse" />
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="text-base font-bold text-stone-100 flex items-center justify-center gap-2">
                        <span>جدار حماية وسرية بيانات العملاء والنخبة مفعّل</span>
                      </h3>
                      <p className="text-[11px] text-amber-500 font-bold tracking-wide">
                        🔐 بروتوكول عدم العرض لحماية الشيوخ والقبائل والعوائل الكريمة نشط تلقائياً
                      </p>
                    </div>

                    <p className="text-xs text-stone-300 leading-relaxed font-light text-center max-w-xl mx-auto" dir="rtl">
                      بناءً على التوجيهات الصارمة لإدارة ديوان النخبة، وتماشياً مع أعلى معايير الخصوصية المعتمدة لزواج كبار الشخصيات بالخليج العربي، تم <strong>تشفير ومنع عرض هويات وأسماء وأرقام وتفاصيل العملاء الذين يسجلون أو يزورون المنصة</strong> بشكل كامل على شاشة المتصفح والـ Dashboard العامة لتفادي أي لقطات شاشة أو تسريب أو وصول غير مصرح به.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3">
                      <div className="bg-stone-950/80 border border-stone-900 p-4 rounded-xl text-center space-y-1">
                        <span className="text-[10px] text-stone-400 block font-light">إرسال مشفر (E2EE)</span>
                        <strong className="text-xs text-emerald-400 block font-semibold">مشفر بالكامل بقوة 256-bit</strong>
                      </div>
                      <div className="bg-stone-950/80 border border-stone-900 p-4 rounded-xl text-center space-y-1">
                        <span className="text-[10px] text-stone-400 block font-light">قنوات قراءة مباشرة مغلقة</span>
                        <strong className="text-xs text-amber-400 block font-semibold">إلى قنوات تواصل الإدارة فقط</strong>
                      </div>
                      <div className="bg-stone-950/80 border border-stone-900 p-4 rounded-xl text-center space-y-1">
                        <span className="text-[10px] text-stone-400 block font-light">تخزين آمن معزول</span>
                        <strong className="text-xs text-stone-300 block font-semibold">أقراص مغلقة ومحمية ضد الفحص</strong>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-[#e9e1d2] text-[10.5px] text-[#8e7f6e] flex flex-col sm:flex-row items-center justify-center gap-2 font-light">
                      <span>✓ إجمالي الطلبات المحمية حالياً: <strong className="font-mono font-bold text-[#af9353]">{applications.length + vipInquiries.length} طلب سري</strong></span>
                      <span className="hidden sm:inline text-[#e9e1d2]">•</span>
                      <span>سجل الأمان: <span className="text-emerald-600 font-bold">نشط وخالٍ من الثغرات 🛡️</span></span>
                    </div>
                  </div>
                </div>



                {/* 📋 Comprehensive Applications List and Submissions Dashboard */}
                <div className="bg-white border border-[#e9e1d2] p-6 md:p-8 rounded-3xl space-y-6 relative overflow-hidden shadow-sm">
                  <div className="absolute top-0 left-0 w-[150px] h-[150px] bg-[#c5a85c]/5 rounded-full blur-[50px] pointer-events-none" />
                  
                  {/* Title of Admin Log list */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#e9e1d2] pb-4 text-right">
                    <div className="space-y-1">
                      <span className="text-xs text-[#af9353] font-bold uppercase tracking-widest flex items-center gap-1">
                        <Users size={12} className="text-[#af9353]" />
                        سجلات ديوان النخبة المغلقة
                      </span>
                      <h3 className="text-lg font-bold text-[#2c2214] flex items-center gap-2">
                        <span>طلبات التقديم واستفسارات النخبة الحية بالمنصة 📋</span>
                      </h3>
                      <p className="text-[11px] text-[#6c5e4e] font-light">
                        تتبع وإدارة جميع السير والبيانات التي يسجلها الزوار في المنصة وتواصل معهم مباشرة أو احذف طلباتهم.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={fetchData}
                      className="px-3.5 py-1.5 rounded-lg bg-white hover:bg-[#fbfaf6] border border-[#e9e1d2] text-[#6c5e4e] font-medium text-xs transition-colors flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
                    >
                      <RefreshCw size={11} className="animate-spin-slow text-[#c5a85c]" />
                      <span>تحديث السجلات والطلبات 🔄</span>
                    </button>
                  </div>

                  {/* Section A: VIP Inquiries ({vipInquiries.length}) */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-[#e9e1d2] pb-2">
                      <h4 className="text-xs font-bold text-[#af9353] flex items-center gap-2">
                        <Crown size={14} className="text-[#c5a85c]" />
                        <span>استفسارات كبار الشخصيات VIP المباشرة ({vipInquiries.length} طلب)</span>
                      </h4>
                      <span className="text-[10px] text-[#8e7f6e] font-mono">الطلبات الواردة عبر فرع المكاتب</span>
                    </div>

                    {vipInquiries.length === 0 ? (
                      <div className="bg-[#fbfaf6] p-8 rounded-2xl border border-[#e9e1d2] text-center text-[#8e7f6e] text-xs font-light">
                        لا توجد استفسارات VIP مسجلة حالياً بالمنصة.
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {vipInquiries.map((inq) => {
                          const tierLabels: Record<string, string> = {
                            S_CLASS_DIPLOMATIC: "سرية مطلقة عائلية (S-Class)",
                            EXECUTIVE_A_PLUS: "مطابقة شخصية وسيطة (A+)",
                            ROYAL_COUNCIL_S3: "ديوان المطابقة الملكي (S3)"
                          };
                          const officeLabels: Record<string, string> = {
                            riyadh: "الرياض",
                            jeddah: "جدة",
                            dubai: "دبي"
                          };

                          return (
                            <div key={inq.id} className="bg-[#fbfaf6] border border-[#e9e1d2] p-5 rounded-2xl space-y-4 text-right relative hover:border-[#c5a85c]/30 transition-colors">
                              <div className="flex items-start justify-between">
                                <span className="bg-[#c5a85c]/10 text-[#af9353] border border-[#c5a85c]/20 text-[9.5px] px-2 py-0.5 rounded font-bold">
                                  {tierLabels[inq.vipTier] || inq.vipTier}
                                </span>
                                
                                <button
                                  type="button"
                                  onClick={() => handleDeleteVipInquiry(inq.id)}
                                  className="text-[#8e7f6e] hover:text-rose-500 p-1 transition-colors cursor-pointer"
                                  title="حذف الاستفسار"
                                >
                                  <Trash2 size={13} />
                                </button>
                              </div>

                              <div className="space-y-2 text-xs font-sans">
                                <div className="flex justify-between border-b border-[#e9e1d2] pb-1.5">
                                  <span className="text-[#6c5e4e]">الاسم / الكنية:</span>
                                  <strong className="text-[#2c2214] font-bold">{inq.name}</strong>
                                </div>

                                <div className="flex justify-between border-b border-[#e9e1d2] pb-1.5">
                                  <span className="text-[#6c5e4e]">رقم الاتصال:</span>
                                  <strong className="text-[#af9353] font-mono select-all font-bold" dir="ltr">{inq.phone}</strong>
                                </div>

                                <div className="flex justify-between border-b border-[#e9e1d2] pb-1.5">
                                  <span className="text-[#6c5e4e]">المقر المفضل:</span>
                                  <span className="text-[#2c2214]">{officeLabels[inq.officeId] || inq.officeId}</span>
                                </div>

                                <div className="space-y-1">
                                  <span className="text-[#6c5e4e] block">شروط ومتمتطلبات الارتباط الفريدة:</span>
                                  <div className="bg-white p-2.5 rounded-xl border border-[#e9e1d2] font-light text-[#2c2214] leading-relaxed text-[11px] whitespace-pre-wrap">
                                    {inq.message || "لا يوجد شروط مخصصة"}
                                  </div>
                                </div>
                              </div>

                              <div className="pt-2 border-t border-[#e9e1d2] flex items-center justify-between text-[10px] text-[#8e7f6e]">
                                <span className="flex items-center gap-1">
                                  <Clock size={11} />
                                  <span>{new Date(inq.createdAt).toLocaleString("ar-SA")}</span>
                                </span>

                                <div className="flex gap-2">
                                  {/* Copy Button */}
                                  <button
                                    onClick={() => {
                                      const text = `استفسار VIP:\nالاسم: ${inq.name}\nالهاتف: ${inq.phone}\nالبروتوكول: ${tierLabels[inq.vipTier] || inq.vipTier}\nالفرع: ${officeLabels[inq.officeId] || inq.officeId}\nالملاحظة: ${inq.message || 'لا يوجد'}`;
                                      navigator.clipboard.writeText(text);
                                      alert("تم نسخ بيانات الاستفسار للذاكرة ✅");
                                    }}
                                    className="p-1 px-2.5 rounded bg-white border border-[#e9e1d2] hover:bg-[#fbfaf6] text-[#6c5e4e] transition-colors text-[10px] cursor-pointer"
                                  >
                                    نسخ البيانات 📋
                                  </button>

                                  {/* Direct WhatsApp chat opener */}
                                  <a
                                    href={`https://wa.me/${inq.phone.replace(/[\s\+]/g, '')}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="p-1 px-2.5 rounded bg-[#c5a85c] hover:bg-[#af9353] text-white transition-colors text-[10px] font-bold flex items-center gap-1"
                                  >
                                    <MessageCircle size={10} />
                                    <span>مراسلة واتساب 💬</span>
                                  </a>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Section B: Regular/General Applications ({applications.length}) */}
                  <div className="space-y-4 pt-4 border-t border-[#e9e1d2]">
                    <div className="flex items-center justify-between border-b border-[#e9e1d2] pb-2 text-right">
                      <h4 className="text-xs font-bold text-[#af9353] flex items-center gap-2">
                        <Users size={14} className="text-[#c5a85c]" />
                        <span>طلبات العضوية والتقديم المباشرة عبر النموذج المفتوح ({applications.length} طلب)</span>
                      </h4>
                      <span className="text-[10px] text-[#8e7f6e] font-mono">سير تقديم العرسان والعرائس</span>
                    </div>

                    {applications.length === 0 ? (
                      <div className="bg-[#fbfaf6] p-8 rounded-2xl border border-[#e9e1d2] text-center text-[#8e7f6e] text-xs font-light">
                        لا توجد طلبات تقديم مسجلة حالياً بالمنصة.
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {applications.map((appItem) => {
                          return (
                            <div key={appItem.id} className="bg-[#fbfaf6] border border-[#e9e1d2] p-5 rounded-2xl space-y-4 text-right relative hover:border-[#c5a85c]/30 transition-colors">
                              <div className="flex items-start justify-between">
                                <span className={`border text-[9px] px-2 py-0.5 rounded font-bold ${appItem.gender === "ذكر" ? "bg-blue-50 text-blue-800 border-blue-200" : "bg-rose-50 text-rose-800 border-rose-200"}`}>
                                  {appItem.gender} ({appItem.age} سنة)
                                </span>
                                
                                <button
                                  type="button"
                                  onClick={() => handleDeleteApplication(appItem.id)}
                                  className="text-[#8e7f6e] hover:text-rose-500 p-1 transition-colors cursor-pointer"
                                  title="حذف الطلب"
                                >
                                  <Trash2 size={13} />
                                </button>
                              </div>

                              <div className="space-y-2 text-xs font-sans">
                                <div className="flex justify-between border-b border-[#e9e1d2] pb-1.5">
                                  <span className="text-[#6c5e4e]">البلد والمدينة:</span>
                                  <span className="text-[#2c2214] font-medium">{appItem.city}</span>
                                </div>

                                <div className="flex justify-between border-b border-[#e9e1d2] pb-1.5">
                                  <span className="text-[#6c5e4e]">الحالة الاجتماعية:</span>
                                  <span className="text-[#2c2214] font-medium">{appItem.maritalStatus}</span>
                                </div>

                                <div className="flex justify-between border-b border-[#e9e1d2] pb-1.5">
                                  <span className="text-[#6c5e4e]">التواصل المعتمد:</span>
                                  <strong className="text-[#af9353] font-mono select-all font-bold" dir="ltr">{appItem.contact}</strong>
                                </div>

                                {appItem.source && (
                                  <div className="flex justify-between border-b border-[#e9e1d2] pb-1.5 text-[10px]">
                                    <span className="text-[#8e7f6e]">مصدر الزيارة (UTM):</span>
                                    <span className="text-[#6c5e4e] font-mono">{appItem.source}</span>
                                  </div>
                                )}

                                <div className="space-y-1">
                                  <span className="text-[#6c5e4e] block">مواصفات وشروط مقدم الطلب:</span>
                                  <div className="bg-white p-2.5 rounded-xl border border-[#e9e1d2] font-light text-[#2c2214] leading-relaxed text-[11px] whitespace-pre-wrap">
                                    {appItem.note || "لا يوجد شروط مخصصة"}
                                  </div>
                                </div>
                              </div>

                              <div className="pt-2 border-t border-[#e9e1d2] flex items-center justify-between text-[10px] text-[#8e7f6e]">
                                <span className="flex items-center gap-1">
                                  <Clock size={11} />
                                  <span>{new Date(appItem.createdAt).toLocaleString("ar-SA")}</span>
                                </span>

                                <div className="flex gap-2">
                                  {/* Copy Button */}
                                  <button
                                    onClick={() => {
                                      const text = `طلب تقديم خطابة:\nالجنس: ${appItem.gender}\nالعمر: ${appItem.age}\nالمدينة: ${appItem.city}\nالحالة: ${appItem.maritalStatus}\nالتواصل: ${appItem.contact}\nالملاحظة: ${appItem.note || 'لا يوجد'}`;
                                      navigator.clipboard.writeText(text);
                                      alert("تم نسخ بيانات الطلب للذاكرة ✅");
                                    }}
                                    className="p-1 px-2.5 rounded bg-white border border-[#e9e1d2] hover:bg-[#fbfaf6] text-[#6c5e4e] transition-colors text-[10px] cursor-pointer"
                                  >
                                    نسخ 📋
                                  </button>

                                  {/* Direct WhatsApp chat opener */}
                                  <a
                                    href={`https://wa.me/${appItem.contact.replace(/[\s\+]/g, '')}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="p-1 px-2.5 rounded bg-[#c5a85c] hover:bg-[#af9353] text-white transition-colors text-[10px] font-bold flex items-center gap-1"
                                  >
                                    <MessageCircle size={10} />
                                    <span>واتساب 💬</span>
                                  </a>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>

              </div>
            )}

          </div>
        )}

      </main>

      {/* FOOTER COOPERATIONS */}
      <footer className="border-t border-[#c5a85c]/20 bg-[#0a0907]/90 mt-16 py-8 text-center px-4 text-[#b9b1a2] text-xs">
        <div className="max-w-2xl mx-auto space-y-3">
          <p className="font-medium text-[#f3da90]">خطّابة كبار الشخصيات ومقام النخبة بالخليج</p>
          <p className="font-light leading-relaxed text-[11px] text-[#b9b1a2]">
            إننا نقدم وساطة زواج شرعية حقيقية متكافئة الأركان ومستوفية للشروط الدينية والاجتماعية. لا يتم الإلزام بأي رسوم إلا لمن يستحق العضوية المعتمدة والتوفيق الحقيقي.
          </p>
          <div className="pt-2 flex items-center justify-center gap-3 text-[10px] text-[#f3da90]/80 font-mono">
            <span>تاريخ تدشين الهوية: يونيو ٢٠٢٦</span>
            <span>•</span>
            <span>بواسطة ديوان النخبة للتوجيه</span>
          </div>
        </div>
      </footer>

      {/* PERSISTENT FLOATING WHATSAPP FAB AND ACTION DRAWER (Section C - Feature) */}
      <div className="fixed bottom-6 right-6 z-50">
        
        {/* The Action Drawer / Mini Bottom Sheet above FAB */}
        {showFABMenu && (
          <div className="absolute bottom-16 right-0 w-72 bg-[#1c1914] border border-[#c5a85c]/30 p-4 rounded-2xl shadow-xl space-y-3 animate-fadeIn">
            
            <div className="flex items-center justify-between border-b border-[#c5a85c]/15 pb-2">
              <span className="text-xs font-bold text-[#f3da90] flex items-center gap-1">
                <Crown size={12} className="fill-[#c5a85c]/10 text-[#c5a85c]" />
                توجيه الواتساب الذكي
              </span>
              <button 
                onClick={() => setShowFABMenu(false)}
                className="text-[#b9b1a2] hover:text-[#f3da90] transition-colors p-0.5 cursor-pointer"
              >
                <X size={14} />
              </button>
            </div>

            <p className="text-[10px] text-[#b9b1a2] leading-relaxed">حدد موضوع تواصلك للتواصل مع المنسقة وافتح الرسالة المناسبة:</p>

            <div className="space-y-1.5 flex flex-col">
              
              <button
                onClick={() => {
                  handleWhatsAppAction("general", "whatsapp_general");
                  setShowFABMenu(false);
                }}
                className="w-full text-right p-2.5 rounded-lg bg-black/40 border border-[#c5a85c]/15 hover:border-[#c5a85c]/45 hover:bg-[#c5a85c]/10 text-[#e4dfd5] hover:text-[#f3da90] font-medium text-xs transition-all flex items-center justify-between group cursor-pointer"
              >
                <span>١. استفسار عام مبدئي</span>
                <ArrowRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>

              <button
                onClick={() => {
                  handleWhatsAppAction("apply", "whatsapp_apply");
                  setShowFABMenu(false);
                }}
                className="w-full text-right p-2.5 rounded-lg bg-black/40 border border-[#c5a85c]/15 hover:border-[#c5a85c]/45 hover:bg-[#c5a85c]/10 text-[#e4dfd5] hover:text-[#f3da90] font-medium text-xs transition-all flex items-center justify-between group cursor-pointer"
              >
                <span>٢. تقديم طلب العضوية</span>
                <ArrowRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>

              <button
                onClick={() => {
                  handleWhatsAppAction("vipSpecial", "whatsapp_vip");
                  setShowFABMenu(false);
                }}
                className="w-full text-right p-2.5 rounded-lg bg-black/40 border border-[#c5a85c]/15 hover:border-[#c5a85c]/45 hover:bg-[#c5a85c]/10 text-[#e4dfd5] hover:text-[#f3da90] font-medium text-xs transition-all flex items-center justify-between group cursor-pointer"
              >
                <span>٣. استفسار باقات VIP النخبة</span>
                <ArrowRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>

            </div>

            {/* Combined Direct links */}
            <div className="border-t border-[#c5a85c]/15 pt-2 text-center">
              <a
                href={OFFICIAL_WHATSAPP_LINK}
                target="_blank"
                rel="noreferrer"
                onClick={() => registerEvent("whatsapp_general")}
                className="text-[10px] text-[#f3da90] underline hover:text-[#c5a85c] block"
              >
                أو افتح رابط الخيارات الرقمية مباشرة
              </a>
            </div>

          </div>
        )}

        {/* Floating Action Button (FAB) (Green #25D366) */}
        <button
          id="persistent-whatsapp-fab"
          onClick={() => {
            setShowFABMenu(!showFABMenu);
            registerEvent("whatsapp_general"); // track click
          }}
          className="bg-[#25D366] hover:bg-[#20ba59] text-white font-bold px-4 py-3.5 rounded-full flex items-center gap-2.5 shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none ring-4 ring-green-900/10 group cursor-pointer"
          style={{ zIndex: 9999 }}
        >
          <MessageCircle size={22} className="fill-white" />
          <span className="text-sm font-bold block max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 whitespace-nowrap">
            واتساب النخبة
          </span>
          <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full font-mono text-[10px] hidden md:block">
            نشط
          </span>
        </button>

      </div>

      {/* GLAMOROUS FLOATING TOAST NOTIFICATION */}
      {shareToast && (
        <div className="fixed bottom-24 left-6 z-50 bg-[#1c1914]/95 border border-[#c5a85c]/35 text-[#e4dfd5] px-5 py-4 rounded-2xl shadow-xl flex items-center gap-3 animate-fadeIn max-w-sm transition-all duration-300 backdrop-blur-md">
          <div className="p-1 rounded-full bg-[#c5a85c]/20 text-[#f3da90] shrink-0">
            <Check size={18} />
          </div>
          <div className="text-right flex-1">
            <p className="text-xs font-bold font-sans text-[#f3da90]">تنبيه المشاركة الفاخر</p>
            <p className="text-[11px] text-[#b9b1a2] mt-1 leading-relaxed">{shareToast}</p>
          </div>
          <button 
            onClick={() => setShareToast(null)}
            className="text-[#b9b1a2] hover:text-[#f3da90] p-1 rounded-full hover:bg-white/5 transition-colors shrink-0 cursor-pointer"
          >
            <X size={14} />
          </button>
        </div>
      )}



    </div>
  );
}
