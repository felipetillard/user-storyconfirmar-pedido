import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
@Component({
  selector: 'app-confirm-order',
  templateUrl: './confirm-order.component.html',
  styleUrls: ['./confirm-order.component.css']
})
export class ConfirmOrderComponent implements OnInit {
  creditCard:boolean = false;
  page:number = 0;
  btnOne:string = 'Atras';
  btnTwo:string = 'Siguiente';
  payMethod:boolean = false; 
  payMethodStr:string = "Tarjeta";
  time:boolean = false;
  formGroup:FormGroup;
  constructor( public formBuilder: FormBuilder) { }

  ngOnInit() {
    this.creatForm();
  }

   toggleCreditCard() {
    this.creditCard = !this.creditCard;
  }

  nextPage(){
    if (this.validateForm()) {
      return;
    }
    if(this.page <= 2) this.page += 1; 
    this.refreshName();
  }
  lastPage(){
    this.page -= 1;
    this.refreshName();
  }

  private refreshName(){
    this.btnTwo = (this.page == 2)? 'Comprar':'Siguiente';
  }

  togglePayMethod(){
    this.payMethod = !this.payMethod;
    this.payMethodStr = (this.payMethod)?"Efectivo":" Tarjeta";
  }

  timeYa(){
    this.time = false;
  }
  timeWait(){
    this.time = true;
  }

  validateForm(){
    switch(this.page) { 
   case 0: { 
      return (this.formGroup.controls.direccion.invalid && this.formGroup.controls.ciudad.invalid) 
      break; 
   } 
   case 1: { 
      return (this.formGroup.controls.nombre.invalid && this.formGroup.controls.apellido.invalid && this.formGroup.controls.numTarjeta.invalid && this.formGroup.controls.fechaVencimiento.invalid && this.formGroup.controls.cvc.invalid)  
      break; 
   } 
   case 2: { 
      //statements; 
      break; 
   } 
}  }

  creatForm(){
    this.formGroup = this.formBuilder.group({
      direccion:['', Validators.required],
      ciudad: ['', Validators.required],
      nombre: ['', [Validators.required, Validators.pattern('[a-zA-Z]{1,30}') ]],
      apellido:['', [Validators.required, Validators.pattern('[a-zA-Z]{1,50}') ]],
      numTarjeta:['',[Validators.required, Validators.pattern('^4[0-9]{12}(?:[0-9]{3})?$')]],
      fechaVencimiento: ['', [Validators.required ]],
      cvc: ['', [Validators.required, Validators.pattern('[0-9]{3}')] ],
      fechaEntrega: ['', [Validators.required, ]]
    });
  }


}

