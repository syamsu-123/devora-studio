import { CodeBlock } from './ui/CodeBlock'
import { EditorWindow } from './ui/EditorWindow'

export function Terminal({ file = 'zsh', lines, footer, className }) {
  return (
    <EditorWindow file={file} bodyClassName="bg-bg" className={className}>
      <CodeBlock lines={lines} gutter={false} className="py-3" />
      {footer ? (
        <p className="border-t border-line px-4 py-2 font-mono text-[11px] text-muted">{footer}</p>
      ) : null}
    </EditorWindow>
  )
}
