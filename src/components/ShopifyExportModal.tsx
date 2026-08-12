import React, { useState } from 'react';
import { 
  X, 
  Download, 
  CheckCircle2, 
  Copy, 
  FileCode, 
  FolderArchive, 
  ExternalLink, 
  Store, 
  Sparkles, 
  Code2, 
  Layers,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import JSZip from 'jszip';

interface ShopifyExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ThemeFile {
  path: string;
  category: 'layout' | 'templates' | 'sections' | 'snippets' | 'assets' | 'config';
  content: string;
}

const SHOPIFY_THEME_FILES: ThemeFile[] = [
  {
    path: 'layout/theme.liquid',
    category: 'layout',
    content: `<!doctype html>
<html class="no-js" lang="{{ request.locale.iso_code }}">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <meta name="theme-color" content="#7C9F8A">
    <link rel="canonical" href="{{ canonical_url }}">

    {%- if settings.favicon != blank -%}
      <link rel="icon" type="image/png" href="{{ settings.favicon | image_url: width: 32, height: 32 }}">
    {%- endif -%}

    <title>
      {{ page_title }}
      {%- if current_tags %} &ndash; tagged "{{ current_tags | join: ', ' }}"{% endif -%}
      {%- if current_page != 1 %} &ndash; Page {{ current_page }}{% endif -%}
      {%- unless page_title contains shop.name %} &ndash; {{ shop.name }}{% endunless -%}
    </title>

    {% if page_description %}
      <meta name="description" content="{{ page_description | escape }}">
    {% endif %}

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400..700;1,400..700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">

    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
      tailwind.config = {
        theme: {
          extend: {
            colors: {
              sage: { DEFAULT: '#7C9F8A', dark: '#6A8C78', light: '#EEF4F0' },
              alabaster: '#FAF8F3',
              sand: '#F5F1E8',
              charcoal: '#212925',
              bronze: '#B7A79D',
            },
            fontFamily: {
              serif: ['Lora', 'serif'],
              sans: ['Plus Jakarta Sans', 'sans-serif'],
            },
          },
        },
      }
    </script>

    {{ 'theme.css' | asset_url | stylesheet_tag }}
    {{ content_for_header }}
  </head>

  <body class="bg-alabaster text-charcoal font-sans antialiased min-h-screen flex flex-col">
    {% section 'header' %}

    <main id="MainContent" class="content-for-layout flex-grow" role="main">
      {{ content_for_layout }}
    </main>

    {% section 'footer' %}
    {% render 'cart-drawer' %}

    <script src="{{ 'theme.js' | asset_url }}" defer="defer"></script>
  </body>
</html>`
  },
  {
    path: 'templates/index.json',
    category: 'templates',
    content: `{
  "sections": {
    "hero_slider": {
      "type": "hero-slider",
      "blocks": {
        "slide_1": {
          "type": "slide",
          "settings": {
            "badge": "Holistic Inside-Out Skincare",
            "headline_main": "As Within, ",
            "headline_highlight": "So Without.",
            "subheadline": "True skin longevity pairs wild marine collagen & 72+ bio-available trace minerals with botanical ceramide serums.",
            "button_1_text": "Take Routine Diagnostic Quiz",
            "button_1_link": "#quiz",
            "button_2_text": "Shop Radiance Systems",
            "button_2_link": "#products",
            "tag": "Dual Synergy System",
            "tag_sub": "Marine Collagen + Squalane Serum Duo",
            "discount_badge": "Save 20%"
          }
        },
        "slide_2": {
          "type": "slide",
          "settings": {
            "badge": "Bio-Available Ingestibles",
            "headline_main": "Cellular Renewal ",
            "headline_highlight": "In Every Sip.",
            "subheadline": "Unrivaled Type I & III hydrolyzed marine peptides infused with organic hyaluronic acid and fulvic trace minerals.",
            "button_1_text": "Shop Marine Peptides",
            "button_1_link": "#products",
            "button_2_text": "Take Diagnostic Quiz",
            "button_2_link": "#quiz",
            "tag": "Ingestible Elixir",
            "tag_sub": "Wild-Caught Atlantic Peptides & Minerals",
            "discount_badge": "Subscriber Favorite"
          }
        }
      },
      "block_order": ["slide_1", "slide_2"]
    },
    "inside_out_matrix": { "type": "inside-out-matrix" },
    "product_grid": { "type": "product-grid" },
    "skin_quiz": { "type": "skin-quiz" },
    "ethos_story": { "type": "ethos-story" }
  },
  "order": ["hero_slider", "inside_out_matrix", "product_grid", "skin_quiz", "ethos_story"]
}`
  },
  {
    path: 'sections/hero-slider.liquid',
    category: 'sections',
    content: `{% comment %} Hero Slider Section for Yahreah Skin - Shopify OS 2.0 {% endcomment %}
<div class="relative overflow-hidden bg-gradient-to-b from-[#F5F1E8] via-[#FAF8F3] to-[#FAF8F3] py-10 sm:py-14 md:py-20 border-b border-[#E2DBD0]/60">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
    <div class="flex items-center justify-between mb-4 text-xs text-[#5C6760]">
      <div class="flex items-center gap-2">
        <span class="font-serif font-bold text-[#7C9F8A] text-sm js-current-slide-num">01</span>
        <span>/</span>
        <span>0{{ section.blocks.size }}</span>
        <span class="font-medium text-[#212925] js-slide-badge-label">Holistic Inside-Out Skincare</span>
      </div>
      <div class="flex items-center gap-1">
        <button type="button" class="js-prev-slide w-8 h-8 rounded-full bg-white border border-[#E2DBD0]">‹</button>
        <button type="button" class="js-next-slide w-8 h-8 rounded-full bg-white border border-[#E2DBD0]">›</button>
      </div>
    </div>

    <div class="hero-slides-wrapper relative">
      {% for block in section.blocks %}
        <div class="hero-slide-item {% unless forloop.first %}hidden{% endunless %}" data-badge="{{ block.settings.badge | escape }}">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div class="lg:col-span-7 space-y-5 text-center lg:text-left">
              <span class="bg-[#EEF4F0] border border-[#7C9F8A]/30 px-4 py-1.5 rounded-full text-xs font-semibold text-[#2A3B30]">
                {{ block.settings.badge }}
              </span>
              <h1 class="font-serif text-3xl sm:text-5xl font-bold text-[#212925]">
                {{ block.settings.headline_main }} <br>
                <span class="text-[#7C9F8A] italic font-normal">{{ block.settings.headline_highlight }}</span>
              </h1>
              <p class="text-base text-[#5C6760] max-w-2xl">
                {{ block.settings.subheadline }}
              </p>
              <div class="flex gap-3">
                <a href="{{ block.settings.button_1_link }}" class="bg-[#7C9F8A] text-white px-7 py-3 rounded-full font-semibold">
                  {{ block.settings.button_1_text }}
                </a>
                <a href="{{ block.settings.button_2_link }}" class="bg-white border border-[#E2DBD0] text-[#212925] px-6 py-3 rounded-full font-semibold">
                  {{ block.settings.button_2_text }}
                </a>
              </div>
            </div>
            <div class="lg:col-span-5">
              <div class="rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/5] bg-[#E8F1F1]">
                <img src="{{ block.settings.image | image_url: width: 800 | default: 'https://images.unsplash.com/photo-1512290900673-70020192934b?q=80&w=1000' }}" alt="Yahreah" class="w-full h-full object-cover">
              </div>
            </div>
          </div>
        </div>
      {% endfor %}
    </div>
  </div>
</div>

{% schema %}
{
  "name": "Hero Showcase Slider",
  "blocks": [
    {
      "type": "slide",
      "name": "Hero Slide",
      "settings": [
        { "type": "text", "id": "badge", "label": "Tagline", "default": "Holistic Inside-Out Skincare" },
        { "type": "text", "id": "headline_main", "label": "Headline Main", "default": "As Within, " },
        { "type": "text", "id": "headline_highlight", "label": "Headline Highlight", "default": "So Without." },
        { "type": "textarea", "id": "subheadline", "label": "Subheadline", "default": "True skin longevity pairs wild marine collagen & 72+ trace minerals." },
        { "type": "text", "id": "button_1_text", "label": "Primary CTA", "default": "Take Routine Diagnostic Quiz" },
        { "type": "url", "id": "button_1_link", "label": "Primary Link" },
        { "type": "text", "id": "button_2_text", "label": "Secondary CTA", "default": "Shop Radiance Systems" },
        { "type": "url", "id": "button_2_link", "label": "Secondary Link" },
        { "type": "image_picker", "id": "image", "label": "Slide Image" }
      ]
    }
  ],
  "presets": [{ "name": "Hero Showcase Slider", "blocks": [{ "type": "slide" }, { "type": "slide" }] }]
}
{% endschema %}`
  },
  {
    path: 'sections/inside-out-matrix.liquid',
    category: 'sections',
    content: `<section class="py-16 bg-white border-b border-[#E2DBD0]" id="matrix">
  <div class="max-w-7xl mx-auto px-4 text-center space-y-4">
    <span class="text-xs uppercase tracking-widest font-bold text-[#7C9F8A]">The Dual-Action Philosophy</span>
    <h2 class="font-serif text-3xl sm:text-4xl font-bold text-[#212925]">Why Single-Method Skincare Fails</h2>
    <div class="grid md:grid-cols-2 gap-8 text-left mt-8">
      <div class="bg-[#FAF8F3] p-8 rounded-3xl border border-[#E2DBD0]">
        <h3 class="font-serif text-xl font-bold text-[#212925] mb-2">INSIDE (Ingestible Peptides)</h3>
        <p class="text-xs text-[#5C6760] leading-relaxed">Micro-milled wild marine collagen Type I & III with ionic trace minerals to stimulate collagen synthesis internally.</p>
      </div>
      <div class="bg-[#FAF8F3] p-8 rounded-3xl border border-[#E2DBD0]">
        <h3 class="font-serif text-xl font-bold text-[#212925] mb-2">OUTSIDE (Topical Serums)</h3>
        <p class="text-xs text-[#5C6760] leading-relaxed">Phyto-ceramide complexes and squalane seal transepidermal water loss and calm surface redness.</p>
      </div>
    </div>
  </div>
</section>
{% schema %} { "name": "Inside Out Matrix", "settings": [] } {% endschema %}`
  },
  {
    path: 'snippets/product-card.liquid',
    category: 'snippets',
    content: `<div class="bg-white border border-[#E2DBD0] rounded-3xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group">
  <div class="relative aspect-[4/5] overflow-hidden bg-[#F5F1E8]">
    <img src="{{ product.featured_image | default: image }}" alt="{{ product.title | default: title }}" class="w-full h-full object-cover">
    <span class="absolute top-3 left-3 bg-[#7C9F8A] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase">
      {{ badge | default: "Best Seller" }}
    </span>
  </div>
  <div class="p-5 flex-grow flex flex-col justify-between space-y-3">
    <div>
      <h3 class="font-serif font-bold text-base text-[#212925]">
        <a href="{{ product.url | default: '#' }}">{{ product.title | default: title }}</a>
      </h3>
      <p class="text-xs text-[#5C6760] mt-1 line-clamp-2">Hydrolyzed Atlantic marine collagen peptides & 72+ bio-available trace minerals.</p>
    </div>
    <div class="flex items-center justify-between pt-2 border-t border-[#E2DBD0]/60">
      <span class="font-bold text-sm text-[#212925]">{{ product.price | money | default: price }}</span>
      <button type="button" class="js-add-to-cart bg-[#7C9F8A] text-white text-xs font-semibold px-4 py-2 rounded-full">Add to Bag</button>
    </div>
  </div>
</div>`
  },
  {
    path: 'snippets/cart-drawer.liquid',
    category: 'snippets',
    content: `<div class="js-cart-drawer-backdrop fixed inset-0 z-50 bg-black/40 backdrop-blur-xs hidden">
  <div class="js-cart-drawer-panel fixed top-0 right-0 bottom-0 w-full max-w-md bg-[#FAF8F3] shadow-2xl flex flex-col transform translate-x-full transition-transform">
    <div class="p-5 border-b border-[#E2DBD0] flex items-center justify-between">
      <h3 class="font-serif font-bold text-lg text-[#212925]">Your Radiance Bag</h3>
      <button type="button" class="js-close-cart-drawer text-[#212925] font-bold">✕</button>
    </div>
    <div class="p-5 flex-grow overflow-y-auto space-y-3">
      <p class="text-xs text-[#5C6760] text-center py-8">Your bag is empty. Explore our inside-out formulations!</p>
    </div>
    <div class="p-5 border-t border-[#E2DBD0] bg-white">
      <a href="/checkout" class="w-full bg-[#7C9F8A] text-white py-3.5 rounded-full font-semibold text-center block">Checkout</a>
    </div>
  </div>
</div>`
  },
  {
    path: 'assets/theme.css',
    category: 'assets',
    content: `body { background-color: #FAF8F3; color: #212925; font-family: 'Plus Jakarta Sans', sans-serif; }
h1, h2, h3, h4, .font-serif { font-family: 'Lora', serif; }`
  },
  {
    path: 'assets/theme.js',
    category: 'assets',
    content: `document.addEventListener('DOMContentLoaded', () => {
  console.log('Yahreah Skin Shopify Theme Loaded');
});`
  },
  {
    path: 'config/settings_schema.json',
    category: 'config',
    content: `[
  {
    "name": "theme_info",
    "theme_name": "Yahreah Skin OS 2.0",
    "theme_author": "Yahreah Studio",
    "theme_version": "1.0.0"
  },
  {
    "name": "Colors",
    "settings": [
      { "type": "color", "id": "color_primary", "label": "Primary Accent", "default": "#7C9F8A" },
      { "type": "color", "id": "color_background", "label": "Background", "default": "#FAF8F3" }
    ]
  }
]`
  }
];

export const ShopifyExportModal: React.FC<ShopifyExportModalProps> = ({ isOpen, onClose }) => {
  const [selectedFile, setSelectedFile] = useState<ThemeFile>(SHOPIFY_THEME_FILES[0]);
  const [copied, setCopied] = useState(false);
  const [isZipping, setIsZipping] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!isOpen) return null;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(selectedFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadZip = async () => {
    setIsZipping(true);
    setDownloadSuccess(false);

    try {
      const zip = new JSZip();

      // Add files to zip archive
      SHOPIFY_THEME_FILES.forEach((file) => {
        zip.file(file.path, file.content);
      });

      // Add config data
      zip.file(
        'config/settings_data.json',
        JSON.stringify({ current: { color_primary: '#7C9F8A', color_background: '#FAF8F3' } }, null, 2)
      );

      const content = await zip.generateAsync({ type: 'blob' });
      
      // Trigger download
      const blobUrl = URL.createObjectURL(content);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = 'yahreah-skin-shopify-theme.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);

      setDownloadSuccess(true);
    } catch (err) {
      console.error('Failed to generate zip:', err);
    } finally {
      setIsZipping(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#FAF8F3] border border-[#E2DBD0] rounded-3xl w-full max-w-5xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Modal Header */}
        <div className="p-6 bg-white border-b border-[#E2DBD0] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#EEF4F0] text-[#7C9F8A] flex items-center justify-center font-bold text-xl shadow-xs">
              🛍️
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif font-bold text-xl text-[#212925]">
                  Shopify Theme Package Hub
                </h2>
                <span className="bg-[#7C9F8A] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  OS 2.0 Ready
                </span>
              </div>
              <p className="text-xs text-[#5C6760] mt-0.5">
                Export your Yahreah Skin storefront directly to Shopify as an Online Store 2.0 Liquid theme.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-[#5C6760] hover:text-[#212925] hover:bg-[#F5F1E8] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Banner Top */}
        <div className="bg-[#EEF4F0] px-6 py-4 border-b border-[#7C9F8A]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-xs text-[#2A3B30]">
            <FolderArchive className="w-5 h-5 text-[#7C9F8A] shrink-0" />
            <div>
              <p className="font-semibold text-sm text-[#212925]">
                Download Complete Shopify Theme Zip File
              </p>
              <p className="text-xs text-[#5C6760]">
                Includes hero slider section, product cards, inside-out matrix, and liquid OS 2.0 templates.
              </p>
            </div>
          </div>

          <button
            onClick={handleDownloadZip}
            disabled={isZipping}
            className="bg-[#7C9F8A] hover:bg-[#6a8c78] text-white font-semibold text-xs px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all inline-flex items-center justify-center gap-2 shrink-0 active:scale-95 disabled:opacity-50"
          >
            {isZipping ? (
              <span>Packaging ZIP...</span>
            ) : downloadSuccess ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-white" />
                <span>Theme ZIP Downloaded!</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Download Shopify Theme ZIP</span>
              </>
            )}
          </button>
        </div>

        {/* Modal Body - 2 Columns */}
        <div className="flex-grow grid grid-cols-1 md:grid-cols-12 overflow-hidden">
          
          {/* File Selector Sidebar */}
          <div className="md:col-span-4 bg-white border-r border-[#E2DBD0] overflow-y-auto p-4 space-y-4">
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#5C6760] block px-2">
                Shopify Theme File Architecture
              </span>
              
              {SHOPIFY_THEME_FILES.map((file) => {
                const isSelected = selectedFile.path === file.path;
                return (
                  <button
                    key={file.path}
                    onClick={() => setSelectedFile(file)}
                    className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-mono transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-[#EEF4F0] text-[#7C9F8A] font-bold border border-[#7C9F8A]/30'
                        : 'text-[#212925] hover:bg-[#FAF8F3]'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <FileCode className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{file.path}</span>
                    </div>
                    <span className="text-[9px] uppercase font-sans text-[#5C6760] bg-white px-1.5 py-0.5 rounded border border-[#E2DBD0]">
                      {file.category}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Verification Checklist */}
            <div className="pt-4 border-t border-[#E2DBD0] space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#7C9F8A] block">
                Shopify OS 2.0 Compliance
              </span>
              <ul className="space-y-1.5 text-[11px] text-[#5C6760]">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#7C9F8A]" />
                  <span>JSON index schema templates</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#7C9F8A]" />
                  <span>Responsive Hero Slider Section</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#7C9F8A]" />
                  <span>AJAX Cart Drawer Snippet</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#7C9F8A]" />
                  <span>Google Fonts & Tailwind loaded</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Code Viewer Panel */}
          <div className="md:col-span-8 bg-[#1E2421] text-[#E2DBD0] flex flex-col overflow-hidden">
            <div className="p-3 bg-[#151A18] border-b border-white/10 flex items-center justify-between text-xs font-mono text-white/80">
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-[#7C9F8A]" />
                <span>{selectedFile.path}</span>
              </div>

              <button
                onClick={handleCopyCode}
                className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded-lg text-xs transition-colors"
              >
                {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy Code'}</span>
              </button>
            </div>

            <div className="p-4 flex-grow overflow-auto font-mono text-xs leading-relaxed text-emerald-100/90 whitespace-pre">
              {selectedFile.content}
            </div>
          </div>

        </div>

        {/* Modal Footer Instructions */}
        <div className="p-4 bg-white border-t border-[#E2DBD0] flex flex-col sm:flex-row items-center justify-between text-xs text-[#5C6760] gap-2">
          <div className="flex items-center gap-2">
            <Store className="w-4 h-4 text-[#7C9F8A]" />
            <span>
              <strong>How to install in Shopify:</strong> Admin → Online Store → Themes → Add Theme → Upload zip file
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleDownloadZip}
              className="text-[#7C9F8A] font-bold hover:underline inline-flex items-center gap-1"
            >
              <span>Download ZIP Package</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
