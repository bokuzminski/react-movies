import { ImageOff } from "lucide-react";

const TMDB_PROFILE = "https://image.tmdb.org/t/p/w185";

const PHOTO_WIDTH = 138;
const PHOTO_HEIGHT = 175;

export type CastMemberProps = {
  name: string;
  character: string;
  profilePath: string | null;
};

export function CastMember({ name, character, profilePath }: CastMemberProps) {
  const src = profilePath ? `${TMDB_PROFILE}${profilePath}` : null;

  return (
    <div className="flex flex-col overflow-hidden p-0">
      <div className="flex flex-col items-stretch gap-2 p-3">
        {src ? (
          <img
            src={src}
            alt={name}
            width={PHOTO_WIDTH}
            height={PHOTO_HEIGHT}
            loading="lazy"
            decoding="async"
            className="h-[175px] w-[138px] shrink-0 rounded object-cover object-top"
          />
        ) : (
          <div
            className="flex shrink-0 items-center justify-center rounded bg-muted"
            style={{ width: PHOTO_WIDTH, height: PHOTO_HEIGHT }}
          >
            <ImageOff className="size-8 text-muted-foreground" aria-hidden />
          </div>
        )}
        <div className="min-w-0 space-y-0.5">
          <p className="line-clamp-2 text-sm font-medium text-foreground">{name}</p>
          <p className="line-clamp-2 text-xs font-light text-muted-foreground">{character}</p>
        </div>
      </div>
    </div>
  );
}
