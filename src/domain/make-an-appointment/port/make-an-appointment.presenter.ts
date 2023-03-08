import MakeAnAppointmentResponse from "@domain/make-an-appointment/make-an-appointment.response";

export interface MakeAnAppointmentPresenter {
    response: MakeAnAppointmentResponse;
    viewModel(): MakeAnAppointmentResponse;
}