import { Types } from "mongoose";
export class Users {
    _id: Types.ObjectId;
    _idUser: Types.ObjectId;
    name: string;
    email: string;
    phone: string;
    active: boolean;
    avatar: string;
    gender: string;
    birthDay: string;
}
