import express from "express";
import fs from "fs";
import path from "path";
import { exec } from "child_process";
import https from "https";
import { createServer as createViteServer } from "vite";

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

interface VisitorEntry {
  id: string;
  name: string;
  location: string;
  action: string;
  timestamp: string;
  isReal: boolean;
}

let recentVisitors: VisitorEntry[] = [];
const MAX_VISITORS_LOG = 50;

const GULF_REGIONS = [
  { city: "الرياض", country: "السعودية 🇸🇦", families: ["الراجحي", "الماجد", "السالم", "العيسى", "التويجري", "البابطين", "اليوسف", "آل سعود"] },
  { city: "القصيم", country: "السعودية 🇸🇦", families: ["الفوزان", "الجميح", "البسام", "الرشيد", "الحبيب", "قبيلة حرب"] },
  { city: "حائل", country: "السعودية 🇸🇦", families: ["قبيلة شمر", "الخليل", "عائلة السعيد"] },
  { city: "المنطقة الشمالية", country: "السعودية 🇸🇦", families: ["قبيلة عنزة", "قبيلة الظفير"] },
  { city: "المنطقة الوسطى", country: "السعودية 🇸🇦", families: ["قبيلة عتيبة", "قبيلة مطير", "عائلة السعيد"] },
  { city: "المدينة والحجاز", country: "السعودية 🇸🇦", families: ["قبيلة حرب", "عائلة العيسى"] },
  { city: "المنطقة الجنوبية", country: "السعودية 🇸🇦", families: ["قبيلة قحطان", "قبيلة يام", "قبائل عسير"] },
  { city: "المنطقة الشرقية", country: "السعودية 🇸🇦", families: ["قبيلة بني خالد", "عائلة المحيديب", "عائلة الصالح"] },
  { city: "الكويت العاصمة", country: "الكويت 🇰🇼", families: ["آل صباح", "عائلة الشايع", "عائلة الغانم", "عائلة الملا"] },
  { city: "الجهراء", country: "الكويت 🇰🇼", families: ["قبيلة الرشايدة", "عائلة العبدالله"] },
  { city: "الأحمدي", country: "الكويت 🇰🇼", families: ["قبيلة العوازم", "قبيلة بني هاجر"] },
  { city: "أبوظبي", country: "الإمارات 🇦🇪", families: ["آل نهيان", "قبيلة بني ياس"] },
  { city: "دبي", country: "الإمارات 🇦🇪", families: ["آل مكتوم", "عائلة الفطيم", "عائلة الغرير"] },
  { city: "الدوحة", country: "قطر 🇶🇦", families: ["آل ثاني", "قبيلة آل مرة"] },
  { city: "المنامة", country: "البحرين 🇧🇭", families: ["آل خليفة", "عائلة كانو"] },
  { city: "مسقط", country: "عمان 🇴🇲", families: ["آل بوسعيد", "قبيلة بني كعب"] }
];

const ACTIONS = [
  "دخل المنصة الآن 📱",
  "يتصفح دليل القبائل والعوائل 🛡️",
  "يستعلم عن شروط التقديم السرية 🔑",
  "يستعرض باقات عضوية كبار الشخصيات 👑",
  "يتواصل مع مديرة التوفيق مباشرة 💬",
  "يراجع الأسئلة الشائعة والخصوصية 🛡️"
];

function generateSimulatedVisitor(): VisitorEntry {
  const region = GULF_REGIONS[Math.floor(Math.random() * GULF_REGIONS.length)];
  const family = region.families[Math.floor(Math.random() * region.families.length)];
  
  let name = "";
  if (family.startsWith("قبيلة")) {
    name = `عضو من ${family}`;
  } else if (family.startsWith("آل ")) {
    name = `زائر من أسرة ${family}`;
  } else {
    name = `زائر من ${family}`;
  }

  if (Math.random() < 0.15) {
    name = Math.random() > 0.5 ? "زاهرة كريمة (سرية مطلقة)" : "زائر كريم ( VIP )";
  }

  const action = ACTIONS[Math.floor(Math.random() * ACTIONS.length)];

  return {
    id: "sim_" + Math.random().toString(36).substring(2, 9),
    name,
    location: `${region.city}، ${region.country}`,
    action,
    timestamp: new Date().toISOString(),
    isReal: false
  };
}

const STORAGE_FILE = path.join(process.cwd(), "storage.json");

