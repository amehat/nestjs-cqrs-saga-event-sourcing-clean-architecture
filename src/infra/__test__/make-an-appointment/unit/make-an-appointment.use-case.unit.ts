import MakeAnAppointmentUseCase from "@domain/make-an-appointment/make-an-appointment.use-case";
import MakeAnAppointmentRequest from "@domain/make-an-appointment/make-appointment.request";
import MakeAnAppointmentJsonPresenter from "@infra/nestjs/make-an-appointment/make-an-appointment-json.presenter";
import MakeAnAppointmentResponse from "@domain/make-an-appointment/make-an-appointment.response";

import ConsultationScheduleInMemoryRepository
    from "@infra/nestjs/make-an-appointment/adapter/consultation-schedule-in-memory.repository";
import MakeAnAppointmentJsonView from "@infra/nestjs/make-an-appointment/make-an-appointment-json.view";

describe('MakeAnAppointmentUseCase', () => {
    let useCase: MakeAnAppointmentUseCase;
    let consultationSchedule: ConsultationScheduleInMemoryRepository;

    it('should be defined', () => {
        expect(MakeAnAppointmentUseCase).toBeDefined();
    });

    beforeAll(async () => {
        consultationSchedule = new ConsultationScheduleInMemoryRepository();
    });

    beforeEach(async () => {
        consultationSchedule.deleteAllAppointments();
        useCase = new MakeAnAppointmentUseCase(consultationSchedule);
    })

    it('should correct instance', () => {
        expect(useCase).toBeInstanceOf(MakeAnAppointmentUseCase);
    });

    it('should use execute method with request and presenter but it returns nothing', async () => {
        const request = new MakeAnAppointmentRequest('4: pm', 'Monday, March 18, 2023', 'joe', 'doe', 'joe@doe.com', 'knock');
        const response = new MakeAnAppointmentResponse();
        const presenter = new MakeAnAppointmentJsonPresenter(response);
        expect(await useCase.execute(request, presenter)).toBeUndefined();
    });

    it('should return a valid status', async () => {
        const appointmentHour = '4: pm';
        const appointmentDate = 'Monday, March 18, 2023';
        const patientFirstName = 'joe';
        const patientLastName = 'doe';
        const patientEmail = 'joe@doe.com';
        const doctorName = 'knock';

        const request = new MakeAnAppointmentRequest(appointmentHour, appointmentDate, patientFirstName, patientLastName, patientEmail, doctorName);
        const response = new MakeAnAppointmentResponse();
        const presenter = new MakeAnAppointmentJsonPresenter(response);
        await useCase.execute(request, presenter);
        const view = new MakeAnAppointmentJsonView();
        const viewModel = view.generationView(presenter.viewModel());

        expect(viewModel.statusOfTheAppointment).toEqual({ message: `The appointment with Doctor ${doctorName}, ${appointmentDate} at ${appointmentHour} for ${patientFirstName} ${patientLastName} is confirmed` })
    });
});
