import {Error} from "@shared/error";

export default class MakeAnAppointmentResponse {
    statusOfTheAppointment: string | undefined;

    appointmentError: Error | undefined;
}