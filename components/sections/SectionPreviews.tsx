import React from 'react';
import { SectionInstance } from '@/types/builder';

export const HeaderPreview: React.FC<{ section: SectionInstance }> = ({ section }) => {
  const { settings, variant } = section;
  const isCentered = variant === 'style-b';

  return (
    <header
      style={{
        backgroundColor: settings.bg_color,
        color: settings.text_color,
        position: settings.sticky ? 'sticky' : 'relative',
        top: 0,
        zIndex: 50,
      }}
      className={`p-4 border-b border-black/5 flex items-center ${isCentered ? 'flex-col justify-center' : 'justify-between'}`}
    >
      <div className={`font-bold text-xl ${isCentered ? 'mb-2' : ''}`}>
        {settings.logo_text}
      </div>
      <nav className="flex gap-6 text-sm font-medium">
        <a href="#">Home</a>
        <a href="#">Catalog</a>
        <a href="#">Contact</a>
      </nav>
      {!isCentered && (
        <div className="flex gap-4">
          <button className="p-2">Search</button>
          <button className="p-2">Cart</button>
        </div>
      )}
    </header>
  );
};

export const HeroPreview: React.FC<{ section: SectionInstance }> = ({ section }) => {
  const { settings, variant } = section;
  const isSplit = variant === 'style-b';

  return (
    <section
      style={{
        backgroundColor: settings.bg_color,
        color: settings.text_color,
        paddingTop: `${settings.padding_top}px`,
        paddingBottom: `${settings.padding_bottom}px`,
      }}
      className={`flex items-center justify-center text-center px-6 ${isSplit ? 'md:text-left md:justify-start' : ''}`}
    >
      <div className={`max-w-4xl mx-auto ${isSplit ? 'grid md:grid-cols-2 gap-12 items-center' : ''}`}>
        <div>
          <h1 className="text-5xl font-bold mb-6 tracking-tight">{settings.heading}</h1>
          <p className="text-lg opacity-80 mb-8 max-w-2xl mx-auto md:mx-0">{settings.subheading}</p>
          <button className="px-8 py-3 bg-black text-white rounded-full font-medium hover:opacity-90 transition-opacity">
            {settings.button_text}
          </button>
        </div>
        {isSplit && (
          <div className="hidden md:block">
             <img src="https://picsum.photos/seed/hero/600/600" alt="Hero" className="rounded-2xl shadow-xl w-full" />
          </div>
        )}
      </div>
    </section>
  );
};

export const ImageBannerPreview: React.FC<{ section: SectionInstance }> = ({ section }) => {
  const { settings, variant } = section;
  const isTextBelow = variant === 'style-b';

  return (
    <section className="relative w-full">
      <div className="relative h-[500px] w-full overflow-hidden">
        <img
          src={settings.image_url}
          alt="Banner"
          className="w-full h-full object-cover"
        />
        {!isTextBelow && (
          <div
            className="absolute inset-0 flex items-center justify-center text-center p-6"
            style={{ backgroundColor: `rgba(0,0,0,${settings.overlay_opacity / 100})` }}
          >
            <div className="text-white max-w-2xl">
              <h2 className="text-4xl font-bold mb-4">{settings.heading}</h2>
              <button className="px-6 py-2 border-2 border-white text-white font-medium hover:bg-white hover:text-black transition-colors">
                Explore More
              </button>
            </div>
          </div>
        )}
      </div>
      {isTextBelow && (
        <div className="p-8 text-center bg-white">
          <h2 className="text-3xl font-bold mb-4">{settings.heading}</h2>
          <button className="px-8 py-2 bg-black text-white rounded-md">Shop Collection</button>
        </div>
      )}
    </section>
  );
};

export const ProductGridPreview: React.FC<{ section: SectionInstance }> = ({ section }) => {
  const { settings, variant } = section;
  const isSlider = variant === 'style-b';
  const columns = parseInt(settings.columns || '4');

  return (
    <section className="py-16 px-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-10 text-center">{settings.title}</h2>
      <div className={`grid gap-8 ${isSlider ? 'flex overflow-x-auto pb-4 scrollbar-hide' : ''}`}
           style={{ gridTemplateColumns: !isSlider ? `repeat(${columns}, minmax(0, 1fr))` : 'none' }}>
        {Array.from({ length: settings.products_to_show }).map((_, i) => (
          <div key={i} className={`group ${isSlider ? 'min-w-[280px]' : ''}`}>
            <div className="aspect-[3/4] bg-gray-100 rounded-xl overflow-hidden mb-4 relative">
              <img src={`https://picsum.photos/seed/prod${i}/400/500`} alt="Product" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <h3 className="font-medium text-gray-900">Premium Product {i + 1}</h3>
            <p className="text-gray-500 text-sm">$49.00</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export const FooterPreview: React.FC<{ section: SectionInstance }> = ({ section }) => {
  const { settings, variant } = section;
  const isMulti = variant === 'style-b';

  return (
    <footer
      style={{ backgroundColor: settings.bg_color, color: settings.text_color }}
      className="py-12 px-6"
    >
      <div className="max-w-7xl mx-auto">
        {isMulti && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h4 className="font-bold mb-4 uppercase text-xs tracking-widest opacity-60">Shop</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li>All Products</li>
                <li>New Arrivals</li>
                <li>Sale</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 uppercase text-xs tracking-widest opacity-60">Support</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li>Contact Us</li>
                <li>Shipping</li>
                <li>Returns</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 uppercase text-xs tracking-widest opacity-60">About</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li>Our Story</li>
                <li>Sustainability</li>
                <li>Careers</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 uppercase text-xs tracking-widest opacity-60">Newsletter</h4>
              <input type="email" placeholder="Email address" className="bg-white/10 border border-white/20 p-2 rounded w-full text-sm mb-2" />
              <button className="w-full bg-white text-black py-2 rounded text-sm font-bold">Subscribe</button>
            </div>
          </div>
        )}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm opacity-60">
          <p>{settings.copyright_text}</p>
          <div className="flex gap-6">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export const SectionPreview: React.FC<{ section: SectionInstance }> = ({ section }) => {
  switch (section.type) {
    case 'header': return <HeaderPreview section={section} />;
    case 'hero': return <HeroPreview section={section} />;
    case 'image-banner': return <ImageBannerPreview section={section} />;
    case 'product-grid': return <ProductGridPreview section={section} />;
    case 'footer': return <FooterPreview section={section} />;
    default: return null;
  }
};
