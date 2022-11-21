/* eslint-disable prefer-arrow/prefer-arrow-functions */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @angular-eslint/directive-selector */
/* eslint-disable @angular-eslint/directive-class-suffix */

import { AbstractControl, ValidatorFn } from "@angular/forms";

export function blankSpaceValidator(): ValidatorFn{
  return (control: AbstractControl): {[key: string]: boolean} | null => {
    if(control.value){
      if(control.value.trim().length === 0){
        return {noBlankSpaces: true};
      }
    }
    return null;
  };

}
