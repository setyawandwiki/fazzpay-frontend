const initialState = {
  data: {},
  isLoading: false,
  isError: false,
  message: "",
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case "GET_USER_DATA_BY_ID_PENDING": {
      return {
        ...state,
        data: {},
      };
    }
    case "GET_USER_DATA_BY_ID_FULFILLED": {
      return {
        ...state,
        data: action.payload.data.data,
      };
    }
    case "GET_USER_DATA_BY_ID_REJECTED": {
      return {
        ...state,
        data: {},
        isError: true,
        isLoading: false,
        // message: action.payload.response.data.msg,
      };
    }
    case "UPDATE_PHONE_USER_PENDING": {
      return {
        ...state,
        isLoading: true,
        data: {},
      };
    }
    case "UPDATE_PHONE_USER_FULFILLED": {
      return {
        ...state,
        isLoading: false,
        data: action.payload.data.data,
        message: action.payload.data.msg,
      };
    }
    case "UPDATE_PHONE_USER_REJECTED": {
      return {
        ...state,
        data: {},
        isError: false,
        isLoading: false,
        message: action.payload.data.msg,
      };
    }
    case "UPDATE_PASSWORD_USER_PENDING": {
      return {
        ...state,
        isLoading: true,
        data: {},
      };
    }
    case "UPDATE_PASSWORD_USER_FULFILLED": {
      return {
        ...state,
        isLoading: false,
        data: action.payload.data.data,
        message: action.payload.data.msg,
      };
    }
    case "UPDATE_PASSWORD_USER_REJECTED": {
      return {
        ...state,
        data: {},
        isError: true,
        isLoading: false,
        message: action.payload.response.data.msg,
      };
    }
    case "CHECK_PIN_USER_PENDING": {
      return {
        ...state,
        isLoading: true,
        data: {},
      };
    }
    case "CHECK_PIN_USER_FULFILLED": {
      return {
        ...state,
        isLoading: false,
        data: action.payload.data.data,
        message: action.payload.data.msg,
      };
    }
    case "CHECK_PIN_USER_REJECTED": {
      return {
        ...state,
        data: {},
        isError: true,
        isLoading: false,
        message: action.payload.response.data.msg,
      };
    }
    case "CHANGE_PIN_USER_PENDING": {
      return {
        ...state,
        isLoading: true,
        data: {},
      };
    }
    case "CHANGE_PIN_USER_FULFILLED": {
      return {
        ...state,
        isLoading: false,
        data: action.payload.data.data,
        message: action.payload.data.msg,
      };
    }
    case "CHANGE_PIN_USER_REJECTED": {
      return {
        ...state,
        data: {},
        isError: true,
        isLoading: false,
        message: action.payload.response.data.msg,
      };
    }
    case "CHANGE_PHOTO_USER_PENDING": {
      return {
        ...state,
        isLoading: true,
        data: {},
      };
    }
    case "CHANGE_PHOTO_USER_FULFILLED": {
      return {
        ...state,
        isLoading: false,
        data: action.payload.data.data,
        message: action.payload.data.msg,
      };
    }
    case "CHANGE_PHOTO_USER_REJECTED": {
      return {
        ...state,
        data: {},
        isError: true,
        isLoading: false,
        message: action.payload.response.data.msg,
      };
    }
    case "CHANGE_PROFILE_USER_PENDING": {
      return {
        ...state,
        isLoading: true,
        data: {},
      };
    }
    case "CHANGE_PROFILE_USER_FULFILLED": {
      return {
        ...state,
        isLoading: false,
        data: action.payload.data.data,
        message: action.payload.data.msg,
      };
    }
    case "CHANGE_PROFILE_USER_REJECTED": {
      return {
        ...state,
        data: {},
        isError: true,
        isLoading: false,
        message: action.payload.data.msg,
      };
    }
    case "DELETE_PHOTO_USER_PENDING": {
      return {
        ...state,
        isLoading: true,
        data: {},
      };
    }
    case "DELETE_PHOTO_USER_FULFILLED": {
      return {
        ...state,
        isLoading: false,
        data: action.payload.data.data,
        message: action.payload.data.msg,
      };
    }
    case "DELETE_PHOTO_USER_REJECTED": {
      return {
        ...state,
        data: {},
        isError: true,
        isLoading: false,
        message: action.payload.response.data.msg,
      };
    }
    default: {
      return state;
    }
  }
};

export default user;
