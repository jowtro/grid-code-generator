import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { interval, Subscription } from 'rxjs';
import { CodegenService } from './codegen.service';
@Component({
  selector: 'app-codegen',
  templateUrl: './codegen.component.html',
  styleUrls: ['./codegen.component.scss'],
  animations: [
    trigger('popOverState', [
      state('show', style({
        opacity: 1
      })),
      state('hide', style({
        opacity: 0
      })),
      transition('show => hide', animate('500ms ease-out')),
      transition('hide => show', animate('500ms ease-in'))
    ])
  ],
})

export class CodegenComponent implements OnInit {
  subscriptionAnimation: Subscription;
  show = false;
  myCode: string;
  matrix: Array<unknown>;
  weightChar: string;

  constructor(public serviceCodegen: CodegenService) {
    const sourceAnimation = interval(1000);
    this.subscriptionAnimation = sourceAnimation.subscribe(val => this.animationToggle());
  }

  get stateName(): string {
    return this.show ? 'show' : 'hide';
  }

  generateGrid(event?: unknown): void {
    this.serviceCodegen.generateGrid(this.weightChar, event);
  }
  animationToggle(): void {
    this.show = !this.show;
  }

  ngOnInit(): void {
    this.weightChar = this.serviceCodegen.weightChar;
  }

}

