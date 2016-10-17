import {AbstractControl} from '@angular/forms';

/**
 * Age limit validator. User must be older than the given value
 * @param value the age limit
 * @returns {(control:AbstractControl)=>{}}
 */
export function MinAgeValidator(value: number) {
    return function (control: AbstractControl): {
        [key: string]: any;
    } {
        // If field has no value, just return and say its okay
        if (control.value === null || control.value === '' || control.value === undefined) {
            return null;
        }
        // define a basic error message for invalid input
        let invalid = {
            minAge: {
                valid: false,
                value: value
            }
        };

        let valueInDate = null;
        // Parse input
        try {
            valueInDate = new Date(`${control.value.year}-${control.value.month}-${control.value.day}`);
        } catch (error) {
            return invalid;
        }

        // Check if the date is valid
        if (isNaN(valueInDate.getTime())) {
            return invalid;
        }

        // Calculate difference
        let diffInMilliseconds = Date.now() - valueInDate.getTime();
        let age = Math.abs(new Date(diffInMilliseconds).getUTCFullYear() - 1970);
        // Evaluate result
        if (age < value) {
            return invalid;
        } else {
            return null;
        }
    };
}
