import {
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    Param,
    Post,
    Render,
    Res,
    UploadedFile,
    UseGuards,
    UseInterceptors
} from "@nestjs/common";
import { BannerService } from "./banner.service";
import { Response } from "express";
import { FileInterceptor } from "@nestjs/platform-express";
import { Types } from "mongoose";
import { AuthenticatedGuard } from "src/auth/authWeb.guard";

@Controller('bannerCpanel')
export class BannerCpanelController {
    constructor(private readonly bannerService: BannerService) { }

    @UseGuards(AuthenticatedGuard)
    @Get('quanlybanner')
    @Render('quanlybanner')
    async quanlysanpham(@Res() res: Response) {
        try {
            const response = await this.bannerService.getAllBanner();
            return res.render('quanlybanner', { banner: response.banner });
        } catch (error) {
            console.error(error);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('Failed to fetch banners');
        }
    }

    @UseGuards(AuthenticatedGuard)
    @Get('addBanner')
    @Render('addBanner')
    async addBannerPage(@Res() res: Response) {
        try {
            return res.render('addBanner', {});
        } catch (error) {
            console.error(error);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('Failed to render add banner page');
        }
    }

    @UseInterceptors(FileInterceptor('image'))
    @Post('addBanner')
    async addBanner(@Body() body: any, @UploadedFile() file: Express.Multer.File, @Res() res: Response) {
        try {
            if (!file) {
                return res.status(HttpStatus.BAD_REQUEST).send('No file uploaded');
            }
            await this.bannerService.addBanner({ body, file });
            return res.redirect('/bannerCpanel/quanlybanner');
        } catch (error) {
            console.error(error);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('Failed to add banner');
        }
    }

    @Delete('deleteBanner/:_id')
    async deleteBanner(@Param('_id') _id: string, @Res() res: Response) {
        try {
            await this.bannerService.deleteBanner(new Types.ObjectId(_id));
            return res.json({ result: true });
        } catch (error) {
            console.error(error);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ result: false, error: 'Failed to delete banner' });
        }
    }
}
