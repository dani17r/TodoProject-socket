// external libraries
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";

// interfaces
import type { RouteParamsRaw } from "vue-router";

// internal libraries
import type {
  NotifyErrorI,
  CallbacksI,
  ObjectI,
} from "@interfaces/interfaces.generals";
import router from "@/router";
import { ref, type Ref } from "vue";
import type { Socket } from "socket.io-client";

//Constantes
const ONE_MINUTE = 1 * 60 * 1000;
const TEN_MINUTE = 10 * 60 * 1000;

/** formatNow - Funcion para convertir el tiempo
 * en tiempo relativo (hace un minuto, hace 2 horas, etc) */
export const formatNow = (date: string) => {
  // extendemos la libreria con la opcion que necesitamos
  dayjs.extend(relativeTime);

  // convertimos el tiempo en un tiempo relativo actual
  const format = dayjs(new Date(date)).fromNow(true);
  return format;
};

/** includesOr - Funcion para verificar por medio de 
un array varios valores existentes en un solo string */
const includesOr = (val: string, searchs: string[]) => {
  let result = false; // Iniciamos el resultado en false

  //Recorremos el array de string
  searchs.forEach((search) => {
    /** Verificamos si existe lo que trae search
     * y si es true lo asignamos al resultado. */
    const status = val.includes(search);
    if (status) result = status;
  });
  return result;
};

/** nowTime - Funcion para calcular el tiempo que ha pasado
 * de manera reactiva */
export const nowTime = (val: Date | string) => {
  //convertimos a string el valor actual
  const current = String(val);

  //creamos la fecha reactiva
  const date = ref(formatNow(current));

  /** Nota: Hacemos el if sin {} por que
   * solo tiene un condicional y no es necesario */

  // Si date contiene 'seconds' o 'minutes' se ejecuta
  if (includesOr(date.value, ["seconds", "minutes"]))
    //cada minuto se actualiza la variable date
    setInterval(() => (date.value = formatNow(current)), ONE_MINUTE);
  //Si date contiene 'hours' se ejecuta
  else if (includesOr(date.value, ["hours"]))
    //cada 10 minutos se actualiza la variable date
    setInterval(() => (date.value = formatNow(current)), TEN_MINUTE);

  return date.value;
};

/** pushLink - Funcion para redireccionar a una ruta. */
export const pushLink = (name: string, params: RouteParamsRaw) => {
  router.push({ params, name });
};

/** TitleHeader - Funcion para concatenar un titulo a un string. */
export const TitleHeader = (title: string) => `ToDoProj - ${title}`;

/** superErrors - Funcion para devolver una class(HTML) segun el
 *  valor y la condicion de errores */
export const superErrors = (
  errors: Ref<ObjectI<unknown>>,
  style?: string,
  reverse = false,
) => {
  //Si no hay un estilo entonces por defecto deja este.
  const className = style ?? "!border-red-500";

  //Funcion de retorno para selecionar un error por su clave valor.
  return (name: string): string => {
    /** Preguntamos si reverse esta true
     * e invertimos la condicion para mostrar la class(HTML) */
    const condition = reverse ? !errors.value[name] : errors.value[name];

    //En base a la condicion regresamos la class
    return condition ? className : "";
  };
};

//callbackExt
export const useSocketAction = (name: string, socket: Socket) => {
  return <T, G = T>(callbackOne?: CallbacksI<T>, callbackTwo?: CallbacksI<G>) =>
    (params?: unknown) => {
      if (params) socket.emit(name, params);
      else socket.emit(name);

      socket.on(`${name}/success`, (body?: T & G) => {
        callbackOne?.actions && callbackOne.actions(body);
        callbackTwo?.actions && callbackTwo.actions(body);

        setTimeout(() => {
          callbackOne?.finally && callbackOne?.finally();
          callbackTwo?.finally && callbackTwo?.finally();
          // socket.close();
        }, 200);
      });

      socket.on(`${name}/error`, (err: NotifyErrorI) => {
        callbackOne?.error && callbackOne.error(err);
        callbackTwo?.error && callbackTwo.error(err);

        setTimeout(() => {
          callbackOne?.finally && callbackOne?.finally();
          callbackTwo?.finally && callbackTwo?.finally();
          // socket.close();
        }, 200);
      });
    };
};
