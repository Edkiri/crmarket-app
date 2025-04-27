<template>
  <form @submit.prevent="handleSubmit" class="max-w-[450px] w-full m-auto p-4 mt-8">
    <div class="flex flex-col">
      <h1 class="text-black font-bold text-center text-2xl">Inicio de sesión</h1>
    </div>

    <div class="flex flex-col">
      <FormInput label="Correo" v-model:input-values="formData.email" :disabled="loading" />
      <FormInput
        type="password"
        label="Contraseña"
        v-model:input-values="formData.password"
        :disabled="loading"
      />
      <button
        type="submit"
        class="text-white mt-4 font-bold text-lg self-start bg-rose-500 hover:bg-rose-600 py-1 rounded-sm w-full"
      >
        Iniciar sesión
      </button>
      <p v-if="error" class="text-red-600 mt-4">Correo o contraseña incorrecto</p>
    </div>
  </form>
</template>

<script setup lang="ts">
import router from '@/router';
import { useLogin } from '../composables/useLogin';
import { useInputValue } from '@/composables/use-input-value';
import validators from '@/utils/input-validators';
import FormInput from '@/ui/inputs/FormInput.vue';
import { reactive } from 'vue';

const formData = reactive({
  email: useInputValue('', validators.email),
  password: useInputValue('', validators.password),
});

const { login, loading, error } = useLogin();

function validateForm(): boolean {
  formData.password.validate();
  formData.email.validate();
  const errors = Object.values(formData)
    .map(inputValue => inputValue.error)
    .filter(item => item);
  if (errors.length > 0) {
    return false;
  }
  return true;
}

async function handleSubmit(): Promise<void> {
  const validated = validateForm();
  if (!validated || loading.value) return;

  const success = await login({
    email: formData.email.text,
    password: formData.password.text,
    domain: window.location.origin as string,
  });

  if (success) {
    router.push('/inventory');
  }
}
</script>
