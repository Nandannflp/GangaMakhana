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
    <section
      className="relative overflow-hidden py-16"
      style={{
        background:
          'radial-gradient(circle at top left, rgba(212, 175, 55, 0.12), transparent 24%), linear-gradient(180deg, #f8f3ea 0%, #fdfaf4 48%, #f5efe4 100%)',
        borderTop: '1px solid rgba(212, 175, 55, 0.12)',
        borderBottom: '1px solid rgba(212, 175, 55, 0.12)',
      }}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white/35 to-transparent" />
      <div className="w-full overflow-hidden">
        <Marquee
          pauseOnHover
          duration={34}
          className="py-3"
          fadeAmount={6}
        >
          {marqueeItems.map((item) => (
            <article
              key={item.title}
              className="mx-3 flex min-h-[128px] w-[320px] shrink-0 items-start gap-4 rounded-[24px] border border-[rgba(26,67,49,0.08)] bg-white/92 p-5 shadow-[0_14px_34px_-24px_rgba(26,67,49,0.28)]"
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[rgba(212,175,55,0.14)] text-[var(--color-primary)]">
                {item.icon}
              </div>
              <div>
                <h3
                  className="mb-1 text-[1.15rem] font-semibold leading-tight text-[var(--color-text)]"
                  style={{ fontFamily: 'var(--font-primary)' }}
                >
                  {item.title}
                </h3>
                <p className="text-sm leading-6 text-[var(--color-text-light)]">
                  {item.description}
                </p>
              </div>
            </article>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
