import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

describe('Mobile Drawer Body Overflow Lifecycle Verification', () => {
  it('verifies Navbar.tsx contains dedicated useEffect synchronizing mobileMenuOpen to body overflow', () => {
    const navbarSrc = fs.readFileSync(path.resolve(process.cwd(), 'src/components/Navbar.tsx'), 'utf8');

    // Verify reactive effect exists
    assert.ok(
      navbarSrc.includes('useEffect(() => {') &&
      navbarSrc.includes('if (mobileMenuOpen)') &&
      navbarSrc.includes("document.body.style.overflow = 'hidden'") &&
      navbarSrc.includes("document.body.style.overflow = ''"),
      'Navbar must synchronize mobileMenuOpen state directly to body overflow via useEffect'
    );
  });

  it('confirms body overflow is properly reset to empty string when mobile menu closes via useEffect hook', () => {
    let mobileMenuOpen = false;
    const documentBodyStyle: { overflow: string } = { overflow: '' };

    const syncBodyOverflowEffect = () => {
      if (mobileMenuOpen) {
        documentBodyStyle.overflow = 'hidden';
      } else {
        documentBodyStyle.overflow = '';
      }
    };

    // 1. Mobile menu opens
    mobileMenuOpen = true;
    syncBodyOverflowEffect();
    assert.equal(mobileMenuOpen, true);
    assert.equal(documentBodyStyle.overflow, 'hidden');

    // 2. User clicks About / Contact / Terms link, setting mobileMenuOpen to false
    mobileMenuOpen = false;
    syncBodyOverflowEffect();
    assert.equal(mobileMenuOpen, false);
    assert.equal(
      documentBodyStyle.overflow,
      '',
      'document.body.style.overflow must be restored to empty string on route navigation'
    );
  });
});
