import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { AppProvider, useAppContext } from '../contexts/AppContext.jsx';

describe('AppContext', () => {
  it('provides default dark theme', () => {
    const { result } = renderHook(() => useAppContext(), { wrapper: AppProvider });
    expect(result.current.theme).toBe('dark');
  });

  it('toggles theme between dark and light', () => {
    const { result } = renderHook(() => useAppContext(), { wrapper: AppProvider });
    act(() => result.current.toggleTheme());
    expect(result.current.theme).toBe('light');
    act(() => result.current.toggleTheme());
    expect(result.current.theme).toBe('dark');
  });

  it('adds a notification with an id', () => {
    const { result } = renderHook(() => useAppContext(), { wrapper: AppProvider });
    act(() => result.current.addNotification({ message: 'Hello' }));
    expect(result.current.notifications).toHaveLength(1);
    expect(result.current.notifications[0].message).toBe('Hello');
    expect(result.current.notifications[0].id).toBeDefined();
  });

  it('removes a notification by id', () => {
    const { result } = renderHook(() => useAppContext(), { wrapper: AppProvider });
    act(() => result.current.addNotification({ message: 'A' }));
    act(() => result.current.addNotification({ message: 'B' }));
    const id = result.current.notifications[0].id;
    act(() => result.current.removeNotification(id));
    expect(result.current.notifications).toHaveLength(1);
    expect(result.current.notifications[0].message).toBe('B');
  });

  it('throws outside provider', () => {
    expect(() => renderHook(() => useAppContext())).toThrow(/must be used within an AppProvider/);
  });
});
