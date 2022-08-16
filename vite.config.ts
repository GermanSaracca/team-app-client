import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';
import postCssPresetEnv from 'postcss-preset-env';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		port: 3000,
		open: true,
	},
	preview: {
		port: 5000,
		open: true,
	},
	build: {
		outDir: 'build',
	},
	css: {
		postcss: {
			plugins: [
				postCssPresetEnv({
					browsers: ['>0.2%', 'not dead', 'not op_mini all'],
				}),
			],
		},
	},
	resolve: {
		alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
	},
});
