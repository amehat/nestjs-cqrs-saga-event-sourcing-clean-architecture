# nestjs-cqrs-saga-event-sourcing-clean-architecture

Example of a fake application allowing appointments to be made with a doctor with the principles of CQRS, Event-Sourcing and Clean Architecture with the NestJS framework.

## Routes 

### POST /appointment

Make an appointment with a doctor for a patient

```
POST /appointment HTTP/1.1
content-type: application/json

Body
{
    "hour": "4:00 pm",
    "date": "Monday, March 18, 2023",
    "firstName": "Obi-Wan",
    "lastName": "Kenobi",
    "email": "o.kenobi@starwars.com",
    "nameDoctor": "Yoda"
}
```

## Installation

```
npm i

// or

yarn
```

## Optionnal

Copy the .env.example file to .env and set the port of the application on which you want to launch it.

The default port is 3000.

## start in development mode

```
npm run dev

// or

yarn dev
```

## Run all the tests

```
npm run test

// or

yarn test
```

## Run functional tests

```
npm run test:bdd

// or

yarn test:bdd
```

## Run unit tests

```
npm run test:unit

npm run test:unit:watch // watch mode

// or

yarn test:unit

yarn test:unit:watch // watch mode
```

## Run integration tests

```
npm run test:int

npm run test:int:watch // watch mode

// or

yarn test:int

yarn test:int:watch // watch mode
```

## See route results with JetBrains or VSCode editors

Open `api.http`

### JetBrains

Open http-client.env.json, change `port`, if you have modified in the .env, the value of `PORT_API`

### VSCode

Change `PORT_API` if you have modified in the .env, the value of `PORT_API`
