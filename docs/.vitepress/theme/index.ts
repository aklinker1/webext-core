import { h } from 'vue';
import Theme from 'vitepress/theme';
import './styles/vars.css';

export default {
  ...Theme,
  Layout() {
    return h(Theme.Layout, null, {});
  },
};
