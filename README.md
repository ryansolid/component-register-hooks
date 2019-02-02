# Component Register Hooks

This is a [Component Register](https://github.com/ryansolid/component-register) HOC (decorator/mixin) to support [Reacts Hook API](https://reactjs.org/docs/hooks-reference.html) with WebComponents. It is designed to work with many DOM rendering micro-libraries. The ones that don't have their own state management libraries, like LitHTML, HyperHTML, IncrementalDOM, and so on. These libraries on their own while blazingly fast usually lack the more expressive control mechanisms, and mechanisms to modularlize. Any top down library that exposes their render method could probably use this as a swap in.

How does this work? Most of these libraries have a render, update, or patch method to do diffing. You just pass in the method to handle this reconciliation and you are good to go. It takes the form of ```(results, containerElement) => { }``` mirroring the common rendering method used by libraries like React.

# Getting Started

Install component-register-hooks off npm or yarn and the render library of your choice. Here I will use LitHTML as an example:

```js
import { register, compose } from 'component-register';
import { withHooks, useState, useEffect } from 'component-register-hooks';
import { render, html } from 'lit-html';

const LitCounter = ({ interval }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setCount(c => c + interval), 500);
    return () => clearInterval(t);
  }, []);
  return html`<div>Count: ${count}</div>`;
}

compose(
  register('lit-counter'),
  withHooks(render)
)(LitCounter)
```