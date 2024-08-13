const textarea = document.getElementById("textarea");
let loadingWait;

const loading = () => {
    const savedText = document.getElementById("saved");
    const downloadButton = document.getElementById("download-button");

    const savingText = document.getElementById("saving");
    const loader = document.getElementById("loader");

    savedText.classList.toggle("hidden");
    downloadButton.classList.toggle("hidden");
    savingText.classList.toggle("hidden");
    loader.classList.toggle("hidden");

    setTimeout(() => {
        savedText.classList.toggle("hidden");
        downloadButton.classList.toggle("hidden");
        savingText.classList.toggle("hidden");
        loader.classList.toggle("hidden");
    }, (Math.random() * (3 - 1) + 1) * 1000)
}

window.onload = () => {
    const savedText = localStorage.getItem("savedText");

    if (savedText) {
        textarea.value = savedText;
    }
}

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

    localStorage.setItem("savedText", textarea.value);

    clearTimeout(loadingWait);

    loadingWait = setTimeout(() => {
        loading();
    }, 500)
})

