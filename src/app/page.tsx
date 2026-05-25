"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HeadphoneScroll from "@/components/HeadphoneScroll";
import { 
  Volume2, 
  Music, 
  Sparkles, 
  Cpu, 
  Shield, 
  Activity, 
  Eye, 
  Award, 
  Heart, 
  Zap, 
  ArrowUpRight,
  Sliders,
  Layers,
  Compass,
  Crosshair,
  Waves,
  Fingerprint,
  Battery,
  Check,
  VolumeX,
  Info
} from "lucide-react";

const partsData = [
  {
    index: 1,
    title: "Gr-5 Titanium Headband Fork",
    desc: "Precision-milled aerospace-grade titanium alloy framework. Engineered for maximum tensile resilience with zero permanent structural deformation.",
    stats: "Tolerance: ±0.01mm // Elastic Modulus: 125 GPa",
    img: "/Partforheadphone/1.jpeg",
    metricHighlight: "Driver Frame & Core Rigidity"
  },
  {
    index: 2,
    title: "Damped Swivel Alignment Pivot",
    desc: "Ultra-low-friction fluid damping hinge mechanism. Micro-calibrated tensioning maintains absolute seal angle without localized fatigue peaks.",
    stats: "Yield Strength: 980 MPa // Clamping Constant: 4.2N",
    img: "/Partforheadphone/2.jpeg",
    metricHighlight: "Ergonomics / Clamping Force"
  },
  {
    index: 3,
    title: "40mm Acoustic Diaphragm Shell",
    desc: "Rigid acoustic isolation chamber featuring a custom dome configuration. Dramatically limits internal harmonic reflections to secure high-frequency clarity.",
    stats: "Chamber Vol: 4.8cc // Harmonic Attenuation: -24dB",
    img: "/Partforheadphone/3.jpeg",
    metricHighlight: "THD (Distortion)"
  },
  {
    index: 4,
    title: "Slow-Recovery Memory Foam Seal",
    desc: "Slow-recovery multi-layer acoustical seal with a custom gold-threaded mesh profile. Perfectly conforms to facial topography.",
    stats: "Isolation Index: 98.4% // Clamping Force Relief: 12%",
    img: "/Partforheadphone/4.jpeg",
    metricHighlight: "ANC Attenuation & Comfort"
  },
  {
    index: 5,
    title: "Dual-Core Lossless Circuitry Board",
    desc: "Integrated high-speed microprocessing array decoding 24-bit lossless playback. Incorporates high-impedance direct-drive capabilities.",
    stats: "S/N Ratio: 122dB // DAC Sampling: 384kHz / 32-bit",
    img: "/Partforheadphone/5.jpeg",
    metricHighlight: "Lossless Wireless & Processing"
  },
  {
    index: 6,
    title: "Active ANC Mic Capsules Array",
    desc: "Ultra-sensitive MEMS capsule feedback arrays. Captures external sound pressure changes at 192,000 samples per second to feed the cancellation engine.",
    stats: "Sampling Rate: 192kHz // Transducer Sensitivity: -38dBV",
    img: "/Partforheadphone/6.jpeg",
    metricHighlight: "Active Noise Cancellation"
  },
  {
    index: 7,
    title: "Carbon Outer Earcup Shroud",
    desc: "Woven 3K carbon composite exterior shield. Protects internal acoustic chambers from secondary surface resonance.",
    stats: "Mass Density: 1.45 g/cm³ // High Rigidity Index: 94%",
    img: "/Partforheadphone/7.jpeg",
    metricHighlight: "Acoustic Isolation Shielding"
  },
  {
    index: 8,
    title: "Ultra-Fine Copper Voice Coil",
    desc: "Premium lightweight CCAW (Copper-Clad Aluminum Wire) coil assembly. Offers ultra-fast transient responses to trace complex audio waveforms.",
    stats: "Coil Impedance: 32 ohms // Dynamic Response: 2.8 microseconds",
    img: "/Partforheadphone/8.jpeg",
    metricHighlight: "Driver Transient Acceleration"
  },
  {
    index: 9,
    title: "Neodymium Base Magnet Motor",
    desc: "High-grade N52 neodymium motor assembly. Delivers unparalleled magnetic flux density for linear, non-distorting driver excursions.",
    stats: "Flux Density: 1.48 Tesla // Excursion Travel: ±4.5mm",
    img: "/Partforheadphone/9.jpeg",
    metricHighlight: "Bass Efficiency & THD Rating"
  }
];

const editionSpecs = {
  standard: {
    name: "Zenith X Standard",
    tagline: "High-Fidelity Daily Companion",
    price: 399,
    accentColor: "text-white/85",
    glowColor: "rgba(255,255,255,0.08)",
    themeGlow: "from-white/10 to-transparent",
    spotlightBg: "rgba(255, 255, 255, 0.03)",
    accentText: "text-white/80",
    accentBorder: "border-white/20",
    glowBorder: "hover:border-white/35",
    badgeBorder: "border-white/10",
    badgeGlow: "rgba(255, 255, 255, 0.04)",
    pulseClass: "animate-neon-pulse-silver",
    specs: {
      driver: "40mm Mylar Diaphragm",
      freq: "20Hz - 20kHz",
      thd: "< 0.05% @ 1kHz",
      anc: "Active Standard (-30dB)",
      lossless: "Compressed AAC/SBC",
      battery: "40 Hours",
      materials: "Space Gray Aluminum / Vegan Leather",
      thdVal: 0.05,
      ancVal: 30,
      batteryVal: 40,
    }
  },
  pro: {
    name: "Zenith X Reference Pro",
    tagline: "The Audiophile Standard",
    price: 499,
    accentColor: "text-blue-400",
    glowColor: "rgba(59,130,246,0.1)",
    themeGlow: "from-blue-500/10 to-transparent",
    spotlightBg: "rgba(59, 130, 246, 0.04)",
    accentText: "text-blue-400",
    accentBorder: "border-blue-500/30",
    glowBorder: "hover:border-blue-500/40",
    badgeBorder: "border-blue-500/10",
    badgeGlow: "rgba(59, 130, 246, 0.05)",
    pulseClass: "animate-neon-pulse-blue",
    specs: {
      driver: "40mm Titanium Composite",
      freq: "4Hz - 45kHz",
      thd: "< 0.008% @ 1kHz",
      anc: "Active Hybrid (-45dB)",
      lossless: "24-bit Lossless LDAC (990kbps)",
      battery: "60 Hours",
      materials: "Gr-5 Titanium / Technical Mesh",
      thdVal: 0.008,
      ancVal: 45,
      batteryVal: 60,
    }
  },
  executive: {
    name: "Zenith X Executive",
    tagline: "Uncompromised Bespoke Luxury",
    price: 599,
    accentColor: "text-amber-400",
    glowColor: "rgba(224,180,113,0.1)",
    themeGlow: "from-amber-500/10 to-transparent",
    spotlightBg: "rgba(224, 180, 113, 0.045)",
    accentText: "text-amber-400",
    accentBorder: "border-amber-500/30",
    glowBorder: "hover:border-amber-500/40",
    badgeBorder: "border-amber-500/10",
    badgeGlow: "rgba(224, 180, 113, 0.05)",
    pulseClass: "animate-neon-pulse-gold",
    specs: {
      driver: "40mm Beryllium Evaporated",
      freq: "4Hz - 45kHz",
      thd: "< 0.01% @ 1kHz",
      anc: "Adaptive Hybrid (-42dB)",
      lossless: "24-bit Lossless ALAC / aptX",
      battery: "50 Hours",
      materials: "Stainless Steel / Hand-Napa Leather",
      thdVal: 0.01,
      ancVal: 42,
      batteryVal: 50,
    }
  }
};

