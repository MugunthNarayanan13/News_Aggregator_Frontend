/* eslint-disable @typescript-eslint/ban-ts-comment */
import { sendData } from '../utils/sendData';
import axios from 'axios';
import { toast } from 'react-toastify';

// Mock dependencies
jest.mock('axios');
jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn()
  }
}));

describe('sendData', () => {
  const BASE_BACKEND_URL = 'http://localhost:5000/NewsAgg/users';
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should make a GET request correctly', async () => {
    const mockResponse = { data: { message: 'Success' }, status: 200 };
    (axios.get as jest.Mock).mockResolvedValue(mockResponse);

    const result = await sendData('/profile', 'GET');

    expect(axios.get).toHaveBeenCalledWith(`${BASE_BACKEND_URL}/profile`);
    expect(toast.success).toHaveBeenCalledWith('Successful');
    expect(result).toEqual({ data: { message: 'Success' }, status: 200 });
  });

  it('should make a POST request correctly', async () => {
    const mockResponse = { data: { message: 'Created' }, status: 200 };
    const body = { name: 'John', email: 'john@example.com' };
    (axios.post as jest.Mock).mockResolvedValue(mockResponse);

    const result = await sendData('/register', 'POST', body);

    expect(axios.post).toHaveBeenCalledWith(`${BASE_BACKEND_URL}/register`, body);
    expect(toast.success).toHaveBeenCalledWith('Successful');
    expect(result).toEqual({ data: { message: 'Created' }, status: 200 });
  });

  it('should make a PUT request correctly', async () => {
    const mockResponse = { data: { message: 'Updated' }, status: 200 };
    const body = { name: 'John Updated' };
    (axios.put as jest.Mock).mockResolvedValue(mockResponse);

    const result = await sendData('/update', 'PUT', body);

    expect(axios.put).toHaveBeenCalledWith(`${BASE_BACKEND_URL}/update`, body);
    expect(toast.success).toHaveBeenCalledWith('Successful');
    expect(result).toEqual({ data: { message: 'Updated' }, status: 200 });
  });

  it('should make a DELETE request correctly', async () => {
    const mockResponse = { data: { message: 'Deleted' }, status: 200 };
    (axios.delete as jest.Mock).mockResolvedValue(mockResponse);

    const result = await sendData('/delete', 'DELETE');

    expect(axios.delete).toHaveBeenCalledWith(`${BASE_BACKEND_URL}/delete`);
    expect(toast.success).toHaveBeenCalledWith('Successful');
    expect(result).toEqual({ data: { message: 'Deleted' }, status: 200 });
  });

  it('should handle 400 error status', async () => {
    const mockResponse = { data: 'Bad Request', status: 400 };
    (axios.get as jest.Mock).mockResolvedValue(mockResponse);

    const result = await sendData('/error', 'GET');

    expect(toast.error).toHaveBeenCalledWith('Bad Request');
    expect(result).toEqual({ data: 'Bad Request', status: 400 });
  });

  it('should handle 500 error status', async () => {
    const mockResponse = { data: null, status: 500 };
    (axios.get as jest.Mock).mockResolvedValue(mockResponse);

    const result = await sendData('/server-error', 'GET');

    expect(toast.error).toHaveBeenCalledWith('Internal server error');
    expect(result).toEqual({ data: null, status: 500 });
  });

  it('should handle other error statuses', async () => {
    const mockResponse = { data: 'Unauthorized', status: 401 };
    (axios.get as jest.Mock).mockResolvedValue(mockResponse);

    const result = await sendData('/unauthorized', 'GET');

    expect(toast.error).toHaveBeenCalledWith('Unauthorized');
    expect(result).toEqual({ data: 'Unauthorized', status: 401 });
  });

  it('should handle Axios errors', async () => {
    // Create a proper Axios error with the structure expected by the function
    const axiosError = {
      isAxiosError: true,
      response: {
        data: {
          error: 'Network failure'
        }
      }
    };
    
    // Mock axios.isAxiosError to return true for our test error
    (axios.isAxiosError as unknown as jest.Mock) = jest.fn().mockReturnValue(true);
    (axios.get as jest.Mock).mockRejectedValue(axiosError);
    
    console.log = jest.fn();

    const result = await sendData('/network-error', 'GET');

    // Check that the error was properly identified as an Axios error
    expect(console.log).toHaveBeenCalledWith('Axios Error:', 'Network failure');
    expect(toast.error).toHaveBeenCalledWith('Network failure');
    expect(result).toEqual({ data: null, status: 500 });
  });

  it('should handle unexpected errors', async () => {
    const unexpectedError = new Error('Unexpected error');
    (axios.isAxiosError as unknown as jest.Mock) = jest.fn().mockReturnValue(false);
    (axios.get as jest.Mock).mockRejectedValue(unexpectedError);
    console.log = jest.fn();

    const result = await sendData('/unexpected-error', 'GET');

    expect(console.log).toHaveBeenCalledWith('Unexpected Error:', unexpectedError);
    expect(toast.error).toHaveBeenCalledWith('An unexpected error occurred!');
    expect(result).toEqual({ data: null, status: 500 });
  });

  it('should handle invalid method', async () => {
    console.log = jest.fn();
    
    // Instead of expecting a thrown error, we should check that it returns
    // the failure result, as the code wraps the error in a try/catch
    // @ts-ignore: Testing invalid method case
    const result = await sendData('/test', 'INVALID');
    
    expect(result).toEqual({ data: null, status: 500 });
    expect(toast.error).toHaveBeenCalledWith('An unexpected error occurred!');
  });
});