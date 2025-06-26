import { Button } from "../components/button";

const year = new Date().getFullYear();
const language =
  typeof navigator === "undefined" ? "en-US" : navigator.language;

export const defaultSearch = new URLSearchParams({
  name: "Visitor",
  color: "violet",
  year: year.toString(),
  place: "Somewhere",
  language,
  emoji: "🍇",
  framework: "Astro",
});

const AVAILABLE_COLORS = ["blue", "pink", "yellow", "white", "violet"] as const;
type Color = (typeof AVAILABLE_COLORS)[number];

function quotify(str: string) {
  return `"${str}"`;
}

function getParam(
  searchParams: URLSearchParams,
  key: string,
  fallback: string,
) {
  const value = searchParams.get(key);
  return value ? value : fallback;
}

function getColorParam(searchParams: URLSearchParams): Color {
  const color = searchParams.get("color");
  return AVAILABLE_COLORS.includes(color as Color)
    ? (color as Color)
    : "yellow";
}

const colorClassMap: Record<Color, string> = {
  blue: "text-tertiary-500",
  pink: "text-link-400",
  yellow: "text-accent-300",
  white: "bg-text-100 text-bg-600",
  violet: "text-icon-200",
};

interface Params {
  name: string;
  value: string;
  description?: string;
}

const getSearch = () => {
  if (typeof window === "undefined") {
    return defaultSearch;
  }

  return new URLSearchParams(window.location.search ?? "");
};

export function PrettyParamsDemo() {
  const searchParams = getSearch();

  const name = getParam(searchParams, "name", "Tona");
  const color = getColorParam(searchParams);
  const year = getParam(searchParams, "year", "1991");
  const place = getParam(searchParams, "place", "MX");
  const language = getParam(searchParams, "language", "es");
  const emoji = getParam(searchParams, "emoji", "👋🏼");
  const framework = getParam(searchParams, "framework", "Astro");

  const params: Params[] = [
    { name: "name", value: quotify(name) },
    { name: "emoji", value: emoji },
    {
      name: "color",
      value: quotify(color),
      description: "Options: blue, pink, yellow, white and violet",
    },
    { name: "year", value: year },
    { name: "place", value: quotify(place) },
    { name: "language", value: quotify(language) },
    { name: "framework", value: quotify(framework) },
  ];

  return (
    <div className="font-sans max-w-md mx-auto m-2">
      {params.map(({ name, value, description }) => (
        <div key={name} className="flex flex-col mb-2">
          <div className="flex-items-center">
            <span className="w-24 text-right pr-2 font-bold">{name}:</span>
            <span className={`flex-1 text-lg ${colorClassMap[color]}`}>
              {value}
            </span>
          </div>
          {description ? (
            <span className="text-sm text-text-600">{description}</span>
          ) : null}
        </div>
      ))}
      <div className="flex justify-end items-center w-full">
        <Button href={`?${defaultSearch.toString()}`}>Start Demo</Button>
      </div>
    </div>
  );
}
