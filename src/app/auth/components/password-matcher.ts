import { AbstractControl } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ValidatorFn } from '@angular/forms';
//import { FormControl} from '@angular/forms';

export const passwordMatchValidator = (control: AbstractControl): { [key: string]: boolean } => {
    const password = control.root.value;
    const confirmPassword = control.value;//get('myForm.confirmPassword');
    if (!password || !confirmPassword) {
        return null;
    }
    return password.value === confirmPassword.value ? null : { nomatch: true };
};

/* export function passwordMatchValidator(form: FormGroup): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
      //const forbidden = nameRe.test(control.value);
      //return forbidden ? {'forbiddenName': {value: control.value}} : null;
      const password = form.controls['password'].value;
      const confirmPassword = form.controls['passwordConfirm'].value;//get('myForm.confirmPassword');
      if (!password || !confirmPassword) {
          return null;
      }
      return password.value === confirmPassword.value ? null : { nomatch: true };
    };
  } */

  /* export function passwordMatchValidator(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
      let passwordInput = group.controls[passwordKey];
      let passwordConfirmationInput = group.controls[passwordConfirmationKey];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({notEquivalent: true})
      }
    }
  } */