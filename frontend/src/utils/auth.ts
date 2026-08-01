const TOKEN_KEY = 'token';
const ROLES_KEY = 'roles';

export function saveAuth(token: string, roles: string[]): void {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(ROLES_KEY, JSON.stringify(roles));
}

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function getRoles(): string[] {
  const raw = localStorage.getItem(ROLES_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function isAuthenticated(): boolean {
  return getToken() !== null;
}

export function hasRole(role: string): boolean {
  return getRoles().includes(role);
}

export function logout(): void {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(ROLES_KEY);
}
