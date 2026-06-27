import { useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import Nav from './Nav.jsx';
import Footer from './Footer.jsx';

export default function Layout() {
  const { pathname, hash } = useLocation();
  const lenisRef = useRef(null);

  // Smooth scroll — created once for the whole app.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;
    let id;
    const raf = (time) => {
      lenis.raf(time);
      id = requestAnimationFrame(raf);
    };
    id = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(id);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Scroll reveals — re-armed per page.
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const reveals = document.querySelectorAll('[data-reveal]');
    const showAll = () => reveals.forEach((el) => el.classList.remove('qk-hidden'));
    if (!('IntersectionObserver' in window) || reduce) {
      showAll();
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.remove('qk-hidden');
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.05, rootMargin: '0px 0px -5% 0px' }
    );
    const raf = requestAnimationFrame(() => {
      const vh = window.innerHeight;
      reveals.forEach((el) => {
        if (el.getBoundingClientRect().top > vh) {
          el.classList.add('qk-hidden');
          io.observe(el);
        }
      });
    });
    const timer = setTimeout(showAll, 4000);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
      io.disconnect();
    };
  }, [pathname]);

  // On navigation: jump to top, or smooth-scroll to a hash target.
  useEffect(() => {
    const lenis = lenisRef.current;
    if (hash) {
      requestAnimationFrame(() => {
        const target = document.querySelector(hash);
        if (!target) return;
        if (lenis) lenis.scrollTo(target, { offset: -20 });
        else target.scrollIntoView();
      });
    } else if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  // Smooth-scroll for in-page anchor CTAs rendered inside page content.
  useEffect(() => {
    const handler = (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute('href');
      if (!id) return;
      if (id === '#') {
        // placeholder link — don't jump to top
        e.preventDefault();
        return;
      }
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const lenis = lenisRef.current;
      if (lenis) lenis.scrollTo(target, { offset: -20 });
      else target.scrollIntoView({ behavior: 'smooth' });
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  return (
    <>
      <Nav />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
