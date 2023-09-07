import { ProductRepository } from "../../infra/repository/productRepository";
import { z } from 'zod'

const dataProductsSchema = z.array(z.object({
  product_code: z.coerce.number(),
  new_price: z.coerce.number(),
}))



type DataProducts = z.infer<typeof dataProductsSchema>

export class ProductService {
  async get () {
    const repository = new ProductRepository()
    return await repository.get()
  }

  async validate (dataProducts: DataProducts) {
    const productRepository = new ProductRepository()

    const result = []

    let dataProductsValidated
    try{
      dataProductsValidated = dataProductsSchema.parse(dataProducts)
    }
    catch (error) {
      return [{right: false,  error: 'Parâmetros invalidos'}]
    }
    for(const data of dataProductsValidated) {
      const product = await productRepository.getById(data.product_code)

      if (product ) {
        const displayProduct = {...product, code: product.code.toString()}
        if (product.sales_price/data.new_price < 1.1 && product.sales_price/data.new_price > 0.9) {
          result.push({right: true, product: displayProduct, new_price: data.new_price})
        }
        else {
          result.push({right: false, product: displayProduct, new_price: data.new_price, error: 'O preço do produto não deve ser 10% maior ou menor que o preço atual'})
        }
      }
      else {
        result.push({right: false, product, new_price: data.new_price, error: 'Produto não encontrado'})
      }
    }

    return result
  }

  async update (dataProducts: DataProducts) {
    const productRepository = new ProductRepository()
    const dataProductsValidated = dataProductsSchema.parse(dataProducts)

    for(const data of dataProductsValidated) {
      await productRepository.update(data.product_code, {sales_price: data.new_price})
    }

    const products = await productRepository.get()

    const displayProducts = products.map(product => ({...product, code: product.code.toString()}))

    return displayProducts
  }
}