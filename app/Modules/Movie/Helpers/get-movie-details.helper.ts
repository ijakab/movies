import Env from '@ioc:Adonis/Core/Env';
import got from 'got';
import customConfig from 'Config/custom';
import { HttpError } from 'App/Exceptions/HttpError';
import { ResponseCodeEnum } from 'App/Enum/response-code.enum';

export async function getMovieDetails (title: string): Promise<any> {
  const omdbApiKey = Env.get(`OMDB_API_KEY`);
  const omdbBaseUrl = customConfig.omdbBaseUrl;

  const response = await got.get(`${omdbBaseUrl}/?apiKey=${omdbApiKey}&t=${title}`);
  const body = JSON.parse(response.body);

  if (body.Error) {
    // for now we'll just assume it is not found, although we should check this
    HttpError.throwError(ResponseCodeEnum.NotFound, body.Error);
  }
  return body;
}
