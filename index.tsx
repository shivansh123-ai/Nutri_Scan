import React, { useState, useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import { GoogleGenAI } from "@google/genai";
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
} from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import {
  Camera,
  Upload,
  Loader2,
  ChefHat,
  Activity,
  Flame,
  Droplets,
  Search,
  History,
  ArrowRight,
  Zap,
  CheckCircle2,
  Github,
  Twitter,
  Scan,
  BrainCircuit,
  Database,
  Lock,
  Menu,
  X,
  Sparkles,
  ChevronRight,
  Check
} from "lucide-react";
// Removed broken firebase imports
// import { initializeApp } from "firebase/app";
// import { 
//   getFirestore, 
//   collection, 
//   addDoc, 
//   query, 
//   orderBy, 
//   limit, 
//   onSnapshot,
//   serverTimestamp
// } from "firebase/firestore";

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// --- Utility: Tailwind Merger ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Firebase Configuration ---
// Firebase disabled due to build errors - running in local mode
const db: any = null;

// --- Gemini API Setup ---
const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_API_KEY });
const MODEL_NAME = "gemini-2.5-flash-preview-09-2025";

// --- Types ---
interface Macros {
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
}

interface AnalysisResult {
  id?: string;
  name: string;
  summary: string;
  macros: Macros;
  imageUrl?: string;
  timestamp?: any;
  sources?: Array<{ uri: string; title: string }>;
}

// --- Utilities ---
const fileToGenerativePart = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      const base64Data = base64String.split(",")[1];
      resolve(base64Data);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

// --- UI Components ---

const Badge = ({ children, className }: { children?: React.ReactNode; className?: string }) => (
  <span className={cn("inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-widest", className)}>
    {children}
  </span>
);

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 inset-x-0 z-50 transition-all duration-300 border-b",
      isScrolled ? "bg-dark-900/80 backdrop-blur-md border-white/5 py-4" : "bg-transparent border-transparent py-6"
    )}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-2 group cursor-pointer">
          
          <span className="text-xl font-bold text-white tracking-tight">
            Orbyt<span className="text-brand-cyan">.food</span>
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
          {["Features", "How it Works",  "FAQ"].map((item) => (
            <a key={item} href={`#${item.toLowerCase().replace(/\s+/g, '-')}`} className="hover:text-white transition-colors">
              {item}
            </a>
          ))}
        </div>

        
      </div>
    </nav>
  );
};

const SectionHeading = ({ badge, title, subtitle, align = "center" }: any) => (
  <div className={cn("mb-16", align === "center" ? "text-center" : "text-left")}>
    {badge && (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="inline-block mb-4"
      >
        <Badge className="bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/20">
          <Sparkles className="w-3 h-3" /> {badge}
        </Badge>
      </motion.div>
    )}
    <motion.h2
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
      className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight"
    >
      {title}
    </motion.h2>
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2 }}
      className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed"
    >
      {subtitle}
    </motion.p>
  </div>
);

// --- New Components ---

const HowItWorks = () => {
  const steps = [
    {
      icon: Camera,
      title: "Snap a photo",
      description: "Take a picture of your meal or upload an existing image."
    },
    {
      icon: BrainCircuit,
      title: "AI Analysis",
      description: "Identifies ingredients and calculates macros."
    },
    {
      icon: Activity,
      title: "Track & Optimize",
      description: "Get real-time insights and save data to your health vault."
    }
  ];

  return (
    <section id="how-it-works" className="py-24 relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          badge="Process"
          title="From plate to data in seconds."
          subtitle="Complex nutritional analysis simplified into three effortless steps."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-16 relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-[2px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2 }}
              className="relative flex flex-col items-center text-center group"
            >
              <div className="w-24 h-24 rounded-2xl bg-dark-800 border border-white/10 flex items-center justify-center mb-6 z-10 relative group-hover:scale-110 transition-transform duration-500 shadow-xl shadow-black/50">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-cyan/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                <step.icon className="w-10 h-10 text-brand-cyan" />
                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-dark-700 border border-white/10 flex items-center justify-center font-mono font-bold text-sm text-gray-400">
                  {idx + 1}
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
              <p className="text-gray-400 leading-relaxed max-w-xs">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}



