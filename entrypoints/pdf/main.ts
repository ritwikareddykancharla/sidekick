import * as pdfjsLib from 'pdfjs-dist';
import 'pdfjs-dist/web/pdf_viewer.css';

// Ensure worker is loaded - WXT handles the bundling if imported correctly, 
// but we might need to point to the local file if bundling fails.
// For now, attempting standard import.
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
).toString();

const container = document.getElementById('viewer');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const pageNumSpan = document.getElementById('page_num');
const pageCountSpan = document.getElementById('page_count');

let pdfDoc: any = null;
let pageNum = 1;

async function loadPDF() {
    const params = new URLSearchParams(window.location.search);
    const fileUrl = params.get('file');

    if (!fileUrl) {
        document.body.innerHTML = '<h1>No PDF file specified</h1>';
        return;
    }

    try {
        const loadingTask = pdfjsLib.getDocument(fileUrl);
        pdfDoc = await loadingTask.promise;

        if (pageCountSpan) pageCountSpan.textContent = pdfDoc.numPages;
        renderPage(pageNum);
    } catch (err) {
        console.error('Error loading PDF:', err);
        document.body.innerHTML = `<h1>Error loading PDF: ${err}</h1>`;
    }
}

async function renderPage(num: number) {
    if (!pdfDoc) return;

    pageNum = num;
    if (pageNumSpan) pageNumSpan.textContent = pageNum.toString();

    const page = await pdfDoc.getPage(num);

    const scale = 1.5;
    const viewport = page.getViewport({ scale });

    // Create page container
    const pageDiv = document.createElement('div');
    pageDiv.className = 'page relative';
    pageDiv.style.width = `${viewport.width}px`;
    pageDiv.style.height = `${viewport.height}px`;

    // Canvas
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    canvas.className = 'absolute top-0 left-0';

    pageDiv.appendChild(canvas);

    // Text Layer
    const textLayerDiv = document.createElement('div');
    textLayerDiv.className = 'textLayer';
    textLayerDiv.style.width = `${viewport.width}px`;
    textLayerDiv.style.height = `${viewport.height}px`;
    // CSS variable for text layer scaling (required by newer pdf.js)
    textLayerDiv.style.setProperty('--scale-factor', String(scale));

    pageDiv.appendChild(textLayerDiv);

    // Render
    if (container) {
        container.innerHTML = ''; // Clear previous
        container.appendChild(pageDiv);
    }

    if (context) {
        await page.render({ canvasContext: context, viewport }).promise;
    }

    const textContent = await page.getTextContent();
    pdfjsLib.renderTextLayer({
        textContentSource: textContent,
        container: textLayerDiv,
        viewport: viewport,
        textDivs: []
    });
}

// Controls
prevBtn?.addEventListener('click', () => {
    if (pageNum <= 1) return;
    renderPage(pageNum - 1);
});

nextBtn?.addEventListener('click', () => {
    if (pageNum >= pdfDoc.numPages) return;
    renderPage(pageNum + 1);
});

// Context Listener
document.addEventListener('mouseup', () => {
    const selection = window.getSelection();
    if (selection && selection.toString().trim().length > 0) {
        const text = selection.toString();
        // Send to Side Panel
        console.log('Selected:', text);
        // We will implement messaging here
        browser.runtime.sendMessage({
            type: 'PDF_CONTEXT_SELECTED',
            text: text,
            page: pageNum,
            source: new URLSearchParams(window.location.search).get('file')
        });
    }
});

loadPDF();
