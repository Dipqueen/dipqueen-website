#!/bin/bash
# Zet de laatste wijzigingen op GitHub. Vercel bouwt daarna vanzelf.
cd "$(dirname "$0")" || exit 1

# slotbestanden opruimen die de cloud-omgeving niet mag weghalen
find .git -name "*.lock" -delete 2>/dev/null

T=$(tr -d ' \n\r' < .gh-token)
git add -A
git commit -q -m "${1:-Wijzigingen vanuit Claude}" 2>/dev/null

echo "Versturen naar GitHub..."
if git push "https://x-access-token:${T}@github.com/Dipqueen/dipqueen-website.git" main 2>&1 | sed "s|${T}|***|g"; then
  echo ""
  echo "KLAAR. Vercel bouwt nu automatisch."
else
  echo ""
  echo "ER GING IETS MIS — stuur bovenstaande melding naar Claude."
fi
