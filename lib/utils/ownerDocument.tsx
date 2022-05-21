/* global document */

/**
 * Given a node, returns the ownerDocument if it exists, otherwise the
 * global document. (Maybe this should go in a root utils file?)
 */
export default function ownerDocument(node: ?HTMLElement): Document {
  if (node && node.ownerDocument) {
    return node.ownerDocument;
  }
  return document;
}
