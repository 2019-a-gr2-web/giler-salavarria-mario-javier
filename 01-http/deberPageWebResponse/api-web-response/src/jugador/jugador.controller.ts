import {Controller, Get, Post, Res, Body, Query, Put, Delete, Req} from "@nestjs/common";
import {JugadorService} from "./jugador.service";
import {Jugador} from "../equipo_futbol/interfaces/jugador";


@Controller('/api/jugador')
export class JugadorController {
    constructor(private readonly _jugadorService: JugadorService) {

    }

    @Get('jugadores')
    mostrarPaginaJugador(@Query() padreId,
                         @Res() res,
                         @Req() req){
        console.log(padreId.padreId);
        if(padreId.padreId === undefined){
            const arreglojugador = this._jugadorService.buscarPorIdIngresado();
            const cookieSeg = req.signedCookies;
            const nombre = cookieSeg.usuario;
            res.cookie('usuario', nombre, {signed:true});
            res.render('jugadores/inicio', {arreglojugador:arreglojugador, nombre:nombre});
        }else{
            padreId.padreId = Number(padreId.padreId);
            const arreglojugador = this._jugadorService.buscarPorIdPadre(padreId.padreId);
            const cookieSeg = req.signedCookies;
            const nombre = cookieSeg.usuario;
            res.cookie('usuario', nombre, {signed:true});
            res.render('jugadores/inicio', {arreglojugador:arreglojugador, nombre:nombre});
        }

    }

    @Get('buscarJugador')
    buscarPaginaJugador(@Query() nombreBuscar,
                       @Res() res,
                        @Req() req){
        const cookieSeg = req.signedCookies;
        const nombre = cookieSeg.usuario;
        const arreglojugador = this._jugadorService.buscarPorNombre(nombreBuscar.nombreCompletoJugador);
        res.cookie('usuario', nombre, {signed:true});
        res.render('jugadores/inicio', {arreglojugador:arreglojugador, nombre:nombre});
    }

    @Get('crearPaginaJugador')
    crearPaginaJugador(@Res() res,
                      @Query() padreId,
                       @Req() req){
        const cookieSeg = req.signedCookies;
        const nombre = cookieSeg.usuario;
        res.cookie('usuario', nombre, {signed:true});
        res.render('jugadores/crear', {nombre:nombre});
    }

    @Post('crearJugador')
    crearJugadorPost(
        @Body() jugador: Jugador,
        @Res() res,
        @Req() req
    ) {
        const cookieSeg = req.signedCookies;
        const nombre = cookieSeg.usuario;
        jugador.numeroCamiseta = Number(jugador.numeroCamiseta);
        jugador.fechaIngresoEquipo = new Date(jugador.fechaIngresoEquipo);
        jugador.goles = Number(jugador.goles);
        this._jugadorService.crear(jugador);
        res.cookie('usuario', nombre, {signed:true});
        res.redirect('/api/jugador/jugadores');
    }

    @Post('eliminarJugador')
    eliminarEquipoDelete(@Body() jugador: Jugador,
                         @Res() res,
                         @Req() req)
    {
        const cookieSeg = req.signedCookies;
        const nombre = cookieSeg.usuario;
        jugador.id = Number(jugador.id);
        const arregloEquipoEliminado = this._jugadorService.eliminarPorId(jugador.id);
        res.cookie('usuario', nombre, {signed:true});
        res.redirect('/api/jugador/jugadores');
    }
}
