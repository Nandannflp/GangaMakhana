import {
  Clock3,
  CookingPot,
  Dumbbell,
  Flame,
  HeartPulse,
  Leaf,
  MapPin,
  PackageCheck,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { Marquee } from '@/components/ui/marquee';

export default function BenefitsStrip() {
  const marqueeFacts = [
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
  ];

  const marqueeUses = [
    {
      icon: <Sparkles size={22} className="text-[var(--color-accent)]" />,
      title: "Tea-Time Favourite",
      description: "A dependable evening snack with serious crunch.",
    },
    {
      icon: <Clock3 size={22} className="text-[var(--color-accent)]" />,
      title: "Office Desk Snack",
      description: "Easy to grab between calls, meetings, and long workdays.",
    },
    {
      icon: <CookingPot size={22} className="text-[var(--color-accent)]" />,
      title: "Recipe Friendly",
      description: "Works beautifully in kheer, chaat, trail mix, and home roasting.",
    },
    {
      icon: <Flame size={22} className="text-[var(--color-accent)]" />,
      title: "Bold Flavour Range",
      description: "From classic and minty to spicy and dessert-style makhana.",
    },
    {
      icon: <Leaf size={22} className="text-[var(--color-accent)]" />,
      title: "Vrat-Friendly Choices",
      description: "Simple makhana options that fit traditional snacking habits.",
    },
    {
      icon: <MapPin size={22} className="text-[var(--color-accent)]" />,
      title: "Bihar Origin Story",
      description: "The section now tells a fuller story of where makhana comes from.",
    },
  ];

  return (
    <section
      className="relative overflow-hidden py-20"
      style={{
        background:
          'radial-gradient(circle at top left, rgba(212, 175, 55, 0.16), transparent 28%), linear-gradient(180deg, #f6f1e6 0%, #fbf7ef 45%, #f2ede2 100%)',
        borderTop: '1px solid rgba(212, 175, 55, 0.12)',
        borderBottom: '1px solid rgba(212, 175, 55, 0.12)',
      }}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/40 to-transparent" />
      <div className="container">
        <div className="mb-10 text-center">
          <span
            className="mb-4 inline-flex items-center rounded-full border border-[rgba(26,67,49,0.12)] bg-white/70 px-4 py-2 text-sm font-medium text-[var(--color-primary)] backdrop-blur"
            style={{ fontFamily: 'var(--font-primary)' }}
          >
            Why Makhana Works
          </span>
          <h2 className="section-title mx-auto max-w-3xl">
            More than a healthy snack, makhana brings together Bihar heritage, clean crunch, and everyday versatility.
          </h2>
          <p className="section-subtitle max-w-3xl">
            We expanded this section to say more about what makes makhana special, how people actually enjoy it, and why it feels different from ordinary packaged snacks.
          </p>
        </div>

        <div className="space-y-5">
          <Marquee
            pauseOnHover
            duration={30}
            className="py-2"
            fadeAmount={8}
          >
            {marqueeFacts.map((item) => (
              <article
                key={item.title}
                className="mx-3 flex min-h-[132px] w-[300px] shrink-0 items-start gap-4 rounded-[24px] border border-[rgba(26,67,49,0.08)] bg-white/88 p-5 shadow-[0_16px_40px_-22px_rgba(26,67,49,0.35)] backdrop-blur"
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

          <Marquee
            pauseOnHover
            duration={36}
            direction="right"
            className="py-2"
            fadeAmount={8}
          >
            {marqueeUses.map((item) => (
              <article
                key={item.title}
                className="mx-3 flex min-h-[118px] w-[340px] shrink-0 flex-col justify-between rounded-[24px] border border-[rgba(26,67,49,0.08)] bg-[rgba(26,67,49,0.94)] p-5 text-white shadow-[0_16px_40px_-22px_rgba(26,67,49,0.45)]"
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                    {item.icon}
                  </div>
                  <h3
                    className="text-lg font-semibold leading-tight text-white"
                    style={{ fontFamily: 'var(--font-primary)' }}
                  >
                    {item.title}
                  </h3>
                </div>
                <p className="text-sm leading-6 text-white/75">
                  {item.description}
                </p>
              </article>
            ))}
          </Marquee>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            'Crunchy enough for tea-time, light enough for everyday snacking.',
            'Naturally rooted in Bihar, but flexible enough for modern flavors and recipes.',
            'A single ingredient story that can move from classic roasted packs to kheer and gifting.',
          ].map((note) => (
            <div
              key={note}
              className="rounded-[22px] border border-[rgba(26,67,49,0.08)] bg-white/70 px-5 py-4 text-sm leading-6 text-[var(--color-text-light)] shadow-[0_12px_30px_-20px_rgba(26,67,49,0.28)]"
            >
              {note}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
