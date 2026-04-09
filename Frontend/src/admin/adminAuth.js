const ADMIN_AUTH_STORAGE_KEY = 'aungstar_admin_auth';

export function getExpectedAdminCredentials() {
  return {
    username: (process.env.REACT_APP_ADMIN_USERNAME || 'Admin123').trim().toLowerCase(),
    email: (process.env.REACT_APP_ADMIN_EMAIL || 'admin@example.com').trim().toLowerCase(),
    password: process.env.REACT_APP_ADMIN_PASSWORD || 'Admin123',
  };
}

export function validateAdminCredentials(identifier, password) {
  const normalizedIdentifier = (identifier || '').trim().toLowerCase();
  const normalizedPassword = password || '';
  const expected = getExpectedAdminCredentials();

  const usernameOrEmailMatches =
    normalizedIdentifier === expected.username || normalizedIdentifier === expected.email;

  return usernameOrEmailMatches && normalizedPassword === expected.password;
}

export function isAdminAuthenticated() {
  if (typeof window === 'undefined') {
    return false;
  }

  return window.sessionStorage.getItem(ADMIN_AUTH_STORAGE_KEY) === 'true';
}

export function setAdminAuthenticated(authenticated) {
  if (typeof window === 'undefined') {
    return;
  }

  if (authenticated) {
    window.sessionStorage.setItem(ADMIN_AUTH_STORAGE_KEY, 'true');
    return;
  }

  window.sessionStorage.removeItem(ADMIN_AUTH_STORAGE_KEY);
}
