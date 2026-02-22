# customer-20260222-151355

Automaattisesti generoitu asiakassivu (Claude AI).

## Tutkinta: miksi style.css ja main.js puuttuivat alun perin

**Juurisyy:** `generate_site.py` (site-template-repossa) käytti `max_tokens=16000`.
Kolmen tiedoston (index.html + style.css + main.js) generoiminen vaatii
~20 000+ tokenia. Claude API:n vastaus katkesi kesken `style.css`-tiedoston,
ja `main.js` jäi kokonaan generoimatta.

Katkaisu meni myös hiljaa läpi: alkuperäisessä koodissa ei ollut tarkistusta
`stop_reason=max_tokens`-tilalle, joten branch `generated-1771773428` luotiin
ja PR avattiin, mutta branchissa oli vain `index.html`.

**Korjaus (site-template commit 171411b + 0e4f8d3):**
- `max_tokens` nostettu 16 000 → 32 000
- Lisätty `stop_reason=max_tokens` -tarkistus → workflow kaatuu virhekoodilla
- Lisätty pakollisten tiedostojen tarkistus (`index.html`, `style.css`, `main.js`)
- `generate.yml`:ään lisätty "Validate generated files" -vaihe
- Malli vaihdettu `claude-opus-4-5` → `claude-sonnet-4-6`
