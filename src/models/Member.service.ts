import MemberModel from "../schema/Member.model";
import { LoginInput, Member, MemberInput } from "../libs/types/member";
import Errors, { HttpCode, Message } from "../libs/Error";
import { MemberType } from "../libs/enums/member.enum";

class MemberService {
  private readonly memberModel;

  constructor() {
    this.memberModel = MemberModel;
  }

  public async processSignup(input: MemberInput): Promise<Member> {
    const exist = await this.memberModel
      .findOne({ memberType: MemberType.LIBRARY })
      .exec();
    console.log("exist:", exist);
    if (exist) throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
    try {
      const result = await this.memberModel.create(input);
      result.memberPassword = "";
      console.log("result:", typeof result);
      
      return result.toObject() as Member;
    } catch (err) {
      throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
    }
  }



  // public async processLogin(input: LoginInput): Promise<Member> {
  //   const member = await this.memberModel.findOne({memberNick: input.memberNick}).exec();
  //   console.log("member:", member);
  //   return member.toObject() as Member;
    
  // }


  public async processLogin(input: LoginInput): Promise<Member> {
    const member = await this.memberModel
    .findOne(
      {memberNick: input.memberNick},
      {memberNick: 1, memberPassword: 1}
    )
    .exec();

    if (!member) {
        throw new Errors(HttpCode.NOT_FOUND, Message.NO_MEMBER_NICK);
    }

     const isMatch = input.memberPassword === member.memberPassword;

     if(!isMatch) {
      throw new Errors(HttpCode.UNAUTHORIZED, Message.WRONG_PASSWORD);
    }

    // memberni hamma malumotini oladi id boyicha
    const result = await this.memberModel.findById(member._id).exec();

    if (!result) {
        throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
    }

    return result.toObject() as Member;
}

}

export default MemberService;
