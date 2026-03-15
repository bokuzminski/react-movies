import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppSidebar } from "@/components/app-sidebar";
import { DetailedMovieView } from "src/components/detailedMovieView/DetailedMovieView";
import { PopularMovies } from "./pages/PopularMovies";
import { TopRatedMovies } from "./pages/TopRatedMovies";
import { UpcomingMovies } from "src/pages/UpcomingMovies";
import { MoviesByGenre } from "./pages/MoviesByGenre";

export const App = () => {
  return (
    <BrowserRouter>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger />
          </header>
          <div className="flex-1 p-4">
            <Routes>
              <Route path="/" element={<PopularMovies />} />
              <Route path="/top_rated" element={<TopRatedMovies />} />
              <Route path="/upcoming" element={<UpcomingMovies />} />
              <Route path="/genre/:genreId/:genreName" element={<MoviesByGenre />} />
              <Route path="/:movieId" element={<DetailedMovieView />} />
            </Routes>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </BrowserRouter>
  );
};
