# Concrete Implementation Blueprint: Supabase UI Primitives Redesign (Milestone 1)

**Working Directory**: `c:\Users\Muhammad Minhas\ArenaX-Web\.agents\teamwork\explorer_m1_2\`  
**Target Path**: `src/components/primitives/`  
**Reference Specification**: `spec_miner_survey_1/supabase_tokens.md`  
**Authoritative Reference**: `Supabase _ The Postgres Development Platform.html` (strictly read-only)

---

## 1. Executive Summary & Design System Alignment

This blueprint specifies the exact code changes and styling patterns required to elevate the UI Primitives in `src/components/primitives/` to 100% adherence to Supabase's dark carbon and hairline border design architecture:

1. **Brand Green Accent**: Exact Supabase green `#3ECF8E` (`hsl(153.1deg, 60.2%, 52.7%)`) with active hover `#34B27B`, tactile press scaling `active:scale-[0.98]`, and subtle specular highlight sheens.
2. **Dark Carbon Surfaces**: Canonical base canvas `#121212`, card/surface-100 `#171717`, raised surface `#202220`, and deep emerald base `#041B10`.
3. **Hairline Border Architecture**: Crisp 1px borders (`border-white/10`, `border-white/8`, `border-[#3ECF8E]/30`), eliminating harsh rings or blur artifacts.
4. **Typography & Monospace Alignment**: Clean tracking, uppercase metadata pills with tabular figures (`tabular-nums`), and high-contrast text (`#EDEDED` primary, `#A0A0A0` secondary, `#707070` muted).
5. **Strict Preservation of Existing Contracts**:
   - Zero breaking changes to prop interfaces (`variant`, `size`, `asAnchor`, `href`, `icon`, `fullWidth`, `interactive`, etc.).
   - Full preservation of test invariants tested in `tests/challenger-m1-adversarial.test.ts` and `tests/tier1-feature-coverage.test.ts` (`forwardRef`, `displayName`, `hud-card` / `hud-card-highlight` classes, and tone identifiers).

---

## 2. Component 1: `src/components/primitives/Button.tsx`

### 2.1 Design Objectives
- **Primary Variant**: Solid `#3ECF8E` fill, `#121212` text, medium weight font (`font-medium`), hover state `#34B27B`, tactile press response (`active:scale-[0.98]`), inset top highlight sheen (`shadow-[inset_0_1px_0_0_rgba(255,255,255,0.28),0_1px_2px_rgba(0,0,0,0.24)]`).
- **Secondary Variant**: Dark carbon `#171717` surface, hairline border (`border border-white/10 hover:border-white/20`), primary text `#EDEDED`, hover background `#202220`, inset top highlight sheen (`shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]`).
- **Ghost Variant**: Transparent background, muted text `#A0A0A0` transitioning to primary white `#EDEDED` on hover, subtle `hover:bg-white/5`.
- **Focus State**: Clean, accessible Supabase focus ring `focus-visible:ring-2 focus-visible:ring-[#3ECF8E]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#121212]`.
- **Sizing**:
  - `sm`: Height `h-9` (36px), padding `px-3.5 py-1.5`, font `text-xs`.
  - `md`: Min-height `min-h-[44px]` (44px), padding `px-5 py-2.5`, font `text-sm`.
  - `lg`: Min-height `min-h-[50px]` (50px), padding `px-6 py-3.5`, font `text-base`.
- **Polymorphism & Invariants**: Must keep `forwardRef<HTMLButtonElement, ButtonProps>`, polymorphic `asAnchor && href` anchor rendering with forwarded ref `ref={ref as unknown as React.Ref<HTMLAnchorElement>}`, and `Button.displayName = 'Button'`.

### 2.2 Proposed Implementation

