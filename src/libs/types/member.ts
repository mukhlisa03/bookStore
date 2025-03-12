import { ObjectId } from "mongoose"; 
import { MemberStatus, MemberType } from "../enums/member.enum";
import { Request } from "express";
import { Session } from "express-session";


export interface Member {
    _id: ObjectId;
    memberType?: MemberType;
    memberStatus?: MemberStatus;
    memberNick: string;
    memberPhone: string;
    memberPassword?: string;
    memberAddress?: string;
    memberDesc?: string;
    memberImage?: string;
    createdAt: Date;
    updatedAt: Date;
}



export interface MemberInput {
    memberType?: MemberType;
    memberStatus?: MemberStatus;
    memberNick: string;
    memberPhone: string;
    memberPassword: string;
    memberAddress?: string;
    memberDesc?: string;
    memberImage?: string;
}

export interface LoginInput {
    memberNick: string;
    memberPassword: string;
}


export interface AdminRequest extends Request {
    member: Member;   // member qiymat => type yuqoridagi Memberga teng
    session: Session & {member: Member};  // type Session (ichida => member bor)
    file: Express.Multer.File;
    files: Express.Multer.File[];
}