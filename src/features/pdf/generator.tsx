import "server-only";
import { renderToBuffer } from "@react-pdf/renderer";
import { YosegakiPdfDocument, type YosegakiPdfProps } from "./document";

export async function renderBoardToPdf(
  props: YosegakiPdfProps,
): Promise<Buffer> {
  return renderToBuffer(<YosegakiPdfDocument {...props} />);
}
