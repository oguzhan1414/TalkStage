import { Fragment, type ReactNode } from "react";

/**
 * Renders translated text that contains simple tags, e.g.
 *   rich(t("Yaz: <b>{{mail}}</b> adresine.", { mail }), { b: (c) => <strong>{c}</strong> })
 * Keeps whole sentences in one translation unit so word order can change per language.
 */
export function rich(text: string, tags: Record<string, (children: ReactNode) => ReactNode>): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /<(\w+)>([\s\S]*?)<\/\1>/g;
  let last = 0;
  let i = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const wrap = tags[m[1]];
    out.push(<Fragment key={i++}>{wrap ? wrap(m[2]) : m[2]}</Fragment>);
    last = re.lastIndex;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}
