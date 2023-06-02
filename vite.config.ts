import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgrPlugin from "@honkhonk/vite-plugin-svgr";
import alias from '@rollup/plugin-alias'
import {resolve} from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgrPlugin()],
  resolve:{
    alias: [
      {find:'@',replacement:resolve(__dirname, 'src')},
      {find:'@components',replacement: resolve(__dirname,'src/components')},
      {find: '@icons',replacement: resolve(__dirname,'src/icons')},
  ]
  },
  define:{
    'process.env':process.env
  }
  
});
