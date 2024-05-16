import { useState } from 'react';
import { SearchUser } from '../../../../Component/SearchUser/SearchUser';
import { useDashStore } from '../../../../dashStore'
import './SessionNav.css'
import { useSessionStore } from '../SessionStore';
import { useMessageStore } from '../../MessageStore';
import { getImg } from '../../../../../Tools/StringFormater';

export function SessionNav({ }: {}) {
    const [optionActive, setOptionActive] = useState('open')
    const { openChild } = useDashStore();
    const {
        addSession,
        asReadSession,
        closeSession,
        deleteSession,
        fetchCreateSession,
        fetchSessions,
        setSession,
        session,
        sessions,
        openSessionMessages
    } = useSessionStore();
    const opens = []
    const closeds = []
    const news = []

    const ss = sessions;
    return (
        <div className="session-nav">
            <div className="title">
                <div className="label">Sessions </div>
                <div className="add-new" onClick={() => {
                    openChild(<SearchUser setUser={(_collabo) => {

                    }} />, true, '#0002')
                }}> <span></span></div>
            </div>
            <div className="options">
                <div className="option" onClick={() => {
                    setOptionActive('open')
                }}><div className={(optionActive == 'open' ? 'active' : '')}>Open{(opens?.length || 0) > 0 ? <span></span> : undefined}</div></div>
                <div className="option" onClick={() => {
                    setOptionActive('closed')
                }}><div className={optionActive == 'closed' ? 'active' : ''}>Closed {(closeds?.length || 0) > 0 ? <span></span> : undefined}</div></div>
                <div className="option" onClick={() => {
                    setOptionActive('new')
                }}><div className={optionActive == 'new' ? 'active' : ''}>New  {(news?.length || 0) > 0 ? <span></span> : undefined}</div></div>
            </div>
            <div className="search">
                <div className="input">
                    <div className="icon"></div>
                    <input type="text" placeholder='Search' />
                </div>
            </div>
            <div className="sessions">
                {
                    ss?.map((s) => {

                        return (
                            <div key={s.id} className={"session " + (session?.id == s.id ? 'active' : '')} onClick={(e) => {
                                setSession(s);

                                openSessionMessages(s.id);
                                const div = e.currentTarget.querySelector('.count')! as HTMLDivElement;
                                div.style.display = 'none';

                            }} onContextMenu={(e) => {
                                e.preventDefault();

                            }} >
                                lol
                            </div>
                        )
                    })

                }
            </div>
        </div>
    )
}