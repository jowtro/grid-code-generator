import { NgModule, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { interval, Subscription } from 'rxjs';
import { StringGen } from './string-gen';
import { AppModule } from '../app.module';
import {CodegenModule} from './codegen.module';
@Injectable({
  providedIn: 'root'
})

//Adds a Service responsible for generate a random grid code for the app.
export class CodegenService {
  GRID: number = 10;
  WEIGHT: number = 0.2; // 20%
  matrix: Array<any>;
  weightChar: string;
  cntWeight: number = 0;
  myCode: string;
  previousDate: any;
  flagDanger: boolean = true;
  flagInput: boolean = true;
  subscription: Subscription;

  constructor() {
    this.weightChar = new StringGen().generateRandomLetter();
    this.matrix = new Array(this.GRID).fill("").map(() => new Array(this.GRID).fill(""));
    const source = interval(2000);
    this.subscription = source.subscribe(val => this.generateGrid());
  }

  refreshGenerator() {
    //Algorithm of generate Code
    let n: string = new Date().toLocaleTimeString();
    const alphaLetter = this.matrix[n.split(":")[2].substr(0, 1)][n.split(":")[2].substr(1, 2)]
    const betaLetter = this.matrix[n.split(":")[2].substr(1, 2)][n.split(":")[2].substr(0, 1)]
    let alphaOccurrences: number = 0;
    let betaOccurrences: number = 0;
    const flatArray: Array<string> = this.matrix.reduce((accumulator, value) => accumulator.concat(value), []);
    alphaOccurrences = flatArray.filter(e => e == alphaLetter).length;
    betaOccurrences = flatArray.filter(e => e == betaLetter).length;
    if (alphaOccurrences > 9) {
      alphaOccurrences = Math.ceil(alphaOccurrences / 3);
    }
    if (betaOccurrences > 9) {
      betaOccurrences = Math.ceil(betaOccurrences / 3);
    }
    console.log(`Code generated: ${this.myCode}`);
    this.myCode = `${alphaOccurrences}${betaOccurrences}`;
  }
  
  
  checkElapsedTime() {
    if (this.previousDate == undefined) {
      this.previousDate = new Date();
      return true;
    }
    let dateNow = new Date();
    let seconds = (dateNow.getTime() - this.previousDate.getTime()) / 1000;

    if (seconds > 4) {
      this.previousDate = dateNow;
      this.flagDanger = true;
      this.flagInput = true;
      return true;
    } else {
      this.flagDanger = false;
      this.flagInput = false;
      return false;

    }
  }
  generateWeight() {
    let previousIndexList: Array<IPosition> = new Array<IPosition>();
    this.cntWeight = 0
    let totalCells = this.GRID * this.GRID;
    //generate position for weight
    for (; this.cntWeight < totalCells * this.WEIGHT; this.cntWeight++) {
      let rndX: number = Math.floor(Math.random() * (this.GRID));
      let rndY: number = Math.floor(Math.random() * (this.GRID));
      //if number generated overlap previous position
      let flag: boolean = previousIndexList.some(previousIndex => (previousIndex.x == rndX) && (previousIndex.y == rndY));
      if (flag) {
        rndX = Math.floor(Math.random() * (this.GRID));
        rndY = Math.floor(Math.random() * (this.GRID));
      }
      previousIndexList.push({ x: rndX, y: rndY });
      this.matrix[rndX][rndY] = this.weightChar;
    }

  }
  public generateGrid(event?: any) {
    this.checkElapsedTime();
    this.matrix = new Array(this.GRID).fill("").map(() => new Array(this.GRID).fill(""));
    for (const x in this.matrix) {
      for (const y in this.matrix[x]) {
        this.matrix[x][y] = new StringGen().generateRandomLetter(this.weightChar);
      }
    }
    this.cntWeight = 0;
    this.generateWeight();
    this.refreshGenerator();
  }

}

interface IPosition {
  x: number;
  y: number;
}