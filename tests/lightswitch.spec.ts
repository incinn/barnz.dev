import LightSwitch from '../themes/bdev/assets/scripts/lightswitch';
import fs = require('fs');
import feather = require('feather-icons');
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
    new LightSwitch();
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
    const spy = jest.spyOn(console, 'error');

    expect(component).toBeDefined();
    expect(spy).not.toHaveBeenCalled();
  });

  test('init() should set up the switch', () => {
    const createSwitchSpy = jest.spyOn(component, 'createSwitch');
    const setToggleSpy = jest.spyOn(component, 'setToggleIcon');
    const setThemeAttrSpy = jest.spyOn(component, 'setThemeAttr');

    component.init();

    expect(createSwitchSpy).toHaveBeenCalled();
    expect(setToggleSpy).toHaveBeenCalled();
    expect(setThemeAttrSpy).toHaveBeenCalled();

    expect(JSON.stringify(component.navEl)).toContain(
      JSON.stringify(component.switchEl)
    );
  });

  describe('save theme', () => {
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

      component.setToggleIcon = jest.fn().mockImplementation();
      component.setThemeAttr = jest.fn().mockImplementation();
      component.handleToggle = jest.fn().mockImplementation();

      window.localStorage.setItem('theme', '');
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    test('should check user preferred theme if nothing saved in localStorage', () => {
      const matchMediaSpy = jest.spyOn(window, 'matchMedia');

      component.setTheme();

      expect(matchMediaSpy).toHaveBeenCalledWith(
        '(prefers-color-scheme: dark)'
      );
    });

    test('should not check preferred theme if localstorage has theme value', () => {
      window.localStorage.setItem('theme', 'light');
      const matchMediaSpy = jest.spyOn(window, 'matchMedia');

      component.setTheme();

      expect(matchMediaSpy).not.toHaveBeenCalled();
    });

    test('should call handleToggle if required theme is not current theme', () => {
      window.localStorage.setItem('theme', 'dark');
      const handleToggleSpy = jest.spyOn(component, 'handleToggle');
      component.toggle = true;

      component.setTheme();

      expect(handleToggleSpy).toHaveBeenCalled();
    });

    test('should make sure toggle and theme attribute are correct if req theme matches current theme', () => {
      window.localStorage.setItem('theme', 'light');
      const toggleIconSpy = jest.spyOn(component, 'setToggleIcon');
      const attrSpy = jest.spyOn(component, 'setThemeAttr');

      component.setTheme();

      expect(toggleIconSpy).toHaveBeenCalled();
      expect(attrSpy).toHaveBeenCalled();
    });
  });

  test('createSwitch() should create the default switch element', () => {
    const expected = document.createElement('button');
    expected.classList.add('lightSwitch');
    expected.setAttribute('aria-label', 'Toggle between light and dark mode');
    expected.innerHTML = feather.icons.sun.toSvg();

    const actual = component.createSwitch();
    expect(actual).toStrictEqual(expected);
  });

  test('handleToggle() should toggle correctly', () => {
    const setToggleIconSpy = jest
      .spyOn(component, 'setToggleIcon')
      .mockImplementation();
    const setThemeAttrSpy = jest
      .spyOn(component, 'setThemeAttr')
      .mockImplementation();

    component.toggle = false;
    component.handleToggle();

    expect(component.toggle).toBeTruthy();
    expect(setToggleIconSpy).toHaveBeenCalled();
    expect(setThemeAttrSpy).toHaveBeenCalled();
  });

  test('setToggleIcon() should set the correct icon', () => {
    component.switchEl = component.createSwitch();

    component.toggle = true;
    component.setToggleIcon();
    expect(component.switchEl.innerHTML).toContain('sun');

    component.toggle = false;
    component.setToggleIcon();
    expect(component.switchEl.innerHTML).toContain('moon');
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

