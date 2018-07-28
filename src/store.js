import Vue from 'vue'
import {get}  from 'axios'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

//  const getUrl = 'https://api.coinmarketcap.com/v1/ticker/?limit=10'
const cryptoCurrencyData = require('./cryptocurrency-data.json')

export const store = {
  //cryptoCompareUrl: 'https://min-api.cryptocompare.com/data/top/totalvol?tsym=USD&limit=500',
  cryptoCompareUrl: 'https://masternodes.pro/apiv2/coin/stats/',
  state: {
    isCurrenciesReady: false,
    totalMarketCapUSD: 0,
    cryptoCurrencies: []
  },
  getCryptoCurrencies: function () {
    let promises = [];
    let responses = [];
    let coinFilter = ["Dash","Pivx","Bitg","xzc","pac","bsd","SIB", "smart", "ION", "GIN"];
      for (let i = 0; i<coinFilter.length; i++) {
        promises.push(
          new Promise ( (resolve, reject) => {
            get(this.cryptoCompareUrl + coinFilter[i]).then((response) => {
              //this.state.cryptoCurrencies.push(response.data);
              let temp = response.data;
              console.log(response);
              try{
                if(temp != null)
                  this.getPercentChange (temp);
              }
              catch(err){

                //console.log('Error found in currency:  ' , temp);
              }
              if(temp != null)
                responses.push(temp);

              resolve();
            }).catch(reject)

          })
        )
      }
      Promise.all(promises).then(() => {
        this.state.cryptoCurrencies = responses;
      });

  },
  getDifferenceInChange (cryptoCurrency) {
    cryptoCurrency.positivePercentChange = !(cryptoCurrency.stats.cmc.percent_change_24h.toString().indexOf('-') > -1)
    cryptoCurrency.percentChange24h = cryptoCurrency.stats.cmc.percent_change_24h.toString().replace(/^-/, '')
  },
  addImageAndDescription(cryptoCurrency) {
    cryptoCurrency.id =  cryptoCurrency.stats.cmc.id in cryptoCurrencyData ? cryptoCurrency.stats.cmc.id : undefined;
    cryptoCurrency.description = cryptoCurrencyData[cryptoCurrency.id].description;
    cryptoCurrency.website = cryptoCurrency.href;
    cryptoCurrency.paper = cryptoCurrency.mpndata.sites.coin_ann;
    cryptoCurrency.github = cryptoCurrency.mpndata.sites.coin_github;
    cryptoCurrency.positivePercentChange = !(cryptoCurrency.stats.cmc.percent_change_24h.indexOf('-') > -1);
    cryptoCurrency.percentChange24h = cryptoCurrency.stats.cmc.percent_change_24h.replace(/^-/, '');
  },
  getTotalMarketCapUSD() {
    const getUrl = 'https://api.coinmarketcap.com/v1/global/'
    axios.get(getUrl).then((response) => {
      const globalData = response.data
      this.state.totalMarketCapUSD = globalData.total_market_cap_usd
    })
  },
  getPercentChange (cryptoCurrency) {
    this.getDifferenceInChange (cryptoCurrency);
    return cryptoCurrency.percentChange24h
  }
}
