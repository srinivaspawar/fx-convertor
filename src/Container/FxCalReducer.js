import fxCalCommonUtils from '../Components/FxCalCommonUtils/FxCalCommonUtils';

const initState = {
  currencyList: [],
  fromValue: '',
  toValue: '',
  toCurrency: '',
  fromCurrency: ''
};

const fxCalReducer = (state = initState, action) => {
  let convertedValue = 0;
  switch (action.type) {
    case 'GET_CURRENCY_LIST':
      const currencies = fxCalCommonUtils.createConversionObject();
      const initCurrency = currencies[0];
      return {
        ...state,
        currencyList: currencies,
        fromCurrency: initCurrency,
        toCurrency: initCurrency
      };
    case 'UPDATE_FROM_CURRENCY':
      convertedValue = fxCalCommonUtils.calConversion(state.fromValue, action.value, state.toCurrency);
      return { ...state, fromCurrency: action.value, toValue: convertedValue };
    case 'UPDATE_TO_CURRENCY':
      convertedValue = fxCalCommonUtils.calConversion(state.fromValue, state.fromCurrency, action.value);
      return { ...state, toCurrency: action.value, toValue: convertedValue };
    case 'UPDATE_FROM_VALUE':
      convertedValue = fxCalCommonUtils.calConversion(action.value, state.fromCurrency, state.toCurrency);
      return { ...state, fromValue: action.value, toValue: convertedValue };
    default:
      return state;
  }
};

export default fxCalReducer;
