import { toast } from 'react-toastify';
import { isAxiosError } from 'axios';
import showErrorToast from '../showErrorToast';


// Мокаем react-toastify
jest.mock('react-toastify', () => ({
  toast: {
    error: jest.fn(),
  },
}));

// Мокаем axios
jest.mock('axios', () => ({
  isAxiosError: jest.fn(),
}));

describe('showErrorToast', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('должен показать "Неизвестная ошибка" для не-Axios ошибок', () => {
    (isAxiosError as jest.Mock).mockReturnValue(false);
    const error = new Error('Обычная ошибка');

    showErrorToast(error);

    expect(toast.error).toHaveBeenCalledWith('Неизвестная ошибка');
    expect(toast.error).toHaveBeenCalledTimes(1);
  });

  // it('должен показать "Ошибка в API запросе" для Axios ошибок без response', () => {
  //   (isAxiosError as jest.Mock).mockReturnValue(true);
  //   const error = new AxiosError('Network Error');

  //   showErrorToast(error);

  //   expect(toast.error).toHaveBeenCalledWith('Ошибка в API запросе');
  //   expect(toast.error).toHaveBeenCalledTimes(1);
  // });

  // it('должен показать сообщение из ErrorResponse для Axios ошибок с response', () => {
  //   (isAxiosError as jest.Mock).mockReturnValue(true);
  //   const errorResponse: ErrorResponse = {
  //     status: 400,
  //     message: 'Пользователь не найден',
  //   };

  //   const error = new AxiosError('Bad Request', '400', undefined, undefined, {
  //     data: errorResponse,
  //     status: 400,
  //     statusText: 'Bad Request',
  //     headers: {},
  //     config: {} as any,
  //   });

  //   showErrorToast(error);

  //   expect(toast.error).toHaveBeenCalledWith('Пользователь не найден', {
  //     autoClose: 2000,
  //   });
  //   expect(toast.error).toHaveBeenCalledTimes(1);
  // });

  it('должен обработать null/undefined error', () => {
    (isAxiosError as jest.Mock).mockReturnValue(false);

    showErrorToast(null);

    expect(toast.error).toHaveBeenCalledWith('Неизвестная ошибка');
    expect(toast.error).toHaveBeenCalledTimes(1);
  });

  it('должен обработать строковую ошибку', () => {
    (isAxiosError as jest.Mock).mockReturnValue(false);

    showErrorToast('Произошла ошибка');

    expect(toast.error).toHaveBeenCalledWith('Неизвестная ошибка');
    expect(toast.error).toHaveBeenCalledTimes(1);
  });
});