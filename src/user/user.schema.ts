
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, Types } from "mongoose";
export type UserDocument = Users & Document;



@Schema()
export class Users {

    @Prop({ type: mongoose.Schema.Types.ObjectId })
    _idUser: Types.ObjectId;

    @Prop()
    name: string;

    @Prop()
    email: string;

    @Prop()
    phone: string;

    @Prop()
    active: boolean;

    @Prop()
    avatar: string;

    @Prop()
    gender: string;

    @Prop()
    birthDay: string;




}

export const UserSchema = SchemaFactory.createForClass(Users);