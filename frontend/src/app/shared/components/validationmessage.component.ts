import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {FormControl} from '@angular/forms';

/**
 * Basic component for displaying error messages under form input
 */
@Component({
    selector: 'my-validationmessage',
    template: `
        <div>
            <ul>
                <li *ngFor="let message of messages" class="text-danger">{{message}}</li>
            </ul>
        </div>
    `,
    styleUrls: ['./validationmessage.component.scss']
})
export class ValidationMessageComponent implements OnChanges {

    @Input()
    control: FormControl;

    messages: Array<string> = [];

    constructor() {
    }

    /**
     * Invoked when a new input to the component is attached
     * @param changes
     */
    ngOnChanges(changes: SimpleChanges): void {
        if (this.control != null) {
            // subscribe to the value changes to be notified if the user manipulates the input
            this.control.valueChanges.subscribe(this.updateValidationMessage.bind(this));
        }
        this.updateValidationMessage();
    }

    /**
     * Returns a validation messages for the known validator errors.
     * @param validatorName Name of the validator
     * @param validationResult Result of the validation process
     * @returns {string} Message to be displayed
     */
    getValidatorErrorMessage(validatorName: string, validationResult: any) {
        let message: string = null;
        switch (validatorName) {
            case 'required':
                message = `This field is required.`;
                break;
            case 'minAge':
                message = `You must be at least ${validationResult.value} years old.`;
                break;
            case 'pattern':
                message = `This field has invalid format or fake value.`;
                break;
            default:
                message = `This field is invalid.`;
                break;
        }
        return message;
    }

    /**
     * Updates the messages to be displayed
     */
    updateValidationMessage() {
        this.messages = [];
        if (this.control != null
            && this.control.errors != null) {
            let validationErrors = Object.keys(this.control.errors);
            for (let validatorName of validationErrors) {
                this.messages.push(this.getValidatorErrorMessage(validatorName, this.control.errors[validatorName]));
            }
        }
    }
}
