// Pricing toggle: monthly/yearly
(function(){
  const pricingSection = document.getElementById('pricing');
  if (!pricingSection) return;

  // Add toggle controls dynamically
  const toggle = document.createElement('div');
  toggle.className = 'pricing-toggle';
  toggle.innerHTML = `
    <button id="monthly" class="active">Monthly</button>
    <button id="yearly">Yearly</button>
  `;
  pricingSection.prepend(toggle);

  // Price map
  const prices = {
    monthly: { Starter: 5000, Pro: 15000, Enterprise: 'Custom' },
    yearly: { Starter: 5000 * 12 * 0.85, Pro: 15000 * 12 * 0.85, Enterprise: 'Custom' } // 15% off annually
  };

  const cards = Array.from(pricingSection.querySelectorAll('.card'));
  const monthlyBtn = document.getElementById('monthly');
  const yearlyBtn = document.getElementById('yearly');

  function setPrices(mode){
    cards.forEach(card => {
      const tier = card.querySelector('h3').textContent.trim();
      const priceEl = card.querySelector('.price') || (() => {
        const p = document.createElement('p');
        p.className = 'price';
        card.appendChild(p);
        return p;
      })();
      const val = prices[mode][tier];
      priceEl.textContent = typeof val === 'number' ? `₦${Math.round(val).toLocaleString()}/${mode === 'monthly' ? 'mo' : 'yr'}` : 'Custom';
    });
  }

  setPrices('monthly');

  monthlyBtn.addEventListener('click', () => {
    monthlyBtn.classList.add('active'); yearlyBtn.classList.remove('active');
    setPrices('monthly');
  });
  yearlyBtn.addEventListener('click', () => {
    yearlyBtn.classList.add('active'); monthlyBtn.classList.remove('active');
    setPrices('yearly');
  });
})();
