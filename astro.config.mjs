// @ts-check
import { defineConfig, envField } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [react()],
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