describe('App', function () {

    beforeAll(function () {
        browser.get('/');
    });

    it('should have a title', function () {
        expect(browser.getTitle()).toEqual("FullStackJS Application portal");
    });

    it('should have <header>', function () {
        expect(element(by.css('my-app header')).isPresent()).toEqual(true);
    });

    it('should have <main>', function () {
        expect(element(by.css('my-app main')).isPresent()).toEqual(true);
    });

    it('should have a main title', function () {
        expect(element(by.css('nav h1')).getText()).toContain('Application');
    });

    it('should have a sub title', function () {
        expect(element(by.css('nav h1 small')).getText()).toContain('portal');
    });

    it('should have the router outlet in main', function () {
        expect(element(by.css('main router-outlet')).isPresent()).toEqual(true);
    });

    it('should be 10 columns wide and have 1 column offset', function() {
       expect(element(by.css('main')).getAttribute('class')).toEqual('col-md-10 offset-md-1');
    });

});
