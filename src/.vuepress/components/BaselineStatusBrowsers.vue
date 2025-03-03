<template>
  <div class="baseline-status-browsers">
    <span v-for="(browser, key) in browsers" :key="key">
      <BaselineStatusBrowser v-bind:browser="browser" v-bind:feature="feature[key]"/>
    </span>
  </div>
</template>
<script>
import BaselineStatusBrowser from './BaselineStatusBrowser.vue'

export default {
  name: "BaselineStatusBrowsers",
  components: { BaselineStatusBrowser },
  props: {
    browser_implementations: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      browsers: ['chrome', 'edge', 'firefox', 'safari'],
      feature: [],
    }
  },
  methods: {
    render() {
      // const { chrome, edge, firefox, safari } = this.browser_implementations || {};
      this.feature = this.browsers.map((browserName) => {
        console.log(`${browserName}: ${JSON.stringify(this.browser_implementations)}`)
        return (
          this.browser_implementations &&
          browserName in this.browser_implementations && 
          this.browser_implementations[browserName] && 
          this.browser_implementations[browserName]?.status
        )
        ? this.browser_implementations[browserName]?.status ?? 'unavailable' 
        : 'unavailable';
      })
    },
  },
  mounted() {
    this.render()
  }
}
</script>
<style scoped>
* {
  --baseline-status-color-limited: light-dark(#ea8600, #f09418);
  --baseline-status-color-newly: light-dark(#1a73e8, #4185ff);
  --baseline-status-color-widely: light-dark(#1e8e3e, #24a446);
  --baseline-status-color-no_data: light-dark(#707070, #868686);
}
.baseline-status-browsers {
  font-size: 0;
  max-width: 200px;
  display: flex;
  gap: 16px;
}
.baseline-status-browsers span {
  white-space: nowrap;
}
.support-no_data {
  color: var(--baseline-status-color-no_data);
}
.support-unavailable {
  color: var(--baseline-status-color-limited);
}
.support-newly {
  color: var(--baseline-status-color-newly);
}
.support-widely,
.support-available {
  color: var(--baseline-status-color-widely);
}
</style>