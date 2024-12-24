I'm using this repo to test https://github.com/strapi/strapi/issues/22162.

Created with `npx create-strapi-app@latest strapi-app-latest`

and then `npx @strapi/sdk-plugin@latest init test-plugin` in
`plugins/test-plugin`

You can read about the issue here: https://github.com/strapi/strapi/issues/22162

This is the problematic code:

```tsx
// import { useStrapiApp } from '@strapi/admin/strapi-admin';
import { useStrapiApp } from '@strapi/strapi/admin';

bootstrap(app: any) {
console.log('Plugin bootstrap 123');
app.getPlugin('content-manager').injectComponent('editView', 'right-links', {
    name: 'test-plugin5',
    Component: () => {
    // Try to get any value (eg. components) from this hook and it will throw the error.
    const components = useStrapiApp('TESTING', (value) => value.components);
    console.log(components);

    return (
        <p>
        <mark>PLUGIN TESTING 123</mark>
        </p>
    );
    },
});
},
```

Using this hook causes the following error when running the app in production (not DEV mode):

```
Error: `TESTING` must be used within `StrapiApp`
    at http://localhost:1337/admin/strapi-BXRBqEF0.js:2488:6819
    at FBn (http://localhost:1337/admin/strapi-BXRBqEF0.js:2488:6024)
    at i (http://localhost:1337/admin/strapi-BXRBqEF0.js:2488:6786)
    at Component (http://localhost:1337/admin/strapi-BXRBqEF0.js:6174:2634)
    at UL (http://localhost:1337/admin/strapi-BXRBqEF0.js:199:387)
    at ljt (http://localhost:1337/admin/strapi-BXRBqEF0.js:215:10154)
    at Y9e (http://localhost:1337/admin/strapi-BXRBqEF0.js:217:12119)
    at ppe (http://localhost:1337/admin/strapi-BXRBqEF0.js:234:2171)
    at I7e (http://localhost:1337/admin/strapi-BXRBqEF0.js:230:22553)
    at DBt (http://localhost:1337/admin/strapi-BXRBqEF0.js:230:22124)
```

Working in the monorepo I was able to resolve by using workspace references for dependencies and import the hooks from “@strapi/strapi"

Therefore, I believe the issue is caused by the plugin using a different version of @strapi/strapi than the one running the main Strapi app.

```json
  "devDependencies": {
    "@strapi/strapi": "workspace:*",
    ...
  },
  "peerDependencies": {
    "@strapi/strapi": "workspace:*",
  }
```

```tsx
// index.tsx
import { useStrapiApp } from '@strapi/strapi/admin';
...
bootstrap(app: any) {
console.log('Plugin bootstrap 123');
app.getPlugin('content-manager').injectComponent('editView', 'right-links', {
name: 'test-plugin5',
Component: () => {
// Try to get any value (eg. components) from this hook and it will throw the error.
const components = useStrapiApp('TESTING', (value) => value.components);
console.log(components);

        return (
          <p>
            <mark>TESTING</mark>
          </p>
        );
      },
    });

},

```
