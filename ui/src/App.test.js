import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

describe('Commission Calculator UI Validation Tests', () => {

  // Test 1: Check that the form renders with the correct title
  test('renders the main title', () => {
    render(<App />);
    const title = screen.getByText(/commission calculator/i);
    expect(title).toBeInTheDocument();
  });

  // Test 2: Show validation messages when all fields are empty and user submits
  test('shows validation messages when fields are empty', async () => {
    render(<App />);
    const button = screen.getByRole('button', { name: /calculate commission/i });

    fireEvent.click(button);

    // Wait for validation messages to appear
    const messages = await screen.findAllByText(/required field/i);
    expect(messages.length).toBeGreaterThan(0);
  });

  // Test 3: Show validation errors for zero or negative numbers
  test('shows validation error for zero or negative values', async () => {
    render(<App />);

    fireEvent.change(screen.getByLabelText(/local sales count/i), {
      target: { value: -5 },
    });
    fireEvent.change(screen.getByLabelText(/foreign sales count/i), {
      target: { value: 0 },
    });
    fireEvent.change(screen.getByLabelText(/average sale amount/i), {
      target: { value: 0 },
    });

    fireEvent.click(screen.getByRole('button', { name: /calculate commission/i }));

    expect(await screen.findByText(/must be a valid positive number/i)).toBeInTheDocument();
    expect(await screen.findByText(/must be greater than 0/i)).toBeInTheDocument();
  });

  // Test 4: Ensure validation errors are removed when valid input is entered
  test('removes validation errors after entering valid input', async () => {
    render(<App />);

    fireEvent.change(screen.getByLabelText(/local sales count/i), {
      target: { value: 10 },
    });
    fireEvent.change(screen.getByLabelText(/foreign sales count/i), {
      target: { value: 5 },
    });
    fireEvent.change(screen.getByLabelText(/average sale amount/i), {
      target: { value: 1000 },
    });

    fireEvent.click(screen.getByRole('button', { name: /calculate commission/i }));

    // Wait for any validation messages to disappear
    await waitFor(() => {
      expect(screen.queryByText(/required field/i)).toBeNull();
      expect(screen.queryByText(/must be/i)).toBeNull();
    });
  });
  
});
