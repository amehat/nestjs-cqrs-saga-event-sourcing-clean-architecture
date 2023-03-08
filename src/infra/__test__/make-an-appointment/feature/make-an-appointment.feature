Feature: Making an appointment with a doctor by a patient

  Scenario: A patient already present in a doctor's patient room wants to make an appointment for a consultation
    Given A patient <firstName> <lastName> identified by email <email> with doctor <doctorName> as referring doctor
      | Joe  | Doe | joe@doe.com  | Knock |
      | Jane | Doe | jane@doe.com | Knock |
    When the patient wants to make an appointment at <hour> on <date>
      | 4:00 p.m  | Monday March 18, 2023  |
      | 10:00 a.m | Friday January 6, 2023 |
    Then it is verified that the doctor has a free consultation
    Then the appointment is made
    And A confirmation <message> is returned to the patient
      | The appointment with Doctor Knock, Monday March 18, 2023 at 4:00 p.m for Joe Doe is confirmed    |
      | The appointment with Doctor Knock, Friday January 6, 2023 at 10:00 a.m for Jane Doe is confirmed |


