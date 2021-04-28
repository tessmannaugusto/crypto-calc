import { Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-text-element',
  templateUrl: './text-element.component.html',
  styleUrls: ['./text-element.component.css']
})
export class TextElementComponent implements OnInit {

  initialValue: number = 3000;
  currentValue;
  coinValue: number = 55000;
  resultValue: number;
  investToggle: boolean = false;
  investToggleValue: string = "invest";

  currencies:string[] = ["Bitcoin", "Ethereum", "Dogecoin", "blabla"]
  selectedCurrency: string = this.currencies[0]

  constructor() { }

 ngOnInit() {
    this.fetchCurrentValue(this.selectedCurrency);
  }

  //Adjust size of imput according to imput lenght
  adjustInputSize(inputElement: HTMLInputElement){
    inputElement.style.width =  ((inputElement.value.length + 1) * 15) + 'px';
    if(inputElement.value.length == 0){
      inputElement.style.width = (inputElement.getAttribute('placeholder').length + 1) * 13 + 'px'
    }
  }

  //Validation function to check if imput are numbers
  validateInput(value: number, inputElement: HTMLInputElement){
    if(value / 1){
      inputElement.classList.remove("error");
      this.calcInvestment();
    }else{
      inputElement.classList.add("error");
    }
  }

  //Updates the number of resultValue
  calcInvestment(){
    this.resultValue = (this.initialValue /  this.currentValue) * this.coinValue ;
  }

  //Function to mock the fetching of current coin value
  async fetchCurrentValue(crypto: string){
    switch (crypto) {
      case "Bitcoin":
        this.currentValue = await Promise.resolve(50000.00);
        // this.coinValue = this.currentValue * 1.2;
        this.calcInvestment();
        break;
      case "Ethereum":
        this.currentValue = await Promise.resolve(1000.00);
        // this.coinValue = this.currentValue * 1.2;
        this.calcInvestment();
        break;
      case "Dogecoin":
        this.currentValue = await Promise.resolve(50.00);
        // this.coinValue = this.currentValue * 1.2;
        this.calcInvestment();
        break;
      case "blabla":
        this.currentValue = await Promise.resolve(3.00);
        // this.coinValue = this.currentValue * 1.2;
        this.calcInvestment();
        break;
      default:
        this.currentValue = await Promise.resolve(0.00);
        this.calcInvestment();
        break;
    }
  }

  onChangeSelect(){
    console.log(this.selectedCurrency)
    this.fetchCurrentValue(this.selectedCurrency);
  }

  onInvestToggle(spanElement: HTMLSpanElement){
    if(this.investToggle){
      this.investToggle = false;
      spanElement.innerHTML = "invest"
    }
    else{
      this.investToggle = true;
      spanElement.innerHTML = "invested"
    }
  }
}
