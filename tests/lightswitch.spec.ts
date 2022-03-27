import { LightSwitch } from '../themes/bdev/assets/scripts/lightswitch';
const fs = require('fs');
const feather = require('feather-icons');

describe('Lightswitch', () => {
    let component: LightSwitch;

    beforeEach(() => {
        window.document.body.innerHTML = fs.readFileSync(
            './tests/lightswitch.fixture.html'
        );

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
});
