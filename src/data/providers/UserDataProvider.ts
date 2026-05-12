import usersDataset from '../datasets/users.json';
import { UserApiData } from '../models/UserApiData';

export class UserDataProvider {
  private static readonly data: UserApiData[] = usersDataset as UserApiData[];

  static getAll(): UserApiData[] {
    console.log(`[UserDataProvider] Retornando ${this.data.length} casos`);
    return this.data;
  }

  static getById(id: string): UserApiData {
    console.log(`[UserDataProvider] Buscando caso: "${id}"`);
    const entry = this.data.find((d) => d.id === id);
    if (!entry) throw new Error(`[UserDataProvider] No existe caso con id: "${id}"`);
    return entry;
  }
}
