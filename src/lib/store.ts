"use client";

import { useState, useEffect, useRef } from 'react';

export const DEFAULT_MENU = [
  { id: 1, name: 'Cinemax Classic Popcorn', type: 'Popcorn', price: 180, img: 'https://images.unsplash.com/photo-1585647347384-2593bc35786b?auto=format&fit=crop&q=80&w=200', desc: 'Butter salted large popcorn', enabled: true },
  { id: 2, name: 'Premium Caramel Popcorn', type: 'Popcorn', price: 220, img: 'https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?auto=format&fit=crop&q=80&w=200', desc: 'Handcrafted golden caramel', enabled: true },
  { id: 3, name: 'Cheese Nachos Deluxe', type: 'Nachos', price: 250, img: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&q=80&w=200', desc: 'Jalapenos and extra liquid cheese', enabled: true },
  { id: 4, name: 'Crispy Chicken Burger', type: 'Burger', price: 190, img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=200', desc: 'Spicy chicken patty with mayo', enabled: true },
  { id: 5, name: 'Coca Cola Large', type: 'Beverage', price: 120, img: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=200', desc: 'Chilled 500ml', enabled: true },
  { id: 6, name: 'Blockbuster Combo', type: 'Combo', price: 450, img: 'https://images.unsplash.com/photo-1621252179027-94459d278660?auto=format&fit=crop&q=80&w=200', desc: '1 Large Popcorn + 2 Coke + Nachos', enabled: true },
];

export const DEFAULT_ORDERS = [
  { id: 'RC001', time: '14:22', audi: 'Audi-1', items: [{ name: 'Cinemax Classic Popcorn', qty: 2 }, { name: 'Coca Cola Large', qty: 2 }], status: 'preparing', phone: '9876543210' },
  { id: 'RC002', time: '14:25', audi: 'Audi-2', items: [{ name: 'Cheese Nachos Deluxe', qty: 1 }], status: 'new order', phone: '9988776655' },
];

export function useAppStore() {
  const [menu, setMenu] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const initialized = useRef(false);

  useEffect(() => {
    const load = () => {
      const storedMenu = localStorage.getItem('revathy_menu');
      if (storedMenu) setMenu(JSON.parse(storedMenu));
      else {
        setMenu(DEFAULT_MENU);
        localStorage.setItem('revathy_menu', JSON.stringify(DEFAULT_MENU));
      }

      const storedOrders = localStorage.getItem('revathy_orders');
      if (storedOrders) setOrders(JSON.parse(storedOrders));
      else {
        setOrders(DEFAULT_ORDERS);
        localStorage.setItem('revathy_orders', JSON.stringify(DEFAULT_ORDERS));
      }
      initialized.current = true;
    };

    if (!initialized.current) {
        load();
    }

    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'revathy_menu' && e.newValue) setMenu(JSON.parse(e.newValue));
      if (e.key === 'revathy_orders' && e.newValue) setOrders(JSON.parse(e.newValue));
    };
    
    // Also listen for custom events within same tab
    const handleCustomEvent = () => {
        const storedMenu = localStorage.getItem('revathy_menu');
        const storedOrders = localStorage.getItem('revathy_orders');
        if (storedMenu) setMenu(JSON.parse(storedMenu));
        if (storedOrders) setOrders(JSON.parse(storedOrders));
    };

    window.addEventListener('storage', handleStorage);
    window.addEventListener('revathy_update', handleCustomEvent);
    
    // Polling as a fallback for instant updates
    const interval = setInterval(() => {
        const storedMenu = localStorage.getItem('revathy_menu');
        const storedOrders = localStorage.getItem('revathy_orders');
        if (storedMenu) setMenu(prev => JSON.stringify(prev) !== storedMenu ? JSON.parse(storedMenu) : prev);
        if (storedOrders) setOrders(prev => JSON.stringify(prev) !== storedOrders ? JSON.parse(storedOrders) : prev);
    }, 2000);

    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('revathy_update', handleCustomEvent);
      clearInterval(interval);
    };
  }, []);

  const updateMenu = (newMenu: any[]) => {
    setMenu(newMenu);
    localStorage.setItem('revathy_menu', JSON.stringify(newMenu));
    window.dispatchEvent(new Event('revathy_update'));
  };

  const updateOrders = (newOrders: any[]) => {
    setOrders(newOrders);
    localStorage.setItem('revathy_orders', JSON.stringify(newOrders));
    window.dispatchEvent(new Event('revathy_update'));
  };

  return { menu: menu.length ? menu : DEFAULT_MENU, orders: orders.length ? orders : DEFAULT_ORDERS, updateMenu, updateOrders };
}
