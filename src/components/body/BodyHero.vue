<template id="template">
  <div>
    <div id="demo">
      <!-- <form id="search">
         Search <input name="query" v-model="searchQuery">
       </form>-->
       <demo-grid
         :data="firstFiveCryptoCurrencies"
         :columns="firstFiveCryptoCurrencies"
         :filter-key="''">
       </demo-grid>
     </div>
    <!-- <div id="kekk">
       <div class="sort-orders">
         <a class="sort-orders" v-for="sortkey in Object.keys(orderedListOptions)" v-on:click="sortOrder = sortkey" v-bind:class="{active: sortOrder == sortkey}">{{sortkey}}</a>
       </div>
         <div v-for="(cryptoCurrency, index) in this.sharedState.cryptoCurrencies" class="row">
           <img  :src="`${cryptoCurrency.stats.logo}`" class="row-image" :class="{'cryptoCurrency-image-iframe': isOpenedInIFrame}"/>
           {{cryptoCurrency.coin}} {{getPriceUSD(cryptoCurrency)}}$
         </div>
     </div>-->
    <div class="columns" style="margin: 0px 10px">
      <div v-for="cryptoCurrency in firstFiveCryptoCurrencies" class="column">
        <router-link :to="`/${cryptoCurrency.coin}`">
          <div class="card">
            <div class="card-image" :class="{'card-image-iframe': isOpenedInIFrame}">
              <figure class="image is-4by3">
                <img class="formatted-image" :src="`${cryptoCurrency.stats.logo}`">
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
    <div class="columns" style="margin: 0px 10px">
      <div v-for="cryptoCurrency in secondFiveCryptoCurrencies" class="column">
        <router-link :to="`/${cryptoCurrency.coin}`">
          <div class="card">
            <div class="card-image" :class="{'card-image-iframe': isOpenedInIFrame}">
              <figure class="image is-4by3">
                <img class="formatted-image" :src="`${cryptoCurrency.stats.logo}`">
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
  </div>

</template>

<script>
import { store } from '../../store.js'
import Vue from 'vue'
export default {
  props: {},
  name: 'bodyHero',
  data () {
    return {
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
    secondFiveCryptoCurrencies () {
      return this.sharedState.cryptoCurrencies.slice(5)
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
    height: 42% !important;
    width: 38% !important;
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

@-webkit-keyframes spinner {
    from
    {
        -webkit-transform: rotateY(0deg);
    }
    to {
        -webkit-transform: rotateY(-360deg);
    }
}
@keyframes spinner {
    from {
        -moz-transform: rotateY(0deg);
        -ms-transform: rotateY(0deg);
        transform: rotateY(0deg);
    }
    to
    {
        -moz-transform: rotateY(-360deg);
        -ms-transform: rotateY(-360deg);
        transform: rotateY(-360deg);

    }
}

table {
  border: 2px solid #42b983;
  border-radius: 3px;
  background-color: #fff;
}

th {
  background-color: #42b983;
  color: rgba(255,255,255,0.66);
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

td {
  background-color: #f9f9f9;
}

th, td {
  min-width: 120px;
  padding: 10px 20px;
}

th.active {
  color: #fff;
}

th.active .arrow {
  opacity: 1;
}

.arrow {
  display: inline-block;
  vertical-align: middle;
  width: 0;
  height: 0;
  margin-left: 5px;
  opacity: 0.66;
}

.arrow.asc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-bottom: 4px solid #fff;
}

.arrow.dsc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 4px solid #fff;
}
</style>
