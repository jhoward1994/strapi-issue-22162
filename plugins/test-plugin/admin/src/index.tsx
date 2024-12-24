import { PLUGIN_ID } from './pluginId';
import { Initializer } from './components/Initializer';
import { PluginIcon } from './components/PluginIcon';

import { useStrapiApp } from '@strapi/strapi/admin';

export default {
  register(app: any) {
    app.addMenuLink({
      to: `plugins/${PLUGIN_ID}`,
      icon: PluginIcon,
      intlLabel: {
        id: `${PLUGIN_ID}.plugin.name`,
        defaultMessage: PLUGIN_ID,
      },
      Component: async () => {
        const { App } = await import('./pages/App');

        return App;
      },
    });

    app.registerPlugin({
      id: PLUGIN_ID,
      initializer: Initializer,
      isReady: false,
      name: PLUGIN_ID,
    });
  },

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

  async registerTrads({ locales }: { locales: string[] }) {
    return Promise.all(
      locales.map(async (locale) => {
        try {
          const { default: data } = await import(`./translations/${locale}.json`);

          return { data, locale };
        } catch {
          return { data: {}, locale };
        }
      })
    );
  },
};
