import ResponsiveHelpers from '../themes/bdev/assets/scripts/helpers/responsive.helpers';
import ProjectItemEffect from '../themes/bdev/assets/scripts/projectItem';

describe('Project item', () => {
  let component: ProjectItemEffect;

  beforeEach(() => {
    const helper = new ResponsiveHelpers();
    
    component = new ProjectItemEffect(helper);
  });

  test('should create', () => {
    expect(component).toBeDefined();
  });
});
