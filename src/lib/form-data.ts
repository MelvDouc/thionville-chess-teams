export function toObject<T extends Record<string, string>>(formData: FormData): T {
  return [...formData].reduce((acc, [key, value]) => {
    if (typeof value === "string")
      acc[key] = value;
    return acc;
  }, {} as Record<string, string>) as T;
}