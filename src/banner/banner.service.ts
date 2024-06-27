import { InjectModel } from "@nestjs/mongoose";
import { Banner, BannerDocument } from "./banner.schema";
import { Model, Types } from "mongoose";
import { BannerInsertDTO } from "./dto/banner_insert_request";
import { BannerResponseDTO } from "./dto/banner_response";
import { Injectable } from "@nestjs/common";
import uploadImage from "src/upload/upload";

@Injectable()
export class BannerService {
    constructor(
        @InjectModel(Banner.name)
        private readonly bannerModel: Model<BannerDocument>,
    ) { }

    async addBanner(requestDTO: any): Promise<BannerResponseDTO> {
        try {
            const body: BannerInsertDTO = requestDTO.body;
            const file = requestDTO.file;
            if (!file) {
                throw new Error('No file uploaded');
            }
            const url = await uploadImage(file, "Banner");
            const { title } = body;
            const banner = new this.bannerModel({ title, image: url });
            await banner.save();
            return {
                status: true,
                message: 'Insert banner success: ' + banner,
            };
        } catch (error) {
            console.log(error);
            return {
                status: false,
                message: 'Insert banner failed: ' + error.message,
            };
        }
    }

    async getAllBanner(): Promise<BannerResponseDTO | any> {
        try {
            const banners = await this.bannerModel.find();
            return {
                status: true,
                message: 'Get all banners success',
                banner: banners,
            };
        } catch (error) {
            console.log(error);
            return {
                status: false,
                message: 'Get all banners failed: ' + error.message,
            };
        }
    }

    async deleteBanner(id: Types.ObjectId): Promise<BannerResponseDTO> {
        try {
            await this.bannerModel.findByIdAndDelete(id);
            return {
                status: true,
                message: 'Delete banner success',
            };
        } catch (error) {
            console.log(error);
            return {
                status: false,
                message: 'Delete banner failed: ' + error.message,
            };
        }
    }
}
