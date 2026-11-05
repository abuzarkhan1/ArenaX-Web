/**
 * Reference formulas, calculation engines, and invariant contracts for ArenaX-Web.
 * Authoritative specifications derived from PROJECT.md and src/components/.
 */

export interface RankTier {
  name: string;
  badge: string;
  range: string;
  pts: string;
  targetMin: number;
  reward: string;
  isTop?: boolean;
}

export const RANK_TIERS: RankTier[] = [
  { name: 'Bronze', badge: '/ranks/bronze.webp?v=s4', range: 'Tier I–IV', pts: '0–999 PTS', targetMin: 0, reward: 'Starter Base' },
  { name: 'Silver', badge: '/ranks/silver.webp?v=s4', range: 'Tier I–IV', pts: '1,000–1,999 PTS', targetMin: 1000, reward: '+150 AX Cash' },
  { name: 'Gold', badge: '/ranks/gold.webp?v=s4', range: 'Tier I–IV', pts: '2,000–3,199 PTS', targetMin: 2000, reward: '+300 AX Cash' },
  { name: 'Platinum', badge: '/ranks/platinum.webp?v=s4', range: 'Tier I–IV', pts: '3,200–4,599 PTS', targetMin: 3200, reward: '+600 AX Cash' },
  { name: 'Diamond', badge: '/ranks/diamond.webp?v=s4', range: 'Tier I–IV', pts: '4,600–6,199 PTS', targetMin: 4600, reward: '+1,200 AX Cash' },
  { name: 'Heroic', badge: '/ranks/heroic.webp?v=s4', range: 'Tier I–IV', pts: '6,200–7,999 PTS', targetMin: 6200, reward: '+2,500 AX Cash' },
  { name: 'Master', badge: '/ranks/master.webp?v=s4', range: 'Tier I–IV', pts: '8,000–9,999 PTS', targetMin: 8000, reward: '+5,000 AX Cash' },
  { name: 'Grandmaster', badge: '/ranks/grandmaster.webp?v=s4', range: 'Apex Contender', pts: '10,000+ PTS', targetMin: 10000, reward: '+10,000 AX Pool', isTop: true },
];

export const EXPECTED_APP_ROUTES = [
  '/',
  '/about',
  '/faq',
  '/contact',
  '/terms',
  '/privacy',
  '/refund-policy',
  '/fair-play',
] as const;

/**
 * Combat points formula from AIVisionShowcase.tsx:
 * 20 PTS for Booyah victory + 5 PTS per verified kill.
 */
export function computeCombatPoints(isBooyah: boolean, kills: number): number {
  const safeKills = Number.isFinite(kills) ? Math.max(0, Math.floor(kills)) : 0;
  return (isBooyah ? 20 : 0) + safeKills * 5;
}

/**
 * Projected Tier mapping based on combat points.
 */
export function getTierFromPoints(pts: number): { name: string; percent: number; badge: string } {
  if (pts >= 60) return { name: 'Grandmaster Contender', percent: 100, badge: '/ranks/grandmaster.webp?v=s4' };
  if (pts >= 40) return { name: 'Heroic Tier', percent: 75, badge: '/ranks/heroic.webp?v=s4' };
  if (pts >= 25) return { name: 'Diamond Tier', percent: 50, badge: '/ranks/diamond.webp?v=s4' };
  return { name: 'Gold Tier', percent: 25, badge: '/ranks/gold.webp?v=s4' };
}

/**
 * Rank gap math from LeaderboardTiers.tsx:
 * ptsNeeded = Math.max(0, targetMin - currentPts)
 * booyahsNeeded = Math.ceil(ptsNeeded / 20)
 * progressPercent = targetMin === 0 ? 100 : Math.min(100, Math.round((currentPts / targetMin) * 100))
 */
export function computeRankGap(currentPts: number, targetMin: number): {
  ptsNeeded: number;
  booyahsNeeded: number;
  progressPercent: number;
} {
  const safePts = Math.max(0, currentPts);
  const ptsNeeded = Math.max(0, targetMin - safePts);
  const booyahsNeeded = Math.ceil(ptsNeeded / 20);
  const progressPercent = targetMin === 0
    ? 100
    : Math.min(100, Math.max(0, Math.round((safePts / targetMin) * 100)));

  return { ptsNeeded, booyahsNeeded, progressPercent };
}

/**
 * Organizer revenue breakdown from OrganizerProgram.tsx:
 * totalRevenue = participants * entryFee
 * adminFee = Math.round(totalRevenue * 0.10) (10% platform fee)
 * hostEarnings = Math.round(totalRevenue * (hostCutPercent / 100))
 * playerPrizePool = totalRevenue - adminFee - hostEarnings
 * playerPrizePercent = Math.round((playerPrizePool / (totalRevenue || 1)) * 100)
 */
export function computeOrganizerRevenue(
  participants: number,
  entryFee: number,
  hostCutPercent: number
): {
  totalRevenue: number;
  adminFee: number;
  hostEarnings: number;
  playerPrizePool: number;
  playerPrizePercent: number;
  isConserved: boolean;
} {
  const safeParticipants = Math.max(0, Math.floor(participants));
  const safeFee = Math.max(0, Math.floor(entryFee));
  const safeCut = Math.max(0, Math.min(100, hostCutPercent));

  const totalRevenue = safeParticipants * safeFee;
  const adminFee = Math.round(totalRevenue * 0.10);
  const hostEarnings = Math.round(totalRevenue * (safeCut / 100));
  const playerPrizePool = totalRevenue - adminFee - hostEarnings;
  const playerPrizePercent = totalRevenue === 0
    ? 0
    : Math.round((playerPrizePool / totalRevenue) * 100);

  const isConserved = (adminFee + hostEarnings + playerPrizePool) === totalRevenue;

  return {
    totalRevenue,
    adminFee,
    hostEarnings,
    playerPrizePool,
    playerPrizePercent,
    isConserved,
  };
}

/**
 * Mailto generator for Contact.tsx when VITE_CONTACT_FORM_ENDPOINT is unset.
 */
export function generateMailtoUrl(
  formData: { name: string; email: string; subject: string; message: string },
  supportEmail: string = 'arenasupport@gmail.com'
): string {
  const subjectEncoded = encodeURIComponent(`[ArenaX Contact] ${formData.subject}`);
  const bodyEncoded = encodeURIComponent(
    `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
  );
  return `mailto:${supportEmail}?subject=${subjectEncoded}&body=${bodyEncoded}`;
}
