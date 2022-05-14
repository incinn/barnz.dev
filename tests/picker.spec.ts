import fs = require('fs');
import Picker from '../themes/bdev/assets/scripts/picker';
import { fakeLocalStorage } from './helpers/store.helper';

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

    component = new Picker();
  });

  test('should create', () => {
    expect(component).toBeDefined();
  });

  describe('on init()', () => {
    test('should create picker element', () => {
      const createSpy = jest.spyOn(component, 'create');

      component.init();

      expect(createSpy).toHaveBeenCalled();
    });

    test('should not call update() if no value found in store', () => {
      jest
        .spyOn(component, 'loadValueFromStore')
        .mockImplementation(() => undefined);
      const updateSpy = jest.spyOn(component, 'update');

      component.init();

      expect(updateSpy).not.toHaveBeenCalled();
    });

    test('should call update with colour if value found in store', () => {
      const colour = '#404040';
      jest
        .spyOn(component, 'loadValueFromStore')
        .mockImplementation(() => colour);
      const updateSpy = jest.spyOn(component, 'update');

      component.init();

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

      expect(component.loadValueFromStore()).toBe(colour);
    });

    test('should return undefined if value not found in store', () => {
      expect(component.loadValueFromStore()).toBe(null);
    });

    test('setValueInStore() should set value in store', () => {
      const value = '#404040';
      component.color = value;
      component.setValueInStore();

      expect(window.localStorage.getItem('accent')).toBe(value);
    });
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
      .spyOn(component, 'setValueInStore')
      .mockImplementation();
    const colorSpy = jest.spyOn(component, 'setColour').mockImplementation();
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
