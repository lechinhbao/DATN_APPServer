import { Body, Controller, Delete, Get, Param, Post, Render, Res, UseGuards } from "@nestjs/common";
import { Response } from 'express';
import { BrandService } from "./brand.service";
import { BrandDeleteRequestDTO } from "./dto/brand_delete_request";
import { BrandAddRequestDTO } from "./dto/brand_add_request";
import { AuthenticatedGuard } from "src/auth/authWeb.guard";

@Controller('brandsCpanel')
export class BrandsCpanelController {
  constructor(
    private readonly brandService: BrandService
  ) { }

  @UseGuards(AuthenticatedGuard)
  @Get('addBrand')
  @Render('addBrand')
  async showAddBrandForm() {
    try {
      return {};
    } catch (error) {
      console.error('Error displaying add brand form:', error);
      return { error: 'Failed to display add brand form' };
    }
  }

  @Post('addBrand')
  async addBrand(@Body() body: BrandAddRequestDTO, @Res() res: Response) {
    try {
      const result = await this.brandService.addBrand(body);
      if (result.status) {
        return res.redirect('/brandsCpanel/quanlythuonghieu');
      } else {
        // Handle the case where adding brand fails, e.g., show an error message
        return res.render('addBrand', { error: result.message });
      }
    } catch (error) {
      console.error('Error adding brand:', error);
      return res.render('addBrand', { error: 'Failed to add brand' });
    }
  }

  @UseGuards(AuthenticatedGuard)
  @Get('quanlythuonghieu')
  @Render('quanlythuonghieu')
  async manageBrands() {
    try {
      const brands = await this.brandService.getAllBrands();
      return { brands };
    } catch (error) {
      console.error('Error fetching brands:', error);
      return { error: 'Failed to retrieve brands' };
    }
  }

  @Delete('quanlythuonghieu/:_id/delete')
  async deleteBrand(@Param('_id') _id: string, @Res() res: Response) {
    try {
      const result = await this.brandService.deleteBrand({ _id });
      return res.json(result);
    } catch (error) {
      console.error('Error deleting brand:', error);
      return res.json({ status: false, message: 'Failed to delete brand' });
    }
  }
}
