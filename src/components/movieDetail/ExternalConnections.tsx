import { ExternalLink, Facebook, Film, Instagram, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ExternalLinks as ExternalConnectionsType } from "@/api/tmdbTypes";

type ExternalConnectionsProps = {
  homepage: string;
  data: ExternalConnectionsType;
};

export const ExternalConnections = ({ homepage, data }: ExternalConnectionsProps) => {
  const { twitter_id, facebook_id, instagram_id, imdb_id } = data;

  return (
    <div className="flex flex-wrap gap-2">
      {homepage && (
        <Button variant="outline" size="sm" onClick={() => window.open(homepage, "_blank")}>
          <ExternalLink className="size-3.5" />
          Homepage
        </Button>
      )}
      {twitter_id && (
        <Button variant="outline" size="sm" onClick={() => window.open(`https://twitter.com/${twitter_id}`, "_blank")}>
          <Twitter className="size-3.5" />
          Twitter
        </Button>
      )}
      {facebook_id && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => window.open(`https://facebook.com/${facebook_id}`, "_blank")}
        >
          <Facebook className="size-3.5" />
          Facebook
        </Button>
      )}
      {instagram_id && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => window.open(`https://instagram.com/${instagram_id}`, "_blank")}
        >
          <Instagram className="size-3.5" />
          Instagram
        </Button>
      )}
      {imdb_id && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => window.open(`https://www.imdb.com/title/${imdb_id}`, "_blank")}
        >
          <Film className="size-3.5" />
          IMDb
        </Button>
      )}
    </div>
  );
};
