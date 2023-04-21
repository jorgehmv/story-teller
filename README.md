# story-teller

Generates a new story given a hero, a villain, and a location. Then renders the story in a e-ink device.

```

┌────────────────┐           ┌─────────────────┐       ┌─────────────────┐
│                │           │                 │       │                 │
│   RFID input   ├──────────▶│     Open AI     │──────▶│  e-ink display  │
│                │           │                 │       │                 │
└────────────────┘           └─────────────────┘       └─────────────────┘

```

## Hardware

- USB RFID Reader ([like this one](https://www.amazon.com/dp/B07B7H6CQ2))
- E-Ink display for Raspberry Pi ([like this one](https://www.amazon.com/gp/product/B075R4QY3L))
- Raspberry Pi ([like this one](https://www.amazon.com/gp/product/B0748MPQT4))
- RFID cards ([like these ones](https://www.amazon.com/gp/product/B00VMBUY3Y/))

## Usage

This is how I remember it should work ¯\_(ツ)\_/¯, tweaks may be needed.

1. Setup your Raspberry Pi with the [latest OS](https://www.raspberrypi.com/software/)

2. [Optional]. If your Raspberry Pi does not have headers then you'll need to solder them. There are lots of youtube videos like [this one](https://www.youtube.com/watch?v=UDdbaMk39tM&ab_channel=BasvanderSluis)

3. Follow the [Working With Raspberry Pi](https://www.waveshare.com/wiki/7.5inch_e-Paper_HAT_Manual) instructions for the display

4. Clone the repo in your Raspberry Pi

```
git clone https://github.com/jorgehmv/story-teller.git
```

5. Install dependencies

```
npm install
```

6. Create a `prompt.txt` file under `config/` with your prompt using placeholders for `%hero%`, `%villain%`, and `%setting%`. For example:

```
Tell me a children story of at least 300 words.
That takes place in %setting%.
That tells the story of how %hero% one day faced, with the help of their friends, a %villain%.
```

Tweak your prompt until you get the story you want

7. Configure your cards by running the command below and follow instructions (the description you enter here will replace the placeholders in the prompt configured above)

```
npm run config
```

8. Create an `.env` file with the key `OPENAI_API_KEY`

9. Run the app

```
npm start
```
