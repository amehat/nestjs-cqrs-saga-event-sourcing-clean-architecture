import {Controller, Get} from "@nestjs/common";

@Controller()
export default class ApplicationController {
    @Get()
    getDefaultRoute() {
        return {
            service: 'Nestjs, CQRS, Saga, Event Sourcing and Clean Architecture'
        }
    }
}