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

document.querySelectorAll('[data-edit-button]').forEach((button) => {
  const editForm = document.getElementById(`edit-form-${button.dataset.editButton}`);
  const cancelButton = editForm.querySelector(`[data-edit-cancel="${button.dataset.editButton}"]`);

  button.addEventListener('click', () => {
    editForm.classList.toggle('d-none');
    const isExpanded = !editForm.classList.contains('d-none');
    button.setAttribute('aria-expanded', String(isExpanded));
    if (isExpanded) {
      editForm.querySelector('textarea').focus();
    }
  });

  cancelButton.addEventListener('click', () => {
    editForm.classList.add('d-none');
    button.setAttribute('aria-expanded', 'false');
  });
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