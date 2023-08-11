import styles from "@/app/events/[id]/eventdetails.module.css"
import { use, useEffect, useState } from "react";
import Image from "next/image";
// --- firebase --- 
import { db } from '@/libs/firebase'
import { collection, getDoc, doc, DocumentData } from 'firebase/firestore'; 

export default function EventInfo(data: any) {
    let userId: string = ""; 
    let imageURLs: string[] = [];
    const [loaded, setLoaded] = useState(false);
    const [userInfo, setUserInfo] = useState<DocumentData>();
    useEffect(() => {
        if (Object.keys(data).length !== 0 && data.constructor === Object) {
            setLoaded(true);
        }
    })
    useEffect(() => {
        if (loaded) {
            console.log(data);
            userId = data.userId._key?.path?.segments[6];
            console.log("userID: " + userId);
            data.imageUrls.map((url: string) => {
                imageURLs.push(url);
            });
            // contact firebase to get userInfo
            // currently userId is just a random number -> need get actual name and picture
            const fetchUserInfo = async () => {
                try {
                    const userDoc = await getDoc(doc(db, 'users', userId));
                    if (userDoc.exists()) {
                        const userData = userDoc.data();
                        setUserInfo(userData);
                        console.log("userinfo: " + JSON.stringify(userInfo));
                        // Now you can use 'eventData' to display your event details
                    } else {
                        console.log('User not found');
                    }
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            };
            fetchUserInfo();
        }
    }, [loaded]);
    console.log(loaded);
    if (!loaded) return <p>Loading...</p>
    return (
        <>
            <div className={styles.eventimage}>
                {/* <Image 
                    src={data.}
                /> */}
            </div>
            <div className={styles.eventinfo}>
                <div>
                    <h1>{data.title}</h1>
                </div>
                <div>
                    {/* {userInfo ? ( */}
                        <div>
                            <Image
                                src={userInfo?.photoURL}
                                alt="user photo"
                                width={50}
                                height={50}
                                /* style={{
                                    objectPosition: 'center',
                                }} */
                            />
                            <p>主催者名: {userInfo?.name}</p>
                        </div>
                    {/* ) : (
                        <div>Loading user information...</div>
                    )} */}
                </div>
                <div>
                    <p>開催日: {data.date}</p>
                </div>
                <div>
                    <p>人数: {data.recruitPeopleCounts}</p>
                </div>
            </div>
            <div>
                <p>イベント詳細: {data.outLine}</p>
            </div>
        </>
    );
}