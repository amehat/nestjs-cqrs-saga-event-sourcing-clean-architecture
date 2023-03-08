import MakeAnAppointmentRequest from "@domain/make-an-appointment/make-appointment.request";

describe('MakeAnAppointmentRequest', () => {
    it('should is defined', () => {
        expect(MakeAnAppointmentRequest).toBeDefined();
    });

    it('should be use hour and date', () => {
        const hour = '4 p:m';
        const date = 'Monday, March 18, 2023'
        const firstName = 'Jane';
        const lastName = 'Doe';
        const email = 'jane@doe.com';
        const doctorName = 'knock';
        const request = new MakeAnAppointmentRequest(hour, date, firstName, lastName, email, doctorName);
        expect(request.appointmentHour).toEqual(hour);
        expect(request.appointmentDate).toEqual(date);
        expect(request.patientFirstName).toEqual(firstName);
        expect(request.patientLastName).toEqual(lastName);
        expect(request.patientEmail).toEqual(email);
        expect(request.doctorName).toEqual(doctorName);
    });
});
