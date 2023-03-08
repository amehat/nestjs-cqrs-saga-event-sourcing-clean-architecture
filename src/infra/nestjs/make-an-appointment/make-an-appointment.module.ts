import {Module} from "@nestjs/common";

import {ConsultationScheduleRepository} from "@domain/make-an-appointment/port/consultation-schedule.repository";

import ConsultationScheduleInMemoryRepository
    from "@infra/nestjs/make-an-appointment/adapter/consultation-schedule-in-memory.repository";
import AppointmentController from "@infra/nestjs/make-an-appointment/make-an-appointment.controller";

@Module({
    controllers: [AppointmentController],
    providers: [{
        provide: 'ConsultationScheduleRepository',
        useClass: ConsultationScheduleInMemoryRepository
    }]
})
export default class MakeAnAppointmentModule {}