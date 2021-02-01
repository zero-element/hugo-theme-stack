function getAbsTop(element: HTMLElement): number {
  var actualTop = element.offsetTop;
  var current = element.offsetParent as HTMLElement;
  while (current !== null) {
    actualTop += (current.offsetTop + current.clientTop);
    current = current.offsetParent as HTMLElement;
  }
  return actualTop
}

let initToc = function () {
  const toclink = document.querySelectorAll('.toc-link');
  const headerlink = document.querySelectorAll('.article-content > h1, .article-content > h2, .article-content > h3');
  const tocLinkLis = document.querySelectorAll('.widget-topic--list ul');

  const headerlinkTop = Array.prototype.map.call(headerlink, function (link: HTMLElement) {
    return getAbsTop(link);
  });

  const searchActiveTocIndex = function (array, target) {
    for (let i = 0; i < array.length - 1; i++) {
      if (target > array[i] && target <= array[i + 1]){console.log(array[i], target); return i};
    }
    if (target > array[array.length - 1]) return array.length - 1;
    return -1;
  };

  window.addEventListener('scroll', function () {
    const scrollTop = document.documentElement.scrollTop
    const activeTocIndex = searchActiveTocIndex(headerlinkTop, scrollTop);

    toclink.forEach((link) => link.classList.remove('active'));
    tocLinkLis.forEach((link) => link.classList.remove('has-active'));

    if (activeTocIndex !== -1 && toclink[activeTocIndex] != null) {
      toclink[activeTocIndex].classList.add('active');

      let ancestor = toclink[activeTocIndex].parentNode as HTMLElement;
      while (ancestor.tagName !== 'DIV') {
        ancestor.classList.add('has-active');
        ancestor = ancestor.parentNode as HTMLElement;
      }
    }
  });
}

export default function () {
  const tocContainer = document.getElementById('post-toc');
  if (tocContainer !== null) {
    const toc = document.getElementById('table-of-contents');
    if (toc === null) {
      // toc = true, but there are no headings
      tocContainer.parentNode.removeChild(tocContainer);
    } else {
      initToc();
    }
  }
};