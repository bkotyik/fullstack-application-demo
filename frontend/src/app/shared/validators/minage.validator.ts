import {AbstractControl} from '@angular/forms';
import {Injectable} from '@angular/core';

/**
 * Age limit validator. User must be older than the given value
 * @param value the age limit
 * @returns {(control:AbstractControl)=>{}}
 */
@Injectable()
function minAge(value: number) {
    return function (control: AbstractControl): {
        [key: string]: any;
    } {

        if (control.value == null) {
            return null;
        }

        let invalid = {
            minAge: {
                valid: false,
                value: value
            }
        };

        let valueInNumber = null;
        if (control.value != null) {
            try {
                valueInNumber = new Date(`${control.value.year}-${control.value.month}-${control.value.day}`);
            } catch (error) {
                return invalid;
            }
        }

        let diffInMilliseconds = Date.now() - valueInNumber.getTime();
        let age = Math.abs(new Date(diffInMilliseconds).getUTCFullYear() - 1970);

        if (age < value) {
            return invalid;
        } else {
            return null;
        }
    };
}
export default minAge;
