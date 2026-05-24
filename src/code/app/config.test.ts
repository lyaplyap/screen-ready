import { initConfig } from './config';

describe('initConfig', () => {
    it('returns the default plugin configuration', () => {
        expect(initConfig()).toEqual({
            language: 'en',
            plugin: {
                width: 782,
                height: 800,
                themeColors: true
            }
        });
    });

    it('returns a fresh object on each call', () => {
        const a = initConfig();
        const b = initConfig();
        expect(a).not.toBe(b);
        expect(a.plugin).not.toBe(b.plugin);
    });
});
