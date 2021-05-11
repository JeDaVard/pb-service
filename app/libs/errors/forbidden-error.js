const CustomError = require('./custom-error');

class ForbiddenError extends CustomError {
    constructor(reason = 'Forbidden!') {
        super('Not Found!');
        this.reason = reason;

        // Only because we are extending a build-in class
        Object.setPrototypeOf(this, ForbiddenError.prototype);
    }
    code = 403;
    serialize() {
        return [{ message: this.reason }];
    }
}

module.exports = ForbiddenError;
