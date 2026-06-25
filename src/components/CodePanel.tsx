import type {ReactNode} from 'react';

type Props = {
  children: ReactNode;
};

/** Wraps tabbed code examples in a single bordered panel (OpenRouter-style). */
export default function CodePanel({children}: Props): ReactNode {
  return <div className="code-panel">{children}</div>;
}
