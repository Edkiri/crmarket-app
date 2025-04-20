import { Ref } from 'vue';

export interface InputValidator {
  errorMessage: string;
  validate: (value: string) => boolean;
}

export interface InputValues {
  text: Ref<string> | string;
  error: Ref<string> | string;
  validate: () => boolean;
}
