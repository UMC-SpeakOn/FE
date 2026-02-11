const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

export const scroll = (
  container: HTMLElement,
  target: HTMLElement,
  duration: number,
) => {
  const startY = container.scrollTop;
  const targetY =
    target.getBoundingClientRect().top -
    container.getBoundingClientRect().top +
    startY;

  const distance = targetY - startY;
  const startTime = performance.now();

  const animate = (currentTime: number) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeOutCubic(progress);

    container.scrollTop = startY + distance * eased;

    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  };

  requestAnimationFrame(animate);
};
