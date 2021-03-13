export default () => {
  const metaTheme = document.querySelector('meta[name="theme-color"]'); 
  const body = document.getElementsByTagName('body')[0];
  const bgColor = getComputedStyle(body).getPropertyValue('--highlight');
  metaTheme.setAttribute("content", bgColor);
}