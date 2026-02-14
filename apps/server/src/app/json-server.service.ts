import { readFileSync } from 'fs';

import { Injectable } from '@nestjs/common';
import { RequestHandler, Router } from 'express';
import * as jsonServer from 'json-server';

const readOnly = process.argv[2] === '--read-only';
if (readOnly) {
  console.log('json-server in readonly mode');
}

@Injectable()
export class JsonServerService {
  dataFileContents = '{}';
  data: any;
  router: Router | undefined;
  middlewares: RequestHandler[] | undefined;

  loadDataFile(fileName: string): void {
    if (this.router) {
      throw new Error('Already initialized, can only reset()');
    }
    this.dataFileContents = readFileSync(fileName, 'utf8');
    this.data = JSON.parse(this.dataFileContents);
    this.router = jsonServer.router(this.data);
    const middlewares = jsonServer.defaults({
      readOnly
    });
    // Doing this to remove faulty errorhandler() middleware function
    // It doesn't currently work in latest `nx` & `nrwl/node` versions
    // It is technically also a "development time" middleware function & isn't "needed"
    middlewares.splice(2, 1);
    this.middlewares = middlewares;
  }

  reset(): void {
    this.data = JSON.parse(this.dataFileContents);
    (this.router as any).db.setState(this.data);
  }
}
