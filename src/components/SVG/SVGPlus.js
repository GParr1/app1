import { SVGCloseCircle } from 'components/SVG/SVGClose';

export const SVGPlus = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    role="img"
    aria-label="Aggiungi"
  >
    <path
      fill="currentColor"
      d="M11 5a1 1 0 0 1 1 1v4h4a1 1 0 1 1 0 2h-4v4a1 1 0 1 1-2 0v-4H6a1 1 0 1 1 0-2h4V6a1 1 0 0 1 1-1z"
    ></path>
  </svg>
);

export const SVGPlusCircle = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
    width="48"
    height="48"
    role="button"
    aria-label="Aggiungi"
  >
    <circle cx="24" cy="24" r="24" fill="currentColor" />
    <g fill="#fff">
      <rect x="22" y="12" width="4" height="24" rx="1" />
      <rect x="12" y="22" width="24" height="4" rx="1" />
    </g>
  </svg>
);
export const SVGPlusCircleFilled = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
    width="48"
    height="48"
    role="button"
    aria-label="Aggiungi"
  >
    <circle cx="24" cy="24" r="24" fill="currentColor" />
    <g fill="#fff">
      <rect x="22" y="12" width="4" height="24" rx="1" />
      <rect x="12" y="22" width="24" height="4" rx="1" />
    </g>
  </svg>
);
