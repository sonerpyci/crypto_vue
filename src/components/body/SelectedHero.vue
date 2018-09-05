<template >
  <div v-if="typeof selectedCryptoCurrency.coin !== 'undefined'">
    <div class="columns selected-section" :class="{'no-padding': isOpenedInIFrame}">
      <router-link to="/" class="nav-item">
        <div class="return-action" :class="{'return-action-iframe': isOpenedInIFrame}">
          <icon name="chevron-left" class="arrow-left" :class="{'arrow-left-iframe': isOpenedInIFrame}" height="22" width="22"></icon>
          <p class="return-text" :class="{'hide': isOpenedInIFrame}">Return</p>
        </div>
      </router-link>
      <div class="column is-7 image-section">
        <img  :src="`${selectedCryptoCurrency.Logo}`" class="cryptoCurrency-image" :class="{'cryptoCurrency-image-iframe': isOpenedInIFrame}"/>
        <h1 class="cryptoCurrency-title" :class="{'cryptoCurrency-title-iframe': isOpenedInIFrame}">{{ selectedCryptoCurrency.stats.cmc.name.toUpperCase() }}</h1>
        <span class="tag is-primary" :class="{'tag-iframe': isOpenedInIFrame}">Rank {{ selectedCryptoCurrency.stats.cmc.rank}}</span>
        <p class="cryptoCurrency-description" :class="{'cryptoCurrency-description-iframe': isOpenedInIFrame}">{{ selectedCryptoCurrency.description }}</p>
        <div class="icons-section">
          <span v-if="selectedCryptoCurrency.mnpdata.sites.coin_website" class="icon">
            <a :href="selectedCryptoCurrency.mnpdata.sites.coin_website" target="_blank"><icon name="link" scale="1.5"></icon></a>
          </span>
          <span v-if="selectedCryptoCurrency.mnpdata.sites.coin_ann" class="icon">
            <a :href="selectedCryptoCurrency.mnpdata.sites.coin_ann" target="_blank"><icon name="file-text" scale="1.5"></icon></a>
          </span>
          <span v-if="selectedCryptoCurrency.mnpdata.sites.coin_github" class="icon">
            <a :href="selectedCryptoCurrency.mnpdata.sites.coin_github" target="_blank"><icon name="github" scale="1.5"></icon></a>
          </span>
        </div>
      </div>
      <div class="column information-section" :class="{'information-section-iframe': isOpenedInIFrame}">
        <div class="dropdown-section hide" :class="{'show': isOpenedInIFrame}">
          <div class="control">
            <button class="button" type="button" @click="toggleDropDown">
              {{ selectedFiatCurrency }}
              <span class="arrow-icon">
                <icon v-if="!dropDownOpen" name="caret-down" height="13"></icon>
                <icon v-if="dropDownOpen" name="caret-up" height="13"></icon>
              </span>
            </button>

            <div class="box dropdown" :class="{'is-open': dropDownOpen, 'transparent': isOpenedInIFrame}">
              <ul>
                <li v-for="fiatCurrency in fiatCurrencies"><a class="nav-item" :class="{'font-white': isOpenedInIFrame}"@click="selectFiatCurrency(fiatCurrency)">{{ fiatCurrency }}</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div class="price-section price-select-section" :class="{'price-section-iframe': isOpenedInIFrame}">
          <p class="price-tag price-select-tag">Current Price</p>
          <div class="control" :class="{'hide': isOpenedInIFrame}">
          </div>
          <p class="price-amount" :class="{'price-amount-iframe': isOpenedInIFrame}">{{ selectedFiatCurrency }} {{ selectedCryptoCurrency.selectedPrice }}
            <span :class="{'positive-percent-change': selectedCryptoCurrency.positivePercentChange, 'negative-percent-change': !selectedCryptoCurrency.positivePercentChange}">
              ({{ selectedCryptoCurrency.percentChange24h }}%)
              <sub>
                <a class="is-primary percent-tooltip tooltip" style="color:#4e4f51 "><icon name="info-circle" height="15" width="15"></icon>
                  <span class="tooltiptext">24h percent change</span>
                </a>
              </sub>
            </span>
          </p>
        </div>
        <div class="price-section" :class="{'price-section-iframe': isOpenedInIFrame}">
          <p class="masternode-tag">MasterNode Info [Coins Required / Worth($)]</p>
          <!--<p class="masternode-info-tag">Coins Required / Worth</p>-->
          <p class="masternode-amount" :class="{'price-amount-iframe': isOpenedInIFrame}">{{ selectedCryptoCurrency.stats.masterNodeCoinsRequired }} / {{ selectedCryptoCurrency.stats.masterNodeWorth }} $</p>
        </div>
        <div class="price-section" :class="{'price-section-iframe': isOpenedInIFrame}">
          <p class="masternode-tag">Active MasterNode Count</p>
          <!--<p class="masternode-info-tag">Coins Required / Worth</p>-->
          <p class="masternode-amount" :class="{'price-amount-iframe': isOpenedInIFrame}">{{ selectedCryptoCurrency['Master Node Count'] }}</p>
        </div>
        <div class="price-section price-select-section" :class="{'price-section-iframe': isOpenedInIFrame}">
          <p class="masternode-tag">Income [Dollar Based - Coin Based]</p>
          <ul class="price-amount" :class="{'price-amount-iframe': isOpenedInIFrame}">
            <li class="income">Daily:  <span :class="{'positive-percent-change': selectedCryptoCurrency['Daily Income'] , 'negative-percent-change': !selectedCryptoCurrency['Daily Income']}">{{ selectedCryptoCurrency['Daily Income']}} $<span class="incomeHyphen"> - </span>({{selectedCryptoCurrency['DailyIncomeBasedCoin']}} {{selectedCryptoCurrency.coin.toUpperCase()}})</span></li>
            <li class="income">Weekly: <span :class="{'positive-percent-change': selectedCryptoCurrency['Weekly Income'] , 'negative-percent-change': !selectedCryptoCurrency['Weekly Income']}">{{ selectedCryptoCurrency['Weekly Income']}} $<span class="incomeHyphen"> - </span>({{selectedCryptoCurrency['WeeklyIncomeBasedCoin']}} {{selectedCryptoCurrency.coin.toUpperCase()}})</span></li>
            <li class="income">Monthly:  <span :class="{'positive-percent-change': selectedCryptoCurrency['Monthly Income'] , 'negative-percent-change': !selectedCryptoCurrency['Monthly Income']}">{{ selectedCryptoCurrency['Monthly Income']}} $<span class="incomeHyphen"> - </span>({{selectedCryptoCurrency['MonthlyIncomeBasedCoin']}} {{selectedCryptoCurrency.coin.toUpperCase()}})</span></li>
            <li class="income">Yearly:  <span :class="{'positive-percent-change': selectedCryptoCurrency['Yearly Income'] , 'negative-percent-change': !selectedCryptoCurrency['Yearly Income']}">{{ selectedCryptoCurrency['Yearly Income']}} $<span class="incomeHyphen"> - </span>({{selectedCryptoCurrency['YearlyIncomeBasedCoin']}} {{selectedCryptoCurrency.coin.toUpperCase()}})</span></li>
          </ul>
        </div>
        <div class="price-section" :class="{'price-section-iframe': isOpenedInIFrame}">
          <p class="price-tag">Roi</p>
          <p class="price-amount" :class="{'price-amount-iframe': isOpenedInIFrame}"><span :class="'positive-percent-change'" >{{ selectedCryptoCurrency.roi }}%</span></p>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { store } from '../../store.js'

