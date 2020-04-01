// Accordion
const allAccordions = document.getElementsByClassName("c-accordion__heading");
const activeAccordions = document.getElementsByClassName("c-accordion__heading c-accordion__heading--is-active");

// Open first accordion (active class is set here, not in HTML) and set heights (panels are absolutely positioned, so need add accordion and panel height to section height)
const firstAccordion = allAccordions[0];
const firstSection = allAccordions[0].parentNode;
const firstPanel = firstAccordion.nextElementSibling;
const accordionHeight = firstAccordion.scrollHeight;

firstAccordion.classList.add('c-accordion__heading--is-active');
firstPanel.style.maxHeight = firstPanel.scrollHeight + 24 + 'px';
firstSection.style.height += firstPanel.scrollHeight + accordionHeight + 24 + 'px';

// Loop through all accordions in allAccordions to add a click event listener
for (let i = 0; i < allAccordions.length; i++) {
  allAccordions[i].addEventListener("click", function() {
    let isActiveAccordion = this.classList.contains('c-accordion__heading--is-active');
    let accordionSection = this.parentNode;
    let panel = this.nextElementSibling;

    // If it's already open, leave it.
    // Otherwise, shut all other accordions and open the one clicked on
    if (!isActiveAccordion) {

      // Loop through activeAccordions and remove active class and panel height
      for (let j = 0; j < activeAccordions.length; j++) {
        let currentAccordion = activeAccordions[j];
        let currentAccordionSection = this.parentNode;
        let panel = currentAccordion.nextElementSibling;

        currentAccordion.classList.remove('c-accordion__heading--is-active');
        panel.style.maxHeight = null;
        currentAccordionSection.style.height = null;
      }

      // Add active class and panel height
      this.classList.toggle('c-accordion__heading--is-active');
      panel.style.maxHeight = panel.scrollHeight + 24 + 'px';
      accordionSection.style.height += panel.scrollHeight + accordionHeight + 'px';
    }
  });
}
