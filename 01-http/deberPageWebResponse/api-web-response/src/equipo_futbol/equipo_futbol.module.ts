import {Module} from "@nestjs/common";
import {Equipo_futbolController} from "./equipo_futbol.controller";
import {Equipo_futbolService} from "./equipo_futbol.service";

@Module({
    imports:[],  // Modulos
    controllers:[
        Equipo_futbolController
    ],
    providers:[
        Equipo_futbolService
    ],
    exports:[
        Equipo_futbolService
    ]
})
export class Equipo_futbolModule {
}

