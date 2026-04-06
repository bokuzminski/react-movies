import { useEffect } from "react";
import { useSearchMovies } from "@/api/hooks";
import { MovieList } from "@/components/movieList/MovieList";
import { MovieListSkeleton } from "@/components/movieList/MovieListSkeleton";
import { MoviePagination } from "@/components/movieList/MoviePagination";
import { Empty, EmptyDescription, EmptyIcon, EmptyTitle } from "@/components/ui/empty";
import { Search } from "lucide-react";
import { useQueryParams } from "@/hooks/useQueryParams";

export const SearchResults = () => {
  const { page, setPage, q } = useQueryParams();
  const { data, isFetching } = useSearchMovies(q, page);

  useEffect(() => {
    setPage(1);
  }, [q]);

  if (!q) {
    return (
      <Empty className="mx-auto max-w-md py-16">
        <EmptyIcon>
          <Search className="size-6" />
        </EmptyIcon>
        <EmptyTitle>Search movies</EmptyTitle>
        <EmptyDescription>
          Use the search field above and press Enter to find titles across the whole catalog.
        </EmptyDescription>
      </Empty>
    );
  }

  if (!data && !isFetching) {
    return <h1 className="text-lg font-medium">Error: no data to display.</h1>;
  }

  if (isFetching && !data) {
    return <MovieListSkeleton />;
  }

  if (data && data.results.length === 0) {
    return (
      <Empty className="mx-auto max-w-md py-16">
        <EmptyIcon>
          <Search className="size-6" />
        </EmptyIcon>
        <EmptyTitle>No results</EmptyTitle>
        <EmptyDescription>Nothing matched &ldquo;{q}&rdquo;. Try a different title.</EmptyDescription>
      </Empty>
    );
  }

  return (
    <>
      <h1 className="mb-4 text-xl font-semibold tracking-tight">Results for &ldquo;{q}&rdquo;</h1>
      <MovieList movies={data!.results} />
      {data && data.results.length > 0 && (
        <MoviePagination page={page} totalPages={Math.min(data.total_pages, 500)} onPageChange={setPage} />
      )}
    </>
  );
};
