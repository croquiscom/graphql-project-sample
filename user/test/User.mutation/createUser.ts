import { expect } from 'chai';
import _ from 'lodash';
import sinon from 'sinon';
import { User } from '../../app/models';
import Session from '../session';

describe('createUser', () => {
  let sandbox: sinon.SinonSandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should succeed to create a user', async () => {
    const session = new Session();
    const query = 'mutation($input: CreateUserInput!) { createUser(input: $input) { id full_name } }';
    const input = {
      full_name: 'Test User',
    };
    const result = await session.graphql(query, { input });
    const id: string = _.get(result, 'data.createUser.id');
    expect(result).to.eql({
      data: {
        createUser: {
          id,
          full_name: 'Test User',
        },
      },
    });
    expect(await User.where()).to.eql([
      { id: Number(id), full_name: 'Test User' },
    ]);
  });
});
