//            Accordion            //

const accordionComponent = document.getElementById('c-accordion');

// If it doesn't exist you get a console error (if it isn't "undefined" and it isn't "null", then it exists)
if(typeof(accordionComponent) != 'undefined' && accordionComponent != null){
  const allAccordions = document.getElementsByClassName('c-accordion__heading');
  const activeAccordions = document.getElementsByClassName('c-accordion__heading c-accordion__heading--is-active');
  const firstAccordion = allAccordions[0];
  const accordionHeight = firstAccordion.scrollHeight;

  for (let i = 0; i < allAccordions.length; i++) {
    allAccordions[i].addEventListener('click', function() {
      let isActiveAccordion = this.classList.contains('c-accordion__heading--is-active');
      let accordionSection = this.parentNode;
      let panel = this.nextElementSibling;
      let prevAccordion = activeAccordions[0] || firstAccordion;
      let prevAccordionSection = prevAccordion.parentNode;
      let prevPanel = prevAccordion.nextElementSibling;
      const accordionBorders = document.getElementsByClassName('c-accordion__border');

      // If active, close it, else, first close previous accordion and then open current one
      if (isActiveAccordion) {
        prevAccordion.classList.remove('c-accordion__heading--is-active');
        prevPanel.style.maxHeight = null;
        prevAccordionSection.style.height = accordionHeight + 'px';
      } else {
        prevAccordion.classList.remove('c-accordion__heading--is-active');
        prevPanel.style.maxHeight = null;
        prevAccordionSection.style.height = accordionHeight + 'px';

        this.classList.toggle('c-accordion__heading--is-active');
        panel.style.maxHeight = panel.scrollHeight + 24 + 'px';
        accordionSection.style.height = panel.scrollHeight + accordionHeight + 'px';
      }

      for (var border of accordionBorders) {
        border.style.height = accordionHeight - 32 + 'px';
      }
    });
  }
}

//            End accordion            //





// TODO
// 
// Box shadow
// Accessibility
