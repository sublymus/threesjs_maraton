import './ProductsListAccessor.css';
import { useDashStore } from "../../dashStore";


const topCard=  [
    {
        label: "products",
        value: '23',
        url: '/src/res/package.png',
        path: ['products']
    },
    {
        label: "categories",
        value: '15',
        url: '/src/res/application.png',
        path: ['categories']
    },
    {
        label: "catalogs",
        value: '4',
        url: '/src/res/catalog.png',
        path: ['catalogs']
    },
    {
        label: "features",
        value: '78',
        url: '/src/res/jigsaw.png',
        path: ['features']
    },
] as const 
export function ProductsListAccessor({active, setActive}:{active:typeof topCard[number]['label'], setActive:(active:typeof topCard[number])=>any}) {
    const {storeVar} = useDashStore();
    return (
        <div className="products-list-accessor">
        {topCard.map((c, i) => (
            <div className={'top-card ' + (c.label == active ? 'active' : '')} key={i} onClick={() => {
                setActive(c);
            }} >
                <h2 className="label">{c.label.toUpperCase()}</h2>
                
                <h2 className="value">{
                 storeVar?.[c.label]
                }</h2>
                <h2 className="icon" style={{ backgroundImage: `url(${c.url})` }}></h2>
            </div>
        ))}
    </div>
    )
}