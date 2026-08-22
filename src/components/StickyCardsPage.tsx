import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ReactLenis from "lenis/react";
import { useRef } from "react";
import { cn } from "@/lib/utils";

export interface CardData {
  id: number | string;
  image: string;
  alt?: string;
  title?: string;
  subtitle?: string;
  name?: string;
  objectFit?: string;
  imgClassName?: string;
}

export interface StickyCard002Props {
  cards?: CardData[];
  className?: string;
  containerClassName?: string;
  imageClassName?: string;
}

const defaultCardsData: CardData[] = [
  {
    id: 1,
    image: "/Thefounderoflibreo.png",
    alt: "The Founder of Libreo",
    title: "The Founder of Libreo",
    name: "Thilakeswaran B",
    subtitle: "01 / Leadership",
  },
  {
    id: 2,
    image: "/member2.jpg",
    alt: "Sanjai S",
    title: "Sanjai S",
    subtitle: "02 / FullStack Developer",
  },
  {
    id: 3,
    image: "/member3.jpg",
    alt: "Abstract Fluid 3",
    title: "Rahul Kumar Chaupal",
    subtitle: "03 / AIML Engineer",
  },
  {
    id: 4,
    image: "/member4.jpg",
    alt: "Abstract Fluid 4",
    title: "Sabareeswaran M",
    subtitle: "04 / AI Engineer",
  },
  {
    id: 5,
    image: "/member5.jpg",
    alt: "Abstract Fluid 5",
    title: "Sabareeswaran M",
    subtitle: "05 / Hardware Engineer",
  },
  {
    id: 6,
    image: "/member6.jpg",
    alt: "Santhiya V",
    title: "Santhiya V",
    subtitle: "06 / Web Developer",
  },
  {
    id: 7,
    image: "/member7.jpg",
    alt: "Praveena B",
    title: "Praveena B",
    subtitle: "07 / Java FullStack Developer",
  },
];

const StickyCard002 = ({
  cards = defaultCardsData,
  className,
  containerClassName,
  imageClassName,
}: StickyCard002Props) => {
  const container = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      const imageElements = imageRefs.current;
      const totalCards = imageElements.length;

      if (!imageElements[0]) return;

      gsap.set(imageElements[0], { y: "0%", scale: 1, rotation: 0 });

      for (let i = 1; i < totalCards; i++) {
        if (!imageElements[i]) continue;
        gsap.set(imageElements[i], { y: "100%", scale: 1, rotation: 0 });
      }

      const scrollTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".sticky-cards",
          start: "top top",
          end: `+=${window.innerHeight * (totalCards - 1)}`,
          pin: true,
          scrub: 0.5,
          pinSpacing: true,
        },
      });

      for (let i = 0; i < totalCards - 1; i++) {
        const currentImage = imageElements[i];
        const nextImage = imageElements[i + 1];
        const position = i;
        if (!currentImage || !nextImage) continue;

        scrollTimeline.to(
          currentImage,
          {
            scale: 0.7,
            rotation: 5,
            duration: 1,
            ease: "none",
          },
          position,
        );

        scrollTimeline.to(
          nextImage,
          {
            y: "0%",
            duration: 1,
            ease: "none",
          },
          position,
        );
      }

      const resizeObserver = new ResizeObserver(() => {
        ScrollTrigger.refresh();
      });

      if (container.current) {
        resizeObserver.observe(container.current);
      }

      return () => {
        resizeObserver.disconnect();
        scrollTimeline.kill();
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    },
    { scope: container },
  );

  return (
    <div className={cn("relative min-h-screen w-full bg-black text-white", className)} ref={container}>
      <div className="sticky-cards relative flex h-screen w-full flex-col items-center justify-center overflow-hidden p-4 lg:p-8">
        <div className="mb-6 text-center">
          <span className="text-xs uppercase tracking-widest text-white/50 font-body">Featured Showcase</span>
          <h2 className="text-3xl md:text-5xl font-heading italic text-white mt-1">Members</h2>
        </div>

        <div
          className={cn(
            "relative h-[70vh] w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl overflow-hidden rounded-2xl shadow-2xl border border-white/10",
            containerClassName,
          )}
        >
          {cards.map((card, i) => (
            <div
              key={card.id}
              ref={(el) => {
                imageRefs.current[i] = el;
              }}
              className={cn(
                "absolute inset-0 h-full w-full overflow-hidden rounded-2xl",
                imageClassName,
              )}
            >
              <img
                src={card.image}
                alt={card.alt || ""}
                className={cn("h-full w-full", card.objectFit ?? "object-cover", card.imgClassName)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
              {(card.title || card.subtitle || card.name) && (
                <div className="absolute bottom-6 left-6 right-6 z-10">
                  {card.subtitle && (
                    <p className="text-xs font-body uppercase tracking-wider text-white/60 mb-1">
                      {card.subtitle}
                    </p>
                  )}
                  {card.title && (
                    <h3 className="text-2xl md:text-3xl font-heading italic text-white">
                      {card.title}
                    </h3>
                  )}
                  {card.name && (
                    <p className="text-xl md:text-2xl font-heading italic text-white/90 mt-0.5">
                      {card.name}
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        <p className="mt-6 text-xs text-white/40 font-body animate-pulse">
          Scroll down to reveal cards ↓
        </p>
      </div>
    </div>
  );
};

const Skiper17 = () => {
  return (
    <ReactLenis root>
      <div className="min-h-screen w-full bg-black">
        <StickyCard002 />
      </div>
    </ReactLenis>
  );
};

export { Skiper17, StickyCard002 };
export default Skiper17;
