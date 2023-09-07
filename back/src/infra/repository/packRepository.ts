import prisma from "../../prisma";

export class PackRepository {

  async getPackByProductId(code: number) {
    return await prisma.pack.findMany({
      where: {
        product_id: code
      }
    })
  }

  async getPackByPackId(pack_id: number) {
    return await prisma.pack.findMany({
      where: {
        pack_id
      }
    })
  }
}