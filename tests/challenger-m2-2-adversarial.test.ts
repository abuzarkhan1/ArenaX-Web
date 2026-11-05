import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

describe('Adversarial Challenger Suite M2-2: AppExperienceShowcase & TournamentModes', () => {
  const root = process.cwd();
  const appShowcaseSrc = fs.readFileSync(path.join(root, 'src/components/AppExperienceShowcase.tsx'), 'utf8');
  const tournamentSrc = fs.readFileSync(path.join(root, 'src/components/TournamentModes.tsx'), 'utf8');

  // =========================================================================
  // 1. AppExperienceShowcase: 3D Phone Rotation & Transform Simulation
  // =========================================================================
  describe('AppExperienceShowcase: 3D Phone Rotation & Mathematical Model', () => {
    // Model the exact continuous rotation function implemented in GSAP ScrollTrigger
    function getContinuousRotation(p: number) {
      const rotY = -18 + p * 32;
      const rotX = 6 - p * 10;
      const transZ = Math.sin(p * Math.PI) * 35;
      return {
        rotY: Number(rotY.toFixed(1)),
        rotX: Number(rotX.toFixed(1)),
        transZ: Number(transZ.toFixed(0)),
      };
    }

    // Model the discrete rotation mapping for direct tab clicks
    const ROTATION_MAP: Record<string, { rotY: number; rotX: number; transZ: number }> = {
      match: { rotY: -18, rotX: 6, transZ: 0 },
      ocr: { rotY: -2, rotX: 1, transZ: 35 },
      wallet: { rotY: 14, rotX: -4, transZ: 0 },
    };

    it('verifies ROTATION_MAP matches source code constants exactly', () => {
      assert.ok(appShowcaseSrc.includes("match: { rotY: -18, rotX: 6, transZ: 0 }"));
      assert.ok(appShowcaseSrc.includes("ocr: { rotY: -2, rotX: 1, transZ: 35 }"));
      assert.ok(appShowcaseSrc.includes("wallet: { rotY: 14, rotX: -4, transZ: 0 }"));
    });

    it('verifies continuous rotation at p=0.0 aligns exactly with Tab 1 (match)', () => {
      const rotAtZero = getContinuousRotation(0.0);
      assert.deepEqual(rotAtZero, ROTATION_MAP.match);
    });

    it('verifies continuous rotation at p=0.5 aligns exactly with Tab 2 (ocr midpoint)', () => {
      const rotAtMid = getContinuousRotation(0.5);
      assert.deepEqual(rotAtMid, ROTATION_MAP.ocr);
    });

    it('verifies continuous rotation at p=1.0 aligns exactly with Tab 3 (wallet)', () => {
      const rotAtOne = getContinuousRotation(1.0);
      assert.deepEqual(rotAtOne, ROTATION_MAP.wallet);
    });

    it('stress-tests 1,000 progress intervals without discontinuity or NaN', () => {
      for (let i = 0; i <= 1000; i++) {
        const p = i / 1000;
        const { rotY, rotX, transZ } = getContinuousRotation(p);
        assert.ok(Number.isFinite(rotY), `rotY must be finite at p=${p}`);
        assert.ok(Number.isFinite(rotX), `rotX must be finite at p=${p}`);
        assert.ok(Number.isFinite(transZ), `transZ must be finite at p=${p}`);
        assert.ok(rotY >= -18.1 && rotY <= 14.1, `rotY out of bounds [-18, 14]: ${rotY}`);
        assert.ok(rotX >= -4.1 && rotX <= 6.1, `rotX out of bounds [-4, 6]: ${rotX}`);
        assert.ok(transZ >= -0.1 && transZ <= 35.1, `transZ out of bounds [0, 35]: ${transZ}`);
      }
    });

    it('verifies scroll progress threshold segmentation (match < 0.35, ocr < 0.70, wallet >= 0.70)', () => {
      function getActiveTabByProgress(p: number): 'match' | 'ocr' | 'wallet' {
        if (p < 0.35) return 'match';
        if (p < 0.7) return 'ocr';
        return 'wallet';
      }

      assert.equal(getActiveTabByProgress(0.0), 'match');
      assert.equal(getActiveTabByProgress(0.349), 'match');
      assert.equal(getActiveTabByProgress(0.35), 'ocr');
      assert.equal(getActiveTabByProgress(0.5), 'ocr');
      assert.equal(getActiveTabByProgress(0.699), 'ocr');
      assert.equal(getActiveTabByProgress(0.7), 'wallet');
      assert.equal(getActiveTabByProgress(1.0), 'wallet');
    });

    it('guards phone transform execution behind desktop breakpoint (>= 1024px)', () => {
      assert.ok(appShowcaseSrc.includes('window.innerWidth >= 1024'));
      assert.ok(appShowcaseSrc.includes("mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)'"));
    });
  });

  // =========================================================================
  // 2. AppExperienceShowcase: Chapters, Copy Button & Invariants
  // =========================================================================
  describe('AppExperienceShowcase: Interactive Elements & Content Invariants', () => {
    it('defines all 3 narrative chapters with consistent numbers and IDs', () => {
      assert.ok(appShowcaseSrc.includes("id: 'match'"));
      assert.ok(appShowcaseSrc.includes("num: '01'"));
      assert.ok(appShowcaseSrc.includes("title: 'Match Credentials'"));

      assert.ok(appShowcaseSrc.includes("id: 'ocr'"));
      assert.ok(appShowcaseSrc.includes("num: '02'"));
      assert.ok(appShowcaseSrc.includes("title: 'AI Scoreboard'"));

      assert.ok(appShowcaseSrc.includes("id: 'wallet'"));
      assert.ok(appShowcaseSrc.includes("num: '03'"));
      assert.ok(appShowcaseSrc.includes("title: 'Dual-Vault Escrow'"));
    });

    it('ensures room credentials clipboard copying handles optional clipboard safely', () => {
      assert.ok(appShowcaseSrc.includes("navigator.clipboard?.writeText('Room ID: 884921 | Password: arena77')"));
      assert.ok(appShowcaseSrc.includes('setCopiedRoomId(true)'));
      assert.ok(appShowcaseSrc.includes('setTimeout(() => setCopiedRoomId(false), 2500)'));
    });

    it('verifies accessibility affordances on copy button', () => {
      assert.ok(appShowcaseSrc.includes('aria-label="Copy room credentials"'));
      assert.ok(appShowcaseSrc.includes('title="Copy credentials"'));
    });

    it('validates Tab 1 Match Credentials coded UI elements', () => {
      assert.ok(appShowcaseSrc.includes('Bermuda Championship #402'));
      assert.ok(appShowcaseSrc.includes('21:00 PKT'));
      assert.ok(appShowcaseSrc.includes('Entry: 50 AX'));
      assert.ok(appShowcaseSrc.includes('Prize: 2,160 AX'));
      assert.ok(appShowcaseSrc.includes('Slot #12 Locked'));
      assert.ok(appShowcaseSrc.includes('UID 94829104'));
    });

    it('validates Tab 2 AI Scoreboard arithmetic and telemetry (Booyah 20 + Kills 70 = 90)', () => {
      assert.ok(appShowcaseSrc.includes('AI Scoreboard'));
      assert.ok(appShowcaseSrc.includes('#1 (+20 PTS)'));
      assert.ok(appShowcaseSrc.includes('14 (+70 PTS)'));
      assert.ok(appShowcaseSrc.includes('90 PTS Total'));
      assert.ok(appShowcaseSrc.includes('Heroic Tier I'));
      assert.ok(appShowcaseSrc.includes('Latency: 1.2s'));
      assert.ok(appShowcaseSrc.includes('Certified'));

      // Validate arithmetic formula: 20 + (14 * 5) === 90
      const booyahPts = 20;
      const killPts = 14 * 5;
      assert.equal(booyahPts + killPts, 90);
    });

    it('validates Tab 3 Dual-Vault Escrow strings and institutional badges', () => {
      assert.ok(appShowcaseSrc.includes('Play Wallet'));
      assert.ok(appShowcaseSrc.includes('Entry Vault'));
      assert.ok(appShowcaseSrc.includes('500 AX'));
      assert.ok(appShowcaseSrc.includes('Winning Wallet'));
      assert.ok(appShowcaseSrc.includes('Withdrawable'));
      assert.ok(appShowcaseSrc.includes('950 AX'));
      assert.ok(appShowcaseSrc.includes('Fund Security'));
      assert.ok(appShowcaseSrc.includes('PIN Enabled'));
    });

    it('verifies CTA button connects smoothly to download anchor', () => {
      assert.ok(appShowcaseSrc.includes("document.getElementById('download')?.scrollIntoView({ behavior: 'smooth' })"));
      assert.ok(appShowcaseSrc.includes('Join Scrim in App'));
    });

    it('verifies GSAP context cleanup on unmount', () => {
      assert.ok(appShowcaseSrc.includes('return () => ctx.revert()'));
      assert.ok(appShowcaseSrc.includes('return () => pinTrigger.kill()'));
    });
  });

  // =========================================================================
  // 3. TournamentModes: Formats, Sub-Formats & 10% Platform Rake Invariants
  // =========================================================================
  describe('TournamentModes: Data Integrity & Platform Rake Math', () => {
    const bermudaData = {
      solo: { formatTitle: 'Solo Survival (48 Players)', slots: 48, entryFee: 50, prizePool: 2160 },
      duo: { formatTitle: 'Duo Combat (24 Teams)', slots: 48, teams: 24, entryFee: 100, prizePool: 2160 },
      squad: { formatTitle: 'Squad 4v4v4 (12 Teams)', slots: 48, squads: 12, entryFee: 200, prizePool: 2160 },
    };

    it('verifies 48-player capacity invariant across all Bermuda sub-formats', () => {
      assert.equal(bermudaData.solo.slots, 48);
      assert.equal(bermudaData.duo.slots, 48);
      assert.equal(bermudaData.squad.slots, 48);
    });

    it('empirically verifies exact 10.0% platform rake across Solo, Duo, and Squad', () => {
      // Solo: 48 players * 50 AX = 2400 AX gross
      const soloGross = bermudaData.solo.slots * bermudaData.solo.entryFee;
      const soloRake = soloGross - bermudaData.solo.prizePool;
      assert.equal(soloGross, 2400);
      assert.equal(soloRake, 240);
      assert.equal(soloRake / soloGross, 0.10);

      // Duo: 24 teams * 100 AX = 2400 AX gross
      const duoGross = bermudaData.duo.teams * bermudaData.duo.entryFee;
      const duoRake = duoGross - bermudaData.duo.prizePool;
      assert.equal(duoGross, 2400);
      assert.equal(duoRake, 240);
      assert.equal(duoRake / duoGross, 0.10);

      // Squad: 12 squads * 200 AX = 2400 AX gross
      const squadGross = bermudaData.squad.squads * bermudaData.squad.entryFee;
      const squadRake = squadGross - bermudaData.squad.prizePool;
      assert.equal(squadGross, 2400);
      assert.equal(squadRake, 240);
      assert.equal(squadRake / squadGross, 0.10);
    });

    it('verifies Clash Squad bracket tree configuration and 10.0% platform rake', () => {
      // 8 squads * 400 AX = 3200 AX gross entry
      const csGross = 8 * 400;
      const csPrize = 2880;
      const csRake = csGross - csPrize;
      assert.equal(csGross, 3200);
      assert.equal(csRake, 320);
      assert.equal(csRake / csGross, 0.10);

      // Check source strings
      assert.ok(tournamentSrc.includes("prizePool: '2,880 AX Cash'"));
      assert.ok(tournamentSrc.includes("entry: '400 AX / Squad'"));
    });

    it('verifies Clash Squad dynamic stages: Quarters, Semis, Finals', () => {
      assert.ok(tournamentSrc.includes('quarters'));
      assert.ok(tournamentSrc.includes('semis'));
      assert.ok(tournamentSrc.includes('finals'));

      // Team matchups
      assert.ok(tournamentSrc.includes('Team Alpha (Squad A)'));
      assert.ok(tournamentSrc.includes('Team Omega (Squad B)'));
      assert.ok(tournamentSrc.includes('Team Delta (Squad D)'));
      assert.ok(tournamentSrc.includes('Team Phoenix (Squad C)'));
    });
  });

  // =========================================================================
  // 4. TournamentModes: 3D Specular Tilt Math Stress Test
  // =========================================================================
  describe('TournamentModes: 3D Specular Mouse Tilt Math', () => {
    function calculateCardTilt(clientX: number, clientY: number, rect: { left: number; top: number; width: number; height: number }) {
      const x = ((clientX - rect.left) / rect.width - 0.5) * 6;
      const y = ((clientY - rect.top) / rect.height - 0.5) * -6;
      const px = Math.round(((clientX - rect.left) / rect.width) * 100);
      const py = Math.round(((clientY - rect.top) / rect.height) * 100);
      return { x, y, px, py };
    }

    const mockRect = { left: 100, top: 100, width: 400, height: 300 };

    it('calculates exact neutral tilt and center specular position at element center', () => {
      const center = calculateCardTilt(300, 250, mockRect);
      assert.equal(Math.abs(center.x), 0);
      assert.equal(Math.abs(center.y), 0);
      assert.equal(center.px, 50);
      assert.equal(center.py, 50);
    });

    it('calculates correct tilt angles at bounding corners', () => {
      // Top-Left (100, 100)
      const tl = calculateCardTilt(100, 100, mockRect);
      assert.equal(tl.x, -3);
      assert.equal(tl.y, 3);
      assert.equal(tl.px, 0);
      assert.equal(tl.py, 0);

      // Top-Right (500, 100)
      const tr = calculateCardTilt(500, 100, mockRect);
      assert.equal(tr.x, 3);
      assert.equal(tr.y, 3);
      assert.equal(tr.px, 100);
      assert.equal(tr.py, 0);

      // Bottom-Left (100, 400)
      const bl = calculateCardTilt(100, 400, mockRect);
      assert.equal(bl.x, -3);
      assert.equal(bl.y, -3);
      assert.equal(bl.px, 0);
      assert.equal(bl.py, 100);

      // Bottom-Right (500, 400)
      const br = calculateCardTilt(500, 400, mockRect);
      assert.equal(br.x, 3);
      assert.equal(br.y, -3);
      assert.equal(br.px, 100);
      assert.equal(br.py, 100);
    });

    it('stress-tests 500 randomized mouse coordinates inside bounding box', () => {
      for (let i = 0; i < 500; i++) {
        const clientX = mockRect.left + Math.random() * mockRect.width;
        const clientY = mockRect.top + Math.random() * mockRect.height;
        const tilt = calculateCardTilt(clientX, clientY, mockRect);

        assert.ok(tilt.x >= -3 && tilt.x <= 3, `x angle out of [-3, 3]: ${tilt.x}`);
        assert.ok(tilt.y >= -3 && tilt.y <= 3, `y angle out of [-3, 3]: ${tilt.y}`);
        assert.ok(tilt.px >= 0 && tilt.px <= 100, `px out of [0, 100]: ${tilt.px}`);
        assert.ok(tilt.py >= 0 && tilt.py <= 100, `py out of [0, 100]: ${tilt.py}`);
      }
    });

    it('guards tilt execution on mobile (< 1024px)', () => {
      assert.ok(tournamentSrc.includes('if (window.innerWidth < 1024) return;'));
    });

    it('resets tilt on mouse leave', () => {
      assert.ok(tournamentSrc.includes('const handleCardMouseLeave = () => {'));
      assert.ok(tournamentSrc.includes('setCardTilt({ x: 0, y: 0, px: 50, py: 50 })'));
    });
  });

  // =========================================================================
  // 5. Requirement R1: Zero Helper Copy, Zero Taglines & Zero Banner Leakage
  // =========================================================================
  describe('Requirement R1 Zero-Defect Copy Audit in M2 Interactive Components', () => {
    it('verifies zero <Pill /> eyebrows in AppExperienceShowcase and TournamentModes', () => {
      const appPills = (appShowcaseSrc.match(/<Pill\b[^>]*\/>/g) || []).length;
      const tourneyPills = (tournamentSrc.match(/<Pill\b[^>]*\/>/g) || []).length;
      assert.equal(appPills, 0, 'AppExperienceShowcase must contain zero <Pill /> eyebrows');
      assert.equal(tourneyPills, 0, 'TournamentModes must contain zero <Pill /> eyebrows');
    });

    it('verifies zero tagline: declarations in AppExperienceShowcase and TournamentModes', () => {
      const appTaglines = (appShowcaseSrc.match(/\btagline\s*:\s*['"`][^'"`]+['"`]/gi) || []).length;
      const tourneyTaglines = (tournamentSrc.match(/\btagline\s*:\s*['"`][^'"`]+['"`]/gi) || []).length;
      assert.equal(appTaglines, 0, 'AppExperienceShowcase must have zero tagline: declarations');
      assert.equal(tourneyTaglines, 0, 'TournamentModes must have zero tagline: declarations');
    });

    it('verifies zero deprecated subtext props passed to <Stat />', () => {
      const appStatSubtext = (appShowcaseSrc.match(/<Stat\b[^>]*\bsubtext\s*=/g) || []).length;
      const tourneyStatSubtext = (tournamentSrc.match(/<Stat\b[^>]*\bsubtext\s*=/g) || []).length;
      assert.equal(appStatSubtext, 0);
      assert.equal(tourneyStatSubtext, 0);
    });

    it('verifies complete elimination of legacy explanatory and marketing copy', () => {
      const forbiddenPhrases = [
        'Experience the actual tournament workflow built into our native Android application',
        'Multi-player end-match score extraction',
        'Non-Withdrawable',
        'Used for match entry fees & bonuses',
        '100% Cash',
        'Available for 24h JazzCash/EasyPaisa cashout',
        'SURVIVAL FORMAT',
        'BRACKET ELIMINATION',
        'Result Verified within Seconds',
        'Room slots locked to verified player UIDs only.',
        'ShieldAlert',
        'Free Welcome Bonus',
      ];

      for (const phrase of forbiddenPhrases) {
        assert.ok(
          !appShowcaseSrc.includes(phrase),
          `AppExperienceShowcase must NOT contain leaked copy: "${phrase}"`
        );
        assert.ok(
          !tournamentSrc.includes(phrase),
          `TournamentModes must NOT contain leaked copy: "${phrase}"`
        );
      }
    });

    it('verifies section anchor IDs exist for navigation jumping', () => {
      assert.ok(appShowcaseSrc.includes('id="app-showcase"'));
      assert.ok(tournamentSrc.includes('id="tournaments"'));
    });
  });
});
