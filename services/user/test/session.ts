import _ from 'lodash';
import supertest from 'supertest';
import { app } from '../app/app';

class Session {
  private agent: supertest.SuperTest<supertest.Test>;

  constructor() {
    this.agent = supertest.agent(app);
  }

  async graphql(query: string, variables?: any) {
    const response = await new Promise<supertest.Response>((resolve, reject) => {
      this.agent.post('/graphql')
        .send({ query, variables })
        .end((err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        });
    });

    return _.omit(response.body, 'extensions');
  }
}

export default Session;
