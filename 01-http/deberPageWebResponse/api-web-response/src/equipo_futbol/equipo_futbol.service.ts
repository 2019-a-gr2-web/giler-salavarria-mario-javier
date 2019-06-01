import {Injectable} from "@nestjs/common";
import {Equipofutbol} from "./interfaces/equipofutbol";

@Injectable()
export class Equipo_futbolService {
    bddEquipo: Equipofutbol[] = [];
    recnum = 1;

    constructor(){
    }

    crear(nuevoEquipo: Equipofutbol): Equipofutbol {
        nuevoEquipo.id = this.recnum;
        this.recnum++;
        this.bddEquipo.push(nuevoEquipo);
        return nuevoEquipo;
    }

    buscarPorId(id: number): Equipofutbol {
        return this.bddEquipo.find(
            (equipo) => {
                return equipo.id === id;
            }
        );
    }

    buscarPorNombre(nombre: string): Equipofutbol[]{
        const elementFound = this.bddEquipo.find(
            (equipo) => {
                return equipo.nombre === nombre;
            }
        );
        if(elementFound === undefined){
            return this.bddEquipo;
        }else{
            const lstEquipo : Equipofutbol[] = [];
            lstEquipo.push(elementFound);
            return lstEquipo;
        }
    }

    eliminarPorId(id: number): Equipofutbol[] {
        const indice = this.bddEquipo.findIndex(
            (equipo) => {
                return equipo.id === id
            }
        );
        this.bddEquipo.splice(indice, 1);
        return this.bddEquipo;
    }

    actualizar(equipoActualizado: Equipofutbol, id: number): Equipofutbol[] {

        const indice = this.bddEquipo.findIndex(
            (equipo) => {
                return equipo.id === id
            }
        );
        equipoActualizado.id = this.bddEquipo[indice].id;
        this.bddEquipo[indice] = equipoActualizado;

        return this.bddEquipo;
    }
}
