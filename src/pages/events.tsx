// This is a page that displays a list events
// imports from 'react'
import useEffect from 'react';
import useState from 'react'; 
// import components 
import PageDetails from '@/components/PageDetails';
import EventCard from '@/components/events/EventCard';

// import Header from '../components/Header';

function Events() {
    // const [events, setEvents] = useState([]) // [state, setState]

    // Get events from database using useEffect
    // useEffect(() => {
    // }
    let eventData = [{
        id: 1,
        title: "Event 1",
    }, 
    {
        id: 2, 
        title: "Event 2",
    }]

    return ( 
        <>
            <PageDetails
                title="イベント一覧"
                description="イベント一覧ページです。"
            />
            {/* <Header></Header> */}
            <h1>This is a events page</h1>
            <h1>人気上昇中のイベント</h1>
            <div>
                {/* only show if there's data  */}
                {eventData && 
                eventData.map((item) => (<EventCard key={item.id} event={item.title} />))}
                {eventData && eventData.length === 0 && <p>There are no events</p>}
            </div>
        </>
    )
}
export default Events; 