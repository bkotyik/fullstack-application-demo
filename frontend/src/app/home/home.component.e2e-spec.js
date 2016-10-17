describe('Home', function () {
    describe('when the page loads', function () {
        beforeAll(function () {
            browser.get('/');
        });

        it('should have a <form>', function () {
            var form = element(by.css('form'));
            expect(form.isPresent()).toEqual(true);
        });

        it('should have an input to query the name of the user', function () {
            var name = element(by.css('input[name="name"]'));
            expect(name.isPresent()).toEqual(true);
        });

        it('should have an input to query the email address of the user', function () {
            var email = element(by.css('input[name="email"]'));
            expect(email.isPresent()).toEqual(true);
        });

        it('should have an input to query the birthday of the user', function () {
            var birthday = element(by.css('input[name="birthday"]'));
            expect(birthday.isPresent()).toEqual(true);
        });

        it('should have an input to query the occupation of the user', function () {
            var occupation = element(by.css('input[name="occupation"]'));
            expect(occupation.isPresent()).toEqual(true);
        });

        it('should display a warning message that says name is a required field.', function () {
            var nameValidationMessage = element(by.css('input[name="name"] + my-validationmessage'));
            expect(nameValidationMessage.getText()).toContain('required');
        });

        it('should display a warning message that says email is a required field.', function () {
            var emailValidationMessage = element(by.css('input[name="email"] + my-validationmessage'));
            expect(emailValidationMessage.getText()).toContain('required');
        });

        it('should disable the submit button.', function () {
            var submitButton = element(by.css('button[type="submit"]'));
            expect(submitButton.getAttribute("disabled")).toEqual("true");
        });
    });

    describe('when the form is valid', function () {
        beforeAll(function () {
            browser.get('/');
            var name = element(by.css('input[name="name"]'));
            var email = element(by.css('input[name="email"]'));
            name.sendKeys('Test name');
            email.sendKeys('test@gmail.com');
        });

        it('should not display a warning message that says name is a required field.', function () {
            var nameValidationMessage = element(by.css('input[name="name"] + my-validationmessage'));
            expect(nameValidationMessage.getText()).not.toContain('required');
        });

        it('should not display a warning message that says email is a required field.', function () {
            var emailValidationMessage = element(by.css('input[name="email"] + my-validationmessage'));
            expect(emailValidationMessage.getText()).not.toContain('required');
        });

        it('should enable the submit button.', function () {
            var submitButton = element(by.css('button[type="submit"]'));
            expect(submitButton.getAttribute("disabled")).toBeNull();
        });

        describe('and the user submits the form', function () {
            beforeAll(function (done) {
                var submitButton = element(by.css('button[type="submit"]'));
                submitButton.click().then(done);
            });

            it('gets redirected to the thank you page', function () {
               expect(browser.getCurrentUrl()).toContain('/thankyou');
            });
        });

    });
});

