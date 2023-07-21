import fs = require('fs');
import Website from '../themes/bdev/assets/scripts/website';

jest.mock('../themes/bdev/assets/scripts/helpers/responsive.helpers');

jest.mock('../themes/bdev/assets/scripts/plugins/lightswitch');
jest.mock('../themes/bdev/assets/scripts/plugins/picker');
jest.mock('../themes/bdev/assets/scripts/plugins/textDecode');
jest.mock('../themes/bdev/assets/scripts/plugins/projectItem');

describe('Website', () => {
  let component: Website;

  beforeEach(() => {
    window.document.body.innerHTML = fs
      .readFileSync('./tests/website.fixture.html')
      .toString();
    component = new Website();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  test('it should create', () => {
    expect(component).toBeDefined();
  });
});
