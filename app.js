const preview = document.querySelector('#preview');
const status = document.querySelector('#status');
const pngButton = document.querySelector('#download-png');

document.querySelectorAll('[data-background]').forEach(button => {
  button.addEventListener('click', () => {
    preview.classList.toggle('checker', button.dataset.background === 'checker');
    document.querySelectorAll('[data-background]').forEach(option => {
      const selected = option === button;
      option.classList.toggle('active', selected);
      option.setAttribute('aria-pressed', String(selected));
    });
  });
});

pngButton.addEventListener('click', async () => {
  pngButton.disabled = true;
  status.textContent = 'Préparation du PNG…';
  try {
    const size = Number(document.querySelector('#size').value);
    const image = new Image();
    image.src = new URL('diagram.svg', document.baseURI).href;
    await image.decode();
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = size;
    canvas.getContext('2d').drawImage(image, 0, 0, size, size);
    const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
    if (!blob) throw new Error('PNG indisponible');
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `jesus-cpu-${size}.png`;
    document.body.append(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 10000);
    status.textContent = `PNG transparent de ${size} × ${size} prêt à télécharger.`;
  } catch (error) {
    status.textContent = 'Export PNG impossible. Ouvrez la page via un serveur local (voir README), puis réessayez. Le SVG reste disponible.';
    console.error(error);
  } finally {
    pngButton.disabled = false;
  }
});
