import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./App.css";

function App() {
  const schema = yup.object().shape({
    username: yup
      .string()
      .required("Имя пользователя обязательно")
      .min(5, "Имя пользователя должно быть не менее 5 символов"),
    email: yup
      .string()
      .required("Email обязателен")
      .email("Введите корректный email"),
    password: yup
      .string()
      .required("Пароль обязателен")
      .min(8, "Пароль должен быть не менее 8 символов")
      .max(32, "Пароль должен быть не более 32 символов")
      .matches(
        /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/,
        "Пароль должен содержать минимум одну строчную букву, одну заглавную букву, одну цифру и один специальный символ"
      ),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Пароли не совпадают")
      .required("Подтверждение пароля обязательно"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log("Форма отправлена:", data);
  };

  return (
    <div className="register-container">
      <h1>Регистрация</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="register-form">
        <div className="form-group">
          <input
            type="text"
            placeholder="Имя пользователя"
            {...register("username")}
          />
          {errors.username && (
            <span className="error">{errors.username.message}</span>
          )}
        </div>

        <div className="form-group">
          <input type="email" placeholder="Email" {...register("email")} />
          {errors.email && (
            <span className="error">{errors.email.message}</span>
          )}
        </div>

        <div className="form-group">
          <input
            type="password"
            placeholder="Пароль"
            {...register("password")}
          />
          {errors.password && (
            <span className="error">{errors.password.message}</span>
          )}
        </div>

        <div className="form-group">
          <input
            type="password"
            placeholder="Подтвердите пароль"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <span className="error">{errors.confirmPassword.message}</span>
          )}
        </div>

        <button type="submit">Зарегистрироваться</button>
      </form>
    </div>
  );
}

export default App;
