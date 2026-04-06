import { Link, useLocation } from "react-router-dom";
import { Flame, Star, Calendar, Tag } from "lucide-react";
import Logo from "@/style/Logo.svg?url";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui/sidebar";
import { useFetchGenres } from "@/api/hooks";
import { Skeleton } from "@/components/ui/skeleton";
import { Genre } from "@/api/tmdbTypes";

export function AppSidebar() {
  const { data: genres, isFetching } = useFetchGenres();
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="group-data-[collapsible=icon]:hidden">
        <Link to="/" className="flex items-center justify-center px-2 py-2">
          <img src={Logo} alt="React Movies" className="h-16 w-full max-w-[180px] object-contain object-left" />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Discover</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/")}>
                  <Link to="/">
                    <Flame />
                    <span>Popular</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/top_rated")}>
                  <Link to="/top_rated">
                    <Star />
                    <span>Top Rated</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/upcoming")}>
                  <Link to="/upcoming">
                    <Calendar />
                    <span>Upcoming</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
          <SidebarGroupLabel>Genres</SidebarGroupLabel>
          <SidebarGroupContent>
            {isFetching ? (
              <SidebarMenu>
                {Array.from({ length: 5 }).map((_, i) => (
                  <SidebarMenuItem key={i}>
                    <Skeleton className="h-8 w-full" />
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            ) : (
              <SidebarMenu>
                {(genres || []).map((genre: Genre) => (
                  <SidebarMenuItem key={genre.id}>
                    <SidebarMenuButton asChild isActive={location.pathname.includes(`/genre/${genre.id}`)}>
                      <Link to={`/genre/${genre.id}/${genre.name}`}>
                        <Tag />
                        <span>{genre.name}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            )}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
