import {MakeAnAppointmentPresenter} from "@domain/make-an-appointment/port/make-an-appointment.presenter";
import MakeAnAppointmentResponse from "@domain/make-an-appointment/make-an-appointment.response";

export default class MakeAnAppointmentJsonPresenter implements MakeAnAppointmentPresenter{
    response: MakeAnAppointmentResponse;

    constructor(response: MakeAnAppointmentResponse) {
        this.response = response;
    }

    viewModel(): MakeAnAppointmentResponse {
        return this.response;
    }
}