import Website from '../themes/bdev/assets/scripts/website';

jest.mock('../themes/bdev/assets/scripts/lightswitch');

describe('Website', () => {
  let component: Website;

  beforeEach(() => {
    component = new Website();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  test('it should create', () => {
    expect(component).toBeDefined();
  });
});
