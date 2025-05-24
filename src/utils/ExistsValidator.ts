import { HttpException } from "../error/HttpException";

export default function existsValidator(
    object: Object | null | undefined, 
    type: string = "Object",
    message: string = "not found"
): asserts object {
    if (!object) {
        throw new HttpException(404, `${type} ${message}`);
    }
}