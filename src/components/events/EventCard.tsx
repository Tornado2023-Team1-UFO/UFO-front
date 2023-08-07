import Link from "next/link"


// this component is responsible for EventCard that will be displayed 
// in the event page
export default function EventCard (props: any) {
    const {title, date, attendees} = props; 
    return (
        <>
            <div className="card">
                <div className="card-image">
                    <figure>
                        <img src="" alt="" />
                    </figure>
                </div>
                <div className="card-content">
                    <div className="content">
                        <div>
                            <h1>{title}</h1>
                        </div>
                        <div>
                            <p>{date}</p>
                            <p>{attendees}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}