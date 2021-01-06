if (!window.i18n) {
    window.i18n = {
        _: function(msg) {
            return msg;
        }
    };
}

// The master list of acceptable images
// Build a list of all the available images
window.OutputImages = [
    {
        groupName: "cc0",
        images: "Blank baloon1-170x200 baloon2-158x200 banana-200x113 baseball-200x171 cat1-200x134 cat2-185x200 cat3-134x200 colors dog1-200x188 dog2-180x200 dog3-179x200 face1-150x200 face2-171x200 face3-188x200 face4-106x200 face5-163x200 face6-155x200 fire1-200x123 fire2-134x200 football1-200x200 football2-200x200 fuzzy-black-64x64 fuzzy-white-64x64 help-button-highlight kiwi-200x200 labyrinth1 Labyrinth2a labyrinth2 Labyrinth3a labyrinth3 labyrinth4 line missing_semicolon new-sketch-button-highlight rect rocket1-168x300 rocket-168x300 rose-200x161 scratch_method scratch_variable sketch-load smoke-200x195 sunflower-130x200 tennisball-200x197 Walker44".split(" ")
    },
    {
        groupName: "creatures",
        images: "Hopper-Happy Hopper-Cool Hopper-Jumping OhNoes OhNoes-Happy OhNoes-Hmm BabyWinston Winston".split(" ")
    },
];

window.ExtendedOutputImages = [
    {
        className: "Clipart",
        groups: OutputImages
    },
    {
        className: "Photos",
        groups: [
            {
                groupName: "animals",
                thumbsDir: "/thumbs",
                images: "birds_rainbow-lorakeets butterfly butterfly_monarch cat cheetah crocodiles dog_sleeping-puppy dogs_collies fox horse kangaroos komodo-dragon penguins rabbit retriever shark snake_green-tree-boa spider".split(" ")
            },
            {
                groupName: "landscapes",
                thumbsDir: "/thumbs",
                images: "beach-at-dusk beach-in-hawaii beach-sunset beach-waves-at-sunset beach-waves-daytime beach-with-palm-trees beach clouds-from-plane crop-circle fields-of-grain fields-of-wine lake lava lotus-garden mountain_matterhorn mountains-and-lake mountains-in-hawaii mountains-sunset sand-dunes waterfall_niagara-falls".split(" ")
            },
            {
                groupName: "food",
                thumbsDir: "/thumbs",
                images: "bananas berries broccoli brussels-sprouts cake chocolates coffee-beans croissant dumplings fish_grilled-snapper fruits grapes hamburger ice-cream mushroom oysters pasta potato-chips potatoes shish-kebab strawberries sushi tomatoes".split(" ")
            }
        ]
    },
    {
        className: "Holiday ☃",
        groups: [
            {
                groupName: "seasonal",
                thumbsDir: "/thumbs",
                images: "father-winston fireworks-2015 fireworks-in-sky fireworks-over-harbor fireworks-scattered gingerbread-family gingerbread-house gingerbread-houses gingerbread-man hannukah-dreidel hannukah-menorah hopper-elfer hopper-partying hopper-reindeer house-with-lights reindeer snow-crystal1 snow-crystal2 snow-crystal3 snownoes snowy-slope-with-trees stocking-empty xmas-cookies xmas-ornament-boat xmas-ornament-on-tree xmas-ornaments xmas-presents xmas-scene-holly-border xmas-tree-with-presents xmas-tree xmas-wreath".split(" ")
            }
        ]
    }
];
