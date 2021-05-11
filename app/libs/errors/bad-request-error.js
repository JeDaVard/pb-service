const CustomError = require('./custom-error');

class BadRequestError extends CustomError {
    constructor(reason = 'Bad Request!') {
        super(reason || 'Bad Request!');
        this.reason = reason;

        // Only because we are extending a build-in class
        Object.setPrototypeOf(this, BadRequestError.prototype);
    }
    code = 400;
    serialize() {
        return [{ message: this.reason }];
    }
}

module.exports = BadRequestError;
