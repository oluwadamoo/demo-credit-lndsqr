const createError = ({
    status = 500,
    messsage = "Something went wrong!"
}) => {
    const error: ErrorConstructor | any = new Error(messsage)

    error.status = status


    return error
}

const BAD_REQUEST = 400
const UNAUTHORIZED = 401
const FORBIDDEN = 403
const CONFLICT = 409
const NOT_FOUND = 404
const UNPROCESSABLE = 422
const GENERIC_ERROR = 500

export {
    createError,
    BAD_REQUEST,
    UNAUTHORIZED,
    FORBIDDEN,
    CONFLICT,
    NOT_FOUND,
    UNPROCESSABLE,
    GENERIC_ERROR
}