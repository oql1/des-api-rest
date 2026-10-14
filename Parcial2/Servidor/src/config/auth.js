const required = (name) => {
  const value = process.env[name];
  if (!value || !value.trim()) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
};

const basicUsername = process.env.BASIC_AUTH_USERNAME || required("AUTH_USERNAME");
const basicPassword = process.env.BASIC_AUTH_PASSWORD || required("AUTH_PASSWORD");
const jwtSecret = required("JWT_SECRET");

if (jwtSecret.length < 32) {
  throw new Error("JWT_SECRET must be set to at least 32 characters");
}

export const authConfig = Object.freeze({
  basicUsername,
  basicPassword,
  username: required("AUTH_USERNAME"),
  password: required("AUTH_PASSWORD"),
  apiKey: required("API_KEY"),
  bearerToken: required("BEARER_TOKEN"),
  jwtSecret,
});
