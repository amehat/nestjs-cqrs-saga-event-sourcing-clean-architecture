import { Identifier } from '@shared/entity/identifier.entity';

export class UniqueIdEntity extends Identifier<string | number>{
    constructor(id?: string | number) {
        if (!id) {
            throw new Error('UniqueEntityID must have a non null value');
        }

        super(id)
    }
}



