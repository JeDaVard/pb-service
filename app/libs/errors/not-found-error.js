const CustomError = require('./custom-error');

class NotFoundError extends CustomError {
    constructor(reason) {
        super(reason || 'Not Found!');
        this.reason = reason;

        // Only because we are extending a build-in class
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }
    code = 404;
    serialize() {
        return [{ message: this.reason }];
    }
}

module.exports = NotFoundError;
