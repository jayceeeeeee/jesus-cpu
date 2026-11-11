# Jesus CPU

Reproduction vectorielle du diagramme de référence, avec aperçu blanc ou damier et téléchargement SVG / PNG transparent (800, 1 600 ou 3 200 px).

## Ouvrir la page

Depuis ce dossier, lancer `python -m http.server 8080`, puis ouvrir http://localhost:8080. Aucun paquet à installer ni compilation. Utiliser un serveur HTTP pour garantir l’export PNG ; les navigateurs peuvent bloquer le canvas depuis une URL `file://`.

## Fichiers

- `diagram.svg` : dessin autonome à fond transparent, en coordonnées 800 × 800. Les masques évidant les trois cercles évitent les aplats blancs.
- `index.html` / `style.css` : page responsive et commandes d’export.
- `app.js` : aperçu et conversion du SVG en PNG transparent dans le navigateur.

Le SVG possède des groupes et identifiants stables (`structure`, `branches`, `extensions`, `centers`, etc.) pour permettre de futures interactions. Il est chargé dans un élément `object` ; depuis la page servie sur la même origine, son DOM est accessible via `document.querySelector('#diagram').contentDocument`.
