class FxCalCommonUtils {
  constructor() {
    this.currencyPairs = {
      AUDUSD: 0.8371,
      CADUSD: 0.8711,
      USDCNY: 6.1715,
      EURUSD: 1.2315,
      GBPUSD: 1.5683,
      NZDUSD: 0.775,
      USDJPY: 119.95,
      EURCZK: 27.6028,
      EURDKK: 7.4405,
      EURNOK: 8.6651
    };

    this.currencyPrecisions = {
      AUD: 2,
      CAD: 2,
      CNY: 2,
      CZK: 2,
      DKK: 2,
      EUR: 2,
      GBP: 2,
      JPY: 0,
      NOK: 2,
      NZD: 2,
      USD: 2
    };

    this.conversionRefObj = {};

    this.getConvetion = (fromValue, fromCurrency, toCurrency) => {
      debugger;
      const currencyDetails = this.conversionRefObj[fromCurrency?.value||fromCurrency]
      [toCurrency?.value||toCurrency];
      if (fromCurrency === toCurrency) {
        return fromValue;
      } else if (currencyDetails.refer && (currencyDetails.refer === 'D' || currencyDetails.refer === 'Inv')) {
        return currencyDetails.value * fromValue;
      } else if (currencyDetails.refer && currencyDetails.refer !== '') {
        const referToBase = this.getConvetion(fromValue, fromCurrency, currencyDetails.refer);
        const referToTerm = this.getConvetion(referToBase, currencyDetails.refer, toCurrency);
        return referToTerm;
      } else {
        alert('Not possible');
        return 0;
      }
    };

    this.convertToPrecision = (type, value) => {
      let precision = this.currencyPrecisions[type];
      if (typeof precision === 'undefined') {
        precision = 2;
      }
      return value.toFixed(precision);
    };

    this.calConversion = (fromValue, fromCurrency, toCurrency) => {
      const convertedValue = this.getConvetion(fromValue, fromCurrency, toCurrency);
      const withPrecision = this.convertToPrecision(toCurrency, convertedValue);
      return withPrecision;
    };

    this.resolveCommonConversion = (row, column, referances) => {
      if (
        referances &&
        referances[row] &&
        referances[column] &&
        referances[column].length > 0 &&
        referances[row].length > 0
      ) {
        const refCurrency = referances[row].find(ele => referances[ele].find(jaf => referances[column].indexOf(jaf) !== -1))
        return refCurrency;
      }
    };

    this.initializeConversionObj = (currencies) => {
      const currPairs = {};
      currencies.forEach(row => {
        currPairs[row] = {};
        currencies.forEach(column => {
          currPairs[row][column] = { refer: row === column ? 'D' : '', value: row === column ? 1 : '' };
        });
      });
      return currPairs;
    };

    this.getRowColReferances = (uniqueCurrencires) => {
      const referances = [];
      uniqueCurrencires.forEach(row => {
        uniqueCurrencires.forEach(column => {
          if (this.currencyPairs[row + column]) {
            if (referances[row]) {
              referances[row].push(column);
            } else {
              referances[row] = [column];
            }
          }
        });
      });
      return referances;
    };

    this.upateReferances = (referances) => {
      const refKeys = Object.keys(referances);
      refKeys.forEach(row => {
        referances[row].forEach(column => {
          const findColumnRows = refKeys.filter(ele => referances[ele].indexOf(column) !== -1);
          findColumnRows.forEach(rowele => {
            if (this.conversionRefObj[row][rowele].refer === '') {
              this.conversionRefObj[row][rowele].refer = column;
            }
            if (this.conversionRefObj[rowele][row] === '') {
              this.conversionRefObj[rowele][row].refer = column;
            }
          });
        })
      })
    };

    this.createConversionObject = () => {
      const currencypairs = Object.keys(this.currencyPairs);
      const uniqueCurrencires = Object.keys(this.currencyPrecisions);
      const completeCurrencyPairs = [];

      currencypairs.forEach(cur => {
        const currnetPair = {
          base: cur.substring(0, 3),
          terms: cur.substring(3, 6),
          value: this.currencyPairs[cur],
          inverted: false
        };
        const invertedPair = {
          base: cur.substring(3, 6),
          terms: cur.substring(0, 3),
          value: 1 / this.currencyPairs[cur],
          inverted: true
        };
        completeCurrencyPairs.push(currnetPair, invertedPair);
      });

      this.conversionRefObj = this.initializeConversionObj(uniqueCurrencires);
      const invertedPairs = {};
      completeCurrencyPairs.forEach(ele => {
        const oldValue = this.conversionRefObj[ele.base][ele.terms];
        if (ele.inverted) {
          invertedPairs[ele.base + ele.terms] = 1 / ele.value;
        }
        this.conversionRefObj[ele.base][ele.terms] = {
          ...oldValue,
          refer: 'D',
          value: ele.value
        };
      });

      this.currencyPairs = { ...this.currencyPairs, ...invertedPairs };
      const rowColReferances = this.getRowColReferances(uniqueCurrencires);
      this.upateReferances(rowColReferances);
      uniqueCurrencires.forEach(row => {
        uniqueCurrencires.forEach(column => {
          if (
            !this.currencyPairs[row + column] &&
            row !== column &&
            this.conversionRefObj[row][column].refer === ''
          ) {
            const refereBase = this.resolveCommonConversion(row, column, rowColReferances);
            const rowData = this.conversionRefObj[row][column];
            this.conversionRefObj[row][column] = { ...rowData, refer: refereBase };
          }
        });
      });
      return uniqueCurrencires;
    };
  }
}

const fxCalCommonUtils = new FxCalCommonUtils();
export default fxCalCommonUtils;
