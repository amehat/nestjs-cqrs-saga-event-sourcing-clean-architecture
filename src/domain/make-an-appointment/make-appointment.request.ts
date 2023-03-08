export default class MakeAnAppointmentRequest {
    appointmentHour: string;
    appointmentDate: string;
    patientEmail: string;
    patientFirstName: string;
    patientLastName: string;
    doctorName: string;
    constructor(appointmentHour: string, appointmentDate: string, patientFirstName: string, patientLastName: string, patientEmail: string, doctorName: string) {
        this.appointmentHour = appointmentHour;
        this.appointmentDate = appointmentDate;
        this.patientFirstName = patientFirstName;
        this.patientLastName = patientLastName;
        this.patientEmail = patientEmail;
        this.doctorName = doctorName;
    }
}