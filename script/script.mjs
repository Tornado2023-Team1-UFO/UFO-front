// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore, getDoc, doc, addDoc, collection } from 'firebase/firestore'
import { fakerJA as faker } from '@faker-js/faker'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAql0izmTkB6V713uPWOa3GscKLlBSdCVI',
  authDomain: 'tonade-ufo-dev.firebaseapp.com',
  projectId: 'tonade-ufo-dev',
  storageBucket: 'tonade-ufo-dev.appspot.com',
  messagingSenderId: '58913588724',
  appId: '1:58913588724:web:2e9c2acfb937d5ffd825a1',
  measurementId: 'G-4PBYZ26CLH',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
let eventCategories = [
  '人気上昇中のイベント',
  '夏の成長体験',
  '仲間とハジける',
  'インドアなヲタク集合 !',
  '新しい自分に出会う',
]
let myUserId = 'xGZV4iiPDaZSVJnhWUmpJrntqj43'
const getUserId = async () => {
  const docRef = doc(db, 'users', myUserId)
  return docRef.id
}
async function generateRandomEvent() {
  let id = await getUserId()
  const startAt = faker.date.future()
  let randomCategory = eventCategories[Math.floor(Math.random() * eventCategories.length)]
  return {
    category: randomCategory,
    content: faker.lorem.paragraph(),
    deadLine: faker.date.future(),
    endAt: faker.date.future({ refDate: startAt }),
    deadLine: faker.date.future(),
    eventFee: faker.number.int({ min: 0, max: 3000 }),
    imageUrls: Array.from({ length: faker.number.int({ min: 1, max: 3 }) }, () => faker.image.url()),
    likeCounts: faker.number.int({ min: 0, max: 1000 }),
    prefecture: faker.location.state(),
    recruitPeopleCounts: faker.number.int({ min: 1, max: 50 }),
    startAt: startAt,
    status: 1,
    title: faker.lorem.words(1),
    updatedAt: faker.date.recent(),
    userId: id,
  }
}
const addEventToFireBase = async () => {
  // Add a new document in collection "events"
  let newEvent = await generateRandomEvent()
  // Add a new document with a generated id.
  const docRef = await addDoc(collection(db, 'events'), newEvent)
  console.log('Document written with ID: ', docRef.id)
  // console.log(docRef);
}

function main() {
  for (let i = 0; i < 10; i++) {
    addEventToFireBase()
  }
}

// run main function
main()
