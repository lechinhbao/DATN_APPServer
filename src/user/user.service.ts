import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument, Users } from './user.schema';
import { UserGetByIDResponseDTO } from './dto/user_getByID_response';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(Users.name) private readonly userModel: Model<UserDocument>,
        private readonly jwtService: JwtService
    ) { }

    // Hàm lấy người dùng theo ID hoặc tạo người dùng mới nếu không tồn tại
    async getUserByID(requestDTO: any): Promise<UserGetByIDResponseDTO | any> {
        try {
            const { _id, body } = requestDTO;
            const { name, email } = body;

            // Tìm người dùng theo _idUser
            const user = await this.userModel.findOne({ _idUser: _id });

            if (user) {
                const payload = { sub: user._id, name: user.name };
                return {
                    status: true,
                    message: 'User retrieved successfully',
                    data: user,
                    access_token: await this.jwtService.signAsync(payload),
                };
            }

            // Tạo người dùng mới nếu không tìm thấy
            const newUser = new this.userModel({
                _idUser: _id,
                name,
                email,
                phone: null,
                active: true,
                avatar: null,
                gender: null,
                birthDay: null,
                address: [],
            });
            await newUser.save();

            return {
                status: true,
                message: 'New user created',
                data: newUser,
                access_token: await this.jwtService.signAsync({ sub: newUser._id, name: newUser.name }),
            };
        } catch (error) {
            console.error('Error getting user by ID:', error);

            return {
                status: false,
                message: 'Error retrieving user',
                data: null,
            };
        }
    }
}
