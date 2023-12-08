import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { promises as fsPromises } from 'fs';
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  saveJsonToFile(jsonData: any, filePath: string): void {
    const jsonString = JSON.stringify(jsonData, null, 2);

    try {
      fs.writeFileSync(filePath, jsonString);
      console.log(`JSON salvo com sucesso em: ${filePath}`);
    } catch (error) {
      console.error(`Erro ao salvar o JSON: ${error.message}`);
    }
  }
  async readJsonFromFile(filePath: string): Promise<any> {
    try {
      const fileContent = await fsPromises.readFile(filePath, 'utf-8');
      return JSON.parse(fileContent);
    } catch (error) {
      throw new Error('Error reading JSON from file: ' + error.message);
    }
  }
}
