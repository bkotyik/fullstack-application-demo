import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By}              from '@angular/platform-browser';
import {DebugElement}    from '@angular/core';

import {ValidationMessageComponent} from './validationmessage.component';
import {Validators, FormControl} from '@angular/forms';

let validationMessageComponent: ValidationMessageComponent = null;
let fixture: ComponentFixture<ValidationMessageComponent>;

describe('Component: ValidationMessageComponent', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ValidationMessageComponent],
        });

        fixture = TestBed.createComponent(ValidationMessageComponent);
        validationMessageComponent = fixture.componentInstance;
    });

    it("does not display messages when no validations are attached to the control", function() {
        let formControl = new FormControl('', []);
        validationMessageComponent.control = formControl;
        fixture.detectChanges();
        let de: DebugElement = fixture.debugElement.query(By.css('ul'));
        expect(de.nativeElement.textContent.trim()).toBe('');
    });

    it('displays a message when form control is required but empty', function () {
        let formControl = new FormControl('', [Validators.required])
        validationMessageComponent.control = formControl;
        validationMessageComponent.updateValidationMessage();
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css('ul > li')).nativeElement.textContent).toContain('required');
    });

    it('does not display message when form control is required and not empty', function () {
        let formControl = new FormControl('Test', [Validators.required])
        validationMessageComponent.control = formControl;
        validationMessageComponent.updateValidationMessage();
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css('ul > li'))).not.toBeDefined;
    });

});
