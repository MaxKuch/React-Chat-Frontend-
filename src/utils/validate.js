const validate = ({ isAuth, values, errors }) => {
  const rules = {
    email: value => {
      if (!value) {
        errors.email = 'Введите E-Mail';
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
      ) {
        errors.email = 'Неверный E-Mail';
      }
    },
    name: value =>{
      if (!value) {
        errors.name = 'Введите ваше имя';
      }
      else if(value.length < 2) {
        errors.name = 'Имя должно собержать не менее двух символов';
      }
    },
    password: value => {
      if (!value){
        errors.password = "Введите пароль"
      } else if (!isAuth && !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/i.test(value))
        errors.password = "Слишком легкий пароль"
    },
    repeatPassword: value =>{
      if (!value) {
        errors.repeatPassword = 'Повторите пароль';
      } else if (value !== values.password){
        errors.repeatPassword = 'Пароли не совпадают';
      }
    },
  }
  Object.keys(values).forEach(key => 
    rules[key] && rules[key](values[key])
  )
}

export default validate