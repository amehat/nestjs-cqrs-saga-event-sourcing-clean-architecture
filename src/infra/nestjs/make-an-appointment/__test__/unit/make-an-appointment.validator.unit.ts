import {BadRequestException} from "@nestjs/common";

import {validationOfTheElementsOfTheAppointment} from "@infra/nestjs/make-an-appointment/make-an-appointment.validator";

describe('MakeAnAppointmentValidator', () => {
    describe('validationOfTheElementsOfTheAppointment', () => {
        it('should be return true', () => {
            expect(validationOfTheElementsOfTheAppointment({
                hour: "4:00 pm",
                date: "Monday, March 18, 2023",
                firstName: "Obi-Wan",
                lastName: "Kenobi",
                email: "o.kenobi@starwars.com",
                nameDoctor: "Yoda"
            })).toBeTruthy();
        });

        it('should be throw error if hour is undefined', () => {
            expect(() => validationOfTheElementsOfTheAppointment({
                hour: undefined,
                date: "Monday, March 18, 2023",
                firstName: "Obi-Wan",
                lastName: "Kenobi",
                email: "o.kenobi@starwars.com",
                nameDoctor: "Yoda"
            })).toThrow(new BadRequestException());
        });

        it('should be throw error if date is undefined', () => {
            expect(() => validationOfTheElementsOfTheAppointment({
                hour: "4:00 pm",
                date: undefined,
                firstName: "Obi-Wan",
                lastName: "Kenobi",
                email: "o.kenobi@starwars.com",
                nameDoctor: "Yoda"
            })).toThrow(new BadRequestException());
        });

        it('should be throw error if firstName is undefined', () => {
            expect(() => validationOfTheElementsOfTheAppointment({
                hour: "4:00 pm",
                date: "Monday, March 18, 2023",
                firstName: undefined,
                lastName: "Kenobi",
                email: "o.kenobi@starwars.com",
                nameDoctor: "Yoda"
            })).toThrow(new BadRequestException());
        });

        it('should be throw error if lastName is undefined', () => {
            expect(() => validationOfTheElementsOfTheAppointment({
                hour: "4:00 pm",
                date: "Monday, March 18, 2023",
                firstName: "Obi-Wan",
                lastName: undefined,
                email: "o.kenobi@starwars.com",
                nameDoctor: "Yoda"
            })).toThrow(new BadRequestException());
        });

        it('should be throw error if email is undefined', () => {
            expect(() => validationOfTheElementsOfTheAppointment({
                hour: "4:00 pm",
                date: "Monday, March 18, 2023",
                firstName: "Obi-Wan",
                lastName: "Kenobi",
                email: undefined,
                nameDoctor: "Yoda"
            })).toThrow(new BadRequestException());
        });

        it('should be throw error if name doctor is undefined', () => {
            expect(() => validationOfTheElementsOfTheAppointment({
                hour: "4:00 pm",
                date: "Monday, March 18, 2023",
                firstName: "Obi-Wan",
                lastName: "Kenobi",
                email: "o.kenobi@starwars.com",
                nameDoctor: undefined
            })).toThrow(new BadRequestException());
        });

        it('should be throw error if all field are undefined', () => {
            expect(() => validationOfTheElementsOfTheAppointment({
                hour: undefined,
                date: undefined,
                firstName: undefined,
                lastName: undefined,
                email: undefined,
                nameDoctor: undefined
            })).toThrow(new BadRequestException());
        });
    });
});
