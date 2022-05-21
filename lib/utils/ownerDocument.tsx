export default function ownerDocument(node) {
  if (node && node.ownerDocument) {
    return node.ownerDocument;
  }
  return document;
}
