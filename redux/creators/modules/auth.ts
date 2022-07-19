import { SagaCreator } from "interfaces/redux";
import ReducerInterface from "interfaces/reducerInterface";
import { put } from "@redux-saga/core/effects";
import produce from "immer";
import { call } from "typed-redux-saga";
import authServices from "../../../services/authServices";
import httpMethod from "../../../services/httpMethod";
import { debug } from "console";

//! Actions
export const authActions = {
  login: "login",
  loginSuccess: "loginSuccess",
  loginFailed: "loginFailed",
  logout: "logout",

  isCheckAuth: "isCheckAuth",
  isCheckAuthSuccess: "isCheckAuthSuccess",
};

//! Sagas
export const authSaga = {
  [authActions.login]: {
    saga: function* ({ payload }) {
      const { username, password, callbacks } = payload;

      try {
        const response: any = yield* call(
          authServices.login,
          username,
          password
        );

        if (response?.status === 200 && response?.data) {
          const { token } = response?.data?.data;
          httpMethod.attachTokenToHeader(token);

          const profileReq: any = yield* call(authServices.getProfile);

          if (profileReq.data) {
            const user = { ...profileReq.data, token };
            authServices.saveUserToStorage(user);
            callbacks?.onSuccess && callbacks.onSuccess(user);
            yield put({
              type: authActions.loginSuccess,
              payload: {
                user,
              },
            });
            return;
          }

          callbacks?.onFailed && callbacks.onFailed(response);
          yield put({
            type: authActions.loginFailed,
          });
        }

        callbacks?.onFailed && callbacks.onFailed(response);
        yield put({
          type: authActions.loginFailed,
        });
      } catch (error) {
        callbacks?.onFailed && callbacks.onFailed(error);
        yield put({
          type: authActions.loginFailed,
        });
      }
    },
  },
  [authActions.logout]: {
    saga: function* () {
      authServices.clearUser();
    },
  },
  [authActions.isCheckAuth]: {
    saga: function* () {
      const user = authServices.getUserInStorage();
      if (user) {
        yield put({
          type: authActions.loginSuccess,
          payload: {
            user,
          },
        });
      } else {
        yield put({
          type: authActions.loginFailed,
        });
      }

      yield put({
        type: authActions.isCheckAuthSuccess,
      });
    },
  },
} as SagaCreator;

//! Reducers
export const authReducer = (
  state = {
    auth: {
      isCheckAuth: true,
      isLogged: false,
      error: null,
      user: {},
    },
  },
  action: ReducerInterface
) => {
  return produce(state, (draftState) => {
    switch (action.type) {
      case authActions.loginSuccess: {
        draftState.auth.isLogged = true;
        draftState.auth.user = action.payload.user;
        break;
      }

      case authActions.loginFailed: {
        draftState.auth.isLogged = false;
        break;
      }

      case authActions.isCheckAuthSuccess: {
        draftState.auth.isCheckAuth = false;
        break;
      }

      default:
        break;
    }
  });
};
