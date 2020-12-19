'use strict';

export default Toc = {
  _initToc: function () {
    const HEADERFIX = 30;
    const $toclink = $('.toc-link');
    const $headerlink = $(".article-content > h1,.article-content > h2,.article-content > h3");
    const $tocLinkLis = $('.widget-topic--list ul');

    const headerlinkTop = $.map($headerlink, function (link) {
      return $(link).offset().top;
    });

    const headerLinksOffsetForSearch = $.map(headerlinkTop, function (offset) {
      return offset - HEADERFIX;
    });
    // console.log($headerlink)
    // console.log(headerLinksOffsetForSearch)

    const searchActiveTocIndex = function (array, target) {
      for (let i = 0; i < array.length - 1; i++) {
        if (target > array[i] && target <= array[i + 1]) return i;
      }
      if (target > array[array.length - 1]) return array.length - 1;
      return -1;
    };

    $(window).scroll(function () {
      const scrollTop = $(window).scrollTop();
      const activeTocIndex = searchActiveTocIndex(headerLinksOffsetForSearch, scrollTop);

      $($toclink).removeClass('active');
      $($tocLinkLis).removeClass('has-active');

      if (activeTocIndex !== -1 && $toclink[activeTocIndex] != null) {
        $($toclink[activeTocIndex]).addClass('active');

        let ancestor = $toclink[activeTocIndex].parentNode;
        while (ancestor.tagName !== 'DIV') {
          $(ancestor).addClass('has-active');
          ancestor = ancestor.parentNode;
        }
      }
    });
  },
  toc: function () {
    const tocContainer = document.getElementById('post-toc');
    if (tocContainer !== null) {
      const toc = document.getElementById('table-of-contents');
      if (toc === null) {
        // toc = true, but there are no headings
        tocContainer.parentNode.removeChild(tocContainer);
      } else {
        this._initToc();
      }
    }
  }
};

