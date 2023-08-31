import { authMiddleware } from '@clerk/nextjs'
import { Path } from './constants/path'

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/nextjs/middleware for more information about configuring your middleware
export default authMiddleware({
  publicRoutes: [
    Path.EVENT_LIST,
    Path.EVENT_CREATE_TOP,
    Path.EVENT_STYLE_DIAGNOSIS_TOP,
    Path.EVENT_SWIPE,
    Path.SIGNIN,
    Path.SIGNUP,
    Path.EVENT_SUPPORT,
    '/Events(.*)',
    Path.EVENT_STYLE_DIAGNOSIS,
    Path.EVENT_CREATE,
    Path.USER_FAVORITE_EVENT_LIST,
    '/api(.*)',
    '/sso-callback(.*)',
  ],
  ignoredRoutes: ['/api/webhooks/'],
})

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}
