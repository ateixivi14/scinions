const initialState = {
    loading: false,
    account: null,
    balance: null, 
    web3: null,
    errorMsg: "",
  };
  
  const blockchainReducer = (state = initialState, action) => {
    switch (action.type) {
      case "CONNECTION_REQUEST":
        return {
          ...initialState,
          loading: true,
        };
      case "CONNECTION_SUCCESS":
        return {
          ...state,
          loading: false,
          balance: action.payload.balance,
          account: action.payload.account,
          web3: action.payload.web3,
        };
      case "CONNECTION_FAILED":
        return {
          ...initialState,
          loading: false,
          errorMsg: action.payload,
        };
      case "UPDATE_ACCOUNT":
        return {
          ...state,
          account: action.payload.account,
          balance: action.payload.balance,
        };
      default:
        return state;
    }
  };
  
  export default blockchainReducer;