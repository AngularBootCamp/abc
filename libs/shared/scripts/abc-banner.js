function encodeHTML(s) {
  const el = document.createElement('div');

  el.innerText = s;

  return el.innerHTML;
}

function docsLinkHTML() {
  const docsLinkElement = document.querySelector('link[rel=help]');

  if (!docsLinkElement) {
    return '';
  }

  const docsLinkText = docsLinkElement.getAttribute('title');
  const docsLinkHref = docsLinkElement.getAttribute('href');

  if (!(docsLinkText && docsLinkHref)) {
    return '';
  }

  return `<a target="_blank" href="${docsLinkHref}">${encodeHTML(docsLinkText)}</a>`;
}

function addBanner() {
  document.body.insertAdjacentHTML(
    'afterbegin',
    `
      <nav class="abc-banner">
        <a href="https://angularbootcamp.com/"></a>
        <span>${encodeHTML(document.title)}</span>
        ${docsLinkHTML()}
      </nav>
    `,
  );
}

addBanner();
