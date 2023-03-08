import {ValueObject} from "@shared/value-object/value-object";
import {AppointmentDate} from "@domain/make-an-appointment/model/appointment-date.model";

export default class AppointmentDateValueObject extends ValueObject<AppointmentDate>{
    get hour(): string {
        return this.props.hour;
    }

    get date(): string {
        return this.props.date;
    }

    private constructor(props: AppointmentDate) {
        super(props);
    }

    static create(hour: string, date: string): AppointmentDateValueObject {
        if (hour === undefined || hour === null) {
            throw new Error('Time must be set')
        }
        if (date === undefined || date === null) {
            throw new Error('date must be set')
        }

        return new AppointmentDateValueObject({ hour, date });
    }

}
