// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import vSelect from 'vue-select'
import vSuggest from 'v-suggest';
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'
import DoughnutChart from './components/body/sub/DoughnutChart'
import App from './App'
import router from './routes.js'

import {store} from './store.js'

Vue.component('v-select', vSelect);
Vue.component('v-suggest', vSuggest);
Vue.component('demo-grid', {
  template: '  <table id="mytable">\n' +
  '    <thead id="mythead">\n' +
  '      <tr id="mytr" >\n' +
  '        <th id="myth" v-for="key in columns"\n' +
  '          @click="sortBy(key)"\n' +
  '          :class="[{ active: sortKey == key}, key ]">\n' +
  '          {{ key | capitalize }}\n'+
  '          <span class="arrow" :class="sortOrders[key] > 0 ? \'asc\' : \'dsc\'">\n' +
  '          </span>\n' +
  '        </th>\n' +
  '      </tr>\n' +
  '    </thead>\n' +
  '    <tbody id="mytbody">\n' +
  '      <tr @click="rowClick(entry.coin)" id="mytr" class="mytr" v-for="entry in filteredData">\n' +
  '        <td id="mytd"  v-for="key in columns" :class="key" v-if="key == \'Logo\' ">\n' +
  '        \t<figure class="image is-4by3 myTableLogo">\n' +
  '          \t<img class="formatted-image" :src=entry[key]>\n' +
  '          </figure>\n' +
  '        </td>\n' +
  '        <td id="mytd" :class="key" v-else>\n' +
  '          {{entry[key]}}\n' +
  '        </td>\n' +
  '      </tr>\n' +
  '    </tbody>\n' +
  '  </table>',
  //template : '#grid-template',// Aslında template'in ayrı durup güzelce linklenmesi gerek ama ne yapsam yaramadı...
  props: {
    data: Array,
    columns: Array,
    filterKey: String
  },
  data: function () {
    var sortOrders = {}
    this.columns.forEach(function (key) {
      sortOrders[key] = 1
    })
    return {
      sortKey: '',
      sortOrders: sortOrders
    }
  },
  computed: {
    filteredData: function () {
      var sortKey = this.sortKey
      var filterKey = this.filterKey && this.filterKey.toLowerCase()
      var order = this.sortOrders[sortKey] || 1
      var data = this.data
      if (filterKey) {
        data = data.filter(function (row) {
          return Object.keys(row).some(function (key) {
            return String(row[key]).toLowerCase().indexOf(filterKey) > -1
          })
        })
      }
      if (sortKey) {
        data = data.slice().sort(function (a, b) {
          a = a[sortKey]
          b = b[sortKey]
          return (a === b ? 0 : a > b ? 1 : -1) * order
        })
      }
      return data
    }
  },
  filters: {
    capitalize: function (str) {
      return str//.charAt(0).toUpperCase() + str.slice(1)
    }
  },
  methods: {
    sortBy: function (key) {
      this.sortKey = key
      this.sortOrders[key] = this.sortOrders[key] * -1
    },
    rowClick: function (coin) {
      console.log(coin);
      router.push({ path: coin })
    }
  }
})
Vue.use(VueAxios, axios)
Vue.component('icon', Icon)
Vue.component('doughnut-chart', DoughnutChart)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: router,
  render: h => h(App),
  data: {
    sharedState: store.state
  },
  created () {
    store.getCryptoCurrencies()
    store.getTotalMarketCapUSD()
  }
})

