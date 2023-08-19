// code referenced from:
// https://github.com/clerkinc/clerk-nextjs-examples/blob/main/examples/widget/pages/api/webhooks/user.ts
// https://docs.svix.com/receiving/verifying-payloads/how#nodejs-nextjs
import { NextResponse } from 'next/server'
import { IncomingHttpHeaders } from 'http'
import { Webhook, WebhookRequiredHeaders } from 'svix'

import upsert from './upsert'
import deleteUser from './deleteUser'

const webhookSecret: string = process.env.WEBHOOK_SECRET || ''

export async function POST(req: any) {
  console.log('handler called')
  // Verify the webhook signature
  // See https://docs.svix.com/receiving/verifying-payloads/how
  // const payload = await req.json();
  const body = await req.text()
  // console.log(payloadString);
  const headers = req.headers
  const heads = {
    'svix-id': headers.get('svix-id') || '',
    'svix-timestamp': headers.get('svix-timestamp') || '',
    'svix-signature': headers.get('svix-signature') || '',
  }
  console.log(heads)
  const wh = new Webhook(webhookSecret)

  let evt: Event | null = null
  try {
    console.log('about to verify')
    evt = wh.verify(body, heads as IncomingHttpHeaders & WebhookRequiredHeaders) as Event
  } catch (_) {
    console.log('Error')
    return NextResponse.json({ message: 'invalied webhook signature', status: 201 })
  }
  // Handle the webhook
  const eventType: EventType = evt.type
  console.log(eventType)
  if (eventType === 'user.created' || eventType === 'user.updated') {
    const { id, ...attributes } = evt.data
    console.log('id is ' + id)
    try {
      await upsert(id as string, attributes)
    } catch (err) {
      return NextResponse.json({ message: 'Error inside upsert', status: 201 })
    }
    return NextResponse.json({ message: 'Handled successfully' }, { status: 200 })
  } else if (eventType === 'user.deleted') {
    const { id, ...attributes } = evt.data
    console.log('id to delete is ' + id)
    try {
      await deleteUser(id as string)
    } catch (err) {
      return NextResponse.json({ message: 'Error inside deleteUser', status: 201 })
    }
    return NextResponse.json({ message: 'Successfully deleted user' }, { status: 200 })
  }
}

// type NextApiRequestWithSvixRequiredHeaders = NextApiRequest & {
//   headers: IncomingHttpHeaders & WebhookRequiredHeaders
// }

// Generic (and naive) way for the Clerk event
// payload type.
type Event = {
  data: Record<string, string | number>
  object: 'event'
  type: EventType
}

type EventType = 'user.created' | 'user.updated' | 'user.deleted' | '*'
