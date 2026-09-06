import { useEffect } from 'react';

/**
 * Lightweight native SEO component that updates document head tags
 * without requiring external dependencies (like react-helmet).
 * Built with full error boundary and type-safe guards.
 */
export default function SEO({
  title,
  description,
  canonical,
  ogImage,
  ogType = 'website',
  schemaJson,
  keywords
}) {
  useEffect(() => {
    try {
      // 1. Update Title
      const siteTitle = 'Smart Kids Toys Pakistan';
      const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
      document.title = fullTitle;

      // Helper to set or update meta tag by name or property
      const setMeta = (attrName, attrValue, content) => {
        if (!content || typeof content !== 'string') return;
        try {
          let el = document.querySelector(`meta[${attrName}="${attrValue}"]`);
          if (!el) {
            el = document.createElement('meta');
            el.setAttribute(attrName, attrValue);
            document.head.appendChild(el);
          }
          el.setAttribute('content', content);
        } catch (e) {}
      };

      // Helper to set or update link tag
      const setLink = (rel, href) => {
        if (!href || typeof href !== 'string') return;
        try {
          let el = document.querySelector(`link[rel="${rel}"]`);
          if (!el) {
            el = document.createElement('link');
            el.setAttribute('rel', rel);
            document.head.appendChild(el);
          }
          el.setAttribute('href', href);
        } catch (e) {}
      };

      // 2. Standard Meta
      if (description) setMeta('name', 'description', String(description));
      if (keywords) setMeta('name', 'keywords', String(keywords));

      // 3. Canonical Link
      const currentUrl = (typeof canonical === 'string' && canonical) ? canonical : window.location.href;
      setLink('canonical', currentUrl);

      // 4. OpenGraph
      setMeta('property', 'og:title', String(title || siteTitle));
      if (description) setMeta('property', 'og:description', String(description));
      setMeta('property', 'og:type', ogType);
      setMeta('property', 'og:url', currentUrl);
      setMeta('property', 'og:site_name', 'Smart Kids Toys');
      if (typeof ogImage === 'string' && ogImage.trim()) {
        const fullImg = ogImage.startsWith('http') ? ogImage : `${window.location.origin}${ogImage}`;
        setMeta('property', 'og:image', fullImg);
      }

      // 5. Twitter Cards
      setMeta('name', 'twitter:card', 'summary_large_image');
      setMeta('name', 'twitter:title', String(title || siteTitle));
      if (description) setMeta('name', 'twitter:description', String(description));
      if (typeof ogImage === 'string' && ogImage.trim()) {
        const fullImg = ogImage.startsWith('http') ? ogImage : `${window.location.origin}${ogImage}`;
        setMeta('name', 'twitter:image', fullImg);
      }

      // 6. JSON-LD Schema.org Structured Data
      let scriptTag = document.getElementById('dynamic-seo-schema');
      if (schemaJson) {
        try {
          const jsonText = typeof schemaJson === 'string' ? schemaJson : JSON.stringify(schemaJson);
          if (!scriptTag) {
            scriptTag = document.createElement('script');
            scriptTag.id = 'dynamic-seo-schema';
            scriptTag.type = 'application/ld+json';
            document.head.appendChild(scriptTag);
          }
          scriptTag.textContent = jsonText;
        } catch (err) {
          console.warn('SEO Schema stringify notice:', err);
        }
      } else if (scriptTag) {
        scriptTag.remove();
      }
    } catch (err) {
      console.warn('SEO setup notice:', err);
    }

    // Cleanup on unmount
    return () => {
      try {
        const activeScript = document.getElementById('dynamic-seo-schema');
        if (activeScript) activeScript.remove();
      } catch (e) {}
    };
  }, [title, description, canonical, ogImage, ogType, JSON.stringify(schemaJson || {}), keywords]);

  return null;
}
