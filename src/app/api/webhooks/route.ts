// code referenced from:
// https://github.com/clerkinc/clerk-nextjs-examples/blob/main/examples/widget/pages/api/webhooks/user.ts
// https://docs.svix.com/receiving/verifying-payloads/how#nodejs-nextjs

import { IncomingHttpHeaders } from 'http'
import type { NextApiRequest, NextApiResponse } from 'next'
import { Webhook, WebhookRequiredHeaders } from 'svix'
import { buffer } from 'micro'
import upsert from './upsert'
import { NextResponse } from 'next/server'

// Disable the bodyParser so we can access the raw
// request body for verification.
// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };
const webhookSecret: string = process.env.WEBHOOK_SECRET || ''

export async function POST(
  req: NextApiRequestWithSvixRequiredHeaders,
  // res: NextApiResponse
) {
  console.log('handler called')
  console.log(req)
  // Verify the webhook signature
  // See https://docs.svix.com/receiving/verifying-payloads/how
  const payload = (await buffer(req)).toString()
  const headers = req.headers
  const wh = new Webhook(webhookSecret)
  let evt: Event | null = null
  try {
    evt = wh.verify(payload, headers) as Event
  } catch (e) {
    return NextResponse.json({ message: 'invalied webhook signature' })
  }
  // Handle the webhook
  const eventType: EventType = evt.type
  if (eventType === 'user.created' || eventType === 'user.updated') {
    const { id, ...attributes } = evt.data
    await upsert(id as string, attributes)
  }
  res.json({})
}

type NextApiRequestWithSvixRequiredHeaders = NextApiRequest & {
  headers: IncomingHttpHeaders & WebhookRequiredHeaders
}

// Generic (and naive) way for the Clerk event
// payload type.
type Event = {
  data: Record<string, string | number>
  object: 'event'
  type: EventType
}

type EventType = 'user.created' | 'user.updated' | '*'
