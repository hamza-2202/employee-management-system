export const errorHandler = (err, request, response, next) => {
    const statusCode = response.statusCode || 500

    response.status(statusCode)
    response.json({
        message: err.message,
        stack: err.stack
    })
}