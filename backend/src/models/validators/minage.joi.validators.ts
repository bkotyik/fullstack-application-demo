import * as Joi from "joi";
import {Extension} from "joi";

export default class MinAgeValidator implements Extension {
    base = Joi.date();
    name = "date";
    language = {
        minAge: "needs to be at least {{ageLimit}} years old."
    };

    rules = [
        {
            name: "minAge",
            description: "Age limit validator",
            params: {
                ageLimit: Joi.alternatives([Joi.number().positive().required()])
            },
            setup(params: any) {
                this._flags.minAge = params.ageLimit;
            },
            validate(params: any, value: Date, state: any, options: any) {
                // Calculate the year difference between now and the given date
                var diffInMilliseconds = Date.now() - value.getTime();
                var age = Math.abs(new Date(diffInMilliseconds).getUTCFullYear() - 1970);

                if (age < params.ageLimit) {
                    // Under aged, validation fails
                    return this.createError("date.minAge", { v: value, ageLimit: params.ageLimit }, state, options);
                }

                return value;
            }
        }
    ];
}