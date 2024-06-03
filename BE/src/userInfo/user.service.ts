import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { UserInfoDocument, UsersInfo } from './user.schema';
import { UserInsertRequestDTO } from './dto/user_register_request';
import { UserInfoLoginRequestDTO } from './dto/user_login_request';
import { UserInfoForGotRequestDTO } from './dto/user_forgot_request';
import { UserInfoResponseDTO } from './dto/user_response';
import { UserInfoRegisterResponseDTO } from './dto/user_register_response';


enum saltOrRounds {
    SALT = 10
}
enum Email {
    FORM = "The Wonder Store",
    SUBJECT = "Code verify your mail form TheWonderStore ✔",
}



@Injectable()
export class UserInfoService {
    constructor(@InjectModel(UsersInfo.name)
    private readonly userModel: Model<UserInfoDocument>,
    ) { }


    //Hàm insert vào database
    async RegisterUser(requestDTO: UserInsertRequestDTO): Promise<UserInfoRegisterResponseDTO | UserInfoResponseDTO> {
        try {

            const { username, email, password, role } = requestDTO;
            const user = await this.userModel.findOne({ email });
            if (user) {
                return {
                    status: false,
                    message: 'User already exists',
                }
            }
            const hashPassword = await bcrypt.hash(password, saltOrRounds.SALT);
            const newUser = new this.userModel({
                username,
                email,
                password: hashPassword,
                role,
            })

            const { _id } = await newUser.save();
            return {
                status: true,
                message: 'Register successfully ',
                _id: _id

            }
        } catch (error: any) {
            return {
                status: false,
                message: 'Failed' + error,
            }
        }
    }


    async LoginUser(requestDTO: UserInfoLoginRequestDTO): Promise<any | UserInfoResponseDTO> {
        try {
            const { email } = requestDTO;
            const user = await this.userModel.findOne({ email });
            if (!user) {
                return {
                    status: false,
                    message: 'User not found',
                }
            }
            return user;
        } catch (error: any) {
        }
    }

    async ForGotPass(requestDTO: UserInfoForGotRequestDTO): Promise<UserInfoResponseDTO> {
        try {
            const { email, newPassword } = requestDTO;
            const user = await this.userModel.findOne({ email });
            const hashPassword = await bcrypt.hash(newPassword, saltOrRounds.SALT);
            if (user) {
                (await user).password = hashPassword;
                (await user).save();
                return {
                    status: true,
                    message: 'Update password successfully',
                }
            } else {
                return {
                    status: false,
                    message: 'Update password failed',
                }
            }

        } catch (error) {
            return {
                status: false,
                message: 'Update password error',
            }
        }
    }


}