const FAQ = () => {
  const faqs = [
    { q: "How accurate is the calorie counting?", a: "We use Gemini 2.5 Flash grounded with Google Search to provide highly accurate estimates based on standard serving sizes and visual volume estimation." },
    { q: "Can I export my data?", a: "Yes, Pro users can export their entire nutritional history to CSV, PDF, or sync directly with Apple Health." },
    { q: "Is my data private?", a: "Absolutely. Your photos are processed securely and your personal health data is encrypted at rest in our Firestore vault." },
    { q: "Does it recognize international dishes?", a: "Yes! Our model is trained on a global dataset of cuisines, from Sushi to Tacos to Pad Thai." }
  ];

  return (
    <section id="faq" className="py-24 px-6 border-t border-white/5">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-12 text-center">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="border border-white/10 rounded-2xl bg-white/[0.02] overflow-hidden"
            >
              <div className="p-6">
                <h3 className="text-lg font-semibold text-white mb-2">{item.q}</h3>
                <p className="text-gray-400 leading-relaxed">{item.a}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

const BentoGrid = () => (
  <section className="py-24 px-6 relative" id="features">
    <div className="max-w-7xl mx-auto">
      <SectionHeading
        badge="Features"
        title="Intelligence for your diet."
        subtitle="Leveraging AI to provide real-time, grounded nutritional analysis from a single photo."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Large Card */}
        <motion.div
          whileHover={{ y: -5 }}
          className="md:col-span-2 glass-card rounded-3xl p-8 md:p-12 relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-100 transition-opacity duration-500">
            <Scan className="w-32 h-32 text-brand-cyan" />
          </div>
          <div className="relative z-10">
            <div className="w-12 h-12 bg-brand-cyan/10 rounded-xl flex items-center justify-center mb-6 text-brand-cyan">
              <Camera className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Instant Recognition</h3>
            <p className="text-gray-400 max-w-sm">
              Our advanced computer vision pipeline identifies thousands of food items instantly, from complex dishes to raw ingredients.
            </p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-brand-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </motion.div>

        {/* Tall Card */}
        <motion.div
          whileHover={{ y: -5 }}
          className="glass-card rounded-3xl p-8 relative overflow-hidden group md:row-span-2 flex flex-col justify-end"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-0" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl -mr-16 -mt-16" />

          <div className="relative z-10">
            <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center mb-6 text-brand-purple">
              <Database className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Historical Vault</h3>
            <p className="text-gray-400">
              Every scan is automatically synced to your private secure vault. Track your nutrition journey over time with persistent storage.
            </p>
          </div>
        </motion.div>

        {/* Small Card 1 */}
        <motion.div
          whileHover={{ y: -5 }}
          className="glass-card rounded-3xl p-8 group relative overflow-hidden"
        >
          <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-4 text-blue-400">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Grounded Search</h3>
          <p className="text-sm text-gray-400">Real-time web verification ensures your calorie counts are accurate.</p>
        </motion.div>

        {/* Small Card 2 */}
        <motion.div
          whileHover={{ y: -5 }}
          className="glass-card rounded-3xl p-8 group relative overflow-hidden"
        >
          <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center mb-4 text-green-400">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Private & Secure</h3>
          <p className="text-sm text-gray-400">Your data belongs to you. Export your nutritional logs anytime.</p>
        </motion.div>
      </div>
    </div>
  </section>
);

const MacroCard = ({
  icon: Icon,
  label,
  value,
  unit,
  colorClass,
  delay,
}: {
  icon: any;
  label: string;
  value: number;
  unit: string;
  colorClass: string;
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className="glass-card rounded-xl p-4 flex flex-col justify-between hover:bg-white/[0.05] transition-colors"
  >
    <div className="flex items-center justify-between mb-2">
      <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider">{label}</span>
      <Icon className={cn("w-4 h-4", colorClass)} />
    </div>
    <div className="flex items-end gap-1">
      <span className="text-2xl font-bold text-white">{value}</span>
      <span className="text-sm text-gray-500 mb-1 font-medium">{unit}</span>
    </div>
  </motion.div>
);

const DonutChart = ({ macros }: { macros: Macros }) => {
  const data = [
    { name: "Protein", value: macros.protein, color: "#818cf8" }, // Indigo
    { name: "Fat", value: macros.fat, color: "#f472b6" }, // Pink
    { name: "Carbs", value: macros.carbs, color: "#22d3ee" }, // Cyan
  ];

  return (
    <div className="relative h-64 w-full flex justify-center items-center">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={65}
            outerRadius={85}
            paddingAngle={5}
            dataKey="value"
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.color}
                style={{ filter: `drop-shadow(0px 0px 6px ${entry.color}40)` }}
              />
            ))}
          </Pie>
          <RechartsTooltip
            contentStyle={{
              backgroundColor: "#0B0C10",
              border: "1px solid #2C353F",
              borderRadius: "12px",
              color: "#fff",
            }}
            itemStyle={{ color: "#fff", fontSize: "12px", fontWeight: 500 }}
            cursor={false}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span className="text-4xl font-bold text-white tracking-tighter">{macros.calories}</span>
        <span className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold mt-1">
          Kcal
        </span>
      </div>
    </div>
  );
};

