import { useEffect, useRef } from 'react';

type KeyHandlerMap = {
  [key: string]: () => void;
};

type KeyboardEventOptions = {
  // Only trigger the handlers when this condition is true
  enabled?: boolean;

  // Event type to listen for ('keydown', 'keyup', 'keypress')
  eventType?: 'keydown' | 'keyup' | 'keypress';

  // Target element to attach listeners to (defaults to document)
  target?: HTMLElement | Document | null;
};

/**
 * A hook for handling keyboard events
 *
 * @param keyHandlers - Object mapping key names to handler functions
 * @param options - Configuration options
 */
export function useKeyboardEvent(
  keyHandlers: KeyHandlerMap,
  options: KeyboardEventOptions = {},
): void {
  const {
    enabled = true,
    eventType = 'keydown',
    target = typeof document !== 'undefined' ? document : null,
  } = options;

  // Ref to avoid recreating the handler function on every render
  const handlersRef = useRef<KeyHandlerMap>(keyHandlers);

  // Update ref if handlers change
  useEffect(() => {
    handlersRef.current = keyHandlers;
  }, [keyHandlers]);

  useEffect(() => {
    // If disabled or no target, don't attach listeners
    if (!enabled || !target) return;

    const handleEvent = (e: KeyboardEvent) => {
      const handler = handlersRef.current[e.key];
      if (typeof handler === 'function') {
        e.preventDefault(); // Prevent default behavior for handled keys
        handler();
      }
    };

    target.addEventListener(eventType, handleEvent as EventListener);

    return () => {
      target.removeEventListener(eventType, handleEvent as EventListener);
    };
  }, [enabled, eventType, target]);
}
