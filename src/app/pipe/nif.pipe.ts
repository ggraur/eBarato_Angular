import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nif'
})
export class NifPipe implements PipeTransform {
 

  transform(value: string, lng: string): string {
    if (lng != 'pt') {
      return value
    }
    else {
       let bRez: boolean = this.IsValidContrib(value) ;
       if (bRez==true){
          return value;
       } 
      return '';
    }
  }

  IsValidContrib(contrib: string): boolean {
    if (contrib == null || contrib == "") {
      //ErrorMessage = "Número fiscal vazio, por favor insere o número fiscal!";
      return false;
    }
    if ((contrib.length != 9)) {
      //ErrorMessage = $"Número fiscal : {contrib}, não corresponde ao comprimento estipulado pelas autoridades fiscais!";
      return false;
    }

    console.log("pipe NIF");

    const sS = Array.from(contrib);
    var c: any;

    
    let i1: number = 1;
    let checkDigit: number = 0;

    if ((contrib.length == 9)) {
      c = sS[0];

      if ((c.Equals('1') | c.Equals('2') | c.Equals('5') | c.Equals('6') | c.Equals('8') | c.Equals('9'))) {
        //              checkDigit =    (int)char.GetNumericValue(sS[0]) * 9;
        checkDigit = contrib.charCodeAt(0) * 9; //.char(sS[0]) * 9);//    (int)char.GetNumericValue(sS[0]) * 9;
        let nString: any = sS.shift();
        
        for (let n of nString) {

          checkDigit += (contrib.charCodeAt(+n) * (10 - i1));
           i1++;
        }

        // for (i = 2; i <= 8; i++)

        //   checkDigit += (int)char.GetNumericValue(sS[i - 1]) * (10 - i);

        checkDigit = 11 - (checkDigit % 11);

        if ((checkDigit >= 10))
          checkDigit = 0;

        if (checkDigit == contrib.charCodeAt(8)) //(int)char.GetNumericValue(sS[8]))
        {
          // ErrorMessage = $"Numéro de contribuinte:{contrib} validado com sucesso!";
          return true;
        }
      }
    }
    return false;
  }
}
