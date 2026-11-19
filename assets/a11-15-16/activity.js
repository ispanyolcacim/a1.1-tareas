import { answers, interview, questions, reading } from './content.js';
import { glossary } from './glossary.js';

const roles = {
  özne: 'Özne',
  fiil: 'Fiil veya fiil öbeği',
  nesne: 'Doğrudan nesne',
  dolaylı: 'Dolaylı nesne',
  özellik: 'Özellik bildiren öbek',
  diğer: 'Diğer tümleç veya belirteç',
  bağlaç: 'Bağlayıcı',
  işaret: 'Ünlem veya konuşma belirteci',
};

const tabs = [...document.querySelectorAll('[role=tab]')];
const pages = tabs.map(tab => document.getElementById(tab.getAttribute('aria-controls')));
const previous = document.querySelector('#prev');
const next = document.querySelector('#next');
const finish = document.querySelector('#finish');
const popover = document.querySelector('#word-popover');
const wordClose = document.querySelector('#word-close');
let activeIndex = -1;
let activeWord;

function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function appendWords(parent, text) {
  let from = 0;
  for (const match of text.matchAll(/(\p{L}+)(?:\{([^}]+)\})?|\[(\d+)\]/gu)) {
    const [token, word, sense, gapNumber] = match;
    parent.append(text.slice(from, match.index));
    if (gapNumber) {
      parent.append(makeGap(Number(gapNumber)));
    } else {
      const button = element('button', 'vocab-word', word);
      button.type = 'button';
      button.dataset.word = sense ?? word.toLowerCase();
      button.setAttribute('aria-expanded', 'false');
      button.setAttribute('aria-controls', 'word-popover');
      parent.append(button);
    }
    from = match.index + token.length;
  }
  parent.append(text.slice(from));
}

function sentence(parts) {
  const line = element('span', 'sentence');
  parts.forEach(([role, text], i) => {
    if (i > 0) line.append(' ');
    const phrase = element('span', 'phrase');
    phrase.dataset.role = role;
    phrase.dataset.tone = i;
    appendWords(phrase, text);
    line.append(phrase);
  });
  return line;
}

function appendSentences(parent, sentences) {
  sentences.forEach((parts, i) => {
    if (i > 0) parent.append(' ');
    parent.append(sentence(parts));
  });
}

function revealButton(label, target, update) {
  const lock = element('button', 'lock', '🔒');
  lock.type = 'button';
  lock.setAttribute('aria-controls', target.id);
  lock.setAttribute('aria-expanded', 'false');
  lock.setAttribute('aria-label', label + ' cevabını göster');
  lock.addEventListener('click', () => {
    const revealed = target.hidden;
    closeWord();
    target.hidden = !revealed;
    lock.textContent = revealed ? '🔓' : '🔒';
    lock.setAttribute('aria-expanded', String(revealed));
    lock.setAttribute('aria-label', label + (revealed ? ' cevabını gizle' : ' cevabını göster'));
    update(revealed);
  });
  return lock;
}

function makeGap(number) {
  const gap = element('span', 'gap');
  const numberLabel = element('span', 'gap-number', '(' + number + ')');
  numberLabel.setAttribute('aria-hidden', 'true');

  const input = element('input');
  input.type = 'text';
  input.lang = 'es';
  input.autocomplete = 'off';
  input.setAttribute('autocapitalize', 'off');
  input.spellcheck = false;
  input.setAttribute('aria-label', number + '. boşluk');

  const answer = element('span', 'gap-answer');
  answer.id = 'gap-answer-' + number;
  answer.hidden = true;
  appendWords(answer, answers[number - 1]);
  const lock = revealButton(number + '. boşluğun', answer, revealed => { input.hidden = revealed; });
  gap.append(numberLabel, input, answer, lock);
  return gap;
}

function addQuestion(question, index) {
  const number = index + 1;
  const card = element('section', 'question-card');
  const head = element('div', 'question-heading');
  const heading = element('h3');
  heading.id = 'question-' + number;
  heading.lang = 'es';
  heading.append(sentence(question.prompt));
  card.setAttribute('aria-labelledby', heading.id);

  const options = element('div', 'choices');
  options.setAttribute('role', 'radiogroup');
  options.setAttribute('aria-labelledby', heading.id);
  const letters = ['a', 'b', 'c', 'd'];
  question.choices.forEach((choice, choiceIndex) => {
    const row = element('div', 'choice');
    const radio = element('input');
    radio.type = 'radio';
    radio.name = heading.id;
    radio.id = heading.id + '-' + letters[choiceIndex];

    const letter = element('label', '', letters[choiceIndex]);
    letter.htmlFor = radio.id;
    letter.id = radio.id + '-letter';
    const option = sentence(choice);
    option.id = radio.id + '-text';
    option.lang = 'es';
    radio.setAttribute('aria-labelledby', letter.id + ' ' + option.id);
    row.append(radio, letter, option);
    row.addEventListener('click', event => {
      if (event.target === row || event.target === option) radio.click();
    });
    options.append(row);
  });

  const answer = element('p', 'question-answer');
  answer.id = heading.id + '-answer';
  answer.hidden = true;
  answer.setAttribute('aria-live', 'polite');
  const solution = sentence(question.choices[question.correct]);
  solution.lang = 'es';
  answer.append(element('strong', '', 'Doğru cevap · ' + letters[question.correct]), solution);
  const lock = revealButton(number + '. sorunun', answer, revealed => {
    options.children[question.correct].classList.toggle('is-correct', revealed);
  });
  head.append(element('span', 'question-number', String(number)), heading, lock);
  card.append(head, options, answer);
  document.querySelector('#listening-questions').append(card);
}

