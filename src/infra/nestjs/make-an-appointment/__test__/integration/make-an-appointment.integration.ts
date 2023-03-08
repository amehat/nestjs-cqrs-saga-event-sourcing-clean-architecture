import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';

import MakeAnAppointmentModule from "@infra/nestjs/make-an-appointment/make-an-appointment.module";

describe('MakeAnAppointment', () => {
    let app: INestApplication;
    let server: request.SuperTest<request.Test>;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            imports: [MakeAnAppointmentModule]
        }).compile();

        app = module.createNestApplication();
        server = app.getHttpServer();
        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });

    it(`/POST /appointment`, async () => {
        const appointmentHour = '4: pm';
        const appointmentDate = 'Monday, March 18, 2023';
        const patientFirstName = 'joe';
        const patientLastName = 'doe';
        const patientEmail = 'joe@doe.com';
        const doctorName = 'knock';

        const response= await request(app.getHttpServer())
            .post('/appointment')
            .send({
                hour: appointmentHour,
                date: appointmentDate,
                firstName: patientFirstName,
                lastName: patientLastName,
                email: patientEmail,
                nameDoctor: doctorName
            })
            .set('Accept', 'application/json');

        expect(response.status).toEqual(201);
        expect(response.body).toEqual({
            "message": `The appointment with Doctor ${doctorName}, ${appointmentDate} at ${appointmentHour} for ${patientFirstName} ${patientLastName} is confirmed`
        });
    });


});
