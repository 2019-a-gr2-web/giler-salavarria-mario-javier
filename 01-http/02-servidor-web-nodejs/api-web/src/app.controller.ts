import {Controller, Get, HttpCode, Post, Put, Delete, Headers} from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/hello-world')  // METODO HTTP
  getHello(): string {
    return this.appService.getHello();
  }
  @Post()  // METODO HTTP
  @HttpCode(200)
  postHello(){
      return 'Hola mundo en post';
  }
  @Delete('/delete')
    saludos():string{
      return 'Saludos';
  }

  @Get('/adivina')
  adivina(@Headers() headers):string{
      console.log('Headers: ', headers);
      const numeroRandomico = Math.round(Math.random()*10);
      const numeroDeCabecera = Number(header.numero);
      if(numeroDeCabecera == numeroRandomico){
          return 'OK';
      }else{
          return ':(';
      }
  }
}

const json = [{
    nombre:"Mario",
    apellido:"Giler",
    "edad":24,
    "sueldo":10.50,
    casado:false,
    hijos:null,
    mascotas:["cachetes", 1, 1.50, null, {"nombre": "cachetes"}]
}];

let objeto:any = {
    propiedad:'valor',
    propiedadDos:'valor2'
};
objeto.propiedad//valor
objeto.propiedadDos//valor2

//Agregar propiedades a un objeto
objeto.propiedadTres = 'valor3';
//Segunda forma agregar propiedad a un objeto
objeto['propiedadTres'] = 'valor 3';
objeto.propiedadTres = undefined;
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





