import MakeAnAppointmentResponse from "@domain/make-an-appointment/make-an-appointment.response";

describe('MakeAnAppointmentResponse', () => {
    it('should be defined', () => {
        expect(MakeAnAppointmentResponse).toBeDefined();
    });

    it('should give access to the status of the appointment', () => {
        const response = new MakeAnAppointmentResponse();
        expect(response.statusOfTheAppointment).toBeUndefined();
        const message = 'The appointment with Doctor Knock is confirmed for Monday, May 16, 2023 at 4 p.m.';
        response.statusOfTheAppointment = message;
        expect(response.statusOfTheAppointment).toEqual(message);
    });

    it('should be able to return an error', () => {
        const response = new MakeAnAppointmentResponse();
        expect(response.appointmentError).toBeUndefined();
        const error = {
            message: 'this is error',
            code: 500
        };
        response.appointmentError = error;
        expect(response.appointmentError).toEqual(error);
    });
});