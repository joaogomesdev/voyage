import { Injectable } from '@nestjs/common';
import slugify from 'slugify';
import { PrismaService } from '../database/prisma/prisma.service';

interface CreateProductParams {
  title: string;
}

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  index() {
    return this.prisma.product.findMany();
  }

  findById(id: string) {
    return this.prisma.product.findUnique({
      where: { id },
    });
  }

  async create({ title }: CreateProductParams) {
    const slug = slugify(title, {
      lower: true,
    });

    const productWithSameSlug = await this.prisma.product.findUnique({
      where: { slug },
    });

    if (productWithSameSlug) {
      throw new Error('Another product with same slug already exists');
    }

    return await this.prisma.product.create({
      data: {
        title,
        slug,
      },
    });
  }
}
