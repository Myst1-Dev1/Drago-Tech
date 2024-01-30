import { useContext, useState, createContext, ReactNode } from "react";

interface PaginationContextData {
    renderPaginationButtons:any;
    startIndex:number;
    endIndex:number;
    handlePreviousPage:() => void;
    handleNextPage:(data:[] | any) => void;
}

interface PaginationProviderProps {
    children: ReactNode;
}

export const PaginationContext = createContext(
    {} as PaginationContextData
);

export function PaginationProvider({children}:PaginationProviderProps) {
    const [currentPage, setCurrentPage] = useState(0);

    const itensPerPage = 6;
    const startIndex = currentPage * itensPerPage;
    const endIndex = startIndex + itensPerPage;

    function renderPaginationButtons(data:[] | any) {
        const totalPages = Math.ceil(data?.length / itensPerPage); 
        const buttons = [];
    
        for(let i = 0; i < totalPages; i++) {
            if (i === 0 || i === totalPages - 1 || (i >= currentPage - 1 && i <= currentPage + 1)) {
                buttons.push(
                    <button key={i} onClick={() => setCurrentPage(i)}>
                        {i + 1}
                    </button>
                );
            } else if (buttons[buttons.length - 1] !== '...') {
                buttons.push('...');
            }
        }
    
        return buttons;
    };
    

     function handlePreviousPage() {
        setCurrentPage(currentPage - 1);
        if(currentPage === 0) {
            setCurrentPage(currentPage);
        }
    };

     function handleNextPage(data:[] | any) {
        const totalPages = Math.ceil(data.length / itensPerPage);

        setCurrentPage(currentPage + 1);
        if(currentPage === Array(totalPages).length - 1) {
            setCurrentPage(currentPage);
        }
    }

    return (
        <PaginationContext.Provider value={{startIndex, 
            endIndex, 
            renderPaginationButtons,
            handlePreviousPage,
            handleNextPage
            }}>
            {children}
        </PaginationContext.Provider>
    )
}

export function usePagination() {
    const context = useContext(PaginationContext);

    return context;
}