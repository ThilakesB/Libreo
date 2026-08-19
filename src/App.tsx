import { useEffect, useState, useRef } from "react";
import ReactLenis from "lenis/react";
import { Volume2, VolumeX } from "lucide-react";
import CtaFooter from "./components/CtaFooter";
import { StickyCard002 } from "./components/StickyCardsPage";
import KineticManifesto from "./components/KineticManifestoPage";

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio("/Sound.mp3");
    audio.preload = "auto";
    audio.loop = false;
    audioRef.current = audio;

    let hasStarted = false;

    const playAudio = () => {
      if (hasStarted) return;
      audio
        .play()
        .then(() => {
          hasStarted = true;
          setIsPlaying(true);
          removeInteractionListeners();
        })
        .catch((err) => {
          console.log("Autoplay waiting for user gesture:", err);
        });
    };

    const handleUserInteraction = () => {
      if (!hasStarted) {
        playAudio();
      }
    };

    const removeInteractionListeners = () => {
      window.removeEventListener("click", handleUserInteraction);
      window.removeEventListener("pointerdown", handleUserInteraction);
      window.removeEventListener("touchstart", handleUserInteraction);
      window.removeEventListener("keydown", handleUserInteraction);
      window.removeEventListener("scroll", handleUserInteraction);
    };

    const addInteractionListeners = () => {
      window.addEventListener("click", handleUserInteraction, { once: true });
      window.addEventListener("pointerdown", handleUserInteraction, { once: true });
      window.addEventListener("touchstart", handleUserInteraction, { once: true });
      window.addEventListener("keydown", handleUserInteraction, { once: true });
      window.addEventListener("scroll", handleUserInteraction, { once: true });
    };

    // Attempt playback after 2 seconds
    const timer = setTimeout(() => {
      playAudio();
      // If browser prevented autoplay, trigger on user's first interaction
      addInteractionListeners();
    }, 2000);

    // Also listen for any interactions in case user interacts before 2 seconds
    addInteractionListeners();

    audio.onended = () => {
      setIsPlaying(false);
    };

    return () => {
      clearTimeout(timer);
      removeInteractionListeners();
      audio.pause();
    };
  }, []);

  const toggleSound = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(console.error);
    }
  };

  return (
    <ReactLenis root>
      <main className="min-h-screen bg-black text-white selection:bg-white/20 selection:text-white relative">
        {/* Floating Glassmorphism Sound Controller */}
        <button
          onClick={toggleSound}
          type="button"
          aria-label={isPlaying ? "Mute audio" : "Play audio"}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-xl border border-white/15 hover:border-white/30 text-white/80 hover:text-white shadow-2xl transition-all duration-300 group cursor-pointer"
        >
          {isPlaying ? (
            <>
              <Volume2 className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-mono tracking-wider text-emerald-400/90 flex items-center gap-1">
                SOUND ON
                <span className="inline-flex items-end gap-[2px] h-3 ml-1">
                  <span className="w-[2px] h-full bg-emerald-400 animate-pulse" />
                  <span className="w-[2px] h-2/3 bg-emerald-400 animate-pulse delay-75" />
                  <span className="w-[2px] h-4/5 bg-emerald-400 animate-pulse delay-150" />
                </span>
              </span>
            </>
          ) : (
            <>
              <VolumeX className="w-4 h-4 text-white/50 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-mono tracking-wider text-white/60">
                SOUND OFF
              </span>
            </>
          )}
        </button>

        {/* Section 1: Libreo Cinematic CTA & Footer */}
        <CtaFooter />

        {/* Section 2: GSAP Sticky Cards Scroll Animation */}
        <StickyCard002 />

        {/* Section 3: Interactive Kinetic Typography Manifesto */}
        <KineticManifesto />
      </main>
    </ReactLenis>
  );
}

export default App;
