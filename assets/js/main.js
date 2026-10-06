(() => {
  'use strict';
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const mobile = window.matchMedia('(max-width: 760px)');
  const header = $('#header');
  const toggle = $('.menu-toggle');
  const navigation = $('#navigation');
  const hero = $('.hero');
  const heroContent = $('.hero-content');
  const automation = $('#automation');
  const steps = $$('.workflow li');
  const clamp = (n, min = 0, max = 1) => Math.min(max, Math.max(min, n));
  const capSections = $$('.cap-section');
  const capLinks = $$('[data-cap-link]');
  const manifestoWords = $$('.manifesto > span');
  const pageProgress = document.createElement('div');
  pageProgress.className = 'page-progress';
  pageProgress.setAttribute('aria-hidden', 'true');
  header.append(pageProgress);
  // 动态能力图独立于 reveal 容器，避免滚动与入场动画互相覆盖。
  $$('.cap-art').forEach(art => {
    const stage = document.createElement('div');
    stage.className = 'art-motion';
    while (art.firstChild) stage.append(art.firstChild);
    art.append(stage);
  });

  // 内容默认可见；只有观察器创建成功时，才开启滚动 reveal。
  if ('IntersectionObserver' in window && !motion.matches) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    document.documentElement.classList.add('js-motion');
    $$('.reveal').forEach(el => observer.observe(el));
  }

  function closeMenu(restoreFocus = false) {
    document.body.classList.remove('menu-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', '展开导航');
    if (restoreFocus) toggle.focus();
  }
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    document.body.classList.toggle('menu-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? '收起导航' : '展开导航');
    if (open) $('a', navigation).focus();
  });
  navigation.addEventListener('click', e => { if (e.target.closest('a')) closeMenu(); });
  document.addEventListener('keydown', e => {
    if (toggle.getAttribute('aria-expanded') !== 'true') return;
    if (e.key === 'Escape') { closeMenu(true); return; }
    if (e.key !== 'Tab') return;
    const focusable = [toggle, ...$$('a', navigation)];
    const first = focusable[0], last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });
  mobile.addEventListener('change', () => { if (!mobile.matches) closeMenu(); });

  let queued = false;
  function updateScroll() {
    queued = false;
    header.classList.toggle('scrolled', window.scrollY > 35);
    const pageLength = document.documentElement.scrollHeight - window.innerHeight;
    pageProgress.style.setProperty('--reading-progress', clamp(window.scrollY / Math.max(1, pageLength)));
    if (!motion.matches) {
      const h = hero.getBoundingClientRect();
      const progress = clamp(-h.top / (mobile.matches ? h.height : Math.max(1, h.height - window.innerHeight)));
      heroContent.style.setProperty('--hero-progress', progress);
      hero.style.setProperty('--scene-progress', progress);
    } else {
      heroContent.style.removeProperty('--hero-progress');
      hero.style.removeProperty('--scene-progress');
    }
    const rect = automation.getBoundingClientRect();
    const progress = (mobile.matches || motion.matches) ? 1 : clamp((window.innerHeight * .45 - rect.top) / Math.max(1, rect.height - window.innerHeight * .75));
    steps.forEach((step, i) => step.classList.toggle('active', i / steps.length <= progress));
    let active;
    capSections.forEach(section => {
      const bounds = section.getBoundingClientRect();
      if (bounds.top < window.innerHeight * .5) active = section.id;
      section.style.setProperty('--section-progress', motion.matches ? .5 : clamp((window.innerHeight - bounds.top) / (window.innerHeight + bounds.height)));
    });
    manifestoWords.forEach(word => {
      const focus = motion.matches ? 1 : clamp((window.innerHeight * .88 - word.getBoundingClientRect().top) / (window.innerHeight * .45));
      word.style.setProperty('--word-focus', focus);
    });
    capLinks.forEach(link => {
      const isActive = link.dataset.capLink === active;
      link.classList.toggle('active', isActive);
      if (isActive) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }
  function requestScrollUpdate() {
    if (!queued) { queued = true; requestAnimationFrame(updateScroll); }
  }
  window.addEventListener('scroll', requestScrollUpdate, { passive: true });
  window.addEventListener('resize', requestScrollUpdate, { passive: true });
  motion.addEventListener('change', () => {
    if (motion.matches) $$('.reveal').forEach(el => el.classList.add('visible'));
    requestScrollUpdate();
  });
  updateScroll();

  const finePointer = window.matchMedia('(pointer: fine)');
  hero.addEventListener('pointermove', e => {
    if (!finePointer.matches || motion.matches) return;
    const art = $('.hero-art');
    art.style.setProperty('--px', ((e.clientX / window.innerWidth - .5) * 16) + 'px');
    art.style.setProperty('--py', ((e.clientY / window.innerHeight - .5) * 12) + 'px');
  }, { passive: true });
  hero.addEventListener('pointerleave', () => {
    $('.hero-art').style.setProperty('--px', '0px');
    $('.hero-art').style.setProperty('--py', '0px');
  });
  $$('.magnetic').forEach(button => {
    button.addEventListener('pointermove', e => {
      if (!finePointer.matches || motion.matches) return;
      const rect = button.getBoundingClientRect();
      button.style.translate = `${(e.clientX - rect.left - rect.width / 2) * .08}px ${(e.clientY - rect.top - rect.height / 2) * .08}px`;
    });
    button.addEventListener('pointerleave', () => { button.style.translate = ''; });
  });

  // 指针倾斜只作用于视觉层，文字、链接与点击位置保持稳定。
  $$('.cap-art, .studio-card, .lab-constellation').forEach(surface => {
    const visual = $('.studio-visual', surface) || $('.art-motion', surface) || surface;
    let latestPointer, pointerFrame;
    surface.addEventListener('pointermove', e => {
      if (!finePointer.matches || mobile.matches || motion.matches) return;
      latestPointer = { x: e.clientX, y: e.clientY };
      if (pointerFrame) return;
      pointerFrame = requestAnimationFrame(() => {
        pointerFrame = undefined;
        const bounds = surface.getBoundingClientRect();
        visual.style.setProperty('--tilt-x', ((latestPointer.y - bounds.top) / bounds.height - .5) * -5 + 'deg');
        visual.style.setProperty('--tilt-y', ((latestPointer.x - bounds.left) / bounds.width - .5) * 7 + 'deg');
      });
    }, { passive: true });
    const resetTilt = () => {
      if (pointerFrame) cancelAnimationFrame(pointerFrame);
      pointerFrame = undefined;
      visual.style.setProperty('--tilt-x', '0deg');
      visual.style.setProperty('--tilt-y', '0deg');
    };
    surface.addEventListener('pointerleave', resetTilt);
    motion.addEventListener('change', resetTilt);
    mobile.addEventListener('change', resetTilt);
  });

  $$('[data-interest]').forEach(link => link.addEventListener('click', () => {
    $('#interest').value = link.dataset.interest;
  }));
  $('#year').textContent = new Date().getFullYear();
  const config = window.HILO_CONFIG || {};
  const methods = $('#contact-methods');
  const email = typeof config.email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(config.email) ? config.email.trim() : '';
  function addMethod(label, value, href) {
    const item = document.createElement(href ? 'a' : 'div');
    if (href) item.href = href;
    const caption = document.createElement('span');
    caption.textContent = label;
    item.append(caption, document.createTextNode(value));
    methods.append(item);
  }
  if (email) addMethod('EMAIL', email, 'mailto:' + email);
  if (typeof config.phone === 'string' && config.phone.trim()) addMethod('PHONE', config.phone.trim(), 'tel:' + config.phone.replace(/[^+\d]/g, ''));
  if (typeof config.wechat === 'string' && config.wechat.trim()) addMethod('WECHAT', config.wechat.trim());
  if (methods.childElementCount) { methods.hidden = false; $('#contact-pending').hidden = true; }
  if (email) $('#email-brief').hidden = false;
  const form = $('#brief-form');
  function getBrief() {
    if (!form.reportValidity()) return null;
    const name = $('#name').value.trim(), message = $('#message').value.trim();
    if (!name || !message) { $('#form-status').textContent = '请填写称呼和需求内容。'; return null; }
    return `Hilo 项目需求摘要\n\n称呼：${name}\n探索方向：${$('#interest').value}\n\n需求说明：\n${message}\n\n整理日期：${new Date().toLocaleDateString('zh-CN')}\n北京希洛探索科技有限公司 / Hilo Exploration Technology\n`;
  }
  form.addEventListener('submit', e => {
    e.preventDefault();
    const brief = getBrief();
    if (!brief) return;
    const url = URL.createObjectURL(new Blob(['\ufeff' + brief], { type: 'text/plain;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Hilo-项目需求摘要.txt';
    document.body.append(link); link.click(); link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1500);
    $('#form-status').textContent = '需求摘要已生成，请在下载记录中查看。内容尚未发送。';
  });
  $('#copy-brief').addEventListener('click', async () => {
    const brief = getBrief();
    if (!brief) return;
    try {
      if (!navigator.clipboard) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(brief);
      $('#form-status').textContent = '摘要已复制，你可以粘贴后分享。';
    } catch { $('#form-status').textContent = '此环境不支持自动复制，请使用“下载需求摘要”。'; }
  });
  $('#email-brief').addEventListener('click', () => {
    const brief = getBrief();
    if (!brief || !email) return;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent('Hilo 项目咨询 — ' + $('#interest').value)}&body=${encodeURIComponent(brief)}`;
    $('#form-status').textContent = '请在邮件应用中确认并发送。';
  });
})();
