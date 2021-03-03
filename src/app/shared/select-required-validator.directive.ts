// https://www.youtube.com/watch?v=2AAUf32pKy8

import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator } from '@angular/forms';

@Directive({
    selector: '[appSelectorValidator]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: SelectRequiredValidatorDirective,
        multi: true
    }]
})
export class SelectRequiredValidatorDirective implements Validator {
    @Input() appSelectorValidator: string | undefined;
    validate(control: AbstractControl): { [key: string]: any } | null {
        return control.value === this.appSelectorValidator ? { 'defaultSelected': true } : null
    }
}