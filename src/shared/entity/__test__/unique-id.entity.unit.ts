import {UniqueIdEntity} from "@shared/entity/unique-id.entity";

describe('UniqueIdEntity', () => {
    it('should be', () => {
        const id = 'my-id';
        const uniqueId = new UniqueIdEntity(id);
        expect(uniqueId.toValue()).toEqual(id);
    });
});
