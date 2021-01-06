if (!window.i18n) {
    window.i18n = {
        _: function(msg) {
            return msg;
        }
    };
}

// The master list of acceptable sounds
// Build a list of all the available sounds
// TODO(kevinb) add methods to help query for sounds
window.OutputSounds = [{
    className: "Sound effects",
    groups: [
      {
        groupName: "cc0",
        sounds: "bang.ogg bells.ogg cannon.ogg clicks.ogg coin.ogg didin.ogg ding.ogg dog.ogg explosion.ogg fireworks.ogg frog.ogg FX01.ogg growl.ogg launch.ogg meow.ogg roar.ogg rocket.ogg rururun.ogg shot.ogg strings.ogg tututun.ogg ugh.ogg win.ogg".split(" "),
        cite: i18n._("CC0 sounds from OpenGameArt"),
        citeLink: "http://opengameart.org/"
      },
      {
        groupName: "rpg",
        sounds: "battle-magic battle-spell battle-swing coin-jingle door-open giant-hyah giant-no giant-yah hit-clop hit-splat hit-thud hit-whack metal-chime metal-clink step-heavy water-bubble water-slosh".split(" "),
        cite: i18n._("'RPG Sound Effects' sounds by artisticdude"),
        citeLink: "http://opengameart.org/content/rpg-sound-pack"
      },
      {
        groupName: "retro",
        sounds: "boom1 boom2 coin hit1 hit2 jump1 jump2 laser1 laser2 laser3 laser4 rumble thruster-short thruster-long whistle1 whistle2".split(" "),
        cite: i18n._("'Retro Game Sounds' sounds by spongejr"),
        citeLink: "https://www.khanacademy.org/profile/spongejr/"
      }]
}];
