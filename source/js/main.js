const allAccordions = document.getElementsByClassName("c-accordion__heading");
const activeAccordions = document.getElementsByClassName("c-accordion__heading isActive");

// Open first accordion
const firstAccordion = allAccordions[0];
const firstPanel = firstAccordion.nextElementSibling;
firstAccordion.classList.add('isActive');
firstPanel.style.maxHeight = firstPanel.scrollHeight + 'px';

// Loop through all accordions in allAccordions to add a click event listener
for (let i = 0; i < allAccordions.length; i++) {
  allAccordions[i].addEventListener("click", function() {
    let isActive = this.classList.contains('isActive');

    // If it's already open, leave it.
    // Otherwise, shut all other accordions and open the one clicked on
    if (!isActive) {

      // Loop through activeAccordions and remove isActive class and panel height
      for (let j = 0; j < activeAccordions.length; j++) {
        let currentAccordion = activeAccordions[j];
        currentAccordion.classList.remove('isActive');
        let panel = currentAccordion.nextElementSibling;
        if (panel.style.maxHeight) {
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = panel.scrollHeight + 'px';
        }
      }

      // Add isActive class and panel height
      this.classList.toggle('isActive');
      let panel = this.nextElementSibling;
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + 'px';
      }
    }
  });
}
