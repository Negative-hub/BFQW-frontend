/**
 * Утилитарные функции для валидации данных
 */

/**
 * Проверяет, является ли строка валидным email
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Проверяет, является ли строка валидным именем (только буквы, пробелы, дефисы)
 */
export function isValidName(name: string): boolean {
  const nameRegex = /^[a-zA-Zа-яА-Я\s\-]+$/;
  return nameRegex.test(name) && name.trim().length > 0;
}

/**
 * Проверяет, является ли строка валидным ID (положительное число)
 */
export function isValidId(id: string | number): boolean {
  const num = typeof id === 'string' ? parseInt(id, 10) : id;
  return !isNaN(num) && num > 0 && Number.isInteger(num);
}

/**
 * Проверяет, не пустая ли строка
 */
export function isNotEmpty(value: string): boolean {
  return value.trim().length > 0;
}

/**
 * Проверяет длину строки
 */
export function hasValidLength(value: string, min: number, max: number): boolean {
  return value.length >= min && value.length <= max;
}

/**
 * Валидирует объект модели
 */
export interface ModelData {
  name: string;
  description?: string;
}

export function validateModelData(data: ModelData): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!isNotEmpty(data.name)) {
    errors.push('Название модели не может быть пустым');
  }

  if (!hasValidLength(data.name, 1, 100)) {
    errors.push('Название модели должно быть от 1 до 100 символов');
  }

  if (data.description && !hasValidLength(data.description, 0, 500)) {
    errors.push('Описание модели не должно превышать 500 символов');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}