import './UsersListAccessor.css';
import { useDashRoute, useDashStore } from "../../dashStore";


const topCard=  [
    {
        label: "clients",
        value: '23',
        url: '/src/res/multiple-users-silhouette.png',
        path: [ 'clients']
    },
    {
        label: "collaborators",
        value: '15',
        url: '/src/res/leadership.png',
        path: [ 'collaborators']
    },
    {
        label: "roles",
        value: '4',
        url: '/src/res/settings.png',
        path: [ 'roles']
    },

] as const 
export function UsersListAccessor({active, setActive}:{active:typeof topCard[number]['label'], setActive:(active:typeof topCard[number])=>any}) {
    const {usersVar} = useDashStore();
    
    return (
        <div className="users-list-accessor">
        {topCard.map((c, i) => (
            <div className={'top-card ' + (c.label == active ? 'active' : '')} key={i} onClick={() => {
                setActive(c);
            }} >
                <h2 className="label">{c.label.toUpperCase()}</h2>
                
                <h2 className="value">{
                    //@ts-ignore
                 usersVar?.[c.label]
                }</h2>
                <h2 className="icon" style={{ backgroundImage: `url(${c.url})` }}></h2>
            </div>
        ))}
    </div>
    )
}