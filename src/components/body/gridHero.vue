<template>
  <div>
    <div class="banner"> </div>
    <div class="columns fiveCoins" style="margin: 0px 10px">
      <div v-for="cryptoCurrency in firstFiveCryptoCurrencies" class="column">
        <router-link :to="`/${cryptoCurrency.coin}`">
          <div class="card">
            <div class="card-image" :class="{'card-image-iframe': isOpenedInIFrame}">
              <figure class="image is-4by3">
                <img class="formatted-image" :src="`${cryptoCurrency.Logo}`">
              </figure>
            </div>
            <div class="card-content">
              <p class="title is-5" :class="{'title-iframe': isOpenedInIFrame}">{{ cryptoCurrency.stats.cmc.name.toUpperCase() }}</p>
              <p class="title price-title is-5" :class="{'price-title-iframe': isOpenedInIFrame}">${{ getPriceUSD(cryptoCurrency) }}
                <span :class="{'positive-percent-change': cryptoCurrency.positivePercentChange, 'negative-percent-change': !cryptoCurrency.positivePercentChange}"> {{ cryptoCurrency.percentChange24h/*getPercentChange(cryptoCurrency)*/ }}%
                  <icon class="arrow-up" name="arrow-up" height="9" width="9"></icon>
                  <icon class="arrow-down" name="arrow-down" height="9" width="9"></icon>
                </span>
              </p>
            </div>
          </div>
        </router-link>
      </div>
    </div>
    <form id="search">
      <font-awesome-icon icon="search-dollar" /> <input id="searchInput" name="query" autocomplete="off" placeholder="Type something to filter" v-model="searchQuery" @keydown.enter.prevent=""/>
 </form>
      <demo-grid
        :data="allCryptoCurrencies"
        :columns="gridColumns"
        :filter-key="searchQuery">
      </demo-grid>


  </div>
</template>

<script>
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
  import { library } from '@fortawesome/fontawesome-svg-core'
  import { faSearchDollar } from '@fortawesome/free-solid-svg-icons'
  library.add(faSearchDollar)
  import { store } from '../../store.js'
  import router from '../../routes.js'
  import Vue from 'vue'
  Vue.component('font-awesome-icon', FontAwesomeIcon);
  Vue.component('demo-grid', {
    template: '  <table id="mytable">\n' +
    '    <thead id="mythead">\n' +
    '      <tr id="mytr" >\n' +
    '        <th id="myth" v-for="key in columns"\n' +
    '          @click="sortBy(key)"\n' +
    '          :class="[{ active: sortKey == key}, key ]">\n' +
    '          {{ key | capitalize }}\n'+
    '          <br><span class="arrow" :class="sortOrders[key] > 0 ? \'asc\' : \'dsc\'">\n' +
    '          </span>\n' +
    '        </th>\n' +
    '      </tr>\n' +
    '    </thead>\n' +
    '    <tbody id="mytbody">\n' +
    '      <tr @click="rowClick(entry.coin)" id="mytr" class="mytr" v-for="entry in filteredData">\n' +
    '        <td id="mytd" v-for="key in columns" :class="key" v-if="key == \'Logo\' ">\n' +
    '        \t<figure class=" myTableLogo">\n' +
    '          \t<img class="formatted-image" :src=entry[key]>\n' +
    '          </figure>\n' +
    '        </td>\n' +
    '        <td id="mytd" :class="key" v-else-if="key == \'Current Price\' /*|| key == \'Yearly Income\'  || key == \'Monthly Income\' || key == \'Daily Income\' */">\n' +
    '          {{entry[key]}} <span class="MyDollar">$</span>\n' +
    '        </td>\n' +
    '        <td id="mytd" :class="key" v-else-if="key == \'coin\' ">\n' +
    '          {{entry[key].toUpperCase()}}\n' +
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
  });
  export default {
    props: {},
    name: 'gridHero',
    data () {
      return {
        searchQuery: '',
        gridColumns : ['Logo','coin', 'Coins Required', 'Current Price', 'Worth', 'Daily Income', 'Monthly Income', 'Yearly Income', 'Roi', 'Master Node Count'],
        sharedState: store.state,
        isOpenedInIFrame: false
      }
    },
    created () {
      if (window.self !== window.top) {
        this.isOpenedInIFrame = true
      }
    },
    computed: {
      firstFiveCryptoCurrencies () {
        return this.sharedState.cryptoCurrencies.slice(0, 5)
      },
      allCryptoCurrencies () {
        return this.sharedState.cryptoCurrencies
      },
      orderedListOptions: function(){
        return {
          "Popularity": () => { return this.list },
          "A-Z": () => { return this.list.slice().sort() },
          "Z-A": () => { return this.list.slice().sort().reverse()},
        }
      }
    },
    methods: {
      getDifferenceInChange (cryptoCurrency) {
        //cryptoCurrency.positivePercentChange = !(cryptoCurrency.stats.cmc.percent_change_24h.indexOf('-') > -1)
        //cryptoCurrency.percentChange24h = cryptoCurrency.stats.cmc.percent_change_24h.replace(/^-/, '')
      },
      getPriceUSD (cryptoCurrency) {
        const priceUsd = cryptoCurrency.stats.cmc.price_usd
        return Number(priceUsd).toFixed(3)
      },
      getPercentChange (cryptoCurrency) {
        this.getDifferenceInChange (cryptoCurrency);
        return cryptoCurrency.percentChange24h
      },
      sort: function(sortOrder){
        return this.orderedListOptions[sortOrder]()
      }
    }
  }
