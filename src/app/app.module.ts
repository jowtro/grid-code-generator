import { PaymentsService } from './payments/payments.service';
import { CodegenModule } from './codegen/codegen.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { OnlyAlphabetDirective } from './codegen/directives/onlyAlphabetDirective';
import { AppRoutingModule } from './app-routing.module';
import { PaymentsComponent } from './payments/payments.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    OnlyAlphabetDirective,
    PaymentsComponent,
  ],
  imports: [
    BrowserModule, AppRoutingModule, BrowserAnimationsModule, CodegenModule.forRoot(),FormsModule
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
