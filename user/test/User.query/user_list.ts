import { expect } from 'chai';
import sinon from 'sinon';
import { connection_user } from '../../app/models';
import Session from '../session';

const user_list_data = [{
  full_name: 'Test User',
}, {
  full_name: 'Sample User',
}, {
  full_name: 'sammy Doe',
}];

describe('user_list', () => {
  let sandbox: sinon.SinonSandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('no argument', async () => {
    const id_to_record_map = await connection_user.manipulate([
      { create_user: { id: 'user1', ...user_list_data[0] } },
      { create_user: { id: 'user2', ...user_list_data[1] } },
    ]);
    const session = new Session();
    const result = await session.graphql('{ user_list { item_list { id } } }');
    expect(result).to.eql({
      data: {
        user_list: {
          item_list: [
            { id: String(id_to_record_map.user1.id) },
            { id: String(id_to_record_map.user2.id) },
          ],
        },
      },
    });
  });

  describe('argument', () => {
    it('full_name_istartswith', async () => {
      const id_to_record_map = await connection_user.manipulate([
        { create_user: { id: 'user1', ...user_list_data[0] } },
        { create_user: { id: 'user2', ...user_list_data[1] } },
        { create_user: { id: 'user3', ...user_list_data[2] } },
      ]);
      const session = new Session();
      const result = await session.graphql('{ user_list(full_name_istartswith: "SAM") { item_list { id } } }');
      expect(result).to.eql({
        data: {
          user_list: {
            item_list: [
              { id: String(id_to_record_map.user2.id) },
              { id: String(id_to_record_map.user3.id) },
            ],
          },
        },
      });
    });

    it('limit_count', async () => {
      const id_to_record_map = await connection_user.manipulate([
        { create_user: { id: 'user1', ...user_list_data[0] } },
        { create_user: { id: 'user2', ...user_list_data[1] } },
        { create_user: { id: 'user3', ...user_list_data[2] } },
      ]);
      const session = new Session();
      const result = await session.graphql('{ user_list(limit_count: 1) { item_list { id } } }');
      expect(result).to.eql({
        data: {
          user_list: {
            item_list: [
              { id: String(id_to_record_map.user1.id) },
            ],
          },
        },
      });
    });

    it('skip_count', async () => {
      const id_to_record_map = await connection_user.manipulate([
        { create_user: { id: 'user1', ...user_list_data[0] } },
        { create_user: { id: 'user2', ...user_list_data[1] } },
        { create_user: { id: 'user3', ...user_list_data[2] } },
      ]);
      const session = new Session();
      const result = await session.graphql('{ user_list(skip_count: 1) { item_list { id } } }');
      expect(result).to.eql({
        data: {
          user_list: {
            item_list: [
              { id: String(id_to_record_map.user2.id) },
              { id: String(id_to_record_map.user3.id) },
            ],
          },
        },
      });
    });
  });

  describe('field', () => {
    it('full_name', async () => {
      const id_to_record_map = await connection_user.manipulate([
        { create_user: { id: 'user1', ...user_list_data[0] } },
        { create_user: { id: 'user2', ...user_list_data[1] } },
      ]);
      const session = new Session();
      const result = await session.graphql('{ user_list { item_list { full_name } } }');
      expect(result).to.eql({
        data: {
          user_list: {
            item_list: [
              { full_name: user_list_data[0].full_name },
              { full_name: user_list_data[1].full_name },
            ],
          },
        },
      });
    });
  });
});
