const CustomError = require('./custom-error');

class DatabaseConnectionError extends CustomError {
    constructor(reason = 'Unknown db error', code = 500) {
        super('Unknown db error');
        this.reason = reason;
        this.code = code;

        // Only because we are extending a build-in class
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }
    serialize() {
        return [{ message: this.reason }];
    }
}

module.exports = DatabaseConnectionError;
