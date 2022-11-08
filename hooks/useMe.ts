import { useEffect } from "react";
import { useQuery, useReactiveVar } from "@apollo/client";
import { isLoggedInVar } from "../apollo";
import { graphql } from "../src/gql";

export const ME_QUERY = graphql(`
  query me {
    me {
      userName
      avatar
      totalFollowing
      totalFollowers
    }
  }
`);

// Clinet Token 일치 여부 확인
function useMe() {
  const hasToken = useReactiveVar(isLoggedInVar);
  const { data, client } = useQuery(ME_QUERY, {
    skip: !hasToken,
  });

  useEffect(() => {
    if (data?.me === null) {
      console.log(
        "There is token on IS but the token did not work on the backend"
      );
    }
  }, [data]);

  return { data, client };
}

export default useMe;
