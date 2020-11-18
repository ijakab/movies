import Route from '@ioc:Adonis/Core/Route'
import HealthCheck from '@ioc:Adonis/Core/HealthCheck'
import { HttpContext } from '@adonisjs/http-server/build/src/HttpContext'

Route.get(`health`, async ({ response }: HttpContext) => {
  const report = await HealthCheck.getReport()
  return report.healthy
    ? response.ok(report)
    : response.badRequest(report)
})