const fiatCurrencies = [ 'AUD', 'BRL', 'CAD', 'CHF', 'CNY', 'EUR', 'GBP', 'HKD', 'IDR', 'INR', 'JPY', 'USD', 'KRW', 'MXN', 'RUB' ]
const cryptoCurrencyData = require('../../cryptocurrency-data.json')

export default {
  name: 'selectedHero',
  data () {
    return {
      sharedState: store.state,
      selectedCryptoCurrency: {},
      fiatCurrencies: fiatCurrencies,
      selectedFiatCurrency: fiatCurrencies[11],
      positivePercentChange: true,
      negativePercentChange: false,
      dropDownOpen: false,
      isOpenedInIFrame: false
    }
  },
  created () {
    this.selectCryptoCurrency()

    if (window.self !== window.top) {
      this.isOpenedInIFrame = true
    }
  },
  watch: {
    $route () {
      this.selectCryptoCurrency()
    }
  },
  computed: {
    globalMarketCapUSD () {
      return this.sharedState.totalMarketCapUSD
    },
    selectedCryptoCurrencyMarketCap () {
      return Number(this.selectedCryptoCurrency.market_cap_usd)
    },
    percentageOfMarketCap () {
      const percentageOfMarketCap = Math.round((this.selectedCryptoCurrency.stats.cmc.market_cap_usd/ this.sharedState.totalMarketCapUSD) * 100) //burası
      return `~ ${percentageOfMarketCap}% of the global cryptocurrency market cap!`
    }
  },
  methods: {
    toggleDropDown () {
      this.dropDownOpen = !this.dropDownOpen
    },
    selectCryptoCurrency: function () {
      let cryptoCurrency
      if (this.sharedState.cryptoCurrencies.length === 0 || !this.sharedState.cryptoCurrencies) {
        this.axios.get(`https://masternodes.pro/apiv2/coin/stats/${this.$route.params.id}/`)
          .then(response => {
            cryptoCurrency = response.data
            cryptoCurrency = this.manipulateCryptoCurrency(cryptoCurrency)
            this.selectedCryptoCurrency = this.addImageAndDescription(cryptoCurrency)
          }).catch((err) => {/*console.log(err)*/})
      } else {
        cryptoCurrency = this.sharedState.cryptoCurrencies.filter((obj) => {
          return obj.coin === this.$route.params.id
        })[0]
        this.selectedCryptoCurrency = this.manipulateCryptoCurrency(cryptoCurrency)
        this.selectedCryptoCurrency = this.addImageAndDescription(cryptoCurrency)
      }
    },
    selectFiatCurrency (fiatCurrencyEvent) {
      this.selectedFiatCurrency = fiatCurrencyEvent.target ? fiatCurrencyEvent.target.value : fiatCurrencyEvent
      this.axios.get(`https://masternodes.pro/apiv2/coin/stats/${this.selectedCryptoCurrency.id}`)
        .then(cryptoCurrency => {
          this.toggleDropDown()
          this.selectedCryptoCurrency.selectedPrice = Number(cryptoCurrency.data[0]['price_' + this.selectedFiatCurrency.toLowerCase()]).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
          this.selectedCryptoCurrency.selectedMarketCap = Number(cryptoCurrency.data[0]['market_cap_' + this.selectedFiatCurrency.toLowerCase()]).toLocaleString()
        })
    },
    manipulateCryptoCurrency (cryptoCurrency) {
      cryptoCurrency.selectedPrice = Number(cryptoCurrency.stats.cmc.price_usd).toFixed(3)
      cryptoCurrency.selectedSupply = Number(cryptoCurrency.stats.cmc.available_supply).toLocaleString()
      cryptoCurrency.selectedMarketCap = Number(cryptoCurrency.stats.cmc.market_cap_usd).toLocaleString()
      return cryptoCurrency
    },
    addImageAndDescription (cryptoCurrency) {
      cryptoCurrency.id =  cryptoCurrency.stats.cmc.name in cryptoCurrencyData ? cryptoCurrency.stats.cmc.name : cryptoCurrency.coin;
      cryptoCurrency.description = cryptoCurrencyData[cryptoCurrency.id].description;
      cryptoCurrency.website = cryptoCurrency.href;
      cryptoCurrency.paper = cryptoCurrency.mnpdata.sites.coin_ann;
      cryptoCurrency.github = cryptoCurrency.mnpdata.sites.coin_github;
      cryptoCurrency.positivePercentChange = !(cryptoCurrency.stats.cmc.percent_change_24h.toString().indexOf('-') > -1);
      cryptoCurrency.percentChange24h = cryptoCurrency.stats.cmc.percent_change_24h.toString().replace(/^-/, '');
      cryptoCurrency.roi = Number(cryptoCurrency.stats.roi.toString().replace(/^-/, '')).toFixed(2);
      cryptoCurrency['Coins Required']= cryptoCurrency.stats.masterNodeCoinsRequired;
      cryptoCurrency['Current Price'] = Number(cryptoCurrency.stats.cmc.price_usd).toFixed(3)
      cryptoCurrency['Worth'] = Number(cryptoCurrency.stats.masterNodeWorth).toFixed(2)
      cryptoCurrency['Daily Income'] = Number(cryptoCurrency.stats.income.daily.toString().replace(/^-/, '')).toFixed(3);
      cryptoCurrency['DailyIncomeBasedCoin'] = Number(cryptoCurrency.stats.income.daily/cryptoCurrency.stats.cmc.price_usd).toFixed(2);
      cryptoCurrency['Weekly Income'] = Number(cryptoCurrency.stats.income.weekly.toString().replace(/^-/, '')).toFixed(3);
      cryptoCurrency['WeeklyIncomeBasedCoin'] = Number(cryptoCurrency.stats.income.weekly/cryptoCurrency.stats.cmc.price_usd).toFixed(2);
      cryptoCurrency['Monthly Income'] = Number(cryptoCurrency.stats.income.monthly.toString().replace(/^-/, '')).toFixed(3);
      cryptoCurrency['MonthlyIncomeBasedCoin'] = Number(cryptoCurrency.stats.income.monthly/cryptoCurrency.stats.cmc.price_usd).toFixed(2);
      cryptoCurrency['Yearly Income'] = Number(cryptoCurrency.stats.income.yearly.toString().replace(/^-/, '')).toFixed(3);
      cryptoCurrency['YearlyIncomeBasedCoin'] = Number(cryptoCurrency.stats.income.yearly/cryptoCurrency.stats.cmc.price_usd).toFixed(2);
      console.log(cryptoCurrency['YearlyIncomeBasedCoin']);
      cryptoCurrency['Roi'] = Number(cryptoCurrency.stats.roi.toString().replace(/^-/, '')).toFixed(2);
      cryptoCurrency['Master Node Count'] = Number(cryptoCurrency.advStats.masterNodeCount);
      if(cryptoCurrency.coin === 'dash')
        cryptoCurrency['Logo'] = "/static/dash_large_logo.png";
      else
        cryptoCurrency['Logo'] = cryptoCurrency.stats.logo;
      return cryptoCurrency
    }
  }
}
</script>

