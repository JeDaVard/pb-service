const CustomError = require('./custom-error');

class NotAuthorizedError extends CustomError {
    code = 401;
    constructor() {
        super('Not authorized');

        Object.setPrototypeOf(this, NotAuthorizedError.prototype);
    }
    serialize() {
        return [{ message: 'Not authorized' }];
    }
}

module.exports = NotAuthorizedError;
