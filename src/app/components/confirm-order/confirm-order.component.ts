import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
@Component({
  selector: 'app-confirm-order',
  templateUrl: './confirm-order.component.html',
  styleUrls: ['./confirm-order.component.css']
})
export class ConfirmOrderComponent implements OnInit {
  creditCard:boolean = false;
  montoPago = 500;
  page:number = 2;
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
  checkDates(date: number[]){
    var dateObj = new Date();
    if (date[1] as number > dateObj.getFullYear()) return false;
    if( date[0] as number < (dateObj.getMonth() + 1)) return true;
    return false;
  }



  validateForm(){
   switch(this.page) { 
   case 0: { 
      return (this.formGroup.controls.direccion.invalid && this.formGroup.controls.ciudad.invalid) 
      break; 
   } 
   case 1: {
     let formCredit = (this.formGroup.controls.nombre.invalid && this.formGroup.controls.apellido.invalid && this.formGroup.controls.numTarjeta.invalid && this.formGroup.controls.fechaVencimiento.invalid && this.formGroup.controls.cvc.invalid); 
     let formCash = this.formGroup.controls.montoPagar.invalid;
     let dateArray = this.formGroup.controls.fechaVencimiento.value.split("/");

    if(!formCredit){
      if(!this.checkDates(dateArray))
      {
        return false;
       } 
     }
    if(!formCash)
    {
        if( this.formGroup.controls.montoPagar.value as number >= this.montoPago)
        {
          return false;
        }
    }
    return true;
   } 
   case 2: { 
      let dateArray = this.formGroup.controls.fechaEntrega.value.split("/");
      this.checkdeliverDate(dateArray);
      break; 
   } 
}  }


checkdeliverDate(date: number[]){
  var dateObj = new Date(date[2],date[1], date[0]);
  var dateAct = new Date(date[2],date[1], date[0]);
  console.log(dateObj > dateAct)
    if (date[1] as number > dateObj.getFullYear()) return false;
    if( date[0] as number > (dateObj.getMonth() + 1)) return false;
    if( date[0] as number < (dateObj.getMonth() + 1)) return true;
    return false;
}

inicio(){
  if (this.validateForm()) {
      return;
    }
  this.page = 0;
}

  creatForm(){
    this.formGroup = this.formBuilder.group({
      direccion:['', Validators.required],
      ciudad: ['', Validators.required],
      nombre: ['', [Validators.required, Validators.pattern('[a-zA-Z]{1,30}') ]],
      apellido:['', [Validators.required, Validators.pattern('[a-zA-Z]{1,50}') ]],
      numTarjeta:['',[Validators.required, Validators.pattern('^4[0-9]{12}(?:[0-9]{3})?$')]],
      fechaVencimiento: ['', [Validators.required, Validators.pattern('(0[1-9]|10|11|12)/20[0-9]{2}$') ]],
      cvc: ['', [Validators.required, Validators.pattern('[0-9]{3}')] ],
      montoPagar:['', Validators.required],
      fechaEntrega: ['', [Validators.required, Validators.pattern('(([1-2][0-9])|([1-9])|(3[0-1]))/((1[0-2])|([1-9]))/[0-9]{4}') ]],
      horaEntrega:['', [Validators.required, Validators.pattern("^[0-2][0-3]:[0-5][0-9]$")]]
    });
  }


}

