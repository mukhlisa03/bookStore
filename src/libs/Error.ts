export enum HttpCode {
    OK = 200,
    CREATED = 201,
    NOT_MODIFIED = 304,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDED = 403,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500,
}

export enum Message {
    SOMETHING_WENT_WRONG = "Something went wrong!",
    NO_DATA_FOUND = "No data is found!",
    CREATE_FAILED = "Create is failed!",
    UPDATE_FAILED = "Update is failed!",

    USED_NICK_PHONE = "You are inserting already used nick or phone!",
    TOKEN_CREATION_ERROR = "Token creation error!",
    NO_MEMBER_NICK = "No member with that member nick!",
    BLOCKED_USER = "You have been blocked, contact the library!",
    WRONG_PASSWORD = "Wrong password, please try again!",
    NOT_AUTHENTICATED = "You are not authenticated,  Please login first",
}

class Errors extends Error {   // Errors classi => extend boladi Error dan (inheritance)
    public code: HttpCode;    // yuqoridagi enum
    public message: Message;  

    // standard error un ishl.di
    static standard = {
        code: HttpCode.INTERNAL_SERVER_ERROR,
        message: Message.SOMETHING_WENT_WRONG,
    };

    constructor(statusCode: HttpCode, statusMessage: Message) {  // type => HttpCode va Message
        super();   
        this.code = statusCode;
        this.message = statusMessage;
        // yuqorida elon qlngan code, message lar construnctordagi statuslarga tenglanadi
    }
}

export default Errors;

