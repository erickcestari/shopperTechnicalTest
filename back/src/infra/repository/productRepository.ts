import { Prisma } from "@prisma/client";
import prisma from "../../prisma";


export class ProductRepository {

  async get() {
    return await prisma.product.findMany();
  }

  async getById(code: number) {
    return await prisma.product.findUnique({
      where: {
        code
      }
    });
  }

  async create(data: Prisma.ProductUncheckedCreateInput) {
    return await prisma.product.create({
      data
    });
  }

  async update(code: number, data: Prisma.ProductUncheckedUpdateInput) {
    return await prisma.product.update({
      where: {
        code
      },
      data: {
        ...data
      }
    });
  }

  async delete(code: number) {
    return await prisma.product.delete({
      where: {
        code
      }
    });
  }
  
}