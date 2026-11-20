import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import React from 'react';

const JoinedEvents = async() => {

    const session = await auth.api.getSession({
        headers: await headers()
    })
    const user = session?.user

    const res = await fetch(`http://localhost:8000/joined-events/${user?.email}`)

    const joined = await res.json()

    console.log(joined);
    return (
        <div>
            JoinedEvents
        </div>
    );
};

export default JoinedEvents;