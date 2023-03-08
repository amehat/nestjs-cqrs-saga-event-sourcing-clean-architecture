import { Module } from "@nestjs/common";

import ApplicationController from "@infra/nestjs/application/application.controller";
import MakeAnAppointmentModule from "@infra/nestjs/make-an-appointment/make-an-appointment.module";

@Module({
    controllers: [ApplicationController],
    imports: [MakeAnAppointmentModule]
})
export default class ApplicationModule {}
