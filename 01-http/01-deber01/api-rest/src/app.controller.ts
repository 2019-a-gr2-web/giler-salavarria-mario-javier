import {Body, Controller, Delete, Get, Headers, Post, Put, Query, Res, Response} from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/apiDeber')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/suma')
  suma(@Headers() headers,
  @Response() resultado
  ){
    if(headers.valor1 && headers.valor2){
      let number1 = Number(headers.valor1);
      let number2 = Number(headers.valor2);
      let totalSuma = number1 + number2;
      return resultado.send({'resultado' :totalSuma.toString()});
    }else{
      return resultado.status(200).send({
        mensaje: 'ERROR, no envía algún valor para la suma',
        error: 200
      });
    }
  }

  @Post('/resta')
  resta(@Body() bodyParameters,
        @Response() response) {
    if(bodyParameters.valor1 && bodyParameters.valor2){
      let number1 = Number(bodyParameters.valor1);
      let number2 = Number(bodyParameters.valor2);
      let totalResta = number1 - number2;
      return response.send({'Total' :totalResta.toString()});
    }else{
      return response.status(201).send({
        mensaje: 'ERROR, no envía algún valor para la resta',
        error: 201
      });
    }
  }

  @Put('/multiplicacion')
  multiplicacion(@Query() queryParameters,
                 @Response() response){
    if(queryParameters.valor1 && queryParameters.valor2){
      let number1 = Number(queryParameters.valor1);
      let number2 = Number(queryParameters.valor2);
      let totalMultiplicacion = number1 * number2;
      return response.send({'Total Multiplicacion' :totalMultiplicacion.toString()});
    }else{
      return response.status(202).send({
        mensaje: 'ERROR, no envía algún valor para la multiplicacion',
        error: 202
      });
    }
  }

  @Delete('/division')
  division(
      @Body() bodyParameters,
      @Response() response
  ){
    if(bodyParameters.valor1 && bodyParameters.valor2){
      let number1 = Number(bodyParameters.valor1);
      let number2 = Number(bodyParameters.valor2);
      let totalDivision = number1/number2;
      return response.send({'Total Division' :totalDivision.toString()});
    }else{
      return response.status(203).send({
        mensaje: 'ERROR, no envía algún valor para la division',
        error: 203
      });
    }
  }

}
