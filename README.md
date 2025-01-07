# test-plugin-issue-22162

This was created with `npx create-strapi-app@latest strapi-app-latest`

## Failing Test Case

### Install the failing plugin as a local plugin

- Clone GIT_URL plugin into `src/plugins`
- Enable it through `config/plugins.ts`

```
    export default () => ({
    "my-strapi-plugin": {
        enabled: true,
        resolve: `./src/plugins/test-plugin-issue-22162`,
    },
    });
```

- Run `npm run develop -- --no-watch-admin`
- Go to Post Content Type in Content Manager
- See the error

- Run `npm run build; npm run start`
- Go to Post Content Type in Content Manager
- See the error

- Run `npm run develop`
- Go to Post Content Type in Content Manager
- See no error.
- Inconsistent results between dev and production.

## Passing Test Case

- Undo what you did in the Failing Test Case

- Install the plugin from NPM `npm install @jhoward1994/test-plugin-issue-22162`
- Run all test cases above.
- See no error.
- Consistent results between dev and production.

- BONUS: test this as a workspace plugin. This behaves the same as NPM install.
