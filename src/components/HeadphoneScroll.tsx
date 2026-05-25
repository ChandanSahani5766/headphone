"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { ChevronDown, Volume2, Cpu, Shield, Zap } from "lucide-react";

export default function HeadphoneScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  
  const [loading, setLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);

  // Animation Loop Refs for liquid-smooth frame lerping
  const targetFrameRef = useRef(1);
  const currentFrameRef = useRef(1);
  const animationFrameIdRef = useRef<number | null>(null);

  // 1. Capture Raw Scroll Progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // 2. Smooth Out Scroll with useSpring for Luxury Inertia
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 26,
    mass: 0.5,
    restDelta: 0.001
  });

  // 3. Preload all 240 images in-memory
  useEffect(() => {
    const totalFrames = 240;
    let loadedCount = 0;
    const loadedImages: HTMLImageElement[] = [];

    // Trigger preload
    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      const paddedIndex = String(i).padStart(3, "0");
      
      // Register handlers FIRST to ensure cached hits trigger onload correctly
      img.onload = () => {
        loadedCount++;
        setLoadProgress(Math.round((loadedCount / totalFrames) * 100));
        if (loadedCount === totalFrames) {
          setLoading(false);
        }
      };

      img.onerror = () => {
        // Continue even if a frame fails
        loadedCount++;
        setLoadProgress(Math.round((loadedCount / totalFrames) * 100));
        if (loadedCount === totalFrames) {
          setLoading(false);
        }
      };

      // Set src LAST to initiate the network or cache fetch
      img.src = `/sequence/ezgif-frame-${paddedIndex}.jpg`;

      loadedImages.push(img);
    }
    imagesRef.current = loadedImages;
  }, []);

  // 4. Draw Image on Canvas (Cover Scaling / Full Screen)
  const drawImage = useCallback((frame: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = imagesRef.current[frame - 1];
    if (!img || !img.complete) return;

    // Clear previous drawing
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Calculate Cover Scaling (True Full Screen Edge-to-Edge)
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const imgWidth = img.width;
    const imgHeight = img.height;

    const ratio = Math.max(canvasWidth / imgWidth, canvasHeight / imgHeight);
    
    const newWidth = imgWidth * ratio;
    const newHeight = imgHeight * ratio;

    const x = (canvasWidth - newWidth) / 2;
    const y = (canvasHeight - newHeight) / 2;

    ctx.drawImage(img, x, y, newWidth, newHeight);
  }, []);

  // 5. Handle Resize and DPI adjustments
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    // Set logical dimensions scaled by device pixel ratio
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
    }

    // Force redraw of current frame
    const frame = Math.min(240, Math.max(1, Math.round(currentFrameRef.current)));
    drawImage(frame);
  }, [drawImage]);

  // 6. Connect scroll change to update target frame index
  useEffect(() => {
    // Always initialize canvas dimensions on mount so idle preloader animation works
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    let unsubscribe = () => {};
    if (!loading) {
      // Track scroll changes and update target frame only when loaded
      unsubscribe = smoothProgress.on("change", (latest) => {
        const frame = Math.min(240, Math.max(1, Math.round(latest * 239 + 1)));
        targetFrameRef.current = frame;
      });
    }

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      unsubscribe();
    };
  }, [loading, smoothProgress, resizeCanvas]);

  // 6b. Continuous animation loop for ultra-smooth frame lerping & cinematic preloader idle rotation
  useEffect(() => {
    const renderLoop = () => {
      const currentTime = performance.now();

      if (loading) {
        // Idle Animation Loop: Once first frames load, play a cinematic back-and-forth orbital rotation
        if (loadProgress > 15) {
          const speed = 0.0012; // Slow elegant idle speed
          // Orbit oscillation: hover between frame 10 and 50 (smooth assembly starting loop)
          const frameOscillation = 30 + Math.sin(currentTime * speed) * 20;
          currentFrameRef.current = frameOscillation;
          
          const frameToDraw = Math.min(240, Math.max(1, Math.round(currentFrameRef.current)));
          drawImage(frameToDraw);
        }
      } else {
        // Scroll-linked Animation: Lerp current frame towards scroll target frame with spring damping
        const diff = targetFrameRef.current - currentFrameRef.current;
        
        if (Math.abs(diff) < 0.005) {
          currentFrameRef.current = targetFrameRef.current;
        } else {
          // Damped rotation interpolation (Awwwards OrbitControls-like easing)
          currentFrameRef.current += diff * 0.12;
        }

        const frameToDraw = Math.min(240, Math.max(1, Math.round(currentFrameRef.current)));
        drawImage(frameToDraw);
      }

      animationFrameIdRef.current = requestAnimationFrame(renderLoop);
    };

    animationFrameIdRef.current = requestAnimationFrame(renderLoop);

    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [loading, loadProgress, drawImage]);

  // 7. Framer Motion driven text overlay transformations
  // Title (0% - 15%)
  const titleOpacity = useTransform(smoothProgress, [0, 0.1, 0.15], [1, 1, 0]);
  const titleY = useTransform(smoothProgress, [0, 0.15], [0, -60]);

  // Precision Engineering (20% - 45%)
  const section1Opacity = useTransform(smoothProgress, [0.15, 0.22, 0.38, 0.45], [0, 1, 1, 0]);
  const section1Y = useTransform(smoothProgress, [0.15, 0.22, 0.38, 0.45], [50, 0, 0, -50]);

  // Titanium Drivers (50% - 75%)
  const section2Opacity = useTransform(smoothProgress, [0.45, 0.52, 0.68, 0.75], [0, 1, 1, 0]);
  const section2Y = useTransform(smoothProgress, [0.45, 0.52, 0.68, 0.75], [50, 0, 0, -50]);

  // Call To Action (80% - 100%)
  const ctaOpacity = useTransform(smoothProgress, [0.75, 0.85, 1], [0, 1, 1]);
  const ctaY = useTransform(smoothProgress, [0.75, 0.85], [60, 0]);
  const ctaScale = useTransform(smoothProgress, [0.8, 0.95], [0.95, 1]);

  const getBootText = (progress: number) => {
    if (progress < 15) return "INITIALIZING SYSTEM ARCHITECTURE...";
    if (progress < 35) return "MILLING SOLID AEROSPACE TITANIUM...";
    if (progress < 55) return "CALIBRATING DUAL-CORE ACOUSTIC CHAMBERS...";
    if (progress < 75) return "ESTABLISHING LOSSLESS 24-BIT STREAMING CORES...";
    if (progress < 95) return "OPTIMIZING ACTIVE 3D SOUNDSTAGE DETECTOR...";
    return "ACOUSTIC WEIGHTLESSNESS ACHIEVED.";
  };

  return (
    <div ref={containerRef} className="relative w-full h-[400vh] bg-[#1c1a1d]">
      {/* Sleek Cinematic Shutter Loader Overlay */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ y: 0 }}
            exit={{ 
              y: "-100%", 
              transition: { duration: 1.4, ease: [0.85, 0, 0.15, 1] } 
            }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#1c1a1d]/70 backdrop-blur-[16px] overflow-hidden"
          >
            {/* Ambient Pulse Halo */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.04)_0%,transparent_60%)] animate-[pulse_4s_infinite_ease-in-out] pointer-events-none" />

            {/* Glowing Brand Title Reveal */}
            <div className="relative mb-12 text-center select-none z-10">
              <motion.h2 
                initial={{ opacity: 0, letterSpacing: "0.2em", filter: "blur(8px)" }}
                animate={{ opacity: 0.9, letterSpacing: "0.5em", filter: "blur(0px)" }}
                transition={{ duration: 2.5, ease: "easeOut" }}
                className="text-2xl md:text-4xl font-extrabold text-white tracking-[0.5em] uppercase font-light drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]"
              >
                ZENITH X
              </motion.h2>
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.4, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="text-[9px] uppercase tracking-[0.4em] text-white/30 mt-2 block font-semibold"
              >
                Pure Soundscape Labs
              </motion.span>
            </div>

            {/* Digital Calibration Boot Logs */}
            <div className="w-80 h-10 flex flex-col justify-end text-center mb-6 font-mono text-[9px] text-white/40 tracking-[0.2em] uppercase select-none z-10">
              <motion.div 
                key={loadProgress}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="transition-all duration-300"
              >
                {getBootText(loadProgress)}
              </motion.div>
            </div>

            {/* Precise Minimal Horizontal Loading Line */}
            <div className="relative w-64 h-[1px] bg-white/10 rounded-full overflow-hidden z-10">
              <motion.div 
                className="absolute top-0 bottom-0 left-0 bg-white/85"
                style={{ width: `${loadProgress}%` }}
                transition={{ ease: "easeOut" }}
              />
            </div>

            {/* Loading Percentage indicator */}
            <span className="text-[10px] font-mono tracking-widest text-white/50 mt-3 z-10">
              {loadProgress}%
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sticky Canvas Container */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center">
        <motion.canvas
          ref={canvasRef}
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ 
            scale: loading ? 0.92 : 1, 
            opacity: loadProgress > 15 ? 1 : 0 
          }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-full object-cover pointer-events-none"
        />

        {/* Text Story Overlay Container */}
        <div className="absolute inset-0 flex items-center justify-center px-6 md:px-24 pointer-events-none">
          
          {/* Section 0: Main Title */}
          <motion.div
            style={{ opacity: titleOpacity, y: titleY }}
            className="absolute flex flex-col items-center text-center select-none"
          >
            <span className="text-[11px] font-bold uppercase tracking-[0.6em] text-white/50 mb-4 bg-white/5 px-4 py-1.5 rounded-full border border-white/10 backdrop-blur-md">
              THE NEXT FRONTIER
            </span>
            <h1 className="text-5xl md:text-8xl font-extrabold text-gradient tracking-tightest leading-none py-2">
              Zenith X.
            </h1>
            <p className="text-xl md:text-2xl font-light text-white/60 mt-4 tracking-wide max-w-md">
              Pure acoustic weightlessness.
            </p>
            
            {/* Scroll Indicator */}
            <motion.div 
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
              className="mt-20 flex flex-col items-center gap-2"
            >
              <span className="text-[9px] uppercase tracking-[0.3em] text-white/40">Scroll to disassemble</span>
              <ChevronDown className="w-4 h-4 text-white/30" />
            </motion.div>
          </motion.div>

          {/* Section 1: Left Aligned - Precision Engineering */}
          <motion.div
            style={{ opacity: section1Opacity, y: section1Y }}
            className="absolute left-6 md:left-24 max-w-sm md:max-w-md flex flex-col items-start select-none"
          >
            <div className="p-3 bg-white/5 rounded-2xl border border-white/10 mb-6 backdrop-blur-md">
              <Cpu className="w-6 h-6 text-white/80" />
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tightest leading-none">
              Precision Engineering.
            </h2>
            <p className="text-sm md:text-base text-white/60 mt-4 leading-relaxed font-light">
              Every detail is meticulously planned. Scroll to witness the architectural separation of acoustics, electronics, and design inside the high-tensile headband.
            </p>
            <div className="flex gap-6 mt-6 text-xs font-semibold text-white/50 tracking-wider">
              <div>
                <span className="text-white block font-bold text-sm">48 Parts</span>
                Micro-calibrated
              </div>
              <div className="w-[1px] bg-white/10" />
              <div>
                <span className="text-white block font-bold text-sm">0.02mm</span>
                Tolerance limit
              </div>
            </div>
          </motion.div>

          {/* Section 2: Right Aligned - Titanium Drivers */}
          <motion.div
            style={{ opacity: section2Opacity, y: section2Y }}
            className="absolute right-6 md:right-24 max-w-sm md:max-w-md flex flex-col items-start md:items-end md:text-right select-none"
          >
            <div className="p-3 bg-white/5 rounded-2xl border border-white/10 mb-6 backdrop-blur-md">
              <Zap className="w-6 h-6 text-white/80" />
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tightest leading-none">
              Titanium Drivers.
            </h2>
            <p className="text-sm md:text-base text-white/60 mt-4 leading-relaxed font-light">
              Crafted from high-grade aerospace titanium. Exploding the chamber reveals custom dual-core magnets designed for deep sub-bass response and crystalline high-frequencies.
            </p>
            <div className="flex gap-6 mt-6 text-xs font-semibold text-white/50 tracking-wider md:justify-end">
              <div>
                <span className="text-white block font-bold text-sm">40mm</span>
                Titanium dome
              </div>
              <div className="w-[1px] bg-white/10" />
              <div>
                <span className="text-white block font-bold text-sm">115dB</span>
                Dynamic range
              </div>
            </div>
          </motion.div>

          {/* Section 3: Centered CTA - Reassemble */}
          <motion.div
            style={{ opacity: ctaOpacity, y: ctaY, scale: ctaScale }}
            className="absolute flex flex-col items-center text-center max-w-xl px-4 select-none pointer-events-auto"
          >
            <div className="p-3 bg-white/5 rounded-2xl border border-white/10 mb-6 backdrop-blur-md">
              <Volume2 className="w-6 h-6 text-white/80" />
            </div>
            <h2 className="text-4xl md:text-7xl font-extrabold text-gradient tracking-tightest leading-none">
              Hear Everything.
            </h2>
            <p className="text-base md:text-lg text-white/60 mt-4 max-w-md font-light leading-relaxed">
              Zenith X reassembles in dynamic unison. Experience pure, unadulterated high-resolution acoustics exactly as the artists intended.
            </p>
            
            {/* Luxury Interactive Call to Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-4 mt-8 w-full sm:w-auto">
              <button className="relative px-8 py-3.5 bg-white text-black font-semibold text-sm rounded-full shadow-lg shadow-white/10 hover:shadow-white/20 transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer w-full sm:w-auto active:scale-95">
                Pre-order Zenith X
              </button>
              <button className="px-8 py-3.5 bg-white/5 border border-white/10 hover:bg-white/10 font-semibold text-sm text-white rounded-full transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer w-full sm:w-auto active:scale-95">
                Explore Specs
              </button>
            </div>

            {/* Technical Highlights Bar */}
            <div className="grid grid-cols-3 gap-6 mt-16 pt-8 border-t border-white/10 w-full text-xs font-semibold text-white/40">
              <div className="flex flex-col items-center">
                <Shield className="w-4 h-4 mb-2 text-white/50" />
                <span>60h Battery</span>
              </div>
              <div className="flex flex-col items-center">
                <Volume2 className="w-4 h-4 mb-2 text-white/50" />
                <span>Hybrid ANC</span>
              </div>
              <div className="flex flex-col items-center">
                <Zap className="w-4 h-4 mb-2 text-white/50" />
                <span>Lossless Audio</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