for (const title of document.querySelectorAll('h1 [lang=es], h3[lang=es]')) {
  const text = title.textContent;
  title.replaceChildren();
  appendWords(title, text);
}
questions.forEach(addQuestion);
for (const paragraph of reading) {
  const line = element('p');
  line.lang = 'es';
  appendSentences(line, paragraph);
  document.querySelector('#reading-text').append(line);
}
for (const [speaker, sentences] of interview) {
  const turn = element('div', 'turn');
  const label = element('strong', 'speaker');
  if (speaker === 'A') label.textContent = 'A:';
  else appendWords(label, speaker + ':');
  const text = element('div');
  appendSentences(text, sentences);
  turn.append(label, text);
  document.querySelector('#interview-text').append(turn);
}

function placeWord() {
  if (!activeWord) return;
  const bounds = activeWord.getBoundingClientRect();
  const { offsetWidth, offsetHeight } = popover;
  const below = bounds.bottom + 7;
  const top = below + offsetHeight + 12 <= innerHeight ? below : bounds.top - offsetHeight - 7;
  popover.style.left = Math.max(12, Math.min(bounds.left, innerWidth - offsetWidth - 12)) + 'px';
  popover.style.top = Math.max(12, top) + 'px';
}

function closeWord(restoreFocus = false) {
  if (!activeWord) return;
  const anchor = activeWord;
  activeWord = undefined;
  anchor.setAttribute('aria-expanded', 'false');
  anchor.closest('.sentence')?.classList.remove('word-active');
  popover.hidden = true;
  if (restoreFocus) anchor.focus({ preventScroll: true });
}

function openWord(button) {
  if (button === activeWord) {
    closeWord(true);
    return;
  }
  closeWord();
  const [tr, en, lemma, form] = glossary[button.dataset.word];
  const context = button.closest('.sentence');
  const example = (context ?? button.closest('[lang=es]') ?? button).cloneNode(true);
  for (const gap of example.querySelectorAll('.gap')) {
    const answer = gap.querySelector('.gap-answer');
    gap.replaceWith(answer.hidden ? '___' : answer.textContent);
  }

  document.querySelector('#word-title').textContent = button.textContent;
  document.querySelector('#word-tr').textContent = tr;
  document.querySelector('#word-en').textContent = en;
  document.querySelector('#word-lemma').textContent = lemma;
  document.querySelector('#word-form').textContent = form;
  document.querySelector('#word-role').textContent = roles[button.closest('.phrase')?.dataset.role] ?? 'Ders başlığı veya konuşmacı adı';
  document.querySelector('#word-example').textContent = example.textContent.trim();
  document.querySelector('#word-context').open = false;
  activeWord = button;
  context?.classList.add('word-active');
  button.setAttribute('aria-expanded', 'true');
  popover.hidden = false;
  placeWord();
  wordClose.focus({ preventScroll: true });
}

document.addEventListener('click', event => {
  const word = event.target.closest('.vocab-word');
  if (word) openWord(word);
  else if (!popover.contains(event.target)) closeWord();
});
wordClose.addEventListener('click', () => closeWord(true));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && activeWord) closeWord(true);
});
window.addEventListener('resize', placeWord);
document.addEventListener('scroll', event => {
  if (!popover.contains(event.target)) placeWord();
}, true);

function showPage(index, focusHeading = false) {
  closeWord();
  if (activeIndex >= 0 && activeIndex !== index) {
    const player = pages[activeIndex].querySelector('iframe');
    player.contentWindow?.postMessage(JSON.stringify({ method: 'pause' }), new URL(player.src).origin);
  }
  activeIndex = index;
  tabs.forEach((tab, i) => {
    tab.setAttribute('aria-selected', String(index === i));
    tab.tabIndex = i === index ? 0 : -1;
    pages[i].hidden = i !== index;
  });
  previous.hidden = index === 0;
  next.hidden = index === pages.length - 1;
  finish.hidden = !next.hidden;
  document.querySelector('#counter').textContent = (index + 1) + ' / ' + pages.length;
  if (focusHeading) {
    pages[index].querySelector('h2').focus({ preventScroll: true });
    window.scrollTo(0, 0);
  }
}

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => showPage(index, true));
  tab.addEventListener('keydown', event => {
    const tabTargets = {
      ArrowLeft: (index + tabs.length - 1) % tabs.length,
      ArrowRight: (index + 1) % tabs.length,
      Home: 0,
      End: tabs.length - 1,
    };
    const target = tabTargets[event.key];
    if (target === undefined) return;
    event.preventDefault();
    showPage(target);
    tabs[target].focus();
  });
});
previous.addEventListener('click', () => showPage(activeIndex - 1, true));
next.addEventListener('click', () => showPage(activeIndex + 1, true));
const initialIndex = pages.findIndex(page => '#' + page.id === location.hash);
if (location.hash) history.replaceState(history.state, '', location.pathname + location.search);
showPage(Math.max(0, initialIndex));

for (const dialog of document.querySelectorAll('dialog')) {
  let trigger;
  for (const button of document.querySelectorAll(`[data-dialog="${dialog.id}"]`)) {
    button.addEventListener('click', () => {
      closeWord();
      trigger = button;
      dialog.showModal();
      dialog.scrollTop = 0;
      button.setAttribute('aria-expanded', 'true');
      if (dialog.id === 'classroom-homework') document.body.classList.add('classroom-homework-open');
    });
  }
  dialog.addEventListener('close', () => {
    document.body.classList.remove('classroom-homework-open');
    trigger.setAttribute('aria-expanded', 'false');
    trigger.focus({ preventScroll: true });
  });
}

for (const button of document.querySelectorAll('[data-classroom-print]')) {
  button.addEventListener('click', () => window.print());
}
