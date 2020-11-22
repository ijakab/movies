import test from 'japa';
import { Assert } from 'japa/build/src/Assert';
import supertest from 'supertest';
import { ResponseCodeEnum } from 'App/Common/Enum/response-code.enum';
import MovieModel from 'App/Modules/Movie/Models/movie.model';

const baseUrl = `http://${process.env.HOST}:${process.env.PORT}`;
const lotrImdbId = `tt0120737`;

test.group(`Comment`, () => {
  test(`it should create a LOTR comment`, async (assert: Assert) => {
    // since we do not use separate testing database, this will ensure test do not fail
    const lotrId = await MovieModel.query().where(`imdb_id`, lotrImdbId).firstOrFail();
    const response = await supertest(baseUrl)
      .post(`/comments`)
      .send({
        movie_id: lotrId.id,
        content: `That was fun`,
      })
      .expect(ResponseCodeEnum.Ok);
    assert.equal(response.body?.data?.content, `That was fun`);
  });

  test(`it should not create to a non-existing movie`, async () => {
    // since we do not use separate testing database, this will ensure test do not fail
    await supertest(baseUrl)
      .post(`/comments`)
      .send({
        movie_id: 8000,
        content: `That was fun`,
      })
      .expect(ResponseCodeEnum.UnprocessableEntity);
  });

  test(`it should have that comment on top of list`, async (assert: Assert) => {
    // since we do not use separate testing database, this will ensure test do not fail
    const response = await supertest(baseUrl)
      .get(`/comments?orderByField=created_at`)
      .expect(ResponseCodeEnum.Ok);
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    const comment = response.body?.data && response.body?.data[0];
    assert.equal(comment?.content, `That was fun`);
  });
});
