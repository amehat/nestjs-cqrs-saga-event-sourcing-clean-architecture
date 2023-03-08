import {ConsultationScheduleRepository} from "@domain/make-an-appointment/port/consultation-schedule.repository";
import PatientWithReferringDoctorEntity from "@domain/make-an-appointment/patient-with-referring-doctor.entity";
import AppointmentDateValueObject from "@domain/make-an-appointment/appointment-date.value-object";
import {Consultation, ConsultationStatus} from "@domain/make-an-appointment/model/consultation.model";

enum BookingStatus {
    START = 'start booking',
    PENDING = 'pending booking',
    FINISH = 'finish booking',
    NONE = 'none booking',
    CANCELED = 'canceled booking'
}

export default class ConsultationScheduleInMemoryRepository implements ConsultationScheduleRepository {
    private consultation: Set<Consultation>;
    private booking: { appointmentDate: AppointmentDateValueObject, patient: PatientWithReferringDoctorEntity } | undefined;
    private bookingStatus: BookingStatus;

    constructor() {
        this.consultation = new Set<Consultation>();
        this.bookingStatus = BookingStatus.NONE;
    }

    deleteAllAppointments () {
        this.consultation = new Set<Consultation>();
    }

    async startBooking(): Promise<void> {
        this.bookingStatus = BookingStatus.START;
    }

    async bookConsultation(appointmentDate: AppointmentDateValueObject, patient: PatientWithReferringDoctorEntity): Promise<void> {
        this.bookingStatus = BookingStatus.PENDING;
        this.booking = { appointmentDate, patient };
    }

    prepareBooking(hour: string, date: string, firstName: string, lastName: string, email: string, doctorName: string): Consultation {
        return {
            hour,
            date,
            patientFirstName: firstName,
            patientLastName: lastName,
            patientEmail: email,
            doctorName: doctorName,
            status: ConsultationStatus.RESERVED
        }
    }

    async dispatchBooking(): Promise<void> {
        if (this.booking) {
            const { appointmentDate, patient } = this.booking;
            const { hour, date } = appointmentDate;
            const { firstName, lastName, email, doctorName } = patient;
            const bookingPrepared = this.prepareBooking(hour, date, firstName, lastName, email, doctorName);
            if (this.consultation.has(bookingPrepared)) {
                throw new Error('This consultation is already booked.')
            }
            this.consultation.add(bookingPrepared);
            this.bookingStatus = BookingStatus.FINISH;
        }
    }

    async rollbackBooking(): Promise<void> {
        this.booking = undefined;
        this.bookingStatus = BookingStatus.CANCELED;
    }

    async freeBooking(): Promise<void> {
        this.bookingStatus = BookingStatus.NONE;
    }


    async getConsultationByDate(appointmentDate: AppointmentDateValueObject): Promise<Consultation> {
        return Array.from(this.consultation).find((consultation: Consultation) => consultation.hour === appointmentDate.hour && consultation.date === appointmentDate.date);
    }
}
