import { ref } from 'vue';
import type { InputValidator, InputValues } from '@/types/form-validators';

export function useInputValue(
  initialValue?: string,
  validator?: InputValidator | InputValidator[]
): InputValues {
  const text = ref(initialValue ?? '');
  const error = ref<string>('');

  function validate(): boolean {
    error.value = '';

    if (!validator) return true;

    if (!Array.isArray(validator)) {
      const validated = validator.validate(text.value);
      if (!validated) {
        error.value = validator.errorMessage;
        return false;
      }
    } else {
      for (const singleValidator of validator) {
        const validated = singleValidator.validate(text.value);
        if (!validated) {
          error.value = singleValidator.errorMessage;
          return false;
        }
      }
    }

    return true;
  }

  return { text, error, validate };
}
