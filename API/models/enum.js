const bidStatusEnum = Object.freeze({
  bid: 1,
  deal: 2,
  fail: 3,
});

const dealStatusEnum = Object.freeze({
  bidSuccess: 1,
  paymentAwait: 2,
  paymentDone: 3,
  delivery: 4,
  deliveryDone: 5,
});

module.exports = {
  bidStatusEnum,
  dealStatusEnum,
};
