import {AnySchema} from "joi";

declare module "joi" {
    export interface DateSchema extends AnySchema<DateSchema> {
        minAge(ageLimit: number): DateSchema;
    }
}