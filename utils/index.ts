export const formatErrorMessage = (error: unknown): string => {
  if (typeof error === "string") {
    return error;
  } else if (error instanceof Error) {
    return error.message;
  }

  return "unknown error";
};
