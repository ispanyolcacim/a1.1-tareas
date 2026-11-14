/* A1.1 9–10: deterministic grading, used by the page and its regression checks. */
(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory();else root.A11HomeworkEngine=factory();})(typeof globalThis!=='undefined'?globalThis:this,function(){
 'use strict';
 function normalize(value){return String(value??'').normalize('NFC').trim().toLocaleLowerCase('es').replace(/[¿?¡!.,;:]/g,'').replace(/\s+/g,' ');}
 function accents(value){return normalize(value).replace(/[áéíóúü]/g,c=>({'á':'a','é':'e','í':'i','ó':'o','ú':'u','ü':'u'}[c]));}
 function grade(question,value){
  if(question.type==='mc'){
   if(value===null||value===undefined||value==='')return {points:0,status:'blank',answer:''};
   const correct=Number(value)===question.correct;
   return {points:correct?2:0,status:correct?'correct':'wrong',answer:question.options[question.correct]};
  }
  const entered=normalize(value),answer=question.answers[0];
  if(!entered)return {points:0,status:'blank',answer};
  if(question.phone){
   const acceptable=/^[\d\s().+\-]+$/.test(String(value));
   const number=String(value).replace(/\D/g,'');
   const correct=acceptable&&question.answers.some(a=>String(a).replace(/\D/g,'')===number);
   return {points:correct?2:0,status:correct?'correct':'wrong',answer};
  }
  if(question.answers.some(a=>normalize(a)===entered))return {points:2,status:'correct',answer};
  if(question.accentPartial!==false&&question.answers.some(a=>accents(a)===accents(value)))return {points:1,status:'accent',answer};
  return {points:0,status:'wrong',answer};
 }
 function summarize(questions,states){
  let points=0,correct=0,accent=0,wrong=0,blank=0;
  const sections={};
  questions.forEach((q,i)=>{
   const state=states[i],result=state?.checked?grade(q,state.value):{points:0,status:'blank'};
   points+=result.points;
   if(result.status==='correct')correct++;else if(result.status==='accent')accent++;else if(result.status==='wrong')wrong++;else blank++;
   if(!sections[q.section])sections[q.section]={points:0,max:0,answered:0};
   sections[q.section].points+=result.points;sections[q.section].max+=2;
   if(state?.checked)sections[q.section].answered++;
  });
  return {points,correct,accent,wrong,blank,sections};
 }
 function payload(student,summary){
  return {ogrenci:student,grup:'A1.1',odev:'H3 – 9-10.Ders (1. KISIM)',puan:summary.points,dogru:summary.correct,yanlis:summary.wrong+summary.accent+summary.blank};
 }
 return {normalize,grade,summarize,payload};
});
