// export const AUTH_TIMER = 24;  // dinamik tarzda ozgartrshga imkon beradi(loyihada)
export const MORGAN_FORMAT = ':method :url  :response-time [:status] \n';



// db stringni => objectId ga ozgartshi
import mongoose from "mongoose";
export const shapeIntoMongooseObjectId = (target: any) => {
    return typeof target === "string" ? new mongoose.Types.ObjectId(target) : target;
};