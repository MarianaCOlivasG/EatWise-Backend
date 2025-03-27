
import 'dotenv/config';
import { get } from 'env-var';


export const envs = {
  HOST: get('HOST').required().asString(),
  PORT: get('PORT').required().asPortNumber(),
  HOST_DB: get('HOST_DB').required().asString(),
  PORT_DB: get('PORT_DB').required().asPortNumber(),
  USERNAME_DB: get('USERNAME_DB').required().asString(),
  PASSWORD_DB: get('PASSWORD_DB').asString(),
  DATABASE_DB: get('DATABASE_DB').required().asString(),
  JWT_SEED: get('JWT_SEED').required().asString(),
}