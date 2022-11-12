import { NextFunction, Request, Response } from 'express'
import {
    BAD_REQUEST,
    UNAUTHORIZED,
    UNPROCESSABLE,
    FORBIDDEN,
    CONFLICT,
    NOT_FOUND,
    GENERIC_ERROR
} from '../helpers/error_helpers'

const unauthorized = (error: any, request: Request, response: Response, next: NextFunction) => {
    if (error.status !== UNAUTHORIZED) return next(error)

    response.status(UNAUTHORIZED).send({
        ok: false,
        message: error.message || 'Unauthorized',
        errors: [error]
    })
}

const forbidden = (error: any, request: Request, response: Response, next: NextFunction) => {
    if (error.status !== FORBIDDEN) return next(error)

    response.status(FORBIDDEN).send({
        ok: false,
        message: error.message || 'Forbidden',
        errors: [error]
    })
}

const conflict = (error: any, request: Request, response: Response, next: NextFunction) => {
    if (error.status !== CONFLICT) return next(error)

    response.status(CONFLICT).send({
        ok: false,
        message: error.message || 'Conflict',
        errors: [error]
    })
}

const badRequest = (error: any, request: Request, response: Response, next: NextFunction) => {
    if (error.status !== BAD_REQUEST) return next(error)

    response.status(BAD_REQUEST).send({
        ok: false,
        message: error.message || 'Bad Request',
        errors: [error]
    })
}

const unprocessable = (error: any, request: Request, response: Response, next: NextFunction) => {
    if (error.status !== UNPROCESSABLE) return next(error)

    response.status(UNPROCESSABLE).send({
        ok: false,
        message: error.message || 'Unprocessable entity',
        errors: [error]
    })
}

// If there's nothing left to do after all this (and there's no error),
// return a 404 error.
const notFound = (error: any, request: Request, response: Response, next: NextFunction) => {
    if (error.status !== NOT_FOUND) return next(error)

    response.status(NOT_FOUND).send({
        ok: false,
        message: error.message || 'The requested resource could not be found'
    })
}

// If there's still an error at this point, return a generic 500 error.
const genericError = (error: any, request: Request, response: Response, next: NextFunction) => {
    response.status(GENERIC_ERROR).send({
        ok: false,
        message: error.message || 'Internal server error',
        errors: [error]
    })
}

// If there's nothing left to do after all this (and there's no error),
// return a 404 error.
const catchall = (request: Request, response: Response, next: NextFunction) => {
    response.status(NOT_FOUND).send({
        ok: false,
        message: 'The requested resource could not be found'
    })
}

const exportables: any = {
    unauthorized,
    forbidden,
    conflict,
    badRequest,
    unprocessable,
    genericError,
    notFound,
    catchall
}

const all = Object.keys(exportables).map(key => exportables[key])

export default {
    ...exportables,
    all
}
