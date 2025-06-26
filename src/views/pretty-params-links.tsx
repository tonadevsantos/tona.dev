import { Button } from "../components/button";
import { EdgeIcon } from "../components/icons/edge-icon";
import { FirefoxFullColorIcon } from "../components/icons/firefox-full-color-icon";
import { prettyParamsLinks } from "../content/links";

const IconMap = {
  Edge: EdgeIcon,
  Firefox: FirefoxFullColorIcon,
};

export function PrettyParamsLinks() {
  const { edge, firefox } = prettyParamsLinks;
  return (
    <div className="py-4 flex justify-center items-center gap-4">
      {[edge, firefox].map((link) => {
        const Icon = IconMap[link.name];
        return (
          <Button
            key={link.name}
            href={link.href}
            className="flex items-center gap-2"
          >
            <Icon className="w-[2.5em] h-[2.5em]" />
            Get for {link.name}
          </Button>
        );
      })}
    </div>
  );
}
