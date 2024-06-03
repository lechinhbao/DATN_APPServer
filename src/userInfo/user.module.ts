import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { UserInfoController } from './user.controller';
import { UserInfoSchema, UsersInfo } from './user.schema';
import { UserInfoService } from "./user.service";



@Module({
    imports: [
        MongooseModule.forFeature([
            { name: UsersInfo.name, schema: UserInfoSchema },
        ]),
    ],
    controllers: [UserInfoController],
    providers: [UserInfoService],
    exports: [UserInfoService]
})
export class UserInfoModule { }