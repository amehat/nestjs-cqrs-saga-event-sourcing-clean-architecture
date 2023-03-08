import {Body, Controller, Get, HttpException, Post} from "@nestjs/common";
import MakeAnAppointmentRequest from "@domain/make-an-appointment/make-appointment.request";
import MakeAnAppointmentResponse from "@domain/make-an-appointment/make-an-appointment.response";
import MakeAnAppointmentUseCase from "@domain/make-an-appointment/make-an-appointment.use-case";

import MakeAnAppointmentJsonPresenter from "@infra/nestjs/make-an-appointment/make-an-appointment-json.presenter";
import MakeAnAppointmentJsonView from "@infra/nestjs/make-an-appointment/make-an-appointment-json.view";
import ConsultationScheduleInMemoryRepository
    from "@infra/nestjs/make-an-appointment/adapter/consultation-schedule-in-memory.repository";
import AppointmentDto from "@infra/nestjs/make-an-appointment/appointment.dto";
import {validationOfTheElementsOfTheAppointment} from "@infra/nestjs/make-an-appointment/make-an-appointment.validator";

@Controller('appointment')
export default class AppointmentController {
    @Get()
    listAppointment() {
        return []
    }

    @Post()
    async index(@Body() appointmentDto: AppointmentDto) {
        const { hour, date, firstName, lastName, email, nameDoctor } = appointmentDto;
        validationOfTheElementsOfTheAppointment(appointmentDto);
        const useCase = new MakeAnAppointmentUseCase(new ConsultationScheduleInMemoryRepository());
        const request = new MakeAnAppointmentRequest(hour, date, firstName, lastName, email, nameDoctor);
        const response = new MakeAnAppointmentResponse();
        const presenter = new MakeAnAppointmentJsonPresenter(response);

        await useCase.execute(request, presenter);
        const view = new MakeAnAppointmentJsonView();
        const viewModel = view.generationView(presenter.viewModel());

        if(viewModel.appointmentError !== undefined) {
            throw new HttpException(viewModel.appointmentError.message, viewModel.appointmentError.code);
        }

        return viewModel.statusOfTheAppointment;
    }
}
