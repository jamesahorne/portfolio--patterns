//            Accordion            //

const accordionComponent = document.getElementById('accordion');

// If it doesn't exist you get a console error (if it isn't "undefined" and it isn't "null", then it exists)
if (typeof(accordionComponent) != 'undefined' && accordionComponent != null) {
  const allAccordions = document.getElementsByClassName('accordion__button');
  const activeAccordions = document.getElementsByClassName('accordion__button accordion__button--is-active');
  const firstAccordion = allAccordions[0];
  const accordionHeight = firstAccordion.scrollHeight;

  for (let i = 0; i < allAccordions.length; i++) {
    allAccordions[i].addEventListener('click', function() {
      let isActiveAccordion = this.classList.contains('accordion__button--is-active');
      let accordionSection = this.parentNode.parentNode;
      let panel = this.parentNode.nextElementSibling;
      let prevAccordion = activeAccordions[0] || firstAccordion;
      let prevAccordionSection = prevAccordion.parentNode.parentNode;
      let prevPanel = prevAccordion.parentNode.nextElementSibling;
      const accordionBorders = document.getElementsByClassName('accordion__border');

      // If active, close it, else, first close previous accordion and then open current one
      if (isActiveAccordion) {
        prevAccordion.classList.remove('accordion__button--is-active');
        prevAccordion.setAttribute('aria-expanded', 'false');
        prevPanel.style.maxHeight = null;
        prevAccordionSection.style.height = accordionHeight + 'px';
      } else {
        prevAccordion.classList.remove('accordion__button--is-active');
        prevPanel.style.maxHeight = null;
        prevAccordionSection.style.height = accordionHeight + 'px';
        prevAccordion.setAttribute('aria-expanded', 'false');

        this.classList.toggle('accordion__button--is-active');
        this.setAttribute('aria-expanded', 'true');
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

//            Contact role details            //

// Don't want to style a utility class inside a component so using JS to style it...
// But maybe this is too purist and I'll change my mind in a year's time.
const roleDetailsParent = document.getElementById('contact__role-details').parentNode;

roleDetailsParent.style.position = 'relative';

//            End contact role details            //
