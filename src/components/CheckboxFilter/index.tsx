import { useState } from 'react';
import { Products } from '../../types/Products';

interface CheckboxFilterProps {
    onProducts:Products[];
    onSetFilteredProducts:any;
}

export function CheckboxFilter({ onProducts, onSetFilteredProducts } :CheckboxFilterProps) {
    const [checkedTypes, setCheckedTypes] = useState<[] | any>([]);

    const categories = [
        { id: 'keyboard-category', value: 'Keyboard', label: 'Teclado' },
        { id: 'mouse-category', value: 'mouse', label: 'Mouse' },
        { id: 'monitor-category', value: 'Monitor', label: 'Monitor' },
        { id: 'mousePad-Category', value: 'mousePad', label: 'MousePad' },
        { id: 'notebook-category', value: 'notebook', label: 'Notebook' },
        { id: 'tv-category', value: 'tv', label: 'TV' },
        { id: 'phone-category', value: 'cell phone', label: 'Celular' },
        { id: 'camera-category', value: 'câmera', label: 'Câmera' },
        { id: 'eletrodomestic-category', value: 'household appliance', label: 'Eletrodoméstico' },
        { id: 'hardware-category', value: 'Hardware', label: 'Hardware' },
    ];

    function filterByType(checkedTypes: string[]) {
        let typeFiltered;
    
        if (checkedTypes.length === 0) {
            // Se nenhum checkbox estiver marcado, mostre todos os produtos
            typeFiltered = onProducts;
        } else {
            // Caso contrário, filtre com base nos tipos marcados
            typeFiltered = onProducts.filter((product) => checkedTypes.includes(product.node.type));
        }
    
        onSetFilteredProducts(typeFiltered);
    }

    function handleCheckboxChange(type: string) {
        let updatedTypes;
    
        if (checkedTypes.includes(type)) {
            // Desmarcar o checkbox
            updatedTypes = checkedTypes.filter((item:any) => item !== type);
        } else {
            // Marcar o checkbox
            updatedTypes = [...checkedTypes, type];
        }
    
        // Atualize o estado apenas após a chamada de filterByType
        filterByType(updatedTypes);
        setCheckedTypes(updatedTypes);
    }

    return (
        <>
            <div className='mt-4'>
                <h5 className='fw-bold'>Categorias</h5>
                {categories.map((category) => (
                    <div className='d-flex gap-3 mt-3' key={category.value}>
                        <input
                            type="checkbox"
                            id={category.id}
                            value={category.value}
                            onChange={(e) => handleCheckboxChange(e.target.value)}
                            checked={checkedTypes.includes(category.value)}
                        />
                        <label htmlFor={category.id}>{category.label}</label>
                    </div>
                ))}
            </div>
        </>
    )
}