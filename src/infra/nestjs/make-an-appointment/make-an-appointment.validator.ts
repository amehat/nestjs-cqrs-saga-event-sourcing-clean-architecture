import {BadRequestException} from "@nestjs/common";

import AppointmentDto from "@infra/nestjs/make-an-appointment/appointment.dto";


export const validationOfTheElementsOfTheAppointment = (appointmentDto: AppointmentDto) => {
    const { hour, date, firstName, lastName, email, nameDoctor } = appointmentDto;

    if (!hour || !date || !firstName || !lastName || !email || !nameDoctor) {
        throw new BadRequestException();
    }

    return true
}