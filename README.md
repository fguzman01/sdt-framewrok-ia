# SDT Framework IA

Framework de automatización QA con Playwright + TypeScript, orientado a SDT (Software Development Testing), con integración de IA en roadmap.

## Stack

- **Playwright** — automatización web y API
- **TypeScript** — tipado estático
- **Allure** — reportes de ejecución
- **GitHub Actions** — CI/CD

## Arquitectura

```
Tests → Flows → Pages → WebUtils → Playwright
              ↑
         DataProvider (JSON + Models)
```

| Capa | Ubicación | Responsabilidad |
|---|---|---|
| Tests | `tests/` | Orquestar flujos y validar resultados |
| Flows | `src/flows/` | Agrupar pasos de negocio |
| Pages | `src/pages/` | Acciones elementales de UI |
| WebUtils | `src/utils/WebUtils.ts` | Wrapper sobre Playwright con logging |
| Data | `src/data/` | Modelos, datasets JSON y providers |
| Messages | `src/utils/Messages.ts` | Mensajes esperados centralizados |

## Instalación

```bash
npm install
npx playwright install chromium
```

## Ejecución

```bash
# Todos los tests web
npm run test:web

# Tests de API
npm run test:api

# Modo visual con slow motion (debug)
npm run test:visual

# Ejecutar + generar + abrir reporte Allure
npm run test:report

# Un test específico
npx playwright test --project=web-chromium -g "nombre del test"
```

## Variables de entorno

Copia `.env.example` a `.env` y ajusta los valores:

```bash
cp .env.example .env
```

| Variable | Descripción | Default |
|---|---|---|
| `BASE_URL` | URL base de la app web | `https://www.saucedemo.com` |
| `API_BASE_URL` | URL base de la API | `https://reqres.in/api` |
| `HEADED` | Ejecutar con browser visible | `false` |
| `SLOW_MO` | Delay entre acciones (ms) | `0` |

## Aplicación de prueba

- **Web**: [SauceDemo](https://www.saucedemo.com)
- **API**: [Reqres](https://reqres.in)

## Roadmap

- [x] Fase 1 — Setup base (Playwright + TypeScript)
- [x] Fase 2 — Capa Web (POM + WebUtils)
- [x] Fase 3 — Data Layer (models + JSON datasets)
- [x] Fase 4 — Flows + Tests de Login
- [ ] Fase 5 — Capa API
- [ ] Fase 6 — CI/CD GitHub Actions
- [ ] Fase 7 — Integración IA
