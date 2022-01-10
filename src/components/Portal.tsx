import React from 'react';
import ReactDom from 'react-dom';

export default function Portal({ children }: { children: React.ReactNode }) {
  const el = document.getElementById('portal')!;
  return ReactDom.createPortal(children, el);
}
