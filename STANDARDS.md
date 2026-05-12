# SDT Framework — Estándares de desarrollo

## Stack
- Playwright + TypeScript
- Allure para reportes
- GitHub Actions para CI/CD

## Estructura de capas

```
Tests → Flows → Pages → WebUtils → Playwright
              ↑
         DataProvider (JSON + Models)
```

## Console logs obligatorios

Cada método debe loguear con su prefijo de capa:

| Capa | Prefijo | Ejemplo |
|---|---|---|
| Flow | `[NombreFlow]` | `[LoginFlow] Iniciando flujo de login` |
| Page | `[NombrePage]` | `[LoginPage] Ingresando usuario` |
| WebUtils | `[ACTION]` `[READ]` `[CHECK]` `[WAIT]` `[SCREENSHOT]` | `[ACTION] Click en: Botón login` |
| DataProvider | `[NombreProvider]` | `[LoginDataProvider] Buscando caso: "login_success"` |

## Screenshots

- **Después de cada flow**: captura del resultado final de la acción
- **En cada validación del flow**: captura del estado al momento de verificar

Los screenshots se guardan en `screenshots/` con nombre descriptivo + timestamp.
Se usa `web.takeScreenshot('nombre_descriptivo')` desde el flow.

## Data

- Los JSON viven en `src/data/datasets/`
- Cada caso tiene `id`, `description`, y campos de validación esperada (`expectedError`, `expectedUrl`)
- Los mensajes esperados se definen en `src/utils/Messages.ts`, nunca hardcodeados en el test

## Reglas generales

- Los **tests** solo orquestan: obtienen data, llaman flows, hacen `expect`
- Los **flows** agrupan pasos de negocio y toman screenshots
- Las **pages** solo contienen acciones elementales de UI
- **WebUtils** es el único punto de contacto con Playwright nativo
- Los selectores viven en la Page, nunca en el flow ni en el test
