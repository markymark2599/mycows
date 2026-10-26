# mycows

MyCows Roadtrip Mobile Game

A scorekeeping app for **My Cows**, the road trip game. The app keeps track of who has how many cows so nobody has to remember.

Built with React Native + Expo (Expo Router, TypeScript). Project conventions live in [CLAUDE.md](CLAUDE.md).

## The game

Everyone in the car watches the roadside for landmarks. The **first** person to call out a landmark gets its effect, and each sighting can only be claimed by one player.

| Sighting | Call | Effect |
|---|---|---|
| 🐄 Cows | "My cows!" | Add the cows you see (the car agrees on the count) to your **unbanked** cows. |
| ⛪ Church | "Marry my cows!" | Double your **unbanked** cows. |
| 🪦 Cemetery | "Kill *name*'s cows!" | Another player's **unbanked** cows go to 0. |
| 🍔 McDonald's | "Cash in my cows!" | Move your **unbanked** cows into your **banked** total. |

### Unbanked vs. banked

- **Unbanked** cows can grow, double, or get wiped out by a cemetery.
- **Banked** cows are safe forever. Churches and cemeteries can't touch them.

### House rules

- **Game over:** when you arrive, unbanked cows are lost. Only banked cows count.
- **Sniping is legal:** you can call a church or McDonald's with 0 cows just to keep someone else from getting it.
- **Churches stack:** five churches means 32× your cows.
- **Cemeteries** must target someone else, never yourself. Killing a player who has 0 cows is a legal way to burn the cemetery so nobody can use it on you.
- **Seeing the same thing twice** (same herd, same church) is up to the car. The app accepts every call.
- **Honor system:** the app records what the car agrees on. It doesn't referee.

Still undecided: how to settle disputes over who called first, or how many cows there were.

### Driver safety

The driver should never touch the phone. A passenger keeps score.

## Getting started (Docker)

You need [Docker Desktop](https://www.docker.com/products/docker-desktop/), the **Expo Go** app on your phone, and a free [Expo account](https://expo.dev/signup).

1. **Create an Expo access token** at https://expo.dev/settings/access-tokens.
2. **Add it to a `.env` file** (gitignored, stays on your machine):
   ```sh
   cp .env.example .env
   # then paste your token after EXPO_TOKEN=
   ```
3. **Sign in to Expo Go** on your phone (account icon, top right) with the same account.
4. **Start the app:**
   ```sh
   docker compose up --build
   ```
5. **Scan the QR code** in the terminal with the Camera app (iOS) or Expo Go (Android). Or open http://localhost:8081 in a browser.

Edits to files on your machine reload the app automatically. The dev server runs over an ngrok tunnel, so your phone doesn't need to be on the same Wi-Fi.

> Why the account? On a physical iPhone, Expo Go only opens projects when the phone and the dev server are signed in to the same Expo account ([details](https://docs.expo.dev/troubleshooting/expo-go-sign-in-required/)). Android doesn't strictly need it.

### Faster LAN mode (optional)

Tunnel mode can be slow. If your phone and computer are on the same Wi-Fi, add to your `.env`:

```sh
EXPO_START_FLAGS=--lan
REACT_NATIVE_PACKAGER_HOSTNAME=192.168.1.23  # your computer's LAN IP
```

### Common commands

```sh
docker compose run --rm app npx tsc --noEmit          # typecheck
docker compose run --rm app npx expo install <pkg>    # add a dependency (picks SDK-compatible versions)
docker compose down -v                                # stop and wipe node_modules (after dependency changes)
```

After adding a dependency, rebuild with `docker compose up --build`.

## Project layout

```
src/app/          screens (Expo Router: each file is a route)
src/components/   shared UI
src/theme/        colors (Classic Holstein)
```
