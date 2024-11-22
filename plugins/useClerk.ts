import type {Plugin} from '@envelop/core'
import {getContext} from '@getcronit/pylon'
import {createClerkClient} from '@clerk/backend'

/**
 * Sets authClient and authUser in the context
   pylon.d.ts
   ----------
   import {ClerkClient, RequestState} from '@clerk/backend'
   interface Bindings {
      CLERK_SECRET_KEY: string
      CLERK_PUBLISHABLE_KEY: string
   }

   interface Variables {
      authClient: ClerkClient
      authUser: RequestState | null
   }
 */

export const useClerk = (): Plugin => {
   return {
      onExecute(args) {
         const ctx = getContext()
         ctx.set('authUser', null)

         const clerk = createClerkClient({
            secretKey: ctx.env.CLERK_SECRET_KEY,
            publishableKey: ctx.env.CLERK_PUBLISHABLE_KEY
         })

         ctx.set('authClient', clerk)

         const auth = ctx.req.header('Authorization')
         const sessionId = ctx.req.header('X-Session')

         if (auth && sessionId) {
            let token = auth.replace('Bearer ', '')
            if (token.length > 0) {
               try {
                  clerk.authenticateRequest(ctx.req.raw, {
                     secretKey: ctx.env.CLERK_SECRET_KEY,
                     domain: ctx.env.APP_DOMAIN_NAME,
                     authorizedParties: 'http://localhost:3000' // change that
                  }).then(result => {
                     ctx.set('authUser', result)
                  })
               } catch (e) {
                  if (e instanceof Error) {
                     console.error(e.message)
                  }
               }
            }
         }

         return {
            onExecuteDone({result}) {}
         }
      }
   }
}
