import { SectionDefinition } from "@/types/builder";

export const SECTION_REGISTRY: Record<string, SectionDefinition> = {
  header: {
    type: "header",
    name: "Header",
    variants: [
      { id: "style-a", name: "Standard" },
      { id: "style-b", name: "Centered" },
    ],
    settings: [
      { id: "logo_text", type: "text", label: "Logo Text", default: "My Store" },
      { id: "bg_color", type: "color", label: "Background Color", default: "#ffffff" },
      { id: "text_color", type: "color", label: "Text Color", default: "#000000" },
      { id: "sticky", type: "checkbox", label: "Sticky Header", default: false },
    ],
  },
  hero: {
    type: "hero",
    name: "Hero",
    variants: [
      { id: "style-a", name: "Full Width" },
      { id: "style-b", name: "Split Screen" },
    ],
    settings: [
      { id: "heading", type: "text", label: "Heading", default: "Welcome to our store" },
      { id: "subheading", type: "textarea", label: "Subheading", default: "Discover our latest collections." },
      { id: "button_text", type: "text", label: "Button Text", default: "Shop Now" },
      { id: "bg_color", type: "color", label: "Background Color", default: "#f4f4f4" },
      { id: "text_color", type: "color", label: "Text Color", default: "#000000" },
      { id: "padding_top", type: "range", label: "Padding Top", default: 80, min: 0, max: 200, step: 10, unit: "px" },
      { id: "padding_bottom", type: "range", label: "Padding Bottom", default: 80, min: 0, max: 200, step: 10, unit: "px" },
    ],
  },
  "image-banner": {
    type: "image-banner",
    name: "Image Banner",
    variants: [
      { id: "style-a", name: "Overlay" },
      { id: "style-b", name: "Text Below" },
    ],
    settings: [
      { id: "image_url", type: "image_picker", label: "Banner Image", default: "https://picsum.photos/seed/banner/1200/600" },
      { id: "heading", type: "text", label: "Heading", default: "Season Sale" },
      { id: "overlay_opacity", type: "range", label: "Overlay Opacity", default: 30, min: 0, max: 100, step: 5, unit: "%" },
    ],
  },
  "product-grid": {
    type: "product-grid",
    name: "Product Grid",
    variants: [
      { id: "style-a", name: "Grid" },
      { id: "style-b", name: "Slider" },
    ],
    settings: [
      { id: "title", type: "text", label: "Title", default: "Featured Products" },
      { id: "products_to_show", type: "range", label: "Products to show", default: 4, min: 2, max: 12, step: 1 },
      { id: "columns", type: "select", label: "Columns", default: "4", options: [
        { label: "2", value: "2" },
        { label: "3", value: "3" },
        { label: "4", value: "4" },
      ]},
    ],
  },
  footer: {
    type: "footer",
    name: "Footer",
    variants: [
      { id: "style-a", name: "Simple" },
      { id: "style-b", name: "Multi-column" },
    ],
    settings: [
      { id: "copyright_text", type: "text", label: "Copyright Text", default: "© 2024, My Store" },
      { id: "bg_color", type: "color", label: "Background Color", default: "#111111" },
      { id: "text_color", type: "color", label: "Text Color", default: "#ffffff" },
    ],
  },
};
