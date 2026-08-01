import axios from 'axios';

export function getErrorMessage(error: unknown, fallback: string): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data;

    if (typeof data === 'string') {
      return data;
    }

    if (data?.message) {
      return data.message as string;
    }

    if (Array.isArray(data)) {
      return data.map((e) => e.description ?? e).join(' ');
    }

    if (data?.errors) {
      return Object.values(data.errors).flat().join(' ');
    }
  }

  return fallback;
}
