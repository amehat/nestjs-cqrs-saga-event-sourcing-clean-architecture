import {Error} from "@shared/error";

export type MakeAnAppointmentView = {
    statusOfTheAppointment: { message: string } | undefined,
    appointmentError: Error | undefined;
}