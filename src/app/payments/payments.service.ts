import { IPayments } from '../codegen/interfaces/ipayments.interface';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PaymentsService {
  payments:Array<IPayments>;
  constructor() {this.payments = [] }

  addToPayments(payment) {
    this.payments.push(payment);
  }

  public getPayments(): any {
    //I have created an observable in order to update the table in payment.component
    const paymentsObservable = new Observable(observer => {
           setTimeout(() => {
               observer.next(this.payments);
           }, 400);
    });

    return paymentsObservable;
}

}