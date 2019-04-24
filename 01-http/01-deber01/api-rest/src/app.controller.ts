import {Body, Controller, Delete, Get, Headers, Post, Put, Query, Res, Response, Request, Req} from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/apiDeber')
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @Get('/suma')
  suma(@Headers() headers,
       @Response() resultado,
       @Request() request
  ) {
    if (headers.valor1 && headers.valor2) {
      const cookie = request.cookies;
      let number1 = Number(headers.valor1);
      let number2 = Number(headers.valor2);
      let totalSuma = number1 + number2;
      resultado.cookie('nombreUsuario', 'Mario');
      return resultado.send({'resultado': totalSuma.toString(), 'nombreUsuario':cookie.nombreUsuario});
    } else {
      return resultado.status(200).send({
        mensaje: 'ERROR, no envía algún valor para la suma',
        error: 200
      });
    }
  }

  @Post('/resta')
  resta(@Body() bodyParameters,
        @Response() response,
        @Request() request) {
    if (bodyParameters.valor1 && bodyParameters.valor2) {
      const cookie = request.cookies;
      let number1 = Number(bodyParameters.valor1);
      let number2 = Number(bodyParameters.valor2);
      let totalResta = number1 - number2;
      response.cookie('nombreUsuario', 'Mario');
      return response.send({'Total': totalResta.toString(), 'nombreUsuario':cookie.nombreUsuario});
    } else {
      return response.status(201).send({
        mensaje: 'ERROR, no envía algún valor para la resta',
        error: 201
      });
    }
  }

  @Put('/multiplicacion')
  multiplicacion(@Query() queryParameters,
                 @Response() response,
                 @Request() request) {
    if (queryParameters.valor1 && queryParameters.valor2) {
      const cookie = request.cookies;
      let number1 = Number(queryParameters.valor1);
      let number2 = Number(queryParameters.valor2);
      let totalMultiplicacion = number1 * number2;
      response.cookie('nombreUsuario', 'Mario');
      return response.send({'Total Multiplicacion': totalMultiplicacion.toString(), 'nombreUsuario':cookie.nombreUsuario});
    } else {
      return response.status(202).send({
        mensaje: 'ERROR, no envía algún valor para la multiplicacion',
        error: 202
      });
    }
  }

  @Delete('/division')
  division(
      @Body() bodyParameters,
      @Response() response,
      @Request() request
  ) {
    if (bodyParameters.valor1 && bodyParameters.valor2 && bodyParameters.nombreUsuario) {
      const cookie = request.cookies;
      let number1 = Number(bodyParameters.valor1);
      let number2 = Number(bodyParameters.valor2);
      let totalDivision = number1 / number2;
      response.cookie('nombreUsuario', 'Mario');
      return response.send({'Total Division': totalDivision.toString(), 'nombreUsuario':cookie.nombreUsuario});
    } else {
      return response.status(203).send({
        mensaje: 'ERROR, no envía algún valor para la division',
        error: 203
      });
    }
  }

}
