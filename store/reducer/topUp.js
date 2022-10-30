const initialState = {
  data: {},
  isLoading: false,
  isError: false,
  message: "",
};

const topUp = (state = initialState, action) => {
  switch (action.type) {
    case `TOP_UP_SALDO_PENDING`: {
      return {
        ...state,
        isLoading: true,
        data: {},
      };
    }
    case `TOP_UP_SALDO_FULFILLED`: {
      return {
        ...state,
        isLoading: false,
        data: action.payload.data.data,
      };
    }
    case `TOP_UP_SALDO_REJECTED`: {
      return {
        ...state,
        isLoading: false,
        data: action.payload.response.data,
      };
    }
    default: {
      return state;
    }
  }
};

export default topUp;
