export function scrollItemIntoView(child, parent, isFirst, isLast, scrollAlignInView = "auto") {
  if (!child)
    return;
  const childRect = child.getBoundingClientRect();
  const parentRect = parent.getBoundingClientRect();
  if (childRect.bottom > parentRect.bottom) {
    if (isLast) {
      parent.scrollTop = parent.scrollHeight - parentRect.height;
    } else {
      const targetBottom = child.offsetTop + childRect.height;
      parent.scrollTop = targetBottom - (scrollAlignInView === "center" ? Math.round((parentRect.height + childRect.height) / 2) : parentRect.height);
    }
  } else if (childRect.top < parentRect.top) {
    if (isFirst) {
      parent.scrollTop = 0;
    } else {
      parent.scrollTop = child.offsetTop - (scrollAlignInView === "center" ? Math.round((parentRect.height - childRect.height) / 2) : 0);
    }
  }
}
