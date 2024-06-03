import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument, Users } from './user.schema';
import { UserGetByIDResponseDTO } from './dto/user_getByID_response';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class UserService {
    constructor(@InjectModel(Users.name)
    private readonly userModel: Model<UserDocument>,
        private readonly jwtService: JwtService
    ) { }

    //Hàm insert vào database
    async GetUserByID(requestDTO: any): Promise<UserGetByIDResponseDTO | any> {
        try {
            const { _id, body } = requestDTO;
            const { name, email } = body;
            const user = await this.userModel.findOne({ _idUser: _id })
            if (user) {
                const payload = { sub: user._id, name: user.name };
                return {
                    status: true,
                    message: 'Get User successfully',
                    data: user,
                    access_token: await this.jwtService.signAsync(payload),
                }
            }
            let newUser = new this.userModel({ _idUser: _id, name, email, phone: null, active: true, avatar: null, gender: null, birthDay: null, address: [] });
            await newUser.save();
            return {
                status: true,
                message: 'New User',
                data: newUser,
                access_token: await this.jwtService.signAsync({ sub: newUser._id, name: newUser.name }),
            }
        } catch (error) {
            console.log(error);

            return {
                status: false,
                message: 'Get User error',
                data: null,
            }
        }

    }


}
