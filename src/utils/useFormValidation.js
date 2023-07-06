import { useState, useCallback } from "react";

export function useFormValidation(setApiError) {
  // функция-хук хранит:
  // значения инпутов
  const [values, setValues] = useState({});
  // значения ошибок инпутов
  const [errors, setErrors] = useState({});
  // значения состояния формы - чтобы за-disabled кнопку формы
  const [isValid, setIsValid] = useState(false);

  // универсальный обработчик инпута (не нужно писать handleChange отдельно для каждой формы)
  const handleChange = (evt) => {
    const { name, value, form } = evt.target;
    // устанавливает новые значения:
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: evt.target.validationMessage });
    // проверит все ли инпуты валидны и установит true или false
    setIsValid(form.checkValidity());
    // сбрасывает ошибку api в span в форме на страницах регистрации и авторизации
    setApiError("");
  };

  // очищает поля инпутов (например, при закрытии формы)
  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return {
    values,
    setValues,
    errors,
    isValid,
    handleChange,
    resetForm,
  };
}
