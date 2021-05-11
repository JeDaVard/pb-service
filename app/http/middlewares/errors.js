const CustomError = require('../../libs/errors/custom-error');
const { response } = require('../helpers');

exports.errorHandler = (err, req, res, next) => {
    console.log(err, 'ERR');
    if (err instanceof CustomError) {
        response(res, err.code, false, null, 'Failed', err.serialize());
        return;
    }
    // console.info('[ERROR] Unexpected error from errorHandler');
    response(res, 500, false, null, 'Internal Server Error', [
        { message: 'Something went wrong!' },
    ]);
};
