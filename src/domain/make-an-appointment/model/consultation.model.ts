export enum ConsultationStatus {
    'RESERVED' = 'reserved',
    'AVAILABLE' = 'available'
}
export interface Consultation {
    hour: string;
    date: string;
    patientFirstName: string;
    patientLastName: string;
    patientEmail: string;
    doctorName: string;
    status: ConsultationStatus
}