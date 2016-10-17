import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {FormControl} from '@angular/forms';

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

    ngOnChanges(changes: SimpleChanges): void {
        if (this.control != null) {
            this.control.valueChanges.subscribe(this.updateValidationMessage.bind(this));
        }
        this.updateValidationMessage();
    }


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
                message = `Invalid format.`;
                break;
            default:
                message = `This field is invalid.`;
                break;
        }
        return message;
    }


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