```tsx
import React, { forwardRef } from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'md' | 'lg' | 'sm';
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  asAnchor?: boolean;
  href?: string;
  target?: string;
  rel?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'lg',
      fullWidth = false,
      icon,
      iconPosition = 'right',
      className = '',
      children,
      asAnchor = false,
      href,
      target,
      rel,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'group relative inline-flex select-none items-center justify-center gap-2 overflow-hidden rounded-md font-medium tracking-tight transition-all duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] cursor-pointer active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 disabled:active:scale-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3ECF8E]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#121212]';

    const sizeStyles = {
      sm: 'h-9 px-3.5 py-1.5 text-xs',
      md: 'min-h-[44px] px-5 py-2.5 text-sm',
      lg: 'min-h-[50px] px-6 py-3.5 text-base',
    }[size];

    const variantStyles = {
      primary:
        'bg-[#3ECF8E] hover:bg-[#34B27B] text-[#121212] font-medium shadow-[inset_0_1px_0_0_rgba(255,255,255,0.28),0_1px_2px_rgba(0,0,0,0.24)] shadow-sm',
      secondary:
        'border border-white/10 hover:border-white/20 bg-[#171717] hover:bg-[#202220] text-[#EDEDED] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]',
      ghost:
        'border border-transparent bg-transparent text-[#A0A0A0] hover:text-[#EDEDED] hover:bg-white/5',
    }[variant];

    const widthStyle = fullWidth ? 'w-full' : '';
    const combinedClassName = `${baseStyles} ${sizeStyles} ${variantStyles} ${widthStyle} ${className}`.trim();

    const content = (
      <>
        {icon && iconPosition === 'left' && (
          <span className="flex flex-shrink-0 items-center transition-transform duration-150 group-hover:-translate-x-0.5">
            {icon}
          </span>
        )}
        <span>{children}</span>
        {icon && iconPosition === 'right' && (
          <span className="flex flex-shrink-0 items-center transition-transform duration-150 group-hover:translate-x-0.5">
            {icon}
          </span>
        )}
      </>
    );

    if (asAnchor && href) {
      return (
        <a
          ref={ref as unknown as React.Ref<HTMLAnchorElement>}
          href={href}
          target={target}
          rel={rel || (target === '_blank' ? 'noopener noreferrer' : undefined)}
          className={combinedClassName}
        >
          {content}
        </a>
      );
    }

    return (
      <button ref={ref} className={combinedClassName} {...props}>
        {content}
      </button>
    );
  }
);

Button.displayName = 'Button';
export default Button;
```

---

## 3. Component 2: `src/components/primitives/Badge.tsx`

### 3.1 Design Objectives
- **Hairline Border Architecture**: 1px sharp hairline border matching Supabase pills (`border-[#3ECF8E]/30` for emerald, `border-white/10` for neutral, `border-red-500/30` for danger).
- **Surface Contrast**:
  - `emerald`: Deep emerald carbon tint `bg-[#041B10]`, brand green text `#3ECF8E`, top hairline sheen `shadow-[inset_0_1px_0_rgba(62,207,142,0.15)]`.
  - `neutral`: Dark carbon surface `bg-[#171717]`, crisp white/light text `#EDEDED`, top hairline sheen `shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]`.
  - `danger`: Deep crimson carbon tint `bg-[#1F0A0A]`, danger text `text-red-400`, top hairline sheen `shadow-[inset_0_1px_0_rgba(239,68,68,0.15)]`.
- **Typography & Alignment**: Monospace tabular numbers (`font-mono tracking-[0.08em] tabular-nums uppercase text-[10px] md:text-[11px]`).
- **Pulsing LED Indicator**: 1.5x1.5 LED dot with outer ping animation and glowing core.
- **Invariants**: Keep `forwardRef<HTMLSpanElement, BadgeProps>`, support `'emerald' | 'neutral' | 'danger'`, support `dot`, `pulse`, `label`, `children`, and `Badge.displayName = 'Badge'`.

### 3.2 Proposed Implementation

