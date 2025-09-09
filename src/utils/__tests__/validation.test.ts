import {
  isValidEmail,
  isValidName,
  isValidId,
  isNotEmpty,
  hasValidLength,
  validateModelData,
  ModelData,
} from '../validation';

describe('validation utilities', () => {
  describe('isValidEmail', () => {
    it('должен возвращать true для валидных email адресов', () => {
      expect(isValidEmail('test@example.com')).toBe(true);
      expect(isValidEmail('user.name@domain.co.uk')).toBe(true);
      expect(isValidEmail('user+tag@example.org')).toBe(true);
    });

    it('должен возвращать false для невалидных email адресов', () => {
      expect(isValidEmail('invalid-email')).toBe(false);
      expect(isValidEmail('test@')).toBe(false);
      expect(isValidEmail('@example.com')).toBe(false);
      expect(isValidEmail('test.example.com')).toBe(false);
      expect(isValidEmail('')).toBe(false);
    });
  });

  describe('isValidName', () => {
    it('должен возвращать true для валидных имен', () => {
      expect(isValidName('Иван Петров')).toBe(true);
      expect(isValidName('John Doe')).toBe(true);
      expect(isValidName('Мария-Анна')).toBe(true);
      expect(isValidName('Александр')).toBe(true);
    });

    it('должен возвращать false для невалидных имен', () => {
      expect(isValidName('123')).toBe(false);
      expect(isValidName('Иван123')).toBe(false);
      expect(isValidName('')).toBe(false);
      expect(isValidName('   ')).toBe(false);
      expect(isValidName('Иван@Петров')).toBe(false);
    });
  });

  describe('isValidId', () => {
    it('должен возвращать true для валидных ID', () => {
      expect(isValidId(1)).toBe(true);
      expect(isValidId(100)).toBe(true);
      expect(isValidId('1')).toBe(true);
      expect(isValidId('999')).toBe(true);
    });

    it('должен возвращать false для невалидных ID', () => {
      expect(isValidId(0)).toBe(false);
      expect(isValidId(-1)).toBe(false);
      expect(isValidId('0')).toBe(false);
      expect(isValidId('-5')).toBe(false);
      expect(isValidId('abc')).toBe(false);
      expect(isValidId(1.5)).toBe(false);
    });
  });

  describe('isNotEmpty', () => {
    it('должен возвращать true для непустых строк', () => {
      expect(isNotEmpty('test')).toBe(true);
      expect(isNotEmpty('  test  ')).toBe(true);
      expect(isNotEmpty('a')).toBe(true);
    });

    it('должен возвращать false для пустых строк', () => {
      expect(isNotEmpty('')).toBe(false);
      expect(isNotEmpty('   ')).toBe(false);
      expect(isNotEmpty('\t\n')).toBe(false);
    });
  });

  describe('hasValidLength', () => {
    it('должен возвращать true для строк с валидной длиной', () => {
      expect(hasValidLength('test', 1, 10)).toBe(true);
      expect(hasValidLength('a', 1, 1)).toBe(true);
      expect(hasValidLength('hello world', 5, 15)).toBe(true);
    });

    it('должен возвращать false для строк с невалидной длиной', () => {
      expect(hasValidLength('test', 5, 10)).toBe(false);
      expect(hasValidLength('test', 1, 3)).toBe(false);
      expect(hasValidLength('', 1, 10)).toBe(false);
    });
  });

  describe('validateModelData', () => {
    it('должен возвращать валидный результат для корректных данных', () => {
      const validData: ModelData = {
        name: 'Тестовая модель',
        description: 'Описание модели',
      };

      const result = validateModelData(validData);

      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('должен возвращать ошибки для пустого названия', () => {
      const invalidData: ModelData = {
        name: '',
        description: 'Описание модели',
      };

      const result = validateModelData(invalidData);

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Название модели не может быть пустым');
    });

    it('должен возвращать ошибки для слишком длинного названия', () => {
      const invalidData: ModelData = {
        name: 'a'.repeat(101),
        description: 'Описание модели',
      };

      const result = validateModelData(invalidData);

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Название модели должно быть от 1 до 100 символов');
    });

    it('должен возвращать ошибки для слишком длинного описания', () => {
      const invalidData: ModelData = {
        name: 'Тестовая модель',
        description: 'a'.repeat(501),
      };

      const result = validateModelData(invalidData);

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Описание модели не должно превышать 500 символов');
    });

    it('должен возвращать несколько ошибок одновременно', () => {
      const invalidData: ModelData = {
        name: '',
        description: 'a'.repeat(501),
      };

      const result = validateModelData(invalidData);

      expect(result.isValid).toBe(false);
      expect(result.errors).toHaveLength(3);
      expect(result.errors).toContain('Название модели не может быть пустым');
      expect(result.errors).toContain('Описание модели не должно превышать 500 символов');
    });

    it('должен работать без описания', () => {
      const validData: ModelData = {
        name: 'Тестовая модель',
      };

      const result = validateModelData(validData);

      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });
  });
});