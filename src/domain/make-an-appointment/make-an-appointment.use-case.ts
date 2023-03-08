import MakeAnAppointmentRequest from "@domain/make-an-appointment/make-appointment.request";
import {MakeAnAppointmentPresenter} from "@domain/make-an-appointment/port/make-an-appointment.presenter";
import {ConsultationScheduleRepository} from "@domain/make-an-appointment/port/consultation-schedule.repository";
import AppointmentDateValueObject from "@domain/make-an-appointment/appointment-date.value-object";
import PatientWithReferringDoctorEntity from "@domain/make-an-appointment/patient-with-referring-doctor.entity";
import {ConsultationStatus} from "@domain/make-an-appointment/model/consultation.model";

import {UniqueIdEntity} from "@shared/entity/unique-id.entity";

export default class MakeAnAppointmentUseCase {
    constructor(private ConsultationSchedule: ConsultationScheduleRepository) {}

    async execute(request: MakeAnAppointmentRequest, presenter: MakeAnAppointmentPresenter): Promise<void> {
        const { appointmentHour, appointmentDate, patientEmail, patientFirstName, patientLastName, doctorName } = request;
        const { response } = presenter;

        const consultation = await this.ConsultationSchedule.getConsultationByDate(AppointmentDateValueObject.create(appointmentHour, appointmentDate))
        const consultationNotDefined = !consultation;
        const isAvailableConsultation = consultationNotDefined || consultation.status === ConsultationStatus.AVAILABLE;

        if (isAvailableConsultation) {
            await this.ConsultationSchedule.startBooking();
            try {
                await this.ConsultationSchedule.bookConsultation(
                    AppointmentDateValueObject.create(appointmentHour, appointmentDate),
                    PatientWithReferringDoctorEntity.registerNewPatient({
                        email: patientEmail,
                        lastName: patientLastName,
                        firstName: patientFirstName,
                        doctorName
                    }, new UniqueIdEntity(patientEmail)));
                await this.ConsultationSchedule.dispatchBooking();
                response.statusOfTheAppointment = `The appointment with Doctor ${doctorName}, ${appointmentDate} at ${appointmentHour} for ${patientFirstName} ${patientLastName} is confirmed`;
                return;
            } catch (errorBooking) {
                await this.ConsultationSchedule.rollbackBooking();
                response.appointmentError = {
                    code: 409,
                    message: 'Conflict'
                }
            } finally {
                await this.ConsultationSchedule.freeBooking();
            }
        } else {
            response.appointmentError = {
                code: 409,
                message: 'Conflict'
            }
        }
    }
}