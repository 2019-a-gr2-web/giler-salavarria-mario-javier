import {
    Controller,
    Get,
    HttpCode,
    Post,
    Put,
    Delete,
    Headers,
    Query,
    Param,
    Body,
    Request,
    Response
} from '@nestjs/common';
import {AppService} from './app.service';
import * as Joi from '@hapi/joi';


// http://192.168.1.10:3000/segmentoInicial/segmentoAccion
// http://192.168.1.10:3000/mascotas/crear
// http://192.168.1.10:3000/mascotas/borrar
// @Controller(segmentoInicial)
@Controller('/api')
export class AppController {
    constructor(private readonly appService: AppService) {
    }

    // @Controller(segmentoAccion)
    @Get('/hello-world')  // METODO HTTP
    helloWorld(): string {
        return 'Hello world';
    }

    // POST http://localhost:3000/api
    @Post('/hola-mundo')  // METODO HTTP
    holaMundo() {
        return 'Hola mundo';
    }

    @Put('/salut-monde')  // METODO HTTP
    salutMonde() {
        return 'Salut monde';
    }

    @Delete('/ola-mundo')  // METODO HTTP
    olaMundo() {
        return 'Olá mundo';
    }


    @Get('/adivina')  // METODO HTTP
    adivina(@Headers() headers): string {
        console.log('Headers: ', headers);
        const numeroRandomico = Math.round(Math.random() * 10);
        const numeroDeCabecera = Number(headers.numero);

        if (numeroDeCabecera == numeroRandomico) {
            return 'Ok';
        } else {
            return ':(';
        }


    }

    // ?llave=valor&llave2=valor2
    @Post('/consultar')
    consultar(@Query() queryParams) {
        console.log(queryParams);
        if (queryParams.nombre) {
            return `Hola ${queryParams.nombre}`
        } else {
            return 'Hola extraño'
        }
    }

    @Get('/ciudad/:idCiudad')
    ciudad(@Param() parametrosRuta) {
        switch (parametrosRuta.idCiudad.toLowerCase()) {
            case 'quito':
                return 'Que fueff';
            case 'guayaquil':
                return 'Que maah ñañoshh';
            default:
                return 'Buenas tardes';
        }
    }

    @Post('registroComida')
    registroComida(
        @Body() parametrosCuerpo,
        @Response() response
    ) {
        if (parametrosCuerpo.nombre && parametrosCuerpo.cantidad) {
            const cantidad = Number(parametrosCuerpo.cantidad);
            if (cantidad > 1) {
                response.set('Premio', 'Fanesca');
            }
            return response.send({mensaje: 'Registro Creado'});
        } else {
            return response.status(400)
                .send({
                    mensaje: 'ERROR, no envia nombre o cantidad',
                    error: 400
                });
        }

    }

    @Get('/semilla')
    semilla(@Request() request,
    @Response() response){
        console.log(request.cookies);
        const cookies = request.cookies;
        const esquemaValidationNumero = Joi.object().keys({
            numero: Joi.number().integer().required()
        });

        const objetoValidacion = {numero:cookies.numero};
        const resultado = Joi.validate(objetoValidacion, esquemaValidationNumero);
        if(resultado.error){
            console.log('Resultado: ', resultado);
        }else{
            console.log('Numero valido');
        }
        const cookieSegura =  request.signedCookies.fechaServidor;
        if(cookieSegura){
            console.log('Cookie segura');
        }else{
            console.log('No es válida');
        }
        if(cookies.micookie){
            const horaFechaServidor = new Date();
            const minutos = horaFechaServidor.getMinutes();
            horaFechaServidor.setMinutes(minutos + 1);
            response.cookie('fechaServidor',
                //new Date().getTime(),
                //{expires:horaFechaServidor}
            );
            return response.send('ok');
        }else{
            return response.send(':(');
        }

    }

