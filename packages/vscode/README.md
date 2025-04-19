### 🎨 Customiza los colores de tus etiquetas `@`

Añade esto a tu `settings.json`:

```json
"editor.tokenColorCustomizations": {
  "textMateRules": [
    {
      "scope": "keyword.note.wisemark",
      "settings": {
        "foreground": "#61afef",
        "fontStyle": "bold"
      }
    },
    {
      "scope": "keyword.todo.wisemark",
      "settings": {
        "foreground": "#e5c07b",
        "fontStyle": "italic"
      }
    },
    {
      "scope": "keyword.fixme.wisemark",
      "settings": {
        "foreground": "#e06c75",
        "fontStyle": "bold underline"
      }
    }
  ]
}
```