<style scoped lang="scss">
$small: 590px;
$medium: 768px;
$large: 1024px;


.income {
  color: #cc22af;
}

.incomeHyphen{
  color: #121212;
}

.selected-section {
  position: relative;
  align-items: center;

  @media screen and (max-width: $medium) {
    padding-top: 30px;
  }

  .return-action {
    position: absolute;
    left: 30px;
    color: #FFF;
    cursor: pointer;
    z-index: 10;

    .arrow-left {
      padding-right: 5px;
      color:#4e4f51;
    }

    .arrow-left-iframe {
      color: #fd6721;
    }

    .return-text {
      font-size: 11px;
      color:#4e4f51;

      @media screen and (max-width: $medium) {
        display: none;
      }
    }
  }

  .return-action-iframe {
    top: -10px;
  }

  .image-section {
    position: relative;

    .cryptoCurrency-image {
      height: 200px;

      -webkit-animation-name: spinner;
      -webkit-animation-timing-function: linear;
      -webkit-animation-iteration-count: infinite;
      -webkit-animation-duration: 60s;
      animation-name: spinner;
      animation-timing-function: linear;
      animation-iteration-count: 1;
      animation-duration: 60s;
      -webkit-transform-style: preserve-3d;
      -moz-transform-style: preserve-3d;
      -ms-transform-style: preserve-3d;
      transform-style: preserve-3d;
    }

    .cryptoCurrency-image-iframe {
      height: 80px;
    }

    .cryptoCurrency-title {
      font-size: 20px;
      color:#4e4f51;
      font-weight: 600;
    }

    .cryptoCurrency-title-iframe {
      font-size: 16px;
    }

    .tag-iframe {
      font-size: 0.63rem;
    }

    .cryptoCurrency-description {
      font-size: 14px;
      line-height: 1.65;
      max-width: 450px;
      display: block;
      color:#4e4f51;
      margin: 0 auto;
      padding: 20px 0 30px;

      @media screen and (max-width: $medium) {
        font-size: 12px;
        max-width: 300px;
      }
    }

    .cryptoCurrency-description-iframe {
      font-size: 11px;
      padding-top: 10px;
      padding-bottom: 15px;
      line-height: 1.5;
      max-width: 425px;
    }

    .icons-section {
      color: #4e4f51;
      height: 0px;

      .icon {
        margin: 0px 30px;
        -o-transition: .5s;
        -ms-transition: .5s;
        -moz-transition: .5s;
        -webkit-transition: .5s;
        transition: .5s;

        &:hover {
          color: #fd6721;
        }
      }
    }
  }

  .information-section {
    position: relative;
    padding-top: 25px;

    .dropdown-section {
      position: absolute;
      right: 50px;

      @media screen and (max-width: $medium) {
        right: 20px;
      }

      .control {
        text-align: center;

        .button {
          font-size: 11px;
          width: 50px;
          color: #1e1335;
          position: relative;

          &:focus {
            border-color: #FFF;
          }

          .arrow-icon {
            position: absolute;
            right: 2px;
            bottom: 1px;
            color: #fd6721;
          }
        }

        .box {
          padding: 7px;
          background-color: transparent;
        }

        .dropdown {
          width: 50px;
          box-shadow: 0 0 3px 0 #fd6721;
          display: none;
          left: 0;
          position: absolute;
          top: 100%;
          z-index: 1000;
          height: 150px;
          overflow-y: scroll;
          background-color: #FFF;

          ul {
          }

          &.is-open {
            display: block;
          }

          .nav-item {
            font-size: 11px;
            //color: #1e1335;
            color:#4e4f51;
            -o-transition: .5s;
            -ms-transition: .5s;
            -moz-transition: .5s;
            -webkit-transition: .5s;
            transition: .5s;

            &:hover {
              color: #fd6721;
            }
          }
        }
      }
    }

    .price-section {
      text-align: left;
      padding: 20px 0;


      @media screen and (max-width: $medium) {
        text-align: center;
      }

      .price-tag {
        font-weight: bold;
        color: #108dc7;
      }

      .masternode-tag {
        font-size: 20px;
        font-weight: bold;
        color: #108dc7;
      }

      .masternode-info-tag {
        color: #108dc7;
      }

      .masternode-amount {
        font-size: 40px;
        color:#4e4f51;
      }

      .price-select-tag {
        display: inline-block;
      }

      .control {
        display: inline-block;
        float: right;
        margin-right: 30px;
        font-size: 0.80rem;
        .select {
          select {
            padding-right: 1.2em;
          }
          &:after {
            right: 0.55em;
            border: 1px solid #fd6721;
            border-top: 0;
            border-right: 0;
          }
        }

        @media screen and (max-width: $medium) {
          display: block;
          text-align: center;
          float: none;
          margin-right: 0px;
        }
      }

      .price-amount {
        font-size: 40px;
        color:#4e4f51;

        .positive-percent-change {
          color: #156b20;
        }

        .negative-percent-change {
          color: #ff3860;
        }

        .percent-tooltip {
          color: #FFF;
          text-align: center;
          font-size: 10px;
          font-weight: 500;
          cursor: initial;
        }

        @media screen and (max-width: $medium) {
          font-size: 30px;
        }
      }

      .market-cap-price-amount {
        display: inline-block;
      }

      .doughnut-chart {
        display: block;
        text-align: center;
        font-weight: 500;
        width: 50px;
        margin: 0 auto;
      }

      .price-amount-iframe {
        font-size: 20px;
        font-weight: 600;
      }
    }

    .price-select-section {
      @media screen and (min-width: $medium) {
      }
    }

    .price-section-iframe {
      padding: 10px 0;
    }
  }

  .information-section-iframe {
  }
}

.tooltip {
  position: relative;
  display: inline-block;
  border-bottom: 1px dotted black;

  &:hover .tooltiptext {
    visibility: visible;
  }

  .tooltiptext {
    visibility: hidden;
    width: 120px;
    background-color: #383838;
    font-size: 11px;
    font-weight: 500;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 5px 0;

    /* Position the tooltip */
    position: absolute;
    z-index: 1;
    top: 100%;
    left: 50%;
    margin-left: -60px;
  }
}

.doughnut-tooltip {
  .tooltiptext {
    top: 110%;
  }
}

.hide {
  display: none !important;
}

.show {
  display: block !important;
}

.no-padding {
  padding: 0px;
}

.transparent {
  background-color: transparent !important;
}

.font-white {
  color: #FFF !important;
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

::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 7px;
}
::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background-color: #FFF;
    -webkit-box-shadow: 0 0 1px rgba(255,255,255,.5);
}
</style>
