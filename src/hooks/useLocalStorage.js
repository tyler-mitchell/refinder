import { useState, useLayoutEffect, useCallback } from "react";
const initializedStorageKeys = new Set();
export default function useLocalStorageState(key, defaultValue) {
  const [value, setValue] = useState(() => {
    const storageValue = localStorage.getItem(key);
    return storageValue === null ? defaultValue : JSON.parse(storageValue);
  });
  const updateValue = useCallback(
    newValue => {
      setValue(value => {
        const isCallable = value => typeof value === "function";
        const result = isCallable(newValue) ? newValue(value) : newValue;
        localStorage.setItem(key, JSON.stringify(result));
        return result;
      });
    },
    [key]
  );
  useLayoutEffect(() => {
    if (initializedStorageKeys.has(key)) {
      throw new Error(
        `Multiple instances of useLocalStorageState() initialized with the same key. ` +
          `Use createLocalStorageStateHook() instead. ` +
          `Look at the example here: ` +
          `https://github.com/astoilkov/use-local-storage-state#create-local-storage-state-hook-example`
      );
    } else {
      initializedStorageKeys.add(key);
    }
    return () => void initializedStorageKeys.delete(key);
  }, []);
  /**
   * Checks for changes across tabs and iframe's.
   */
  useLayoutEffect(() => {
    const onStorage = e => {
      if (e.storageArea === localStorage && e.key === key) {
        setValue(e.newValue === null ? defaultValue : JSON.parse(e.newValue));
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  });
  return [value, updateValue];
}
export function createLocalStorageStateHook(key, defaultValue) {
  const updates = [];
  return function useLocalStorageStateHook() {
    const [value, setValue] = useLocalStorageState(key, defaultValue);
    const updateValue = useCallback(newValue => {
      for (const update of updates) {
        update(newValue);
      }
    }, []);
    useLayoutEffect(() => {
      initializedStorageKeys.delete(key);
    }, []);
    useLayoutEffect(() => {
      updates.push(setValue);
      return () => void updates.splice(updates.indexOf(setValue), 1);
    }, [setValue]);
    return [value, updateValue];
  };
}
