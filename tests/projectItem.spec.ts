import ResponsiveHelpers from '../themes/bdev/assets/scripts/helpers/responsive.helpers';
import ProjectItemEffect from '../themes/bdev/assets/scripts/projectItem';

describe('Project item', () => {
  let rh: ResponsiveHelpers;
  let component: ProjectItemEffect;

  beforeEach(() => {
    rh = new ResponsiveHelpers();

    component = new ProjectItemEffect(rh);
  });

  test('should create', () => {
    expect(component).toBeDefined();
  });

  describe('shouldHideEffect()', () => {
    it('should return true if detected as mobile', () => {
      jest.spyOn(rh, 'isMobile').mockImplementation(() => true);

      expect(component.shouldHideEffect()).toBe(true);
    });

    it('should return true if detected as a tablet', () => {
      jest.spyOn(rh, 'isTablet').mockImplementation(() => true);

      expect(component.shouldHideEffect()).toBe(true);
    });

    it('should return false if not detected as a mobile or tablet', () => {
      jest.spyOn(rh, 'isMobile').mockImplementation(() => false);
      jest.spyOn(rh, 'isTablet').mockImplementation(() => false);

      expect(component.shouldHideEffect()).toBe(false);
    });
  });

  describe('reset()', () => {
    let el: HTMLElement;

    beforeEach(() => {
      el = document.createElement('div');
    });

    it('should remove style attribute from element', () => {
      el.style.transform = 'scale(2)';
      el.style.zIndex = '999';

      expect(el.getAttribute('style')).toBeTruthy();

      component.reset(el);
      expect(el.getAttribute('style')).toBeFalsy();
    });
  });

  describe('handleMove()', () => {
    let el: HTMLElement;

    beforeEach(() => {
      el = document.createElement('div');
    });

    it('should do nothing if shouldHideEffect() returns true', () => {
      jest.spyOn(component, 'shouldHideEffect').mockImplementation(() => true);

      const updateSpy = jest.spyOn(component, 'updateStyle');

      component.handleMove(el, 10, 10);

      expect(updateSpy).not.toHaveBeenCalled();
    });

    it('should call through to updateStyle if shouldHideEffect() is false', () => {
      jest.spyOn(component, 'shouldHideEffect').mockImplementation(() => false);

      const updateSpy = jest.spyOn(component, 'updateStyle');

      component.handleMove(el, 10, 10);

      expect(updateSpy).toHaveBeenCalled();
    });
  });

  describe('updateStyle()', () => {
    let el: HTMLElement;

    beforeEach(() => {
      el = document.createElement('div');
    });

    it('should update style attribute', () => {
      component.updateStyle(el);
      expect(el.getAttribute('style')).toBeTruthy();
    });

    it('should set perspective, scale, rotation and z-index', () => {
      component.updateStyle(el);

      expect(el.getAttribute('style')).toContain('perspective');
      expect(el.getAttribute('style')).toContain('scale');
      expect(el.getAttribute('style')).toContain('rotateX');
      expect(el.getAttribute('style')).toContain('rotateY');
      expect(el.getAttribute('style')).toContain('z-index');
    });
  });

  describe('handleZoom()', () => {
    let el: HTMLElement;

    beforeEach(() => {
      el = document.createElement('div');
    });

    it('should do nothing if shouldHideEffect() returns true', () => {
      jest.spyOn(component, 'shouldHideEffect').mockImplementation(() => true);

      const updateSpy = jest.spyOn(component, 'updateStyle');

      component.handleZoom(el, 10);

      expect(updateSpy).not.toHaveBeenCalled();
    });

    it('should call through to updateStyle if shouldHideEffect() is false', () => {
      jest.spyOn(component, 'shouldHideEffect').mockImplementation(() => false);

      const updateSpy = jest.spyOn(component, 'updateStyle');

      component.handleZoom(el, 10);

      expect(updateSpy).toHaveBeenCalled();
    });
  });
});
