import { expect } from 'chai';
import sinon from 'sinon';
import { connection_user } from '../../app/models';
import Session from '../session';

const user_data = {
  full_name: 'Test User',
};

describe('user', () => {
  let sandbox: sinon.SinonSandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('no argument', async () => {
    const id_to_record_map = await connection_user.manipulate([
      { create_user: { id: 'user', ...user_data } },
    ]);
    const session = new Session();
    const result = await session.graphql('{ user { id } }');
    expect(result).to.eql({
      data: {
        user: null,
      },
    });
  });

  describe('argument', () => {
    it('id', async () => {
      const id_to_record_map = await connection_user.manipulate([
        { create_user: { id: 'user', ...user_data } },
      ]);
      const session = new Session();
      const result = await session.graphql('query($id: ID) { user(id: $id) { id } }', { id: String(id_to_record_map.user.id) });
      expect(result).to.eql({
        data: {
          user: {
            id: String(id_to_record_map.user.id),
          },
        },
      });
    });

    it('id - not found', async () => {
      const session = new Session();
      const result = await session.graphql('query($id: ID) { user(id: $id) { id } }', { id: '1' });
      expect(result).to.eql({
        data: {
          user: null,
        },
      });
    });
  });

  describe('field', () => {
    it('full_name', async () => {
      const id_to_record_map = await connection_user.manipulate([
        { create_user: { id: 'user', ...user_data } },
      ]);
      const session = new Session();
      const result = await session.graphql('query($id: ID) { user(id: $id) { full_name } }', { id: String(id_to_record_map.user.id) });
      expect(result).to.eql({
        data: {
          user: {
            full_name: user_data.full_name,
          },
        },
      });
    });
  });
});
