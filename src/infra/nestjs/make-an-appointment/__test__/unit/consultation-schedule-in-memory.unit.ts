import {ConsultationScheduleRepository} from "@domain/make-an-appointment/port/consultation-schedule.repository";
import {ConsultationStatus} from "@domain/make-an-appointment/model/consultation.model";
import AppointmentDateValueObject from "@domain/make-an-appointment/appointment-date.value-object";
import PatientWithReferringDoctorEntity from "@domain/make-an-appointment/patient-with-referring-doctor.entity";

import {UniqueIdEntity} from "@shared/entity/unique-id.entity";

import ConsultationScheduleInMemoryRepository
    from "@infra/nestjs/make-an-appointment/adapter/consultation-schedule-in-memory.repository";

describe('ConsultationScheduleInMemory', () => {
    it('should bd defined', () => {
        expect(ConsultationScheduleInMemoryRepository).toBeDefined();
    });

    let consultationSchedule: ConsultationScheduleRepository;

    beforeAll(() => {
        consultationSchedule = new ConsultationScheduleInMemoryRepository();
    });

    describe('getConsultationByDate', () => {

        it('should be undefined', async () => {
            const getConsultation = async () => await consultationSchedule.getConsultationByDate(AppointmentDateValueObject.create('4:00', 'Monday, March 18, 2023'));
            expect(await getConsultation()).toBeUndefined();
        });

        it('should be a consultation after book consultation', async () => {
            const hour = '4:00';
            const date = 'Monday, March 18, 2023';
            const firstName = 'joe';
            const lastName = 'doe';
            const email = 'joe@doe.com';
            const doctorName = 'Knock';
            const bookingDate = AppointmentDateValueObject.create(hour, date);
            const bookingPatient = PatientWithReferringDoctorEntity.registerNewPatient({
                firstName,
                lastName,
                email,
                doctorName,
            }, new UniqueIdEntity(email));
            const getConsultation = async (bookingDate: AppointmentDateValueObject) => await consultationSchedule.getConsultationByDate(bookingDate);
            expect(await getConsultation(bookingDate)).toBeUndefined();
            await consultationSchedule.startBooking();
            await consultationSchedule.bookConsultation(bookingDate, bookingPatient)
            await consultationSchedule.dispatchBooking();
            expect(await getConsultation(bookingDate)).toEqual({
                date,
                hour,
                patientFirstName: firstName,
                patientLastName: lastName,
                patientEmail: email,
                doctorName,
                status: ConsultationStatus.RESERVED
            });
        });

    });
});