import MakeAnAppointmentResponse from "@domain/make-an-appointment/make-an-appointment.response";
import {Error} from "@shared/error";
import {MakeAnAppointmentView} from "@infra/nestjs/make-an-appointment/model";

export default class MakeAnAppointmentJsonView {
    generationView(viewModel: MakeAnAppointmentResponse): MakeAnAppointmentView {
        if (viewModel.statusOfTheAppointment === undefined) {
            return {
                statusOfTheAppointment: undefined,
                appointmentError: viewModel.appointmentError
            };
        }
        return {
                statusOfTheAppointment: {
                    message: viewModel.statusOfTheAppointment
                },
                appointmentError: viewModel.appointmentError
        }

    }
}