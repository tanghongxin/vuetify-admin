import plugins from './plugins';
import './mock';
import './assets/styles/index.scss';
import App from './App.vue';

const app = createApp(App);

app.use(plugins).mount('#app');
