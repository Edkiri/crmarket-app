import { storeToRefs } from 'pinia';
import useAxios from '@/composables/use-axios';
import useStore from '@/composables/use-store';
import { Market } from '@/app/auth/store/auth-store';

interface LoginForm {
  email: string;
  password: string;
  domain: string;
}

interface LoginResponseInterface {
  token: string;
  market: Market;
  role_id: number;
}

export function useLogin() {
  const { accessToken, market, role } = storeToRefs(useStore('auth'));

  const { fetchApi, error, loading } = useAxios();

  async function login(payload: LoginForm): Promise<boolean> {
    const response = await fetchApi<{ data: LoginResponseInterface }>({
      method: 'POST',
      path: `auth/login`,
      payload: {
        ...payload,
        domain: payload.domain,
      },
    });
    if (response?.status === 200 && response.data?.data?.token) {
      accessToken.value = response.data.data.token;
      market.value = response.data.data.market;
      role.value = response.data.data.role_id;
      return true;
    }
    return false;
  }

  return { login, error, loading };
}
