# TaskMind - React Task Management App 

Zaawansowana aplikacja Single Page Application (SPA) do zarządzania zadaniami, zbudowana w środowisku React z użyciem nowoczesnych standardów dostępności (WCAG) oraz responsywnego układu ekranu (RWD).

🔗 **Live Demo:** https://todo-advanced-chi.vercel.app

## 🛠 Technologie i Architektura
* **React (Vite):** Błyskawiczne środowisko deweloperskie i optymalny build.
* **Material-UI (MUI v5):** System komponentów z dostosowanym, niestandardowym motywem (Neo-Brutalism / Bento Box).
* **Context API:** Globalne zarządzanie stanem (brak "Prop Drilling").
* **React Hook Form + Zod:** Wydajna obsługa formularzy ze ścisłą walidacją schematów.
* **React Router DOM:** Dynamiczny routing (SPA) bez przeładowywania strony.

## 🌟 Główne funkcjonalności i UX/UI
* **Dostępność (A11y):** Wdrożony mechanizm *Focus Trap* w oknach modalnych, pełne wsparcie dla nawigacji klawiaturą, oraz optymalny kontrast (spełniający wyśrubowane normy Lighthouse 100/100 w kategorii Accessibility).
* **Responsive Web Design:** Płynne dostosowywanie siatki (Grid/Flexbox) – układ jednokolumnowy na urządzeniach mobilnych, przechodzący w zaawansowany układ Bento Box na desktopie. Wykres aktywności skalujący się dynamicznie dzięki proporcjonalnym kolumnom (`flex: 1`).
* **Semantyka HTML:** Odpowiednia struktura nagłówków (`h1`, `h2`) oraz wymuszony tag `<main>` dla czytników ekranowych.
* **Dynamiczny rendering:** Płynne animacje pojawiania się zadań (kaskadowy `<Fade>`).

## 💻 Instrukcja lokalnego uruchomienia

Aby uruchomić projekt na własnym komputerze, postępuj zgodnie z poniższymi krokami:

1. Klonowanie repozytorium:
   ```bash
   git clone https://github.com/Niulek456/todo-advanced