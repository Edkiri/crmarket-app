import type { InputValidator } from '@/types/form-validators';

interface Validators {
  email: InputValidator;
  password: InputValidator;
  nonNegativeNumber: InputValidator;
  notEmpty: InputValidator;
}

const validators: Validators = {
  email: {
    validate: (value: string): boolean => {
      const pattern = /^[\w.-]+@[a-zA-Z_-]+?(?:\.[a-zA-Z]{2,})+$/;
      return pattern.test(value);
    },
    errorMessage: 'Ingresa una dirección de correo válido',
  },
  password: {
    validate: (value: string): boolean => {
      if (value.length < 1) return false;
      return true;
    },
    errorMessage: 'Ingresa una contraseña',
  },
  nonNegativeNumber: {
    validate: (value: string): boolean => {
      const number = Number(value);
      return !Number.isNaN(number) && number >= 0;
    },
    errorMessage: 'Ingresa un número mayor o igual a 0',
  },
  notEmpty: {
    validate: (value: string): boolean => {
      if (value.length < 1) return false;
      return true;
    },
    errorMessage: 'Este campo es requerido',
  },
};

export default validators;
