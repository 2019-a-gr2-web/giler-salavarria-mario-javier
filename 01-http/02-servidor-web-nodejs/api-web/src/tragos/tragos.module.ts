import {Module} from "@nestjs/common";
import {Trago} from "./interfaces/trago";
import {TragosController} from "./tragos.controller";
import {TragosService} from "./tragos.service";

@Module({
    imports: [],//Modulos
    controllers:[TragosController],//Controladores
    providers:[TragosService],//Servicios
    exports:[TragosService]//Exportar servicios
})
export class TragosModule{

}