</script>

<style scoped lang="scss">
  $small: 590px;
  $medium: 768px;
  $large: 1024px;

    thead#theadm {
      background-color: pink;
    }

    #search{
      color: #022818;
      margin-top: 40px;
      margin-bottom: 5px;
    }

    #searchInput{
      border: 2px solid #022818;
      border-radius: 30px;
      padding-left: 5px;
    }

    #searchInput:focus{
      outline: none;
      box-shadow: 0 0 3pt 2pt #42b983;
    }

    .banner{
      height: 170px;
      @media screen and (max-width: $medium) {
        height: 100px;
      }
    }
    .fiveCoins{
      @media screen and (max-width: $medium) {
        display: none;
      }
      @media screen and (min-width: $large) {
        font-size: 0.3em;
      }
    }
    .card {
    background-color: initial;
    position: relative;
    cursor: pointer;
    box-shadow: 0 0 50px 5px rgba(0,0,0,.25);

    @media screen and (max-width: $medium) {
      max-width: 300px;
      display: block;
      margin: 0 auto;
    }

    @media screen and (max-width: $small) {
      max-width: 200px;
    }

    &:hover {
      border-radius: 4px;
      box-shadow: 0 0 5px 0 #fd6721;
      transition: .5s;
    }

    .card-image {
      .image {
        top: -15px;

        img {
          @media screen and (max-width: $small) {
            height: 90%;
            width: 90%;
          }
        }
      }
    }
    .formatted-image {
      bottom: 0;
      left: 31%;
      position: absolute;
      right: 0;
      top: 16%;
      height: 38% !important;
      width: 34% !important;
    }
    .card-image-iframe {
      .image {
        top: -23px;
      }
    }

    .card-content {
      padding: 0;

      .title {
        position: absolute;
        bottom: 15%;
        color:#4e4f51;
        left: 0;
        right: 0;
        @media screen and (min-width: $large) {
          font-size: 2vw;
        }
        @media screen and (max-width: $medium) {
          font-size: 4vw;
        }
        @media screen and (max-width: $small) {
          font-size: 10px;
        }
      }

      .title-iframe {
        font-size: 0.9rem;
        position: absolute;
        bottom: 12%;
        left: 0;
        right: 0;
      }

      .price-title {
        font-size: 1.0rem;
        font-weight: 600;

        .positive-percent-change {
          font-size: 0.9em;
          color: #156b20;
          //color: #20E10B;
          font-weight: bold;

          .arrow-down {
            display: none;
          }
        }

        .negative-percent-change {
          font-size: 0.9em;
          color: #ff3860;
          font-weight: bold;
          font-weight: bold;

          .arrow-up {
            display: none;
          }
        }
      }

      .price-title-iframe {
        font-size: 0.9rem;
      }
    }
  }
</style>
