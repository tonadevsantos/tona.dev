import fullColor from "./firefox-full-color.svg";

export function FirefoxFullColorIcon(
  props: React.ImgHTMLAttributes<HTMLImageElement>,
) {
  return <img src={fullColor.src} alt="Firefox Full Color Icon" {...props} />;
}
