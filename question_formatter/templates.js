function formatText(text) {
  if (Array.isArray(text) && text.length > 0 && typeof text[0] === 'object') {
    // 如果是陣列格式，直接回傳
    return text;
  } else {
    // 否則，處理普通文字
    return text.replace(/\n/g, '<br>');
  }
}
function formatDataObject(content) {
  const formattedContent = Object.fromEntries(
    Object.entries(content).map(([key, value]) => [key, formatText(value)])
  );
  return formattedContent;
}

function reversedformatText(text) {
  return text.replace('<br>', /\n/g);
}

function createCard(header, bodyContent, width=12, tag = '') {
  let wrappedContent;
  if (tag === 'code') {
    wrappedContent = `<pre style="margin-bottom: 0px;">${bodyContent}</pre>`;
  } else { // 默認為空
    wrappedContent = bodyContent;
  }

  return `<div class="col-md-${width}">
        <div class="card">
          <div class="card-header"><h5>${header}</h5></div>
          <div class="card-body">${wrappedContent}</div>
        </div>
      </div>`;
}

function generateTestCaseHtml(examplePairs) {
  let exampleHtml = examplePairs.map((pair, index) => `
      <div class="row mb-3">
        ${createCard(`範例輸入 #${index + 1}`, pair.input, 6, 'code')}
        ${createCard(`範例輸出 #${index + 1}`, pair.output, 6, 'code')}
      </div>
  `).join('');
  return exampleHtml;
}

// 定義生成 HTML 的函數
function generateHtml(content) {
  content = formatDataObject(content);
  const {
    title,
    description,
    inputInstructions,
    outputInstructions,
    constraints,
    examplePairs,
    advice,
  } = content;

  let adviceHtml = "";
  if (advice !== "") {
      adviceHtml = `<div class="row mb-3">${createCard('提示', advice)}</div>`;
  }
  return `
<div class="container mt-5">
  <h1 class="text-center mb-3">${title}</h1>
  <div class="row mb-3">
    ${createCard('題目敘述', description)}
  </div>
  <div class="row mb-3">
    ${createCard('輸入說明', inputInstructions, 6)}
    ${createCard('輸出說明', outputInstructions, 6)}
  </div>
  <div class="row mb-3">
    ${createCard('限制', constraints)}
  </div>
  ${generateTestCaseHtml(examplePairs)}
  ${adviceHtml}
</div>`;
}

