// Accordion
const allAccordions = document.getElementsByClassName("c-accordion__heading");
const activeAccordions = document.getElementsByClassName("c-accordion__heading c-accordion__heading--is-active");

// Open first accordion (the active class is set in the JS) and set height (the panels are absolutely positioned, so add the panel height and padding to the parent's height)
const firstAccordion = allAccordions[0];
const firstAccordionSection = allAccordions[0].parentNode;
const firstPanel = firstAccordion.nextElementSibling;
firstAccordion.classList.add('c-accordion__heading--is-active');
firstPanel.style.maxHeight = firstPanel.scrollHeight + 'px';
firstAccordionSection.style.height += firstPanel.style.maxHeight;

// Loop through all accordions in allAccordions to add a click event listener
for (let i = 0; i < allAccordions.length; i++) {
  allAccordions[i].addEventListener("click", function() {
    let isActiveAccordion = this.classList.contains('c-accordion__heading--is-active');
    let accordionSection = this.parentNode;
    console.log(accordionSection);

    // If it's already open, leave it.
    // Otherwise, shut all other accordions and open the one clicked on
    if (!isActiveAccordion) {

      // Loop through activeAccordions and remove active class and panel height
      for (let j = 0; j < activeAccordions.length; j++) {
        let currentAccordion = activeAccordions[j];
        currentAccordion.classList.remove('c-accordion__heading--is-active');
        let panel = currentAccordion.nextElementSibling;
        if (panel.style.maxHeight) {
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = panel.scrollHeight + 'px';
        }
      }

      // Add active class and panel height
      this.classList.toggle('c-accordion__heading--is-active');
      let panel = this.nextElementSibling;
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + 'px';
        accordionSection.style.height += panel.style.maxHeight;
      }
    }
  });
}
