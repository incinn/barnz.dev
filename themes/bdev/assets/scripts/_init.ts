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
          test: 'test',
          lightswitch: {
            optionsLabelTitle: 'Light mode',
            optionsLabelDesc: 'For those scared of the dark',
          },
          picker: {
            title: {
              hate: "Don't like",
            },
            description:
              'Select an accent colour below, or choose your own with the picker on the right.',
            disclaimer:
              'Changing the accent colour may impact readability in some areas.',
            resetTitle: 'Eww! Put it back to how it was!',
          },
        },
      },
      nl: {
        translation: {
          lightswitch: {
            optionsLabelTitle: 'Lichte modus',
            optionsLabelDesc: 'Voor wie bang is in het donker',
          },
          picker: {
            title: {
              hate: '',
            },
            description: '',
            disclaimer: '',
            resetTitle: '',
          },
        },
      },
      fr: {
        translation: {
          lightswitch: {
            optionsLabelTitle: 'Light mode',
            optionsLabelDesc: 'Pour ceux qui ont peur du noir',
          },
          picker: {
            title: {
              hate: '',
            },
            description: '',
            disclaimer: '',
            resetTitle: '',
          },
        },
      },
    },
  });

  new Website();
});
