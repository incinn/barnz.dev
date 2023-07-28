import fs = require('fs');
import Picker from '../themes/bdev/assets/scripts/plugins/picker';
import { fakeLocalStorage } from './helpers/store.helper';
import feather from 'feather-icons';
import i18next from 'i18next';

describe('Accent picker', () => {
  let component: Picker;

  beforeEach(() => {
    window.document.body.innerHTML = fs
      .readFileSync('./tests/picker.fixture.html')
      .toString();

    Object.defineProperty(window, 'localStorage', {
      value: fakeLocalStorage,
    });

    const location = window.location;
    delete window.location;
    window.location = {
      ...location,
      reload: jest.fn(),
    };

    component = new Picker(jest.mocked(i18next), jest.mocked(feather));
  });

  test('should create', () => {
    expect(component).toBeDefined();
  });

  describe('on init()', () => {
    test('should create picker element', async () => {
      const createSpy = jest.spyOn(component, 'create');

      await component.init();

      expect(createSpy).toHaveBeenCalled();
    });

    test('should not call update() if no value found in store', async () => {
      jest
        .spyOn(component, 'loadAccentFromStore')
        .mockImplementation(() => undefined);
      const updateSpy = jest.spyOn(component, 'update');

      await component.init();

      expect(updateSpy).not.toHaveBeenCalled();
    });

    test('should call update with colour if value found in store', async () => {
      const colour = '#404040';
      jest
        .spyOn(component, 'loadAccentFromStore')
        .mockImplementation(() => colour);
      const updateSpy = jest.spyOn(component, 'update');

      await component.init();

      expect(updateSpy).toHaveBeenCalledWith(colour);
    });
  });

  describe('store actions', () => {
    beforeEach(() => {
      window.localStorage.clear();
    });

    test('should return value from store', () => {
      const colour = '#404040';
      window.localStorage.setItem('accent', colour);

      expect(component.loadAccentFromStore()).toBe(colour);
    });

    test('should return undefined if value not found in store', () => {
      expect(component.loadAccentFromStore()).toBe(null);
    });

    test('updateStore() should set accent values in store', () => {
      const accent = '#404040';
      const accentAlt = '#f5f5f5';
      component.color = accent;
      component.colorAlt = accentAlt;

      component.updateStore();

      expect(window.localStorage.getItem('accent')).toBe(accent);
      expect(window.localStorage.getItem('accent-alt')).toBe(accentAlt);
    });
  });

  test('createTitle() should create correctly formatted title', () => {
    const result = component.createTitle('test #000000');

    expect(result.outerHTML).toBe(`<h2>test <span class="picker__titleColor">#000000</span></h2>`);
  });

  test('reset() should empty store and reload page', () => {
    const spy = jest.spyOn(window.location, 'reload');
    window.localStorage.setItem('accent', '#404040');

    component.reset();
    expect(spy).toHaveBeenCalled();
    expect(window.localStorage.getItem('accent')).toBeNull();
  });

  test('update() should set color property and call other methods', () => {
    const storeSpy = jest
      .spyOn(component, 'updateStore')
      // .mockImplementation();
    const colorSpy = jest.spyOn(component, 'setColor').mockImplementation();
    const textSpy = jest.spyOn(component, 'updateText').mockImplementation();

    const colour = '#404040';
    component.update(colour);

    expect(storeSpy).toHaveBeenCalled();
    expect(colorSpy).toHaveBeenCalled();
    expect(textSpy).toHaveBeenCalled();
    expect(component.color).toBe(colour);
  });

  test('hex to rgb', () => {
    const hex = '#404040';
    const rgb = [64, 64, 64];

    expect(component.hexToRgb(hex)).toStrictEqual(rgb);
  });
});
