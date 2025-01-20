import { Controller, Get, Post, Body, Param, Res, UseGuards } from '@nestjs/common';
import { FlightLogsService } from './flight-logs.service';
import { FlightLog } from './schemas/flight-log.schema';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import * as PDFDocument from 'pdfkit';
import { Response } from 'express';

@Controller('flight-logs')
@UseGuards(JwtAuthGuard)
export class FlightLogsController {
  constructor(private readonly flightLogsService: FlightLogsService) {}

  // @Post()
  // async create(@Body() flightLog: FlightLog) {
  //   return this.flightLogsService.create(flightLog);
  // }

  @Get()
  async findAll() {
    return await this.flightLogsService.findAll();
  }
  
  @Get(':flight_id')
  async findByFlightId(@Param('flight_id') flightId: string) {
    return await this.flightLogsService.findByFlightId(flightId);
  }

  @Get(':flight_id/pdf')
  async generatePDF(@Param('flight_id') flightId: string, @Res() res: Response) {
    const flightLog = await this.flightLogsService.findByFlightId(flightId);
    const doc = new PDFDocument();

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=flight_log.pdf');

    doc.pipe(res);
    doc.fontSize(25).text(`Flight Log: ${flightLog.flight_id}`, { align: 'center' });
    doc.moveDown();

    // Add more details from flightLog
    flightLog.waypoints.forEach((waypoint) => {
      doc.text(`Time: ${waypoint.time}s, Alt: ${waypoint.alt}, Lat: ${waypoint.lat}, Lng: ${waypoint.lng}`);
    });

    doc.end();
  }
}
