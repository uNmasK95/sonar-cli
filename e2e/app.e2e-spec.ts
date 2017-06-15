import { SonarCliPage } from './app.po';

describe('sonar-cli App', () => {
  let page: SonarCliPage;

  beforeEach(() => {
    page = new SonarCliPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
