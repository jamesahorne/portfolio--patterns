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
    });
  }
}

//            End accordion            //

//            Contact role details            //

// Don't want to style a utility class inside a component so using JS to style it...
// But maybe this is too purist and I'll change my mind in a year's time.
const contactRoleDetails = document.getElementById('contact__role-details');
const contactRole = document.getElementById('contact__role');

if (typeof(contactRoleDetails) != 'undefined' && contactRoleDetails != null) {
  const contactRoleDetailsParent = contactRoleDetails.parentNode;

  contactRoleDetailsParent.style.position = 'relative';
  contactRole.addEventListener("focus", function() {
    contactRole.setAttribute('aria-expanded', 'true');
  });
  contactRole.addEventListener("mouseover", function() {
    contactRole.setAttribute('aria-expanded', 'true');
  });
  contactRole.addEventListener("focusout", function() {
    contactRole.setAttribute('aria-expanded', 'false');
  });
  contactRole.addEventListener("mouseout", function() {
    contactRole.setAttribute('aria-expanded', 'false');
  });
}

//            End contact role details            //

//            Footer            //

const footer = document.getElementById('footer');

if (typeof(footer) != 'undefined' && footer != null) {
  footer.addEventListener("focus", function() {
    footer.setAttribute('aria-expanded', 'true');
  });
  footer.addEventListener("mouseover", function() {
    footer.setAttribute('aria-expanded', 'true');
  });
  footer.addEventListener("focusout", function() {
    footer.setAttribute('aria-expanded', 'false');
  });
  footer.addEventListener("mouseout", function() {
    footer.setAttribute('aria-expanded', 'false');
  });
}

//            End footer            //
