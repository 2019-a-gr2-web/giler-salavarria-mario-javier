import {Controller, Get, Post, Res, Body, Query, Put, Delete, Req} from "@nestjs/common";
import {Equipo_futbolService} from "./equipo_futbol.service";
import {Equipofutbol} from "./interfaces/equipofutbol";

@Controller('/api/equipofutbol')
export class Equipo_futbolController {
    constructor(private readonly _equipoFutbolService: Equipo_futbolService) {

    }

    @Get('equipos')
    mostrarPaginaEquipo(@Req() req,
                        @Res() res){
        const cookieSeg = req.signedCookies;
        const nombre = cookieSeg.usuario;
        console.log(nombre);
        res.cookie('usuario', nombre, {signed:true});
        const arregloEquipos = this._equipoFutbolService.bddEquipo;
            res.render('equipos/inicio', {arregloEquipos:arregloEquipos, nombre:nombre});
    }

    @Get('buscarEquipo')
    buscarPaginaEquipo(@Query() nombreBuscar,
                        @Res() res){
            const arregloEquipos = this._equipoFutbolService.buscarPorNombre(nombreBuscar.nombre);
            res.render('equipos/inicio', {arregloEquipos:arregloEquipos});
    }

    @Get('crearPaginaEquipo')
    crearPaginaEquipo(@Res() res,
                        @Req() req){
        const cookieSeg = req.signedCookies;
        const nombre = cookieSeg.usuario;
        res.cookie('usuario', nombre, {signed:true});
        res.render('equipos/crear',{nombre:nombre});
    }

    @Post('crearEquipo')
    crearEquipoPost(
        @Body() equipofutbol: Equipofutbol,
        @Res() res
    ) {
        equipofutbol.numeroCopasInternacionales = Number(equipofutbol.numeroCopasInternacionales);
        equipofutbol.fechaCreacion = new Date(equipofutbol.fechaCreacion);
        this._equipoFutbolService.crear(equipofutbol);
        res.redirect('/api/equipofutbol/equipos');
    }

    @Post('eliminarEquipo')
    eliminarEquipoDelete(@Body() equipofutbol: Equipofutbol,
                         @Res() res)
    {
        equipofutbol.id= Number(equipofutbol.id);
        const arregloEquipoEliminado = this._equipoFutbolService.eliminarPorId(equipofutbol.id);
        res.redirect('/api/equipofutbol/equipos');
    }
}
