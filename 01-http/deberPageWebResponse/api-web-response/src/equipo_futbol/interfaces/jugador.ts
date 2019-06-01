import {Equipofutbol} from "./equipofutbol";

export interface Jugador{
    id?: number;
    numeroCamiseta: number;
    nombreCompletoJugador: string;
    poderEspecialDos: string;
    fechaIngresoEquipo: Date;
    goles: number;
    equipoFutbolId: number;
}
