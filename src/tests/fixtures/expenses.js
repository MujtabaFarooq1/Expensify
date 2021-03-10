import moment from "moment";
const expenses = [
  {
    id: 0,
    description: "Gum",
    note: "",
    amount: 287,
    createdAt: 0,
  },
  {
    id: 1,
    description: "Rendt",
    note: "",
    amount: 1087.0,
    createdAt: moment(0).subtract(4, "days").valueOf(),
  },
  {
    id: 2,
    description: "Credit Cart",
    note: "",
    amount: 5087,
    createdAt: moment(0).add(4, "days").valueOf(),
  },
];

export default expenses;
