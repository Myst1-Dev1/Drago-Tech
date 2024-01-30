
import { UserContext } from "../../services/hooks/useUser/useUser";
import { Header } from "../../components/Header";
import { render, screen } from '@testing-library/react';

jest.mock('@tanstack/react-query');
jest.mock('next/router', () => {
    return {
        useRouter() {
            return {
                asPath: '/'
            }
        }
    }
});

describe('Header components', () => {
    it('renders correclty', () => {
        const data = {
            name:'John doe'
        }

        const mockUserContext:any = {
            data:data,
            authenticated:false
        }

        render(
        <UserContext.Provider value={mockUserContext}>
            <Header />
        </UserContext.Provider>
    );

        expect(screen.getByText('Login')).toBeInTheDocument();
    });
})
