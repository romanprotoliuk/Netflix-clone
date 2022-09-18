[Website link](https://netflix-clone-qt7lz3x5y-romanprotoliuk.vercel.app/login)

## Setup Local Environment

You need to setup a few API keys for this project to be setup correctly otherwise you won't see any videos.

- [Magic Server and Publishable Key](https://magic.link/docs)
- [Hasura Admin URL and JWT Secret](https://hasura.io/docs/latest/graphql/cloud/projects/create.html#create-project)
- [Youtube API Key](https://developers.google.com/youtube/v3/getting-started)

For that, you need to create a .env.local file in your project as [shown in docs](https://nextjs.org/docs/basic-features/environment-variables#loading-environment-variables) that will look like this:

```
NEXT_PUBLIC_HASURA_ADMIN_URL=<REPLACE THIS>
JWT_SECRET=<REPLACE THIS>
NEXT_PUBLIC_HASURA_ADMIN_SECRET=<REPLACE THIS>
MAGIC_SERVER_KEY=<REPLACE THIS>
NEXT_PUBLIC_MAGIC_PUBLISHABLE_API_KEY=<REPLACE THIS>
YOUTUBE_API_KEY=<REPLACE THIS>
```

You can retrieve the above environment values by referring their docs linked above and once retrieved, paste above accordingly.

### **_ Important: Videos from Youtube _**

During local development, we recommend you to add the environment variable `DEVELOPMENT=true` as that won't fetch videos from the Youtube API and instead access it from `data/videos.json`. Youtube API does have a [quota](https://developers.google.com/youtube/v3/determine_quota_cost?hl=en) and this way you can continue doing local development without worrying about running out of API calls.

