import { isAxiosError } from "axios";
import type { ApiErrorResponse } from "../types/types";

export function getErrorMessage(error: unknown): string {
  if (isAxiosError<ApiErrorResponse>(error)) {
    const data = error.response?.data;

    if (data?.errors) {
      const firstError = Object.values(data.errors)[0]?.[0];
      if (firstError) return firstError;
    }

    if (data?.title) return data.title;
  }

  return "خطایی رخ داد. لطفاً دوباره تلاش کنید.";
}
