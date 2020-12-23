export default {
  init: () => {
    const projectsSection = document.querySelector('.projects-section');
    if (projectsSection) {
      if (!window.projectsEnabled) projectsSection.style.display = 'none';
      else projectsSection.style.display = 'block';
    }
  },
  destroy: () => {},
};
