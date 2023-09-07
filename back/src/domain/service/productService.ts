import { PackRepository } from "../../infra/repository/packRepository";
import { ProductRepository } from "../../infra/repository/productRepository";
import { z } from 'zod'

const dataProductsSchema = z.array(z.object({
  product_code: z.coerce.number(),
  new_price: z.coerce.number(),
}))

type DataProducts = z.infer<typeof dataProductsSchema>

export class ProductService {
  async get() {
    const repository = new ProductRepository()
    const products = await repository.get()

    const displayProducts = products.map(product => ({ ...product, code: product.code.toString() }))

    return displayProducts
  }

  async validate(dataProducts: DataProducts) {
    const productRepository = new ProductRepository()

    const result = []

    let dataProductsValidated
    try {
      dataProductsValidated = dataProductsSchema.parse(dataProducts)
    }
    catch (error) {
      return [{ right: false, error: 'Parâmetros invalidos' }]
    }
    for (const data of dataProductsValidated) {
      const product = await productRepository.getById(data.product_code)

      if (product) {
        const displayProduct = { ...product, code: product.code.toString() }
        if (product.sales_price / data.new_price < 1.1 && product.sales_price / data.new_price > 0.9) {
          result.push({ right: true, product: displayProduct, new_price: data.new_price })
        }
        else {
          result.push({ right: false, product: displayProduct, new_price: data.new_price, error: 'O preço do produto não deve ser 10% maior ou menor que o preço atual' })
        }
      }
      else {
        result.push({ right: false, product, new_price: data.new_price, error: 'Produto não encontrado' })
      }
    }

    return result
  }

  async update(dataProducts: DataProducts) {
    const productRepository = new ProductRepository();
    const packRepository = new PackRepository();
    const dataProductsValidated = dataProductsSchema.parse(dataProducts);

    for (const data of dataProductsValidated) {
      const product = await productRepository.getById(data.product_code);

      if (!product) {
        throw new Error('Produto não encontrado');
      }

      await productRepository.update(data.product_code, { sales_price: data.new_price });

      const packs = await packRepository.getPackByPackId(data.product_code)

      if (packs.length == 0) {
        const packs = await packRepository.getPackByProductId(data.product_code)
        for (const pack of packs) {
          let newPrice = 0
          const packWithMoreProducts = await packRepository.getPackByPackId(Number(pack.pack_id))
          for (const packWithMoreProduct of packWithMoreProducts) {
            const product = await productRepository.getById(Number(packWithMoreProduct.product_id))
            if (product) {
              newPrice += Number(product.sales_price) * Number(packWithMoreProduct.qty)
            }
          }
          await productRepository.update(Number(pack.pack_id), { sales_price: newPrice });
        }
        continue
      }
      if (packs.length == 1) {
        const pack = packs[0]
        const newPrice = Number(data.new_price) / Number(pack.qty)
        await productRepository.update(Number(pack.product_id), { sales_price: newPrice });
      }


    }

    const products = await productRepository.get();

    const displayProducts = products.map((product) => ({ ...product, code: product.code.toString() }));

    return displayProducts;
  }
}