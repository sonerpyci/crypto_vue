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
  api_url: 'https://api.masternodeum.com/registration',
  state: {
    isCurrenciesReady: false,
    totalMarketCapUSD: 0,
    isBtcReady:false,
    btcDominance: 0,
    btc: {},
    statusArray : [
      'Active',
      'Maintenance'
    ],
    cryptoCurrencies: []
  },
  getCryptoCurrencies: function () {
    let promises = [];
    let responses = [];

    promises.push(
      new Promise ( (resolve, reject) => {
        get(this.api_url).then((response) => {
          //this.state.cryptoCurrencies.push(response.data);
          for (let i = 0; i<response.data.length; i++){
            let temp = response.data[i];
            //console.log(temp);
            try{
              if( (typeof temp === "object") && (temp !== null) )
                this.getPercentChange (temp);
            }
            catch(err){
              console.log('Error found in currency:  ', err );
            }
            responses.push(temp);
            resolve();
          }
        }).catch(reject)
      })
    )

    Promise.all(promises).then(() => {
      this.state.cryptoCurrencies = responses;
    });
  },
  getDifferenceInChange (cryptoCurrency) {

    cryptoCurrency['positivePercentChange'] = !(cryptoCurrency['Registered_coins'][cryptoCurrency['Registered_coins'].length-1]['percentChange24h'].toString().indexOf('-') > -1);
    cryptoCurrency['percentChange24h'] = cryptoCurrency['Registered_coins'][cryptoCurrency['Registered_coins'].length-1]['percentChange24h'].toString().replace(/^-/, '');
    cryptoCurrency['coin'] = cryptoCurrency.coinTicker.toLowerCase();
    cryptoCurrency['Coins Required']= cryptoCurrency.collateralAmount;
    cryptoCurrency['Current Price'] = (cryptoCurrency['Registered_coins'][cryptoCurrency['Registered_coins'].length-1]['currentPrice'] * parseFloat(this.state.btc.selectedPrice.replace(",",""))).toFixed(3)
    cryptoCurrency['Worth'] = Number(cryptoCurrency['Registered_coins'][cryptoCurrency['Registered_coins'].length-1]['worth']).toFixed(2);
    cryptoCurrency['rank'] = Number(cryptoCurrency['Registered_coins'][cryptoCurrency['Registered_coins'].length-1]['rank']);
    cryptoCurrency['Daily Income'] = Number(cryptoCurrency['Registered_coins'][cryptoCurrency['Registered_coins'].length-1]['dailyIncome'].toString().replace(/^-/, '')).toFixed(3);
    //cryptoCurrency['Weekly Income'] = Number(cryptoCurrency['Registered_coins'][cryptoCurrency['Registered_coins'].length-1]['dailyIncome'].toString().replace(/^-/, '')).toFixed(3);
    cryptoCurrency['Monthly Income'] = Number(cryptoCurrency['Registered_coins'][cryptoCurrency['Registered_coins'].length-1]['monthlyIncome'].toString().replace(/^-/, '')).toFixed(3);
    cryptoCurrency['Yearly Income'] = Number(cryptoCurrency['Registered_coins'][cryptoCurrency['Registered_coins'].length-1]['yearlyIncome'].toString().replace(/^-/, '')).toFixed(3);
    cryptoCurrency['Roi'] = Number(cryptoCurrency['Registered_coins'][cryptoCurrency['Registered_coins'].length-1]['roi'].toString().replace(/^-/, '')).toFixed(2);
    cryptoCurrency['Master Node Count'] = Number(cryptoCurrency['Registered_coins'][cryptoCurrency['Registered_coins'].length-1]['masternode_count']);
    //let randomNumber = Math.floor(Math.random()*this.state.statusArray.length);
    cryptoCurrency['Status'] = this.state.statusArray[0];

    if(cryptoCurrency.coinName === 'Dash')
      cryptoCurrency['Logo'] = "/static/dash_large_logo.png";
    else
      cryptoCurrency['Logo'] = cryptoCurrency.coinLogo;
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
    let promises = [];
    const getUrl = 'https://api.coinmarketcap.com/v1/global/'
    promises.push(
      new Promise ( (resolve, reject) => {
        get(getUrl).then((response) => {
          const globalData = response.data
          this.state.totalMarketCapUSD = globalData.total_market_cap_usd
          this.state.btcDominance = globalData.bitcoin_percentage_of_market_cap
          resolve();
        }).catch(reject)
      })
    );
    Promise.all(promises).then(() => {
      this.state.isBtcReady = true
    });
  },
  getPercentChange (cryptoCurrency) {
    this.getDifferenceInChange (cryptoCurrency);
    return cryptoCurrency.percentChange24h
  },
  getBtcInfo () {
    this.selectedFiatCurrency = 'USD';
    return new Promise ( (resolve, reject) => {
      get(`https://api.coinmarketcap.com/v2/ticker/1/?convert=${this.selectedFiatCurrency}`).then((cryptoCurrency) => {
        this.state.btc.selectedPrice = Number(cryptoCurrency.data.data['quotes'][this.selectedFiatCurrency]['price']).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        this.state.btc.selectedMarketCap = Number(cryptoCurrency.data.data['quotes'][this.selectedFiatCurrency]['market_cap']).toLocaleString()
        resolve();
      }).catch(reject)
    })

  }

}
