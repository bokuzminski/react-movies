import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppSidebar } from "@/components/app-sidebar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Input } from "@/components/ui/input";
import { DetailedMovieView } from "src/components/detailedMovieView/DetailedMovieView";
import { PopularMovies } from "./pages/PopularMovies";
import { TopRatedMovies } from "./pages/TopRatedMovies";
import { UpcomingMovies } from "src/pages/UpcomingMovies";
import { MoviesByGenre } from "./pages/MoviesByGenre";
import { NotFoundPage } from "./pages/NotFoundPage";

export const App = () => {
  return (
    <BrowserRouter>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-14 shrink-0 items-center gap-4 border-b px-4">
            <SidebarTrigger />
            <Input type="search" placeholder="Search movies..." className="max-w-sm" />
            <ThemeToggle />
          </header>
          <div className="min-w-0 flex-1 p-4">
            <Routes>
              <Route path="/" element={<PopularMovies />} />
              <Route path="/top_rated" element={<TopRatedMovies />} />
              <Route path="/upcoming" element={<UpcomingMovies />} />
              <Route path="/genre/:genreId/:genreName" element={<MoviesByGenre />} />
              <Route path="/:movieId" element={<DetailedMovieView />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </BrowserRouter>
  );
};
