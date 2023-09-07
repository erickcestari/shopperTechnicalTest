import { Prisma } from "@prisma/client";
import prisma from "../../prisma";


export class PackRepository {

  async get() {
    return await prisma.pack.findMany();
  }

  async getPackByProductId(code: number) {
    return await prisma.pack.findMany({
      where: {
        product_id: code
      }
    });
  }

  async getPackByPackId(pack_id: number) {
    return await prisma.pack.findMany({
      where: {
        pack_id
      }
    });
  }

  async update(id: number, data: Prisma.PackUncheckedUpdateInput) {
    return await prisma.pack.update({
      where: {
        id
      },
      data: {
        ...data
      }
    });
  }
}