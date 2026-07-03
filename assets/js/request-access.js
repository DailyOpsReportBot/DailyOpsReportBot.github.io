(function(){
  const modal = document.getElementById('requestAccessModal');
  const form = document.getElementById('requestAccessForm');
  const errorBox = document.getElementById('requestAccessError');
  const title = document.getElementById('requestAccessTitle');
  const tierHidden = document.getElementById('requestTierHidden');
  const priceHidden = document.getElementById('requestPriceHidden');
  const subjectField = document.getElementById('requestSubject');
  const messageField = document.getElementById('requestMessage');
  const nameField = document.getElementById('requestName');
  const businessField = document.getElementById('requestBusiness');
  const emailField = document.getElementById('requestEmail');
  const replyToField = document.getElementById('requestReplyTo');
  const defaultRequestAccessSubmitUrl = 'https://formsubmit.co/DailyOpsReportBot@gmail.com';

  if(!modal || !form) return;

  function clean(value){
    return String(value || '').trim();
  }

  function showError(message){
    if(!errorBox) return;
    errorBox.textContent = message;
    errorBox.classList.add('visible');
  }

  function clearError(){
    if(!errorBox) return;
    errorBox.textContent = '';
    errorBox.classList.remove('visible');
  }

  function selectedMessage(tier, price){
    const priceText = price ? ` at ${price}` : '';
    return `I am interested in purchasing the Daily Ops Report Bot ${tier} Package${priceText}. Please contact me with the next steps for access and setup.`;
  }

  function openModal(tier, price){
    const selectedTier = clean(tier) || 'Selected';
    const selectedPrice = clean(price);
    clearError();
    form.reset();
    tierHidden.value = selectedTier;
    priceHidden.value = selectedPrice;
    subjectField.value = `Daily Ops Report Bot ${selectedTier} Package Access Request`;
    messageField.value = selectedMessage(selectedTier, selectedPrice);
    title.textContent = `Request access for ${selectedTier}`;
    modal.classList.add('visible');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    setTimeout(() => nameField && nameField.focus(), 50);
  }

  function closeModal(){
    modal.classList.remove('visible');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
  }

  document.querySelectorAll('[data-request-access]').forEach(button => {
    button.addEventListener('click', () => {
      openModal(button.getAttribute('data-tier'), button.getAttribute('data-price'));
    });
  });

  document.querySelectorAll('[data-request-close]').forEach(button => {
    button.addEventListener('click', closeModal);
  });

  modal.addEventListener('click', event => {
    if(event.target === modal) closeModal();
  });

  document.addEventListener('keydown', event => {
    if(event.key === 'Escape' && modal.classList.contains('visible')) closeModal();
  });

  form.addEventListener('submit', event => {
    event.preventDefault();
    clearError();

    const name = clean(nameField.value);
    const business = clean(businessField.value);
    const email = clean(emailField.value);
    const tier = clean(tierHidden.value);
    const price = clean(priceHidden.value);
    const message = clean(messageField.value);
    if(replyToField) replyToField.value = email;

    if(!name || !business || !email){
      showError('Please complete Name, Business Name, and Email Address before sending the request.');
      return;
    }

    if(!emailField.checkValidity()){
      showError('Please enter a valid email address.');
      emailField.focus();
      return;
    }

    const config = window.DORB_SITE_CONFIG || {};
    let submitUrl = clean(config.requestAccessSubmitUrl);
    const requestEmail = clean(config.requestAccessEmail);

    if(!submitUrl || submitUrl.includes('YOUR_EMAIL') || submitUrl.includes('example.com')){
      submitUrl = defaultRequestAccessSubmitUrl;
    }

    if(submitUrl){
      form.action = submitUrl;
      form.method = 'POST';
      form.submit();
      return;
    }

    if(requestEmail && !requestEmail.includes('YOUR_EMAIL') && !requestEmail.includes('example.com')){
      const subject = `Daily Ops Report Bot ${tier} Package Access Request`;
      const body = [
        'Daily Ops Report Bot access request',
        '',
        `Name: ${name}`,
        `Business Name: ${business}`,
        `Email Address: ${email}`,
        `Selected Tier: ${tier}`,
        `Selected Price: ${price}`,
        '',
        `Message: ${message}`
      ].join('\n');
      window.location.href = `mailto:${encodeURIComponent(requestEmail)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      closeModal();
      return;
    }

    showError('This request form is ready, but the site owner still needs to set requestAccessEmail or requestAccessSubmitUrl in assets/js/config.js.');
  });
})();
