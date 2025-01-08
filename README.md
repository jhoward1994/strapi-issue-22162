# strapi-issue-22162-plugin

This was created with `npx create-strapi-app@latest strapi-app-latest`

## Failing Test Case

### Install the failing plugin as a local plugin

- Clone `git@github.com:jhoward1994/strapi-issue-22162-plugin.git` plugin into `src/plugins`
- Build the plugin `npm run build`
- Enable it through `config/plugins.ts`

```
export default () => ({
    "strapi-issue-22162-plugin": {
        enabled: true,
        resolve: `./src/plugins/strapi-issue-22162-plugin`,
    },
});
```

- Run the app as `npm run develop -- --no-watch-admin`
- Go to create a Post entry in the Content Manager
- See the error

- Run the app as `npm run build; npm run start`
- Go to create a Post entry in the Content Manager
- See the error

- Run the app as `npm run develop`
- Go to create a Post entry in the Content Manager
- See no error.
- Inconsistent results between dev and production vite build.

## Passing Test Case

- Undo what you did in the Failing Test Case (make sure the app is not still installing the plugin locally)

- Install the plugin from NPM `npm install @jhoward1994/test-plugin-issue-22162`
- Run all test cases above.
- See no error.
- See consistent behaviour between dev and production vite build.

- BONUS: test this installed as a workspace plugin. This behaves the same as NPM install.
