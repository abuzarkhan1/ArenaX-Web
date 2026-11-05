import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  keywords?: string;
  schema?: object;
}

function updateOrCreateMeta(
  selector: string,
  contentAttr: string,
  value: string,
  fallbackAttrs?: { tag?: string; [key: string]: string | undefined }
) {
  let el = document.querySelector(selector);
  if (!el && fallbackAttrs) {
    const tagName = fallbackAttrs.tag || 'meta';
    el = document.createElement(tagName);
    Object.entries(fallbackAttrs).forEach(([k, v]) => {
      if (k !== 'tag' && v !== undefined) {
        el!.setAttribute(k, v);
      }
    });
    document.head.appendChild(el);
  }
  if (el) {
    el.setAttribute(contentAttr, value);
  }
}

export function SEO({ title, description, canonical, ogImage, keywords, schema }: SEOProps) {
  const schemaStr = schema ? JSON.stringify(schema) : '';

  useEffect(() => {
    document.title = title;

    // Title metas
    updateOrCreateMeta('meta[name="title"]', 'content', title, { name: 'title' });
    updateOrCreateMeta('meta[property="og:title"]', 'content', title, { property: 'og:title' });
    updateOrCreateMeta('meta[name="twitter:title"]', 'content', title, { name: 'twitter:title' });

    // Description metas
    updateOrCreateMeta('meta[name="description"]', 'content', description, { name: 'description' });
    updateOrCreateMeta('meta[property="og:description"]', 'content', description, { property: 'og:description' });
    updateOrCreateMeta('meta[name="twitter:description"]', 'content', description, { name: 'twitter:description' });

    // Keywords
    if (keywords) {
      updateOrCreateMeta('meta[name="keywords"]', 'content', keywords, { name: 'keywords' });
    }

    // Canonical & URL synchronization
    if (canonical) {
      updateOrCreateMeta('link[rel="canonical"]', 'href', canonical, { tag: 'link', rel: 'canonical' });
      updateOrCreateMeta('meta[property="og:url"]', 'content', canonical, { property: 'og:url' });
      updateOrCreateMeta('meta[name="twitter:url"]', 'content', canonical, { name: 'twitter:url' });
    }

    // Social image synchronization
    if (ogImage) {
      updateOrCreateMeta('meta[property="og:image"]', 'content', ogImage, { property: 'og:image' });
      updateOrCreateMeta('meta[name="twitter:image"]', 'content', ogImage, { name: 'twitter:image' });
    }

    // Dynamic JSON-LD schema
    if (schemaStr) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = schemaStr;
      script.id = 'page-schema';
      document.head.appendChild(script);

      return () => {
        const existingScript = document.getElementById('page-schema');
        if (existingScript) {
          existingScript.remove();
        }
      };
    }
  }, [title, description, canonical, ogImage, keywords, schemaStr]);

  return null;
}
