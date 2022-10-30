import axiosClient from "../../util/axios";

export const topUpSaldo = (data) => {
  return {
    type: "TOP_UP_SALDO",
    payload: axiosClient.post(`/transaction/top-up`, data),
  };
};
