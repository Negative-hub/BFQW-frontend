import { toast } from 'react-toastify';
import showToast, { IToastParams } from '../showToast';

// Мокаем react-toastify
jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    warning: jest.fn(),
    error: jest.fn(),
  },
}));

describe('showToast', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('должен вызывать toast.success с правильными параметрами', () => {
    const params: IToastParams = {
      type: 'success',
      message: 'Операция выполнена успешно',
    };

    showToast(params);

    expect(toast.success).toHaveBeenCalledWith('Операция выполнена успешно', {
      autoClose: 2000,
    });
    expect(toast.success).toHaveBeenCalledTimes(1);
  });

  it('должен вызывать toast.warning с правильными параметрами', () => {
    const params: IToastParams = {
      type: 'warning',
      message: 'Предупреждение о важном действии',
    };

    showToast(params);

    expect(toast.warning).toHaveBeenCalledWith('Предупреждение о важном действии', {
      autoClose: 2000,
    });
    expect(toast.warning).toHaveBeenCalledTimes(1);
  });

  it('должен вызывать toast.error с правильными параметрами', () => {
    const params: IToastParams = {
      type: 'error',
      message: 'Произошла ошибка',
    };

    showToast(params);

    expect(toast.error).toHaveBeenCalledWith('Произошла ошибка', {
      autoClose: 2000,
    });
    expect(toast.error).toHaveBeenCalledTimes(1);
  });

  it('не должен вызывать другие типы toast', () => {
    const params: IToastParams = {
      type: 'success',
      message: 'Тестовое сообщение',
    };

    showToast(params);

    expect(toast.warning).not.toHaveBeenCalled();
    expect(toast.error).not.toHaveBeenCalled();
  });
});