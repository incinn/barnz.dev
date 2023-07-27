import i18next from 'i18next';
import ResponsiveHelpers from './helpers/responsive.helpers';
import LoadPluginsPayload from './interfaces/loadPlugins.event';
import Plugin from './plugin';
import LightSwitch from './plugins/lightswitch';
import TextDecode from './plugins/textDecode';
import TranslationCredit from './plugins/translationCredit';

export default class Website {
  corePlugins: Plugin[] = [];
  responsiveHelpers: ResponsiveHelpers;

  constructor() {
    this.responsiveHelpers = new ResponsiveHelpers();
    this.corePlugins = [
      new LightSwitch(),
      new TextDecode(),
      new TranslationCredit()
    ];

    this.init();
  }

  init(): void {
    this.removeNoJsClass();
    this.corePlugins.forEach(async (plugin: Plugin) => await plugin.init());

    this.loadAdditionalPlugins();
    this.introAnimation();
    this.handleResetAllButton();
  }

  loadAdditionalPlugins(): void {
    document.dispatchEvent(new CustomEvent<LoadPluginsPayload>('loadPlugins', {
      detail: {
        translation: i18next,
        responsive: this.responsiveHelpers
      }
    }));
    console.log('LOADPLUGINS EVENT');
  }

  removeNoJsClass(): void {
    const bodyEl = document.querySelector('body');
    bodyEl.classList.remove('no-js');
  }

  resetAll(): void {
    this.corePlugins.forEach((plugin: Plugin) => plugin.reset());
    document.dispatchEvent(new CustomEvent('pluginReset'));
  }

  handleResetAllButton(): void {
    const button = document.getElementById('js-plugin-reset-all');
    if (!button) {
      console.error('Unable to find reset all button');
      return;
    }

    button.addEventListener('click', () => this.resetAll());
  }

  introAnimation(): void {
    const animationRun = localStorage.getItem('introAnimation');
    if (animationRun) return;

    const header = document.querySelector('header.header > div');
    const blurbTitle = document.querySelector(
      'main article.blurb .blurb__inner h1'
    );
    const blurbSubTitle = document.querySelector(
      'main article.blurb .blurb__inner p'
    );
    const blurbMoreButton = document.querySelector(
      'main article.blurb a.blurb__more'
    );
    if (!header || !blurbTitle || !blurbSubTitle || !blurbMoreButton) return;

    const elements = [header, blurbTitle, blurbSubTitle, blurbMoreButton];
    elements.forEach((el: Element) => el.classList.add('animation-hide'));

    const cleanup = () => {
      elements.forEach((el: Element) => {
        el.classList.remove('animation', 'animation-hide', 'animation-fadeIn');
      });
    };

    const fadeIn = (el: Element) => {
      el.classList.remove('animation-hide');
      el.classList.add('animation-fadeIn');
    };

    setTimeout(() => {
      fadeIn(blurbTitle);
      fadeIn(blurbSubTitle);
    }, 100);
    setTimeout(() => {
      fadeIn(header);
      fadeIn(blurbMoreButton);
    }, 2500);
    setTimeout(() => cleanup(), 3000);

    localStorage.setItem('introAnimation', 'true');
  }
}
