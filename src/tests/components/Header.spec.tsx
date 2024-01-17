import { Header } from "../../components/Header";
import { render, screen } from '@testing-library/react';

jest.mock('../../lib/customHooks');

describe('Header components', () => {
    it('renders correclty', () => {
        render(<Header />);

        expect(screen.getByText('Drago Tech')).toBeInTheDocument();
    });
})
