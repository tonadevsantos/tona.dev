import "./bread-crumbs.scss";

export interface BreadCrumbs {
  crumbs: { label: string; href?: string }[];
}

export function BreadCrumbs({ crumbs }: BreadCrumbs) {
  return (
    <p>
      {crumbs.map(({ href, label }, index) => (
        <span key={label}>
          {typeof href === "string" ? (
            <a className="bread-crumbs__link" href={href}>
              {label}
            </a>
          ) : (
            label
          )}
          {index < crumbs.length - 1 ? " / " : ""}
        </span>
      ))}
    </p>
  );
}

//   <p>
//     <a href="/">Apps</a> / Date Calculator
//   </p>
