import PatientWithReferringDoctorEntity from "@domain/make-an-appointment/patient-with-referring-doctor.entity";
import AppointmentDateValueObject from "@domain/make-an-appointment/appointment-date.value-object";
import {Consultation} from "@domain/make-an-appointment/model/consultation.model";

export interface ConsultationScheduleRepository {
    startBooking(): Promise<void>; // start transaction
    bookConsultation(appointmentDate: AppointmentDateValueObject, patient: PatientWithReferringDoctorEntity): Promise<void>; // save in memory
    dispatchBooking(): Promise<void>; // commit & end transaction (persist data)
    rollbackBooking(): Promise<void>; // rollback
    freeBooking(): Promise<void>; // release

    getConsultationByDate(appointmentDate: AppointmentDateValueObject): Promise<Consultation>;
}