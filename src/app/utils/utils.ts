export const copy = async (text: string) => {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text).then(() => {
      return true;
    }).catch(() => {
      return false;
    });
  } else {
    let textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "absolute";
    textArea.style.opacity = '0';
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    return new Promise((resolve, reject) => {
      document.execCommand('copy') ? resolve(true) : reject(false);
      textArea.remove();
    });
  }
}
