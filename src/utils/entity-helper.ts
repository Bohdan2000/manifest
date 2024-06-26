import { instanceToPlain, Exclude } from 'class-transformer';
import { AfterLoad, BaseEntity } from 'typeorm';

export class EntityHelper extends BaseEntity {
  @Exclude({ toPlainOnly: true })
  __entity?: string;

  @AfterLoad()
  setEntityName() {
    this.__entity = this.constructor.name;
  }

  toJSON() {
    return instanceToPlain(this);
  }
}
