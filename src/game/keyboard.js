export function isEditableKeyboardTarget(source) {
  const target = source?.target ?? source;
  if (!target) return false;
  const element = target.nodeType === 3 ? target.parentElement : target;
  if (!element) return false;
  if (element.isContentEditable) return true;
  if (typeof element.closest === 'function')
    return Boolean(element.closest('input, textarea, select, [contenteditable]:not([contenteditable="false"]), [role="textbox"]'));
  return /^(INPUT|TEXTAREA|SELECT)$/i.test(element.tagName || '');
}
