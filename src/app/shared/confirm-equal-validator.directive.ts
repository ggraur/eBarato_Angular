// https://www.youtube.com/watch?v=YhazkQd59Hk
// Angular password and confirm password validation, can be used to compare any 2 strings

import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator } from '@angular/forms';

@Directive({
    selector: '[appConfirmEqualValidator]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: ConfirmEqualValidatorDirective,
        multi: true
    }]
})

// export class ConfirmEqualValidatorDirective implements Validator {
//     @Input() appConfirmEqualValidator: string = '';
//     validate(control: AbstractControl): { [key: string]: any } | null {
//         const controlToCompare = control.parent?.get(this.appConfirmEqualValidator)
//         if(controlToCompare && controlToCompare.value !== control.value)
//         {
//             return {'notEqual': true};
//         }
//         return null;

//     }
// }
export class ConfirmEqualValidatorDirective implements Validator {
    validate(angularGroupControl: AbstractControl): { [key: string]: any } | null {
        const passwordField = angularGroupControl.get('password');
        const confirmPasswordField = angularGroupControl.get('confirmPassword');
        if(passwordField && confirmPasswordField 
            && passwordField == confirmPasswordField)
        {
            return {'notEqual': true};
        }
        return null;
    }
}
