type PrismicTextField = string | { text: string }[];
type PrismicSliceField = PrismicTextField | unknown;

const extractTextFromField = (field: PrismicSliceField): string => {
  if (typeof field === 'string') return field;

  if (Array.isArray(field)) {
    return field
      .filter(block => typeof block?.text === 'string')
      .map(block => block.text)
      .join(' ');
  }

  if (field && typeof field === 'object' && 'text' in field) {
    return (field as any).text;
  }

  return '';
};

export const extractTextFromSlices = (slices: any[]): string => {
  return slices
    .map(slice => {
      const primaryText = slice.primary
        ? Object.values(slice.primary).map(extractTextFromField).join(' ')
        : '';

      const itemsText = Array.isArray(slice.items)
        ? slice.items.map((item: Record<string, PrismicSliceField>) =>
            Object.values(item).map(extractTextFromField).join(' ')
          ).join(' ')
        : '';

      return `${primaryText} ${itemsText}`;
    })
    .join(' ')
    .trim();
};

export const extractFirstParagraphFromSlices = (
  slices: any[],
  fallback = "",
): string => {
  const textBlock = slices.find((slice) => {
    return (
      slice.slice_type === "text_block" &&
      Array.isArray(slice.primary?.text) &&
      slice.primary.text.some((block: any) => block.type === "paragraph")
    );
  });

  return (
    textBlock?.primary?.text.find((block: any) => block.type === "paragraph")
      ?.text || fallback
  );
};
