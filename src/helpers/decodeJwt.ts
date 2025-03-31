import { jwtDecode } from "jwt-decode";

const decodeJwt = (token: string) => {
  const decoded = jwtDecode(token);

  return decoded;
}

const decodeGoogleJwt = (token: string) => {
  const decoded = jwtDecode(token);

  return decoded;
}

export { decodeJwt, decodeGoogleJwt };