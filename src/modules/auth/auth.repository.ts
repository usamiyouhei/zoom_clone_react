import api from '../../lib/api'
import { User } from '../users/users.entity';

export const authRepository = {
  // サインアップ関数
  async signup(
    name: string,
    email: string,
    password: string
  ): Promise<{user: User; token: string}>{
    // localhost:8888/auth/signup
    const result = await api.post('/auth/signup',{
      name,
      email,
      password,
    });
    const { user,token } = result.data;
    return { user: new User(user), token }
  },
  // サインイン関数
  async signin(
    email: string,
    password: string
  ) : Promise<{ user: User; token: string}> {
    const result = await api.post('/auth/signin', {
      email,
      password
    });
    const { user, token } = result.data;
    return { user: new User(user), token}
  }
}