import loginDataset from '../datasets/login.json';
import { LoginData } from '../models/LoginData';

export class LoginDataProvider {
  private static readonly data: LoginData[] = loginDataset;

  static getAll(): LoginData[] {
    console.log(`[LoginDataProvider] Retornando ${this.data.length} casos de login`);
    return this.data;
  }

  static getById(id: string): LoginData {
    console.log(`[LoginDataProvider] Buscando caso: "${id}"`);
    const entry = this.data.find((d) => d.id === id);
    if (!entry) throw new Error(`[LoginDataProvider] No existe caso con id: "${id}"`);
    return entry;
  }
}
