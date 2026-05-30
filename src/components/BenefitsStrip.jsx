import {
  Dumbbell,
  Flame,
  HeartPulse,
  Leaf,
  MapPin,
  PackageCheck,
  ShieldCheck,
} from 'lucide-react';
import { Marquee } from '@/components/ui/marquee';

export default function BenefitsStrip() {
  const marqueeItems = [
    {
      icon: <Leaf size={28} className="benefit-icon" />,
      title: "Gluten-Free",
      description: "Light, airy, and naturally easy to snack on",
    },
    {
      icon: <Dumbbell size={28} className="benefit-icon" />,
      title: "High Protein",
      description: "A better munch option for active days",
    },
    {
      icon: <Flame size={28} className="benefit-icon" />,
      title: "Roasted, Not Fried",
      description: "Crisp texture without the oily heaviness",
    },
    {
      icon: <MapPin size={28} className="benefit-icon" />,
      title: "From Bihar Farms",
      description: "Directly inspired by the wetlands where makhana thrives",
    },
    {
      icon: <ShieldCheck size={28} className="benefit-icon" />,
      title: "Clean Ingredients",
      description: "Made to feel premium, not overprocessed",
    },
    {
      icon: <HeartPulse size={28} className="benefit-icon" />,
      title: "Light Yet Filling",
      description: "Crunch that satisfies without feeling too heavy",
    },
    {
      icon: <PackageCheck size={28} className="benefit-icon" />,
      title: "Freshly Packed",
      description: "Crafted to keep the signature puff and bite intact",
    },
    {
      icon: <MapPin size={28} className="benefit-icon" />,
      title: "Bihar Origin",
      description: "Sourced from the region best known for premium makhana",
    },
    {
      icon: <Flame size={28} className="benefit-icon" />,
      title: "Bold Flavours",
      description: "Classic, mint, peri peri, onion, chocolate, and more",
    },
    {
      icon: <ShieldCheck size={28} className="benefit-icon" />,
      title: "Everyday Snacking",
      description: "Clean crunch for tea-time, travel, work, and gifting",
    },
    {
      icon: <HeartPulse size={28} className="benefit-icon" />,
      title: "Tea-Time Favourite",
      description: "Crunchy enough for chai breaks, light enough for every day",
    },
  ];

  return (
    <section className="bg-[var(--color-primary)] py-4 border-y border-[rgba(212,175,55,0.2)] overflow-hidden">
      <div className="w-full">
        <Marquee
          pauseOnHover
          duration={35}
          className="py-1"
          fadeAmount={0}
        >
          {marqueeItems.map((item, index) => (
            <div
              key={index}
              className="flex shrink-0 items-center gap-3 px-10"
            >
              <div className="text-[#D4AF37] flex items-center justify-center">
                {item.icon}
              </div>
              <span
                className="text-[0.95rem] uppercase tracking-[0.15em] font-semibold text-[var(--color-on-primary)] whitespace-nowrap"
              >
                {item.title}
              </span>
              <div className="text-[#D4AF37]/40 ml-10 text-xs">
                ✦
              </div>
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
