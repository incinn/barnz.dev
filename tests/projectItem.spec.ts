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
});
