import { UniqueIdEntity } from '@shared/entity/unique-id.entity';

const isEntity = (v: any): v is Entity<any> =>  v instanceof Entity;

export abstract class Entity<T> {
    protected readonly _id: UniqueIdEntity;
    protected props: T;

    constructor (props: T, id?: UniqueIdEntity) {
        this._id = id ? id : new UniqueIdEntity();
        this.props = props;
    }

    public equals (object?: Entity<T>) : boolean {

        if (object == null || object == undefined) {
            return false;
        }

        if (this === object) {
            return true;
        }

        if (!isEntity(object)) {
            return false;
        }

        return this._id.equals(object._id);
    }
}