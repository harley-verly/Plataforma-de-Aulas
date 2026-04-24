const iconMarkup = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">
  <rect width="64" height="64" rx="18" fill="#120C08" />
  <circle cx="20" cy="20" r="8" fill="#D9B15F" />
  <path
    d="M22 44V18H36.5C45.06 18 50 22.28 50 29.76C50 37.4 45.06 42 36.5 42H29.48V44H22ZM29.48 36.44H36.1C40.46 36.44 42.8 34.2 42.8 29.92C42.8 25.74 40.46 23.56 36.1 23.56H29.48V36.44Z"
    fill="#FFF7E8"
  />
</svg>
`.trim();

export function GET() {
  return new Response(iconMarkup, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=31536000, immutable"
    }
  });
}
