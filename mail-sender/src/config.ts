import { CourierClient } from "@trycourier/courier";

export default {
  PORT: 3000,
  courierAuthToken: "pk_test_N4ERGFQHC54S6QQQR5AKPYTP3PQ1",
  getCourierClient() {
    return CourierClient({ authorizationToken: this?.courierAuthToken });
  },
};
