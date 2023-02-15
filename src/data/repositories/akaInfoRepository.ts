import { Connection, Repository } from 'typeorm';
import { AkaModel } from '../entities/akaInfo';

interface IAkaCreate {
  name: string;
  lastValueUsd: number;
  updated_at: Date;
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

  public async create({ name, lastValueUsd, updated_at }: IAkaCreate): Promise<AkaModel | false> {
    const n: Partial<AkaModel> = {
      name,
      lastValueUsd,
      updated_at,
    };
    if (this._orm) {
      const akaInfo = this._orm.create(n);
      const saved = await this._orm.save(akaInfo);
      return saved;
    }
    return false;
  }

  public async update(akaInfo: AkaModel): Promise<AkaModel> {
    const updated = await this._orm.update(akaInfo.id.toString(), akaInfo);
    console.debug(`updated: ${JSON.stringify(updated)}`);
    return akaInfo;
  }

  public async delete(id: string): Promise<void> {
    await this._orm.delete(id);
  }
}
