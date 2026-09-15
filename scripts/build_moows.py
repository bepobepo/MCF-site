"""Build the MOOWS article pages from reviewed, editable JSON. No dependencies."""
from pathlib import Path
from html import escape
import json,re
ROOT=Path(__file__).resolve().parents[1]
ARTICLES=json.loads((ROOT/'content/moows/issue-01/articles.json').read_text(encoding='utf-8'))
PREFIX='../../../'
def figure(b,first=False):
 src=PREFIX+'assets/moows/issue-01/images/'+b['src'];caption=b['caption']
 return f'<figure class="article-figure"><a href="{src}" target="_blank" rel="noopener" aria-label="Enlarge image: {escape(caption)}"><img src="{src}" alt="{escape(b.get("alt",caption))}" loading="{"eager" if first else "lazy"}" decoding="async"></a><figcaption>{escape(caption)} · <a href="../read/#page={b["page"]}">View printed page</a></figcaption></figure>'
def render(a,index):
 title=a['title'];desc=a['description'];url='https://moonco.ws/cowzine/issue-01/'+a['slug']+'/'
 first_image=next((b for b in a['blocks'] if b['type']=='image'),None)
 social='https://moonco.ws/assets/moows/issue-01/'+('images/'+first_image['src'] if first_image else f'page-{a["pages"][0]:02}.jpg')
 body=[];image_count=0
 for b in a['blocks']:
  if b['type']=='image':body.append(figure(b,image_count==0));image_count+=1;continue
  tag={'heading':'h2','paragraph':'p','quote':'blockquote'}[b['type']]
  attrs=f' lang="{b["lang"]}"' if b.get('lang') else ''
  if b.get('poetry'):attrs+=' class="verse"'
  t=escape(b['text'])
  if b.get('poetry') or (b['page']==14 and '\n' in b['text']):t=t.replace('\n','<br>')
  body.append(f'<{tag}{attrs}>{t}</{tag}>')
 prev=ARTICLES[index-1] if index>0 else None;following=ARTICLES[index+1] if index+1<len(ARTICLES) else None
 neighbors=''.join(f'<a href="../{x["slug"]}/"><small>{label}</small>{escape(x["title"])}</a>' for x,label in [(prev,'← Previous piece'),(following,'Next piece →')] if x)
 author=f'<span>{escape(a["author"])}</span> · ' if a['author'] else ''
 labels=', '.join(map(str,a['pages'])) if a['slug'] in ['twenty-million-trees','advertising'] else (str(a['pages'][0]) if len(a['pages'])==1 else f'{a["pages"][0]}–{a["pages"][-1]}')
 return f'''<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>{escape(title)} — MOOWS</title>
<meta name="description" content="{escape(desc)}">
<link rel="canonical" href="{url}">
<meta property="og:type" content="article"><meta property="og:title" content="{escape(title)}">
<meta property="og:description" content="{escape(desc)}"><meta property="og:url" content="{url}">
<meta property="og:image" content="{social}"><meta name="twitter:card" content="summary_large_image">
<link rel="stylesheet" href="../../../assets/moows/moows.css?v=3">
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
<header><a class="brand" href="../../../cowzine.html">MOOWS</a><nav aria-label="Main navigation"><a href="../../../index.html">The herd</a><a href="../../../cowzine.html#contents">Issue 1</a><a href="../../../cowzine-submit.html">Contribute</a></nav></header>
<main id="main" class="article"><article>
<p class="eyebrow"><a href="../../../cowzine.html#contents">MOOWS / Issue 01</a> · August 2026</p>
<h1>{escape(title)}</h1>
<p class="article-meta">{author}<a href="../read/#page={a['pages'][0]}">Printed pages {labels}</a></p>
<div class="article-tools"><button class="share-article" type="button" hidden>Share this piece ↗</button><span class="share-status" role="status"></span></div>
<div class="prose">{chr(10).join(body)}</div>
<div class="actions"><a class="button" href="../read/#page={a['pages'][0]}">Read in the magazine ↗</a><a class="button" href="../../../cowzine.html#contents">All contents</a></div>
</article><nav class="article-neighbors" aria-label="Other articles">{neighbors}</nav></main>
<footer>MOOWS / CowZine · By mooncows, for mooncows. <a href="../../../cowzine-submit.html">Make the next issue with us →</a></footer>
<script src="../../../assets/moows/article.js" defer></script>
</body></html>'''
for i,a in enumerate(ARTICLES):
 path=ROOT/'cowzine/issue-01'/a['slug']/'index.html';path.parent.mkdir(parents=True,exist_ok=True);path.write_text(render(a,i),encoding='utf-8')
landing=ROOT/'cowzine.html';s=landing.read_text(encoding='utf-8')
entries=[]
for a in ARTICLES:
 label=a['author'] or ('Photo essay' if a['slug']=='conan' else 'Read online')
 if a['slug']=='love-letter-to-the-woman-that-waits':label='Original handwritten letter'
 entries.append(f'<li><a href="cowzine/issue-01/{a["slug"]}/"><span>{escape(a["title"])}<small>{escape(label)}</small></span><span class="number">{a["pages"][0]:02}</span></a></li>')
s=re.sub(r'<ol class="contents">.*?</ol>','<ol class="contents">\n'+'\n'.join(entries)+'\n</ol>',s,flags=re.S)
s=s.replace('Start with the editors’ letters in our web edition, or explore every piece in the original magazine.','Read each piece on its own page, with photographs and illustrations from the printed issue. Or flip through the magazine just as it was made.').replace('30 pieces · One herd','Stories, art & more · One herd').replace('moows.css?v=2','moows.css?v=3')
landing.write_text(s,encoding='utf-8')
print(f'Built {len(ARTICLES)} article pages and linked the full contents.')

