import axiosClient from "../../util/axios";

export const getUserById = (id) => {
  return {
    type: "GET_USER_DATA_BY_ID",
    payload: axiosClient.get(`/user/profile/${id}`),
  };
};

export const updatePhoneUser = (id, data) => {
  return {
    type: "UPDATE_PHONE_USER",
    payload: axiosClient.patch(`/user/profile/${id}`, data),
  };
};

export const updatePasswordUser = (id, data) => {
  return {
    type: "UPDATE_PASSWORD_USER",
    payload: axiosClient.patch(`/user/password/${id}`, data),
  };
};

export const checkPin = (id) => {
  return {
    type: "CHECK_PIN_USER",
    payload: axiosClient.get(`/user/pin/${id}`),
  };
};

export const changePin = (id, data) => {
  return {
    type: "CHANGE_PIN_USER",
    payload: axiosClient.patch(`/user/pin/${id}`, data),
  };
};

export const changePhoto = (id, data) => {
  return {
    type: "CHANGE_PHOTO_USER",
    payload: axiosClient.patch(`/user/image/${id}`, data),
  };
};

export const changeProfile = (id, data) => {
  return {
    type: "CHANGE_PROFILE_USER",
    payload: axiosClient.patch(`/user/profile/${id}`, data),
  };
};

export const deletePhoto = (id, data) => {
  return {
    type: "DELETE_PHOTO_USER",
    payload: axiosClient.delete(`/user/image/${id}`, data),
  };
};
