import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Brand, BrandDocument } from "./brand.schema";
import { BrandGetAllResponseDTO } from "./dto/brand_getAll_response";
import { BrandAddRequestDTO } from "./dto/brand_add_request";
import { BrandResponseDTO } from "./dto/brand_response";
import { BrandDeleteRequestDTO } from "./dto/brand_delete_request";

@Injectable()
export class BrandService {
    constructor(
        @InjectModel(Brand.name)
        private readonly brandModel: Model<BrandDocument>
    ) { }

    async addBrand(requestDTO: BrandAddRequestDTO): Promise<BrandResponseDTO> {
        const { name, linkIcon } = requestDTO;
        try {
            const existingBrand = await this.brandModel.findOne({ name });
            if (existingBrand) {
                return {
                    status: false,
                    message: 'Brand already exists',
                };
            }

            const newBrand = new this.brandModel({ name, linkIcon });
            await newBrand.save();
            return {
                status: true,
                message: 'Brand added successfully',
            };
        } catch (error) {
            console.error('Error adding brand:', error);
            return {
                status: false,
                message: 'Failed to add brand',
            };
        }
    }

    async getAllBrands(): Promise<BrandGetAllResponseDTO[]> {
        try {
            const brands = await this.brandModel.find().exec();
            return brands.map(brand => ({
                id: brand._id,
                name: brand.name,
                linkIcon: brand.linkIcon,
            }));
        } catch (error) {
            console.error('Error retrieving brands:', error);
            throw new Error('Failed to retrieve brands');
        }
    }

    async deleteBrand(requestDTO: BrandDeleteRequestDTO): Promise<BrandResponseDTO> {
        const { _id } = requestDTO;
        try {
            const brand = await this.brandModel.findById(_id);
            if (!brand) {
                return {
                    status: false,
                    message: 'Brand not found',
                };
            }

            await this.brandModel.findByIdAndDelete(_id);
            return {
                status: true,
                message: 'Brand deleted successfully',
            };
        } catch (error) {
            console.error('Error deleting brand:', error);
            return {
                status: false,
                message: 'Failed to delete brand',
            };
        }
    }
}
