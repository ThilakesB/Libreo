import ReactLenis from "lenis/react";
import CtaFooter from "./components/CtaFooter";
import { StickyCard002 } from "./components/StickyCardsPage";
import KineticManifesto from "./components/KineticManifestoPage";

function App() {
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
