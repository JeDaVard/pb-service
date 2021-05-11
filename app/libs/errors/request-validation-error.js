const CustomError = require('./custom-error');
// import { ValidationError } from 'joi';

// export class RequestValidationError extends CustomError {
//     constructor(
//         public errors: { errors: ValidationError; sourceType: string }[],
//         public code: number = 400,
//     ) {
//         super('Unknown validation error');
//
//         // Only because we are extending a build-in class
//         Object.setPrototypeOf(this, RequestValidationError.prototype);
//     }
//     serialize() {
//         const errors: SerializedErrors[] = [];
//
//         this.errors.forEach((errObj) => {
//             errObj.errors.details.forEach((err) => {
//                 errors.push({
//                     message: err.message,
//                     field: err.context?.key || String(err.path[0]),
//                     source: errObj.sourceType,
//                 });
//             });
//         });
//
//         return errors;
//     }
// }
