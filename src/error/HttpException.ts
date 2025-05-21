export class HttpException extends Error {
    constructor (
        public status: number = 500,
        public message: string = "Internal server error"
    ) {
        super(message);
        this.name = "HttpException";
    }
}