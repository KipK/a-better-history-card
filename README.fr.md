# a-better-history-card

Une paire de cartes Lovelace pour Home Assistant qui exposent toutes les capacités du composant web
[`@kipk/ha-better-history`](https://www.npmjs.com/package/@kipk/ha-better-history) —
graphiques d'historique multi-entités avec style par série, groupes d'axe, superpositions climat, et plus encore.

## Variantes

| Type de carte | Description |
|---------------|-------------|
| `custom:a-better-history-card` | Graphique inline affiché directement dans la grille Lovelace. |
| `custom:a-better-history-button-card` | Bouton qui ouvre le graphique dans une boîte de dialogue. |

Les deux variantes partagent le même schéma de configuration et le même éditeur visuel.

---

## Captures d'écran

> _Les captures d'écran seront ajoutées dans une étape ultérieure._

---

## Installation

### Via HACS

1. Ajoutez ce dépôt comme dépôt personnalisé dans HACS (type : **Dashboard**).
2. Installez **a-better-history-card** depuis HACS.
3. Videz le cache du navigateur et rechargez Home Assistant.

### Manuelle

1. Téléchargez `a-better-history-card.js` depuis la dernière release.
2. Copiez-le dans `www/community/a-better-history-card/`.
3. Ajoutez-le comme ressource Lovelace :

```yaml
url: /local/community/a-better-history-card/a-better-history-card.js
type: module
```

---

## Configuration via l'interface

Les deux cartes disposent d'un éditeur visuel complet accessible depuis le sélecteur de cartes Lovelace.
L'éditeur est organisé en onglets :

- **Entités** — ajouter, supprimer et réordonner les séries entité/attribut via le sélecteur de séries.
- **Plage** — choisir une fenêtre relative en heures ou une plage de dates absolue avec un sélecteur de dates.
- **Affichage** — activer/désactiver le sélecteur de dates, le sélecteur d'entités, la légende, le tooltip, la grille, l'axe et la superposition climat.
- **Style** — définir le mode de ligne global, l'épaisseur de ligne et l'apparence du titre.
- **En-tête** — configurer les boutons de la barre d'outils (outils, bascule des contrôles, plein écran).
- **Bouton** _(variante button-card uniquement)_ — définir le libellé, l'icône, la couleur et l'effet de survol du bouton.
- **Avancé** — activer `debug_performance` et configurer `attribute_units`.

Toutes les options sont configurables via l'interface sans écrire de YAML.

---

## Exemples YAML

### (a) Carte graphique minimale

```yaml
type: custom:a-better-history-card
entities:
  - sensor.outdoor_temperature
  - sensor.indoor_temperature
```

### (b) Graphique riche — multi-entités avec séries d'attributs

```yaml
type: custom:a-better-history-card
title: Vue d'ensemble climat
range_mode: relative
hours: 48
show_legend: true
show_tooltip: true
show_grid: true
show_scale: true
show_date_picker: true
show_entity_picker: false
show_tools_button: true
show_controls_toggle: true
line_mode: line
line_width: 2
series:
  - entity: climate.living_room
    attribute: current_temperature
    label: Temp. intérieure
    color: "#42a5f5"
    scale_group: temperature
    line_mode: line
    line_width: 2.5
  - entity: climate.living_room
    attribute: humidity
    label: Humidité
    color: "#66bb6a"
    scale_group: humidity
    unit: "%"
  - entity: sensor.outdoor_temperature
    label: Temp. extérieure
    color: "#ef5350"
    scale_group: temperature
attribute_units:
  climate.living_room.humidity: "%"
```

### (c) Carte bouton

```yaml
type: custom:a-better-history-button-card
button_label: Voir l'historique
button_icon: mdi:chart-line
button_show_name: true
button_show_icon: true
button_hover_effect: true
entities:
  - sensor.power_consumption
range_mode: relative
hours: 24
show_legend: true
```

---

## Référence des options

Toutes les options sont facultatives sauf indication contraire. Les valeurs par défaut sont appliquées par `normalizeConfig()`.

### Données

| Option | Type | Défaut | Description |
|--------|------|--------|-------------|
| `entities` | `string[]` | — | Liste simplifiée d'identifiants d'entités à afficher comme séries d'état. |
| `series` | `CardSeriesConfig[]` | — | Définitions de séries explicites (voir [Options de série](#options-de-série) ci-dessous). Prioritaire sur `entities`. |
| `attribute_units` | `Record<string, string>` | — | Table `entity_id.attribut` → unité. Indispensable pour les séries d'attributs — voir la note ci-dessous. |

> **Pourquoi `attribute_units` est nécessaire.**
> Les _états_ d'entités dans Home Assistant portent un attribut `unit_of_measurement` que le composant
> peut lire automatiquement. Les _attributs_ d'entités (par ex. `current_temperature` d'une entité
> `climate`, `battery` d'un traqueur d'appareil, etc.) **n'ont aucune métadonnée d'unité** — Home
> Assistant ne les expose tout simplement pas. Sans unité déclarée, `ha-better-history` ne peut pas
> associer l'attribut à d'autres séries pour le groupement d'axe Y ni l'afficher correctement dans
> le tooltip.
>
> Déclarez l'unité de chaque série d'attributs que vous souhaitez regrouper :
>
> ```yaml
> attribute_units:
>   climate.living_room.current_temperature: "°C"
>   climate.living_room.humidity: "%"
> ```
>
> La clé est au format `entity_id.nom_attribut`. La valeur est la chaîne d'unité affichée dans le
> tooltip et utilisée pour regrouper les séries sur un axe Y commun via `scale_group`.

### Plage

| Option | Type | Défaut | Description |
|--------|------|--------|-------------|
| `range_mode` | `"relative"` \| `"absolute"` | `"relative"` | Fenêtre glissante relative ou plage de dates fixe. |
| `hours` | `number` | `24` | Taille de la fenêtre en heures quand `range_mode` est `"relative"`. |
| `start_date` | Chaîne ISO | — | Début de la plage quand `range_mode` est `"absolute"`. |
| `end_date` | Chaîne ISO | — | Fin de la plage quand `range_mode` est `"absolute"`. |

### Affichage

| Option | Type | Défaut | Description |
|--------|------|--------|-------------|
| `show_date_picker` | `boolean` | `false` | Afficher le sélecteur de plage de dates dans le graphique. |
| `show_entity_picker` | `boolean` | `false` | Afficher le sélecteur d'entités/attributs dans le graphique. |
| `show_legend` | `boolean` | `true` | Afficher la légende des séries. |
| `show_tooltip` | `boolean` | `true` | Afficher le tooltip au survol. |
| `show_grid` | `boolean` | `true` | Afficher les lignes de grille. |
| `show_scale` | `boolean` | `true` | Afficher les graduations, lignes et libellés d'axe. |
| `show_controls` | `boolean` | `true` | Visibilité initiale des contrôles date/entités (quand `show_controls_toggle` est activé). |
| `show_export_button` | `boolean` | `true` | Afficher le bouton d'export dans le panneau outils. Nécessite `show_tools_button: true`. |
| `show_import_button` | `boolean` | `false` | Afficher le bouton d'import dans le panneau outils. Nécessite `show_tools_button: true`. |
| `show_time_range_selector` | `boolean` | `true` | Afficher le sélecteur de zoom dans le panneau outils. Nécessite `show_tools_button: true`. |
| `disable_climate_overlay` | `boolean` | `false` | Désactiver la superposition chauffe/refroidissement pour les séries d'entités climat. |

### Style

| Option | Type | Défaut | Description |
|--------|------|--------|-------------|
| `title` | `string` | — | Titre affiché dans l'en-tête de la carte. |
| `title_font_family` | `string` | — | Famille de police CSS pour le titre (carte inline uniquement). |
| `title_font_size` | `string` | — | Taille de police CSS pour le titre (carte inline uniquement). |
| `title_color` | `string` \| `number[]` | — | Couleur CSS ou tableau RGB `[r, g, b]` pour le titre. |
| `line_mode` | `"stair"` \| `"line"` \| `"column"` | `"stair"` | Mode de rendu global pour les séries numériques. Peut être surchargé par série. |
| `line_width` | `number` \| `string` | `2.5` | Épaisseur de trait globale pour les séries ligne/escalier. Peut être surchargée par série. |

### En-tête & boutons de barre d'outils

Ces boutons sont rendus par la carte au-dessus du composant `ha-better-history`.

| Option | Type | Défaut | Description |
|--------|------|--------|-------------|
| `show_tools_button` | `boolean` | `false` | Afficher le bouton outils (`mdi:tools`) qui ouvre le panneau outils. |
| `show_controls_toggle` | `boolean` | `false` | Afficher le bouton chevron qui bascule la visibilité des contrôles date/entités. N'a de sens que si `show_date_picker` ou `show_entity_picker` est activé. |
| `show_fullscreen_button` | `boolean` | `false` | Afficher le bouton plein écran. Sur la carte inline, utilise l'API Fullscreen du navigateur ; dans la carte bouton, bascule l'attribut fullscreen de `ha-dialog`. |
| `show_line_mode_buttons` | `boolean` | `true` | Afficher les boutons escalier/ligne/colonne dans le panneau outils. Nécessite `show_tools_button: true`. |

### Variante carte bouton

Ces options s'appliquent uniquement à `custom:a-better-history-button-card`.

| Option | Type | Défaut | Description |
|--------|------|--------|-------------|
| `button_label` | `string` | `"History"` | Libellé du bouton. |
| `button_icon` | `string` | `"mdi:chart-line"` | Icône MDI affichée sur le bouton. |
| `button_show_name` | `boolean` | `true` | Afficher le libellé du bouton. |
| `button_show_icon` | `boolean` | `true` | Afficher l'icône du bouton. |
| `button_color` | `string` \| `number[]` | — | Couleur CSS ou tableau RGB `[r, g, b]` pour l'icône et le libellé du bouton. |
| `button_hover_color` | `string` \| `number[]` | — | Couleur CSS ou tableau RGB pour le halo de survol. |
| `button_hover_effect` | `boolean` | `true` | Activer l'animation de halo au survol. |

### Mise en page

| Option | Type | Défaut | Description |
|--------|------|--------|-------------|
| `grid_options` | `{ columns?: number\|string; rows?: number\|string }` | — | Écrit par le panneau de mise en page Lovelace — voir [Mise en page & dimensions](#mise-en-page--dimensions). |

### Débogage

| Option | Type | Défaut | Description |
|--------|------|--------|-------------|
| `debug_performance` | `boolean` | `false` | Active les logs de profilage de performances. **À n'activer que temporairement pour profiler — ne jamais laisser en production.** |

---

## Options de série

Chaque élément de la liste `series` est un objet `CardSeriesConfig`.

| Option | Type | Défaut | Description |
|--------|------|--------|-------------|
| `entity` | `string` | **requis** | Identifiant de l'entité. |
| `attribute` | `string` \| `string[]` | — | Chemin(s) d'attribut. Si absent, l'état de l'entité est utilisé. |
| `label` | `string` | — | Libellé dans la légende. Par défaut : nom convivial de l'entité. |
| `color` | `string` | — | Couleur CSS (ex. `"#42a5f5"` ou `"var(--primary-color)"`). |
| `unit` | `string` | — | Surcharge le libellé d'unité affiché dans la légende et le tooltip pour cette série. N'affecte **pas** le groupement d'axe — utilisez `attribute_units` au niveau racine pour cela. |
| `scale_group` | `string` | — | Nom du groupe d'axe Y partagé. Les séries avec le même groupe partagent une échelle. |
| `scale_mode` | `"auto"` \| `"manual"` | `"auto"` | `"manual"` active `scale_min`/`scale_max`. |
| `scale_min` | `number` | — | Minimum de l'axe Y quand `scale_mode: manual`. |
| `scale_max` | `number` | — | Maximum de l'axe Y quand `scale_mode: manual`. |
| `line_mode` | `"stair"` \| `"line"` \| `"column"` | _(global)_ | Surcharge du mode de rendu pour cette série. |
| `line_width` | `number` \| `string` | _(global)_ | Surcharge de l'épaisseur de trait pour cette série. |
| `forced` | `boolean` | `false` | Conserver cette série même quand le sélecteur d'entités supprime toutes les sélections utilisateur. |

---

## Mise en page & dimensions

La carte inline (`custom:a-better-history-card`) est dimensionnée par la grille Lovelace.
Utilisez le panneau **Mise en page** dans l'éditeur visuel pour contrôler l'empreinte de la carte :

- **Colonnes** — nombre de colonnes de grille occupées par la carte (1–12).
- **Lignes** — nombre de lignes de grille. Plus il y a de lignes, plus le graphique est haut. Par défaut, la hauteur est automatique (hauteur de carte standard de Home Assistant).

Ces valeurs sont stockées dans la clé de configuration `grid_options`, écrite automatiquement par Home Assistant.

```yaml
grid_options:
  columns: 12
  rows: 6
```

> **Conseil :** Le graphique remplit son élément hôte. Une valeur `rows` plus grande donne plus d'espace
> vertical au graphique d'historique. Aucune contrainte de hauteur minimale n'est imposée par la carte
> elle-même, donc n'importe quel nombre de lignes fonctionne.

---

## Dépendances

Cette carte embarque le composant web
[`@kipk/ha-better-history`](https://www.npmjs.com/package/@kipk/ha-better-history).
Vous n'avez pas besoin de l'installer séparément — il est inclus dans le bundle de la carte.
