import { useEffect } from "react";
import ReactLenis from "lenis/react";
import CtaFooter from "./components/CtaFooter";
import { StickyCard002 } from "./components/StickyCardsPage";
import KineticManifesto from "./components/KineticManifestoPage";

function App() {
  useEffect(() => {
    const audio = new Audio("/Sound.mp3");
    let hasPlayed = false;

    const playAudio = () => {
      if (hasPlayed) return;
      audio
        .play()
        .then(() => {
          hasPlayed = true;
          cleanupListeners();
        })
        .catch((err) => {
          console.warn("Autoplay waiting for interaction:", err);
        });
    };

    const handleFirstInteraction = () => {
      if (!hasPlayed) {
        playAudio();
      }
    };

    const cleanupListeners = () => {
      window.removeEventListener("pointerdown", handleFirstInteraction);
      window.removeEventListener("keydown", handleFirstInteraction);
    };

    const timer = setTimeout(() => {
      playAudio();
      window.addEventListener("pointerdown", handleFirstInteraction, { once: true });
      window.addEventListener("keydown", handleFirstInteraction, { once: true });
    }, 2000);

    return () => {
      clearTimeout(timer);
      cleanupListeners();
      audio.pause();
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