export default function Home() {
  // Engineering Telemetry States
  const [tolerance, setTolerance] = useState(0.02); // Tolerance slider: 0.01 - 0.05
  const [activeEngCard, setActiveEngCard] = useState<number | null>(null);
  const [engHovered, setEngHovered] = useState(false);
  const [engMousePos, setEngMousePos] = useState({ x: 0, y: 0 });
  const engContainerRef = useRef<HTMLDivElement>(null);
  
  // Acoustics Telemetry States
  const [frequency, setFrequency] = useState(1000); // Frequency slider: 20Hz - 45000Hz (Bass, Mids, Highs, Lossless)
  const [activeAcCard, setActiveAcCard] = useState<number | null>(null);
  const [acHovered, setAcHovered] = useState(false);
  const [acMousePos, setAcMousePos] = useState({ x: 0, y: 0 });
  const [acSpotlight, setAcSpotlight] = useState({ x: 0, y: 0 });
  const acContainerRef = useRef<HTMLDivElement>(null);

  // Derived acoustics telemetry based on active frequency band
  const getAcousticTelemetry = () => {
    if (frequency <= 100) {
      return {
        band: "SUB-BASS RESP.",
        thd: "0.012%",
        thdPct: 40,
        resonance: "14 Hz (DAMPED)",
        resonancePct: 25,
        pressure: "108 dB SPL",
        decoder: "PCM 16-BIT // 44.1kHz",
        waveSpeed: 0.04,
        waveHeight: 45,
        code: "CHAMBER-A // LOW-PASS"
      };
    } else if (frequency <= 1000) {
      return {
        band: "NATURAL MIDRANGE",
        thd: "0.004%",
        thdPct: 15,
        resonance: "1.2 kHz (NOMINAL)",
        resonancePct: 55,
        pressure: "98 dB SPL",
        decoder: "PCM 24-BIT // 96.0kHz",
        waveSpeed: 0.12,
        waveHeight: 30,
        code: "CHAMBER-B // BAND-PASS"
      };
    } else if (frequency <= 20000) {
      return {
        band: "HIGH FREQ RESOLUTION",
        thd: "0.002%",
        thdPct: 8,
        resonance: "18.5 kHz (NOMINAL)",
        resonancePct: 82,
        pressure: "95 dB SPL",
        decoder: "HD-LDAC // 990kbps",
        waveSpeed: 0.22,
        waveHeight: 18,
        code: "COIL-X.01 // HIGH-PASS"
      };
    } else {
      return {
        band: "ZENITH LOSSLESS",
        thd: "0.0008%",
        thdPct: 3,
        resonance: "42.8 kHz (COMPENSATED)",
        resonancePct: 98,
        pressure: "92 dB SPL",
        decoder: "ZEN-DSD // 2.8224MHz",
        waveSpeed: 0.38,
        waveHeight: 10,
        code: "DUAL-CORE // PASSIVE"
      };
    }
  };

  const acTelemetry = getAcousticTelemetry();

  const handleAcMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!acContainerRef.current) return;
    const rect = acContainerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setAcMousePos({ x, y });

    setAcSpotlight({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };
  
  // Design / Luxury Section States
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const [designHovered, setDesignHovered] = useState(false);
  const [designMousePos, setDesignMousePos] = useState({ x: 0, y: 0 });
  const designContainerRef = useRef<HTMLDivElement>(null);
  
  const [materialTab, setMaterialTab] = useState<"leather" | "mesh" | "compare">("leather");
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [activeDesignCard, setActiveDesignCard] = useState<number | null>(null);
  
  // Touch Gesture Swiper simulation
  const [touchHovered, setTouchHovered] = useState(false);
  const [gestureLogs, setGestureLogs] = useState<string[]>([
    "GESTURE SENSOR ACTIVE...",
    "AWAITING INPUT COMMAND..."
  ]);
  const [touchPulse, setTouchPulse] = useState(false);

  // Mouse Coordinate tracking for spotlights
  const [engSpotlight, setEngSpotlight] = useState({ x: 0, y: 0 });
  const [designSpotlight, setDesignSpotlight] = useState({ x: 0, y: 0 });

  // Specs & Pre-order Configurator States
  const [productEdition, setProductEdition] = useState<"standard" | "pro" | "executive">("standard");
  const [hoveredPartIndex, setHoveredPartIndex] = useState<number | null>(null);
  const [hoveredFreq, setHoveredFreq] = useState<{ hz: number; db: number }>({ hz: 1000, db: 0 });
  const [specsSpotlight, setSpecsSpotlight] = useState({ x: 0, y: 0 });
  const [specsHovered, setSpecsHovered] = useState(false);
  const specsContainerRef = useRef<HTMLDivElement>(null);

  // Handle slide/drag simulation on capacitive pad
  const triggerGesture = (type: "UP" | "DOWN" | "TAP" | "SWIPE_L" | "SWIPE_R") => {
    setTouchPulse(true);
    setTimeout(() => setTouchPulse(false), 500);

    let log = "";
    if (type === "UP") log = "[GESTURE] VOL_UP // ACQUIRED: +2.0 dB";
    else if (type === "DOWN") log = "[GESTURE] VOL_DOWN // ACQUIRED: -2.0 dB";
    else if (type === "TAP") log = "[GESTURE] ANC_TOGGLE // CYCLED ANC STATES";
    else log = "[GESTURE] TRACK_SKIP // INDEX FORWARD";

    setGestureLogs(prev => [log, ...prev.slice(0, 3)]);
  };

  const handleEngMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!engContainerRef.current) return;
    const rect = engContainerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setEngMousePos({ x, y });

    // Local card spotlight coords
    setEngSpotlight({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleDesignMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!designContainerRef.current) return;
    const rect = designContainerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setDesignMousePos({ x, y });

    setDesignSpotlight({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleSpecsMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!specsContainerRef.current) return;
    const rect = specsContainerRef.current.getBoundingClientRect();
    setSpecsSpotlight({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleGraphMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const hz = Math.round(4 + x * 44996);
    
    let db = 0;
    if (productEdition === "pro") {
      db = Math.sin(x * Math.PI * 4) * 0.4;
    } else if (productEdition === "standard") {
      if (x < 0.1) {
        db = -12 * (1 - x / 0.1);
      } else if (x > 0.85) {
        db = -15 * ((x - 0.85) / 0.15);
      } else {
        db = Math.sin((x - 0.1) / 0.75 * Math.PI * 2) * 1.2;
      }
    } else {
      db = 3.5 * Math.cos(x * Math.PI * 2) + Math.sin(x * Math.PI * 3) * 0.8;
    }
    
    setHoveredFreq({ hz, db: parseFloat(db.toFixed(1)) });
  };

  const getGraphYCoord = (db: number) => {
    const minDb = -15;
    const maxDb = 6;
    const minY = 150;
    const maxY = 30;
    const ratio = (db - minDb) / (maxDb - minDb);
    return minY - ratio * (minY - maxY);
  };

  const getThdWaveformPath = () => {
    const amp = productEdition === "pro" ? 1.5 : productEdition === "executive" ? 3 : 7;
    const freqCount = productEdition === "pro" ? 22 : productEdition === "executive" ? 14 : 8;
    
    let path = "M 0 40";
    for (let i = 0; i <= 200; i++) {
      const x = i;
      const y = 40 + Math.sin((i / 200) * Math.PI * freqCount) * amp;
      path += ` L ${x} ${y}`;
    }
    return path;
  };

  // Derived telemetry data based on active tolerance
  const getTelemetryData = () => {
    switch (tolerance) {
      case 0.01:
        return {
          tensile: "980 MPa",
          tensilePct: 98,
          modulus: "125 GPa",
          modulusPct: 84,
          variance: "±0.010 mm",
          clamping: "4.0 N",
          balance: "50% L / 50% R",
          code: "TITAN-X.V01 // ULTRA-MATCH"
        };
      case 0.03:
        return {
          tensile: "760 MPa",
          tensilePct: 76,
          modulus: "102 GPa",
          modulusPct: 66,
          variance: "±0.030 mm",
          clamping: "4.5 N",
          balance: "49.7% L / 50.3% R",
          code: "TITAN-X.V03 // ACCEPTABLE"
        };
      case 0.04:
        return {
          tensile: "640 MPa",
          tensilePct: 64,
          modulus: "90 GPa",
          modulusPct: 58,
          variance: "±0.040 mm",
          clamping: "4.8 N",
          balance: "49.2% L / 50.8% R",
          code: "TITAN-X.V04 // TOLERABLE"
        };
      case 0.05:
        return {
          tensile: "510 MPa",
          tensilePct: 51,
          modulus: "78 GPa",
          modulusPct: 46,
          variance: "±0.050 mm",
          clamping: "5.2 N",
          balance: "48.5% L / 51.5% R",
          code: "TITAN-X.V05 // HIGH-VARIANCE"
        };
      case 0.02:
      default:
        return {
          tensile: "880 MPa",
          tensilePct: 88,
          modulus: "110 GPa",
          modulusPct: 74,
          variance: "±0.020 mm",
          clamping: "4.2 N",
          balance: "49.9% L / 50.1% R",
          code: "TITAN-X.V02 // NOMINAL"
        };
    }
  };

  const telemetry = getTelemetryData();

  return (
    <div className="relative w-full bg-[#1c1a1d] min-h-screen text-white select-none">
      
      {/* Decorative Technical HUD - Left Side */}
      <aside className="fixed left-6 bottom-24 z-30 hidden xl:flex flex-col gap-6 text-[9px] uppercase tracking-[0.35em] text-white/30 font-semibold pointer-events-none">
        <div className="flex items-center gap-3 transform -rotate-90 origin-left translate-y-36">
          <span>MODEL // ZENITH-X.01</span>
          <span className="w-8 h-[1px] bg-white/20" />
          <span>EXPLODED VIEW ARCHITECTURE</span>
        </div>
      </aside>

      {/* Decorative Technical HUD - Right Side */}
      <aside className="fixed right-6 bottom-24 z-30 hidden xl:flex flex-col gap-6 text-[9px] uppercase tracking-[0.35em] text-white/30 font-semibold pointer-events-none items-end">
        <div className="flex items-center gap-3 transform rotate-90 origin-right -translate-y-36">
          <span>60H BATTERY</span>
          <span className="w-8 h-[1px] bg-white/20" />
          <span>LOSSLESS DUAL CORE AUDIO</span>
        </div>
      </aside>

      {/* Main Container */}
      <main className="w-full">
        {/* Sticky Hero Scrollytelling Canvas Section (Takes up 400vh scroll height) */}
        <HeadphoneScroll />

        {/* ========================================================================= */}
        {/* 1. ACOUSTICS SECTION */}
        {/* ========================================================================= */}
        <section 
          id="acoustics" 
          ref={acContainerRef}
          onMouseMove={handleAcMouseMove}
          onMouseEnter={() => setAcHovered(true)}
          onMouseLeave={() => {
            setAcHovered(false);
            setAcMousePos({ x: 0, y: 0 });
          }}
          className="scroll-mt-24 relative z-20 bg-[#1c1a1d] py-36 px-6 md:px-12 border-t border-white/5 overflow-hidden transition-all duration-700"
        >
          
          {/* Volumetric Studio spotlights */}
          <div className="absolute top-0 left-1/4 -translate-x-1/2 w-[500px] h-[500px] bg-blue-600/[0.035] rounded-full blur-[140px] pointer-events-none animate-pulse-light" />
          <div className="absolute bottom-0 right-1/4 translate-x-1/2 w-[600px] h-[600px] bg-purple-500/[0.025] rounded-full blur-[160px] pointer-events-none animate-[pulse_12s_infinite_ease-in-out]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,transparent_30%,#1c1a1d_85%)] pointer-events-none z-10" />

          {/* Dynamic Moving Tech Grid Background */}
          <div 
            className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.007)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.007)_1px,transparent_1px)] bg-[size:30px_30px] opacity-35 pointer-events-none animate-moving-grid" 
            style={{ willChange: "background-position" }}
          />

          {/* Micro-particle shimmers */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
            {[...Array(12)].map((_, i) => (
              <span 
                key={i}
                className="absolute w-1 h-1 bg-blue-400/25 rounded-full blur-[0.5px]"
                style={{
                  top: `${20 + (i * 6.5)}%`,
                  left: `${15 + (Math.sin(i) * 30 + 35)}%`,
                  animation: `shimmer-glow ${5 + (i % 4)}s ease-in-out infinite`,
                  animationDelay: `${i * 0.3}s`
                }}
              />
            ))}
          </div>

          <div className="max-w-7xl mx-auto flex flex-col items-center relative z-20">
            
            {/* Category Header */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[9px] font-bold tracking-[0.7em] uppercase text-blue-400 mb-6 bg-blue-500/5 px-6 py-2 rounded-full border border-blue-500/10 backdrop-blur-md"
            >
              ACOUSTICS ARCHITECTURE // CALIBRATION HUB
            </motion.div>
            
            {/* Headline Enhancement with Metallic Light Sweep */}
            <div className="w-full flex flex-col items-center md:items-start text-center md:text-left mb-20">
              <h2 className="text-4xl md:text-7xl font-black tracking-tightest leading-none py-4 uppercase">
                <span className="text-white block drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)]">The Architecture</span>
                <span className="relative inline-block text-transparent bg-clip-text bg-[linear-gradient(110deg,#3b82f6,35%,#a5f3fc,48%,#c084fc,52%,#7c3aed,65%,#3b82f6)] bg-[length:250%_100%] animate-light-sweep font-black drop-shadow-[0_0_25px_rgba(59,130,246,0.3)]">
                  of Sound.
                </span>
              </h2>
              <p className="text-sm md:text-base text-white/50 font-light max-w-2xl mt-6 leading-relaxed">
                Zenith X redefines how we listen. Every component is engineered to deliver zero acoustic distortion, floating spatial resonance, and deep, weightless audio reproduction.
              </p>
            </div>

            {/* MODULAR ACOUSTICS DASHBOARD GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 w-full items-stretch">
              
              {/* Left HUD Panel: Acoustic Calibration Control Panel (5 cols) */}
              <div 
                className="lg:col-span-5 glass-panel rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden shadow-2xl shadow-black/80 group border-white/10 hover:border-blue-500/20 transition-colors duration-500"
                style={{
                  background: `radial-gradient(400px circle at ${acSpotlight.x}px ${acSpotlight.y}px, rgba(59, 130, 246, 0.03), transparent 60%)`
                }}
              >
                <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-blue-500/20 via-blue-500 to-blue-500/20" />
                
                <div>
                  <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
                    <span className="text-[10px] font-mono tracking-widest text-white/40 flex items-center gap-2">
                      <Sliders className="w-3.5 h-3.5 text-blue-400" />
                      <span>HUD // ACOUSTIC.CALIBRATOR</span>
                    </span>
                    <span className="text-[8px] font-mono text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                      SPECTRUM LIVE
                    </span>
                  </div>

                  <h3 className="text-xl font-bold tracking-tight text-white mb-2">Frequency Band Tuning</h3>
                  <p className="text-xs text-white/50 leading-relaxed font-light mb-6">
                    Sweep the target response frequency across sub-bass, midranges, and high definitions to see how harmonic distortion and dampening recalculate.
                  </p>

                  {/* Interactive Calibration Slider */}
                  <div className="bg-black/35 border border-white/5 rounded-2xl p-5 mb-8">
                    <div className="flex justify-between items-center text-[10px] font-mono text-white/50 mb-3">
                      <span>TUNING PROFILE</span>
                      <span className="text-blue-400 font-extrabold text-sm">{acTelemetry.band}</span>
                    </div>
                    
                    <input 
                      type="range" 
                      min="20" 
                      max="45000" 
                      step="100" 
                      value={frequency}
                      onChange={(e) => setFrequency(parseInt(e.target.value))}
                      className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-blue-500 focus:outline-none mb-2"
                    />
                    
                    <div className="flex justify-between text-[7.5px] font-mono text-white/30 tracking-widest mt-1">
                      <span>20Hz (BASS)</span>
                      <span>1kHz (MID)</span>
                      <span>45kHz (ZENITH)</span>
                    </div>
                  </div>

                  {/* Live Progress Gauges */}
                  <div className="flex flex-col gap-4 border-t border-white/5 pt-6">
                    <div>
                      <div className="flex justify-between text-[9px] font-mono tracking-wider text-white/50 mb-1.5">
                        <span>TOTAL HARMONIC DISTORTION</span>
                        <span className="text-blue-400 font-bold">{acTelemetry.thd}</span>
                      </div>
                      <div className="h-1 bg-white/5 rounded-full overflow-hidden relative">
                        <motion.div 
                          animate={{ width: `${100 - acTelemetry.thdPct}%` }}
                          transition={{ duration: 0.5, ease: "easeOut" }}
                          className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-blue-600 to-cyan-400"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[9px] font-mono tracking-wider text-white/50 mb-1.5">
                        <span>ACOUSTIC RESONANCE RESPONSE</span>
                        <span className="text-purple-300 font-bold">{acTelemetry.resonance}</span>
                      </div>
                      <div className="h-1 bg-white/5 rounded-full overflow-hidden relative">
                        <motion.div 
                          animate={{ width: `${acTelemetry.resonancePct}%` }}
                          transition={{ duration: 0.5, ease: "easeOut" }}
                          className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-purple-500 to-pink-400"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Simulated Telemetry Board Logs */}
                <div className="mt-8 bg-black/40 border border-white/10 rounded-2xl p-4 font-mono text-[9.5px] text-white/35 flex flex-col gap-2 relative shadow-inner">
                  <div className="absolute inset-0 flex items-center justify-center opacity-[0.02]">
                    <Music className="w-20 h-20 text-white" />
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-1">
                    <span>RESONANCE CORE</span>
                    <span className="text-white font-semibold">{acTelemetry.code}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-1">
                    <span>DECODER RATE</span>
                    <span className="text-blue-400 font-semibold">{acTelemetry.decoder}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>MAX SOUND PRESSURE</span>
                    <span className="text-white font-semibold">{acTelemetry.pressure}</span>
                  </div>
                </div>
              </div>

              {/* Right HUD Panel: Exploded 3D Diaphragm Wireframe Card (7 cols) */}
              <div 
                className="lg:col-span-7 glass-panel rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden min-h-[500px] border-white/10 hover:border-blue-500/20 transition-colors duration-500 shadow-2xl"
                style={{
                  background: `radial-gradient(500px circle at ${acSpotlight.x}px ${acSpotlight.y}px, rgba(59, 130, 246, 0.025), transparent 60%)`
                }}
              >
                {/* Scanning neon laser effect */}
                <div className="absolute left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-blue-500 to-transparent blur-[1px] animate-scan-line pointer-events-none z-10" />
                <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-blue-500/20 via-blue-500 to-blue-500/20" />

                <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
                  <span className="text-[10px] font-mono tracking-widest text-white/40 flex items-center gap-2">
                    <Crosshair className="w-3.5 h-3.5 text-blue-400" />
                    <span>HOLOGRAPHIC // Exploded Acoustic Driver</span>
                  </span>
                  <span className="text-[8.5px] font-mono text-blue-400 uppercase tracking-wider">
                    {acHovered ? `COORDS: X ${(acMousePos.x * 10).toFixed(3)} // Y ${(acMousePos.y * 10).toFixed(3)}` : "ROTATION LOOP ACTIVE"}
                  </span>
                </div>

                {/* 3D Wireframe Render with cursor reactive perspective rotation */}
                <div className="flex-1 flex items-center justify-center relative min-h-[300px] group-hover:scale-105 transition-transform duration-700 select-none">
                  
                  {/* Backdrop glowing rings */}
                  <div className="absolute w-72 h-72 border border-white/[0.02] rounded-full animate-[spin_60s_linear_infinite]" />
                  <div className="absolute w-56 h-56 border border-dashed border-blue-500/[0.04] rounded-full animate-[spin_40s_linear_infinite_reverse]" />

                  {/* Reactive Vector SVG Assembly */}
                  <div 
                    className="w-[320px] h-[320px] flex items-center justify-center relative mix-blend-screen transition-all duration-300"
                    style={{ 
                      transform: `perspective(1000px) rotateX(${acHovered ? -acMousePos.y * 35 : 15}deg) rotateY(${acHovered ? acMousePos.x * 35 : -15}deg) rotateZ(0deg)`,
                      transformStyle: "preserve-3d"
                    }}
                  >
                    <svg 
                      className="w-full h-full text-blue-500/40 drop-shadow-[0_0_12px_rgba(59,130,246,0.15)]" 
                      viewBox="0 0 200 200" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="0.8"
                    >
                      {/* Exploded Dome Driver Geometries */}
                      {/* Front Protective Cover Mesh */}
                      <circle cx="100" cy="100" r="90" strokeDasharray="1 3" className="text-white/20" />
                      <circle cx="100" cy="100" r="82" />
                      
                      {/* Diaphragm Dome Outer Ring */}
                      <circle cx="100" cy="100" r="66" strokeWidth="0.4" strokeDasharray="3 3" />
                      
                      {/* Exploded 40mm Dome Diaphragm Core */}
                      <ellipse cx="100" cy="100" rx="54" ry="24" strokeWidth="1.2" className="text-blue-400" />
                      <ellipse cx="100" cy="100" rx="36" ry="16" strokeWidth="0.5" strokeDasharray="1 1" className="text-purple-400" />
                      
                      {/* Concentric Voice Coil Loop Cylinders */}
                      <ellipse cx="100" cy="100" rx="24" ry="10" strokeWidth="1.5" className="text-cyan-400/80" />
                      <ellipse cx="100" cy="100" rx="18" ry="7" strokeWidth="0.8" strokeDasharray="2 1" />
                      
                      {/* Neodymium Magnet cylinder base */}
                      <ellipse cx="100" cy="100" rx="12" ry="5" strokeWidth="2" className="text-blue-500/40" />

                      {/* Caliper Measuring Ticks Left */}
                      <line x1="20" y1="100" x2="40" y2="100" strokeWidth="0.3" strokeDasharray="2 1" />
                      <line x1="20" y1="97" x2="20" y2="103" strokeWidth="0.5" />
                      <line x1="40" y1="97" x2="40" y2="103" strokeWidth="0.5" />

                      {/* Grid Ticks */}
                      <line x1="100" y1="10" x2="100" y2="190" strokeWidth="0.2" strokeDasharray="1 5" className="text-white/30" />
                      <line x1="10" y1="100" x2="190" y2="100" strokeWidth="0.2" strokeDasharray="1 5" className="text-white/30" />
                    </svg>

                    {/* Floating HUD Indicator Labels */}
                    <div 
                      className="absolute left-6 top-16 bg-black/65 px-2.5 py-1 rounded border border-blue-500/20 font-mono text-[7px] text-white/60 backdrop-blur-sm pointer-events-none"
                      style={{ transform: "translateZ(30px)" }}
                    >
                      DRIVER ASSEMBLY // DOME-40
                    </div>

                    <div 
                      className="absolute right-6 bottom-16 bg-black/65 px-2.5 py-1 rounded border border-purple-500/20 font-mono text-[7px] text-white/60 backdrop-blur-sm pointer-events-none"
                      style={{ transform: "translateZ(40px)" }}
                    >
                      COIL FREQ RESPONSE: {frequency >= 1000 ? `${(frequency / 1000).toFixed(1)} kHz` : `${frequency} Hz`}
                    </div>
                  </div>
                </div>

                {/* Subtitle Indicator: Active dynamic multi-bar visualizer */}
                <div className="border-t border-white/5 pt-4 flex flex-col gap-3">
                  <div className="flex justify-between items-center text-[8.5px] font-mono text-white/40 leading-none">
                    <span>TUNING RESPONSIVE WAVEFORM FIELD</span>
                    <span className="text-blue-400 font-bold">STATUS: STABLE</span>
                  </div>
                  
                  {/* Dynamic waveform responding to active frequency band parameters */}
                  <div className="flex items-end justify-center gap-1.5 h-12 w-full bg-black/25 border border-white/5 rounded-xl p-3 relative overflow-hidden group shadow-inner">
                    {[...Array(15)].map((_, idx) => {
                      const baseHeight = 10 + Math.sin(idx * 0.45) * acTelemetry.waveHeight;
                      return (
                        <motion.span 
                          key={idx}
                          animate={{ 
                            height: [
                              `${baseHeight * 0.25}px`, 
                              `${baseHeight}px`, 
                              `${baseHeight * 0.25}px`
                            ] 
                          }}
                          transition={{
                            duration: 1 / (acTelemetry.waveSpeed * 10),
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: idx * 0.04
                          }}
                          className="w-1.5 bg-blue-500/30 rounded-full group-hover:bg-blue-400/80 transition-all duration-300"
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* FEATURES REDESIGN: Frosted glassmorphism panels (Staggered cascading layers) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mt-16 pb-12">
              
              {/* Card 1: Dual-Chamber Soundstage */}
              <div 
                onMouseEnter={() => setActiveAcCard(1)}
                onMouseLeave={() => setActiveAcCard(null)}
                className="p-8 glass-panel rounded-3xl transition-all duration-500 hover:-translate-y-2 flex flex-col h-85 justify-between relative overflow-hidden group shadow-2xl hover:shadow-[inset_0_0_20px_rgba(255,255,255,0.02),0_0_50px_rgba(59,130,246,0.1)]"
                style={{
                  background: activeAcCard === 1 ? `radial-gradient(300px circle at 50% 50%, rgba(59, 130, 246, 0.03), transparent 60%)` : ""
                }}
              >
                <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                
                <div>
                  <div className="p-3.5 bg-blue-500/5 rounded-2xl w-fit border border-blue-500/10 mb-6 group-hover:scale-105 transition-transform duration-300 relative">
                    <Music className="w-5 h-5 text-blue-400 group-hover:text-blue-300" />
                    <span className="absolute inset-0 bg-blue-400/20 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <h3 className="text-xl font-bold text-white tracking-tight">Dual-Chamber Soundstage</h3>
                  <p className="text-xs text-white/50 mt-3 leading-relaxed font-light">
                    Separates deep, acoustic lower frequencies from precise mid-highs, completely eliminating acoustic cross-reflection and resonance mud.
                  </p>
                </div>

                {/* Interactive soundwave concentric ring illustration */}
                <div className="h-16 flex items-center justify-start gap-4 border-t border-white/5 pt-4">
                  <div className="relative w-10 h-6 flex items-center justify-center">
                    <span className={`absolute w-8 h-4 rounded-full border border-blue-400/30 ${activeAcCard === 1 ? "animate-pulse" : ""}`} />
                    <span className={`absolute w-5 h-2.5 rounded-full border border-blue-400/60 ${activeAcCard === 1 ? "animate-ping" : ""}`} />
                  </div>
                  <span className="text-[8px] font-mono text-white/30 uppercase tracking-widest leading-none">
                    Chamber resonance: <br/>
                    <span className="text-blue-400 font-bold">{acTelemetry.resonance}</span>
                  </span>
                </div>
              </div>

              {/* Card 2: ANC (Staggered translate-y) */}
              <div 
                onMouseEnter={() => setActiveAcCard(2)}
                onMouseLeave={() => setActiveAcCard(null)}
                className="p-8 glass-panel rounded-3xl transition-all duration-500 hover:-translate-y-2 flex flex-col h-85 justify-between relative overflow-hidden group shadow-2xl hover:shadow-[inset_0_0_20px_rgba(255,255,255,0.02),0_0_50px_rgba(139,92,246,0.1)] md:translate-y-6"
                style={{
                  background: activeAcCard === 2 ? `radial-gradient(300px circle at 50% 50%, rgba(139, 92, 246, 0.03), transparent 60%)` : ""
                }}
              >
                <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                
                <div>
                  <div className="p-3.5 bg-purple-500/5 rounded-2xl w-fit border border-purple-500/10 mb-6 group-hover:scale-105 transition-transform duration-300 relative">
                    <Volume2 className="w-5 h-5 text-purple-400 group-hover:text-purple-300" />
                    <span className="absolute inset-0 bg-purple-400/20 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <h3 className="text-xl font-bold text-white tracking-tight">Adaptive Hybrid ANC</h3>
                  <p className="text-xs text-white/50 mt-3 leading-relaxed font-light">
                    A 4-microphone hybrid array measuring ambient noise 48,000 times per second to project anti-sound waves up to -45dB.
                  </p>
                </div>

                {/* Oscillating cancellation wave diagram */}
                <div className="h-16 flex items-center justify-start gap-4 border-t border-white/5 pt-4">
                  <div className="flex gap-0.5 items-center">
                    <span className={`w-0.5 bg-purple-400 h-2 rounded-full ${activeAcCard === 2 ? "animate-pulse" : ""}`} />
                    <span className="w-0.5 bg-purple-400 h-4 rounded-full" />
                    <span className={`w-0.5 bg-purple-400 h-1 rounded-full ${activeAcCard === 2 ? "animate-ping" : ""}`} />
                    <span className="w-0.5 bg-purple-400 h-4 rounded-full" />
                    <span className={`w-0.5 bg-purple-400 h-2 rounded-full ${activeAcCard === 2 ? "animate-pulse" : ""}`} />
                  </div>
                  <span className="text-[8px] font-mono text-white/30 uppercase tracking-widest leading-none">
                    Noise attenuation: <br/>
                    <span className="text-purple-400 font-bold">-45 dB SPL</span>
                  </span>
                </div>
              </div>

              {/* Card 3: Lossless Engine (Staggered translation) */}
              <div 
                onMouseEnter={() => setActiveAcCard(3)}
                onMouseLeave={() => setActiveAcCard(null)}
                className="p-8 glass-panel rounded-3xl transition-all duration-500 hover:-translate-y-2 flex flex-col h-85 justify-between relative overflow-hidden group shadow-2xl hover:shadow-[inset_0_0_20px_rgba(255,255,255,0.02),0_0_50px_rgba(6,182,212,0.1)] md:translate-y-12"
                style={{
                  background: activeAcCard === 3 ? `radial-gradient(300px circle at 50% 50%, rgba(6, 182, 212, 0.03), transparent 60%)` : ""
                }}
              >
                <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-cyan-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                
                <div>
                  <div className="p-3.5 bg-cyan-500/5 rounded-2xl w-fit border border-cyan-500/10 mb-6 group-hover:scale-105 transition-transform duration-300 relative">
                    <Sparkles className="w-5 h-5 text-cyan-400 group-hover:text-cyan-300" />
                    <span className="absolute inset-0 bg-cyan-400/20 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <h3 className="text-xl font-bold text-white tracking-tight">Lossless Audio Decoder</h3>
                  <p className="text-xs text-white/50 mt-3 leading-relaxed font-light">
                    Integrates a premium custom 24-bit DAC supporting full high-definition Bluetooth streaming for exact studio reproduction.
                  </p>
                </div>

                {/* Technical audio bits stream illustration */}
                <div className="h-16 flex items-center justify-start gap-4 border-t border-white/5 pt-4">
                  <div className="w-10 h-6 flex items-center justify-center font-mono text-[7px] text-cyan-400 leading-none">
                    {activeAcCard === 3 ? "10110101" : "24-BIT DAC"}
                  </div>
                  <span className="text-[8px] font-mono text-white/30 uppercase tracking-widest leading-none">
                    STREAM DECODER: <br/>
                    <span className="text-cyan-400 font-bold">{acTelemetry.decoder}</span>
                  </span>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. ENGINEERING SECTION (PRECISION MECHANICS OVERHAUL) */}
        {/* ========================================================================= */}
        <section 
          id="engineering" 
          ref={engContainerRef}
          onMouseMove={handleEngMouseMove}
          onMouseEnter={() => setEngHovered(true)}
          onMouseLeave={() => {
            setEngHovered(false);
            setEngMousePos({ x: 0, y: 0 });
          }}
          className="scroll-mt-24 relative z-20 bg-[#1c1a1d] py-36 px-6 md:px-12 border-t border-white/5 overflow-hidden transition-all duration-700"
        >
          
          {/* Volumetric Aerospace Pulse Spotlights */}
          <div className="absolute top-0 left-1/4 -translate-x-1/2 w-[500px] h-[500px] bg-orange-600/[0.03] rounded-full blur-[140px] pointer-events-none animate-pulse-light" />
          <div className="absolute bottom-0 right-1/4 translate-x-1/2 w-[600px] h-[600px] bg-blue-500/[0.025] rounded-full blur-[160px] pointer-events-none animate-[pulse_12s_infinite_ease-in-out]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,transparent_30%,#1c1a1d_85%)] pointer-events-none z-10" />

          {/* Dynamic Moving Tech Grid Background */}
          <div 
            className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.007)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.007)_1px,transparent_1px)] bg-[size:30px_30px] opacity-30 pointer-events-none animate-moving-grid" 
            style={{ willChange: "background-position" }}
          />

          {/* Micro-particle dust simulator */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
            {[...Array(12)].map((_, i) => (
              <span 
                key={i}
                className="absolute w-1 h-1 bg-orange-400/25 rounded-full blur-[0.5px]"
                style={{
                  top: `${15 + (i * 7.5)}%`,
                  left: `${10 + (Math.sin(i) * 35 + 40)}%`,
                  animation: `shimmer-glow ${6 + (i % 4)}s ease-in-out infinite`,
                  animationDelay: `${i * 0.4}s`
                }}
              />
            ))}
          </div>

          <div className="max-w-7xl mx-auto flex flex-col items-center relative z-20">
            
            {/* Category Header */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[9px] font-bold tracking-[0.7em] uppercase text-orange-400 mb-6 bg-orange-500/5 px-6 py-2 rounded-full border border-orange-500/10 backdrop-blur-md"
            >
              ENGINEERING SCHEMATICS // TELEMETRY HUB
            </motion.div>
            
            {/* Headline Enhancement with Metallic Light Sweep */}
            <div className="w-full flex flex-col items-center md:items-start text-center md:text-left mb-20">
              <h2 className="text-4xl md:text-7xl font-black tracking-tightest leading-none py-4 uppercase">
                <span className="text-white block drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)]">Precision</span>
                <span className="relative inline-block text-transparent bg-clip-text bg-[linear-gradient(110deg,#f97316,35%,#fed7aa,48%,#fca5a5,52%,#ea580c,65%,#f97316)] bg-[length:250%_100%] animate-light-sweep font-black drop-shadow-[0_0_25px_rgba(249,115,22,0.3)]">
                  Mechanics.
                </span>
              </h2>
              <p className="text-sm md:text-base text-white/50 font-light max-w-2xl mt-6 leading-relaxed">
                Zenith X represents a mechanical breakthrough. Designed with aerospace materials and built to microscopically small tolerances for absolute, lifetime structural integrity.
              </p>
            </div>

            {/* MODULAR ENGINEERING DASHBOARD GRID (Asymmetric Layering) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 w-full items-stretch">
              
              {/* Left HUD Panel: Telemetry Calibration Control Panel (5 cols) */}
              <div 
                className="lg:col-span-5 glass-panel rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden shadow-2xl shadow-black/80 group border-white/10 hover:border-orange-500/20 transition-colors duration-500"
                style={{
                  background: `radial-gradient(400px circle at ${engSpotlight.x}px ${engSpotlight.y}px, rgba(249, 115, 22, 0.03), transparent 60%)`
                }}
              >
                <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-orange-500/20 via-orange-500 to-orange-500/20" />
                
                <div>
                  <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
                    <span className="text-[10px] font-mono tracking-widest text-white/40 flex items-center gap-2">
                      <Sliders className="w-3.5 h-3.5 text-orange-400" />
                      <span>HUD // SYS.CALIBRATION</span>
                    </span>
                    <span className="text-[8px] font-mono text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded border border-orange-500/20">
                      LIVE DATA
                    </span>
                  </div>

                  <h3 className="text-xl font-bold tracking-tight text-white mb-2">Tolerance Calibration</h3>
                  <p className="text-xs text-white/50 leading-relaxed font-light mb-6">
                    Fine-tune the CNC milling tolerances of the structural pivots to see how clamping forces and tensile modulus re-calculate in real-time.
                  </p>

                  {/* Interactive Calibration Slider */}
                  <div className="bg-black/35 border border-white/5 rounded-2xl p-5 mb-8">
                    <div className="flex justify-between items-center text-[10px] font-mono text-white/50 mb-3">
                      <span>TOLERANCE TARGET</span>
                      <span className="text-orange-400 font-extrabold text-sm">{telemetry.variance}</span>
                    </div>
                    
                    <input 
                      type="range" 
                      min="0.01" 
                      max="0.05" 
                      step="0.01" 
                      value={tolerance}
                      onChange={(e) => setTolerance(parseFloat(e.target.value))}
                      className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-orange-500 focus:outline-none mb-2"
                    />
                    
                    <div className="flex justify-between text-[7.5px] font-mono text-white/30 tracking-widest mt-1">
                      <span>0.01mm (CNC+)</span>
                      <span>0.03mm (NOM)</span>
                      <span>0.05mm (MAX)</span>
                    </div>
                  </div>

                  {/* Live Progress Gauges */}
                  <div className="flex flex-col gap-4 border-t border-white/5 pt-6">
                    <div>
                      <div className="flex justify-between text-[9px] font-mono tracking-wider text-white/50 mb-1.5">
                        <span>TENSILE YIELD STRENGTH</span>
                        <span className="text-orange-400 font-bold">{telemetry.tensile} ({telemetry.tensilePct}%)</span>
                      </div>
                      <div className="h-1 bg-white/5 rounded-full overflow-hidden relative">
                        <motion.div 
                          initial={{ width: "88%" }}
                          animate={{ width: `${telemetry.tensilePct}%` }}
                          transition={{ duration: 0.5, ease: "easeOut" }}
                          className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-orange-600 to-amber-400"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[9px] font-mono tracking-wider text-white/50 mb-1.5">
                        <span>FLEXURAL ELASTIC MODULUS</span>
                        <span className="text-orange-300 font-bold">{telemetry.modulus} ({telemetry.modulusPct}%)</span>
                      </div>
                      <div className="h-1 bg-white/5 rounded-full overflow-hidden relative">
                        <motion.div 
                          initial={{ width: "74%" }}
                          animate={{ width: `${telemetry.modulusPct}%` }}
                          transition={{ duration: 0.5, ease: "easeOut" }}
                          className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-orange-400 to-yellow-300"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Simulated Telemetry Board Logs */}
                <div className="mt-8 bg-black/40 border border-white/10 rounded-2xl p-4 font-mono text-[9.5px] text-white/35 flex flex-col gap-2 relative shadow-inner">
                  <div className="absolute inset-0 flex items-center justify-center opacity-[0.02]">
                    <Cpu className="w-20 h-20 text-white" />
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-1">
                    <span>STRUCTURE CORE</span>
                    <span className="text-white font-semibold">{telemetry.code}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-1">
                    <span>CLAMPING FORCE</span>
                    <span className="text-orange-400 font-semibold">{telemetry.clamping} (NOMINAL)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>WEIGHT STABILITY</span>
                    <span className="text-white font-semibold">{telemetry.balance}</span>
                  </div>
                </div>
              </div>

              {/* Right HUD Panel: Exploded 3D Titanium Wireframe Card (7 cols) */}
              <div 
                className="lg:col-span-7 glass-panel rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden min-h-[500px] border-white/10 hover:border-blue-500/20 transition-colors duration-500 shadow-2xl"
                style={{
                  background: `radial-gradient(500px circle at ${engSpotlight.x}px ${engSpotlight.y}px, rgba(59, 130, 246, 0.025), transparent 60%)`
                }}
              >
                {/* Scanning neon laser effect */}
                <div className="absolute left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-orange-500 to-transparent blur-[1px] animate-scan-line pointer-events-none z-10" />
                <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-blue-500/20 via-blue-500 to-blue-500/20" />

                <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
                  <span className="text-[10px] font-mono tracking-widest text-white/40 flex items-center gap-2">
                    <Crosshair className="w-3.5 h-3.5 text-blue-400" />
                    <span>HOLOGRAPHIC // 3D EXPLODED STRUCT</span>
                  </span>
                  <span className="text-[8.5px] font-mono text-blue-400 uppercase tracking-wider">
                    {engHovered ? `COORDS: X ${(engMousePos.x * 10).toFixed(3)} // Y ${(engMousePos.y * 10).toFixed(3)}` : "ROTATION LOOP ACTIVE"}
                  </span>
                </div>

                {/* 3D Wireframe Render with cursor reactive perspective rotation */}
                <div className="flex-1 flex items-center justify-center relative min-h-[300px] group-hover:scale-105 transition-transform duration-700 select-none">
                  
                  {/* Backdrop glowing rings */}
                  <div className="absolute w-72 h-72 border border-white/[0.02] rounded-full animate-[spin_60s_linear_infinite]" />
                  <div className="absolute w-56 h-56 border border-dashed border-orange-500/[0.04] rounded-full animate-[spin_40s_linear_infinite_reverse]" />

                  {/* Reactive Vector SVG Assembly */}
                  <div 
                    className="w-[320px] h-[320px] flex items-center justify-center relative mix-blend-screen transition-all duration-300"
                    style={{ 
                      transform: `perspective(1000px) rotateX(${engHovered ? -engMousePos.y * 35 : 15}deg) rotateY(${engHovered ? engMousePos.x * 35 : -15}deg) rotateZ(0deg)`,
                      transformStyle: "preserve-3d"
                    }}
                  >
                    <svg 
                      className="w-full h-full text-orange-500/40 drop-shadow-[0_0_12px_rgba(249,115,22,0.15)]" 
                      viewBox="0 0 200 200" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="0.8"
                    >
                      {/* Exploded Headband Struts */}
                      <path d="M 40,60 C 40,25 160,25 160,60" strokeDasharray="2 2" className="text-white/20" />
                      <path d="M 45,58 C 45,28 155,28 155,58" />
                      
                      {/* Left Strut Joint Caliper Callouts */}
                      <circle cx="45" cy="58" r="3" fill="currentColor" className="text-orange-500 animate-ping" />
                      <line x1="45" y1="58" x2="20" y2="80" strokeWidth="0.4" strokeDasharray="1 1" className="text-white/40" />
                      
                      {/* Fork Frame Skeletal Disassembly */}
                      <path d="M 45,58 L 45,100 L 35,115" strokeWidth="1.2" />
                      <path d="M 48,58 L 48,98 L 38,113" strokeWidth="0.4" className="text-blue-400" />
                      
                      {/* Fork Frame Right */}
                      <path d="M 155,58 L 155,100 L 165,115" strokeWidth="1.2" />
                      <path d="M 152,58 L 152,98 L 162,113" strokeWidth="0.4" className="text-blue-400" />

                      {/* Caliper Measuring Ticks Left */}
                      <line x1="30" y1="100" x2="60" y2="100" strokeWidth="0.3" strokeDasharray="2 1" />
                      <line x1="30" y1="97" x2="30" y2="103" strokeWidth="0.5" />
                      <line x1="60" y1="97" x2="60" y2="103" strokeWidth="0.5" />

                      {/* Earcup Core Outline Swivel */}
                      <ellipse cx="35" cy="120" rx="14" ry="25" strokeDasharray="3 2" className="text-white/20" />
                      <ellipse cx="35" cy="120" rx="12" ry="22" className="text-orange-400/50" />
                      <ellipse cx="35" cy="120" rx="6" ry="12" strokeWidth="1.5" className="text-blue-400/40" />

                      {/* Earcup Core Right */}
                      <ellipse cx="165" cy="120" rx="14" ry="25" strokeDasharray="3 2" className="text-white/20" />
                      <ellipse cx="165" cy="120" rx="12" ry="22" className="text-orange-400/50" />
                      
                      {/* Grid Ticks */}
                      <line x1="100" y1="10" x2="100" y2="190" strokeWidth="0.2" strokeDasharray="1 5" className="text-white/30" />
                      <line x1="10" y1="100" x2="190" y2="100" strokeWidth="0.2" strokeDasharray="1 5" className="text-white/30" />
                    </svg>

                    {/* Floating HUD Indicator Labels */}
                    <div 
                      className="absolute left-6 top-16 bg-black/65 px-2.5 py-1 rounded border border-orange-500/20 font-mono text-[7px] text-white/60 backdrop-blur-sm pointer-events-none"
                      style={{ transform: "translateZ(30px)" }}
                    >
                      STRUT ASSEMBLY // TITAN-T02
                    </div>

                    <div 
                      className="absolute right-6 bottom-16 bg-black/65 px-2.5 py-1 rounded border border-blue-500/20 font-mono text-[7px] text-white/60 backdrop-blur-sm pointer-events-none"
                      style={{ transform: "translateZ(40px)" }}
                    >
                      CALIPER DELTA: {tolerance.toFixed(3)} mm
                    </div>
                  </div>
                </div>

                {/* Subtitle Indicator */}
                <div className="flex justify-between items-end mt-4 border-t border-white/5 pt-4 text-[8.5px] font-mono text-white/40">
                  <span>DEPLOYED SKELETON: GR-5 TI-CORE</span>
                  <span>ROTATIONAL AXIS AUTO-LOCKED</span>
                </div>
              </div>
            </div>

            {/* FEATURES REDESIGN: Frosted glassmorphism panels (Staggered cascading layers) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mt-16 pb-12">
              
              {/* Card 1: 0.02mm Calibration */}
              <div 
                onMouseEnter={() => setActiveEngCard(1)}
                onMouseLeave={() => setActiveEngCard(null)}
                className="p-8 glass-panel rounded-3xl transition-all duration-500 hover:-translate-y-2 flex flex-col h-85 justify-between relative overflow-hidden group shadow-2xl hover:shadow-[inset_0_0_20px_rgba(255,255,255,0.02),0_0_50px_rgba(249,115,22,0.1)]"
                style={{
                  background: activeEngCard === 1 ? `radial-gradient(300px circle at 50% 50%, rgba(249, 115, 22, 0.03), transparent 60%)` : ""
                }}
              >
                <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                
                <div>
                  <div className="p-3.5 bg-orange-500/5 rounded-2xl w-fit border border-orange-500/10 mb-6 group-hover:scale-105 transition-transform duration-300 relative">
                    <Cpu className="w-5 h-5 text-orange-400 group-hover:text-orange-300" />
                    <span className="absolute inset-0 bg-orange-400/20 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <h3 className="text-xl font-bold text-white tracking-tight">Micro-Calibration</h3>
                  <p className="text-xs text-white/50 mt-3 leading-relaxed font-light">
                    Components are milled to microscopic tolerances down to {tolerance}mm. Pivot hinges glide with zero kinetic friction for a custom fluid fit.
                  </p>
                </div>

                {/* Interactive spinning gear illustration */}
                <div className="h-16 flex items-center justify-start gap-4 border-t border-white/5 pt-4">
                  <svg 
                    className={`w-7 h-7 text-orange-400/40 ${activeEngCard === 1 ? "animate-[spin_4s_linear_infinite]" : "animate-[spin_10s_linear_infinite]"}`}
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="1.2"
                  >
                    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
                    <circle cx="12" cy="12" r="5" strokeDasharray="2 1" />
                  </svg>
                  <span className="text-[8px] font-mono text-white/30 uppercase tracking-widest leading-none">
                    Tolerance status: <br/>
                    <span className="text-orange-400 font-bold">{tolerance === 0.01 ? "OPTIMAL CNC+" : "SYSTEM NOMINAL"}</span>
                  </span>
                </div>
              </div>

              {/* Card 2: Clamping/Aerospace Core (Staggered translate-y) */}
              <div 
                onMouseEnter={() => setActiveEngCard(2)}
                onMouseLeave={() => setActiveEngCard(null)}
                className="p-8 glass-panel rounded-3xl transition-all duration-500 hover:-translate-y-2 flex flex-col h-85 justify-between relative overflow-hidden group shadow-2xl hover:shadow-[inset_0_0_20px_rgba(255,255,255,0.02),0_0_50px_rgba(251,191,36,0.1)] md:translate-y-6"
                style={{
                  background: activeEngCard === 2 ? `radial-gradient(300px circle at 50% 50%, rgba(251, 191, 36, 0.03), transparent 60%)` : ""
                }}
              >
                <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-amber-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                
                <div>
                  <div className="p-3.5 bg-amber-500/5 rounded-2xl w-fit border border-amber-500/10 mb-6 group-hover:scale-105 transition-transform duration-300 relative">
                    <Shield className="w-5 h-5 text-amber-400 group-hover:text-amber-300" />
                    <span className="absolute inset-0 bg-amber-400/20 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <h3 className="text-xl font-bold text-white tracking-tight">Aerospace Skeleton</h3>
                  <p className="text-xs text-white/50 mt-3 leading-relaxed font-light">
                    Molded from dual-layer sandblasted high-tensile steel wrapped around structural carbon polymer cores to guarantee absolute lifelong rigidity.
                  </p>
                </div>

                {/* Stress Heatmap Mini Indicator */}
                <div className="h-16 flex items-center justify-start gap-4 border-t border-white/5 pt-4">
                  <div className="flex gap-1 h-6 items-end">
                    <span className="w-1 bg-green-500 h-2 rounded-full" />
                    <span className="w-1 bg-green-500 h-3 rounded-full" />
                    <span className="w-1 bg-yellow-500 h-4 rounded-full" style={{ animation: activeEngCard === 2 ? "pulse 1s infinite" : "" }} />
                    <span className="w-1 bg-orange-500 h-5 rounded-full" />
                    <span className="w-1 bg-red-500 h-2 rounded-full" />
                  </div>
                  <span className="text-[8px] font-mono text-white/30 uppercase tracking-widest leading-none">
                    stress distribution: <br/>
                    <span className="text-amber-400 font-bold">100% UNIFORM</span>
                  </span>
                </div>
              </div>

              {/* Card 3: Tension Dampeners (Staggered translation) */}
              <div 
                onMouseEnter={() => setActiveEngCard(3)}
                onMouseLeave={() => setActiveEngCard(null)}
                className="p-8 glass-panel rounded-3xl transition-all duration-500 hover:-translate-y-2 flex flex-col h-85 justify-between relative overflow-hidden group shadow-2xl hover:shadow-[inset_0_0_20px_rgba(255,255,255,0.02),0_0_50px_rgba(234,179,8,0.1)] md:translate-y-12"
                style={{
                  background: activeEngCard === 3 ? `radial-gradient(300px circle at 50% 50%, rgba(234, 179, 8, 0.03), transparent 60%)` : ""
                }}
              >
                <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-yellow-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                
                <div>
                  <div className="p-3.5 bg-yellow-500/5 rounded-2xl w-fit border border-yellow-500/10 mb-6 group-hover:scale-105 transition-transform duration-300 relative">
                    <Activity className="w-5 h-5 text-yellow-400 group-hover:text-yellow-300" />
                    <span className="absolute inset-0 bg-yellow-400/20 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <h3 className="text-xl font-bold text-white tracking-tight">Active Suspension</h3>
                  <p className="text-xs text-white/50 mt-3 leading-relaxed font-light">
                    Silicon-damped micro-spring assemblies buffer side expansions, automatically adapting clamping forces to match any head contour.
                  </p>
                </div>

                {/* Dampening Waveform Pulse */}
                <div className="h-16 flex items-center justify-start gap-4 border-t border-white/5 pt-4">
                  <div className="w-10 h-6 flex items-center justify-center relative">
                    <span className={`absolute h-[1.5px] w-full bg-yellow-400/30 ${activeEngCard === 3 ? "animate-pulse" : ""}`} />
                    <span className={`absolute h-[1.5px] w-6 bg-yellow-400 ${activeEngCard === 3 ? "animate-ping" : ""}`} />
                  </div>
                  <span className="text-[8px] font-mono text-white/30 uppercase tracking-widest leading-none">
                    DAMPING FACTOR: <br/>
                    <span className="text-yellow-400 font-bold">4.2 N NOMINAL</span>
                  </span>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. DESIGN SECTION (FUNCTIONAL LUXURY SHOWROOM REDESIGN) */}
        {/* ========================================================================= */}
        <section 
          id="design" 
          ref={designContainerRef}
          onMouseMove={handleDesignMouseMove}
          onMouseEnter={() => setDesignHovered(true)}
          onMouseLeave={() => {
            setDesignHovered(false);
            setDesignMousePos({ x: 0, y: 0 });
          }}
          className="scroll-mt-24 relative z-20 bg-[#141215] py-36 px-6 md:px-12 border-t border-white/5 overflow-hidden transition-all duration-700"
        >
          
          {/* Volumetric Spotlights - Champagne Gold */}
          <div className="absolute top-0 right-1/4 w-[450px] h-[450px] bg-amber-500/[0.018] rounded-full blur-[130px] pointer-events-none animate-pulse-light" />
          <div className="absolute bottom-1/4 left-1/4 w-[550px] h-[550px] bg-neutral-800/[0.03] rounded-full blur-[150px] pointer-events-none animate-[pulse_10s_infinite_ease-in-out]" />
          
          {/* Subtle noise texture overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff02_1px,transparent_1px)] bg-[size:20px_20px] opacity-40 pointer-events-none" />

          <div className="max-w-7xl mx-auto flex flex-col items-center relative z-20">
            
            {/* Category Header */}
            <motion.span 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[9px] font-bold tracking-[0.7em] uppercase text-amber-300 mb-6 bg-amber-500/5 px-6 py-2 rounded-full border border-amber-500/10 backdrop-blur-md"
            >
              AESTHETICS LABS // CRAFTSMANSHIP
            </motion.span>
            
            {/* Cinematic Golden Heading */}
            <div className="w-full flex flex-col items-center md:items-end md:text-right text-center mb-20">
              <h2 className="text-4xl md:text-7xl font-black tracking-tightest leading-none py-4 uppercase">
                <span className="text-white block drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)]">Functional</span>
                <span className="relative inline-block text-transparent bg-clip-text bg-[linear-gradient(110deg,#ffffff,35%,#f5e3c3,48%,#e0b471,52%,#cca055,65%,#ffffff)] bg-[length:250%_100%] animate-light-sweep font-black drop-shadow-[0_0_20px_rgba(224,180,113,0.2)]">
                  Luxury.
                </span>
              </h2>
              <p className="text-sm md:text-base text-white/50 font-light max-w-2xl mt-6 leading-relaxed">
                Zenith X is designed to be worn effortlessly. A gorgeous silhouette sculpted from premium materials that adapts comfortably to you.
              </p>
            </div>

            {/* DYNAMIC EDITORIAL SHOWCASE (Asymmetrical Grid) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 w-full items-stretch mb-16">
              
              {/* Left Column: Interactive 3D Exploded-View and Hotspot Map (7 cols) */}
              <div 
                className="lg:col-span-7 glass-panel rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden min-h-[500px] border-white/10 hover:border-amber-500/20 transition-colors duration-500 shadow-2xl"
                style={{
                  background: `radial-gradient(550px circle at ${designSpotlight.x}px ${designSpotlight.y}px, rgba(224, 180, 113, 0.02), transparent 60%)`
                }}
              >
                <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-amber-500/10 via-amber-500/30 to-amber-500/10" />

                <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
                  <span className="text-[10px] font-mono tracking-widest text-white/40 flex items-center gap-2">
                    <Compass className="w-3.5 h-3.5 text-amber-300" />
                    <span>EXPLODED PARTS // HOTSPOT MAP</span>
                  </span>
                  <span className="text-[8.5px] font-mono text-amber-300 uppercase tracking-wider">
                    {activeHotspot ? `HOTSPOT: ${activeHotspot.toUpperCase()}` : "HOVER DEVICE PARTS"}
                  </span>
                </div>

                {/* Exploded diagram area */}
                <div className="flex-1 flex items-center justify-center relative min-h-[320px] group select-none">
                  
                  {/* Floating idle headphone model (using high-fidelity SVGs) */}
                  <motion.div 
                    className="w-[280px] h-[280px] flex items-center justify-center relative"
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    style={{ 
                      transform: `perspective(1000px) rotateX(${designHovered ? -designMousePos.y * 25 : 10}deg) rotateY(${designHovered ? designMousePos.x * 25 : 5}deg)`,
                      transformStyle: "preserve-3d"
                    }}
                  >
                    {/* High-fidelity custom headphone assembly */}
                    <svg className="w-full h-full text-white/80" viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="0.8">
                      {/* Suspended canopy headband */}
                      <motion.path 
                        d="M 40,65 C 40,25 160,25 160,65" 
                        strokeWidth="1.2"
                        animate={{ y: designHovered ? -12 : 0 }}
                        className="text-amber-200/50"
                      />
                      <motion.path 
                        d="M 45,65 C 45,30 155,30 155,65" 
                        strokeWidth="0.5" 
                        strokeDasharray="2 2"
                        animate={{ y: designHovered ? -8 : 0 }}
                      />

                      {/* Headband adjustment fork (left assembly) */}
                      <motion.path 
                        d="M 45,65 L 45,95" 
                        strokeWidth="1.5"
                        animate={{ x: designHovered ? -6 : 0, y: designHovered ? -4 : 0 }}
                      />
                      
                      {/* Headband adjustment fork (right assembly) */}
                      <motion.path 
                        d="M 155,65 L 155,95" 
                        strokeWidth="1.5"
                        animate={{ x: designHovered ? 6 : 0, y: designHovered ? -4 : 0 }}
                      />

                      {/* Exploded Earcup Outer Casing (Left) */}
                      <motion.ellipse 
                        cx="42" 
                        cy="115" 
                        rx="14" 
                        ry="26" 
                        strokeWidth="1.2"
                        className="text-amber-100/60"
                        animate={{ x: designHovered ? -15 : 0 }}
                      />

                      {/* Exploded Earcup Cushion Seals (Left) */}
                      <motion.ellipse 
                        cx="47" 
                        cy="115" 
                        rx="10" 
                        ry="22" 
                        strokeWidth="0.6"
                        className="text-white/40"
                        animate={{ x: designHovered ? -25 : 0 }}
                      />

                      {/* Exploded Earcup Outer Casing (Right) */}
                      <motion.ellipse 
                        cx="158" 
                        cy="115" 
                        rx="14" 
                        ry="26" 
                        strokeWidth="1.2"
                        className="text-amber-100/60"
                        animate={{ x: designHovered ? 15 : 0 }}
                      />

                      {/* Exploded Earcup Cushion Seals (Right) */}
                      <motion.ellipse 
                        cx="153" 
                        cy="115" 
                        rx="10" 
                        ry="22" 
                        strokeWidth="0.6"
                        className="text-white/40"
                        animate={{ x: designHovered ? 25 : 0 }}
                      />
                    </svg>

                    {/* Hotspot 1: Headband Mesh Canopy */}
                    <div 
                      onMouseEnter={() => setActiveHotspot("headband")}
                      onMouseLeave={() => setActiveHotspot(null)}
                      className={`absolute top-4 left-1/2 -translate-x-1/2 w-6 h-6 flex items-center justify-center cursor-pointer z-30 transition-transform ${activeHotspot === "headband" ? "scale-125" : ""}`}
                    >
                      <span className="absolute w-4 h-4 bg-amber-400/20 rounded-full animate-ping" />
                      <span className="w-2 h-2 bg-amber-300 rounded-full border border-white" />
                    </div>

                    {/* Hotspot 2: Swivel alignment hinge (Right fork joint) */}
                    <div 
                      onMouseEnter={() => setActiveHotspot("hinge")}
                      onMouseLeave={() => setActiveHotspot(null)}
                      className={`absolute top-24 right-9 w-6 h-6 flex items-center justify-center cursor-pointer z-30 transition-transform ${activeHotspot === "hinge" ? "scale-125" : ""}`}
                    >
                      <span className="absolute w-4 h-4 bg-amber-400/20 rounded-full animate-ping" />
                      <span className="w-2 h-2 bg-amber-300 rounded-full border border-white" />
                    </div>

                    {/* Hotspot 3: Cushion seal (Left foam area) */}
                    <div 
                      onMouseEnter={() => setActiveHotspot("cushion")}
                      onMouseLeave={() => setActiveHotspot(null)}
                      className={`absolute bottom-16 left-9 w-6 h-6 flex items-center justify-center cursor-pointer z-30 transition-transform ${activeHotspot === "cushion" ? "scale-125" : ""}`}
                    >
                      <span className="absolute w-4 h-4 bg-amber-400/20 rounded-full animate-ping" />
                      <span className="w-2 h-2 bg-amber-300 rounded-full border border-white" />
                    </div>
                  </motion.div>

                  {/* High-end floating glassmorphic tooltip card for active hotspot */}
                  <AnimatePresence>
                    {activeHotspot && (
                      <motion.div 
                        initial={{ opacity: 0, y: 15, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-black/75 border border-amber-500/20 backdrop-blur-xl z-30 shadow-2xl flex items-center gap-4"
                      >
                        <div className="p-2.5 bg-amber-500/10 rounded-xl border border-amber-500/20 h-fit">
                          {activeHotspot === "headband" && <Layers className="w-4 h-4 text-amber-300" />}
                          {activeHotspot === "hinge" && <Compass className="w-4 h-4 text-amber-300" />}
                          {activeHotspot === "cushion" && <Heart className="w-4 h-4 text-amber-300" />}
                        </div>
                        <div>
                          <h4 className="text-[10px] font-mono font-bold tracking-widest text-amber-300 uppercase leading-none mb-1">
                            {activeHotspot === "headband" && "SUSPENDED MESH CANOPY"}
                            {activeHotspot === "hinge" && "FRICTIONLESS SWIVEL JOINT"}
                            {activeHotspot === "cushion" && "SLOW-RECOVERY MEMORY SEAL"}
                          </h4>
                          <p className="text-[10.5px] text-white/70 leading-relaxed font-light">
                            {activeHotspot === "headband" && "Breathable double-woven mesh canopy distributes weight and entirely eliminates headband crown hotspots."}
                            {activeHotspot === "hinge" && "Micro-milled dual axis capsule hinge glides to follow the skull contour for perfect, uniform clamping."}
                            {activeHotspot === "cushion" && "Acoustic-grade slow recovery memory foam wrapped in protein leather provides extreme noise isolation."}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="flex justify-between items-end border-t border-white/5 pt-4 text-[8.5px] font-mono text-white/40">
                  <span>DISASSEMBLY MECHANICS ACTIVE</span>
                  <span>HOVER CARD TO BLEND LAYERS</span>
                </div>
              </div>

              {/* Right Column: Dynamic Material Swatch Selector & Pressure heat map (5 cols) */}
              <div 
                className="lg:col-span-5 glass-panel rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden shadow-2xl border-white/10 hover:border-amber-500/20 transition-colors duration-500"
                style={{
                  background: `radial-gradient(400px circle at ${designSpotlight.x}px ${designSpotlight.y}px, rgba(224, 180, 113, 0.02), transparent 60%)`
                }}
              >
                <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-amber-500/10 via-amber-500/30 to-amber-500/10" />

                <div>
                  <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
                    <span className="text-[10px] font-mono tracking-widest text-white/40 flex items-center gap-2">
                      <Layers className="w-3.5 h-3.5 text-amber-300" />
                      <span>HUD // MATERIAL ANALYSIS</span>
                    </span>
                    <button 
                      onClick={() => setShowHeatmap(!showHeatmap)}
                      className={`text-[8.5px] font-mono px-3 py-1 rounded-full border transition-all ${showHeatmap ? "bg-amber-400 text-black border-amber-400 font-bold" : "text-white/50 border-white/10 hover:bg-white/5"}`}
                    >
                      {showHeatmap ? "HEATMAP: ON" : "TOGGLE HEATMAP"}
                    </button>
                  </div>

                  {/* Material Switch Tabs */}
                  <div className="flex gap-2 p-1 bg-black/40 border border-white/5 rounded-full mb-6">
                    <button 
                      onClick={() => { setMaterialTab("leather"); setShowHeatmap(false); }}
                      className={`flex-1 text-[9px] font-bold py-2 rounded-full transition-all ${materialTab === "leather" ? "bg-white/10 text-white" : "text-white/40 hover:text-white"}`}
                    >
                      LEATHER
                    </button>
                    <button 
                      onClick={() => { setMaterialTab("mesh"); setShowHeatmap(false); }}
                      className={`flex-1 text-[9px] font-bold py-2 rounded-full transition-all ${materialTab === "mesh" ? "bg-white/10 text-white" : "text-white/40 hover:text-white"}`}
                    >
                      MESH
                    </button>
                    <button 
                      onClick={() => { setMaterialTab("compare"); setShowHeatmap(false); }}
                      className={`flex-1 text-[9px] font-bold py-2 rounded-full transition-all ${materialTab === "compare" ? "bg-white/10 text-white" : "text-white/40 hover:text-white"}`}
                    >
                      COMPARISON
                    </button>
                  </div>

                  {/* Dynamic Material Display Panel */}
                  <div className="min-h-[220px]">
                    <AnimatePresence mode="wait">
                      {showHeatmap ? (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="flex flex-col gap-4 text-left"
                        >
                          <h4 className="text-xs font-bold text-amber-300">Ergonomic Pressure Relief Map</h4>
                          <p className="text-[11px] text-white/50 leading-relaxed font-light">
                            Visualizes headband clamping pressure distribution. Blue zones indicate zero pressure points, completely eliminating long-listening ear and crown strain.
                          </p>
                          {/* Mini heatmap graphic */}
                          <div className="h-20 bg-gradient-to-r from-blue-600 via-cyan-500/80 to-blue-600 rounded-xl relative overflow-hidden flex items-center justify-center shadow-inner border border-white/5">
                            <span className="absolute left-1/4 w-8 h-8 rounded-full bg-cyan-400 blur-xl animate-pulse" />
                            <span className="absolute right-1/4 w-8 h-8 rounded-full bg-cyan-400 blur-xl animate-pulse" />
                            <span className="text-[9px] font-mono text-black font-extrabold uppercase bg-white/70 px-3 py-1 rounded border border-white/30 backdrop-blur-md">
                              PRESSURE MAX: 4.2 N (EXCELLENT)
                            </span>
                          </div>
                        </motion.div>
                      ) : materialTab === "leather" ? (
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex flex-col gap-4 text-left"
                        >
                          <h4 className="text-xs font-bold text-white">Hypoallergenic Protein Leather</h4>
                          <p className="text-[11px] text-white/50 leading-relaxed font-light">
                            Wraps around the acoustic memory foam cups. Soft-touch hypoallergenic leather is double-sewn with fine stitching to create a hermetic audio chamber seal.
                          </p>
                          {/* Simulated SVG Close-Up Leather Texture swatch */}
                          <div className="h-20 bg-neutral-900 border border-white/5 rounded-xl overflow-hidden relative group/swatch cursor-pointer">
                            <svg className="w-full h-full opacity-35" viewBox="0 0 100 40">
                              <filter id="leather-noise">
                                <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" result="noise" />
                                <feColorMatrix type="matrix" values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.15 0" />
                              </filter>
                              <rect width="100%" height="100%" filter="url(#leather-noise)" />
                              <path d="M0,20 Q25,25 50,20 T100,20" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
                              <path d="M0,10 Q25,12 50,10 T100,10" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
                              <path d="M0,30 Q25,28 50,30 T100,30" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
                            </svg>
                            <span className="absolute inset-0 flex items-center justify-center text-[8px] font-mono text-white/40 uppercase group-hover/swatch:text-amber-300 transition-colors bg-black/20">
                              [ HOVER FOR MICRO-DETAIL CLOSE-UP ]
                            </span>
                          </div>
                        </motion.div>
                      ) : materialTab === "mesh" ? (
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex flex-col gap-4 text-left"
                        >
                          <h4 className="text-xs font-bold text-white">Breathable Suspended Mesh Canopy</h4>
                          <p className="text-[11px] text-white/50 leading-relaxed font-light">
                            Woven mesh canopy utilizes technical stretch fibers that naturally flex and conform to standard head shapes, promoting heat release for sweat-free comfort.
                          </p>
                          {/* Simulated SVG Mesh pattern swatch */}
                          <div className="h-20 bg-neutral-900 border border-white/5 rounded-xl overflow-hidden relative cursor-pointer">
                            <svg className="w-full h-full opacity-20" viewBox="0 0 100 40">
                              <pattern id="mesh-grid" width="4" height="4" patternUnits="userSpaceOnUse">
                                <path d="M 4 0 L 0 0 0 4" fill="none" stroke="white" strokeWidth="0.4" />
                              </pattern>
                              <rect width="100%" height="100%" fill="url(#mesh-grid)" />
                            </svg>
                            <span className="absolute inset-0 flex items-center justify-center text-[8px] font-mono text-white/40 uppercase bg-black/20">
                              MESH CANOPY SWATCH SPECIMEN
                            </span>
                          </div>
                        </motion.div>
                      ) : (
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex flex-col gap-3 font-mono text-[9px] text-white/40 pt-2"
                        >
                          <div className="flex justify-between border-b border-white/5 pb-2">
                            <span>OUTER SKIN</span>
                            <span className="text-white font-bold">HYPOALLERGENIC LEATHER</span>
                          </div>
                          <div className="flex justify-between border-b border-white/5 pb-2">
                            <span>EAR CUP MEMORY</span>
                            <span className="text-white font-bold">SLOW-RECOVERY FOAM</span>
                          </div>
                          <div className="flex justify-between border-b border-white/5 pb-2">
                            <span>SUSPENSION BAND</span>
                            <span className="text-white font-bold">BREATHABLE MESH CANOPY</span>
                          </div>
                          <div className="flex justify-between border-b border-white/5 pb-2">
                            <span>SURFACE SKIN</span>
                            <span className="text-amber-300 font-bold">GRAPHITE // TITANIUM FINISH</span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Subtitle Indicator */}
                <div className="flex justify-between items-end mt-4 border-t border-white/5 pt-4 text-[8.5px] font-mono text-white/40">
                  <span>SWATCH CODE // MAT.SKIN-03</span>
                  <span>ANALYTICS ONLINE</span>
                </div>
              </div>
            </div>

            {/* DYNAMIC CAPACITIVE GESTURE TOUCHPAD DEMO WIDGET */}
            <div 
              onMouseEnter={() => setTouchHovered(true)}
              onMouseLeave={() => setTouchHovered(false)}
              className="w-full max-w-4xl glass-panel rounded-3xl p-8 backdrop-blur-md relative overflow-hidden flex flex-col md:flex-row gap-8 items-center border-white/10 hover:border-amber-500/20 transition-colors shadow-2xl mb-16"
            >
              <div className="flex-1 flex flex-col items-start gap-4 text-left">
                <span className="text-[9px] font-bold tracking-widest text-amber-300 uppercase flex items-center gap-2">
                  <Fingerprint className="w-3.5 h-3.5" />
                  <span>GESTURE FIELD INTERACTIVE TESTING</span>
                </span>
                <h3 className="text-xl font-bold tracking-tight text-white">Capacitive Touch Demonstration</h3>
                <p className="text-xs text-white/50 leading-relaxed font-light">
                  Interact with the mock capacitive touch cup below. Move your cursor and tap/click the buttons to simulate earcup gestures and monitor the diagnostic boot log outputs.
                </p>

                {/* Control simulation logs */}
                <div className="w-full font-mono text-[9px] bg-black/55 border border-white/5 rounded-xl p-4 text-white/40 h-28 overflow-y-auto no-scrollbar flex flex-col gap-1.5 shadow-inner">
                  {gestureLogs.map((log, index) => (
                    <div key={index} className={`border-b border-white/[0.03] pb-1 ${index === 0 ? "text-amber-300" : ""}`}>
                      &gt; {log}
                    </div>
                  ))}
                </div>
              </div>

              {/* Capacitive touchpad circles */}
              <div className="w-full md:w-[320px] h-48 bg-black/40 border border-white/10 rounded-2xl flex flex-col items-center justify-center p-6 relative overflow-hidden group shadow-2xl cursor-pointer">
                {/* Ripple ring indicators */}
                <div className={`absolute w-36 h-36 border border-dashed rounded-full transition-all duration-700 ${touchHovered ? "border-amber-500/25 scale-105" : "border-white/5"}`} />
                <div className={`absolute w-24 h-24 border rounded-full transition-all duration-500 ${touchHovered ? "border-amber-500/15 scale-105" : "border-white/5"}`} />
                
                {/* Dynamic concentric pulse when gesture fires */}
                <AnimatePresence>
                  {touchPulse && (
                    <motion.div 
                      initial={{ scale: 0.8, opacity: 0.9 }}
                      animate={{ scale: 1.6, opacity: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="absolute w-20 h-20 rounded-full border-2 border-amber-400 pointer-events-none z-10"
                    />
                  )}
                </AnimatePresence>

                {/* Hotspot Swipe Grid */}
                <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-1 z-20 text-[7px] font-mono text-white/10">
                  
                  {/* UP SWIPE */}
                  <div 
                    onClick={() => triggerGesture("UP")}
                    className="col-start-2 row-start-1 flex items-center justify-center hover:bg-amber-400/10 hover:text-amber-300 rounded cursor-pointer transition-colors"
                  >
                    ▲ VOL_UP
                  </div>

                  {/* DOWN SWIPE */}
                  <div 
                    onClick={() => triggerGesture("DOWN")}
                    className="col-start-2 row-start-3 flex items-center justify-center hover:bg-amber-400/10 hover:text-amber-300 rounded cursor-pointer transition-colors"
                  >
                    ▼ VOL_DOWN
                  </div>

                  {/* TAP CENTER */}
                  <div 
                    onClick={() => triggerGesture("TAP")}
                    className="col-start-2 row-start-2 flex items-center justify-center hover:bg-amber-400/10 hover:text-amber-300 rounded-full border border-white/5 cursor-pointer transition-all bg-black/40 text-[8px] font-bold"
                  >
                    [TAP]
                  </div>

                  {/* PREV/LEFT */}
                  <div 
                    onClick={() => triggerGesture("SWIPE_L")}
                    className="col-start-1 row-start-2 flex items-center justify-center hover:bg-amber-400/10 hover:text-amber-300 rounded cursor-pointer transition-colors"
                  >
                    ◀ PREV
                  </div>

                  {/* NEXT/RIGHT */}
                  <div 
                    onClick={() => triggerGesture("SWIPE_R")}
                    className="col-start-3 row-start-2 flex items-center justify-center hover:bg-amber-400/10 hover:text-amber-300 rounded cursor-pointer transition-colors"
                  >
                    NEXT ▶
                  </div>
                </div>

                <div className="text-[7.5px] font-mono text-white/20 uppercase tracking-widest absolute bottom-3">
                  TAP SECTIONS TO EMULATE
                </div>
              </div>
            </div>

            {/* BRAND IMAGES & PHOTO STUDY PANELS (Asymmetrical Lifestyle spotlight) */}
            <div className="w-full max-w-4xl bg-white/[0.02] border border-white/5 rounded-3xl p-8 backdrop-blur-md relative overflow-hidden flex flex-col lg:flex-row gap-8 items-center group shadow-2xl">
              <div className="flex-1 flex flex-col items-start gap-4 text-left">
                <span className="text-[9px] font-bold tracking-widest text-amber-300 uppercase">CRAFTSMANSHIP STUDIES</span>
                <h3 className="text-xl font-bold tracking-tight text-white">Hypoallergenic Comfort Cushions</h3>
                <p className="text-xs text-white/50 leading-relaxed font-light">
                  Earcups are lined with hyper-responsive slow-recovery memory foam wrapped in premium, hypoallergenic protein leather. This seals acoustic pressure around your head while distributing heat away from your ears for hours of fatigue-free listening.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 w-full mt-4 font-mono text-[9px] text-white/40 border-t border-white/5 pt-4">
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span>OUTER SKIN</span>
                    <span className="text-white font-bold">VEGAN LEATHER</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span>EAR CUP MEMORY</span>
                    <span className="text-white font-bold">SLOW-RECOVERY</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span>SUSPENSION BAND</span>
                    <span className="text-white font-bold">LEATHER MESH</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span>CLAY FINISH</span>
                    <span className="text-amber-300 font-bold">MATTE CHARCOAL</span>
                  </div>
                </div>
              </div>
              
              {/* Product Photo Showcase */}
              <div className="w-full lg:w-[360px] h-64 overflow-hidden rounded-2xl border border-white/10 shadow-2xl relative group-hover:border-amber-500/20 transition-all duration-500">
                <img 
                  src="/Photos/frame3.jpeg" 
                  alt="Zenith X Earcup Cushion Design"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 pointer-events-none"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                <span className="absolute bottom-3 left-4 font-mono text-[8px] tracking-widest text-amber-300 bg-black/55 px-2.5 py-1 rounded border border-white/5 backdrop-blur-sm">
                  CUSHION SPECIMEN // X.03
                </span>
              </div>
            </div>

            {/* SLEEK FROSTED GLASS FEATURE CARDS: (Bottom Redesign) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 w-full pb-12">
              
              {/* Card 1: Ergonomics */}
              <div 
                onMouseEnter={() => setActiveDesignCard(1)}
                onMouseLeave={() => setActiveDesignCard(null)}
                className="p-8 glass-panel rounded-3xl transition-all duration-500 hover:-translate-y-2 flex flex-col h-80 justify-between relative overflow-hidden group shadow-2xl border-white/10 hover:border-amber-500/25"
                style={{
                  background: activeDesignCard === 1 ? `radial-gradient(300px circle at 50% 50%, rgba(224, 180, 113, 0.025), transparent 60%)` : ""
                }}
              >
                <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-amber-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                
                <div>
                  <div className="p-3.5 bg-amber-500/5 rounded-2xl w-fit border border-amber-500/10 mb-6 group-hover:scale-105 transition-transform duration-300 relative">
                    <Eye className="w-5 h-5 text-amber-400 group-hover:text-amber-300" />
                    <span className="absolute inset-0 bg-amber-400/20 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <h3 className="text-xl font-bold text-white tracking-tight">Sculpted Contour</h3>
                  <p className="text-xs text-white/50 mt-3 leading-relaxed font-light">
                    Meticulously designed curvature that follows the natural geometry of the skull, maintaining stable isolation without high side clamping force.
                  </p>
                </div>
                <span className="text-[9px] font-mono tracking-widest text-amber-400/40 uppercase group-hover:text-amber-400/80 transition-colors duration-300">
                  DESIGN // ERGONOMICS
                </span>
              </div>

              {/* Card 2: Controls */}
              <div 
                onMouseEnter={() => setActiveDesignCard(2)}
                onMouseLeave={() => setActiveDesignCard(null)}
                className="p-8 glass-panel rounded-3xl transition-all duration-500 hover:-translate-y-2 flex flex-col h-80 justify-between relative overflow-hidden group shadow-2xl border-white/10 hover:border-amber-500/25"
                style={{
                  background: activeDesignCard === 2 ? `radial-gradient(300px circle at 50% 50%, rgba(224, 180, 113, 0.025), transparent 60%)` : ""
                }}
              >
                <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-amber-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                
                <div>
                  <div className="p-3.5 bg-amber-500/5 rounded-2xl w-fit border border-amber-500/10 mb-6 group-hover:scale-105 transition-transform duration-300 relative">
                    <Sparkles className="w-5 h-5 text-amber-400 group-hover:text-amber-300" />
                    <span className="absolute inset-0 bg-amber-400/20 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <h3 className="text-xl font-bold text-white tracking-tight">Capacitive Touch</h3>
                  <p className="text-xs text-white/50 mt-3 leading-relaxed font-light">
                    Outer metallic surfaces feature responsive touch-sensitive elements. Swipe to skip tracks, tap to toggle ANC, and trace circles to dial the volume.
                  </p>
                </div>
                <span className="text-[9px] font-mono tracking-widest text-amber-400/40 uppercase group-hover:text-amber-400/80 transition-colors duration-300">
                  CONTROLS // CAPACITIVE
                </span>
              </div>

              {/* Card 3: Sustainability */}
              <div 
                onMouseEnter={() => setActiveDesignCard(3)}
                onMouseLeave={() => setActiveDesignCard(null)}
                className="p-8 glass-panel rounded-3xl transition-all duration-500 hover:-translate-y-2 flex flex-col h-80 justify-between relative overflow-hidden group shadow-2xl border-white/10 hover:border-amber-500/25"
                style={{
                  background: activeDesignCard === 3 ? `radial-gradient(300px circle at 50% 50%, rgba(224, 180, 113, 0.025), transparent 60%)` : ""
                }}
              >
                <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-amber-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                
                <div>
                  <div className="p-3.5 bg-amber-500/5 rounded-2xl w-fit border border-amber-500/10 mb-6 group-hover:scale-105 transition-transform duration-300 relative">
                    <Shield className="w-5 h-5 text-amber-400 group-hover:text-amber-300" />
                    <span className="absolute inset-0 bg-amber-400/20 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <h3 className="text-xl font-bold text-white tracking-tight">Conflict-Free Origin</h3>
                  <p className="text-xs text-white/50 mt-3 leading-relaxed font-light">
                    Crafted with 85% recycled aluminum and 100% sustainably sourced vegan leather. Fully certified conflict-free minerals inside all core circuitry.
                  </p>
                </div>
                <span className="text-[9px] font-mono tracking-widest text-amber-400/40 uppercase group-hover:text-amber-400/80 transition-colors duration-300">
                  SUSTAINABILITY // COMPLIANCE
                </span>
              </div>

            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. SPECS & PRE-ORDER SECTION */}
        {/* ========================================================================= */}
        <section 
          id="specs" 
          ref={specsContainerRef}
          onMouseMove={handleSpecsMouseMove}
          onMouseEnter={() => setSpecsHovered(true)}
          onMouseLeave={() => {
            setSpecsHovered(false);
            setHoveredFreq({ hz: 1000, db: 0 });
          }}
          className="scroll-mt-24 relative z-20 bg-[#1c1a1d] py-32 px-6 md:px-12 border-t border-white/5 overflow-hidden"
        >
          {/* Ambient Volumetric Spotlight representing Selected Variant */}
          <div 
            className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full blur-[160px] opacity-25 pointer-events-none transition-all duration-1000 ease-in-out"
            style={{
              background: productEdition === "pro" 
                ? "radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, transparent 70%)" 
                : productEdition === "executive"
                ? "radial-gradient(circle, rgba(224, 180, 113, 0.35) 0%, transparent 70%)"
                : "radial-gradient(circle, rgba(255, 255, 255, 0.25) 0%, transparent 70%)"
            }}
          />
          
          {/* Subtle drift grid overlay */}
          <div className="absolute inset-0 opacity-[0.015] pointer-events-none animate-moving-grid" 
            style={{
              backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.15) 1.5px, transparent 1.5px)`,
              backgroundSize: '24px 24px'
            }}
          />

          <div className="max-w-7xl mx-auto flex flex-col items-center relative z-10">
            
            {/* Category Header */}
            <span className={`text-[10px] font-mono tracking-[0.4em] uppercase mb-4 px-4 py-1.5 rounded-full border bg-white/[0.02] transition-colors duration-500 ${
              productEdition === "pro" ? "border-blue-500/20 text-blue-400" :
              productEdition === "executive" ? "border-amber-500/20 text-amber-400" :
              "border-white/10 text-white/50"
            }`}>
              SYSTEMS DIAGNOSTICS // COMPARATOR
            </span>
            
            {/* Section Title */}
            <h2 className="text-4xl md:text-7xl font-extrabold text-center tracking-tightest leading-none max-w-4xl py-3 select-none uppercase">
              <span className="text-white">MICRO-CALIBRATED </span>
              <span className={`transition-all duration-1000 bg-clip-text text-transparent bg-gradient-to-r ${
                productEdition === "pro" ? "from-blue-400 to-indigo-500" :
                productEdition === "executive" ? "from-amber-300 via-amber-400 to-amber-600" :
                "from-white via-white/80 to-white/40"
              }`}>
                SPECS
              </span>
            </h2>
            
            <p className="text-sm md:text-base text-white/40 font-light text-center max-w-xl mt-6 leading-relaxed">
              Analyze the precise tolerances, driver responses, and mechanical configurations across our custom telemetry suites.
            </p>

            {/* Global Variant Selection HUD */}
            <div className="flex justify-center gap-3 md:gap-4 mt-10 p-1.5 glass-panel rounded-full border border-white/5 max-w-xl w-full">
              {(["standard", "pro", "executive"] as const).map((edition) => (
                <button
                  key={edition}
                  onClick={() => setProductEdition(edition)}
                  className={`flex-1 py-2.5 px-4 md:px-6 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-500 cursor-pointer ${
                    productEdition === edition
                      ? edition === "pro"
                        ? "bg-blue-500 text-white shadow-lg shadow-blue-500/20"
                        : edition === "executive"
                        ? "bg-amber-500 text-white shadow-lg shadow-amber-500/20"
                        : "bg-white text-black shadow-lg"
                      : "text-white/40 hover:text-white/80 hover:bg-white/[0.02]"
                  }`}
                >
                  {edition === "pro" ? "Reference Pro" : edition === "executive" ? "Executive" : "Standard"}
                </button>
              ))}
            </div>

            {/* Asymmetric Telemetry Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full mt-16 items-start">
              
              {/* Left Column: Carousel & Swatch Info (lg:col-span-7) */}
              <div className="lg:col-span-7 flex flex-col gap-6 w-full">
                
                {/* Hardware Carousel Container */}
                <div className="glass-panel p-6 rounded-3xl border border-white/5 relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[9px] font-mono tracking-[0.2em] text-white/30 uppercase">
                      [EXPLODED SWATCHES CAROUSEL]
                    </span>
                    <span className="text-[9px] font-mono tracking-widest text-white/30">
                      01 // 09 COMPONENTS
                    </span>
                  </div>

                  {/* Horizontal Image Carousel */}
                  <div className="flex gap-4 overflow-x-auto pb-4 pt-2 no-scrollbar scroll-smooth snap-x">
                    {partsData.map((part) => (
                      <div
                        key={part.index}
                        onMouseEnter={() => setHoveredPartIndex(part.index)}
                        onMouseLeave={() => setHoveredPartIndex(null)}
                        className={`flex-shrink-0 w-28 h-28 rounded-2xl relative overflow-hidden border transition-all duration-300 cursor-pointer snap-start group ${
                          hoveredPartIndex === part.index
                            ? productEdition === "pro"
                              ? "border-blue-500 ring-2 ring-blue-500/20 scale-105"
                              : productEdition === "executive"
                              ? "border-amber-500 ring-2 ring-amber-500/20 scale-105"
                              : "border-white ring-2 ring-white/20 scale-105"
                            : "border-white/10 opacity-70 hover:opacity-100"
                        }`}
                      >
                        {/* Overlay numbering */}
                        <div className="absolute top-2 left-2 z-20 bg-black/60 px-1.5 py-0.5 rounded text-[8px] font-mono text-white/60 tracking-wider">
                          0{part.index}
                        </div>
                        
                        <img 
                          src={part.img} 
                          alt={part.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 filter brightness-[0.65] group-hover:brightness-100"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Dynamic Hover Details HUD panel */}
                  <div className="mt-4 p-5 rounded-2xl bg-white/[0.01] border border-white/5 min-h-[140px] flex flex-col justify-between transition-all duration-300">
                    {(() => {
                      const activePart = hoveredPartIndex 
                        ? partsData[hoveredPartIndex - 1] 
                        : partsData[0]; // fallback to first part

                      return (
                        <div className="transition-opacity duration-300">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-3">
                            <div>
                              <span className="text-[8px] font-mono tracking-widest text-white/30 uppercase">
                                PART 0{activePart.index} // CONFIG
                              </span>
                              <h4 className="text-sm font-bold text-white tracking-tight mt-0.5">
                                {activePart.title}
                              </h4>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <span className="text-[8px] font-mono bg-white/5 border border-white/10 px-2.5 py-1 rounded text-white/50">
                                {activePart.metricHighlight}
                              </span>
                            </div>
                          </div>
                          
                          <p className="text-xs text-white/50 mt-3 font-light leading-relaxed">
                            {activePart.desc}
                          </p>

                          <div className="mt-3 flex items-center justify-between text-[9px] font-mono text-white/30">
                            <span>{activePart.stats}</span>
                            <span className="animate-pulse text-green-500/80">● ACTIVE DIRECTORY</span>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                </div>

                {/* Technical Comparison Specs Sheet */}
                <div className="glass-panel p-6 rounded-3xl border border-white/5 relative overflow-hidden">
                  <span className="text-[9px] font-mono tracking-[0.2em] text-white/30 uppercase block mb-4">
                    [EDITION COMPARATIVE MATRIX]
                  </span>
                  
                  <div className="space-y-3">
                    {/* Header line */}
                    <div className="grid grid-cols-3 text-[9px] font-mono tracking-widest text-white/30 border-b border-white/5 pb-2">
                      <span>SPECIFICATION</span>
                      <span className="text-center">CURRENT SELECTION</span>
                      <span className="text-right">STANDARD DELTA</span>
                    </div>

                    {[
                      { label: "Acoustic Driver", val: editionSpecs[productEdition].specs.driver, standard: editionSpecs.standard.specs.driver },
                      { label: "Frequency Bounds", val: editionSpecs[productEdition].specs.freq, standard: editionSpecs.standard.specs.freq },
                      { label: "THD Rating (1kHz)", val: editionSpecs[productEdition].specs.thd, standard: editionSpecs.standard.specs.thd },
                      { label: "ANC Attenuation", val: editionSpecs[productEdition].specs.anc, standard: editionSpecs.standard.specs.anc },
                      { label: "Decryption Logic", val: editionSpecs[productEdition].specs.lossless, standard: editionSpecs.standard.specs.lossless },
                      { label: "Chassis Materials", val: editionSpecs[productEdition].specs.materials, standard: editionSpecs.standard.specs.materials },
                    ].map((row, i) => (
                      <div 
                        key={i} 
                        className={`grid grid-cols-3 py-2 text-xs border-b border-white/[0.02] last:border-b-0 items-center transition-all ${
                          productEdition !== "standard" && row.val !== row.standard
                            ? "bg-white/[0.01]" 
                            : ""
                        }`}
                      >
                        <span className="text-white/40 font-mono tracking-wide text-[10px]">{row.label}</span>
                        <span className={`text-center font-bold transition-all duration-500 ${
                          productEdition === "pro" ? "text-blue-400" :
                          productEdition === "executive" ? "text-amber-400" :
                          "text-white"
                        }`}>
                          {row.val}
                        </span>
                        <span className="text-right text-white/30 font-light text-[10px]">{row.standard}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Right Column: Audio Graph & Telemetry Dials (lg:col-span-5) */}
              <div className="lg:col-span-5 flex flex-col gap-6 w-full">
                
                {/* Audio Graph Panel */}
                <div className="glass-panel p-6 rounded-3xl border border-white/5 relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full animate-pulse ${
                        productEdition === "pro" ? "bg-blue-400" :
                        productEdition === "executive" ? "bg-amber-400" :
                        "bg-white"
                      }`} />
                      <span className="text-[9px] font-mono tracking-[0.2em] text-white/30 uppercase">
                        AUDIO CURVE FREQUENCY RESPONSE
                      </span>
                    </div>
                    <span className="text-[9px] font-mono text-white/30">
                      4Hz - 45kHz
                    </span>
                  </div>

                  {/* SVG Chart */}
                  <div className="relative w-full h-[180px] bg-black/40 rounded-2xl overflow-hidden border border-white/5">
                    {/* Technical Grid lines */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
                      <line x1="0" y1="30" x2="100%" y2="30" stroke="white" strokeWidth="0.5" strokeDasharray="2,2" />
                      <line x1="0" y1="60" x2="100%" y2="60" stroke="white" strokeWidth="0.5" strokeDasharray="2,2" />
                      <line x1="0" y1="90" x2="100%" y2="90" stroke="white" strokeWidth="0.5" strokeDasharray="4,4" />
                      <line x1="0" y1="120" x2="100%" y2="120" stroke="white" strokeWidth="0.5" strokeDasharray="2,2" />
                      <line x1="0" y1="150" x2="100%" y2="150" stroke="white" strokeWidth="0.5" strokeDasharray="2,2" />
                      
                      <line x1="80" y1="0" x2="80" y2="100%" stroke="white" strokeWidth="0.5" strokeDasharray="2,2" />
                      <line x1="160" y1="0" x2="160" y2="100%" stroke="white" strokeWidth="0.5" strokeDasharray="2,2" />
                      <line x1="240" y1="0" x2="240" y2="100%" stroke="white" strokeWidth="0.5" strokeDasharray="2,2" />
                      <line x1="320" y1="0" x2="320" y2="100%" stroke="white" strokeWidth="0.5" strokeDasharray="2,2" />
                    </svg>

                    {/* Chart labels inside */}
                    <div className="absolute top-2 left-2 text-[8px] font-mono text-white/20 select-none">
                      +6 dB SPL
                    </div>
                    <div className="absolute bottom-2 left-2 text-[8px] font-mono text-white/20 select-none">
                      -15 dB SPL
                    </div>
                    <div className="absolute bottom-2 right-2 text-[8px] font-mono text-white/20 select-none">
                      45 kHz
                    </div>

                    {/* Real-time coordinates HUD inside */}
                    <div className="absolute top-2 right-2 z-10 bg-black/60 backdrop-blur border border-white/10 px-2 py-1 rounded-md text-[8px] font-mono text-white/50 tracking-wider">
                      Hz: <span className="text-white font-bold">{hoveredFreq.hz.toLocaleString()}</span> // Response: <span className={`font-bold ${
                        productEdition === "pro" ? "text-blue-400" :
                        productEdition === "executive" ? "text-amber-400" :
                        "text-white"
                      }`}>{hoveredFreq.db > 0 ? `+${hoveredFreq.db}` : hoveredFreq.db} dB</span>
                    </div>

                    {/* Interaction SVG canvas */}
                    <svg 
                      className="w-full h-full cursor-crosshair"
                      onMouseMove={handleGraphMouseMove}
                      onMouseLeave={() => setHoveredFreq({ hz: 1000, db: 0 })}
                    >
                      <defs>
                        <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor={
                            productEdition === "pro" ? "#3b82f6" :
                            productEdition === "executive" ? "#e0b471" :
                            "#ffffff"
                          } stopOpacity="0.25" />
                          <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                        </linearGradient>
                      </defs>

                      {/* Filled under area path */}
                      <path
                        d={`${
                          productEdition === "pro"
                            ? "M 20 90 L 80 90 Q 150 90, 220 92 T 320 88 T 430 90"
                            : productEdition === "executive"
                            ? "M 20 70 Q 70 85, 130 105 T 260 100 T 370 80 Q 410 75, 430 65"
                            : "M 20 140 Q 60 100, 120 90 T 250 95 T 380 110 Q 410 130, 430 150"
                        } L 430 170 L 20 170 Z`}
                        fill="url(#chartGradient)"
                        className="transition-all duration-700 ease-in-out"
                      />

                      {/* Line Curve path */}
                      <path
                        d={
                          productEdition === "pro"
                            ? "M 20 90 L 80 90 Q 150 90, 220 92 T 320 88 T 430 90"
                            : productEdition === "executive"
                            ? "M 20 70 Q 70 85, 130 105 T 260 100 T 370 80 Q 410 75, 430 65"
                            : "M 20 140 Q 60 100, 120 90 T 250 95 T 380 110 Q 410 130, 430 150"
                        }
                        fill="none"
                        stroke={
                          productEdition === "pro" ? "#3b82f6" :
                          productEdition === "executive" ? "#e0b471" :
                          "#ffffff"
                        }
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        className="transition-all duration-700 ease-in-out"
                      />

                      {/* Caliper Crosshair Tracking lines */}
                      {hoveredFreq.hz !== 1000 && (
                        <>
                          {/* Vertical Caliper */}
                          <line
                            x1={20 + ((hoveredFreq.hz - 4) / 44996) * 410}
                            y1="0"
                            x2={20 + ((hoveredFreq.hz - 4) / 44996) * 410}
                            y2="100%"
                            stroke="white"
                            strokeWidth="0.5"
                            strokeDasharray="3,3"
                            className="opacity-50"
                          />
                          {/* Horizontal Caliper */}
                          <line
                            x1="0"
                            y1={getGraphYCoord(hoveredFreq.db)}
                            x2="100%"
                            y2={getGraphYCoord(hoveredFreq.db)}
                            stroke="white"
                            strokeWidth="0.5"
                            strokeDasharray="3,3"
                            className="opacity-50"
                          />
                          {/* Interactive Target glowing node */}
                          <circle
                            cx={20 + ((hoveredFreq.hz - 4) / 44996) * 410}
                            cy={getGraphYCoord(hoveredFreq.db)}
                            r="6"
                            fill={
                              productEdition === "pro" ? "#2563eb" :
                              productEdition === "executive" ? "#d4a35d" :
                              "#ffffff"
                            }
                            className="animate-ping"
                          />
                          <circle
                            cx={20 + ((hoveredFreq.hz - 4) / 44996) * 410}
                            cy={getGraphYCoord(hoveredFreq.db)}
                            r="4.5"
                            fill={
                              productEdition === "pro" ? "#3b82f6" :
                              productEdition === "executive" ? "#e0b471" :
                              "#ffffff"
                            }
                            stroke="black"
                            strokeWidth="1.5"
                          />
                        </>
                      )}
                    </svg>
                  </div>
                </div>

                {/* Progress Gauges Grid (ANC & Battery side by side) */}
                <div className="grid grid-cols-2 gap-4">
                  
                  {/* ANC attenuation meter */}
                  <div className="glass-panel p-5 rounded-3xl border border-white/5 flex flex-col items-center justify-between text-center relative overflow-hidden h-[175px]">
                    <span className="text-[8px] font-mono tracking-widest text-white/30 uppercase">
                      ANC ATTENUATION
                    </span>

                    {/* Circular dial */}
                    <div className="relative w-20 h-20 my-2 flex items-center justify-center">
                      <svg className="w-full h-full -rotate-90">
                        <circle
                          cx="40"
                          cy="40"
                          r="32"
                          stroke="rgba(255,255,255,0.03)"
                          strokeWidth="4"
                          fill="transparent"
                        />
                        <circle
                          cx="40"
                          cy="40"
                          r="32"
                          stroke={
                            productEdition === "pro" ? "#3b82f6" :
                            productEdition === "executive" ? "#e0b471" :
                            "#ffffff"
                          }
                          strokeWidth="4"
                          fill="transparent"
                          strokeDasharray={2 * Math.PI * 32}
                          strokeDashoffset={
                            2 * Math.PI * 32 - (editionSpecs[productEdition].specs.ancVal / 50) * (2 * Math.PI * 32)
                          }
                          strokeLinecap="round"
                          className="progress-dial-path transition-all duration-1000 ease-in-out"
                        />
                      </svg>
                      
                      {/* Inside numerical HUD */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-sm font-extrabold text-white leading-none">
                          -{editionSpecs[productEdition].specs.ancVal}
                        </span>
                        <span className="text-[7px] font-mono text-white/40 uppercase mt-0.5">dB</span>
                      </div>
                    </div>

                    <span className="text-[9px] font-mono text-white/40 tracking-wider">
                      {productEdition === "pro" ? "HYBRID REF STATE" : 
                       productEdition === "executive" ? "ADAPTIVE SHIELD" : "STANDARD CHAMBER"}
                    </span>
                  </div>

                  {/* Battery life circular meter */}
                  <div className="glass-panel p-5 rounded-3xl border border-white/5 flex flex-col items-center justify-between text-center relative overflow-hidden h-[175px]">
                    <span className="text-[8px] font-mono tracking-widest text-white/30 uppercase">
                      BATTERY TELEMETRY
                    </span>

                    {/* Circular dial */}
                    <div className="relative w-20 h-20 my-2 flex items-center justify-center">
                      <svg className="w-full h-full -rotate-90">
                        <circle
                          cx="40"
                          cy="40"
                          r="32"
                          stroke="rgba(255,255,255,0.03)"
                          strokeWidth="4"
                          fill="transparent"
                        />
                        <circle
                          cx="40"
                          cy="40"
                          r="32"
                          stroke={
                            productEdition === "pro" ? "#3b82f6" :
                            productEdition === "executive" ? "#e0b471" :
                            "#ffffff"
                          }
                          strokeWidth="4"
                          fill="transparent"
                          strokeDasharray={2 * Math.PI * 32}
                          strokeDashoffset={
                            2 * Math.PI * 32 - (editionSpecs[productEdition].specs.batteryVal / 80) * (2 * Math.PI * 32)
                          }
                          strokeLinecap="round"
                          className="progress-dial-path transition-all duration-1000 ease-in-out"
                        />
                      </svg>
                      
                      {/* Inside numerical HUD */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-sm font-extrabold text-white leading-none">
                          {editionSpecs[productEdition].specs.batteryVal}
                        </span>
                        <span className="text-[7px] font-mono text-white/40 uppercase mt-0.5">HRS</span>
                      </div>
                    </div>

                    <span className="text-[9px] font-mono text-white/40 tracking-wider">
                      POWER RESERVE
                    </span>
                  </div>

                </div>

                {/* Oscilloscope THD Visualizer */}
                <div className="glass-panel p-5 rounded-3xl border border-white/5 relative overflow-hidden">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[8px] font-mono tracking-widest text-white/30 uppercase">
                      THD DISTORTION OSCILLOSCOPE
                    </span>
                    <span className="text-[9px] font-mono text-white/50">
                      {editionSpecs[productEdition].specs.thd}
                    </span>
                  </div>

                  <div className="h-16 w-full bg-black/40 rounded-2xl relative overflow-hidden flex items-center justify-center border border-white/5">
                    <svg className="w-full h-full" viewBox="0 0 200 80">
                      {/* Grid line in center */}
                      <line x1="0" y1="40" x2="200" y2="40" stroke="white" strokeWidth="0.25" strokeDasharray="3,3" className="opacity-30" />
                      
                      {/* Oscilloscope dynamic wave */}
                      <path
                        d={getThdWaveformPath()}
                        fill="none"
                        stroke={
                          productEdition === "pro" ? "#3b82f6" :
                          productEdition === "executive" ? "#e0b471" :
                          "#ffffff"
                        }
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        className="transition-all duration-700 ease-in-out"
                      />
                    </svg>

                    <div className="absolute top-2 right-2 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping" />
                      <span className="text-[7px] font-mono text-white/30 uppercase tracking-widest">
                        CALIBRATED
                      </span>
                    </div>
                  </div>
                </div>

              </div>

            </div>

            {/* Dynamic Pre-order Section / Variant Order Customizer */}
            <div 
              id="preorder" 
              className={`w-full mt-24 p-8 md:p-14 bg-white/[0.01] border rounded-[40px] text-center backdrop-blur-md relative overflow-hidden transition-all duration-1000 ease-in-out ${
                productEdition === "pro" ? "border-blue-500/20 animate-neon-pulse-blue" :
                productEdition === "executive" ? "border-amber-500/20 animate-neon-pulse-gold" :
                "border-white/10 animate-neon-pulse-silver"
              }`}
            >
              {/* Radial localized glow inside card */}
              <div 
                className="absolute inset-0 opacity-15 pointer-events-none transition-all duration-1000" 
                style={{
                  background: productEdition === "pro" 
                    ? "radial-gradient(400px circle at 50% 50%, rgba(59,130,246,0.3) 0%, transparent 70%)" 
                    : productEdition === "executive"
                    ? "radial-gradient(400px circle at 50% 50%, rgba(224,180,113,0.25) 0%, transparent 70%)"
                    : "radial-gradient(400px circle at 50% 50%, rgba(255,255,255,0.15) 0%, transparent 70%)"
                }}
              />
              
              <div className="p-3 bg-white/[0.03] border border-white/5 rounded-3xl w-fit mx-auto mb-6 relative">
                <Award className={`w-7 h-7 transition-colors duration-500 ${
                  productEdition === "pro" ? "text-blue-400" :
                  productEdition === "executive" ? "text-amber-400" :
                  "text-white"
                }`} />
                <span className={`absolute inset-0 rounded-3xl blur-md opacity-25 transition-colors duration-500 ${
                  productEdition === "pro" ? "bg-blue-400" :
                  productEdition === "executive" ? "bg-amber-400" :
                  "bg-white"
                }`} />
              </div>

              <span className="text-[10px] font-mono tracking-[0.4em] text-white/30 uppercase block mb-3">
                {editionSpecs[productEdition].tagline}
              </span>
              
              <h3 className="text-3xl md:text-6xl font-extrabold text-white tracking-tightest leading-none select-none">
                Reserve Your Edition.
              </h3>

              <p className="text-xs md:text-sm text-white/40 mt-4 max-w-lg mx-auto font-light leading-relaxed">
                Join the ultimate tier of physical and digital performance. Each reservation package includes our custom aerospace case, reference cables, and elite priority support privileges.
              </p>

              {/* Dynamic Animated Pricing rate */}
              <div className="my-8 relative h-16 overflow-hidden flex justify-center items-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={productEdition}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col items-center"
                  >
                    <span className={`text-4xl md:text-6xl font-black transition-colors duration-500 ${
                      productEdition === "pro" ? "text-blue-400" :
                      productEdition === "executive" ? "text-amber-400" :
                      "text-white"
                    }`}>
                      ${editionSpecs[productEdition].price}
                    </span>
                    <span className="text-[8px] font-mono tracking-widest text-white/30 uppercase mt-1">
                      USD // RESERVATION DEPOSIT TAX INCLUDED
                    </span>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto relative z-20">
                <button 
                  onClick={() => alert(`Pre-order reservation placed for: ${editionSpecs[productEdition].name}`)}
                  className={`w-full py-4 px-8 font-bold text-xs uppercase tracking-widest rounded-full shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95 cursor-pointer text-black ${
                    productEdition === "pro" ? "bg-blue-400 shadow-blue-500/20 hover:shadow-blue-500/40" :
                    productEdition === "executive" ? "bg-amber-400 shadow-amber-500/20 hover:shadow-amber-500/40" :
                    "bg-white shadow-white/10 hover:shadow-white/20"
                  }`}
                >
                  PRE-ORDER {productEdition === "pro" ? "PRO" : productEdition === "executive" ? "EXECUTIVE" : "STANDARD"} NOW
                </button>
              </div>

              <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mt-14 pt-8 border-t border-white/5 text-[9px] text-white/30 uppercase tracking-[0.2em] font-semibold">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
                  <Shield className="w-4 h-4 text-white/40" />
                  <span>2 Year Warranty</span>
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
                  <Heart className="w-4 h-4 text-white/40" />
                  <span>30 Day Trial</span>
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
                  <Award className="w-4 h-4 text-white/40" />
                  <span>Priority shipping</span>
                </div>
              </div>
            </div>

          </div>
        </section>

      </main>

      {/* Sleek Minimal Footer */}
      <footer className="relative bg-[#1c1a1d] border-t border-white/5 py-12 px-6 md:px-12 text-center text-white/40 text-[10px] tracking-[0.2em] uppercase font-medium">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span>© 2026 ZENITH X INC. ALL RIGHTS RESERVED.</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Support</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
