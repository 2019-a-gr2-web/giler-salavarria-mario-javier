import {Controller, Get, Response, Post, Body, Res} from "@nestjs/common";
import {TragosService} from "./tragos.service";
import {Trago} from "./interfaces/trago";

@Controller('/api/traguito')
export class TragosController{
    constructor(private readonly _tragosService:TragosService){

    }

    @Get('lista')
    listarTragos(
        @Response() res
    ){
        const arregloTragos = this._tragosService.bddTragos;
        res.render('tragos/lista-tragos',{
            arregloTragos:arregloTragos
        })
    }

    @Get('crear')
    crearTragos(
        @Response() res
    ){
        res.render('tragos/crear-editar')
    }

    @Post('crear')
    crearTragoPost(
        @Body() trago:Trago,
        @Res() res
        // @Body('nombre') nombre:string,
        // @Body('tipo') tipo:string,
        // @Body('gradosAlcohol') gradosAlcohol:number,
        // @Body('fechaCaducidad') fechaCaducidad:Date,
        // @Body('precio') precio:number,
    ){
        trago.gradosAlcohol = Number(trago.gradosAlcohol);
        trago.precio = Number(trago.precio);
        trago.fechaCaducidad = new Date(trago.fechaCaducidad);
        this._tragosService.crear(trago);
        res.redirect('/api/traguito/lista')

        // console.log('Trago: ', trago, typeof );
        // console.log('Nombre: ', nombre, typeof );
        // console.log('Tipo: ', tipo, typeof );
        // console.log('Grados: ', gradosAlcohol, typeof );
        // console.log('Fecha: ', fechaCaducidad, typeof );
        // console.log('precio: ', precio, typeof );
    }

    @Post('eliminar')
    eliminarTragoPost(
        @Body() trago:Trago,
        @Res() res
    ){
        console.log(trago.id);
        this._tragosService.eliminarPorId(trago.id);
        res.redirect('/api/traguito/lista');
    }

}
