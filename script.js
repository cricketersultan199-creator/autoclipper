const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

const videoUrl = $('#videoUrl');
const videoFrame = $('#videoFrame');
const toast = $('#toast');

function extractYouTubeId(url) {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes('youtu.be')) return parsed.pathname.slice(1);
    return parsed.searchParams.get('v') || '';
  } catch (_) {
    return '';
  }
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2600);
}

$('#analyzeButton').addEventListener('click', () => {
  const id = extractYouTubeId(videoUrl.value.trim());
  if (!id) {
    showToast('Please enter a valid YouTube URL');
    return;
  }
  videoFrame.src = `https://www.youtube-nocookie.com/embed/${id}`;
  $('#videoTitle').textContent = id;
  $$('.clip-preview img').forEach((img) => { img.src = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`; });
  showToast('Video loaded successfully');
});

$$('.format').forEach((button) => button.addEventListener('click', () => {
  $$('.format').forEach((item) => item.classList.remove('active'));
  button.classList.add('active');
}));

$$('.segment-options button').forEach((button) => button.addEventListener('click', () => {
  $$('.segment-options button').forEach((item) => item.classList.remove('active'));
  button.classList.add('active');
}));

$('#generateButton').addEventListener('click', (event) => {
  const button = event.currentTarget;
  button.disabled = true;
  button.innerHTML = '<span>Analyzing moments...</span>';
  setTimeout(() => {
    button.disabled = false;
    button.innerHTML = '<svg viewBox="0 0 24 24"><path d="M12 3v18M3 12h18M5.64 5.64l12.72 12.72M18.36 5.64 5.64 18.36"/></svg><span>Generate clips</span>';
    showToast('Clips generated successfully');
  }, 1400);
});

$('#themeButton').addEventListener('click', (event) => {
  document.body.classList.toggle('light');
  event.currentTarget.querySelector('span').textContent = document.body.classList.contains('light') ? 'Dark mode' : 'Light mode';
});
