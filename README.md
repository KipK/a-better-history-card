# a-better-history-card

A Lovelace card for Home Assistant that exposes the full capabilities of the
[`ha-better-history`](https://github.com/KipK/ha-better-history) web component.

## Variants

- **`a-better-history-card`** — inline graph card rendered directly in the dashboard.
- **`a-better-history-button-card`** — button that opens a dialog containing the graph.

## Installation

_Documentation will be expanded in a later step._

## Configuration

Both card variants share the same base schema:

```yaml
type: custom:a-better-history-card
entities:
  - sensor.temperature
range_mode: relative
hours: 24
show_legend: true
show_tooltip: true
show_grid: true
show_scale: true
```

Use `type: custom:a-better-history-button-card` for the button variant.

### Main Options

| Option | Type | Default | Description |
| ------ | ---- | ------- | ----------- |
| `entities` | `string[]` | — | Entity state series to show. |
| `series` | `CardSeriesConfig[]` | — | Explicit state/attribute series. |
| `attribute_units` | object | — | Attribute dot-path to unit map. |
| `range_mode` | `relative` \| `absolute` | `relative` | Relative hours or absolute date range. |
| `hours` | number | `24` | Relative range length. |
| `start_date` / `end_date` | ISO string | — | Absolute range bounds. |
| `show_date_picker` | boolean | `false` | Show date range picker controls. |
| `show_entity_picker` | boolean | `false` | Show entity/attribute picker controls. |
| `show_legend` | boolean | `true` | Show graph legend. |
| `show_tooltip` | boolean | `true` | Show hover tooltip. |
| `show_grid` | boolean | `true` | Show graph grid lines. |
| `show_scale` | boolean | `true` | Show axis lines, ticks, and labels. |
| `show_controls` | boolean | `true` | Initial visibility for date/entity picker controls. |
| `disable_climate_overlay` | boolean | `false` | Disable heating overlay for climate series. |
| `line_mode` | `stair` \| `line` \| `column` | `stair` | Global numeric render mode. |
| `line_width` | number/string | `2.5` | Global line stroke width. |

### Header And Tools

| Option | Type | Default | Description |
| ------ | ---- | ------- | ----------- |
| `title` | string | — | Header title. |
| `title_font_family` | string | — | Inline-card title font family. |
| `title_font_size` | string | — | Inline-card title font size. |
| `title_color` | string/RGB | — | Inline-card title color. |
| `show_tools_button` | boolean | `false` | Show toolbar button that opens the tools panel. |
| `show_controls_toggle` | boolean | `false` | Show chevron for date/entity controls when controls exist. |
| `show_fullscreen_button` | boolean | `false` | Show fullscreen action. |
| `show_line_mode_buttons` | boolean | `true` | Show stair/line/column buttons in tools. |
| `show_export_button` | boolean | `true` | Show export button in tools. |
| `show_import_button` | boolean | `false` | Show import button in tools. |
| `show_time_range_selector` | boolean | `true` | Show no-refetch zoom range selector in tools. |

### Button Variant

| Option | Type | Default | Description |
| ------ | ---- | ------- | ----------- |
| `button_label` | string | `History` | Button label. |
| `button_icon` | string | `mdi:chart-line` | Button icon. |
| `button_show_name` | boolean | `true` | Show button label. |
| `button_show_icon` | boolean | `true` | Show button icon. |
| `button_color` | string/RGB | — | Button icon and label color. |
| `button_hover_color` | string/RGB | — | Hover halo color. |
| `button_hover_effect` | boolean | `true` | Enable hover halo. |

### Series Options

```yaml
series:
  - entity: climate.living_room
    attribute: current_temperature
    label: Indoor
    color: "#42a5f5"
    scale_group: temperature
    line_mode: line
    line_width: 3
```

`CardSeriesConfig` supports `entity`, `attribute`, `label`, `color`, `unit`,
`scale_group`, `scale_mode`, `scale_min`, `scale_max`, `line_mode`,
`line_width`, and `forced`.

## Dependencies

- [`@kipk/ha-better-history`](https://www.npmjs.com/package/@kipk/ha-better-history)
