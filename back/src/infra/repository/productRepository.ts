import { Prisma } from "@prisma/client";
import prisma from "../../prisma";


export class ProductRepository {

  async get() {
    return await prisma.product.findMany();
  }

  async getById(id: number) {
    return await prisma.product.findUnique({
      where: {
        id
      }
    });
  }

  async create(data: Prisma.ProductUncheckedCreateInput) {
    return await prisma.product.create({
      data
    });
  }

  async update(id: number, data: Prisma.ProductUncheckedUpdateInput) {
    return await prisma.product.update({
      where: {
        id
      },
      data
    });
  }

  async delete(id: number) {
    return await prisma.product.delete({
      where: {
        id
      }
    });
  }
  
}