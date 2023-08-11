// This is a page that displays a list events
// imports from 'react'
'use client'
import { useEffect, useState } from 'react';
import Link from 'next/link';
// import components 
import PageDetails from '@/components/PageDetails';
import EventCard from '@/app/events/_components/EventCard';
// import Header from '../components/Header';
import styles from "@/app/events/events.module.css"

function Events() {
    const [events, setEvents] = useState([]) // [state, setState]
    const [eventCategories, setEventCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [occasions, setOccasions] = useState([]);
    const [selectedOccasion, setSelectedOccasion] = useState("All");
    // Get events from database using useEffect
    // useEffect(() => {
    // }
    let eventData = [{
        id: 1,
        title: "Event 1",
        date: "2021-10-10",
        attendees: 100, 
    }, 
    {
        id: 2, 
        title: "Event 2",
        date: "2021-10-10",
        attendees: 100, 
    }, 
    {           
        id: 3,
        title: "Event 3",
        date: "2021-10-10",
        attendees: 100, 
    },
    {
        id: 4,
        title: "Event 4",
        date: "2021-10-10",
        attendees: 100,
    }, 
    {
        id: 5,
        title: "Event 5",
        date: "2021-10-10",
        attendees: 100,
    }, 
    {
        id: 6,
        title: "Event 6",
        date: "2021-10-10",
        attendees: 100,
    }

    ]
    let searchCategories: string[] = ["All Category", "Music", "Sports", "Food", "Art", "Business", "Other"]; 

    // handClick function when clicked on "もっと見る"
    // if clicked on "もっと見る", then it will jump to the "tinder" style swiping page
    const handleClick = () => {
        alert("clicked");
    }
    return ( 
        <>
            <PageDetails
                title="イベント一覧"
                description="イベント一覧ページです。"
            />
            <div className='container'>
                <h1>This is a events page</h1>
                {/* <Header></Header> */}
                {/* --- Search Bar --- */}
                <div className={styles.searchbar}>
                    <div className={styles.searchbytext}>
                        <input type="text" placeholder="Search" />
                        <button>検索</button>
                    </div>
                    <div className={styles.searchothers}>
                        <div className={styles.searchotherschild}>
                            <select name="category" onChange={() => alert("category changed")}>
                                {searchCategories.map((item) => (
                                <option value={item}>{item}</option>)) 
                                }
                            </select>
                        </div>
                        <div className={styles.searchotherschild}>
                            <select name="location" onChange={() => alert("category changed")}>
                                {searchCategories.map((item) => (
                                    <option value={item}>{item}</option>))
                                }
                            </select>
                        </div>
                    </div>
                </div>
                <div className="eventcontainer">
                    <div className={styles.categoryheadline}>
                        <h1>人気上昇中のイベント</h1>
                        <p onClick={handleClick}>もっと見る {">"}</p>
                    </div>
                    
                    <div className={styles.cardcontainer}>
                        {/* only show if there's data  */}
                        {eventData &&
                            eventData.map((item) =>
                                (<EventCard title={item.title} date={item.date} attendees={item.attendees} />))}
                        {eventData && eventData.length === 0 && <p>There are no events</p>}
                    </div>
                </div>
                {
                    searchCategories.map((category) => (
                    <div className="eventcontainer">
                        <h1>{category}</h1>
                        <h2>もっと見る</h2>
                        <div className={styles.cardcontainer}>
                            {/* only show if there's data  */}
                            {eventData &&
                                eventData.map((item) =>
                                    (<EventCard title={item.title} date={item.date} attendees={item.attendees} />))}
                            {eventData && eventData.length === 0 && <p>There are no events</p>}
                        </div>
                    </div>
                    ))
                }
            </div>
        </>
    )
}
export default Events; 