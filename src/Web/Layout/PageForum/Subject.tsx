import './Subject.css';
import { useWebRoute, useWebStore } from "../../WebStore";
import { useEffect, useState } from 'react';

import { subjects } from "./PageForum";
export function Subject() {
    const { current, json } = useWebRoute();
    const [subject, setSubject] = useState<(typeof subjects)['list'][number] | undefined>();
    // const {} = useWebStore()
    useEffect(() => {
        console.log(json,json?.subject_id,subjects.list[json?.subject_id]);
        
        setSubject(subjects.list[json?.subject_id]);
    }, [json])
    return current('subject') && <div className="page-subject">
        {
            JSON.stringify(subject)
        }
    </div>
}