    @Get('/inicio')
    inicio(
        @Response() res
    ){
        function holaMundo(){
            console.log('HOla mundo');
        }
        const respuestaHolaMundo = holaMundo();
        console.log('Resp hola mundo:', respuestaHolaMundo);
        function suma(a:number,b:number){
            return a+b;
        }
        const respuestaSuma = suma(1, 2);
        console.log('Resp suma', respuestaSuma);
//Condidicionales
//truty -> true
//falsy -> false
        if(undefined){//Falsy
            console.log('Verdadero "undefined"');
        }else{
            console.log('False "undefined"');
        }
        if(null){//Falsy
            console.log('Verdadero "null"');
        }else{
            console.log('False "null"');
        }
        if({}){//Truty
            console.log('Verdadero "{}"');
        }else{
            console.log('False "{}"');
        }

//Operadores de arreglos en js
        const arreglo = [1,2,3,4,5,6];

//1) Impriman en consola todos los elementos
        arreglo.forEach(n=> console.log(n));
        //2) Sumen 2 a los pares y 1 a los impares
        const arregloMap = [1,2,3,4,5,6];
        const rMap = arregloMap.map((valorActual)=>{
            const esPar = valorActual%2==0;
            if(esPar){
                return valorActual + 2;
            }else{
                return valorActual + 1;
            }
        })
        console.log(rMap);
        //3) Encuentren si hay el numero 4
        const arregloFind = [1,2,3,4,5,6];
        const rFind = arregloFind.find((valorActual)=>{
            return valorActual ==4;
        })
        console.log(rFind);
        //4) Filtren los numeros menores a 5
        const arregloFilter = [1,2,3,4,5,6];
        const rFilter = arregloFilter.filter((valorActual)=>{
                return valorActual<5;
        })
        console.log(rFilter);
        //5)Todos los valores son positivos TRUE FALSE
        const arregloNumerosEvery = [1,2,3,4,5,6];
        const rEvery = arregloNumerosEvery.every( //operador logico AND
            (valorActual)=>{
                return valorActual > 0
            }
        );
        console.log(rEvery);
        //6)
        const arregloNumerosSome = [1,2,3,4,5,6];
        const rSome = arregloNumerosSome.some(
            (valorActual)=>{
                return valorActual < 2
            }
        );
        console.log(rSome);
        //7)Reduce
        const arregloNumeroReduce =[1,2,3,4,5,6];
        const valorDondeEmpiezaCalculo = 0;
        const rReduce = arregloNumeroReduce.reduce(
            (acumulado, valorActual)=>{
                if(valorActual<4){
                    return (0.1*valorActual) + valorActual + acumulado + 5;
                }else{
                    return (0.15*valorActual) + valorActual + acumulado + 3;
                }
            },
            valorDondeEmpiezaCalculo
        );
        console.log(rReduce);
        //Ejercicio
        const arregloEjercicio = [1,2,3,4,5,6];
        const rEjercicio = arregloEjercicio.map(
            (valorActual)=>{
                return valorActual + 10;
        }).filter(
            (valorActual)=>{
                return valorActual > 15;
            }
        ).some(
            (valorActual)=>{
                return valorActual>30
            }
        )
        console.log(rEjercicio);
        return res.render('inicio', {estaVivo:true});
    }

    @Get('peliculas')
    peliculas(@Response() res){
        return res.render('peliculas/inicio', {});
    }


    // js -> ts


    /*
    const nombre: string = 'Adrian'; // string
    const edad = 29;  // number
    const sueldo = 1.20;  // number
    const casado = false;  // boolean
    const hijos = null;  // null
    const alas = undefined;  // undefined
    */


    /*
    * Segmento inicial: /api
    * 1) Segmento Accion: GET 'hello-world' -> 'Hello world'
    * 2) Segmento Accion: POST 'hola-mundo' -> 'Hola mundo'
    * 3) Segmento Accion: PUT '...' -> '....'
    * 4) Segmento Accion: DELETE '..' -> '....'
    * */


}






//5) Todos los valores positivos
//6) Algun valor es menor que 2
//7) Sumen todos los valores
//8) Resten todos los valores de 100



/*
@NombreDecoradorClase() // Decorador -> FUNCION
class usuario{
  @Atributo() // Decorador
  atributoPublico; // Public
  private atributoPrivado;
  protected atributoProtegido;
  constructor(@Parametro() atributoPublico,
              @OtroParametro() atributoPrivado,
              @OtroOtroParametro() atributoProtegido){
    this.atributoPublico = atributoPublico;
    this.atributoPrivado = atributoPrivado;
    this.atributoProtegido = atributoProtegido;
  }
  @MetodoA()
  public metodoPublico(@ParametroA() a){}
  @MetodoB()
  private metodoPrivado(){}
  protected metodoProtegido(){}
}
*/

const json = [
    {
        llave: 'valor',
        "key": "value",
        'nombre': "Adrian\"\"",
        edad: 29,
        sueldo: 10.21,
        casado: false,
        hijos: null,
        mascotas: [
            "cachetes",
            1,
            1.01,
            false,
            null,
            {
                "nombre": "cachetes"
            },
        ],
    },
];

// JS -> JSON

let adrian = 'Adrian';

// TS

let vicente: any = 'Vicente';
vicente = 1;

let objeto: any = {
    propiedad: 'valor',
    propiedadDos: 'valor2'
};
objeto.propiedad  // valor
objeto.propiedadDos  // valor2

// Agregar propiedades a un objeto
objeto.propiedadTres = 'valor3';
objeto['propiedadTres'] = 'valor 3';
delete objeto.propiedadTres; // -> destruir
objeto.propiedadTres = undefined; // -> destruir



