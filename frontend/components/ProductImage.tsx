import React, { useState } from 'react';
import { ProductSvgArt } from './ProductSvgArt';

interface ProductImageProps {
  imageUrl?: string;
  name: string;
  category: string;
  subcategory?: string;
  visualGradient: string;
  iconType: string;
  className?: string;
  imgClassName?: string;
}

export const ProductImage: React.FC<ProductImageProps> = ({
  imageUrl,
  name,
  category,
  subcategory,
  visualGradient,
  iconType,
  className = '',
  imgClassName = '',
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Specific real object image override for stylus pen products if needed
  const effectiveImageUrl = React.useMemo(() => {
    if (name.toLowerCase().includes('stylus pen') || name.includes('LogiPro Apex Active Stylus Pen')) {
      return imageUrl && !imageUrl.includes('photo-1585336261026')
        ? imageUrl
        : 'https://images.unsplash.com/photo-1628863353691-0071c8c1874c?w=800&auto=format&fit=crop&q=80';
    }
    return imageUrl;
  }, [imageUrl, name]);

  // If there's no imageUrl or it failed to load, fall back gracefully to the SVG motif
  if (!effectiveImageUrl || hasError) {
    return (
      <ProductSvgArt
        category={category}
        subcategory={subcategory}
        name={name}
        gradient={visualGradient}
        iconType={iconType}
        className={className}
      />
    );
  }

  return (
    <div className={`relative overflow-hidden bg-slate-100 flex items-center justify-center ${className}`}>
      {/* Subtle skeleton shimmer before load */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-slate-200 animate-pulse z-0" />
      )}

      {/* Real object photograph */}
      <img
        src={effectiveImageUrl}
        alt={name}
        loading="lazy"
        referrerPolicy="no-referrer"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`w-full h-full object-cover transition-all duration-500 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${imgClassName}`}
      />
    </div>
  );
};
