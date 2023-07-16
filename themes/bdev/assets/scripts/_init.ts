import i18next from 'i18next';
import Website from './website';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

document.addEventListener('DOMContentLoaded', async () => {
  await i18next
    .use(LanguageDetector)
    .use(Backend)
    .init({
      debug: true,
      fallbackLng: 'en',
      detection: {
        order: ['htmlTag'],
      },
      backend: {
        loadPath: `/locales/{{lng}}/{{ns}}.json`
      }
    });

  new Website();
});
