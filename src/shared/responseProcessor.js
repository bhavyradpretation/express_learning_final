import {StatusCodes} from "http-status-codes";
import { ApiError } from "./error.js";

const responseProcessor = (handlerFunction)=>{
    return async (req, res, next)=>{
        Promise.resolve(handlerFunction(req, res, next)).then((response)=>{
            if(response instanceof SuccessResponse)
            return res.status(response.statusCode).send({
                data: response.data,
                statusCode: response.statusCode,
                message: response.message
            });

            return res.status(StatusCodes.OK).send({
                    data: response,
                    statusCode: StatusCodes.OK,
                    message: "Successfully Provided Response",
            })
        }).catch((error)=>{
            next(error);
        })
    }
}

class SuccessResponse{
    constructor(data, message="Successfully Provided Response", statusCode = StatusCodes.OK){
        this.data = data,
        this.message = message,
        this.statusCode = statusCode
    }
}

export {
    responseProcessor,
    SuccessResponse,
}