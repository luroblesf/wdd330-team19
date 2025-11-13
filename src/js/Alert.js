class Alert {
  async renderAlerts() {
    try {
      const response = await fetch('/alerts.json');
      const alerts = await response.json();

      if (!alerts || alerts.length === 0) return;

      const main = document.querySelector('main');
      if (!main) {
        console.warn('No <main> element found on the page.');
        return;
      }

      const section = document.createElement('section');
      section.className = 'alert-list';

      alerts.forEach(({ message, background, color }) => {
        const p = document.createElement('p');
        p.textContent = message;
        p.style.backgroundColor = background;
        p.style.color = color;
        p.classList.add('alert-item');
        section.appendChild(p);
      });

      main.prepend(section);

      // Trigger animation after insertion
      requestAnimationFrame(() => {
        section.querySelectorAll('.alert-item').forEach(p => {
          p.classList.add('fade-in');
        });
      });
    } catch (error) {
      console.error('Failed to load alerts:', error);
    }
  }
}

export default Alert;


