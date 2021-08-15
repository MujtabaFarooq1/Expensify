import authReducer from "../../reducers/auth";

test("should set default state", () => {
  const state = authReducer(undefined, { type: "@@INIT" });
  expect(state).toEqual({});
});

test("should login and store uid in state", () => {
  const uid = "abc";
  const action = { type: "LOGIN", uid };
  const state = authReducer({}, action);
  expect(state.uid).toBe(uid);
});

test("should logout and store uid in state", () => {
  const action = { type: "LOGOUT" };
  const state = authReducer({ uid: "24234" }, action);
  expect(state).toEqual({});
});
