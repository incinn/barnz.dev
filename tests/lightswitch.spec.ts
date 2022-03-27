import { LightSwitch } from '../themes/bdev/assets/scripts/lightswitch';
import fs = require('fs');
import feather = require('feather-icons');

describe('Lightswitch should not load if', () => {
  const consoleSpy = jest.spyOn(console, 'error');

  beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    consoleSpy.mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('no navigation item found', () => {
    new LightSwitch();
    expect(consoleSpy).toHaveBeenCalled();
  });
});

describe('Lightswitch', () => {
  let component: LightSwitch;

  beforeEach(() => {
    window.document.body.innerHTML = fs.readFileSync(
      './tests/lightswitch.fixture.html',
    ).toString();

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
      JSON.stringify(component.switchEl),
    );
  });

  test('createSwitch() should create the default switch element', () => {
    const expected = document.createElement('button');
    expected.classList.add('lightSwitch');
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
