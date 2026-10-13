// Verified LPF / SuperLiga snapshot, 13 October 2026. No live data feed.
const upcoming = [
  {date:'16 OCT 2026',time:'21:00',home:'Dinamo București',away:'FC Botoșani',round:12,venue:'home'},
  {date:'25 OCT 2026',time:'19:00',home:'CFR Cluj',away:'Dinamo București',round:13,venue:'away'},
  {date:'01 NOV 2026',time:'20:30',home:'Dinamo București',away:'UTA Arad',round:14,venue:'home'},
  {date:'07 NOV 2026',time:'TBC',home:'FC Argeș',away:'Dinamo București',round:15,venue:'away'},
  {date:'21 NOV 2026',time:'TBC',home:'Dinamo București',away:'Petrolul Ploiești',round:16,venue:'home'},
  {date:'28 NOV 2026',time:'TBC',home:'Universitatea Craiova',away:'Dinamo București',round:17,venue:'away'}
];
const results = [
  {date:'09 OCT 2026',home:'Sepsi OSK',away:'Dinamo București',score:'0 – 2',round:11,venue:'away',result:'win'},
  {date:'20 SEP 2026',home:'Dinamo București',away:'Farul Constanța',score:'4 – 0',round:10,venue:'home',result:'win'},
  {date:'11 SEP 2026',home:'FK Csikszereda',away:'Dinamo București',score:'1 – 3',round:9,venue:'away',result:'win'},
  {date:'05 SEP 2026',home:'Dinamo București',away:'FCSB',score:'2 – 1',round:8,venue:'home',result:'win'},
  {date:'29 AUG 2026',home:'Corvinul Hunedoara',away:'Dinamo București',score:'1 – 1',round:7,venue:'away',result:'draw'},
  {date:'22 AUG 2026',home:'Dinamo București',away:'Universitatea Cluj',score:'2 – 1',round:6,venue:'home',result:'win'},
  {date:'15 AUG 2026',home:'Rapid București',away:'Dinamo București',score:'0 – 1',round:5,venue:'away',result:'win'},
  {date:'08 AUG 2026',home:'Dinamo București',away:'FC Voluntari',score:'4 – 0',round:4,venue:'home',result:'win'},
  {date:'31 JUL 2026',home:'Oțelul Galați',away:'Dinamo București',score:'1 – 1',round:3,venue:'away',result:'draw'},
  {date:'25 JUL 2026',home:'Dinamo București',away:'Universitatea Craiova',score:'5 – 1',round:2,venue:'home',result:'win'},
  {date:'19 JUL 2026',home:'Petrolul Ploiești',away:'Dinamo București',score:'1 – 0',round:1,venue:'away',result:'loss'}
];
const standings = [
  ['Dinamo București',11,18,26],['Rapid București',11,9,24],['Universitatea Craiova',11,16,23],['Petrolul Ploiești',11,-1,19],['Universitatea Cluj',11,2,18],['Farul Constanța',11,2,17],['Corvinul Hunedoara',11,3,16],['CFR Cluj',11,0,16],['FCSB',11,-3,15],['FC Botoșani',11,4,14],['Sepsi OSK',11,-5,13],['UTA Arad',11,-3,12],['FC Argeș',11,-5,11],['Oțelul Galați',11,-5,10],['FC Voluntari',11,-14,8],['FK Csikszereda',11,-18,1]
];
let activeTab = 'upcoming';
let showAllMatches = false;
const matchList = document.querySelector('#match-list');
const moreButton = document.querySelector('#more-matches');
function teamMarkup(name) {
  const isDinamo = name === 'Dinamo București';
  const initials = name.split(' ').map(word => word[0]).slice(0,3).join('');
  return `<div><span class="team-badge ${isDinamo ? 'dinamo' : ''}">${isDinamo ? '<img src="assets/crest.webp" alt="" width="39" height="45">' : initials}</span><span class="team-name">${name}</span></div>`;
}
function renderMatches() {
  const venue = document.querySelector('#venue').value;
  const matches = (activeTab === 'upcoming' ? upcoming : results).filter(match => venue === 'all' || match.venue === venue);
  const visible = showAllMatches ? matches : matches.slice(0,3);
  matchList.innerHTML = visible.map(match => `<article class="match-card"><div class="match-meta"><span>SUPERLIGA · MW ${match.round}</span><span class="${match.venue}">${match.venue.toUpperCase()}</span></div><p class="match-date">${match.date}${match.time ? ' · ' + match.time + (match.time === 'TBC' ? '' : ' EEST/EET') : ''}</p><div class="match-teams">${teamMarkup(match.home)}<strong class="versus ${match.score ? 'score' : ''}">${match.score || 'VS'}</strong>${teamMarkup(match.away)}</div><div class="match-bottom"><span>${match.score ? 'FULL TIME' : 'MATCHDAY ' + match.round}</span><span class="${match.result || ''}">${match.result ? match.result.toUpperCase() : match.venue === 'home' ? 'BUCUREȘTI' : 'ON THE ROAD'}</span></div></article>`).join('') || '<p class="empty-state">No matches for this filter.</p>';
  moreButton.hidden = matches.length <= 3;
  moreButton.innerHTML = `${showAllMatches ? 'Show fewer matches' : 'Show all ' + (activeTab === 'upcoming' ? 'upcoming matches' : 'season results')} <span>${showAllMatches ? '↑' : '↓'}</span>`;
}
document.querySelectorAll('[data-tab]').forEach(button => button.addEventListener('click', () => {
  activeTab = button.dataset.tab;
  showAllMatches = false;
  document.querySelectorAll('[data-tab]').forEach(tab => {const selected = tab === button; tab.classList.toggle('selected', selected); tab.setAttribute('aria-pressed', String(selected));});
  renderMatches();
}));
document.querySelector('#venue').addEventListener('change', () => {showAllMatches = false; renderMatches();});
moreButton.addEventListener('click', () => {showAllMatches = !showAllMatches; renderMatches();});
let fullTable = false;
function renderTable() {
  document.querySelector('#league-table').innerHTML = standings.slice(0,fullTable ? 16 : 6).map((team,index) => `<tr class="${index === 0 ? 'dinamo-row' : ''}"><td>${String(index+1).padStart(2,'0')}</td><td>${team[0]}</td><td>${team[1]}</td><td>${team[2]>0 ? '+' : ''}${team[2]}</td><td>${team[3]}</td></tr>`).join('');
}
document.querySelector('#table-toggle').addEventListener('click', event => {
  fullTable = !fullTable;
  event.currentTarget.setAttribute('aria-expanded',String(fullTable));
  event.currentTarget.innerHTML = `${fullTable ? 'Show top six' : 'View full standings'} <span>${fullTable ? '↑' : '↓'}</span>`;
  renderTable();
});
const profiles = {
  cirjan:{name:'Cătălin Cîrjan',position:'NO. 10 · MIDFIELDER',description:'A creative presence in the Dinamo midfield. Cîrjan has featured in 10 league matches in the 2026/27 season snapshot.',url:'https://www.superliga.ro/jucatori/cirjan-catalin-b0c2f042'},
  armstrong:{name:'Danny Armstrong',position:'NO. 77 · MIDFIELDER',description:'Part of the red and white midfield, Armstrong has appeared in all 11 league matches in this season snapshot.',url:'https://www.superliga.ro/jucatori/armstrong-danny-95485c10'},
  karamoko:{name:'Mamoudou Karamoko',position:'NO. 9 · FORWARD',description:'Leading the line for the red and white. Karamoko has featured in 8 league matches in the 2026/27 season snapshot.',url:'https://www.superliga.ro/jucatori/karamoko-mamoudou-19c805dc'}
};
const dialog = document.querySelector('#player-dialog');
dialog.setAttribute('aria-labelledby','dialog-name');
document.querySelectorAll('[data-player]').forEach(button => button.addEventListener('click', () => {
  const profile = profiles[button.dataset.player];
  document.querySelector('#dialog-name').textContent = profile.name;
  document.querySelector('#dialog-position').textContent = profile.position;
  document.querySelector('#dialog-description').textContent = profile.description;
  document.querySelector('#dialog-link').href = profile.url;
  dialog.showModal();
}));
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {const rect = dialog.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();});
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
menuButton.addEventListener('click', () => {const open = navigation.classList.toggle('open'); menuButton.setAttribute('aria-expanded',String(open)); menuButton.textContent = open ? '×' : '☰';});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {navigation.classList.remove('open'); menuButton.setAttribute('aria-expanded','false'); menuButton.textContent = '☰'; navigation.querySelectorAll('a').forEach(item => item.classList.toggle('active', item === link));}));
renderMatches();
renderTable();
