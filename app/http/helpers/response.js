function jsonResponse(res, code, success = false, message, errors, data) {
    res.type('application/json');
    return res.status(code).json({ success, message, errors, data });
}

function successRes(res, code = 200, message = 'ok', data) {
    return jsonResponse(res, code, true, message, [], data);
}

function failRes(res, code = 500, message, errors) {
    return jsonResponse(
        res,
        code,
        false,
        message || 'Bad Request',
        errors,
        null
    );
}

/*
 * Basically you will need only this "response" function
 * when success: just pass the data, in advanced cases pass the generic type
 * when errors: just pass the code, and it's already enough, but better you pass some errors, some message
 */
function response(res, code, success = false, data, message, errors) {
    switch (code) {
        case 200: {
            return successRes(res, 200, message || 'ok', data);
        }
        case 201: {
            return successRes(res, 201, message || 'created', data);
        }
        case 400: {
            return failRes(res, 400, message || 'Bad Request', errors);
        }
        case 401: {
            return failRes(res, 401, message || 'Unauthorized', errors);
        }
        case 403: {
            return failRes(res, 403, message || 'Forbidden', errors);
        }
        case 404: {
            return failRes(res, 404, message || 'Not found', errors);
        }
        case 500: {
            return failRes(
                res,
                500,
                message || 'Internal Server errors',
                errors
            );
        }
        default: {
            return failRes(
                res,
                code,
                message || 'Internal Server errors',
                errors
            );
        }
    }
}

module.exports = response;
