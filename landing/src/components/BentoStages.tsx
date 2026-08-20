"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const stages = [
  {
    image: "/images/05_bento_tech_standup.jpg",
    category: "Yazılımcı & Tech",
    level: "B2 Upper-Int",
    duration: "6 dk",
    aiRole: "Tech Lead",
    title: "Tech Daily Standup",
    quote: "“Yesterday I resolved the blocker on the payment microservice...”",
    tags: ["Scrum", "Blockers", "Sprint Updates"],
  },
  {
    image: "/images/07_bento_job_interview.jpg",
    category: "Kariyer & FAANG",
    level: "B2 / C1",
    duration: "8 dk",
    aiRole: "Hiring Manager",
    title: "Global Job Interview",
    quote: "“Tell me about a technical challenge you recently solved.”",
    tags: ["STAR Metodu", "Behavioral", "System Design"],
  },
  {
    image: "/images/06_bento_visa_interview.jpg",
    category: "Vize & Konsolosluk",
    level: "B1 Intermediate",
    duration: "5 dk",
    aiRole: "Consular Officer",
    title: "Embassy Visa Interview",
    quote: "“Why did you choose this university and who is funding you?”",
    tags: ["US Visa", "Schengen", "Master's Degree"],
  },
  {
    image: "/images/08_bento_b2b_sales.jpg",
    category: "İş & Satış",
    level: "C1 Advanced",
    duration: "7 dk",
    aiRole: "Client VP",
    title: "B2B Client Pitch",
    quote: "“Your solution looks promising, but how do you justify this pricing?”",
    tags: ["Objection Handling", "ROI", "Contract Terms"],
  },
  {
    image: "/images/09_bento_airport_travel.jpg",
    category: "Seyahat & Havalimanı",
    level: "A2 / B1",
    duration: "4 dk",
    aiRole: "Customs Officer",
    title: "Airport & Border Control",
    quote: "“What is the purpose of your visit and how long will you stay?”",
    tags: ["Passport Check", "Hotel Booking", "Return Ticket"],
  },
  {
    image: "/images/10_bento_coffee_chat.jpg",
    category: "Networking & Sohbet",
    level: "B1 / B2",
    duration: "5 dk",
    aiRole: "Tech Colleague",
    title: "Coffee Chat & Small Talk",
    quote: "“How do you usually handle work-from-home burnout?”",
    tags: ["Icebreakers", "Casual English", "Opinions"],
  },
];

export default function BentoStages() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (gridRef.current && sectionRef.current) {
        const cards = gridRef.current.children;
        gsap.fromTo(
          cards,
          { opacity: 0, y: 35, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="sahneler"
      className="relative scroll-mt-24 bg-porcelain px-6 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <span className="font-mono text-[0.78rem] font-medium uppercase tracking-[0.14em] text-indigo">
            Hedefe Yönelik Sahneler
          </span>
          <h2 className="mt-4 text-balance font-display text-3xl font-extrabold tracking-tight text-heading sm:text-4xl">
            Genel sohbet değil. Hayatını değiştirecek gerçek sahneler.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-balance leading-relaxed text-body">
            Gelişigüzel &quot;What is your hobby?&quot; sohbetleriyle vakit kaybetme.
            Yarın gireceğin mülakatın, haftalık standup toplantının veya konsolosluk görüşmesinin provasını yap.
          </p>
        </div>

        {/* Bento Grid */}
        <div
          ref={gridRef}
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {stages.map((stage) => (
            <div
              key={stage.title}
              className="bento-card group flex flex-col justify-between overflow-hidden rounded-[24px] border border-line bg-white p-4 shadow-[var(--shadow-layered)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(79,70,229,0.14)] hover:border-indigo/40"
            >
              <div>
                {/* 3D Scene Banner */}
                <div className="relative h-48 w-full overflow-hidden rounded-[18px] bg-porcelain">
                  <Image
                    src={stage.image}
                    alt={stage.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/45 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-1 text-[0.7rem] font-semibold text-heading shadow-xs backdrop-blur-md">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald" />
                    <span>{stage.aiRole}</span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                    <span className="font-mono text-[0.7rem] font-semibold uppercase tracking-wider text-white/90">
                      {stage.category}
                    </span>
                    <span className="rounded-full bg-black/40 px-2 py-0.5 font-mono text-[0.7rem] backdrop-blur-xs">
                      {stage.level} • {stage.duration}
                    </span>
                  </div>
                </div>

                <div className="mt-4 px-1">
                  <h3 className="font-display text-lg font-bold text-heading group-hover:text-indigo transition-colors">
                    {stage.title}
                  </h3>
                  <p className="mt-2 text-xs italic leading-relaxed text-body line-clamp-2">
                    {stage.quote}
                  </p>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-1.5 border-t border-line/60 pt-3 px-1">
                {stage.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-porcelain px-2.5 py-0.5 font-mono text-[0.68rem] font-medium text-muted"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
