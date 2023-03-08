import {Given, Then, When} from "@cucumber/cucumber";
import * as assert from 'node:assert';

import {UniqueIdEntity} from "@shared/entity/unique-id.entity";

import PatientWithReferringDoctorEntity from "@domain/make-an-appointment/patient-with-referring-doctor.entity";
import AppointmentDateValueObject from "@domain/make-an-appointment/appointment-date.value-object";
import MakeAnAppointmentRequest from "@domain/make-an-appointment/make-appointment.request";
import MakeAnAppointmentUseCase from "@domain/make-an-appointment/make-an-appointment.use-case";
import MakeAnAppointmentResponse from "@domain/make-an-appointment/make-an-appointment.response";
import {
  MakeAnAppointmentPresenter
} from "@domain/make-an-appointment/port/make-an-appointment.presenter"

import MakeAnAppointmentJsonPresenter from "@infra/nestjs/make-an-appointment/make-an-appointment-json.presenter";
import ConsultationScheduleInMemoryRepository
  from "@infra/nestjs/make-an-appointment/adapter/consultation-schedule-in-memory.repository";
import MakeAnAppointmentJsonView from "@infra/nestjs/make-an-appointment/make-an-appointment-json.view";
import {MakeAnAppointmentView} from "@infra/nestjs/make-an-appointment/model";

const patients: PatientWithReferringDoctorEntity[] = [];
const appointmentDate: AppointmentDateValueObject[] = [];
const makeAnAppointmentRequest: MakeAnAppointmentRequest[] = [];
const MakeAnAppointmentPresenter: MakeAnAppointmentPresenter[] = [];
const makeAnAppointmentViewModel: MakeAnAppointmentView[] = [];

Given('A patient <firstName> <lastName> identified by email <email> with doctor <doctorName> as referring doctor', async function (dataTable) {
  for (let i = 0; i < dataTable.rawTable.length; i += 1) {
    const firstName = dataTable.rawTable[i][0];
    const lastName = dataTable.rawTable[i][1];
    const email = dataTable.rawTable[i][2];
    const doctorName = dataTable.rawTable[i][3];
    patients.push(PatientWithReferringDoctorEntity.registerNewPatient({ firstName, lastName, doctorName, email }, new UniqueIdEntity(email)));

    const currentPatient = patients[i];
    assert(firstName, currentPatient.firstName);
    assert(lastName, currentPatient.lastName);
    assert(email, currentPatient.id);
    assert(doctorName, currentPatient.doctorName);
  }
});

When('the patient wants to make an appointment at <hour> on <date>', async (dataTable) => {
  for (let i = 0; i < dataTable.rawTable.length; i += 1) {
    const hour = dataTable.rawTable[i][0];
    const date = dataTable.rawTable[i][1];
    appointmentDate.push(AppointmentDateValueObject.create(hour, date));

    const currentDate = appointmentDate[i];
    assert(currentDate.hour, hour);
    assert(currentDate.date, date);
  }
});

Then('it is verified that the doctor has a free consultation', async () => {
  const useCase = new MakeAnAppointmentUseCase(new ConsultationScheduleInMemoryRepository());
  for (let i = 0; i < appointmentDate.length; i += 1) {
    const currentAppointmentDate = appointmentDate[i];
  // appointmentDate.forEach(async (currentAppointmentDate: AppointmentDateValueObject): Promise<void> => {
    const hour = currentAppointmentDate.props.hour;
    const date = currentAppointmentDate.props.date;
    const firstName = patients[i].firstName;
    const lastName = patients[i].lastName;
    const email = patients[i].email;
    const doctorName = patients[i].doctorName;
    const request = new MakeAnAppointmentRequest(hour, date, firstName, lastName, email, doctorName);
    makeAnAppointmentRequest.push(request);

    assert(request.appointmentHour, hour);
    assert(request.appointmentDate, date);

    const response = new MakeAnAppointmentResponse();
    const jsonPresenter = new MakeAnAppointmentJsonPresenter(response);
    MakeAnAppointmentPresenter.push(jsonPresenter);
    await useCase.execute(request, jsonPresenter);
  }
});

Then('the appointment is made', async () => {
  for (let i = 0; i < appointmentDate.length; i += 1) {
    const presenter = MakeAnAppointmentPresenter[i];
    const view = new MakeAnAppointmentJsonView();
    makeAnAppointmentViewModel.push(view.generationView(presenter.viewModel()));
  }
});

Then('A confirmation <message> is returned to the patient', async (dataTable) => {
  for (let i = 0; i < dataTable.rawTable.length; i += 1) {
    assert.equal(makeAnAppointmentViewModel[i].statusOfTheAppointment.message.trim(), dataTable.rawTable[i][0].trim());
  }
});




