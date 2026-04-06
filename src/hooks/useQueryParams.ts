import { useSearchParams } from "react-router";

export const useQueryParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const q = searchParams.get("q") ?? "";
  const pageParam = Number.parseInt(searchParams.get("page") ?? "1");
  const page = Number.isSafeInteger(pageParam) && pageParam > 0 ? pageParam : 1;

  const setPage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    setSearchParams(params);
  };

  const setSearchQuery = (q: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("q", q.trim());
    params.delete("page");
    setSearchParams(params);
  };

  return { q, page, setPage, setSearchQuery };
};
