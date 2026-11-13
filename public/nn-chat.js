'use strict';
// 一番下を表示
window.addEventListener('load', () => {
  window.scrollTo(0,document.body.scrollHeight);
});
const formElement = document.forms['message-form'];
const textareaElement = formElement.elements['content'];
formElement.addEventListener('submit', (event) => {
  if (!textareaElement.value.trim()) {
    event.preventDefault();
    textareaElement.setCustomValidity('メッセージを入力してください。');
    textareaElement.reportValidity();
  }
});
textareaElement.addEventListener('input', () => {
  textareaElement.setCustomValidity('');
});
textareaElement.addEventListener('keydown', (event) => {
  if (isPressedSubmitKey(event)) {
    event.preventDefault();
    formElement.requestSubmit();
  }
});
function isPressedSubmitKey(event) {
  if (event.key !== 'Enter') {
    return false;
  }
  if (event.ctrlKey) {
    return true;
  }
  if (event.metaKey) {
    return true;
  }
}

// ツールチップの有効化
const tooltipTriggerElements = document.querySelectorAll('[data-bs-toggle="tooltip"]');
tooltipTriggerElements.forEach((tooltipTriggerElement) => {
  new bootstrap.Tooltip(tooltipTriggerElement);
});