import { SectionInstance, SettingSchema } from '@/types/builder';
import { SECTION_REGISTRY } from '@/lib/sectionRegistry';

const mapToShopifyType = (type: string) => {
  switch (type) {
    case 'text': return 'text';
    case 'textarea': return 'textarea';
    case 'color': return 'color_background';
    case 'number': return 'number';
    case 'range': return 'range';
    case 'image_picker': return 'image_picker';
    case 'checkbox': return 'checkbox';
    case 'select': return 'select';
    default: return 'text';
  }
};

export const generateLiquidSection = (section: SectionInstance) => {
  const definition = SECTION_REGISTRY[section.type];
  if (!definition) return '';

  const schemaSettings = definition.settings.map((s) => {
    const shopifySetting: any = {
      type: mapToShopifyType(s.type),
      id: s.id,
      label: s.label,
      default: s.default,
    };

    if (s.type === 'range') {
      shopifySetting.min = s.min;
      shopifySetting.max = s.max;
      shopifySetting.step = s.step;
      shopifySetting.unit = s.unit;
    }

    if (s.type === 'select') {
      shopifySetting.options = s.options;
    }

    return shopifySetting;
  });

  const schema = {
    name: definition.name,
    tag: 'section',
    class: `section-${section.type}`,
    settings: schemaSettings,
    presets: [
      {
        name: definition.name,
      },
    ],
  };

  // Basic Liquid Template Generation based on type
  let liquidBody = '';

  switch (section.type) {
    case 'header':
      liquidBody = `
        <header class="header-{{ section.id }} {% if section.settings.sticky %}sticky{% endif %}">
          <div class="header-container">
            <div class="logo">{{ section.settings.logo_text }}</div>
            <nav>
              <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/collections/all">Catalog</a></li>
              </ul>
            </nav>
          </div>
        </header>
        <style>
          .header-{{ section.id }} {
            background: {{ section.settings.bg_color }};
            color: {{ section.settings.text_color }};
            padding: 20px;
          }
          .header-{{ section.id }}.sticky {
            position: sticky;
            top: 0;
            z-index: 100;
          }
        </style>
      `;
      break;
    case 'hero':
      liquidBody = `
        <section class="hero-{{ section.id }}">
          <div class="hero-content">
            <h1>{{ section.settings.heading }}</h1>
            <p>{{ section.settings.subheading }}</p>
            <a href="#" class="button">{{ section.settings.button_text }}</a>
          </div>
        </section>
        <style>
          .hero-{{ section.id }} {
            background: {{ section.settings.bg_color }};
            color: {{ section.settings.text_color }};
            padding-top: {{ section.settings.padding_top }}px;
            padding-bottom: {{ section.settings.padding_bottom }}px;
            text-align: center;
          }
        </style>
      `;
      break;
    case 'image-banner':
      liquidBody = `
        <section class="banner-{{ section.id }}">
          <div class="banner-image">
            {% if section.settings.image_url != blank %}
              <img src="{{ section.settings.image_url }}" alt="{{ section.settings.heading }}">
            {% endif %}
            <div class="banner-overlay" style="background: rgba(0,0,0, {{ section.settings.overlay_opacity | divided_by: 100.0 }})">
              <h2>{{ section.settings.heading }}</h2>
            </div>
          </div>
        </section>
        <style>
          .banner-{{ section.id }} { position: relative; }
          .banner-image img { width: 100%; height: auto; display: block; }
          .banner-overlay { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; color: white; }
        </style>
      `;
      break;
    case 'product-grid':
      liquidBody = `
        <section class="product-grid-{{ section.id }}">
          <h2>{{ section.settings.title }}</h2>
          <div class="grid grid-{{ section.settings.columns }}">
            {% for i in (1..section.settings.products_to_show) %}
              <div class="product-card">
                <div class="product-image" style="background: #eee; aspect-ratio: 3/4;"></div>
                <h3>Product Title {{ i }}</h3>
                <p>$49.00</p>
              </div>
            {% endfor %}
          </div>
        </section>
        <style>
          .product-grid-{{ section.id }} { padding: 40px 20px; text-align: center; }
          .grid { display: grid; gap: 20px; }
          .grid-2 { grid-template-columns: 1fr 1fr; }
          .grid-3 { grid-template-columns: 1fr 1fr 1fr; }
          .grid-4 { grid-template-columns: 1fr 1fr 1fr 1fr; }
        </style>
      `;
      break;
    case 'footer':
      liquidBody = `
        <footer class="footer-{{ section.id }}">
          <div class="footer-container">
            <p>{{ section.settings.copyright_text }}</p>
          </div>
        </footer>
        <style>
          .footer-{{ section.id }} {
            background: {{ section.settings.bg_color }};
            color: {{ section.settings.text_color }};
            padding: 40px 20px;
            text-align: center;
          }
        </style>
      `;
      break;
  }

  return `
${liquidBody}

{% schema %}
${JSON.stringify(schema, null, 2)}
{% endschema %}
  `;
};
