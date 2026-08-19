import { useEffect } from "react";
import ReactLenis from "lenis/react";
import CtaFooter from "./components/CtaFooter";
import { StickyCard002 } from "./components/StickyCardsPage";
import KineticManifesto from "./components/KineticManifestoPage";

function App() {
  useEffect(() => {
    const audio = new Audio("/Sound.mp3");
    audio.preload = "auto";
    let played = false;

    const playAudio = () => {
      if (played) return;
      audio
        .play()
        .then(() => {
          played = true;
          removeListeners();
        })
        .catch(() => {
          // Browser autoplay waiting for interaction
        });
    };

    const handleInteraction = () => {
      if (!played) {
        playAudio();
      }
    };

    const removeListeners = () => {
      window.removeEventListener("pointerdown", handleInteraction);
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
      window.removeEventListener("keydown", handleInteraction);
      window.removeEventListener("scroll", handleInteraction);
      window.removeEventListener("wheel", handleInteraction);
    };

    const addListeners = () => {
      window.addEventListener("pointerdown", handleInteraction, { once: true });
      window.addEventListener("click", handleInteraction, { once: true });
      window.addEventListener("touchstart", handleInteraction, { once: true });
      window.addEventListener("keydown", handleInteraction, { once: true });
      window.addEventListener("scroll", handleInteraction, { once: true });
      window.addEventListener("wheel", handleInteraction, { once: true });
    };

    // Attempt playback after 2 seconds
    const timer = setTimeout(() => {
      playAudio();
      addListeners();
    }, 2000);

    addListeners();

    return () => {
      clearTimeout(timer);
      removeListeners();
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
