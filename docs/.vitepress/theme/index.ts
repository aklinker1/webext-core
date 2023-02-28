import { h } from 'vue';
import Theme from 'vitepress/theme';
import './styles/vars.css';
import Chip from './components/Chip.vue';
import ChipGroup from './components/ChipGroup.vue';

export default {
  ...Theme,
  Layout() {
    return h(Theme.Layout, null, {});
  },
  enhanceApp({ app }) {
    app.component('Chip', Chip);
    app.component('ChipGroup', ChipGroup);
  },
};
