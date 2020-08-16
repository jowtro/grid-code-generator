import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CodegenComponent } from './codegen/codegen.component';
import { PaymentsComponent } from './payments/payments.component';

const routes: Routes = [
  { path: 'generator', component: CodegenComponent },
  { path: 'payments', component: PaymentsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
