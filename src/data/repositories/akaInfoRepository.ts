import { Connection, Repository } from 'typeorm';
import { AkaModel } from '../entities/akaInfo';

interface IAkaCreate {
  name: string;
  lastValueUsd: Number;
}

export class AkaInfoRepository {
  private _orm: Repository<AkaModel>;

  constructor(connection: Connection) {
    if (connection && !this._orm) {
      this._orm = connection.getRepository(AkaModel);
    }
  }

  public async any(): Promise<boolean> {
    if (this._orm) {
      const akaInfo = await this._orm.findOne();
      return akaInfo !== undefined;
    }
    return false;
  }

  public async getAll(): Promise<AkaModel[]> {
    if (this._orm) {
      const akaInfo = await this._orm.find();
      return akaInfo;
    }
    return [];
  }

  public async create({ name, lastValueUsd }: IAkaCreate): Promise<AkaModel> {
    const n: Partial<AkaModel> = {
      name,
      lastValueUsd,
    };
    const akaInfo = this._orm.create(n);

    const saved = await this._orm.save(akaInfo);
    console.debug('saved AkaInfo: ', saved);
    return saved;
  }

  public async update(akaInfo: AkaModel): Promise<AkaModel> {
    const updated = await this._orm.update(akaInfo.id, akaInfo);
    console.debug(`updated: ${JSON.stringify(updated)}`);
    return akaInfo;
  }

  public async delete(id: string): Promise<void> {
    await this._orm.delete(id);
  }
}
