// project libraries
import { validationForm } from "@utils/validations";
import notifyComposable from "@composables/notify";
import { userStore } from "@/stores/user";

// internal libraries
import { useRouter } from "vue-router";
import { reactive } from "vue";

//Datos que se repiten.
const formLogin = {
  values: {
    email: "",
    password: "",
  },
  validates: {
    email: ["empty", "min:6", "email"],
    password: ["empty", "min:8"],
  },
};

export const signupComposable = () => {
  /** Composables */
  const Notify = notifyComposable();

  /** Stores */
  const useState = userStore();

  /** Instancias */
  const router = useRouter();
  const form = reactive({
    ...formLogin.values,
    fullname: "",
  });

  // Creamos validaciones para el form
  const { check, errors, setError } = validationForm({
    fullname: ["empty", "min:3"],
    ...formLogin.validates,
  });

  const register = () => {
    const status = check(form);

    if (status.value)
      useState.register(form, {
        actions: (notify) => {
          Notify.success(String(notify?.message));
          router.push({ name: "login" });
        },
        error: (error) => setError(error),
      });
  };

  return {
    register,
    errors,
    form,
  };
};

export const loginComposable = () => {
  /** Composables */
  const Notify = notifyComposable();

  /** Stores */
  const useState = userStore();

  /** Instancias */
  const form = reactive(formLogin.values);
  const router = useRouter();

  // Validaciones para el form
  const { check, errors, setError } = validationForm(formLogin.validates);

  const login = () => {
    const status = check(form);
    if (status.value)
      useState.login(form, {
        actions: (notify) => {
          Notify.success(String(notify?.message));
          router.push({ name: "home" });
        },
        error: (error) => setError(error),
      });
  };

  return {
    errors,
    login,
    form,
  };
};
