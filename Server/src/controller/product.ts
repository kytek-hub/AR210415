import { Response, Request } from 'express'
import { Product } from '../model'

interface ReponseType {
  success: boolean
  data: any
}

export default class ProductServices {
  static async get (
    req: Request,
    res: Response<ReponseType>
  ): Promise<Response<ReponseType>> {
    try {
      const payload = await Product.find({})

      return res.json({ success: true, data: payload })
    } catch (error) {
      return res.status(500)
    }
  }

  static async getById (
    req: Request,
    res: Response<ReponseType>
  ): Promise<Response<ReponseType>> {
    try {
      const id: string = req.params.id
      const payload = await Product.findOne({ id })

      return res.json({ success: true, data: payload })
    } catch (error) {
      return res.status(500)
    }
  }

  static async post (
    req: Request,
    res: Response<ReponseType>
  ): Promise<Response<ReponseType>> {
    try {
      const {
        id,
        name,
        image,
        price
      } = req.body

      const payload = await Product.create({
        id,
        name,
        image,
        price
      })

      return res.json({ success: true, data: payload })
    } catch (error) {
      return res.status(500)
    }
  }

  static async put (
    req: Request,
    res: Response<ReponseType>
  ): Promise<Response<ReponseType>> {
    try {
      const {
        id,
        name,
        image,
        price
      } = req.body

      const payload = await Product.findOneAndUpdate({ id }, {
        name,
        image,
        price
      })

      return res.json({ success: true, data: payload })
    } catch (error) {
      return res.status(500)
    }
  }

  static async delete (
    req: Request,
    res: Response<ReponseType>
  ): Promise<Response<ReponseType>> {
    try {
      const payload = await Product.findOneAndDelete({ id: req.params.id })

      return res.json({ success: true, data: payload })
    } catch (error) {
      return res.status(500)
    }
  }
}
