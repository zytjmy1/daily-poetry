const poems = [
  { title:'山居秋暝', author:'王维', dynasty:'唐', lines:'空山新雨后，天气晚来秋。\n明月松间照，清泉石上流。', mood:'清澈 · 安静', note:'雨后的山谷，月光穿过松枝，清泉绕着石头流淌。王维把一整个宁静的夜晚，轻轻放进了四句诗里。今天不妨慢一点，让心也有一处可以栖息。', tags:['山水','秋夜','王维'] },
  { title:'春晓', author:'孟浩然', dynasty:'唐', lines:'春眠不觉晓，处处闻啼鸟。\n夜来风雨声，花落知多少。', mood:'柔软 · 初春', note:'春天的清晨总让人舍不得醒来。鸟鸣、风雨与落花，都是时间经过窗前时留下的轻响。', tags:['春日','自然','孟浩然'] },
  { title:'饮酒·其五', author:'陶渊明', dynasty:'东晋', lines:'结庐在人境，而无车马喧。\n问君何能尔？心远地自偏。', mood:'从容 · 自在', note:'真正的安静不全在远方，而在一颗不被喧闹牵走的心里。把目光收回来，所在之处也能变得开阔。', tags:['隐逸','心境','陶渊明'] },
  { title:'竹里馆', author:'王维', dynasty:'唐', lines:'独坐幽篁里，弹琴复长啸。\n深林人不知，明月来相照。', mood:'幽静 · 明朗', note:'独处并不等于孤单。深竹、琴声和明月，构成了一个自足而明亮的小宇宙。', tags:['月夜','竹林','独处'] },
  { title:'江雪', author:'柳宗元', dynasty:'唐', lines:'千山鸟飞绝，万径人踪灭。\n孤舟蓑笠翁，独钓寒江雪。', mood:'凛冽 · 坚定', note:'天地寂静到只剩一叶孤舟。画面清冷，却有一种不随世界沉没的坚定。', tags:['冬日','孤舟','柳宗元'] },
  { title:'题西林壁', author:'苏轼', dynasty:'宋', lines:'横看成岭侧成峰，远近高低各不同。\n不识庐山真面目，只缘身在此山中。', mood:'开阔 · 清醒', note:'我们常常困在眼前的角度里。退一步、换个方向，或许就能看见事情原本更辽阔的样子。', tags:['哲思','山水','苏轼'] }
];
const $ = (s) => document.querySelector(s);
let index = Number(localStorage.getItem('currentPoem'));
if (!Number.isInteger(index)) index = new Date().getDate() % poems.length;
let favorites = JSON.parse(localStorage.getItem('poemFavorites') || '[]');
function showToast(message) { const t=$('#toast'); t.textContent=message; t.classList.add('show'); setTimeout(()=>t.classList.remove('show'),1800); }
function renderFavorites() { const root=$('#favorites'); if (!favorites.length) { root.innerHTML='<p class="empty-state">还没有收藏。遇见喜欢的诗，就把它留下来。</p>'; return; } root.innerHTML=favorites.map(i=>`<article class="favorite"><h3>${poems[i].title}</h3><p>${poems[i].dynasty} · ${poems[i].author}</p></article>`).join(''); }
function render() { const poem=poems[index]; $('#poem-title').textContent=poem.title; $('#poem-author').textContent=poem.author; $('#poem-dynasty').textContent=poem.dynasty + ' · 古诗词'; $('#poem-lines').textContent=poem.lines; $('#poem-mood').textContent=poem.mood; $('#poem-note').textContent=poem.note; $('#poem-tags').innerHTML=poem.tags.map(tag=>`<span># ${tag}</span>`).join(''); const fav=favorites.includes(index); $('#favorite-button').textContent=fav?'已收藏':'收藏此诗'; $('#favorite-button').setAttribute('aria-pressed',fav); localStorage.setItem('currentPoem',index); }
const date = new Intl.DateTimeFormat('zh-CN',{year:'numeric',month:'long',day:'numeric',weekday:'long'}).format(new Date()); $('#today').textContent=date;
$('#next-button').addEventListener('click',()=>{ index=(index+1)%poems.length; render(); });
$('#favorite-button').addEventListener('click',()=>{ const pos=favorites.indexOf(index); if(pos===-1){ favorites.push(index); showToast('已收进我的诗笺'); } else { favorites.splice(pos,1); showToast('已取消收藏'); } localStorage.setItem('poemFavorites',JSON.stringify(favorites)); render(); renderFavorites(); });
$('#copy-button').addEventListener('click',async()=>{ const p=poems[index]; try { await navigator.clipboard.writeText(`《${p.title}》\n${p.dynasty}·${p.author}\n${p.lines}`); showToast('诗句已复制'); } catch { showToast('复制失败，请手动复制'); } });
render(); renderFavorites();
