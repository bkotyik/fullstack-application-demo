import {AbstractControl} from '@angular/forms';

/**
 * Age limit validator. User must be older than the given value
 * @param value the age limit
 * @returns {(control:AbstractControl)=>{}}
 */
export default function minAge(value: number) {
    return function (control: AbstractControl): {
        [key: string]: any;
    } {
        let valueInNumber = null;
        if (control.value != null) {
            let invalid = {
                minAge: {
                    valid: false,
                    value: value
                }
            };

            try {
                valueInNumber = Number.parseFloat(control.value);
            } catch (error) {
                return invalid;
            }
        }

        if ( (valueInNumber != null && valueInNumber >= value) || (valueInNumber == null)) {
            return null;
        } else {
            return invalid;
        }
    };
}