// Helper to load state
function loadState(): { stats: Stats; applications: Application[]; vipInquiries: VipInquiry[] } {
  try {
    if (fs.existsSync(STORAGE_FILE)) {
      const raw = fs.readFileSync(STORAGE_FILE, "utf-8");
      const parsed = JSON.parse(raw);
      return {
        stats: parsed.stats || {},
        applications: parsed.applications || [],
        vipInquiries: parsed.vipInquiries || []
      };
    }
  } catch (err) {
    console.error("Error loading storage file, using fallback:", err);
  }

  // Default state
  return {
    stats: {
      whatsapp_total: 0,
      whatsapp_general: 0,
      whatsapp_apply: 0,
      whatsapp_vip: 0,
      vip_basic_clicks: 0,
      vip_plus_clicks: 0,
      vip_special_clicks: 0,
      sources: {
        snapchat: 0,
        tiktok: 0,
        instagram: 0,
        direct: 0,
      },
      page_views: 0,
    },
    applications: [],
    vipInquiries: []
  };
}

// Helper to save state
function saveState(state: { stats: Stats; applications: Application[]; vipInquiries: VipInquiry[] }) {
  try {
    fs.writeFileSync(STORAGE_FILE, JSON.stringify(state, null, 2), "utf-8");
  } catch (err) {
    console.error("Error writing storage file:", err);
  }
}

function sendWhatsAppAPI(settings: any, message: string) {
  const { provider, phone, apiKey, webhookUrl } = settings;
  
  if (provider === "callmebot") {
    if (!phone || !apiKey) {
      console.warn("CallMeBot notifications are configured but phone or apiKey is missing.");
      return;
    }
    // Clean phone number: remove "+", " ", "-", and any non-digits
    const cleanPhone = phone.replace(/\D/g, "");
    const encodedText = encodeURIComponent(message);
    const url = `https://api.callmebot.com/whatsapp.php?phone=${cleanPhone}&text=${encodedText}&apikey=${apiKey}`;
    
    https.get(url, (res) => {
      let data = "";
      res.on("data", (chunk) => data += chunk);
      res.on("end", () => {
        console.log("CallMeBot response code:", res.statusCode);
      });
    }).on("error", (err) => {
      console.error("CallMeBot request failed:", err);
    });
  } else if (provider === "custom_webhook") {
    if (!webhookUrl) {
      console.warn("Custom Webhook WhatsApp provider is selected but webhookUrl is empty.");
      return;
    }
    
    try {
      const parsedUrl = new URL(webhookUrl);
      const postData = JSON.stringify({
        phone: phone || "",
        message: message,
        text: message
      });
      
      const options = {
        hostname: parsedUrl.hostname,
        port: parsedUrl.port || (parsedUrl.protocol === "https:" ? 443 : 80),
        path: parsedUrl.pathname + parsedUrl.search,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(postData)
        }
      };
      
      const req = https.request(options, (res) => {
        let data = "";
        res.on("data", (chunk) => data += chunk);
        res.on("end", () => {
          console.log("Custom Webhook WhatsApp alert status:", res.statusCode);
        });
      });
      
      req.on("error", (err) => {
        console.error("Custom Webhook WhatsApp alert failed:", err);
      });
      
      req.write(postData);
      req.end();
    } catch (urlErr) {
      console.error("Invalid custom Webhook URL:", urlErr);
    }
  }
}