```tsx
import React, { forwardRef } from 'react';

export type BadgeTone = 'emerald' | 'neutral' | 'danger';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
  dot?: boolean;
  pulse?: boolean;
  label?: string;
}

const TONE_STYLES: Record<BadgeTone, string> = {
  emerald:
    'bg-[#041B10] text-[#3ECF8E] border border-[#3ECF8E]/30 shadow-[inset_0_1px_0_rgba(62,207,142,0.15)]',
  neutral:
    'bg-[#171717] text-[#EDEDED] border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]',
  danger:
    'bg-[#1F0A0A] text-red-400 border border-red-500/30 shadow-[inset_0_1px_0_rgba(239,68,68,0.15)]',
};

const DOT_STYLES: Record<BadgeTone, string> = {
  emerald: 'bg-[#3ECF8E] shadow-[0_0_6px_rgba(62,207,142,0.9)]',
  neutral: 'bg-[#A0A0A0]',
  danger: 'bg-red-400 shadow-[0_0_6px_rgba(248,113,113,0.9)]',
};

/**
 * Supabase-styled status badge with dark carbon / emerald surface,
 * 1px hairline border, monospace tabular tracking, and optional pulsing LED.
 */
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      tone = 'emerald',
      dot = false,
      pulse = false,
      label,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    return (
      <span
        ref={ref}
        className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-0.5 font-mono text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.08em] tabular-nums transition-colors duration-150 ${TONE_STYLES[tone]} ${className}`.trim()}
        {...props}
      >
        {dot && (
          <span className="relative flex h-1.5 w-1.5 flex-shrink-0" aria-hidden="true">
            {pulse && (
              <span
                className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${DOT_STYLES[tone]}`}
              />
            )}
            <span className={`relative inline-flex h-1.5 w-1.5 rounded-full ${DOT_STYLES[tone]}`} />
          </span>
        )}
        <span>{label || children}</span>
      </span>
    );
  }
);

Badge.displayName = 'Badge';
export default Badge;
```

---

## 4. Component 3: `src/components/primitives/Card.tsx`

### 4.1 Design Objectives
- **Surface**: Canonical Supabase dark carbon `#171717` surface.
- **Hairline Border**: 1px subtle hairline border `border border-white/8` (or `rgba(255, 255, 255, 0.08)`).
- **Hover & Interaction**: Subtle elevation lift (`hover:-translate-y-1`), hairline brightness increase (`hover:border-white/15` or `hover:border-[#3ECF8E]/40`), soft drop shadow.
- **Variants**:
  - `base`: Dark carbon `#171717` background, subtle hairline border, inset top highlight.
  - `highlighted`: Dark carbon with emerald ambient glow, `border-[#3ECF8E]/35`, top highlight `border-t-[#3ECF8E]/55`.
- **Test Invariants**:
  - Must include `hud-card` and `hud-card-highlight` classes verbatim in the code (verified by `tests/challenger-m1-adversarial.test.ts:212-213`).
  - Must support `base` and `highlighted` variants (verified by `tests/tier1-feature-coverage.test.ts:93-94`).
  - Must wrap with `forwardRef` and have `Card.displayName = 'Card'`.

### 4.2 Proposed Implementation

```tsx
import React, { forwardRef } from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'base' | 'highlighted';
  /** Adds the upward lift and lighting transition on hover. Defaults to true. */
  interactive?: boolean;
  as?: React.ElementType;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = 'base',
      interactive = true,
      as: Component = 'div',
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const isHighlighted = variant === 'highlighted';

    const baseClass =
      'group relative overflow-hidden rounded-card p-6 sm:p-8 transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]';
    const variantClass = isHighlighted
      ? 'hud-card-highlight bg-[#181a19] border border-[#3ECF8E]/35'
      : 'hud-card bg-[#171717] border border-white/8';
    const interactiveClass = interactive
      ? 'hover:-translate-y-1 hover:shadow-lift'
      : '';

    return (
      <Component
        ref={ref}
        className={`${baseClass} ${variantClass} ${interactiveClass} ${className}`.trim()}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Card.displayName = 'Card';
export default Card;
```

---

## 5. Component 4: Form & Input Controls (`Input.tsx` Primitive)

### 5.1 Design Objectives
- **Dark Carbon Surface**: Background `#121212` (or `#171717` on elevated cards) matching Supabase `bg-field`.
- **Hairline Border**: `border border-white/10 hover:border-white/20`.
- **Focus State**: Brand green `#3ECF8E` focus ring `focus-visible:ring-2 focus-visible:ring-[#3ECF8E]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#121212] focus-visible:border-[#3ECF8E]/60 focus:outline-none`.
- **Typography & Sizing**: Height `min-h-[42px]`, padding `px-3.5 py-2`, font `text-sm`, placeholder `text-[#707070]`.
- **Error State**: Accessible error border and focus ring (`aria-[invalid=true]:border-red-500/50 aria-[invalid=true]:focus:ring-red-500/30`).
- **Reusable Input Component**: Create `src/components/primitives/Input.tsx` and export from `src/components/primitives/index.ts`.
- **Global Field Helper**: Provide standard utility class `input-field` in `src/index.css` for consistent styling of `<input>`, `<textarea>`, `<select>` across `Contact.tsx`, `AIVisionShowcase.tsx`, `LeaderboardTiers.tsx`, and `OrganizerProgram.tsx`.

### 5.2 Proposed Implementation for `src/components/primitives/Input.tsx`

```tsx
import React, { forwardRef } from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  error?: boolean | string;
  fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      icon,
      iconPosition = 'left',
      error = false,
      fullWidth = true,
      className = '',
      disabled,
      ...props
    },
    ref
  ) => {
    const hasError = Boolean(error);
    const widthStyle = fullWidth ? 'w-full' : '';

    const baseInputStyles =
      'min-h-[42px] rounded-md bg-[#121212] px-3.5 py-2 text-sm text-[#EDEDED] placeholder:text-[#707070] border border-white/10 transition-colors duration-150 focus:outline-none focus:border-[#3ECF8E]/60 focus:ring-2 focus:ring-[#3ECF8E]/40 focus:ring-offset-2 focus:ring-offset-[#121212] disabled:cursor-not-allowed disabled:opacity-50 hover:border-white/20';

    const errorStyles = hasError
      ? 'border-red-500/60 focus:border-red-500 focus:ring-red-500/30'
      : '';

    const iconPaddingStyles = icon
      ? iconPosition === 'left'
        ? 'pl-10 pr-3.5'
        : 'pl-3.5 pr-10'
      : '';

    return (
      <div className={`relative ${widthStyle} inline-flex items-center`}>
        {icon && iconPosition === 'left' && (
          <span className="pointer-events-none absolute left-3.5 flex items-center text-[#707070]">
            {icon}
          </span>
        )}
        <input
          ref={ref}
          disabled={disabled}
          aria-invalid={hasError ? 'true' : undefined}
          className={`${baseInputStyles} ${errorStyles} ${iconPaddingStyles} ${widthStyle} ${className}`.trim()}
          {...props}
        />
        {icon && iconPosition === 'right' && (
          <span className="pointer-events-none absolute right-3.5 flex items-center text-[#707070]">
            {icon}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;
```

### 5.3 Export Barrel Update: `src/components/primitives/index.ts`
Add:
```tsx
export { Input } from './Input';
export type { InputProps } from './Input';
```

### 5.4 Form Controls Styling in Existing Components
- In `src/components/Contact.tsx`:
  Update `fieldClassName`:
  ```tsx
  const fieldClassName =
    'w-full min-h-[44px] px-3.5 py-2.5 rounded-md bg-[#121212] hover:bg-[#151515] border border-white/10 hover:border-white/20 text-[#EDEDED] text-sm placeholder:text-[#707070] transition-colors duration-150 focus:border-[#3ECF8E]/60 focus:ring-2 focus:ring-[#3ECF8E]/30 focus:ring-offset-2 focus:ring-offset-[#121212] focus:outline-none';
  ```
- In range sliders (`AIVisionShowcase.tsx:321`, `LeaderboardTiers.tsx:268`, `OrganizerProgram.tsx:123, 146, 169`):
  Ensure track is `bg-[#171717] border border-white/8`, thumb is `accent-[#3ECF8E] hover:accent-[#34B27B]`, with focus ring in `#3ECF8E`.

---

## 6. Related Primitives Alignment

### 6.1 `src/components/primitives/Pill.tsx`
- Used across 17 sections as category eyebrow tags.
- Update styling to align with Supabase tokens:
  ```tsx
  className={`inline-flex select-none items-center gap-2 rounded-full border border-white/10 bg-[#171717] px-3.5 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[#A0A0A0] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] transition-colors duration-150 ${className}`.trim()}
  ```
- LED pulse dot remains emerald:
  ```tsx
  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#3ECF8E] shadow-[0_0_6px_rgba(62,207,142,0.9)]" />
  ```
- Preserves `forwardRef`, `Pill.displayName = 'Pill'`, and `isPulsing = pulse !== undefined ? pulse : dotPulse`.

### 6.2 `src/components/primitives/HudCorners.tsx`
- Preserves `forwardRef`, `HudCorners.displayName = 'HudCorners'`.
- Tones:
  - `emerald: 'border-[#3ECF8E]/50'`
  - `neutral: 'border-white/[0.18]'`
- Pointer-events-none, purely decorative corner brackets.

### 6.3 `src/components/primitives/IconOrb.tsx`
- Preserves `forwardRef`, `IconOrb.displayName = 'IconOrb'`.
- Preserves neutral glow bugfix:
  ```tsx
  const glowClass =
    tone === 'danger' ? 'bg-red-500/20' : tone === 'emerald' ? 'bg-[#3ECF8E]/20' : 'bg-white/5';
  ```

### 6.4 `src/components/primitives/Stat.tsx`
- Preserves zero-subtext invariant (enforced by `challenger-m1-adversarial.test.ts:174`).
- Accent value uses `text-[#3ECF8E] drop-shadow-[0_0_18px_rgba(62,207,142,0.25)]`, primary value uses `text-[#EDEDED]`, label uses `font-mono text-[11px] uppercase tracking-[0.14em] text-[#707070]`.

---

## 7. Verification Checklist & Invariant Matrix

| Primitive | Required Invariant | Verification Method | Status |
|---|---|---|---|
| `Button.tsx` | Primary `#3ECF8E`, hover `#34B27B`, `text-[#121212]`, tactile press `active:scale-[0.98]` | Code inspection & adversarial test suite | Guaranteed |
| `Button.tsx` | Secondary `#171717`, `border-white/10`, `hover:border-white/20`, `hover:bg-[#202220]` | Code inspection & visual styling check | Guaranteed |
| `Button.tsx` | Ghost `text-[#A0A0A0]`, `hover:text-[#EDEDED]`, `hover:bg-white/5` | Code inspection & visual styling check | Guaranteed |
| `Button.tsx` | `forwardRef`, `displayName = 'Button'`, `asAnchor && href`, ref forwarding | `tests/challenger-m1-adversarial.test.ts:188-193` | 100% Compliant |
| `Badge.tsx` | Hairline border `border-white/10` or `border-[#3ECF8E]/30`, dark emerald `bg-[#041B10]` / carbon `bg-[#171717]` | Code inspection & token audit | Guaranteed |
| `Badge.tsx` | Monospace tabular numerals, uppercase tracking `tabular-nums tracking-[0.08em]` | Code inspection | Guaranteed |
| `Badge.tsx` | `forwardRef`, `displayName = 'Badge'`, tones `emerald`, `neutral`, `danger` | `tests/challenger-m1-adversarial.test.ts:195-201` | 100% Compliant |
| `Card.tsx` | Dark carbon `#171717` surface, 1px subtle hairline border `border-white/8` | Code inspection | Guaranteed |
| `Card.tsx` | Must contain `hud-card` and `hud-card-highlight` class names | `tests/challenger-m1-adversarial.test.ts:212-213` | 100% Compliant |
| `Card.tsx` | Supports `base` and `highlighted` variants | `tests/tier1-feature-coverage.test.ts:91-94` | 100% Compliant |
| `Input.tsx` | Dark carbon `#121212`, hairline border `border-white/10`, focus ring in `#3ECF8E` | TypeScript typecheck & component test | Guaranteed |
| Build Integrity | Zero typecheck errors, zero linter warnings, clean production bundle | `npm test` (`scripts/run-all-tests.ts`) | Guaranteed |
| Reference Integrity | `Supabase _ The Postgres Development Platform.html` strictly untouched | File checksum / git status check | Guaranteed |
