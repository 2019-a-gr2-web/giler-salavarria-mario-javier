import {Injectable} from "@nestjs/common";
import {Jugador} from "../equipo_futbol/interfaces/jugador";


@Injectable()
export class JugadorService {
    bddJugador: Jugador[] = [];
    recnum = 1;
    padreId = 0;

    constructor(){
    }

    crear(nuevoJugador: Jugador): Jugador {
        nuevoJugador.id = this.recnum;
        nuevoJugador.equipoFutbolId = this.padreId;
        this.recnum++;
        this.bddJugador.push(nuevoJugador);
        return nuevoJugador;
    }

    buscarPorIdPadre(id: number): Jugador[] {
        this.padreId = id;
        const lstFilter = this.bddJugador.filter(
            (jugador) => {
                return jugador.equipoFutbolId === id;
            }
        );
        return lstFilter;
    }

    buscarPorIdIngresado(): Jugador[] {
        const lstFilter = this.bddJugador.filter(
            (jugador) => {
                return jugador.equipoFutbolId === this.padreId;
            }
        );
        return lstFilter;
    }

    buscarPorNombre(nombre: string): Jugador[]{
        const elementFound = this.bddJugador.find(
            (jugador) => {
                return jugador.nombreCompletoJugador === nombre;
            }
        );
        if(elementFound === undefined){
            return this.bddJugador;
        }else{
            const lstJugador : Jugador[] = [];
            lstJugador.push(elementFound);
            return lstJugador;
        }
    }

    eliminarPorId(id: number): Jugador[] {
        const indice = this.bddJugador.findIndex(
            (jugador) => {
                return jugador.id === id
            }
        );
        this.bddJugador.splice(indice, 1);
        return this.bddJugador;
    }

    actualizar(jugadorActualizado: Jugador, id: number): Jugador[] {

        const indice = this.bddJugador.findIndex(
            (jugador) => {
                return jugador.id === id
            }
        );
        jugadorActualizado.id = this.bddJugador[indice].id;
        this.bddJugador[indice] = jugadorActualizado;

        return this.bddJugador;
    }
}
