import { Fragment, type ReactNode } from "react";

/**
 * Split a string into per-word <span class="iw"> wrappers, preserving spaces.
 * Use inside an element that has the .iw-text class for the hover effect.
 */
export function Words({ children }: { children: string }): ReactNode {
  const parts = children.split(/(\s+)/);
  return (
    <>
      {parts.map((p, i) =>
        /^\s+$/.test(p) || p === "" ? (
          <Fragment key={i}>{p}</Fragment>
        ) : (
          <span className="iw" key={i}>{p}</span>
        ),
      )}
    </>
  );
}
