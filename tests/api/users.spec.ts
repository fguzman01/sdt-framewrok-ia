import { test, expect } from '@playwright/test';
import { UserApiFlow } from '../../src/flows/UserApiFlow';
import { UserDataProvider } from '../../src/data/providers/UserDataProvider';
import { ApiAssertions } from '../../src/utils/ApiAssertions';

test.describe('Users API - JSONPlaceholder', () => {

  test('listar usuarios retorna lista con estructura válida', async ({ request }) => {
    const data = UserDataProvider.getById('get_users');
    const flow = new UserApiFlow(request);

    await test.step('Flujo: obtener lista de usuarios', async () => {
      const users = await flow.getUsers();

      expect(users.length, `lista debe tener al menos 1 usuario y tiene ${users.length}`).toBeGreaterThan(0);
      ApiAssertions.assertBodyDefined(users[0].id, 'id');
      ApiAssertions.assertBodyDefined(users[0].email, 'email');
      await ApiAssertions.attachBody(users);
    });
  });

  test('obtener usuario existente retorna datos correctos', async ({ request }) => {
    const data = UserDataProvider.getById('get_user_existing');
    const flow = new UserApiFlow(request);

    await test.step('Flujo: obtener usuario por id', async () => {
      const { status, body } = await flow.getUserById(data.userId!);

      ApiAssertions.assertStatus(status, data.expectedStatus);
      ApiAssertions.assertBodyField(body!.id, data.userId, 'id');
      ApiAssertions.assertBodyDefined(body!.email, 'email');
      await ApiAssertions.attachBody(body);
    });
  });

  test('obtener usuario inexistente retorna 404', async ({ request }) => {
    const data = UserDataProvider.getById('get_user_not_found');
    const flow = new UserApiFlow(request);

    await test.step('Flujo: obtener usuario inexistente', async () => {
      const { status, body } = await flow.getUserById(data.userId!);

      ApiAssertions.assertStatus(status, data.expectedStatus);
      ApiAssertions.assertBodyNull(body, 'body');
    });
  });

  test('crear usuario retorna 201 con datos del usuario creado', async ({ request }) => {
    const data = UserDataProvider.getById('create_user');
    const flow = new UserApiFlow(request);

    await test.step('Flujo: crear usuario', async () => {
      const { status, body } = await flow.createUser(data.createPayload!);

      ApiAssertions.assertStatus(status, data.expectedStatus);
      ApiAssertions.assertBodyField(body.name, data.createPayload!.name, 'name');
      ApiAssertions.assertBodyField(body.job, data.createPayload!.job, 'job');
      ApiAssertions.assertBodyDefined(body.id, 'id');
      await ApiAssertions.attachBody(body);
    });
  });

  test('actualizar usuario retorna 200 con datos actualizados', async ({ request }) => {
    const data = UserDataProvider.getById('update_user');
    const flow = new UserApiFlow(request);

    await test.step('Flujo: actualizar usuario', async () => {
      const { status, body } = await flow.updateUser(data.userId!, data.updatePayload!);

      ApiAssertions.assertStatus(status, data.expectedStatus);
      ApiAssertions.assertBodyField(body.name, data.updatePayload!.name, 'name');
      ApiAssertions.assertBodyField(body.job, data.updatePayload!.job, 'job');
      await ApiAssertions.attachBody(body);
    });
  });

  test('eliminar usuario retorna 200', async ({ request }) => {
    const data = UserDataProvider.getById('delete_user');
    const flow = new UserApiFlow(request);

    await test.step('Flujo: eliminar usuario', async () => {
      const { status } = await flow.deleteUser(data.userId!);

      ApiAssertions.assertStatus(status, data.expectedStatus);
    });
  });

});
