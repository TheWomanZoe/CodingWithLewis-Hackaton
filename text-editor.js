const textarea = document.getElementById("textarea");
const downloadButton  = document.getElementById("download-button");
let loadingWait;

// A little wait never hurt anyone 😊
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
    }, (Math.random() * (3 - 1) + 1) * 1000) // Should have made a 1/100 000 chance to get an infinite loading screen
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

    // Can't get it to delete backwards as well, so I'm leaving it as is

    localStorage.setItem("savedText", textarea.value);

    clearTimeout(loadingWait);

    loadingWait = setTimeout(() => {
        loading();
    }, 500)
})

downloadButton.addEventListener("click", e => {
    const languages = document.querySelectorAll("input[name = language]");
    let selected = false;
    let language;

    languages.forEach(option => {
        if (option.checked){
            selected = true;
            language = option.value;
        }
    })

    if (!selected){
        alert("Please select a language");
        return;
    }

    let fileExtension

    switch (language){
        case 'javascript':
            fileExtension = "js";
            break;
        case 'typescript':
            fileExtension = "ts"; // Why does it save as a video file lol
            break;
        case 'python':
            fileExtension = "py";
            break;
        case 'java':
            fileExtension = "java";
            break;
        case 'c':
            fileExtension = "c";
            break;
        case 'c++':
            fileExtension = "cpp";
            break;
    }

    const filename = `code.${fileExtension}`;

    const element =  document.createElement('a');
    element.href = URL.createObjectURL(new Blob([textarea.value], { type: `text/plain` }));
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);


    languages.forEach(option => {
        option.checked = false;
    })
})

// FINALLY DONE OMG