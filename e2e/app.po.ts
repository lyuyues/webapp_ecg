import { browser, element, by } from 'protractor';

export class EcgAppPage {
  navigateTo() {
    return browser.get('/#/home');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }

  getButton(){
    let elem  = element(by.css('.learn-more'));
    return elem;
  }

  getLoginForm(){
    let elem = element(by.tagName('form'));
    return elem;
  }
}
