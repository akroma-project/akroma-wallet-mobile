import { Connection, Repository } from 'typeorm';
import { WalletModel } from '../entities/wallet';

interface IWalletCreate {
  name: string;
  address: string;
  pin: string;
  encrypted: string;
}

export class WalletsRepository {
  private _orm: Repository<WalletModel>;

  constructor(connection: Connection) {
    if (connection) {
      this._orm = connection.getRepository(WalletModel);
    }
  }

  public async any(): Promise<boolean> {
    const wallets = await this._orm.findOne();
    return wallets !== undefined;
  }

  public async getAll(): Promise<WalletModel[]> {
    const wallets = await this._orm.find();
    return wallets;
  }

  public async create({
    name,
    address,
    pin,
    encrypted, //used for import.
  }: IWalletCreate): Promise<WalletModel> {
    const n: Partial<WalletModel> = {
      name,
      address,
      pin,
      encrypted,
    };
    const wallet = this._orm.create(n);

    const saved = await this._orm.save(wallet);
    console.debug('saved wallet: ', saved);
    return saved;
  }

  public async update(wallet: WalletModel): Promise<WalletModel> {
    const updated = await this._orm.update(wallet.id, wallet);
    console.debug(`updated: ${JSON.stringify(updated)}`);
    return wallet;
  }

  public async delete(id: string): Promise<void> {
    await this._orm.delete(id);
  }
}
