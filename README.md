# getcronit-pylon-plugins

A few plugins I wrote for [getcronit-pylon](https://pylon.cronit.io/docs/getting-started) library to support my application with custom features. They support [Envelop](https://pylon.cronit.io/docs/core-concepts/plugins) format.

### List:
- `useClerk`: passing the [Clerk](https://clerk.com/) client to the context along with the user payload obtained from Clerk. Useful if you don't want to use Zitadel.
- `useSupabase`: simple plugin to attach the [Supabase](https://supabase.com/) client to the context for the future use
- `useValidation`: request validation plugin that is using [Zod](https://zod.dev/) to check the request input

**Note:** They are unofficial and require adoption to your use case.

### How to use?

Just attach in your Pylon index file.

```
// graphQL and app ...

export const config = {
   plugins: [
      useValidation(),
      useSupabase(),
      useClerk()
   ]
}
```

Feel free to reuse how you see fit.
