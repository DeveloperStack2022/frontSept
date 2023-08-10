export function debounce(func: Function, wait: number, immediate?: boolean) {
    let timeout: ReturnType<typeof setTimeout> | null
  
    return function (this: any) {
      const context = this
      const args = arguments
  
      const later = function () {
        timeout = null
        if (!immediate) func.apply(context, args)
      }
  
      if (immediate && !timeout) func.apply(context, args)
  
      timeout && clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    }
  }

export function validor_nro_cl(nro:string){
  
  let cedula = nro;

  //Preguntamos si la cedula consta de 10 digitos
  if(cedula.length == 10){
     
     //Obtenemos el digito de la region que sonlos dos primeros digitos
     var digito_region = cedula.substring(0,2);
     
     //Pregunto si la region existe ecuador se divide en 24 regiones
     if( parseInt(digito_region) >= 1 && parseInt(digito_region) <= 24 ){
       
       // Extraigo el ultimo digito
       var ultimo_digito   = cedula.substring(9,10);

       //Agrupo todos los pares y los sumo
       var pares = parseInt(cedula.substring(1,2)) + parseInt(cedula.substring(3,4)) + parseInt(cedula.substring(5,6)) + parseInt(cedula.substring(7,8));

       //Agrupo los impares, los multiplico por un factor de 2, si la resultante es > que 9 le restamos el 9 a la resultante
       var numero1 = cedula.substring(0,1);
       var producto = (parseInt(numero1) * 2);

       if( producto > 9 ){ 
          var producto = (producto - 9); }

        var numero3 = cedula.substring(2,3);
        var producto3 = (parseInt(numero3) * 2);
        if( producto3 > 9 ){ var producto3 = (producto3 - 9); }

        var numero5 = cedula.substring(4,5);
        var producto5 = (parseInt(numero5) * 2);
        if( producto5 > 9 ){ var producto5 = (producto5 - 9); }

        var numero7 = cedula.substring(6,7);
        var producto7 = (parseInt(numero7) * 2);
        if( producto7 > 9 ){ var producto7 = (producto7 - 9); }

        var numero9 = cedula.substring(8,9);
        var producto9 = (parseInt(numero9) * 2);
        if( producto9 > 9 ){ var producto9 = (producto9 - 9); }

        var impares = numero1 + numero3 + numero5 + numero7 + numero9;

        //Suma total
        var suma_total = (pares + impares);

        //extraemos el primero digito
        var primer_digito_suma = String(suma_total).substring(0,1);

        //Obtenemos la decena inmediata
        var decena = (parseInt(primer_digito_suma) + 1)  * 10;

        //Obtenemos la resta de la decena inmediata - la suma_total esto nos da el digito validador
        var digito_validador = decena - parseInt(suma_total);

        //Si el digito validador es = a 10 toma el valor de 0
        if(digito_validador == 10)
          var digito_validador = 0;

        //Validamos que el digito validador sea igual al de la cedula
        if(digito_validador == parseInt(ultimo_digito)){
          console.log('la cedula:' + cedula + ' es correcta');
          return false
       }else{
         console.log('la cedula:' + cedula + ' es incorrecta');
         return true
       }
       
     }else{
       // imprimimos en consola si la region no pertenece
       console.log('Esta cedula no pertenece a ninguna region');
       return true
     }
  }else{
     //imprimimos en consola si la cedula tiene mas o menos de 10 digitos
     console.log('Esta cedula tiene menos o mas de 10 Digitos');
     return true
  }    
}