import { NgModule, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { interval, Subscription } from 'rxjs';
import { StringGen } from './string-gen';

@Injectable({
  providedIn: 'root'
})

// Adds a Service responsible for generate a random grid code for the app.
export class CodegenService {
  GRID = 10;
  WEIGHT = 0.2; // 20%
  matrix: Array<any>;
  weightChar: string;
  cntWeight = 0;
  myCode: string;
  previousDate: any;
  flagInput = true;
  subscription: Subscription;

  constructor() {
    // Random weight char just to initialize the grid
    this.weightChar = new StringGen().generateRandomLetter();
    this.matrix = new Array(this.GRID).fill('').map(() => new Array(this.GRID).fill(''));
    const source = interval(2000);
    this.subscription = source.subscribe(val => this.generateGrid(this.weightChar));
  }

  generateCode(): void {
    // Algorithm of generate MyCode
    // Get the 2 digit seconds from the clock, like so: 12:40:36. > 36 [3.6] > [6,3]
    const d: Date = new Date();
    const seconds: string =
      d.getSeconds() < 10
        ? `0${d.getSeconds().toString()}`
        : d.getSeconds().toString();

    const alphaLetter = this.matrix[seconds.slice(0, 1)][seconds.slice(1, 2)];

    const betaLetter = this.matrix[seconds.slice(1, 2)][seconds.slice(0, 1)];
    let alphaOccurrences = 0;
    let betaOccurrences = 0;
    // Flattern the array
    const flatArray: Array<string> = this.matrix.reduce(
      (accumulator, value) => accumulator.concat(value),
      []
    );
    // Search for occurrences of the alpha letter
    alphaOccurrences = flatArray.filter((e) => e === alphaLetter).length;

    // Search for occurrences of the beta letter
    betaOccurrences = flatArray.filter((e) => e === betaLetter).length;

    // If the count is larger than 9, divide the count by the lowest integer possible
    // in order to get a value lower or equal to 9. *roundup the result if decimal.
    if (alphaOccurrences > 9) {
      alphaOccurrences = Math.ceil(alphaOccurrences / 3);
    }
    if (betaOccurrences > 9) {
      betaOccurrences = Math.ceil(betaOccurrences / 3);
    }
    this.myCode = `${alphaOccurrences}${betaOccurrences}`;
  }

  checkElapsedTime(): void {
    if (this.previousDate === undefined) {
      this.previousDate = new Date();
    }
    const dateNow = new Date();
    const seconds = (dateNow.getTime() - this.previousDate.getTime()) / 1000;
    // The user is only allowed to enter a character once every 4 seconds, i.e. user cannot type repeatedly a random character.
    if (seconds > 4) {
      this.previousDate = dateNow;
      this.flagInput = true;
    } else {
      this.flagInput = false;

    }
  }
  generateWeight(): void {
    const previousIndexList: Array<IPosition> = new Array<IPosition>();
    this.cntWeight = 0;
    const totalCells = this.GRID * this.GRID;
    // generate a random position for weight char
    for (; this.cntWeight < totalCells * this.WEIGHT; this.cntWeight++) {
      let rndX: number = Math.floor(Math.random() * (this.GRID));
      let rndY: number = Math.floor(Math.random() * (this.GRID));
      // if number generated has overlapped previous position
      const flag: boolean = previousIndexList.some(previousIndex => (previousIndex.x === rndX) && (previousIndex.y === rndY));
      if (flag) {
        // Generate a new position for the weight char
        rndX = Math.floor(Math.random() * (this.GRID));
        rndY = Math.floor(Math.random() * (this.GRID));
      }
      // keep track of the last positions
      previousIndexList.push({ x: rndX, y: rndY });
      // Update position in the grid
      this.matrix[rndX][rndY] = this.weightChar;
    }

  }
  generateGrid(weightChar: string, event?: any): void {
    this.checkElapsedTime();
    this.weightChar = weightChar;
    // Generate an empty matrix
    this.matrix = new Array(this.GRID).fill('').map(() => new Array(this.GRID).fill(''));
    for (const x in this.matrix) {
      if (this.matrix.hasOwnProperty(x)) {
        for (const y in this.matrix[x]) {
          if (this.matrix.hasOwnProperty(y)) {
            this.matrix[x][y] = new StringGen().generateRandomLetter(this.weightChar);
          }
        }
      }

    }
    this.cntWeight = 0;
    this.generateWeight();
    this.generateCode();
  }

}

interface IPosition {
  x: number;
  y: number;
}
