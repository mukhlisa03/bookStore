import mongoose, {Schema} from "mongoose";   // schema => qiymat
import { MemberStatus, MemberType } from "../libs/enums/member.enum";

/* Schema lar 2 xil usulda quriladi
1 => Schema first => schemadan foydalansh
2 => Code frist => code based usulda hosil qlsh

member schema => yangi user signup bolayotgan payt ishga tushadi
enum => belgn qiymatlar ketma-ketligi (spesific case) ishl,di
 */

// SCHEMA => alohida language, suniy table lar hosil qlnyapti
// _id  => bn 9ta data kirtldi
const memberSchema = new Schema({    
    memberType: {
        type: String,
        enum: MemberType,
        default: MemberType.USER  // kirtlmagan default USER ni oladi
    },

    memberStatus: {
        type: String,
        enum: MemberStatus,
        default: MemberStatus.ACTIVE, 
    },


    memberNick: {
        type: String,
        index: {unique: true, sparse: true},    
        required: true,
    }, 


    memberPhone: {
        type: String,
        index: {unique: true, sparse: true},
        required: true,  // tel raqam kirtlshi shart buyrugi berlyapti
    },


    memberPassword: {
        type: String,
        select: false,  // database by default olb bermasn sababi u sirli malumot
        required: true,   // passwrod albatta bolishi kk bolgan dataset
    },

    memberAddress: {
        type: String,
    },


    memberDesc: {
        type: String,
    },


    memberImage: {
        type: String,
    },
},
{timestamps: true}    // createdAt va UpdatedAt ni avtomatik qoyb beradi
);    


export default mongoose.model('Member', memberSchema); 
// schema modelga aylantrshda => memberSchema class ga ozgaradi
// memberschema modelni memberschema obj orqali qurlyapti

// C =>   Object
// M =>   Class
// V =>   EJS