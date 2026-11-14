(()=>{
 'use strict';
 const $=id=>document.getElementById(id),E=window.A11HomeworkEngine;
 const SEND_URL='https://script.google.com/macros/s/AKfycbwbAQtk4nhM73aqYCKwg0z5s5qxPaCAWeLncNVHtSQ2jHbuo7SomG4PJpOBN8C0sXzTQw/exec';
 const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 let data,questions,states=[],cur=0,student='',sent=false,sending=false;
 const storageKey=()=>data.version+':'+student;
 const readDraft=()=>{try{return JSON.parse(localStorage.getItem(storageKey())||'null');}catch(_){return null;}};
 function save(){try{localStorage.setItem(storageKey(),JSON.stringify({version:data.version,states,cur,sent}));}catch(_){}}
 const answered=()=>states.filter(s=>s.checked).length;
 function clipComplete(id){return questions.every((q,i)=>q.audioId!==id||states[i].checked);}
 function stopAudio(){document.querySelectorAll('#audioRack audio').forEach(a=>a.pause());}
 function changeScreen(screen){stopAudio();['cover','quiz','confirm','result'].forEach(id=>$(id).hidden=id!==screen);document.body.dataset.screen=screen;window.scrollTo({top:0,behavior:'instant'});}
 function start(){
  student=$('introName').value.trim();if(!student){$('coverError').textContent='Başlamadan önce adını seç.';$('introName').focus();return;}
  $('coverError').textContent='';const draft=readDraft();
  if(draft?.version===data.version&&Array.isArray(draft.states)&&draft.states.length===50){
   states=draft.states.map((s,i)=>({value:questions[i].type==='mc'?(Number.isInteger(s.value)&&s.value>=0&&s.value<questions[i].options.length?s.value:null):String(s.value??'').slice(0,250),checked:!!s.checked}));
   cur=Math.max(0,Math.min(49,Number(draft.cur)||0));sent=!!draft.sent;
  }else{states=questions.map(q=>({value:q.type==='mc'?null:'',checked:false}));cur=0;sent=false;}
  $('studentLabel').textContent=student;changeScreen('quiz');render();save();
 }
 function go(index){$('questionList').open=false;cur=Math.max(0,Math.min(49,index));render();save();$('questionTitle').focus({preventScroll:true});const q=questions[cur],anchor=q.audioId?$('audioRack'):q.textId?$('readingCard'):$('questionCard');anchor.scrollIntoView({block:'start',behavior:'smooth'});}
 function updateNavigation(){
  const current=questions[cur].section;
  $('sectionNav').innerHTML=data.sections.map((s,i)=>'<button type="button" data-section="'+i+'" class="section-tab '+(s.id===current?'active':'')+'" '+(s.id===current?'aria-current="step"':'')+'><span>'+s.emoji+'</span><span>'+esc(s.title)+'<small>'+states.slice(i*10,i*10+10).filter(a=>a.checked).length+'/10</small></span></button>').join('');
  $('sectionNav').querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>go(Number(b.dataset.section)*10)));
  $('questionMap').innerHTML=questions.map((q,i)=>{
   let c='';if(states[i].checked){const r=E.grade(q,states[i].value);c=r.status==='correct'?'done':r.status==='accent'?'accent':'review';}
   return '<button type="button" data-index="'+i+'" class="map-button '+c+' '+(i===cur?'current':'')+'" aria-label="'+(i+1)+'. soru'+(states[i].checked?', cevaplandı':'')+'" '+(i===cur?'aria-current="step"':'')+'>'+(i+1)+'</button>';
  }).join('');
  $('questionMap').querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>go(Number(b.dataset.index))));
  $('answeredCount').textContent=answered()+' / 50 soru yanıtlandı';$('position').textContent='Soru '+(cur+1)+' / 50';$('navPosition').textContent=(cur+1)+' / 50';$('progressBar').style.width=(answered()*2)+'%';$('progressTrack').setAttribute('aria-valuenow',answered());
  $('currentSection').textContent=data.sections.find(s=>s.id===current).title;
  const sum=E.summarize(questions,states);$('liveCorrect').textContent=sum.correct;$('liveWrong').textContent=sum.wrong;$('liveAccent').textContent=sum.accent;
 }
 function render(){
  const q=questions[cur],s=states[cur],section=data.sections.find(x=>x.id===q.section);
  $('sectionEyebrow').textContent=section.emoji+' '+section.title+' · Soru '+(cur+1);
  $('questionTitle').textContent=q.prompt;
  $('questionHint').textContent=q.hint||(q.type==='fill'?'Cevabını yaz, ardından Kontrol et düğmesine bas.':'Bir seçeneğe tıkla. Doğru cevap ve açıklama hemen görünecek.');
  if(q.textId){const text=data.texts[q.textId];$('readingTitle').textContent=text.title;$('readingText').textContent=text.text;$('readingCard').hidden=false;}else $('readingCard').hidden=true;
  updateAudio(q.audioId);
  $('answerArea').innerHTML=q.type==='mc'?'<fieldset class="choices"><legend class="sr-only">Cevabını seç</legend>'+q.options.map((o,j)=>'<label class="choice '+(s.checked?(j===q.correct?'correct':s.value===j?'wrong':''):(s.value===j?'selected':''))+'"><input type="radio" name="answer" value="'+j+'" '+(s.value===j?'checked':'')+' '+(s.checked?'disabled':'')+'><span class="choice-letter" aria-hidden="true">'+'ABCD'[j]+'</span><span>'+esc(o)+'</span><span class="choice-status" aria-hidden="true">'+(s.checked?(j===q.correct?'✓':s.value===j?'✗':''):'')+'</span></label>').join('')+'</fieldset>':'<label for="answerInput" class="input-label">Cevabın</label><div class="input-wrap"><input id="answerInput" type="text" autocomplete="off" autocapitalize="sentences" spellcheck="false" maxlength="250" '+(q.inputMode?'inputmode="'+q.inputMode+'"':'')+' value="'+esc(s.value)+'" '+(s.checked?'disabled':'')+' placeholder="İspanyolca cevabını yaz…"></div>';
  $('answerArea').querySelectorAll('input[type=radio]').forEach(input=>input.addEventListener('change',()=>{s.value=Number(input.value);check();}));
  const input=$('answerInput');if(input){input.addEventListener('input',()=>{s.value=input.value;save();});input.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();check();}});}
  $('answerActions').hidden=q.type==='mc';$('checkButton').disabled=s.checked;$('checkButton').textContent=s.checked?'✓ Yanıt kaydedildi':'Kontrol et ✓';$('answerError').textContent='';
  $('previousButton').disabled=cur===0;$('nextButton').textContent=cur===49?'Teslime geç →':'İleri →';
  renderFeedback();updateNavigation();
 }
 function check(){
  const q=questions[cur],s=states[cur];if(s.checked)return;
  if(s.value===null||String(s.value).trim()===''){$('answerError').textContent='Önce cevabını yaz veya bir seçenek seç.';return;}
  s.checked=true;sent=false;save();render();$('feedback').scrollIntoView({block:'nearest',behavior:'smooth'});
 }
 function renderFeedback(){
  const q=questions[cur],s=states[cur],box=$('feedback');box.hidden=!s.checked;
  if(!s.checked)return;
  const r=E.grade(q,s.value);box.className='feedback '+r.status;
  box.innerHTML='<strong>'+(r.status==='correct'?'✅ Doğru · 2 puan':r.status==='accent'?'✍️ Yapı doğru; vurgu işaretini düzelt · 1 puan':'✗ Yanlış · 0 puan')+'</strong>'+(r.status==='correct'?'':'<p class="model-answer">'+(q.type==='fill'?'Doğru cevap örneği: ':'Doğru cevap: ')+'<span lang="es">'+esc(r.answer)+'</span></p>')+'<p>'+esc(q.explanation)+'</p>'+(q.evidence?'<p class="evidence" lang="es">🇪🇸 '+esc(q.evidence)+'</p>':'')+(q.translation?'<p class="translation">🇹🇷 '+esc(q.translation)+'</p>':'');
 }
 function setupAudio(){
  $('audioRack').innerHTML=data.clips.map(clip=>{
   let labels=clip.id==='pablo'?['Eva','Pablo']:clip.id==='registro'?['Görevli','Luis']:['Lucía','Lucía'];
   return '<section class="audio-card" id="audio-'+clip.id+'" hidden><div class="audio-top"><span class="audio-icon" aria-hidden="true">🎧</span><div><h2>'+esc(clip.title)+'</h2><p>'+esc(clip.description)+'</p></div></div><audio id="player-'+clip.id+'" controls preload="metadata" aria-label="'+esc(clip.title)+'"><source src="'+esc(clip.src)+'" type="audio/mpeg">Tarayıcın ses çalmayı desteklemiyor.</audio><div class="audio-tools"><button type="button" data-replay="'+clip.id+'">↺ Baştan dinle</button><label>Dinleme hızı <select data-speed="'+clip.id+'"><option value="0.85">Biraz yavaş</option><option value="1" selected>Normal</option></select></label><span class="audio-duration">'+(clip.duration?Math.round(clip.duration)+' sn':'')+'</span></div><p class="audio-error" id="audio-error-'+clip.id+'" hidden>Ses yüklenemedi. İnternet bağlantını kontrol edip yeniden oynatmayı dene.</p><p class="transcript-status" id="transcript-status-'+clip.id+'"></p><details class="transcript" id="transcript-'+clip.id+'" hidden><summary>📝 Konuşma metni ve Türkçesi</summary><div lang="es">'+clip.turns.map((t,i)=>'<p><strong>'+esc(labels[clip.turns.length===1?0:i%2])+':</strong> '+esc(t[1])+'</p>').join('')+'</div><div class="transcript-tr"><strong>🇹🇷 Türkçesi</strong><p>'+esc(clip.translation)+'</p></div></details></section>';
  }).join('');
  data.clips.forEach(clip=>{
   const player=$('player-'+clip.id);
   player.addEventListener('play',()=>document.querySelectorAll('#audioRack audio').forEach(a=>{if(a!==player)a.pause();}));
   player.addEventListener('error',()=>{$('audio-error-'+clip.id).hidden=false;});
  });
  $('audioRack').querySelectorAll('[data-replay]').forEach(b=>b.addEventListener('click',()=>{const a=$('player-'+b.dataset.replay);a.currentTime=0;a.play().catch(()=>{$('audio-error-'+b.dataset.replay).hidden=false;});}));
  $('audioRack').querySelectorAll('[data-speed]').forEach(s=>s.addEventListener('change',()=>{$('player-'+s.dataset.speed).playbackRate=Number(s.value);}));
 }
 function updateAudio(id){
  $('audioRack').hidden=!id;
  data.clips.forEach(clip=>{
   const active=id===clip.id;$('audio-'+clip.id).hidden=!active;
   if(!active)$('player-'+clip.id).pause();
   if(active){const count=questions.filter((q,i)=>q.audioId===id&&states[i].checked).length,total=questions.filter(q=>q.audioId===id).length;
    const complete=clipComplete(id);$('transcript-status-'+id).textContent=count+' / '+total+' soru cevaplandı'+(complete?' · Metni açabilirsin.':' · Metin, bu kaydın soruları bitince açılacak.');$('transcript-'+id).hidden=!complete;if(!complete)$('transcript-'+id).open=false;
   }
  });
 }
 function requestFinish(){
  if(sent){showResult();return;}
  syncStudentSelect();const left=50-answered();
  $('confirmProgress').textContent=left?answered()+' / 50 soru yanıtlandı. '+left+' soru henüz kontrol edilmedi; teslim edersen bu sorular boş sayılır ve 0 puan alır.':'50 / 50 soru yanıtlandı. Ödevin teslim edilmeye hazır!';
  $('confirmProgress').classList.toggle('has-blanks',!!left);
  $('sendButton').disabled=false;$('sendButton').textContent='✔ Ödevi Teslim Et';$('sendStatus').textContent='';changeScreen('confirm');
 }
 function syncStudentSelect(){
  const select=$('studentName');if(!Array.from(select.options).some(o=>o.value===student)){const option=document.createElement('option');option.value=student;option.textContent=student;select.appendChild(option);}select.value=student;
 }
 function showResult(){
  changeScreen('result');const sum=E.summarize(questions,states);
  $('resultName').textContent=student;$('resultPoints').textContent=sum.points;$('resultCorrect').textContent=sum.correct;$('resultAccent').textContent=sum.accent;$('resultWrong').textContent=sum.wrong;$('resultBlank').textContent=sum.blank;
  $('sectionResults').innerHTML=data.sections.map(s=>{const d=sum.sections[s.id];return '<div class="section-result"><div><strong>'+s.emoji+' '+esc(s.title)+'</strong><span>'+d.points+' / '+d.max+'</span></div><progress max="'+d.max+'" value="'+d.points+'">'+d.points+'</progress><p>'+(d.points>=18?'Bu bölümde çok iyi ilerledin.':esc(s.description)+' Bu bölümdeki cevaplarını gözden geçir.')+'</p></div>';}).join('');
  $('resultSendStatus').textContent=sent?'✓ Ödevin gönderildi. Sonucunu öğrenci portalından kontrol edebilirsin.':'';
  $('reviewList').innerHTML=questions.map((q,i)=>{
   const state=states[i],r=state.checked?E.grade(q,state.value):{status:'blank',points:0,answer:q.type==='mc'?q.options[q.correct]:q.answers[0]};
   if(r.status==='correct')return '';
   const chosen=state.checked?(q.type==='mc'?q.options[state.value]:state.value):'Cevaplanmadı';
   return '<article class="review-card"><p class="eyebrow">SORU '+(i+1)+' · '+r.points+' / 2 PUAN</p><h3>'+esc(q.prompt)+'</h3><p>Senin cevabın: <strong>'+esc(chosen)+'</strong></p><p>Doğru cevap örneği: <strong lang="es">'+esc(r.answer)+'</strong></p><p>'+esc(q.explanation)+'</p>'+(q.evidence?'<p lang="es">🇪🇸 '+esc(q.evidence)+'</p>':'')+'</article>';
  }).join('')||'<p class="empty-review">🎉 Tüm soruları doğru cevapladın.</p>';
  save();
 }
 async function submit(){
  if(sending||sent)return;
  const selected=$('studentName').value.trim();if(selected!==student){$('sendStatus').textContent='Bu çalışma '+student+' adına başladı. Teslim için aynı adı seç.';$('studentName').focus();return;}
  showResult();$('retrySubmission').hidden=true;
  sending=true;$('sendButton').disabled=true;$('sendButton').textContent='⏳ Gönderiliyor…';$('resultSendStatus').textContent='⏳ Sonucun gönderiliyor. Lütfen sayfayı kapatma.';
  try{
   await fetch(SEND_URL,{method:'POST',mode:'no-cors',headers:{'Content-Type':'application/json'},body:JSON.stringify(E.payload(student,E.summarize(questions,states)))});
   sent=true;save();$('sendButton').textContent='✓ Ödev gönderildi';$('resultSendStatus').textContent='✓ Ödevin gönderildi. Sonucunu öğrenci portalından kontrol edebilirsin.';
  }catch(_){$('resultSendStatus').textContent='Gönderim tamamlanamadı. Cevapların korunuyor; bağlantını kontrol edip yeniden dene.';$('retrySubmission').hidden=false;$('sendButton').disabled=false;$('sendButton').textContent='Yeniden gönder';}
  finally{sending=false;}
 }
 function printHomework(){
  $('printSheet').innerHTML='<h1>A1.1 · 9+10. Ders Ödevi</h1><p>Presentación personal · 50 soru · 100 puan</p>'+questions.map((q,i)=>{
   const stimulus=q.textId?'<p class="print-stimulus">'+esc(data.texts[q.textId].text)+'</p>':'';
   return '<article><h2>'+(i+1)+'. '+esc(q.prompt)+'</h2>'+stimulus+(q.audioId?'<p>🎧 '+esc(data.clips.find(c=>c.id===q.audioId).title)+' · Ses kaydı için ödev sayfasını aç.</p>':'')+(q.type==='mc'?'<ol type="A">'+q.options.map(o=>'<li>'+esc(o)+'</li>').join('')+'</ol>':'<p>________________________________________________________</p>')+'</article>';
  }).join('');window.print();
 }
 async function init(){
  try{
   const response=await fetch('assets/a11-9-10/questions.json?v=20261114');if(!response.ok)throw Error('data');data=await response.json();questions=data.questions;
   if(questions.length!==50||data.sections.some(s=>questions.filter(q=>q.section===s.id).length!==10))throw Error('count');
   setupAudio();$('startButton').disabled=false;$('loadingNote').hidden=true;
   $('coverSections').innerHTML=data.sections.map(s=>'<div class="cover-section"><span>'+s.emoji+'</span><div><strong>'+esc(s.title)+'</strong><small>10 soru · 20 puan</small></div></div>').join('');
   $('startButton').addEventListener('click',start);$('checkButton').addEventListener('click',check);$('previousButton').addEventListener('click',()=>go(cur-1));$('nextButton').addEventListener('click',()=>cur===49?requestFinish():go(cur+1));$('finishButton').addEventListener('click',requestFinish);$('confirmBack').addEventListener('click',()=>{changeScreen('quiz');render();});$('retrySubmission').addEventListener('click',requestFinish);$('sendButton').addEventListener('click',submit);$('backToQuestions').addEventListener('click',()=>{changeScreen('quiz');render();});$('switchStudent').addEventListener('click',()=>changeScreen('cover'));$('printButton').addEventListener('click',printHomework);$('restartButton').addEventListener('click',()=>$('restartDialog').showModal());$('restartCancel').addEventListener('click',()=>$('restartDialog').close());$('restartConfirm').addEventListener('click',()=>{states=questions.map(q=>({value:q.type==='mc'?null:'',checked:false}));cur=0;sent=false;save();$('restartDialog').close();changeScreen('quiz');render();});
   $('introName').addEventListener('change',()=>{const name=$('introName').value;try{$('draftNote').textContent=localStorage.getItem(data.version+':'+name)?'Bu isimle kayıtlı bir çalışman var. Başladığında kaldığın yerden devam edeceksin.':'';}catch(_){}});
  }catch(_){$('loadingNote').textContent='Çalışma yüklenemedi. Sayfayı yenileyip tekrar dene.';}
 }
 init();
})();

