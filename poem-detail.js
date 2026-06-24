const params = new URLSearchParams(window.location.search);
const id = Number(params.get('id'));
const poem = window.poetryCorpus[id];
const $ = (selector) => document.querySelector(selector);

function toast(message) {
  const element = $('#toast');
  element.textContent = message;
  element.classList.add('show');
  setTimeout(() => element.classList.remove('show'), 1800);
}

if (!poem) {
  $('#detail-card').innerHTML = '<p class="poem-meta">作品不存在或链接已失效。</p><a class="back-link" href="index.html">返回首页</a>';
} else {
  document.title = `《${poem.title}》｜一日一诗`;
  $('#detail-meta').textContent = `${poem.dynasty} · ${poem.form}`;
  $('#detail-title').textContent = poem.title;
  $('#detail-author').textContent = poem.author;
  $('#detail-lines').textContent = poem.lines.join('\n');
  $('#detail-source').textContent = `收录于 ${poem.source}`;
  $('#detail-copy').addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(`《${poem.title}》\n${poem.dynasty}·${poem.author}\n${poem.lines.join('\n')}`);
      toast('全文已复制');
    } catch {
      toast('复制失败，请手动复制');
    }
  });
}
