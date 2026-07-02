import { Content } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { Code } from "bright";

import type { JSX } from "react";

/**
 * Props for `TextBlock`.
 */
export type TextBlockProps = SliceComponentProps<Content.TextBlockSlice>;

Code.theme = "github-dark";

/**
 * Component for "TextBlock" Slices.
 */
const TextBlock = ({ slice }: TextBlockProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="mb-8"
    >
      <div className="prose prose-neutral dark:prose-invert prose-headings:font-heading prose-headings:text-foreground prose-p:text-muted-foreground prose-p:leading-8 prose-a:text-primary prose-strong:text-foreground prose-li:text-muted-foreground prose-code:text-primary prose-pre:bg-transparent max-w-none">
        <PrismicRichText
          field={slice.primary.text}
          components={{
            label: ({ node, children }) => {
              if (node.data.label === "code") {
                return (
                  <code className="bg-muted rounded-md px-1.5 py-0.5 font-mono text-sm before:content-none after:content-none">
                    {children}
                  </code>
                );
              }

              return <span>{children}</span>;
            },
            preformatted: ({ node }) => {
              if (!node.text) return null;

              const trimmedText = node.text.trim();
              const isShell =
                trimmedText.startsWith("npm") ||
                trimmedText.startsWith("npx") ||
                trimmedText.startsWith("pnpm") ||
                trimmedText.startsWith("yarn") ||
                trimmedText.startsWith("git");
              const inferredLang = isShell ? "bash" : "typescript";

              return (
                <Code
                  lang={inferredLang}
                  lineNumbers
                  className="m-0 rounded-xl! text-sm leading-relaxed"
                >
                  {node.text}
                </Code>
              );
            },
            image: ({ node }) => (
              <PrismicNextImage
                field={node}
                className="border-border bg-muted w-full rounded-xl border object-cover"
                fallbackAlt=""
              />
            ),
            hyperlink: ({ children, node }) => (
              <PrismicNextLink
                field={node.data}
                className="font-medium no-underline hover:underline"
              >
                {children}
              </PrismicNextLink>
            ),
            embed: ({ node }) => {
              if (!node.oembed.html) return null;

              return (
                <div className="my-6">
                  <div
                    className="border-border bg-muted relative block aspect-video h-auto w-full overflow-hidden rounded-xl border shadow-sm [&_iframe]:absolute [&_iframe]:top-0 [&_iframe]:left-0 [&_iframe]:h-full [&_iframe]:w-full [&_iframe]:rounded-xl [&_iframe]:border-0"
                    dangerouslySetInnerHTML={{ __html: node.oembed.html }}
                  />
                  {node.oembed.title && (
                    <p className="text-muted-foreground mt-2 text-center text-xs italic">
                      {node.oembed.title}
                    </p>
                  )}
                </div>
              );
            },
          }}
        />
      </div>
    </section>
  );
};

export default TextBlock;
