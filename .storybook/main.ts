import type { StorybookConfig } from '@storybook/react-webpack5';
import path from 'path';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config: StorybookConfig = {
    stories: [path.resolve(__dirname, '../src/ui/**/*.stories.@(ts|tsx)')],
    addons: ['@storybook/addon-docs', '@storybook/addon-a11y'],
    framework: {
        name: '@storybook/react-webpack5',
        options: {}
    },
    typescript: {
        check: false,
        reactDocgen: 'react-docgen-typescript'
    },
    webpackFinal: async (cfg) => {
        cfg.resolve = cfg.resolve || {};
        cfg.resolve.extensions = [...(cfg.resolve.extensions || []), '.ts', '.tsx'];
        cfg.resolve.plugins = [
            ...(cfg.resolve.plugins || []),
            new TsconfigPathsPlugin({
                configFile: path.resolve(__dirname, '../tsconfig.json')
            })
        ];

        cfg.module = cfg.module || {};
        cfg.module.rules = cfg.module.rules || [];
        cfg.module.rules.push(
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'ts-loader',
                    options: {
                        transpileOnly: true,
                        configFile: path.resolve(__dirname, '../tsconfig.json')
                    }
                }
            },
            {
                test: /\.(png|jpg|gif|webp|svg)$/,
                loader: 'url-loader'
            }
        );

        cfg.watchOptions = {
            ...(cfg.watchOptions || {}),
            ignored: ['**/node_modules/**', '**/.git/**', '**/dist/**']
        };

        return cfg;
    }
};

export default config;
