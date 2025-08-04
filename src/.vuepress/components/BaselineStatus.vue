<!-- .vuepress/components/BaselineStatus.vue -->
<template>
  <div class="baseline-status">
    <h1 class="name">{{ feature?.name }}</h1>
    <details v-if="feature">
      <summary :aria-label="getAriaLabel()">
        <BaselineIcon v-bind:support="baseline" aria-hidden="true"/>
        <div class="baseline-status-title" aria-hidden="true">
          <div>
            {{ title }} {{ feature.year }} {{ feature.badge }}
          </div>
        </div>
        <BaselineStatusBrowsers v-bind:browser_implementations="feature?.browser_implementations" />
        <span class="open-icon" aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" width="11" height="7" viewBox="0 0 11 7" fill="none">
            <path d="M5.5 6.45356L0.25 1.20356L1.19063 0.262939L5.5 4.59419L9.80937 0.284814L10.75 1.22544L5.5 6.45356Z" fill="currentColor"/>
          </svg>
        </span>
      </summary>
      <p>{{ description }}</p>
      <p v-if="baseline !== 'no_data'">
        <a :href="`https://github.com/web-platform-dx/web-features/blob/main/features/${feature.feature_id}.yml`" target="_top">Learn more</a>
      </p>
    </details>
  </div>
</template>

<script>
import BaselineIcon from './BaselineIcon.vue';
import BaselineStatusBrowser from './BaselineStatusBrowser.vue';

const API_ENDPOINT = 'https://api.webstatus.dev/v1/features/';

const BASELINE_DEFS = {
  limited: {
    title: 'Limited availability',
    defaultDescription: 'This feature is not Baseline because it does not work in some of the most widely-used browsers.',
  },
  newly: {
    title: '',
    defaultDescription: 'This feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.'
  },
  widely: {
    title: 'Widely available',
    defaultDescription: 'This feature is well established and works across many devices and browser versions.'
  },
  loading: {
    title: 'Loading',
    defaultDescription: ''
  },
  no_data: {
    title: 'Unknown availability',
    defaultDescription: 'We currently don’t have browser support information about this feature.'
  },
};

export default {
  name: "BaselineStatus",
  components: { BaselineIcon, BaselineStatusBrowser },
  props: {
    featureid: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isLoading: false,
      feature: {},
      baseline: "no_data",
      title: "Baseline:",
      description: "",
      support: '',
      browsers: {
        chrome: { icon: `` },
        edge: { icon: `` },
        firefox: { icon: `` },
        safari: { icon: `` }
      },
    };
  },
  methods: {
    async fetchData() {
      try {
        this.isLoading = true;
        const url = `https://api.webstatus.dev/v1/features/${this.featureid}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Failed to fetch: ${response.status}`);
        const data = await response.json();
        console.log(JSON.stringify(data, 2, null))
        this.feature = data;
        this.baseline = data?.baseline?.status || "no_data";
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      this.isLoading = false;
      console.log(`baseline: ${this.baseline}`)
      this.title = BASELINE_DEFS[this.baseline]?.title || "Loading...";
      const baselineDate = this.getBaselineDate(this.feature) ?? undefined;
      this.description = this.getDescriptionDate(this.baseline, baselineDate);
      this.browsers = this.feature?.browser_implementations || {};
    },
    getAriaLabel() {
      const badge = this.baseline === 'newly' 
        ? `<span class="baseline-badge">newly available</span>` 
        : '';
      const year = (this.baseline === 'newly' && baselineDate)
        ? baselineDate.split(' ')[1]
        : '';
      const { chrome, edge, firefox, safari } = this.browsers || {};
      // this.browsers
      if (this.title === 'Unknown availability') {
        // chrome = edge = firefox = safari = 'unknown';
      }
      return `${this.title}${year ? ` ${year}` : ''}${badge ? ` (newly available)` : ''}. Supported in Chrome: ${chrome?.status === 'available' ? 'yes' : chrome?.status}. Supported in Edge: ${edge?.status === 'available' ? 'yes' : edge?.status}. Supported in Firefox: ${firefox?.status === 'available' ? 'yes' : firefox?.status}. Supported in Safari: ${safari?.status === 'available' ? 'yes' : safari?.status}.`;
    },
    
    /**
     * Returns feature's low_date as mm-yyyy string or empty string if low_date
     * is not present.
     * @param {object} feature
     * @returns {string}
     */
    getBaselineDate(feature) {
      return '';
        // feature.baseline.low_date ?
        // new Intl.DateTimeFormat('en-US', {
        //   year: 'numeric',
        //   month: 'long'
        // }).format(new Date(feature.baseline.low_date)) : '';
    },
    /**
     * Returns Baseline's description.
     * @param {string} baseline
     * @param {string} date
     * @returns {string}
     */
    getDescriptionDate(baseline, date) {
      console.log(`getDescriptionDate ... baseline: ${baseline}, date: ${date}`)
      if (baseline === 'newly' && date) {
        return `Since ${date} this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.`
      } else if (baseline === 'widely' && date) {
        return `This feature is well established and works across many devices and browser versions. It’s been available across browsers since ${date}`
      }
      return BASELINE_DEFS[baseline].defaultDescription;
    }
  },
  mounted() {
    this.fetchData();
  },
  render() {
    
  }
};
</script>

<style scoped>
* {
  --baseline-status-color-outline: light-dark(#d9d9d9, #d9d9d9);
  --baseline-status-color-link: light-dark(#1a73e8, #5aa1ff);
  font-family: Roboto, sans-serif;font-size: 14px;font-style: normal;
}

.baseline-status {
  border: solid 1px var(--baseline-status-color-outline);
  padding: 16px 24px 0 24px;
  color: inherit;
  border-radius: 8px;
  display: flex;flex-direction:column;justify-content:center;align-items:flex-start;
  max-width: 800px;
  margin-bottom: 2.2rem;
}
.baseline-status:before,.baseline-status:after {
  box-sizing:border-box;
}

.name {
  font-size: 20px;font-weight: normal;margin: 0;
}

a,
a:active,
a:visited {
  color: var(--baseline-status-color-link);
}

::slotted(*) {
  color: grey;
  font-style: italic;
  font-size: 80%;
}

.baseline-status-title {
  display:flex;flex-wrap:wrap;justify-content:space-between;flex:1;gap:1rem;
}

.baseline-status-title {
  flex: 1;
}

.baseline-status-title div:first-child {
  display: flex;align-items: center;gap: 0.2rem;
}

.baseline-badge {
  background: #3367D6;
  color: #fff;
  font-size: 11px;
  padding: 0 4px;
  border-radius: 2px;
  text-transform: uppercase;
  line-height: 20px;
  margin-inline: 0.5rem;
  white-space: nowrap;
}

  
details { width: 100%; }
summary {
  cursor: pointer;
  font-size: 16px;
  display: flex;flex-wrap:wrap;justify-content:space-between;
  gap: 16px;padding: 16px 0;
}
details > summary .open-icon {
  width: 10px;
  height: 20px;
  color: inherit;
  margin-left: auto;
}

@media (min-width: 420px) {
  details > summary .open-icon {
    margin-left: 48px;
  }
}

details > summary .open-icon svg {
  transition: transform 0.3s;
}

details[open] summary .open-icon svg {
  transform: rotate(180deg);
}

summary {
  display: flex;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: space-between;
  padding: 16px 0;
}

summary::-webkit-details-marker {
  display: none;
}
</style>