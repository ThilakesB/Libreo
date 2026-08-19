import { useEffect, useRef } from "react";
import ReactLenis from "lenis/react";
import CtaFooter from "./components/CtaFooter";
import { StickyCard002 } from "./components/StickyCardsPage";
import KineticManifesto from "./components/KineticManifestoPage";

function App() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Resolve audio URL safely for Vercel deployments and local development
    const soundSrc = `${import.meta.env.BASE_URL}Sound.mp3`.replace(/\/\//g, "/");
    const audio = new Audio(soundSrc);
    audio.preload = "auto";
    audioRef.current = audio;

    let isAudioStarted = false;

    const startPlayback = () => {
      if (isAudioStarted) return;
      audio
        .play()
        .then(() => {
          isAudioStarted = true;
          cleanup();
        })
        .catch(() => {
          // If browser policy blocks autoplay on load, it will retry on the first user interaction
        });
    };

    const handleGesture = () => {
      if (!isAudioStarted) {
        startPlayback();
      }
    };

    const cleanup = () => {
      window.removeEventListener("click", handleGesture);
      window.removeEventListener("touchstart", handleGesture);
      window.removeEventListener("touchend", handleGesture);
      window.removeEventListener("pointerdown", handleGesture);
      window.removeEventListener("pointerup", handleGesture);
      window.removeEventListener("keydown", handleGesture);
      document.removeEventListener("click", handleGesture);
      document.removeEventListener("touchstart", handleGesture);
    };

    // Listen for genuine user gestures (without { once: true } so failed attempts don't drop the listener)
    window.addEventListener("click", handleGesture, { passive: true });
    window.addEventListener("touchstart", handleGesture, { passive: true });
    window.addEventListener("touchend", handleGesture, { passive: true });
    window.addEventListener("pointerdown", handleGesture, { passive: true });
    window.addEventListener("pointerup", handleGesture, { passive: true });
    window.addEventListener("keydown", handleGesture, { passive: true });
    document.addEventListener("click", handleGesture, { passive: true });
    document.addEventListener("touchstart", handleGesture, { passive: true });

    // Attempt playback automatically after 2 seconds
    const timer = setTimeout(() => {
      startPlayback();
    }, 2000);

    return () => {
      clearTimeout(timer);
      cleanup();
    };
  }, []);

  return (
    <ReactLenis root>
      <main className="min-h-screen bg-black text-white selection:bg-white/20 selection:text-white">
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
