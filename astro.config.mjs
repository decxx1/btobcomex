// @ts-check
import { defineConfig, envField } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://btobcomex.com',
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [
    react(),
    sitemap({
      /** @param {any} item */
      serialize(item) {
        try {
          const url = new URL(item.url);
          const pathWithQueryAndHash = `${url.pathname}${url.search}${url.hash}`;

          item.url = `https://btobcomex.com${pathWithQueryAndHash}`;
          item.links = [
            { url: `https://btobcomex.com${pathWithQueryAndHash}`, lang: 'es' },
            { url: `https://btobcomex.com.ar${pathWithQueryAndHash}`, lang: 'es-AR' },
            { url: `https://btobcomex.cl${pathWithQueryAndHash}`, lang: 'es-CL' }
          ];
        } catch {
          // si falla el parseo de URL, dejamos el item como está
        }

        return item;
      }
    })
  ],
  env: {
    schema: {
      SECRET_KEY: envField.string({ context: "client", access: "public", optional: true }),
      SITE_KEY: envField.string({ context: "client", access: "public", optional: true }),
      ENDPOINT: envField.string({ context: "client", access: "public", optional: true }),
      CONTACT_PHONE_1: envField.string({ context: "client", access: "public", optional: true }),
      CONTACT_PHONE_2: envField.string({ context: "client", access: "public", optional: true }),
      CONTACT_EMAIL: envField.string({ context: "client", access: "public", optional: true }),
      CONTACT_WEBSITE: envField.string({ context: "client", access: "public", optional: true }),
      SOCIAL_LINKEDIN_URL: envField.string({ context: "client", access: "public", optional: true }),
      SOCIAL_INSTAGRAM_URL: envField.string({ context: "client", access: "public", optional: true }),
      SOCIAL_FACEBOOK_URL: envField.string({ context: "client", access: "public", optional: true }),
      SOCIAL_WHATSAPP_URL: envField.string({ context: "client", access: "public", optional: true }),
      CONTACT_ADDRESS_1: envField.string({ context: "client", access: "public", optional: true }),
      CONTACT_ADDRESS_2: envField.string({ context: "client", access: "public", optional: true }),
    }
  }
});