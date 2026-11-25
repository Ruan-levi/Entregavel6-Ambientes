import { describe, expect, it } from 'vitest';
import { isEditableKeyboardTarget } from '../src/game/keyboard.js';
describe('teclas de jogo e formulários React/Nhost', () => {
  it('libera input, textarea, select e contenteditable', () => {
    for (const tagName of ['INPUT','TEXTAREA','SELECT'])
      expect(isEditableKeyboardTarget({target:{tagName,closest:()=>({})}})).toBe(true);
    expect(isEditableKeyboardTarget({tagName:'DIV',isContentEditable:true})).toBe(true);
  });
  it('conserva o teclado da aventura fora dos campos', () => {
    expect(isEditableKeyboardTarget({tagName:'CANVAS',closest:()=>null})).toBe(false);
    expect(isEditableKeyboardTarget(null)).toBe(false);
  });
});
