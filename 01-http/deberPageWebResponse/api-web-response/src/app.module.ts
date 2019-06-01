import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {Equipo_futbolModule} from "./equipo_futbol/equipo_futbol.module";
import {JugadorModule} from "./jugador/jugador.module";

@Module({
  imports: [Equipo_futbolModule, JugadorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
