const poems = window.poetryCorpus;
const $ = (selector) => document.querySelector(selector);
let index = Number(localStorage.getItem('currentPoem'));
if (!Number.isInteger(index) || index < 0 || index >= poems.length) index = new Date().getDate() % poems.length;
let favorites = JSON.parse(localStorage.getItem('poemFavorites') || '[]').filter((item) => Number.isInteger(item) && poems[item]);
let showFullText = false;

function showToast(message) {
  const toast = $('#toast');
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 1800);
}

function renderFavorites() {
  const root = $('#favorites');
  if (!favorites.length) {
    root.innerHTML = '<p class="empty-state">还没有收藏。遇见喜欢的诗，就把它留下来。</p>';
    return;
  }
  root.innerHTML = favorites.map((item) => {
    const poem = poems[item];
    return `<article class="favorite"><h3>${poem.title}</h3><p>${poem.dynasty} · ${poem.author} · ${poem.form}</p></article>`;
  }).join('');
}

function render() {
  const poem = poems[index];
  const isLong = poem.lines.length > 8;
  const displayedLines = isLong && !showFullText ? poem.lines.slice(0, 8).concat('……') : poem.lines;
  $('#poem-title').textContent = poem.title;
  $('#poem-author').textContent = poem.author;
  $('#poem-dynasty').textContent = `${poem.dynasty} · ${poem.form}`;
  $('#poem-lines').textContent = displayedLines.join('\n');
  $('#poem-mood').textContent = `${poem.form} · ${poem.source}`;
  $('#poem-note').textContent = `这篇作品收录于本地古典诗词库，原文随网站一同发布。今日读到的是${poem.dynasty}·${poem.author}的《${poem.title}》。`;
  $('#poem-tags').innerHTML = [poem.form, poem.dynasty, poem.source].map((tag) => `<span># ${tag}</span>`).join('');
  const fullButton = $('#full-button');
  fullButton.hidden = !isLong;
  fullButton.textContent = showFullText ? '收起全文' : `展开全文（共 ${poem.lines.length} 段）`;
  const favored = favorites.includes(index);
  $('#favorite-button').textContent = favored ? '已收藏' : '收藏此诗';
  $('#favorite-button').setAttribute('aria-pressed', favored);
  localStorage.setItem('currentPoem', index);
}

$('#today').textContent = new Intl.DateTimeFormat('zh-CN', {
  year: 'numeric', month: 'long', day: 'numeric', weekday: 'long'
}).format(new Date());

$('#next-button').addEventListener('click', () => {
  index = (index + 1) % poems.length;
  showFullText = false;
  render();
});
$('#full-button').addEventListener('click', () => {
  showFullText = !showFullText;
  render();
});
$('#favorite-button').addEventListener('click', () => {
  const position = favorites.indexOf(index);
  if (position === -1) {
    favorites.push(index);
    showToast('已收进我的诗笺');
  } else {
    favorites.splice(position, 1);
    showToast('已取消收藏');
  }
  localStorage.setItem('poemFavorites', JSON.stringify(favorites));
  render();
  renderFavorites();
});
$('#copy-button').addEventListener('click', async () => {
  const poem = poems[index];
  try {
    await navigator.clipboard.writeText(`《${poem.title}》\n${poem.dynasty}·${poem.author}\n${poem.lines.join('\n')}`);
    showToast('全文已复制');
  } catch {
    showToast('复制失败，请手动复制');
  }
});

render();
renderFavorites();