function sendWhatsAppNotification(message: string) {
  const state = loadState();
  const settings = (state as any).whatsappSettings;
  if (!settings || !settings.enabled) {
    const envPhone = process.env.WHATSAPP_PHONE;
    const envApiKey = process.env.WHATSAPP_API_KEY;
    if (envPhone && envApiKey) {
      sendWhatsAppAPI({ provider: "callmebot", phone: envPhone, apiKey: envApiKey }, message);
    }
    return;
  }
  sendWhatsAppAPI(settings, message);
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route - Get Statistics and Applications
  app.get("/api/stats", (req, res) => {
    const state = loadState();
    res.json(state);
  });

  // API Route - Increment Stats
  app.post("/api/stats/increment", (req, res) => {
    const { event, source } = req.body;
    const state = loadState();

    state.stats.page_views = (state.stats.page_views || 0) + (event === "page_view" ? 1 : 0);

    // Track ref sources on page view or user interaction
    if (source) {
      const srcKey = source.toLowerCase();
      if (srcKey.includes("snap")) {
        state.stats.sources.snapchat++;
      } else if (srcKey.includes("tiktok") || srcKey.includes("tik")) {
        state.stats.sources.tiktok++;
      } else if (srcKey.includes("instagram") || srcKey.includes("insta")) {
        state.stats.sources.instagram++;
      } else {
        state.stats.sources.direct++;
      }
    }

    if (event === "whatsapp_general") {
      state.stats.whatsapp_general++;
      state.stats.whatsapp_total++;
    } else if (event === "whatsapp_apply") {
      state.stats.whatsapp_apply++;
      state.stats.whatsapp_total++;
    } else if (event === "whatsapp_vip") {
      state.stats.whatsapp_vip++;
      state.stats.whatsapp_total++;
    } else if (event === "vip_basic") {
      state.stats.vip_basic_clicks++;
    } else if (event === "vip_plus") {
      state.stats.vip_plus_clicks++;
    } else if (event === "vip_special") {
      state.stats.vip_special_clicks++;
    }

    saveState(state);
    res.json({ success: true, stats: state.stats });
  });

  // API Route - Submit Membership Application
  app.post("/api/applications/submit", (req, res) => {
    const { gender, age, city, maritalStatus, note, contact, source } = req.body;
    const state = loadState();

    const newApp: Application = {
      id: Math.random().toString(36).substring(2, 9),
      gender: gender || "غير محدد",
      age: Number(age) || 30,
      city: city || "غير محدد",
      maritalStatus: maritalStatus || "غير محدد",
      note: note || "",
      contact: contact || "غير محدد",
      createdAt: new Date().toISOString(),
      source: source || "direct",
    };

    state.applications.unshift(newApp);
    // Submit counts as an apply click registered
    state.stats.whatsapp_apply++;
    state.stats.whatsapp_total++;

    saveState(state);

    // Send WhatsApp Notification
    try {
      const waMsg = `*📩 تنبيه: طلب تقديم عضوية جديد بالمنصة 📩*\n\n` +
        `👤 *الجنس:* ${newApp.gender}\n` +
        `🎂 *العمر:* ${newApp.age} سنة\n` +
        `📍 *البلد والمدينة:* ${newApp.city}\n` +
        `💍 *الحالة الاجتماعية:* ${newApp.maritalStatus}\n` +
        `📞 *وسيلة التواصل:* ${newApp.contact}\n` +
        `🌐 *مصدر الزيارة (UTM):* ${newApp.source}\n` +
        `📝 *ملاحظات إضافية:*\n${newApp.note || "لا يوجد"}\n\n` +
        `📅 _تاريخ الإرسال: ${new Date(newApp.createdAt).toLocaleString("ar-SA")}_`;
      sendWhatsAppNotification(waMsg);
    } catch (waErr) {
      console.error("Failed triggering WhatsApp application alert:", waErr);
    }

    res.json({ success: true, application: newApp });
  });

  // API Route - Submit VIP Executive Inquiry
  app.post("/api/vip-inquiries/submit", (req, res) => {
    const { name, phone, vipTier, message, officeId } = req.body;
    const state = loadState();

    const newInquiry: VipInquiry = {
      id: Math.random().toString(36).substring(2, 9),
      name: name || "غير محدد",
      phone: phone || "غير محدد",
      vipTier: vipTier || "S_CLASS_DIPLOMATIC",
      message: message || "",
      officeId: officeId || "riyadh",
      createdAt: new Date().toISOString()
    };

    state.vipInquiries = state.vipInquiries || [];
    state.vipInquiries.unshift(newInquiry);

    // Track statistics for VIP custom request submission as a VIP whatsapp increment (for total activity metrics)
    state.stats.whatsapp_vip++;
    state.stats.whatsapp_total++;

    saveState(state);

    // Send WhatsApp Notification
    try {
      const tierLabels: Record<string, string> = {
        S_CLASS_DIPLOMATIC: "سرية مطلقة عائلية (S-Class)",
        EXECUTIVE_A_PLUS: "مطابقة شخصية وسيطة حصرية (A+)",
        ROYAL_COUNCIL_S3: "ديوان المطابقة الملكي (S3)"
      };
      const officeLabels: Record<string, string> = {
        riyadh: "الرياض (حي حطين)",
        jeddah: "جدة (الحمراء)",
        dubai: "دبي (جميرا)"
      };

      const waMsg = `*👑 تنبيه: استفسار VIP جديد بالمنصة 👑*\n\n` +
        `👤 *الاسم/الكنية:* ${newInquiry.name}\n` +
        `📞 *رقم التواصل:* ${newInquiry.phone}\n` +
        `🎖️ *المستوى والبروتوكول:* ${tierLabels[newInquiry.vipTier] || newInquiry.vipTier}\n` +
        `🏢 *المقر المختار:* ${officeLabels[newInquiry.officeId] || newInquiry.officeId}\n` +
        `📝 *متطلبات الارتباط والرسالة:*\n${newInquiry.message || "لا يوجد"}\n\n` +
        `📅 _تاريخ الإرسال: ${new Date(newInquiry.createdAt).toLocaleString("ar-SA")}_`;
      sendWhatsAppNotification(waMsg);
    } catch (waErr) {
      console.error("Failed triggering WhatsApp VIP alert:", waErr);
    }

    res.json({ success: true, inquiry: newInquiry });
  });

  // API Routes - WhatsApp Settings & Test
  app.get("/api/whatsapp/settings", (req, res) => {
    const state = loadState() as any;
    res.json({
      success: true,
      settings: state.whatsappSettings || { provider: "callmebot", phone: "", apiKey: "", webhookUrl: "", enabled: false }
    });
  });

  app.post("/api/whatsapp/settings", (req, res) => {
    const { provider, phone, apiKey, webhookUrl, enabled } = req.body;
    const state = loadState() as any;
    state.whatsappSettings = {
      provider: provider || "callmebot",
      phone: phone || "",
      apiKey: apiKey || "",
      webhookUrl: webhookUrl || "",
      enabled: !!enabled
    };
    saveState(state);
    res.json({ success: true, settings: state.whatsappSettings });
  });

  app.post("/api/whatsapp/test", (req, res) => {
    const { provider, phone, apiKey, webhookUrl } = req.body;
    const testMessage = `*🔔 رسالة اختبارية من منصة ديوان النخبة لكبار الشخصيات*\n\nنظام التنبيهات الفورية الفائقة عبر الواتساب تم إعداده وتفعيله بنجاح! ✅`;
    
    const settings = {
      provider: provider || "callmebot",
      phone: phone || "",
      apiKey: apiKey || "",
      webhookUrl: webhookUrl || ""
    };

    if (settings.provider === "callmebot" && (!settings.phone || !settings.apiKey)) {
      return res.status(400).json({ success: false, error: "يرجى تحديد رقم الهاتف ومفتاح API لإرسال الاختبار." });
    }
    if (settings.provider === "custom_webhook" && !settings.webhookUrl) {
      return res.status(400).json({ success: false, error: "يرجى تحديد رابط الـ Webhook المخصص لإرسال الاختبار." });
    }

    sendWhatsAppAPI(settings, testMessage);
    res.json({ success: true, message: "تم إرسال رسالة الاختبار بنجاح." });
  });

  // API Routes - Delete single submissions securely
  app.delete("/api/applications/:id", (req, res) => {
    const { id } = req.params;
    const state = loadState();
    const initialLength = state.applications.length;
    state.applications = state.applications.filter(app => app.id !== id);
    if (state.applications.length < initialLength) {
      saveState(state);
      return res.json({ success: true, applications: state.applications });
    }
    res.status(404).json({ success: false, error: "الطلب غير موجود" });
  });

  app.delete("/api/vip-inquiries/:id", (req, res) => {
    const { id } = req.params;
    const state = loadState();
    const initialLength = state.vipInquiries?.length || 0;
    state.vipInquiries = (state.vipInquiries || []).filter(inq => inq.id !== id);
    if (state.vipInquiries.length < initialLength) {
      saveState(state);
      return res.json({ success: true, vipInquiries: state.vipInquiries });
    }
    res.status(404).json({ success: false, error: "الطلب غير موجود" });
  });

  // API Route - Get Active & Recent Visitors
  app.get("/api/visitors/active", (req, res) => {
    // If we have no visitors, seed some initial ones
    if (recentVisitors.length === 0) {
      for (let i = 0; i < 7; i++) {
        const v = generateSimulatedVisitor();
        const d = new Date();
        d.setSeconds(d.getSeconds() - (i * 35 + 8));
        v.timestamp = d.toISOString();
        recentVisitors.push(v);
      }
      recentVisitors.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
    }

    // Occasional simulated visitor injection (to maintain lively activity for alerts)
    const now = new Date();
    const latestVisitor = recentVisitors[recentVisitors.length - 1];
    const timeDiffSec = (now.getTime() - new Date(latestVisitor.timestamp).getTime()) / 1000;
    
    if (timeDiffSec > 20 && Math.random() < 0.8) {
      recentVisitors.push(generateSimulatedVisitor());
      if (recentVisitors.length > MAX_VISITORS_LOG) {
        recentVisitors.shift();
      }
    }

    res.json({ success: true, visitors: recentVisitors });
  });

  // API Route - Post a New Visitor Entry (Real or triggered)
  app.post("/api/visitors/enter", (req, res) => {
    const { city, country, family, action, isReal } = req.body;
    
    const realVisitor: VisitorEntry = {
      id: "real_" + Math.random().toString(36).substring(2, 9),
      name: family ? family : "زائر جديد للمنصة",
      location: city ? `${city}، ${country || "السعودية 🇸🇦"}` : "الرياض، السعودية 🇸🇦",
      action: action || "دخل المنصة الآن 📱",
      timestamp: new Date().toISOString(),
      isReal: isReal !== undefined ? isReal : true
    };

    recentVisitors.push(realVisitor);
    if (recentVisitors.length > MAX_VISITORS_LOG) {
      recentVisitors.shift();
    }

    res.json({ success: true, visitor: realVisitor });
  });

  // API Route - Clear All Stats (Admin feature)
  app.post("/api/stats/reset", (req, res) => {
    const cleanState = {
      stats: {
        whatsapp_total: 0,
        whatsapp_general: 0,
        whatsapp_apply: 0,
        whatsapp_vip: 0,
        vip_basic_clicks: 0,
        vip_plus_clicks: 0,
        vip_special_clicks: 0,
        sources: {
          snapchat: 0,
          tiktok: 0,
          instagram: 0,
          direct: 0,
        },
        page_views: 0,
      },
      applications: [],
      vipInquiries: []
    };
    saveState(cleanState);
    res.json({ success: true, stats: cleanState.stats, applications: cleanState.applications, vipInquiries: cleanState.vipInquiries });
  });

  // API Route - Check Internet & Public Status (Cloud Run public accessibility check)
  app.get("/api/gcloud/status", async (req, res) => {
    const serviceName = process.env.K_SERVICE || "ais-pre-sjehcuhnbfmn3lkfd7ooar";
    const region = "europe-west2";
    const sharedUrl = "https://ais-pre-sjehcuhnbfmn3lkfd7ooar-962571876562.europe-west2.run.app";

    const checkUrl = (url: string): Promise<{ ok: boolean; statusCode?: number; error?: string }> => {
      return new Promise((resolve) => {
        try {
          const r = https.get(url, { timeout: 4000 }, (response) => {
            resolve({
              ok: response.statusCode !== undefined && response.statusCode >= 200 && response.statusCode < 400,
              statusCode: response.statusCode
            });
          });
          r.on("error", (err) => {
            resolve({ ok: false, error: err.message });
          });
          r.on("timeout", () => {
            r.destroy();
            resolve({ ok: false, error: "timeout" });
          });
        } catch (err: any) {
          resolve({ ok: false, error: err.message });
        }
      });
    };

    const googleCheck = await checkUrl("https://www.google.com");
    const selfCheck = await checkUrl(sharedUrl);

    // If we receive a 403 Forbidden, it indicates Cloud Run IAM policies restrict accessing the service (requires authentication)
    const isPublic = selfCheck.statusCode !== 403 && selfCheck.error === undefined;

    res.json({
      success: true,
      connectedToInternet: googleCheck.ok,
      isPublic,
      statusCode: selfCheck.statusCode || 0,
      error: selfCheck.error || null,
      serviceName,
      region,
      sharedUrl,
      commandToRun: `gcloud run services add-iam-policy-binding ${serviceName} --member="allUsers" --role="roles/run.invoker" --region="${region}"`
    });
  });

  // API Route - Try executing gcloud command to make the Cloud Run service public (lift auth)
  app.post("/api/gcloud/make-public", (req, res) => {
    const serviceName = process.env.K_SERVICE || "ais-pre-sjehcuhnbfmn3lkfd7ooar";
    const region = "europe-west2";
    const cmd = `gcloud run services add-iam-policy-binding ${serviceName} --member="allUsers" --role="roles/run.invoker" --region="${region}"`;

    exec(cmd, (error: any, stdout: string, stderr: string) => {
      if (error) {
        console.error("gcloud execution failed:", error);
        return res.json({
          success: false,
          error: error.message,
          stdout: stdout || "",
          stderr: stderr || "",
          command: cmd,
          serviceName,
          region
        });
      }
      res.json({
        success: true,
        stdout: stdout || "",
        stderr: stderr || "",
        command: cmd,
        serviceName,
        region
      });
    });
  });

  // Vite Integration
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
