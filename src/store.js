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
    let coinFilter = ["Dash","Bitg","xzc","pac","bsd","xsn","smart", "ION", "GIN"];
      for (let i = 0; i<coinFilter.length; i++) {
        promises.push(
          new Promise ( (resolve, reject) => {
            get(this.cryptoCompareUrl + coinFilter[i]).then((response) => {
              //this.state.cryptoCurrencies.push(response.data);
              let temp = response.data;
              console.log(temp);
              try{
                if( (typeof temp === "object") && (temp !== null) )
                  this.getPercentChange (temp);
              }
              catch(err){
                console.log('Error found in currency:  ' , coinFilter[i] );;
              }
              if(coinFilter[i] === 'Dash')
                temp.stats.Logo = "/static/dash_large_logo.png";

                if( (typeof temp === "object") && (temp !== null) )
                responses.push(temp);
              resolve();
            }).catch(reject)

          })
        )
      }
      Promise.all(promises).then(() => {
        console.log(responses);
        this.state.cryptoCurrencies = responses;
      });

  },
  getDifferenceInChange (cryptoCurrency) {
    cryptoCurrency.positivePercentChange = !(cryptoCurrency.stats.cmc.percent_change_24h.toString().indexOf('-') > -1)
    cryptoCurrency.percentChange24h = cryptoCurrency.stats.cmc.percent_change_24h.toString().replace(/^-/, '')
    cryptoCurrency['Coins Required']= cryptoCurrency.stats.masterNodeCoinsRequired;
    cryptoCurrency['Current Price'] = Number(cryptoCurrency.stats.cmc.price_usd).toFixed(3)
    cryptoCurrency['Worth'] = Number(cryptoCurrency.stats.masterNodeWorth).toFixed(2)
    cryptoCurrency['Daily Income'] = Number(cryptoCurrency.stats.income.daily.toString().replace(/^-/, '')).toFixed(3);
    cryptoCurrency['Weekly Income'] = Number(cryptoCurrency.stats.income.weekly.toString().replace(/^-/, '')).toFixed(3);
    cryptoCurrency['Monthly Income'] = Number(cryptoCurrency.stats.income.monthly.toString().replace(/^-/, '')).toFixed(3);
    cryptoCurrency['Yearly Income'] = Number(cryptoCurrency.stats.income.yearly.toString().replace(/^-/, '')).toFixed(3);
    cryptoCurrency['Roi'] = Number(cryptoCurrency.stats.roi.toString().replace(/^-/, '')).toFixed(2);
    cryptoCurrency['Master Node Count'] = Number(cryptoCurrency.advStats.masterNodeCount);
    if(cryptoCurrency.coin === 'dash')
      cryptoCurrency['Logo'] = "/static/dash_large_logo.png";
    else
      cryptoCurrency['Logo'] = cryptoCurrency.stats.logo;
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
