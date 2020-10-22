// import { browser, element,by} from 'protractor';
import { EcgAppPage} from './app.po';
//browser let navigate to specific URL,
//element let interate with DOM element on a web page;
// by let locate element by CSS or other selector;
describe('ecg-app App', function() {
  let ecgAppPage = new EcgAppPage()
  beforeEach(() => {
    ecgAppPage.navigateTo();
  });

  it('should have button with class .learn-more', () => {
    let elem = ecgAppPage.getButton();
    expect(elem.isPresent()).toBeTruthy();
    expect(elem.getText()).toBe('About Cardiacare');
  });
  it('should have login form ', () => {
    let elem = ecgAppPage.getLoginForm();
    expect(elem.isPresent()).toBeTruthy();
  });

});
