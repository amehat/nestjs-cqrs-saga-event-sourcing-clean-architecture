import MakeAnAppointmentJsonPresenter from "@infra/nestjs/make-an-appointment/make-an-appointment-json.presenter";

import MakeAnAppointmentResponse from "@domain/make-an-appointment/make-an-appointment.response";

describe('MakeAnAppointmentJsonPresenter', () => {
    it('should be defined', () => {
        expect(MakeAnAppointmentJsonPresenter).toBeDefined();
    });

    it('should return viewModel of response type', () => {
        const response = new MakeAnAppointmentResponse();
        const jsonPresenter = new MakeAnAppointmentJsonPresenter(response);
        expect(jsonPresenter.viewModel()).toBeInstanceOf(MakeAnAppointmentResponse);
        expect(jsonPresenter.viewModel()).toEqual(response);
    })
});
