window.addEventListener('DOMContentLoaded', (event) => {
  const currentPath = location.pathname;

  // メニューのアクティブ状態をJSで付与（partialCached対応）
  const menuLinks = document.querySelectorAll('header nav a[data-url]');
  menuLinks.forEach(link => {
    const url = new URL(link.getAttribute('data-url'), location.origin);
    if (url.pathname === currentPath) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    } else if (currentPath.startsWith(url.pathname) && url.pathname !== '/') {
      link.classList.add('ancestor');
      link.setAttribute('aria-current', 'true');
    }
  });

  // サイドバーの状態適用（アクティブ判定・ページング・スクロール）
  function applySidebarState() {
    // アクティブページハイライト
    const sidebarLinks = document.querySelectorAll('.sidebar-left a[data-url]');
    let bestMatch = null;
    let bestLength = 0;
    sidebarLinks.forEach(link => {
      const url = new URL(link.getAttribute('data-url'), location.origin);
      if (url.pathname === currentPath || (currentPath.startsWith(url.pathname) && url.pathname !== '/')) {
        if (url.pathname.length > bestLength) {
          bestMatch = link;
          bestLength = url.pathname.length;
        }
      }
    });
    if (bestMatch) {
      bestMatch.classList.add('active');
      bestMatch.setAttribute('aria-current', 'page');
    }

    // ページング（100件超の場合のみ）
    const sidebarUl = document.querySelector('.sidebar-left nav > ul');
    if (sidebarUl) {
      const PAGE_SIZE = 100;
      const allItems = Array.from(sidebarUl.children).filter(li => !li.classList.contains('orphan-section-divider'));
      if (allItems.length > PAGE_SIZE) {
        const totalPages = Math.ceil(allItems.length / PAGE_SIZE);
        let activePage = 0;
        allItems.forEach((li, i) => {
          if (li.querySelector('a.active')) activePage = Math.floor(i / PAGE_SIZE);
        });

        const pager = document.createElement('div');
        pager.className = 'sidebar-pager';
        const prevBtn = document.createElement('button');
        prevBtn.className = 'sidebar-pager-btn';
        prevBtn.textContent = '<';
        const nextBtn = document.createElement('button');
        nextBtn.className = 'sidebar-pager-btn';
        nextBtn.textContent = '>';
        const info = document.createElement('span');
        info.className = 'sidebar-pager-info';
        pager.appendChild(prevBtn);
        pager.appendChild(info);
        pager.appendChild(nextBtn);
        sidebarUl.parentNode.insertBefore(pager, sidebarUl);

        let currentPage = activePage;
        function showPage(page) {
          currentPage = page;
          const start = page * PAGE_SIZE;
          const end = start + PAGE_SIZE;
          allItems.forEach((li, i) => { li.hidden = i < start || i >= end; });
          sidebarUl.querySelectorAll('.orphan-section-divider').forEach(div => {
            const next = div.nextElementSibling;
            div.hidden = !next || next.hidden;
          });
          info.textContent = (page + 1) + ' / ' + totalPages;
          prevBtn.disabled = page === 0;
          nextBtn.disabled = page === totalPages - 1;
        }
        prevBtn.addEventListener('click', () => { if (currentPage > 0) showPage(currentPage - 1); });
        nextBtn.addEventListener('click', () => { if (currentPage < totalPages - 1) showPage(currentPage + 1); });
        showPage(activePage);
      }
    }

    // アクティブ要素へスクロール
    if (bestMatch) {
      bestMatch.scrollIntoView({ block: 'center', behavior: 'instant' });
    }
  }

  // サイドバーの動的読み込み or 静的サイドバーの状態適用
  const sidebarSrc = document.querySelector('.sidebar-left [data-sidebar-src]');
  if (sidebarSrc) {
    fetch(sidebarSrc.dataset.sidebarSrc)
      .then(r => r.ok ? r.text() : '')
      .then(html => {
        if (html) {
          sidebarSrc.outerHTML = html;
        }
        applySidebarState();
        document.dispatchEvent(new CustomEvent('sidebar-left-loaded'));
      });
  } else {
    applySidebarState();
    document.dispatchEvent(new CustomEvent('sidebar-left-loaded'));
  }

  // Pagefind 検索UI初期化
  new PagefindUI({ element: "#search", showSubResults: true });

  // 矢印キーナビゲーション
  let selectedIndex = -1;
  const searchContainer = document.getElementById('search');

  searchContainer.addEventListener('keydown', (e) => {
    const results = searchContainer.querySelectorAll('.pagefind-ui__result');
    const loadMoreBtn = searchContainer.querySelector('.pagefind-ui__button');
    const totalItems = results.length + (loadMoreBtn ? 1 : 0);
    if (totalItems === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      selectedIndex = Math.min(selectedIndex + 1, totalItems - 1);
      updateSelection(results, loadMoreBtn);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      selectedIndex = Math.max(selectedIndex - 1, 0);
      updateSelection(results, loadMoreBtn);
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault();
      if (selectedIndex < results.length) {
        const link = results[selectedIndex].querySelector('a');
        if (link) link.click();
      } else if (loadMoreBtn) {
        loadMoreBtn.click();
        selectedIndex = -1;
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      selectedIndex = -1;
      const input = searchContainer.querySelector('.pagefind-ui__search-input');
      if (input) {
        input.value = '';
        input.dispatchEvent(new Event('input', { bubbles: true }));
        input.blur();
      }
    }
  });

  // 検索入力時にリセット
  searchContainer.addEventListener('input', () => {
    selectedIndex = -1;
  });

  // 検索エリア外クリックで閉じる
  document.addEventListener('click', (e) => {
    if (!searchContainer.contains(e.target)) {
      const input = searchContainer.querySelector('.pagefind-ui__search-input');
      if (input && input.value) {
        input.value = '';
        input.dispatchEvent(new Event('input', { bubbles: true }));
        selectedIndex = -1;
      }
    }
  });

  function updateSelection(results, loadMoreBtn) {
    results.forEach((r, i) => {
      r.classList.toggle('pagefind-ui__result--selected', i === selectedIndex);
    });
    if (loadMoreBtn) {
      loadMoreBtn.classList.toggle('pagefind-ui__button--selected', selectedIndex === results.length);
    }
    if (selectedIndex >= 0) {
      const target = selectedIndex < results.length ? results[selectedIndex] : loadMoreBtn;
      if (target) target.scrollIntoView({ block: 'nearest' });
    }
  }
});
