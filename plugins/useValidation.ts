import {ZodError} from 'zod'
import type {Plugin} from '@envelop/core'
import {ServiceError} from '@getcronit/pylon'

/**
   * Schema example (see more at https://zod.dev)
   export const schema = z.object({
      id: z.string()
   })
 */

export const useValidation = (): Plugin => {
   return {
      onExecute({args}) {
         const {operationName, variableValues} = args
         if (Object.hasOwn(schema, operationName)) {
            const requestSchema = schema[operationName]
            try {
               requestSchema.parse(variableValues)
            } catch (e) {
               if (e instanceof ZodError) {
                  throw new ServiceError('Request validation failed', {
                     code: 'request_validation_failed',
                     statusCode: 400,
                     details: {
                        errors: e.errors
                     }
                  })
               }
            }

         }
         return {
            onExecuteDone() {}
         }
      },
   }
}
