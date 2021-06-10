import { Component, OnInit,OnChanges, Input } from '@angular/core';

@Component({
  selector: 'app-extended-input',
  templateUrl: './extended-input.component.html',
  styleUrls: ['./extended-input.component.css']
})
export class ExtendedInputComponent implements OnInit {

  constructor() { }

  @Input() labelText: any;
  @Input() inputErrors: any;
  @Input() errorDefs: any;
  @Input() formSubmitted: boolean;
  @Input()  formName: string;

  errorMessage = '';
  errorFound = false;

  isInputHaveErrors = null;

  ngOnChanges(changes: any): void {
    this.errorMessage = '';
    this.errorFound = false;
    if (this.inputErrors && this.formSubmitted) {
      Object.keys(this.errorDefs).some(key => {
        if (this.inputErrors[key]) {
          this.errorMessage = this.errorDefs[key];
          this.errorFound = true;
          return true;
        }
      });
    }
  }

  ngOnInit() {
  }

}
