const textarea = document.getElementById("textarea");

textarea.addEventListener("input", e => {
    const start = textarea.selectionStart;
    const currentValue = textarea.value;

    if (e.inputType === "insertText") {
        const lineStart = currentValue.lastIndexOf("\n", start - 1) + 1;

        const newChar = currentValue[start - 1];

        const beforeCursor = currentValue.slice(0, start - 1);
        const afterCursor = currentValue.slice(start);

        textarea.value = beforeCursor.slice(0, lineStart) + newChar + beforeCursor.slice(lineStart) + afterCursor;

        textarea.setSelectionRange(lineStart + 1, lineStart);
    }
    else if (e.inputType === "deleteText") {
        textarea.setSelectionRange(start, start);
    }
})