import { Injectable, UploadedFile, UploadedFiles } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from './products.entity';
import { Repository } from 'typeorm';
import { StoreProductDTO } from './dto/products.dto';
import multer from 'multer';
import { buffer } from 'rxjs';
import { request } from 'express';
import * as fs from 'fs';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products)
    protected productsRepository: Repository<Products>,
  ) {}

  public async store(file: Express.Multer.File, productData: StoreProductDTO) {
    try {
      const productArray: Products = new Products();
      productArray.image = file.filename;
      productArray.title = productData.title;
      productArray.description = productData.description;
      productArray.price = parseInt(String(productData.price));
      productArray.suggested_price = parseInt(
        String(productData.suggested_price),
      );
      return this.productsRepository.save(productArray);
    } catch (e) {
      fs.unlink(file.path, (err) => {
        if (err) {
          console.error(err);
          return;
        }
      });
    }
  }
}
