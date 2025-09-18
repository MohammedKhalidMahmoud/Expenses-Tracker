export function successResponse(res,message, data, statusCode=200){
    res.status(statusCode).json({
        success: true,
        message,
        data,
        error: null
    })
}

export function errorResponse(res, message, statusCode=500, details){
    res.status(statusCode).json({
        success: false,
        message,
        data: null,
        error:{
            code: statusCode,
            details
        }
    })
}