import './ProductsListAccessor.css';
import { useDashRoute } from "../../dashStore";


const topCard=  [
    {
        label: "PRODUCTS",
        value: '23',
        url: '/src/res/package.png',
        path: ['store', 'products']
    },
    {
        label: "CATEGORIES",
        value: '15',
        url: '/src/res/application.png',
        path: ['store', 'categories']
    },
    {
        label: "CATALOGS",
        value: '4',
        url: '/src/res/catalog.png',
        path: ['store', 'catalogs']
    },
    {
        label: "FEATURES",
        value: '78',
        url: '/src/res/jigsaw.png',
        path: ['store', 'features']
    },
] as const 
export function ProductsListAccessor({active, setActive}:{active:typeof topCard[number]['label'], setActive:(active:typeof topCard[number])=>any}) {
    
    const {setAbsPath} = useDashRoute();

    return (
        <div className="products-list-accessor">
        {topCard.map((c, i) => (
            <div className={'top-card ' + (c.label == active ? 'active' : '')} key={i} onClick={() => {
                setActive(c);
            }} >
                <h1 className="label">{c.label}</h1>
                <h1 className="value">{c.value}</h1>
                <h1 className="icon" style={{ backgroundImage: `url(${c.url})` }}></h1>
            </div>
        ))}
    </div>
    )
}