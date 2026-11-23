import {persons,forms,serCategories,estarCategories,tenerCategories,adjectives,adjectiveSentenceTranslations} from './data.js';
import {glossary} from './glossary.js';
'use strict';
const SER=new Set(forms.ser),ESTAR=new Set(forms.estar);
const element=(tag,cls,text)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(text!==undefined)e.textContent=text;return e};
const verbRx=/(?<!\p{L})(?:estamos|estáis|están|estoy|estás|está|somos|sois|son|soy|eres|es|tenemos|tenéis|tienen|tengo|tienes|tiene)(?!\p{L})/giu;
function appendPhrase(line,role,text){if(!text)return;const span=element('span','chunk',text);span.dataset.role=role;line.append(span)}
function makeExample(es,tr,highlight='both'){
  const item=element('div','example-row');
  const line=element('div','es-sentence');line.lang='es';line.dataset.es='';line.dataset.highlight=highlight;
  let last=0;for(const m of es.matchAll(verbRx)){
    appendPhrase(line,last===0?'subject':'other',es.slice(last,m.index));
    appendPhrase(line,'verb',m[0]);last=m.index+m[0].length;
  }
  appendPhrase(line,'other',es.slice(last));
  item.append(line,element('div','example-tr',tr));return item;
}
function renderTable(id,verb){
 const wrap=element('section','conjugation-wrap');
 const heading=element('h3','', '🧠 Presente · '+verb.toUpperCase());heading.lang='es';heading.dataset.es='';
 const table=element('table','conjugation-table');const header=element('tr');
 header.append(element('th','','Kişi'),element('th','',verb.toUpperCase()));
 const thead=element('thead');thead.append(header);const tbody=element('tbody');
 persons.forEach((p,i)=>{
  const row=element('tr');const a=element('td','',p);a.lang='es';a.dataset.es='';
  const b=element('td','',forms[verb][i]);b.lang='es';b.dataset.es='';b.dataset.highlight=verb;
  row.append(a,b);tbody.append(row);
 });
 table.append(thead,tbody);wrap.append(heading,table);document.getElementById(id).append(wrap);
}
function renderCategories(id,items,verb){
 const host=document.getElementById(id);
 items.forEach(g=>{
  const card=element('article','usage-card');const title=element('h3','',g.t);title.lang='es';title.dataset.es='';card.append(title,element('p','usage-subtitle',g.sub));
  if(verb==='estar' && g.t.startsWith('07 · La fecha')){
   const guide=element('aside','calendar-rule-guide');
   const rules=[
    {icon:'📅',name:'GÜN / TARİH',formula:'ESTAMOS A',suffix:'+ gün veya tarih',example:'Estamos a domingo. → Pazar günündeyiz.',highlight:'estar'},
    {icon:'🌸',name:'MEVSİM',formula:'ESTAMOS EN',suffix:'+ mevsim',example:'Estamos en primavera. → İlkbahardayız.',highlight:'estar'},
    {icon:'🕒',name:'SAAT',formula:'SER',suffix:'ile söylenir',example:'Es la una. / Son las dos.',highlight:'ser'}
   ];
   rules.forEach(rule=>{
    const box=element('div','calendar-rule-line');
    const icon=element('span','calendar-rule-icon',rule.icon);icon.setAttribute('aria-hidden','true');
    const contents=element('div','calendar-rule-text');
    contents.append(element('div','calendar-rule-caption',rule.name));
    const formula=element('div','calendar-rule-formula');
    const spanish=element('span','',rule.formula);spanish.lang='es';spanish.dataset.es='';spanish.dataset.highlight=rule.highlight;
    formula.append(spanish,' ',element('span','calendar-rule-suffix',rule.suffix));
    contents.append(formula,element('div','calendar-rule-example',rule.example));
    box.append(icon,contents);guide.append(box);
   });
   card.append(guide);
  }else if(g.note)card.append(element('p','verb-note',g.note));
  g.pairs.forEach(([es,tr])=>card.append(makeExample(es,tr,verb==='estar'?'both':verb)));
  if(verb==='estar' && g.t.startsWith('03 · El estado civil')){
   const note=element('aside','widow-rule-note');
   const heading=element('h4','','🕯️ ⚠️ DUL OLMAK = SER');
   const message=element('p','');
   message.append('Eşi vefat etmiş olmak anlamındaki ',element('strong','','dul olmak'),' ifadesi ',element('strong','red-verb','SER'),' fiiliyle kurulur; ESTAR kullanılmaz.');
   const pattern=element('p','widow-pattern');
   const grammar=element('span','','Ser viudo/viuda de');
   grammar.lang='es';grammar.dataset.es='';grammar.dataset.highlight='ser';
   pattern.append(grammar,' + kişinin adı');
   note.append(heading,message,pattern);
   note.append(makeExample('Él es viudo.','O, eşi vefat etmiş bir erkektir.','ser'));
   note.append(makeExample('Ella es viuda de Luis.','O, Luis’in dul eşidir. (Luis vefat etmiştir.)','ser'));
   card.append(note);
  }
  host.append(card);
 });
}
function renderIntroduction(id,items){items.forEach(([es,tr])=>document.getElementById(id).append(makeExample(es,tr,'both')))}
function renderAdjectives(){
 const tbody=document.getElementById('adjective-rows');
 adjectives.forEach(([word,serMeaning,estarMeaning,serExample,estarExample],i)=>{
  const row=element('tr');const w=element('td','',word);w.lang='es';w.dataset.es='';
  row.append(w,element('td','',serMeaning),element('td','',estarMeaning));
  const buttons=element('td');const lock=element('button','lock','🔒');lock.type='button';
  const detail=element('tr','adj-detail-row');detail.hidden=true;detail.id='adjective-'+(i+1)+'-details';
  const cell=element('td');cell.colSpan=4;const box=element('div','adj-examples');
  for(const [name,es,tr] of [['SER',serExample,adjectiveSentenceTranslations[i][0]],['ESTAR',estarExample,adjectiveSentenceTranslations[i][1]]]){
   const example=element('div','example-row');example.append(element('strong','example-type '+(name==='SER'?'is-ser':'is-estar'),name),makeExample(es,tr,'both'));
   box.append(example);
  }
  cell.append(box);detail.append(cell);
  lock.setAttribute('aria-expanded','false');lock.setAttribute('aria-controls',detail.id);
  lock.setAttribute('aria-label',word+' cümlelerini aç');
  lock.addEventListener('click',()=>{
   detail.hidden=!detail.hidden;lock.textContent=detail.hidden?'🔒':'🔓';
   lock.setAttribute('aria-expanded',String(!detail.hidden));lock.setAttribute('aria-label',word+(detail.hidden?' cümlelerini aç':' cümlelerini gizle'));closeWord();
  });
  buttons.append(lock);row.append(buttons);tbody.append(row,detail);
 });
}
const comparison=document.getElementById('compare-forms');
persons.forEach((person,i)=>{
 const tr=element('tr');
 const p=element('td','',person);p.lang='es';p.dataset.es='';
 const a=element('td','',forms.ser[i]);a.lang='es';a.dataset.es='';a.dataset.highlight='ser';
 const b=element('td','',forms.estar[i]);b.lang='es';b.dataset.es='';b.dataset.highlight='estar';
 tr.append(p,a,b);comparison.append(tr);
});
renderIntroduction('intro-ser',[['Yo soy David.','Ben David’im.'],['Mi madre es abogada.','Annem avukattır.']]);
renderIntroduction('intro-estar',[['Yo estoy triste.','Ben üzgünüm.'],['Madrid está en España.','Madrid İspanya’dadır.']]);
renderTable('ser-table','ser');renderCategories('ser-categories',serCategories,'ser');
renderTable('estar-table','estar');renderCategories('estar-categories',estarCategories,'estar');
renderAdjectives();renderTable('tener-table','tener');renderCategories('tener-categories',tenerCategories,'tener');
function decorateSpanish(){
 const roots=[...document.querySelectorAll('[data-es]')];
 roots.forEach(root=>{
  const walk=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);const texts=[];
  while(walk.nextNode()){if(!walk.currentNode.parentElement.closest('.es-word'))texts.push(walk.currentNode)}
  texts.forEach(node=>{
   const source=node.nodeValue, rx=/\p{L}+(?:['’]\p{L}+)*/gu, matches=[...source.matchAll(rx)];if(!matches.length)return;
   const fragment=document.createDocumentFragment();let at=0;
   for(const match of matches){
    fragment.append(source.slice(at,match.index));
    const term=match[0];const button=element('button','es-word',term);button.type='button';button.lang='es';
    button.dataset.word=term.toLocaleLowerCase('es');button.setAttribute('aria-expanded','false');button.setAttribute('aria-controls','word-popover');
    const mode=root.dataset.highlight||root.closest('[data-highlight]')?.dataset.highlight||'';
    if((mode==='ser'||mode==='both')&&SER.has(button.dataset.word))button.classList.add('red-verb');
    if((mode==='estar'||mode==='both')&&ESTAR.has(button.dataset.word))button.classList.add('red-verb');
    fragment.append(button);at=match.index+term.length;
   }
   fragment.append(source.slice(at));node.replaceWith(fragment);
  });
 });
}
decorateSpanish();
const pop=document.getElementById('word-popover'),close=document.getElementById('word-close');let active=null;
function closeWord(restore=false){if(!active)return;const last=active;active=null;last.setAttribute('aria-expanded','false');pop.hidden=true;if(restore)last.focus({preventScroll:true})}
function positionWord(){
 if(!active)return;
 const bounds=active.getBoundingClientRect(),w=pop.offsetWidth,h=pop.offsetHeight;
 pop.style.left=Math.max(12,Math.min(bounds.left,innerWidth-w-12))+'px';
 pop.style.top=Math.max(12,Math.min(bounds.bottom+8+h<innerHeight?bounds.bottom+8:bounds.top-h-8,innerHeight-h-12))+'px';
}
function showWord(button){
 if(active===button){closeWord(true);return}closeWord();
 const word=button.dataset.word;
 const data=glossary[word]||[word+' (bağlama göre incele)','Discuss in context',word,'İspanyolca sözcük'];
 const example=button.closest('.es-sentence,td,[data-es]')||button;
 document.getElementById('word-title').textContent=button.textContent;
 document.getElementById('word-tr').textContent=data[0];
 document.getElementById('word-en').textContent=data[1];
 document.getElementById('word-lemma').textContent=data[2];
 document.getElementById('word-form').textContent=data[3];
 document.getElementById('word-role').textContent=button.classList.contains('red-verb')?'SER / ESTAR fiil çekimi':'Örnek cümledeki sözcük';
 document.getElementById('word-example').textContent=example.textContent.trim().slice(0,240);
 document.getElementById('word-context').open=false;active=button;button.setAttribute('aria-expanded','true');pop.hidden=false;positionWord();
}
document.addEventListener('click',event=>{
 const button=event.target.closest('.es-word');
 if(button)showWord(button);else if(!pop.contains(event.target))closeWord();
});
close.addEventListener('click',()=>closeWord(true));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&active)closeWord(true)});
window.addEventListener('resize',positionWord);
window.addEventListener('scroll',positionWord,true);
const tabs=[...document.querySelectorAll('[role=tab]')];
const pages=tabs.map(t=>document.getElementById(t.getAttribute('aria-controls')));
const prev=document.getElementById('prev'),next=document.getElementById('next'),finish=document.getElementById('finish');
let current=0;
function showPage(n,focus=false){
 closeWord();current=n;
 tabs.forEach((t,i)=>{t.setAttribute('aria-selected',String(n===i));t.tabIndex=n===i?0:-1;pages[i].hidden=n!==i});
 prev.hidden=n===0;next.hidden=n===tabs.length-1;finish.hidden=n!==tabs.length-1;
 document.getElementById('counter').textContent=(n+1)+' / '+tabs.length;
 if(focus){pages[n].querySelector('h2')?.focus({preventScroll:true});window.scrollTo({top:0,behavior:'instant'})}
}
tabs.forEach((tab,i)=>{
 tab.addEventListener('click',()=>showPage(i,true));
 tab.addEventListener('keydown',event=>{
  const n={ArrowLeft:(i+tabs.length-1)%tabs.length,ArrowRight:(i+1)%tabs.length,Home:0,End:tabs.length-1}[event.key];
  if(n===undefined)return;event.preventDefault();showPage(n);tabs[n].focus();
 });
});
prev.addEventListener('click',()=>showPage(current-1,true));next.addEventListener('click',()=>showPage(current+1,true));
const initial=pages.findIndex(p=>'#'+p.id===location.hash);
if(location.hash)history.replaceState(history.state,'',location.pathname+location.search);
showPage(Math.max(0,initial));
for(const dialog of document.querySelectorAll('dialog')){
 let trigger;
 document.querySelectorAll('[data-dialog="'+dialog.id+'"]').forEach(button=>button.addEventListener('click',()=>{
  trigger=button;closeWord();dialog.showModal();dialog.scrollTop=0;button.setAttribute('aria-expanded','true');if(dialog.id==='classroom-homework')document.body.classList.add('classroom-homework-open');
 }));
 dialog.addEventListener('close',()=>{document.body.classList.remove('classroom-homework-open');trigger?.setAttribute('aria-expanded','false');trigger?.focus({preventScroll:true})});
}
document.querySelectorAll('[data-classroom-print]').forEach(button=>button.addEventListener('click',()=>window.print()));
