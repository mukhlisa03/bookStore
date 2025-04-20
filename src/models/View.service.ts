import Errors, { HttpCode, Message } from "../libs/Error";
import { View, ViewInput } from "../libs/types/view";
import ViewModel from "../schema/View.model";

class ViewService {
  private readonly viewModel;

  constructor() {
    this.viewModel = ViewModel;
  }

  public async checkViewExistense(input: ViewInput): Promise<View | null> {
    const view = await this.viewModel
      .findOne({ memberId: input.memberId, viewRefId: input.viewRefId })
      .exec();

    return view?.toObject() as View;
  }

  public async insertMemberView(input: ViewInput): Promise<View> {
    try {
      return (await this.viewModel.create(input)).toObject() as View;
    } catch (err) {
      console.log("ERROR, model:insertMemberView:", err);
      throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
    }
  }
}

export default ViewService;
