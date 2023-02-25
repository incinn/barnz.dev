import fs = require('fs');
import LightSwitch from '../themes/bdev/assets/scripts/plugins/lightswitch';
import { fakeLocalStorage } from './helpers/store.helper';

describe('Lightswitch should not load if', () => {
  const consoleSpy = jest.spyOn(console, 'error');

  beforeEach(() => {
    consoleSpy.mockImplementation();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('no navigation item found', () => {
    const x = new LightSwitch();
    x.init();

    expect(consoleSpy).toHaveBeenCalledWith('LightSwitch unable to start');
  });
});

describe('Lightswitch', () => {
  let component: LightSwitch;

  beforeEach(() => {
    window.document.body.innerHTML = fs
      .readFileSync('./tests/lightswitch.fixture.html')
      .toString();

    component = new LightSwitch();
  });

  test('should create', () => {
    const consoleSpy = jest.spyOn(console, 'error');

    expect(component).toBeDefined();
    expect(consoleSpy).not.toHaveBeenCalled();
  });

  test('init() should create and inject the switch', () => {
    const createSwitchSpy = jest.spyOn(component, 'createSwitch');
    const setDefaultThemeSpy = jest.spyOn(component, 'setDefaultTheme');

    component.init();

    expect(createSwitchSpy).toHaveBeenCalled();
    expect(setDefaultThemeSpy).toHaveBeenCalled();

    expect(JSON.stringify(component.wrapper)).toContain(
      JSON.stringify(component.inputEl)
    );
  });

  describe('save theme to browser local storage', () => {
    beforeEach(() => {
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation((query) => ({
          matches: false,
          media: query,
          onchange: null,
          addListener: jest.fn(),
          removeListener: jest.fn(),
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
          dispatchEvent: jest.fn(),
        })),
      });

      Object.defineProperty(window, 'localStorage', {
        value: fakeLocalStorage,
      });

      component.setThemeAttr = jest.fn().mockImplementation();
      component.handleToggle = jest.fn().mockImplementation();

      window.localStorage.setItem('theme', '');
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    test('should check user preferred theme if nothing saved in localStorage', () => {
      window.localStorage.setItem('theme', '');
      const matchMediaSpy = jest.spyOn(window, 'matchMedia');

      component.setDefaultTheme();

      expect(matchMediaSpy).toHaveBeenCalledWith(
        '(prefers-color-scheme: dark)'
      );
    });

    test('should not check preferred theme if localstorage has theme value', () => {
      window.localStorage.setItem('theme', 'light');
      const matchMediaSpy = jest.spyOn(window, 'matchMedia');

      component.setDefaultTheme();

      expect(matchMediaSpy).not.toHaveBeenCalled();
    });

    test('should call handleToggle if required theme is not current theme', () => {
      window.localStorage.setItem('theme', 'dark');
      const handleToggleSpy = jest.spyOn(component, 'handleToggle');
      component.toggle = true;

      component.setDefaultTheme();

      expect(handleToggleSpy).toHaveBeenCalled();
    });

    test('should make sure toggle and theme attribute are correct if req theme matches current theme', () => {
      window.localStorage.setItem('theme', 'light');
      const attrSpy = jest.spyOn(component, 'setDefaultTheme');

      component.setDefaultTheme();

      expect(attrSpy).toHaveBeenCalled();
    });
  });

  test('createSwitch() should create the default switch element', () => {
    const expected = document.createElement('label');
    expected.classList.add('switch');

    const actual = component.createSwitch();
    expect(JSON.stringify(actual)).toContain(JSON.stringify(expected));
  });

  test('handleToggle() should set toggle correctly', () => {
    const switchEl = component.createSwitch();
    const inputEl: HTMLInputElement = switchEl.querySelector(
      'input[type=checkbox]'
    );

    component.inputEl = inputEl;
    component.toggle = false;
    inputEl.checked = true;

    component.handleToggle();

    expect(inputEl.checked).toBe(false);

    component.toggle = true;
    component.handleToggle();

    expect(inputEl.checked).toBe(true);
  });

  test('setThemeAttr() should set the correct document data attribute for the theme', () => {
    component.toggle = true;
    component.setThemeAttr();
    expect(document.documentElement.dataset.theme).toBe('light');

    component.toggle = false;
    component.setThemeAttr();
    expect(document.documentElement.dataset.theme).toBe('dark');
  });
});
