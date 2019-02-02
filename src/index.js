import augmentor, { useEffect } from 'augmentor';

const naiveRenderer = (node, root) => {
  root.textContent = '';
  root.appendChild(node);
}

export function withHooks(render = naiveRenderer) {
  return Component =>
    (props, options) => {
      const { element } = options,
        effected = augmentor(() => {
          useEffect(() => {
            element.addPropertyChangedCallback((name, value) => {
              props = Object.assign({}, props);
              props[name] = value;
            })
          }, []);
          render(Component(props, options), element.renderRoot());
          return element;
        })
      element.addReleaseCallback(() => effected.reset());
      effected();
    };
  }

export {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useReducer,
  useRef,
  useState
} from 'augmentor';