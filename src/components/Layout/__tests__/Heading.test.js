import { render, screen, waitFor } from '@testing-library/react';
import Heading from '../Heading';

import { MemoryRouter } from 'react-router-dom';

test('Heading is rendered on screen', () => {
    render(<Heading />, { wrapper: MemoryRouter });
    const heading = screen.getByTestId('heading');
    expect(heading).toBeInTheDocument();
});
