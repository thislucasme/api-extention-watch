import { Controller, Post, Body, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import * as path from 'path';
import { Response } from 'express'; // Import Response from express
import { existsSync, readFileSync } from 'fs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Post('/sincronizar')
  saveJson(@Body() jsonData: any) {
    const fileName = 'seu-arquivo.json';
    const rootPath = path.resolve(__dirname, '..');
    const filePath = path.join(rootPath, fileName);

    // Adiciona ou sobrescreve o objeto 'host' no jsonData
    jsonData.host = jsonData.host || { paused: true, prontoParaReproducao: false, currentTime: 0 };

    // Salva o JSON no arquivo
    this.appService.saveJsonToFile(jsonData, filePath);

    return { watcher: 'host', status: 200 };
  }
  @Post('/atualizar')
  atualizarJson(@Body() jsonData: any) {
    const fileName = 'seu-arquivo.json';
    const rootPath = path.resolve(__dirname, '..');
    const filePath = path.join(rootPath, fileName);

    try {
      // Adiciona ou sobrescreve o objeto 'host' no jsonData
      jsonData.host = jsonData.host || { paused: true, prontoParaReproducao: false, currentTime: 0 };

      // Salva o JSON no arquivo
      this.appService.saveJsonToFile(jsonData, filePath);

      return { watcher: 'host', status: 200 };
    } catch (error) {
      console.error('Erro ao analisar o conteúdo do arquivo JSON existente:', error);
      return { watcher: 'error', status: 500, message: 'Erro ao analisar o conteúdo do arquivo JSON.' };
    }


  }

  @Get('/get-json')
  async getJson(@Res() res: Response): Promise<void> {
    const fileName = 'seu-arquivo.json';
    const rootPath = path.resolve(__dirname, '..');
    const filePath = path.join(rootPath, fileName);

    try {
      const jsonData = await this.appService.readJsonFromFile(filePath);
      res.json(jsonData);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao ler o JSON' });
    }
  }
}
