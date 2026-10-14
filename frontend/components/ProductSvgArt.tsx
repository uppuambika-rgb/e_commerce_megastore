import React from 'react';

interface ProductSvgArtProps {
  category: string;
  subcategory?: string;
  name: string;
  gradient: string;
  iconType: string;
  className?: string;
}

export const ProductSvgArt: React.FC<ProductSvgArtProps> = ({
  category,
  subcategory = '',
  name,
  gradient,
  iconType,
  className = '',
}) => {
  // Determine an illustration motif based on product keywords and category
  const lowerName = name.toLowerCase();

  const renderIconMotif = () => {
    // Headphones & Earbuds
    if (lowerName.includes('headphone') || lowerName.includes('earbud')) {
      return (
        <svg viewBox="0 0 120 120" className="w-24 h-24 drop-shadow-md text-white/90" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M25 60 C25 35, 95 35, 95 60" strokeLinecap="round" />
          <rect x="20" y="55" width="14" height="28" rx="7" fill="currentColor" fillOpacity="0.2" />
          <rect x="86" y="55" width="14" height="28" rx="7" fill="currentColor" fillOpacity="0.2" />
          <path d="M27 50 L27 60 M93 50 L93 60" strokeWidth="4" strokeLinecap="round" />
          <circle cx="60" cy="28" r="4" fill="currentColor" />
        </svg>
      );
    }

    // Keyboard
    if (lowerName.includes('keyboard')) {
      return (
        <svg viewBox="0 0 120 120" className="w-24 h-24 drop-shadow-md text-white/90" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="15" y="38" width="90" height="44" rx="6" fill="currentColor" fillOpacity="0.15" />
          <rect x="22" y="44" width="8" height="6" rx="1.5" fill="currentColor" fillOpacity="0.3" />
          <rect x="34" y="44" width="8" height="6" rx="1.5" fill="currentColor" fillOpacity="0.3" />
          <rect x="46" y="44" width="8" height="6" rx="1.5" fill="currentColor" fillOpacity="0.3" />
          <rect x="58" y="44" width="8" height="6" rx="1.5" fill="currentColor" fillOpacity="0.3" />
          <rect x="70" y="44" width="8" height="6" rx="1.5" fill="currentColor" fillOpacity="0.3" />
          <rect x="82" y="44" width="16" height="6" rx="1.5" fill="currentColor" fillOpacity="0.3" />
          <rect x="36" y="66" width="48" height="6" rx="2" fill="currentColor" fillOpacity="0.4" />
        </svg>
      );
    }

    // Monitor / Screen
    if (lowerName.includes('monitor') || lowerName.includes('webcam')) {
      return (
        <svg viewBox="0 0 120 120" className="w-24 h-24 drop-shadow-md text-white/90" fill="none" stroke="currentColor" strokeWidth="2.5">
          <rect x="20" y="28" width="80" height="52" rx="4" fill="currentColor" fillOpacity="0.15" />
          <line x1="60" y1="80" x2="60" y2="94" strokeWidth="4" />
          <line x1="44" y1="94" x2="76" y2="94" strokeWidth="3" strokeLinecap="round" />
          <circle cx="60" cy="34" r="2" fill="currentColor" />
        </svg>
      );
    }

    // Smartwatch / Ring
    if (lowerName.includes('watch') || lowerName.includes('ring')) {
      return (
        <svg viewBox="0 0 120 120" className="w-24 h-24 drop-shadow-md text-white/90" fill="none" stroke="currentColor" strokeWidth="2.5">
          <rect x="46" y="16" width="28" height="88" rx="6" fill="currentColor" fillOpacity="0.2" />
          <rect x="40" y="38" width="40" height="44" rx="10" fill="currentColor" fillOpacity="0.4" strokeWidth="3" />
          <circle cx="60" cy="60" r="12" strokeWidth="2" strokeDasharray="2 4" />
          <polyline points="60,54 60,60 65,63" strokeLinecap="round" />
        </svg>
      );
    }

    // Apparel: Jacket, Shirt, Overcoat
    if (category === 'Fashion & Apparel') {
      if (lowerName.includes('boot') || lowerName.includes('sneaker') || lowerName.includes('footwear')) {
        return (
          <svg viewBox="0 0 120 120" className="w-24 h-24 drop-shadow-md text-white/90" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M22 75 L38 48 C42 42, 54 44, 58 54 L72 62 L94 65 C100 66, 102 75, 96 82 L26 82 C22 82, 20 78, 22 75 Z" fill="currentColor" fillOpacity="0.2" />
            <line x1="22" y1="82" x2="98" y2="82" strokeWidth="4" strokeLinecap="round" />
            <line x1="50" y1="52" x2="64" y2="60" strokeWidth="2" />
          </svg>
        );
      }
      return (
        <svg viewBox="0 0 120 120" className="w-24 h-24 drop-shadow-md text-white/90" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M42 26 L60 38 L78 26 L98 38 L86 54 L76 48 L76 94 L44 94 L44 48 L34 54 L22 38 Z" fill="currentColor" fillOpacity="0.2" strokeLinejoin="round" />
          <line x1="60" y1="38" x2="60" y2="94" strokeWidth="2" strokeDasharray="3 3" />
        </svg>
      );
    }

    // Home: Lamp, Kettle, Vase, Stool
    if (category === 'Home & Living') {
      if (lowerName.includes('lamp') || lowerName.includes('light')) {
        return (
          <svg viewBox="0 0 120 120" className="w-24 h-24 drop-shadow-md text-white/90" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M42 46 L78 46 L68 24 L52 24 Z" fill="currentColor" fillOpacity="0.25" />
            <line x1="60" y1="46" x2="60" y2="92" strokeWidth="3" />
            <line x1="46" y1="92" x2="74" y2="92" strokeWidth="4" strokeLinecap="round" />
            <line x1="50" y1="56" x2="44" y2="66" strokeWidth="1.5" strokeOpacity="0.6" strokeDasharray="2 2" />
            <line x1="70" y1="56" x2="76" y2="66" strokeWidth="1.5" strokeOpacity="0.6" strokeDasharray="2 2" />
          </svg>
        );
      }
      if (lowerName.includes('kettle') || lowerName.includes('carafe') || lowerName.includes('pot')) {
        return (
          <svg viewBox="0 0 120 120" className="w-24 h-24 drop-shadow-md text-white/90" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M38 52 C38 40, 78 40, 78 52 L74 88 C74 92, 42 92, 42 88 Z" fill="currentColor" fillOpacity="0.2" />
            <path d="M76 56 C90 60, 90 76, 74 80" strokeWidth="3" strokeLinecap="round" />
            <path d="M38 64 C26 58, 22 46, 18 42" strokeWidth="3" strokeLinecap="round" />
            <circle cx="58" cy="38" r="4" fill="currentColor" />
          </svg>
        );
      }
      return (
        <svg viewBox="0 0 120 120" className="w-24 h-24 drop-shadow-md text-white/90" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M50 28 C50 28, 44 46, 36 60 C26 78, 38 92, 60 92 C82 92, 94 78, 84 60 C76 46, 70 28, 70 28 Z" fill="currentColor" fillOpacity="0.2" />
          <ellipse cx="60" cy="28" rx="10" ry="3" fill="currentColor" fillOpacity="0.4" />
        </svg>
      );
    }

    // Beauty: Serum, Dropper, Oil
    if (category === 'Beauty & Wellness') {
      return (
        <svg viewBox="0 0 120 120" className="w-24 h-24 drop-shadow-md text-white/90" fill="none" stroke="currentColor" strokeWidth="2.5">
          <rect x="42" y="48" width="36" height="50" rx="8" fill="currentColor" fillOpacity="0.25" />
          <rect x="50" y="34" width="20" height="14" rx="2" fill="currentColor" fillOpacity="0.4" />
          <path d="M56 34 L56 20 C56 16, 64 16, 64 20 L64 34" strokeWidth="3" strokeLinecap="round" />
          <line x1="48" y1="62" x2="72" y2="62" strokeWidth="1.5" strokeOpacity="0.7" />
          <line x1="52" y1="70" x2="68" y2="70" strokeWidth="1.5" strokeOpacity="0.7" />
        </svg>
      );
    }

    // Sports: Water bottle, Backpack, Mat
    if (category === 'Sports & Outdoors') {
      if (lowerName.includes('bottle')) {
        return (
          <svg viewBox="0 0 120 120" className="w-24 h-24 drop-shadow-md text-white/90" fill="none" stroke="currentColor" strokeWidth="2.5">
            <rect x="44" y="38" width="32" height="60" rx="6" fill="currentColor" fillOpacity="0.25" />
            <path d="M50 38 L50 24 L70 24 L70 38 Z" fill="currentColor" fillOpacity="0.4" />
            <path d="M60 16 L60 24" strokeWidth="4" strokeLinecap="round" />
            <line x1="44" y1="58" x2="76" y2="58" strokeWidth="2" strokeDasharray="4 2" />
          </svg>
        );
      }
      return (
        <svg viewBox="0 0 120 120" className="w-24 h-24 drop-shadow-md text-white/90" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M38 40 C38 28, 82 28, 82 40 L86 90 C86 94, 34 94, 34 90 Z" fill="currentColor" fillOpacity="0.25" />
          <path d="M44 48 L76 48 L76 72 L44 72 Z" fill="currentColor" fillOpacity="0.2" rx="4" />
          <path d="M50 24 C50 16, 70 16, 70 24" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );
    }

    // Audio: Microphone, Turntable, Speaker
    if (category === 'Audio & Music') {
      if (lowerName.includes('mic') || lowerName.includes('condenser')) {
        return (
          <svg viewBox="0 0 120 120" className="w-24 h-24 drop-shadow-md text-white/90" fill="none" stroke="currentColor" strokeWidth="2.5">
            <rect x="48" y="24" width="24" height="42" rx="12" fill="currentColor" fillOpacity="0.3" strokeWidth="2.5" />
            <path d="M40 50 C40 68, 80 68, 80 50" strokeWidth="3" strokeLinecap="round" />
            <line x1="60" y1="68" x2="60" y2="92" strokeWidth="3.5" />
            <line x1="46" y1="92" x2="74" y2="92" strokeWidth="4" strokeLinecap="round" />
          </svg>
        );
      }
      return (
        <svg viewBox="0 0 120 120" className="w-24 h-24 drop-shadow-md text-white/90" fill="none" stroke="currentColor" strokeWidth="2.5">
          <rect x="36" y="24" width="48" height="74" rx="6" fill="currentColor" fillOpacity="0.25" />
          <circle cx="60" cy="46" r="8" fill="currentColor" fillOpacity="0.4" />
          <circle cx="60" cy="74" r="16" fill="currentColor" fillOpacity="0.3" strokeWidth="2.5" />
        </svg>
      );
    }

    // Books & Workspace
    if (category === 'Books & Workspace') {
      return (
        <svg viewBox="0 0 120 120" className="w-24 h-24 drop-shadow-md text-white/90" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M32 30 L80 24 C84 24, 88 28, 88 32 L88 88 L40 94 C36 94, 32 90, 32 86 Z" fill="currentColor" fillOpacity="0.25" />
          <path d="M40 29 L40 94" strokeWidth="3" strokeLinecap="round" />
          <line x1="48" y1="44" x2="78" y2="40" strokeWidth="2" strokeOpacity="0.7" />
          <line x1="48" y1="54" x2="78" y2="50" strokeWidth="2" strokeOpacity="0.7" />
        </svg>
      );
    }

    // Gourmet & Coffee
    return (
      <svg viewBox="0 0 120 120" className="w-24 h-24 drop-shadow-md text-white/90" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M34 46 L86 46 L80 88 C80 94, 40 94, 40 88 Z" fill="currentColor" fillOpacity="0.25" />
        <path d="M84 54 C94 56, 94 72, 82 76" strokeWidth="3" strokeLinecap="round" />
        <path d="M48 24 Q54 34 48 42" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.6" />
        <path d="M60 22 Q66 32 60 42" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.6" />
        <path d="M72 26 Q78 34 72 42" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.6" />
      </svg>
    );
  };

  return (
    <div
      className={`relative overflow-hidden flex flex-col items-center justify-center select-none bg-gradient-to-br ${gradient} ${className}`}
    >
      {/* Subtle modern mesh overlay */}
      <div className="absolute inset-0 bg-radial from-white/10 to-transparent pointer-events-none" />

      {/* Decorative ambient blurred ring */}
      <div className="absolute w-36 h-36 rounded-full bg-white/10 blur-2xl pointer-events-none" />

      {/* Centered Primary Motif */}
      <div className="relative z-10 transform transition-transform duration-300 group-hover:scale-105">
        {renderIconMotif()}
      </div>

      {/* Subtle bottom brand tag watermark */}
      <div className="absolute bottom-2.5 inset-x-0 text-center z-10">
        <span className="text-[10px] tracking-wider uppercase font-medium text-white/50">
          {category}
        </span>
      </div>
    </div>
  );
};
