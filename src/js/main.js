import updateThemeColor from './updateThemeColor';

document.addEventListener('DOMContentLoaded', () => { 
  const body = document.getElementsByTagName('body')[0];
  const toggle = document.getElementById('toggle');
  updateThemeColor();

  toggle.addEventListener('change', (event) => {
    if (event.target.checked) {
      body.className = 'dark-theme';
      updateThemeColor();
    } else {
      body.className = 'light-theme';
      updateThemeColor();
    }
  });
});