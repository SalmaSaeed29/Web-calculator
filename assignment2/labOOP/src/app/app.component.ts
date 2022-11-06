import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'LABOOP';

  x:string=""
  firstOperand:string=""
  secondOperand:string=""
  operator:string=""
  expression:string=""
  b:any
  calculated:boolean=false
  pressEqual:boolean=false
  temp:string=""

  constructor(private http:HttpClient){}
add(num1:string,num2:string,op:string){
  this.http.get('http://localhost:6060/calc/arith',{
    responseType:'text',
    params:{
      firstTerm:num1,
      secondTerm:num2,
      operator:op
    },
    observe:'response'
  }).subscribe(response=>{
    this.b=response.body
    console.log(this.b)
  })
}
add2(num:string,op:string){
  this.http.get('http://localhost:6060/calc/uni',{
    responseType:'text',
    params:{
      term:num,
      operator:op
    },
    observe:'response'
  }).subscribe(response=>{
    this.b=response.body
    console.log(this.b)
  })
}
clearAll(){
  this.expression=""
  this.firstOperand=""
  this.secondOperand=""
  this.operator=""
  this.calculated=false
  this.pressEqual=false
  this.b=""
}
delete(){
  this.temp = this.expression.charAt(this.expression.length-1)
  if(this.temp==="+" || this.temp==="-" || this.temp==="x" || this.temp==="÷" || this.temp==="%"){
    this.operator=""
    this.expression=this.firstOperand
  }
  else if(this.b==="Error"){
    this.firstOperand=""
    this.secondOperand=""
    this.operator=""
    this.expression=""
    this.calculated=false
  }
  else if(this.calculated===true){  /the last press was '='/
    this.firstOperand=this.b
    this.firstOperand=this.firstOperand.substring(0, this.firstOperand.length-1)
    this.expression=this.firstOperand
    this.operator=""
    this.secondOperand=""
    this.calculated=false
  }
  else{ /the last press was a number/
    if(this.operator===""){
      this.firstOperand=this.firstOperand.substring(0, this.firstOperand.length-1)
      this.expression=this.firstOperand
      this.secondOperand=""
    }
    else if(this.operator==="+/-"){
      this.firstOperand=this.firstOperand.substring(0, this.firstOperand.length-1)
      this.expression="-"+this.firstOperand
    }
    else if(this.operator==="1/x"){
      this.secondOperand=this.secondOperand.substring(0, this.secondOperand.length-1)
      this.expression="1/"+this.secondOperand
      /*this.operator=""
      this.expression=""*/
    }
    else{
      this.secondOperand=this.secondOperand.substring(0, this.secondOperand.length-1)
      this.expression=this.firstOperand+this.operator+this.secondOperand
    }
  }
}
addNum(y:string){
  if(this.calculated===true){  /the last press is '=' and then I added a number/
    this.clearAll()
    this.firstOperand=y
  }
  else if(this.operator==="" && this.calculated===false){
    this.firstOperand = this.firstOperand+y
  }
  else if(this.pressEqual===true && this.calculated===false){
    this.firstOperand=this.firstOperand+y
    this.pressEqual=false
  }
  else if(this.operator!=="" && this.calculated===false){

    if(this.operator==="+/-" || this.operator==="²√x"){
      this.firstOperand=this.firstOperand+y
      this.pressEqual=false
    }

    else if(this.operator==="1/x"){
      this.secondOperand=this.secondOperand+y
    }

    else if(this.operator==="%"){
      y=""
    }

    else{
    this.secondOperand=this.secondOperand+y
    this.pressEqual=false
    }

  }
  this.expression=this.expression+y
  this.calculated=false
}
addOperator(y:string){
  if(this.operator==="" && this.calculated===false && this.expression!==""){
    this.operator=y
    this.expression=this.expression+y
  }
  else if(this.operator==="+/-" && this.secondOperand===""){
    this.operator=y
    this.firstOperand="-"+this.firstOperand
    this.expression=this.expression+y
  }
  else if(this.calculated===true){
    this.operator=y
    this.firstOperand=this.b
    this.secondOperand=""
    this.expression=this.firstOperand+this.operator
    this.calculated=false
  }
  this.pressEqual=false
}
percent(){
  if(this.calculated===true){
    this.operator="%"
    this.firstOperand=this.b
    this.secondOperand=""
    this.expression=this.firstOperand+this.operator
    this.calculated=false
  }
  else if(this.expression!=="" && this.operator===""){
    this.operator="%"
    this.expression=this.expression+this.operator
  }
  else if(this.operator==="+/-" && this.firstOperand!=="" && this.secondOperand===""){
    this.firstOperand="-"+this.firstOperand
    this.operator="%"
    this.expression=this.expression+"%"
  }
}
oneOver(){
  if(this.expression==="" || this.calculated===true){
    this.clearAll()
    this.operator="1/x"
    this.expression="1/"
  }
}
square(){
  if(this.calculated===true){
    this.operator="x²"
    this.firstOperand=this.b
    this.expression=this.firstOperand+"²"
    this.secondOperand=""
    this.calculated=false
  }
  else if(this.expression!=="" && this.operator===""){
    this.operator="x²"
    this.expression=this.expression+"²"
  }
  else if(this.operator==="+/-" && this.firstOperand!=="" && this.secondOperand===""){
    this.firstOperand="-"+this.firstOperand
    this.operator="x²"
    this.expression=this.expression+"²"
  }
}
root(){
  if(this.expression==="" || this.calculated===true){
    this.clearAll()
    this.operator="²√x"
    this.expression="²√"
  }
}
minus(){
  this.temp = this.expression.charAt(this.expression.length-1)
  if(this.temp==="+" || this.temp==="-" || this.temp==="x" || this.temp==="÷"){
    this.expression=this.expression+"-"
    this.secondOperand="-"
  }
  else if(this.temp==="/"){
    this.firstOperand="1"
    this.operator="÷"
    this.secondOperand="-"
    this.expression=this.expression+"-"
  }
  if(this.expression==="" || this.calculated===true){
    this.clearAll()
    this.operator="+/-"
    this.expression="-"
  }
}
dot(){
  if(this.operator==="" && this.firstOperand.indexOf('.')===-1){
    if(this.firstOperand===""){
      this.firstOperand="0."
      this.expression=this.firstOperand
    }
    else{
      this.firstOperand=this.firstOperand+"."
      this.expression=this.firstOperand
    }
  }
  else if(this.calculated===true){
    this.firstOperand="0."
    this.secondOperand=""
    this.operator=""
    this.calculated=false
    this.expression=this.firstOperand
  }
  else if(this.operator==="+/-" || this.operator==="²√x"){
    if(this.firstOperand===""){
    this.firstOperand="0."
    this.expression=this.expression+this.firstOperand
    }
    else if(this.firstOperand!==""){
      this.firstOperand=this.firstOperand+"."
      this.expression=this.expression+"."
    }
  }
  else if(this.operator!=="" && this.secondOperand.indexOf('.')===-1){
    if(this.secondOperand==="" || this.secondOperand==="-"){
      this.secondOperand=this.secondOperand+"0."
      this.expression=this.expression+"0."
    }
    else{
      this.secondOperand=this.secondOperand+"."
      this.expression=this.expression+"."
    }
  }
}
displayAns(){
  if(this.operator===""){
    this.operator="="
  }
  if(this.firstOperand!==""&&this.secondOperand!==""){
    this.add(this.firstOperand,this.secondOperand,this.operator)
  }
  else if(this.secondOperand===""){
    this.add2(this.firstOperand,this.operator)
  }
  else if(this.firstOperand===""){
    this.add2(this.secondOperand,this.operator)
  }
  this.calculated=true
  this.pressEqual=true
}
}
