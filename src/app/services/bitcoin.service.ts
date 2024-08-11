import axios from 'axios';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'

const MARKET_VALUE_KEY = 'marketValueDB'
const TRANSACTIONS_KEY = 'transactionsDB'

@Injectable({
    providedIn: 'root'
})
export class BitcoinService {
    constructor(private http: HttpClient) {
        const marketValues = JSON.parse(localStorage.getItem(MARKET_VALUE_KEY) || 'null')
        if (!marketValues || marketValues.length === 0) this._saveMarketValues()

        const confirmedTransactions = JSON.parse(localStorage.getItem(TRANSACTIONS_KEY) || 'null')
        if (!confirmedTransactions || confirmedTransactions.length === 0) this._saveConfirmedTransactions()
    }

    public getRate(coins: number) {
        return axios.get(`https://blockchain.info/tobtc?currency=USD&value=${coins}`)
    }

    public async getMarketPrice() {
        const marketValues = JSON.parse(localStorage.getItem(MARKET_VALUE_KEY) || 'null')

        if (marketValues && marketValues.length) {
            console.log('MARKET PRICE FROM CACHE')
            return Promise.resolve(marketValues)
        }

        const res = await axios.get('https://api.blockchain.info/charts/market-price?timespan=1months&format=json&cors=true')
        const { values } = res.data
        return values
    }

    public async getConfirmedTransactions() {
        const confirmedTransactions = JSON.parse(localStorage.getItem(TRANSACTIONS_KEY) || 'null')

        if (confirmedTransactions && confirmedTransactions.length) {
            console.log('TRANSACTIONS FROM CACHE')
            return Promise.resolve(confirmedTransactions)
        }

        const res = await axios.get('https://api.blockchain.info/charts/trade-volume?timespan=1months&format=json&cors=true')
        const { values } = res.data
        return values
    }

    private async _saveMarketValues(): Promise<void> {
        const marketValues = await this.getMarketPrice()
        localStorage.setItem(MARKET_VALUE_KEY, JSON.stringify(marketValues))
    }

    private async _saveConfirmedTransactions(): Promise<void> {
        const confirmedTransactions = await this.getConfirmedTransactions()
        localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(confirmedTransactions))
    }
}