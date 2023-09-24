import { useSearchParams } from "react-router-dom";

export const useUrlPosition = () => {
  const [searchParams] = useSearchParams();
  return [searchParams.get("lat"), searchParams.get("lng")];
};
