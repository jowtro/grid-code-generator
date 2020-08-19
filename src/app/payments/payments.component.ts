import { IPayments } from '../codegen/interfaces/ipayments.interface';
import { FormsModule } from '@angular/forms';
import { PaymentsService } from './payments.service';
import { Component, OnInit, NgModule } from '@angular/core';
import { CodegenService } from '../codegen/codegen.service';
@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})

export class PaymentsComponent implements OnInit {
  payment: Array<IPayments>;
  payments: Array<IPayments>;
  amount: number;
  paymentName: string;

  constructor(private paymentService: PaymentsService, public codegenService: CodegenService) {
    this.payments = new Array<IPayments>();
  }

  addToPayments() {
    this.paymentService.addToPayments(
      {
        name: this.paymentName,
        amount: this.amount,
        code: this.codegenService.myCode,
        grid: this.codegenService.matrix
      });
  }

  ngOnInit(): void {
    //Subscriber to the observable
    const paymentsObservable = this.paymentService.getPayments();
    paymentsObservable.subscribe((paymentsData: IPayments[]) => {
      this.payments = paymentsData;
    });
  }

}
