import { Prisma } from "@prisma/client";
import prisma from "../../prisma";


export class PackRepository {

  async get() {
    return await prisma.pack.findMany();
  }

  async getById(code: number) {
    return await prisma.pack.findMany({
      where: {
        product_id: code
      }
    });
  }
}