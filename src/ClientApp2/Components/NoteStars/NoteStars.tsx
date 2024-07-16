import './NoteStars.css'

export function NoteStars({note}:{note:number}) {
    
    return  <div className="note-stars">
    <div className={"icon first " + (note >= 1 ? 'full' : note <= 0 ? 'vide' : 'half')}></div>
    <div className={"icon " + (note >= 2 ? 'full' : note <= 1 ? 'vide' : 'half')}></div>
    <div className={"icon " + (note >= 3 ? 'full' : note <= 2 ? 'vide' : 'half')}></div>
    <div className={"icon " + (note >= 4 ? 'full' : note <= 3 ? 'vide' : 'half')}></div>
    <div className={"icon " + (note >= 5 ? 'full' : note <= 4 ? 'vide' : 'half')}></div>
</div>
}