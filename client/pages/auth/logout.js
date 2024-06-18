import { useEffect } from "react";
import useRequest from "../../hooks/useRequest";

export default () => {
  const { doRequest } = useRequest({
    url: "/api/v1/user/logout",
    method: "post",
    body: {},
    onSuccess: () => Router.push("/"),
  });

  useEffect(() => {
    doRequest();
  }, []);

  return <div> Logging out </div>;
};
