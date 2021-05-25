import { render, screen } from '@testing-library/react';
import Footer from '../Footer';

test('Render footer on page', () => {
    render(<Footer />);
    const footer = screen.getByTestId('footer');
    expect(footer).toBeInTheDocument();
});
