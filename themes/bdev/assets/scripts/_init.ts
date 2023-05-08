import i18next from 'i18next';
import Website from './website';
import LanguageDetector from 'i18next-browser-languagedetector';

document.addEventListener('DOMContentLoaded', () => {
  i18next.use(LanguageDetector).init({
    fallbackLng: 'en',
    detection: {
      order: ['htmlTag'],
    },
    resources: {
      en: {
        translation: {
          lightswitch: {
            optionsLabelTitle: 'Light mode',
            optionsLabelDesc: 'For those scared of the dark',
          },
        },
      },
      nl: {
        translation: {
          lightswitch: {
            optionsLabelTitle: 'Lichte modus',
            optionsLabelDesc: 'Voor wie bang is in het donker',
          },
        },
      },
      fr: {
        translation: {
          lightswitch: {
            optionsLabelTitle: 'Light mode',
            optionsLabelDesc: 'Pour ceux qui ont peur du noir',
          },
        },
      },
    },
  });

  new Website();
});
