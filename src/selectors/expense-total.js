export default (expenses) => {
  if (expenses.length === 0) {
    return 0;
  }
  if (expenses.length === 1) {
    return expenses[0].amount;
  }
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  return expenses.map((expense) => expense.amount).reduce(reducer);
};
