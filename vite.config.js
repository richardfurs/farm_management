import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
	server: {
		host: '0.0.0.0',
		port: 5174,
		hmr: {
			host: process.env.VITE_DEV_SERVER_HOST,
			protocol: 'ws',
			port: 5174,
		},
	},
	resolve: {
		alias: {
		  '@': path.resolve(__dirname, 'resources/js'),
		},
	  },
	plugins: [
		laravel({
				input: ['resources/css/app.css', 'resources/js/App.tsx'],
				refresh: true,
		}),
		tailwindcss(),
		react(),
	],
});
