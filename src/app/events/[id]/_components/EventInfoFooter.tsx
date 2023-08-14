import { FaHeart } from "react-icons/fa6";
import styles from "./eventInfoFooter.module.css"
import Link from "next/link";


export default function EventInfoFooter(props: any) {
    return (
        <>  
            <div className={styles.footerContainer}>
                <div>
                    <FaHeart />
                    <p>{props.likeCounts}</p>
                </div>
                <div className={styles.buttonContainer}>
                    <button>
                        <Link href="/">参加する</Link>
                    </button>
                </div>
                <div className={styles.buttonContainer}>
                    <button>応援する</button>
                </div>
                
            </div>
        </>
    )
}