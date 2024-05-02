import './UsersListAccessor.css';
import { useDashRoute, useDashStore } from "../../dashStore";


const topCard=  [
    {
        label: "clients",
        value: '23',
        url: '/src/res/package.png',
        path: ['user', 'clients']
    },
    {
        label: "collaborators",
        value: '15',
        url: '/src/res/application.png',
        path: ['user', 'collaborators']
    },
    {
        label: "roles",
        value: '4',
        url: '/src/res/catalog.png',
        path: ['user', 'roles']
    },

] as const 
export function UsersListAccessor({active, setActive}:{active:typeof topCard[number]['label'], setActive:(active:typeof topCard[number])=>any}) {
    const {storeVar} = useDashStore();
    return (
        <div className="users-list-accessor">
        {topCard.map((c, i) => (
            <div className={'top-card ' + (c.label == active ? 'active' : '')} key={i} onClick={() => {
                setActive(c);
            }} >
                <h2 className="label">{c.label.toUpperCase()}</h2>
                
                <h2 className="value">{
                    //@ts-ignore
                 topCard?.[c.label]
                }</h2>
                <h2 className="icon" style={{ backgroundImage: `url(${c.url})` }}></h2>
            </div>
        ))}
    </div>
    )
}