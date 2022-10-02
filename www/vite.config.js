import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    server: {
        host: '0.0.0.0',
        open: true,
        // port: 3000,
        // 是否开启 https
        https: false,
        proxy: {
            '/api': {
                // 后台地址
                target: 'http://localhost:8080',
                // changeOrigin设置为true时，服务器收到的请求头的host与服务器地址相同
                // changeOrigin设置为false时，服务器收到的请求头的host与前端地址相同
                changeOrigin: true,//开启代理
                rewrite: (path) => path.replace(/^\/api/, ''),
            }
        }
    }
})
