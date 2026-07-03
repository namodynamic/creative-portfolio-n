import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { Code } from "bright";

import type { FC } from "react";

export type CodeBlockProps = SliceComponentProps<Content.CodeBlockSlice>;

type CodeBlockNode = {
  type?: string;
  text?: string;
};

const languageMap = {
  typeScript: "typescript",
  tsx: "tsx",
  javascript: "javascript",
  jsx: "jsx",
  bash: "bash",
  json: "json",
  css: "css",
  html: "html",
} satisfies Record<
  NonNullable<Content.CodeBlockSliceDefaultPrimary["language"]>,
  string
>;

function isCodeBlockNode(block: unknown): block is CodeBlockNode {
  return typeof block === "object" && block !== null && "text" in block;
}

function extractCode(
  field: Content.CodeBlockSliceDefaultPrimary["code"],
): string {
  if (!Array.isArray(field)) return "";

  return field
    .filter(isCodeBlockNode)
    .filter(
      (block) => block.type === "preformatted" || block.type === "paragraph",
    )
    .map((block) => block.text?.trimEnd() ?? "")
    .join("\n")
    .trim();
}

Code.theme = "github-dark";

const CodeBlock: FC<CodeBlockProps> = ({ slice }) => {
  const { caption, code, filename, language } = slice.primary;
  const codeText = extractCode(code);
  const normalizedLanguage = languageMap[language ?? "typeScript"];

  if (!codeText) return null;

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="not-prose my-8"
    >
      <figure className="flex flex-col gap-3">
        <Code
          lang={normalizedLanguage}
          title={filename || undefined}
          lineNumbers
          className="m-0 rounded-xl! text-sm leading-relaxed shadow-sm"
        >
          {codeText}
        </Code>

        {caption && (
          <figcaption className="text-muted-foreground text-center text-sm">
            {caption}
          </figcaption>
        )}
      </figure>
    </section>
  );
};

export default CodeBlock;
