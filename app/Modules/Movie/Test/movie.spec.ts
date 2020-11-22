import test from 'japa';
import { Assert } from 'japa/build/src/Assert';
import supertest from 'supertest';
import { ResponseCodeEnum } from 'App/Common/Enum/response-code.enum';
import MovieModel from 'App/Modules/Movie/Models/movie.model';

const baseUrl = `http://${process.env.HOST}:${process.env.PORT}`;
const lotrImdbId = `tt0120737`;

test.group(`Movie`, () => {
  test(`it should create a LOTR movie`, async (assert: Assert) => {
    // since we do not use separate testing database, this will ensure test do not fail
    await MovieModel.query().where(`imdb_id`, lotrImdbId).delete();
    const response = await supertest(baseUrl)
      .post(`/movies`)
      .send({
        title: `lord`,
      })
      .expect(ResponseCodeEnum.Ok);
    assert.equal(response.body?.data?.director, `Peter Jackson`);
  });

  test(`it should not allow to create a LOTR movie twice`, async () => {
    await supertest(baseUrl)
      .post(`/movies`)
      .send({
        title: `lord`,
      })
      .expect(ResponseCodeEnum.UnprocessableEntity);
  });

  test(`it should display a LOTR movie on top of the list`, async (assert: Assert) => {
    const response = await supertest(baseUrl)
      .get(`/movies?orderByField=created_at`)
      .send()
      .expect(ResponseCodeEnum.Ok);
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    const movie = response.body?.data && response.body?.data[0];
    assert.equal(movie?.imdb_id, lotrImdbId);
  });
});
