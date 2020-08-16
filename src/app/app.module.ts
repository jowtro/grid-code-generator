import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { AppComponent } from './app.component';
import { CodegenComponent } from './codegen/codegen.component';
import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { OnlyAlphabetDirective } from './codegen/directives/onlyAlphabetDirective';
import { AppRoutingModule } from './app-routing.module';
import { PaymentsComponent } from './payments/payments.component'; // CLI imports AppRoutingModule
@NgModule({
  declarations: [
    AppComponent,
    CodegenComponent,
    OnlyAlphabetDirective,
    PaymentsComponent
  ],
  imports: [
    BrowserModule, FormsModule,AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
