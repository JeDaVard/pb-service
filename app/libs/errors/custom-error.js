class CustomError extends Error {
    constructor(message) {
        super(message);

        // Only because we are extending a build-in class
        Object.setPrototypeOf(this, CustomError.prototype);
    }
}

module.exports = CustomError;
