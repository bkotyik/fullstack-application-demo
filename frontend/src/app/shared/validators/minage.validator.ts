import {AbstractControl} from '@angular/forms';
import {Injectable} from '@angular/core';

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
        if (control.value == null) {
            return null;
        }
        // define a basic error message for invalid input
        let invalid = {
            minAge: {
                valid: false,
                value: value
            }
        };

        let valueInNumber = null;
        // Parse input
        try {
            valueInNumber = new Date(`${control.value.year}-${control.value.month}-${control.value.day}`);
        } catch (error) {
            return invalid;
        }

        // Calculate difference
        let diffInMilliseconds = Date.now() - valueInNumber.getTime();
        let age = Math.abs(new Date(diffInMilliseconds).getUTCFullYear() - 1970);
        // Evaluate result
        if (age < value) {
            return invalid;
        } else {
            return null;
        }
    };
}
