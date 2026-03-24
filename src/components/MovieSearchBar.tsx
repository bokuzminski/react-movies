import { FormEvent, useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Input } from "@/components/ui/input";

export function MovieSearchBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const qFromUrl = location.pathname === "/search" ? (searchParams.get("q") ?? "") : "";
  const [value, setValue] = useState(qFromUrl);

  useEffect(() => {
    if (location.pathname === "/search") {
      setValue(qFromUrl);
    }
  }, [location.pathname, qFromUrl]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (trimmed) {
      navigate(`/search?q=${encodeURIComponent(trimmed)}`);
    } else {
      navigate("/search");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full min-w-0 max-w-md" role="search">
      <Input
        type="search"
        name="q"
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="Search movies..."
        autoComplete="off"
        enterKeyHint="search"
        aria-label="Search movies"
      />
    </form>
  );
}
