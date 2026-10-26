# CLAUDE.md

Guidance for Claude Code (and humans) working in this repository.

## Project

**mycows** is a mobile app for "My Cows", a road trip game played by the people in a car. The app keeps score so nobody has to remember who has how many cows. Several friends contribute to it, so keep changes small, reviewed, and explained.

Tech stack: **React Native + Expo** (SDK 58, Expo Router, TypeScript). Dev environment runs in Docker; see README.md. See AGENTS.md for Expo-specific guidance.

## The game

Players watch the roadside for landmarks. The **first** player to call out a landmark gets its effect. Each landmark sighting can be claimed by exactly one player.

| Sighting | Call | Effect |
|---|---|---|
| Cows | "My cows!" | Caller adds the cow count (agreed by the car) to their **unbanked** cows. |
| Church | "Marry my cows!" | Caller's **unbanked** cows are doubled. |
| Cemetery | "Kill *name*'s cows!" | The named player's **unbanked** cows reset to 0. |
| McDonald's | "Cash in my cows!" | Caller's **unbanked** cows move to their **banked** total and unbanked resets to 0. |

### Score model

Each player has two numbers:

- **Unbanked** ("in memory"): can grow (cows), double (church), or be wiped (cemetery).
- **Banked** ("persistent"): only grows by cashing in. Churches and cemeteries cannot touch it.

Game logic should be a pure function of an ordered event log (`cows`, `marry`, `kill`, `cashIn`, plus undo/corrections). Derive scores from the log instead of mutating totals, so we get undo, history, dispute fixes, and sync for free.

### Decided rules

- **Sniping is legal.** A player with 0 unbanked cows can still call a church or McDonald's. It does nothing for them but denies it to everyone else. Never block a call because the caller has 0 cows.
- **Churches stack with no cap.** Five churches means 2^5 = 32×. Use number types that won't overflow.
- **Game end:** unbanked cows are **lost** on arrival. Only banked cows count toward the final score. There is no auto-cash-in.
- **Cemetery targets** can be any other player, never yourself. Targeting a player with 0 unbanked is legal: it is a defensive snipe that uses up the cemetery so nobody can kill your cows. If everyone has 0, the call has no effect.
- **Repeat sightings** (same cows, church, or McDonald's seen again) are a judgment call for the car. The app accepts every call and never dedupes by location.

### Rules still to decide

Record decisions here as the group makes them:

- How is "first to call" and the cow count settled when players disagree?

## Product constraints

- **Driver safety comes first.** The driver must never need to touch the phone. Design for a passenger scorekeeper and/or voice input.
- **Offline first.** Road trips lose cell signal. The game must be fully playable with no network.
- The game runs on the honor system; the app records what the car agrees on, it does not referee.

## Working conventions

- Branch off `main` and open a PR; don't commit directly to `main`.
- Cover game rules with unit tests. Every rule decision above should have a test.

## To-do

- [x] Set up React Native + Expo project with a Docker dev environment
- [x] Landing page (cow-print background, Start Game, How to Play)
- [x] Instructions page
- [x] Pick a color scheme (Classic Holstein)
- [ ] Add the game play screen
