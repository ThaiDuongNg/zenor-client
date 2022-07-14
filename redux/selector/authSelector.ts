import { useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux/creators/modules";

const GetUserSelector = () => {
  const authReducer = useSelector(
    (state: RootState) => state.authReducer.auth
  );
  const { isCheckAuth, isLogged, user } = authReducer
  
  const result = useMemo(() => {
    return {
      isLogged: isLogged,
      isCheckAuth: isCheckAuth,
      user,
    };
  }, [isLogged, isCheckAuth, user]);

  return result;
};

export default GetUserSelector;
