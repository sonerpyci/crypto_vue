<template>
  <div class="demoGrid">
    <p style="height: 500px">asfasfasfasfasfasf</p>
  <table id="mytable" style="background: #cd0930">
    <thead>
      <tr>asfasfasf</tr>
    </thead>
        <!--<thead id="mythead">
          <tr class="mytr" >
            <th id="myth" v-for="key in columns"
              @click="sortBy(key)"
              :class="[{ active: sortKey == key}, key ]">
             {{ key | capitalize }}
              <br><span class="arrow" :class="sortOrders[key] > 0 ? \'asc\' : \'dsc\'">
            </span>
            </th>
          </tr>
       </thead>
       <tbody id="mytbody">
         <tr @click="rowClick(entry.coin)" id="mytr" class="mytr" v-for="entry in filteredData">
            <td id="mytd" v-for="key in columns" :class="key" v-if="key === \'Logo\' ">
            \t<figure class=" myTableLogo">
              \t<img class="formatted-image" :src=entry[key]>
              </figure>
            </td>
            <td id="mytd" :class="key" v-else-if="key === \'Current Price\' /*|| key == \'Yearly Income\'  || key == \'Monthly Income\' || key == \'Daily Income\' */">
              {{entry[key]}} <span class="MyDollar">$</span>
            </td>
            <td id="mytd" :class="key" v-else-if="key === \'coin\' ">
              {{entry[key].toUpperCase()}}
           </td>
            <td id="mytd" :class="key" v-else>
              {{entry[key]}}
           </td>
          </tr>
      </tbody>-->
      </table>
  </div>
</template>

<script>
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
  import { library } from '@fortawesome/fontawesome-svg-core'
  import { faSearchDollar } from '@fortawesome/free-solid-svg-icons'
  library.add(faSearchDollar)
  import { store } from '../../../store'
  import router from '../../../routes'
  import Vue from 'vue'
  Vue.component('font-awesome-icon', FontAwesomeIcon);
  export default {
    name: 'demoGrid',
    props: {
      data: Array,
      columns: Array,
      filterKey: String
    },
    data () {
      var sortOrders = {}
      this.columns.forEach(function (key) {
        sortOrders[key] = 1
      })
      return {
        searchQuery: '',
        gridColumns : ['Logo','coin', 'Coins Required', 'Current Price', 'Worth', 'Daily Income', 'Monthly Income', 'Yearly Income', 'Roi', 'Master Node Count'],
        sharedState: store.state,
        isOpenedInIFrame: false,
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
          return data
        }
        if (sortKey && sortKey !== 'Logo') {
          console.log(sortKey);
          if ((sortKey === 'coin')) {
            data = data.slice().sort(function (a, b) {
              a = a[sortKey]
              b = b[sortKey]
              return (a === b ? 0 : a > b ? 1 : -1) * order
            })
          }
          else {
            data = data.slice().sort(function (a, b) {
              a = Number(a[sortKey])
              b = Number(b[sortKey])
              return (a === b ? 0 : a > b ? 1 : -1) * order
            })
          }
          console.log(this.data)
          return data
        } else {
          return this.data
        }
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
  }
</script>

<style scoped lang="scss">
  $small: 590px;
  $medium: 768px;
  $large: 1024px;

  .footer {
    background-color: transparent;
    padding: 3rem 1.5rem 0rem;
    position: relative;

    @media screen and (max-width: $small) {
      padding-top: 60px;
    }

    .mobile-footer {
      display: none;
      font-size: 15px;
      font-weight: 400;
      position:absolute;
      bottom: 15px;
      left: 0;
      right: 0;
      margin: 0 auto;

      a {
        color: #fd6721;
      }

      @media screen and (max-width: $small) {
        display: none;
      }

      .wallet-tag {
        font-size: 9px;
        font-weight: 600;

        span {
          color: #00d1b2;
        }
      }
    }

    .desktop-footer {
      display: none;
      .button {
        float: right;
        padding: 10px;
        margin-bottom: 10px;
      }

      @media screen and (max-width: $medium) {
        display: none;
      }
    }
  }

  .hide {
    display: none !important;
  }
</style>
