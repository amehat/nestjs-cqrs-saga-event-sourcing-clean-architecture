import {Entity} from "@shared/entity/entity";
import {UniqueIdEntity} from "@shared/entity/unique-id.entity";

import {PatientWithReferringDoctor as IPatientWithReferringDoctor} from "@domain/make-an-appointment/model/patient-with-referring-doctor.entity.model";

export default class PatientWithReferringDoctorEntity extends Entity<IPatientWithReferringDoctor>{
    get firstName(): string {
        return this.props.firstName;
    }

    get lastName(): string {
        return this.props.lastName;
    }

    get email(): string {
        return this.props.email;
    }

    get doctorName(): string {
        return this.props.doctorName;
    }

    get id(): string {
        return this._id.toValue().toString();
    }

    private constructor (props: IPatientWithReferringDoctor, id?: UniqueIdEntity) {
        super(props, id);
    }

    static registerNewPatient (props: IPatientWithReferringDoctor, id?: UniqueIdEntity) : PatientWithReferringDoctorEntity {
        return new PatientWithReferringDoctorEntity(props, id)
    }
}