// --- Main Analyzer Component ---

const FoodAnalyzer = () => {
  const [file, setFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [searchText, setSearchText] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState("");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [history, setHistory] = useState<AnalysisResult[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [cameraActive, setCameraActive] = useState(false);

  // Real-time History Listener
const loadHistory = async () => {
  const { data, error } = await supabase
    .from("history")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(20);

  if (error) {
    console.error("Supabase Load Error:", error);
    return;
  }

  setHistory(
    data.map((item) => ({
      id: item.id,
      name: item.name,
      summary: item.summary,
      imageUrl: item.image_url,
      macros: {
        calories: item.calories,
        protein: item.protein,
        fat: item.fat,
        carbs: item.carbs,
      },
      timestamp: item.created_at,
    }))
  );
};

useEffect(() => {
  loadHistory();
}, []);



  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setResult(null);
      };
      reader.readAsDataURL(selected);
    }
  };

  const handleAnalyze = async () => {
    if (!file || !imagePreview) return;
    setLoading(true);
    setLoadingStep("Identifying food...");

    try {
      const base64Data = await fileToGenerativePart(file);

      // --- Step 1: Identify ---
      const identifyResponse = await ai.models.generateContent({
        model: MODEL_NAME,
        contents: {
          parts: [
            { inlineData: { mimeType: file.type, data: base64Data } },
            { text: "Identify the main food item in this image. Return ONLY the common name of the food." },
          ],
        },
      });

      const foodName =
  identifyResponse.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
  "Unknown food";


      setLoadingStep(`Analyzing ${foodName}...`);

      // --- Step 2: Grounded Analysis ---
      const prompt = `
        Research the nutritional value of "${foodName}" per standard serving.
        
        1. Write a 50-75 word engaging nutritional summary about it.
        2. Provide specific numerical values for Calories (kcal), Protein (g), Fat (g), and Carbs (g).
        
        Format the output as follows:
        [Summary Text]
        
        ---JSON---
        {
          "calories": number,
          "protein": number,
          "fat": number,
          "carbs": number
        }
      `;

      const analysisResponse = await ai.models.generateContent({
        model: MODEL_NAME,
        contents: prompt,
        config: {
          tools: [{ googleSearch: {} }],
        },
      });

      const fullText =
  analysisResponse.candidates?.[0]?.content?.parts?.[0]?.text || "";

      const groundingChunks =
        analysisResponse.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

      // Parse output
      const jsonSplit = fullText.split("---JSON---");
      let summary = fullText;
      let macros = { calories: 0, protein: 0, fat: 0, carbs: 0 };

      if (jsonSplit.length > 1) {
        summary = jsonSplit[0].trim();
        try {
          const jsonStr = jsonSplit[1].replace(/```json|```/g, "").trim();
          macros = JSON.parse(jsonStr);
        } catch (e) {
          console.error("JSON Parse Error", e);
          const calMatch = fullText.match(/Calories:?\s*(\d+)/i);
          if (calMatch) macros.calories = parseInt(calMatch[1]);
        }
      }

      const newAnalysis: AnalysisResult = {
        name: foodName,
        summary,
        macros,
        imageUrl: imagePreview,
        sources: groundingChunks
          .map((c: any) => c.web)
          .filter(Boolean),
      };

      setResult(newAnalysis);

      // --- Step 3: Persistence ---
      // Fallback for demo mode (add to local history state temporarily)
      // --- Step 3: Save to Supabase ---
      

const { error: saveError } = await supabase.from("history").insert({
  name: foodName,
  summary,
  image_url: imagePreview,
  calories: macros.calories,
  protein: macros.protein,
  fat: macros.fat,
  carbs: macros.carbs,
});

if (saveError) {
  console.error("Supabase Save Error:", saveError);
} else {
  await loadHistory(); // refresh only on success
}



    } catch (error) {
      console.error("Analysis Failed", error);
      alert("Something went wrong. Please check your API key or try again.");
    } finally {
      setLoading(false);
      setLoadingStep("");
    }
  };

  const startCamera = async () => {
    if (!navigator.mediaDevices?.getUserMedia) {
      alert("Camera not supported in this browser.");
      return;
    }

    try {
      const s = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      setStream(s);
      setCameraActive(true);
      if (videoRef.current) {
        videoRef.current.srcObject = s;
        await videoRef.current.play();
      }
    } catch (e) {
      console.error("Camera start failed", e);
      alert("Unable to access camera.");
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((t) => t.stop());
    }
    setStream(null);
    setCameraActive(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.srcObject = null;
    }
  };

  const captureFromCamera = async () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current || document.createElement('canvas');
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/jpeg');
    setImagePreview(dataUrl);
    // create a File object so analysis pipeline can work
    const blob = await (await fetch(dataUrl)).blob();
    const f = new File([blob], `capture-${Date.now()}.jpg`, { type: 'image/jpeg' });
    setFile(f);
    setResult(null);
    // stop camera after capture for UX
    stopCamera();
  };

  const handleTextAnalyze = async () => {
    if (!searchText || !searchText.trim()) return;
    setLoading(true);
    setLoadingStep("Analyzing text prompt...");

    try {
      const foodName = searchText.trim();
      const prompt = `Research the nutritional value of "${foodName}" per standard serving.\n\n1. Write a 50-75 word engaging nutritional summary about it.\n2. Provide specific numerical values for Calories (kcal), Protein (g), Fat (g), and Carbs (g).\n\nFormat the output as follows:\n[Summary Text]\n\n---JSON---\n{\n  "calories": number,\n  "protein": number,\n  "fat": number,\n  "carbs": number\n}\n`;

      const analysisResponse = await ai.models.generateContent({
        model: MODEL_NAME,
        contents: prompt,
        config: { tools: [{ googleSearch: {} }] },
      });

      const fullText = analysisResponse.candidates?.[0]?.content?.parts?.[0]?.text || "";
      const jsonSplit = fullText.split("---JSON---");
      let summary = fullText;
      let macros = { calories: 0, protein: 0, fat: 0, carbs: 0 };
      if (jsonSplit.length > 1) {
        summary = jsonSplit[0].trim();
        try {
          const jsonStr = jsonSplit[1].replace(/```json|```/g, "").trim();
          macros = JSON.parse(jsonStr);
        } catch (e) {
          console.error("JSON Parse Error", e);
        }
      }

      const newAnalysis: AnalysisResult = {
        name: foodName,
        summary,
        macros,
        imageUrl: undefined,
        sources: [],
      };

      setResult(newAnalysis);
    } catch (e) {
      console.error(e);
      alert("Text analysis failed. Check console for details.");
    } finally {
      setLoading(false);
      setLoadingStep("");
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto mb-32" id="demo">
      <AnimatePresence mode="wait">
        {!result ? (
          <motion.div
            key="upload"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="relative"
          >
            <div
              onClick={() => !loading && fileInputRef.current?.click()}
              className={cn(
                "group w-full min-h-[500px] border border-dashed rounded-[32px] flex flex-col items-center justify-center p-12 transition-all duration-500 cursor-pointer overflow-hidden relative backdrop-blur-sm",
                loading ? "border-brand-cyan/30 bg-black/40" : "border-white/10 hover:border-brand-cyan/30 bg-white/5 hover:bg-white/[0.07]"
              )}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                accept="image/*"
                className="hidden"
                disabled={loading}
              />

              {/* Top controls: Search bar and Camera */}
              <div onClick={(e) => e.stopPropagation()} className="w-full z-30 mb-6 flex flex-col md:flex-row items-center justify-center gap-4">
                <div className="w-full md:w-2/3">
                  <div className="flex items-center gap-2 bg-dark-900/50 border border-white/5 rounded-full px-4 py-2">
                    <input
                      value={searchText}
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) => setSearchText(e.target.value)}
                      placeholder="Search food by name or prompt (e.g. 'large apple')"
                      className="w-full bg-transparent outline-none text-gray-200 placeholder-gray-500 text-sm"
                      onKeyDown={(e) => { if (e.key === 'Enter') handleTextAnalyze(); }}
                    />
                    <button onClick={handleTextAnalyze} className="bg-brand-cyan text-black px-3 py-2 rounded-full text-sm font-semibold">Search</button>
                  </div>
                </div>

                <div className="flex gap-2">
                  {!cameraActive ? (
                    <button onClick={(e) => { e.stopPropagation(); startCamera(); }} className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-full">Open Camera</button>
                  ) : (
                    <div className="flex gap-2">
                      <button onClick={(e) => { e.stopPropagation(); captureFromCamera(); }} className="px-4 py-2 bg-brand-cyan text-black rounded-full">Capture</button>
                      <button onClick={(e) => { e.stopPropagation(); stopCamera(); }} className="px-4 py-2 bg-white/5 rounded-full">Close</button>
                    </div>
                  )}
                </div>
              </div>

              {/* Decorative Grid */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

              {loading ? (
                <div className="flex flex-col items-center gap-8 z-20">
                  <div className="relative w-24 h-24">
                    <div className="absolute inset-0 border-t-2 border-brand-cyan rounded-full animate-spin"></div>
                    <div className="absolute inset-2 border-r-2 border-brand-purple rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '2s' }}></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <BrainCircuit className="w-8 h-8 text-brand-cyan animate-pulse" />
                    </div>
                  </div>
                  <div className="text-center space-y-2">
                    <h3 className="text-2xl font-medium text-white tracking-tight">Processing Vision Data</h3>
                    <p className="text-brand-cyan font-mono text-sm animate-pulse">{loadingStep}</p>
                  </div>
                </div>
              ) : imagePreview ? (
                <div className="relative w-full h-full flex flex-col items-center z-20">
                  <div className="relative group/preview">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="max-h-[350px] rounded-2xl shadow-2xl mb-10 object-contain ring-1 ring-white/10"
                    />
                    <div className="absolute -inset-1 bg-gradient-to-r from-brand-cyan to-brand-purple opacity-20 blur-lg -z-10 group-hover/preview:opacity-40 transition-opacity" />
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAnalyze();
                    }}
                    className="bg-white text-black px-10 py-4 rounded-full font-bold shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] hover:scale-105 transition-all flex items-center gap-3 text-lg"
                  >
                    <Zap className="w-5 h-5 fill-current" />
                    Start Analysis
                  </button>
                </div>
              ) : (
                <div className="w-full z-20 flex flex-col items-center gap-6">
                  {cameraActive ? (
                    <div className="w-full flex flex-col items-center gap-4">
                      <video ref={videoRef} className="max-h-[360px] rounded-2xl shadow-2xl mb-4" playsInline autoPlay muted />
                      <canvas ref={canvasRef} className="hidden" />
                      <div className="flex gap-3">
                        <button onClick={(e) => { e.stopPropagation(); captureFromCamera(); }} className="bg-brand-cyan text-black px-6 py-3 rounded-full font-semibold">Capture</button>
                        <button onClick={(e) => { e.stopPropagation(); stopCamera(); }} className="bg-white/5 px-6 py-3 rounded-full">Close Camera</button>
                      </div>
                      <p className="text-sm text-gray-400 mt-2">Point your camera at the meal and click Capture.</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-10 text-center z-20">
                      <div className="w-28 h-28 rounded-[2rem] bg-gradient-to-tr from-white/5 to-transparent border border-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-2xl">
                        <Upload className="w-10 h-10 text-gray-500 group-hover:text-brand-cyan transition-colors" />
                      </div>
                      <div className="space-y-3 max-w-md">
                        <p className="text-3xl font-bold text-white tracking-tight">
                          Drop your meal here
                        </p>
                        <p className="text-gray-400 text-lg">
                          Our AI will identify the ingredients and calculate macros in seconds.
                        </p>
                      </div>
                      <div className="flex gap-4">
                        <span className="px-3 py-1 rounded-md bg-white/5 text-xs text-gray-500 border border-white/5">JPG</span>
                        <span className="px-3 py-1 rounded-md bg-white/5 text-xs text-gray-500 border border-white/5">PNG</span>
                        <span className="px-3 py-1 rounded-md bg-white/5 text-xs text-gray-500 border border-white/5">WEBP</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8"
          >
            {/* Left Column: Image & Text (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="relative rounded-[32px] overflow-hidden shadow-2xl border border-white/10 group h-[500px]">
                <img
                  src={result.imageUrl || imagePreview || ""}
                  alt={result.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050507] via-black/50 to-transparent p-10 flex flex-col justify-end">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h2 className="text-5xl font-bold text-white mb-4 tracking-tight">
                      {result.name}
                    </h2>
                    <div className="flex flex-wrap gap-3">
                      {result.sources?.slice(0, 3).map((s, i) => (
                        <a
                          key={i}
                          href={s.uri}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-2 text-xs font-medium bg-black/40 hover:bg-black/60 text-white backdrop-blur-md px-4 py-2 rounded-full transition-all border border-white/10 hover:border-brand-cyan/50"
                        >
                          <Search className="w-3 h-3 text-brand-cyan" />
                          {s.title}
                        </a>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>

              <div className="glass-card rounded-[32px] p-8 hover:bg-white/[0.04] transition-colors">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                  <div className="p-2 bg-brand-cyan/10 rounded-lg">
                    <Activity className="w-5 h-5 text-brand-cyan" />
                  </div>
                  Nutrition Analysis
                </h3>
                <p className="text-gray-300 leading-relaxed text-lg font-light">
                  {result.summary}
                </p>
              </div>
            </div>

            {/* Right Column: Stats (5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              {/* Chart Card */}
              <div className="glass-card rounded-[32px] p-8 flex flex-col items-center relative overflow-hidden h-[400px]">
                <div className="absolute top-0 right-0 w-48 h-48 bg-brand-cyan/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
                <div className="w-full flex justify-between items-center mb-4 relative z-10">
                  <h3 className="text-lg font-medium text-gray-300">
                    Macro Breakdown
                  </h3>
                  <Badge className="bg-white/5 text-gray-400">Per Serving</Badge>
                </div>

                <DonutChart macros={result.macros} />

                <div className="grid grid-cols-3 gap-2 w-full mt-4">
                  {[
                    { label: "Protein", val: result.macros.protein, color: "bg-indigo-400" },
                    { label: "Fat", val: result.macros.fat, color: "bg-pink-400" },
                    { label: "Carbs", val: result.macros.carbs, color: "bg-cyan-400" }
                  ].map((m, i) => (
                    <div key={i} className="text-center p-3 rounded-2xl bg-white/5 border border-white/5">
                      <div className={cn("w-2 h-2 rounded-full mx-auto mb-2", m.color)} />
                      <div className="text-[10px] text-gray-500 uppercase tracking-wider font-bold mb-1">{m.label}</div>
                      <div className="text-white font-bold text-lg">{m.val}g</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Macro Grid */}
              <div className="grid grid-cols-2 gap-4 flex-1">
                <MacroCard
                  icon={Flame}
                  label="Calories"
                  value={result.macros.calories}
                  unit="kcal"
                  colorClass="text-orange-500"
                  delay={0.1}
                />
                <button
                  onClick={() => {
                    setResult(null);
                    setFile(null);
                    setImagePreview(null);
                  }}
                  className="glass-card rounded-xl p-4 flex flex-col items-center justify-center gap-2 hover:bg-white/10 transition-colors group cursor-pointer border-dashed border-2 border-white/20 hover:border-brand-cyan/50"
                >
                  <div className="p-3 bg-white/5 rounded-full group-hover:bg-brand-cyan/20 transition-colors">
                    <Camera className="w-6 h-6 text-gray-400 group-hover:text-brand-cyan" />
                  </div>
                  <span className="text-sm font-medium text-gray-300">Scan Next</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* History Section */}
      <div className="mt-20 border-t border-white/5 pt-10">
        <div className="flex items-center justify-between mb-8 px-2">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <History className="w-5 h-5 text-gray-500" />
            Recent Scans
          </h3>
          <span className="text-xs text-gray-600 font-mono">LIVE SYNC</span>
        </div>

        {history.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
            {history.map((item, idx) => (
              <motion.div
                key={item.id || idx}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => setResult(item)}
                className="group p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.05] hover:border-white/10 cursor-pointer transition-all"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-brand-cyan/10 flex items-center justify-center text-brand-cyan font-bold text-xs">
                    {item.macros.calories}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{item.name}</p>
                    <p className="text-[10px] text-gray-500 truncate">
                     {item.timestamp ? new Date(item.timestamp).toLocaleString() : "Just now"}


                    </p>
                  </div>
                </div>
                <div className="flex justify-between text-[10px] text-gray-500 font-mono">
                  <span>P: {item.macros.protein}g</span>
                  <span>F: {item.macros.fat}g</span>
                  <span>C: {item.macros.carbs}g</span>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 text-gray-600 border border-dashed border-white/5 rounded-2xl">
            <p>No history yet. Scan your first meal!</p>
          </div>
        )}
      </div>
    </div>
  );
};

// --- Footer ---
const Footer = () => (
  <footer className="border-t border-white/5 bg-dark-900 pt-20 pb-10">
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
      <div className="col-span-2">
        <span className="text-2xl font-bold text-white tracking-tight mb-4 block">
          Orbyt<span className="text-brand-cyan">.food</span>
        </span>
        <p className="text-gray-500 max-w-sm mb-6">
          Pioneering the future of nutritional intelligence.
          We help you understand what you eat with military-grade precision.
        </p>
        <div className="flex gap-4">
          <div className="p-2 bg-white/5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer">
            <Twitter className="w-5 h-5" />
          </div>
          <div className="p-2 bg-white/5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer">
            <Github className="w-5 h-5" />
          </div>
        </div>
      </div>
      <div>
        <h4 className="text-white font-bold mb-4">Product</h4>
        <ul className="space-y-2 text-gray-500 text-sm">
          <li><a href="#" className="hover:text-brand-cyan transition-colors">Features</a></li>
          <li><a href="#" className="hover:text-brand-cyan transition-colors">Integration</a></li>
          <li><a href="#" className="hover:text-brand-cyan transition-colors">Changelog</a></li>
        </ul>
      </div>
      <div>
        <h4 className="text-white font-bold mb-4">Resources</h4>
        <ul className="space-y-2 text-gray-500 text-sm">
          <li><a href="#" className="hover:text-brand-cyan transition-colors">Documentation</a></li>
          <li><a href="#" className="hover:text-brand-cyan transition-colors">API Reference</a></li>
          <li><a href="#" className="hover:text-brand-cyan transition-colors">Community</a></li>
          <li><a href="#" className="hover:text-brand-cyan transition-colors">Support</a></li>
        </ul>
      </div>
    </div>
    <div className="text-center text-gray-600 text-sm border-t border-white/5 pt-8">
      © 2025 Orbyt Labs Inc. All rights reserved.
    </div>
  </footer>
);

// --- Main App Entry ---

function App() {
  return (
    <div className="min-h-screen font-sans selection:bg-brand-cyan/30 overflow-x-hidden bg-dark-950 text-gray-200">
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-[800px] bg-gradient-to-b from-dark-800/50 to-transparent opacity-40" />
        <div className="absolute -top-[20%] left-[20%] w-[600px] h-[600px] bg-brand-blue/10 rounded-full blur-[128px] animate-blob" />
        <div className="absolute top-[10%] right-[-10%] w-[500px] h-[500px] bg-brand-purple/10 rounded-full blur-[128px] animate-blob animation-delay-2000" />
      </div>

      <Navbar />

      <main className="relative z-10 w-full pt-32 px-6 flex flex-col items-center">
        {/* Hero Section */}
        <div className="text-center mb-24 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-brand-cyan text-xs font-bold mb-8 uppercase tracking-widest backdrop-blur-md shadow-lg shadow-brand-cyan/5 hover:bg-white/10 transition-colors cursor-default"
          >
            <Sparkles className="w-3 h-3" />
            <span>Now with Powerful AI</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-bold text-white mb-8 leading-tight tracking-tight"
          >
            Your diet, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan via-blue-400 to-brand-purple animate-gradient-x">
              decoded instantly.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed mb-12"
          >
            Transform any food photo into actionable nutritional data.
            Powered by next-gen AI for athletes, biohackers, and you.
          </motion.p>
        </div>

        {/* Core Application */}
        <FoodAnalyzer />

        {/* Social Proof */}
        <div className="w-full max-w-7xl border-y border-white/5 py-12 mb-20 overflow-hidden">
          <p className="text-center text-gray-500 text-sm font-medium mb-8 uppercase tracking-widest">Trusted by 10,000+ Biohackers</p>
          <div className="flex justify-between items-center opacity-40 grayscale hover:grayscale-0 transition-all duration-500 px-10 flex-wrap gap-8">
            <span className="text-2xl font-bold">Acme<span className="font-light">Fitness</span></span>
            <span className="text-2xl font-bold font-mono">PULSE</span>
            <span className="text-2xl font-bold italic">Vitality.ai</span>
            <span className="text-2xl font-extrabold tracking-tighter">OURA</span>
            <span className="text-2xl font-serif">Equinox</span>
          </div>
        </div>

        {/* How It Works */}
        <HowItWorks />

        {/* Feature Grid */}
        <BentoGrid />

       

        {/* FAQ */}
        <FAQ />

        {/* CTA Section */}
        <div className="w-full max-w-7xl mx-auto py-32 px-6">
          <div className="glass-panel rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-brand-cyan/10 to-brand-purple/10" />
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tight">Ready to optimize?</h2>
              <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
                Join thousands of users who have upgraded their nutritional awareness. Start for free today.
              </p>
              <button className="bg-white text-black px-12 py-4 rounded-full text-lg font-bold hover:scale-105 transition-transform shadow-2xl shadow-white/20">
                Get Started for Free
              </button>
            </div>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(<App />);
}