import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
  public async store({ request, response }: HttpContextContract) {
    const input = request.only(['username', 'email'])

    try {
      const users = await User.create(input)

      return response.status(200).json({ code: 200, status: 'success', data: users })
    } catch (err) {
      return response.status(500).json({ code: 500, status: 'error', message: err.message })
    }
  }

  public async index({ response }: HttpContextContract) {
    const users = await User.all();

    return response.status(200).json({ code: 200, status: 'success', data: users });
  }

  /**
   * show detail 
   */
  public async show({ response, params }: HttpContextContract) {
    try {
      const users = await User.findBy('id', params.id)
      return response.status(200).json({
        code: 200,
        status: 'success',
        data: users
      })
    } catch (error) {
      return response.status(500).json({
        code: 500,
        status: 'error',
        data: error.message
      })
    }
  }

  public async update({ response, request, params }: HttpContextContract) {
    const input = request.only(['username', 'email'])
    try {
      const user = await User.findBy('id', params.id)
      user?.merge(input)
      return response.status(200).json({
        code: 200,
        status: 'success',
        data: user
      })
    } catch (error) {
      return response.status(500).json({
        code: 500,
        status: 'error',
        data: error.message
      })
    }
  }

  public async destroy({ response, params }: HttpContextContract) {
    try {
      const user = await User.findBy('id', params.id)
      await user?.delete()
      return response.status(200).json({
        code: 200,
        status: 'success',
        data: user
      })
    } catch (error) {
      return response.status(500).json({
        code: 500,
        status: 'error',
        data: error.message
      })
    }
  }
}
