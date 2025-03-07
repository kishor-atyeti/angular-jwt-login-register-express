const apiUrl = "http://127.0.0.1:4402/api";

export const ApiEndpoint = {
  Auth: {
    Register: `${apiUrl}/users/register`,
    Login: `${apiUrl}/users/login`,
    Me: `${apiUrl}/users/me`
  }
};

export const LocalStorage = {
  token: 'USER_TOKEN',
};
