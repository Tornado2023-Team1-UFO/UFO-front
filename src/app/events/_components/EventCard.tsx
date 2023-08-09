'use client'
import Link from "next/link"
import Image from "next/image"
import styles from "@/app/events/events.module.css"
// this component is responsible for EventCard that will be displayed 
// in the event page
export default function EventCard (event: any) {
    // attendees will change
    console.log("event inside eventcard: " + JSON.stringify(event)); 
    const {title, date, attendees} = event; 
    console.log(title, date, attendees);
    return (
        <>
            <div className={styles.card}>
                <div className={styles.cardimage}>
                    <figure>
                        <Image
                         src="http://placekitten.com/300/300" 
                         alt="Placeholder image" 
                         width={300} 
                         height={300}
                         style={{
                            width: '100%',
                            height: '100%',
                         }}
                        />

                    </figure>
                </div>
                <div className={styles.cardcontent}>
                    <div>
                        <div>
                            <h1 className={styles.content}>{title}</h1>
                        </div>
                        <div>
                            <p className={styles.content}>{date}</p>
                            <p className={styles.content}>現在参加者: {attendees}人</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}