// interfaces
import type {
  NotifyErrorI,
  ObjectI,
  ValidsT,
} from "@interfaces/interfaces.generals";

// internal libraries
import { computed, ref } from "vue";

const validations = <ValidsT>{
  // Validar cuando un string esta vacio
  empty: (fieldName, fieldValue) => {
    return !fieldValue ? "The field " + fieldName + " is required" : "";
  },

  // Validar cuando un string es menor que
  min: (fieldName, fieldValue, min) => {
    return fieldValue.length < Number(min)
      ? `The ${fieldName} field cannot have less than  ${min} characters`
      : "";
  },

  // Validar cuando un string es mayor que
  max: (fieldName, fieldValue, max) => {
    return fieldValue.length > Number(max)
      ? `The ${fieldName} field cannot be longer than ${max} characters`
      : "";
  },

  // Validar cuando un string es un email
  email: (_, fieldValue) => {
    const re = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    return !re.test(fieldValue) ? "The email is not valid" : "";
  },

  // Validar cuando es un number
  num: (fieldName, fieldValue) => {
    const isNum = /^\d+$/.test(fieldValue);
    return !isNum ? `The ${fieldName} field must be of numeric type` : "";
  },
};

/** Validacion para el form -----------
 *   + El orden de las reglas
 *   { name: -->['empty', 'min:3']<-- }
 *   seran validadas en el orden dado */
export const validationForm = <T extends ObjectI<string[]>>(rules: T) => {
  // Variable reactiva para agregar los errores, inicia vacia
  const errors = ref<T | ObjectI<unknown>>({});

  // Funcion para limpiar los errores
  const clear = () => (errors.value = {});

  //valor reactivo para saber si hay errores fuera de la funcion check
  const status = computed(() => {
    return !Object.values(errors.value).some((el) => String(el).length);
  });

  /* Funcion para verificar los datos ingresados con las reglas,
   * y definiar si cumplen las validaciones, de lo contrario
   * crea o asigna un error en errors.value[field] */
  const check = <T2>(form: ObjectI<keyof T2>) => {
    /* Params: form -- los datos que se validaran si cumplen
     * o no las validaciones. */

    // Iteramos sobre las reglas --> { name: ['empty', 'min:3'] }
    for (const field in rules) {
      /* name es el field y el array es rules[field]
       * Iteramos sobre el array de name */
      for (const rule of rules[field]) {
        /* rule es ahora 'empty' o 'min:3'
         * Verifiamos si rule incluye en el string ':' */
        if (rule.includes(":")) {
          /* separamos 'min:3' en 2 partes
           * Obtenemos fieldVal = min y val = 3 */
          const [fieldVal, val] = rule.split(":");

          /* Obtenemos el error si hay error o un valor vacio
           * validations['min'](1,2,3) = valitations.min('name', 'input', 3) */
          const value = validations[fieldVal](field, form[field], val);

          // Asignamos el valor
          errors.value[field] = value;

          //Salimos del loop o condicional si ya tenemos un error.
          if (value.length) break;
        } else {
          /* Obtenemos el error si hay error o un valor vacio
           * validations['empy'](1,2,3) = valitations.min('name', 'input') */
          const value = validations[rule](field, form[field]);

          // Asignamos el valor
          errors.value[field] = value;

          //Salimos del loop o condicional si ya tenemos un error.
          if (value.length) break;
        }
      }
    }

    // Retornamos el valor reactivo status
    return status;
  };

  //Funcion para asignar un error traido del servidor
  const setError = (data: NotifyErrorI) => {
    /* Desde el servidor viene 'field' nombre del campo que dio error
     * y 'message' campo con el mensaje de error
     * data es traida del servidor */

    // Si contiene algo
    if (data["field"]) {
      /* Creamos o Asignamos el nombre del campo traido
       * del servidor en errors.value e insertamos
       * el mensaje, Ejemplo:
       * errors.value['name'] = 'este campo no existe' */
      errors.value[data["field"]] = data["message"] as never;
    }
  };

  return {
    setError,
    status,
    errors,
    clear,
    check,
  };
};
