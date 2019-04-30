import {Body, Controller, Delete, Get, Headers, Post, Put, Query, Res, Response, Request, Req} from '@nestjs/common';
import { AppService } from './app.service';
import * as Joi from '@hapi/joi';

@Controller('/apiDeber')
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @Get('/suma')
  suma(@Headers() headers,
       @Response() response,
       @Request() request
  ) {
    const cookie1= request.cookies;
    const cookieSeg=request.signedCookies;
    response.cookie('usuario', 'Mario Giler');
    if(!cookieSeg.vida){
      response.cookie('vida','100',{signed:true});
      console.log('cookieCCCCs', cookieSeg.vida);
    }
    console.log('Headers', headers);
    const numero1 = Number(headers.numero1);
    const numero2 = Number(headers.numero2);
    const esquemaValidacionNumero = Joi
        .object()
        .keys({
          num1: Joi.number().integer().required(),
          num2: Joi.number().integer().required()
        });
    const objetoVladicacion = {
      num1: numero1,
      num2: numero2
    };
    const resultado = Joi.validate(objetoVladicacion, esquemaValidacionNumero);
    if (resultado.error) {

      return response.send("Error: Ingrese solo numeros");
    } else {
      const suma= numero1 + numero2;
      const numintento= cookieSeg.vida-suma;
      cookieSeg.vida = numintento;

      if(cookieSeg.vida) {
        response.cookie('vida', numintento, {signed: true});
      }
      if (cookieSeg.vida <=0) {
        return response.status(201).send({
          'resultado: ': `Resutlado: ${suma}`,
          'usuario: ': `Usuario: ${cookie1.usuario}`,
          'mensaje: ': 'Se le terminaron los puntos'
        });
      } else {


        return response.status(201).send({
          'resultado: ': `Resutlado: ${suma}`,
          'usuario: ': `Usuario: ${cookie1.usuario}`,
          'intentos restantes: ': `Intentos restantes: ${cookieSeg.vida}`
        });
      }
    }
  }

  @Post('/resta')
  resta(@Body() bodyParameters,
        @Response() response,
        @Request() request) {
    const cookie1= request.cookies;
    const cookieSeg=request.signedCookies;
    response.cookie('usuario', 'Mario Giler');
    if(!cookieSeg.vida){
      response.cookie('vida','100',{signed:true});
      console.log('cookieCCCCs', cookieSeg.vida);
    }
    const numero1 = Number(bodyParameters.numero1);
    const numero2 = Number(bodyParameters.numero2);


    const esquemaValidacionNumero = Joi
        .object()
        .keys({
          num1: Joi.number().integer().required(),
          num2: Joi.number().integer().required()
        });
    const objetoVladicacion = {
      num1: numero1,
      num2: numero2
    };
    const resultado = Joi.validate(objetoVladicacion, esquemaValidacionNumero);
    if (resultado.error) {
      return response.send("Error: Ingrese solo numeros");
    } else {
      const resta= numero1 - numero2;
      const numintento= cookieSeg.vida-resta;
      cookieSeg.vida = numintento;

      if(cookieSeg.vida) {
        response.cookie('vida', numintento, {signed: true});
      }
      if (cookieSeg.vida <=0) {
        return response.status(201).send({
          'resultado: ': `Resutlado: ${resta}`,
          'usuario: ': `Usuario: ${cookie1.usuario}`,
          'mensaje: ': 'Se le terminaron los puntos'
        });
      } else {


        return response.status(201).send({
          'resultado: ': `Resutlado: ${resta}`,
          'usuario: ': `Usuario: ${cookie1.usuario}`,
          'intentos restantes: ': `Intentos restantes: ${cookieSeg.vida}`
        });
      }
    }
  }

  @Put('/multiplicacion')
  multiplicacion(@Query() queryParameters,
                 @Response() response,
                 @Request() request) {
    const cookie1= request.cookies;
    const cookieSeg=request.signedCookies;
    response.cookie('usuario', 'Mario Giler');
    if(!cookieSeg.vida){
      response.cookie('vida','100',{signed:true});
      console.log('cookieCCCCs', cookieSeg.vida);
    }
    const numero1 = Number(queryParameters.numero1);
    const numero2 = Number(queryParameters.numero2);





    const esquemaValidacionNumero = Joi
        .object()
        .keys({
          num1: Joi.number().integer().required(),
          num2: Joi.number().integer().required()
        });
    const objetoVladicacion = {
      num1: numero1,
      num2: numero2
    };
    const resultado = Joi.validate(objetoVladicacion, esquemaValidacionNumero);
    if (resultado.error) {

      return response.send("Error: Ingrese solo numeros");
    } else {
      const multipliacion= numero1 * numero2;
      const numintento= cookieSeg.vida-multipliacion;
      cookieSeg.vida = numintento;

      if(cookieSeg.vida) {
        response.cookie('vida', numintento, {signed: true});
      }
      if (cookieSeg.vida <=0) {
        return response.status(202).send({
          'resultado: ': `Resutlado: ${multipliacion}`,
          'usuario: ': `Usuario: ${cookie1.usuario}`,
          'mensaje: ': 'Se le terminaron los puntos'
        });
      } else {


        return response.status(202).send({
          'resultado: ': `Resutlado: ${multipliacion}`,
          'usuario: ': `Usuario: ${cookie1.usuario}`,
          'intentos restantes: ': `Intentos restantes: ${cookieSeg.vida}`
        });
      }
    }
  }

  @Delete('/division')
  division(
      @Query() parametrosQuery, @Headers() headers, @Response() response, @Request() request
  ) {
    const cookie1= request.cookies;
    const cookieSeg=request.signedCookies;
    response.cookie('usuario', 'Mario Giler');
    if(!cookieSeg.vida){
      response.cookie('vida','100',{signed:true});
      console.log('cookieCCCCs', cookieSeg.vida);
    }


    const numero1 = Number(headers.numero1);
    const numero2 = Number(parametrosQuery.numero2);

    const esquemaValidacionNumero = Joi
        .object()
        .keys({
          num1: Joi.number().integer().required(),
          num2: Joi.number().integer().min(1).required()
        });
    const objetoVladicacion = {
      num1: numero1,
      num2: numero2
    };
    const resultado = Joi.validate(objetoVladicacion, esquemaValidacionNumero);
    if (resultado.error) {

      return response.status(203).send("Error: Ingrese solo numeros o El segundo numero mayor a 0");
    } else {
      const division= numero1 / numero2;
      const numintento= cookieSeg.vida-division;
      cookieSeg.vida = numintento;
      if (cookieSeg.vida <=0) {

        return response.status(203).send({
          'resultado: ': `Resutlado: ${division}`,
          'usuario: ': `Usuario: ${cookie1.usuario}`,
          'mensaje: ': 'Se le terminaron los puntos'
        });
      } else {
        return response.status(202).send({
          'resultado: ': `Resutlado: ${division}`,
          'usuario: ': `Usuario: ${cookie1.usuario}`,
          'intentos restantes: ': `Intentos restantes: ${cookieSeg.vida}`
        });
      }
    }
  }

}
