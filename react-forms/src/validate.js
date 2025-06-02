export const validateForm = ({ email, pass, passRepeat }) => {
  const errors = []

  const emptyFields = !(email && pass && passRepeat)
  if (emptyFields) {
    errors.push('Все поля формы должны быть заполнены!')
  } else {
    const emailRegex = /^\w+@[a-zA-Z]+\.[a-z]{2,}$/
    const passRegex = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/

    if (email && !emailRegex.test(email)) {
      errors.push('Адрес email некорректен!')
    }

    if (pass) {
      if (passRepeat && pass !== passRepeat) {
        errors.push('Пароли не совпадают!')
      }

      if (pass.length < 4) {
        errors.push('Пароль короче 4-х символов')
      }

      if (!passRegex.test(pass)) {
        errors.push(
          'Пароль должен содержать строчные и прописные буквы, цифры и символы @$!%*?&',
        )
      }
    }
  }

  return { valOk: !errors.length, valErrors: errors.join('\n') }
}
