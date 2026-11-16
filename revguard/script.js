'use strict';
// P4 and P8 text and animation states from the existing presentation.
const phases = ['Evidence missing','Locate the record','Record found','Evidence included','Authorization','Requirement changed','Request updated','Claim submitted','Denial received','Build the response','Response assembled','Apply reviewed feedback'];
const lines = ['A required supporting record is missing','RevGuard locates the supporting record','The record arrives','Evidence included. The request can move forward.','The request reaches authorization','A payer requirement has changed','RevGuard updates the request','The claim is submitted','The payer denies the claim','RevGuard builds the response around the evidence','Response and supporting evidence are together','Reviewed feedback improves the next relevant case'];
const positions = [8,8,8,8,36,36,36,63,90,90,90,8];
const $ = id => document.getElementById(id);
const durations = [650,1700,900,1600,1200,2600,1700,1100,2400,2300,1800,3000];
const totalDuration = durations.reduce((a,b) => a+b,0);
const stageNames = ['Visit and documentation','Prior authorization','Claim','Denial and appeal'];
const stageForStep = [0,0,0,0,1,1,1,2,3,3,3,0];
let current = 0, frame = null, elapsed = 0, lastTime = null;
let running = false, started = false, finished = false;
let journeyVisible = false;
let loopAllowed = true, waiting = false, waitElapsed = 0, countdown = 5;
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
function render(n) {
  current = Math.max(0, Math.min(n, 11));
  const x = positions[current];
  const good = [3,4,6,7,10,11].includes(current);
  $('case-token').style.left = x + '%';
  $('case-token').classList.toggle('good', good);
  $('case-name').textContent = current === 11 ? 'Next relevant case' : 'One case';
  const att = $('attachment');
  att.hidden = ![2,3,4,6,7,9,10,11].includes(current);
  att.classList.toggle('attached', good);
  att.style.left = (good ? (x > 70 ? x - 26 : x + 10) : current === 9 ? 57 : 68) + '%';
  att.querySelector('b').textContent = current >= 9 ? 'Response' : current >= 5 ? 'Updated request' : 'Supporting record';
  att.querySelector('span').textContent = current >= 9 ? 'Supporting evidence attached' : current >= 5 ? 'Current requirement included' : 'Evidence for this request';
  $('search').hidden = current !== 1 || !running;
  $('step-label').textContent = String(current + 1).padStart(2,'0') + ' / 12 · ' + phases[current];
  $('action').textContent = lines[current];
  $('action').classList.toggle('warning',[0,5,8].includes(current));
  $('detail').textContent = [0,1,2,5,8,9].includes(current) ? 'The case stays here until the next action is resolved.' : current === 11 ? 'An illustrative learning loop, not a measured outcome.' : 'The case changes before it advances.';
  $('previous').disabled = current === 0;
  $('next').disabled = current === 11;
  $('progress').textContent = (current + 1) + ' / 12';
  $('playback-stage').textContent = stageNames[stageForStep[current]];
  $('station-marker').style.left = [12,37,63,88][stageForStep[current]] + '%';
  updateProgress();
}
function updateProgress() {
  const passed = durations.slice(0,current).reduce((a,b) => a+b,0) + elapsed;
  const percent = finished ? 100 : Math.min(100,passed / totalDuration * 100);
  $('timeline-fill').style.transform = `scaleX(${percent/100})`;
  document.querySelector('.timeline').setAttribute('aria-valuenow',String(Math.round(percent)));
}
function updatePlayback() {
  $('replay-now').hidden = !waiting;
  $('play').textContent = running || waiting ? 'Pause' : finished ? 'Replay story' : started ? 'Resume story' : 'Play story';
  $('play').setAttribute('aria-pressed',String(running || waiting));
  $('playback-state').textContent = waiting ? `Replaying in ${countdown}…` : running ? 'Playing' : finished ? 'Complete' : started ? 'Paused' : 'Ready to play';
  $('workflow').classList.toggle('is-playing',running);
  $('search').hidden = current !== 1 || !running;
}
function stop(disableLoop = true) {
  if (disableLoop) loopAllowed = false;
  cancelAnimationFrame(frame); frame = null; running = false; waiting = false; lastTime = null;
  updatePlayback();
}
function tick(now) {
  if (!running) return;
  if (lastTime !== null) elapsed += now-lastTime;
  lastTime = now;
  if (elapsed >= durations[current]) {
    elapsed = 0;
    if (current === 11) {
      finished = true; stop(false); updateProgress(); beginCountdown(); return;
    }
    render(current+1);
  }
  updateProgress();
  frame = requestAnimationFrame(tick);
}
function canLoop() {
  return loopAllowed && journeyVisible && !reducedMotion.matches && !document.hidden && !$('workflow').hidden;
}
function beginCountdown() {
  if (!canLoop()) return;
  waiting = true; waitElapsed = 0; countdown = 5; lastTime = null;
  updatePlayback();
  frame = requestAnimationFrame(countdownTick);
}
function countdownTick(now) {
  if (!waiting) return;
  if (!canLoop()) { stop(); return; }
  if (lastTime !== null) waitElapsed += now-lastTime;
  lastTime = now;
  if (waitElapsed >= 5000) { start(); return; }
  const remaining = Math.ceil((5000-waitElapsed)/1000);
  if (remaining !== countdown) { countdown = remaining; updatePlayback(); }
  frame = requestAnimationFrame(countdownTick);
}
function start() {
  if (running || document.hidden || $('workflow').hidden) return;
  cancelAnimationFrame(frame); waiting = false;
  if (finished) { finished = false; elapsed = 0; render(0); }
  started = true; running = true; lastTime = null;
  updatePlayback();
  frame = requestAnimationFrame(tick);
}
$('play').addEventListener('click', () => running || waiting ? stop() : start());
$('replay-now').addEventListener('click', start);
function step(n) {
  stop(); started = true; elapsed = 0; finished = false;
  render(n); updatePlayback();
}
$('previous').addEventListener('click', () => step(current - 1));
$('next').addEventListener('click', () => step(current + 1));
$('restart').addEventListener('click', () => { step(0); if(!reducedMotion.matches) start(); });
const tabs = [...document.querySelectorAll('[role="tab"]')];
function selectTab(tab) {
  stop();
  for (const t of tabs) {
    const selected = t === tab;
    t.setAttribute('aria-selected',String(selected));
    t.tabIndex = selected ? 0 : -1;
    $(t.getAttribute('aria-controls')).hidden = !selected;
  }
  maybeAutoplay();
}
tabs.forEach((tab, i) => {
  tab.addEventListener('click', () => selectTab(tab));
  tab.addEventListener('keydown', e => {
    let target;
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') target = tabs[1-i];
    if (e.key === 'Home') target = tabs[0];
    if (e.key === 'End') target = tabs[1];
    if (target) { e.preventDefault(); selectTab(target); target.focus(); }
  });
});
function maybeAutoplay() {
  if (loopAllowed && !started && journeyVisible && !reducedMotion.matches && !document.hidden && !$('workflow').hidden) start();
}
const observer = new IntersectionObserver(([entry]) => {
  journeyVisible = entry.isIntersecting && entry.intersectionRatio >= 0.25;
  if (!journeyVisible && (running || waiting)) stop();
  maybeAutoplay();
}, {threshold: [0,0.25]});
observer.observe(document.querySelector('.journey'));
document.addEventListener('visibilitychange', () => { if(document.hidden) stop(); else maybeAutoplay(); });
reducedMotion.addEventListener('change', () => { stop(); maybeAutoplay(); });
render(0);
updatePlayback();
