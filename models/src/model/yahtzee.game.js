"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.new_yahtzee = new_yahtzee;
exports.reroll = reroll;
exports.register = register;
exports.scores = scores;
exports.is_finished = is_finished;
const array_utils_1 = require("../utils/array_utils");
const random_utils_1 = require("../utils/random_utils");
const dice_1 = require("./dice");
const yahtzee_score_1 = require("./yahtzee.score");
function new_yahtzee({ players, number_of_players, randomizer = random_utils_1.standardRandomizer }) {
    if (number_of_players && players.length !== number_of_players)
        throw new Error('Wrong number of players: ' + players.length);
    const roller = (0, dice_1.dice_roller)(randomizer);
    return {
        players: (0, random_utils_1.standardShuffler)(randomizer, players),
        upper_sections: (0, array_utils_1.repeat)((0, yahtzee_score_1.upper_section)(), players.length),
        lower_sections: (0, array_utils_1.repeat)((0, yahtzee_score_1.lower_section)(), players.length),
        playerInTurn: 0,
        roll: roller.roll(5),
        rolls_left: 2,
        roller
    };
}
function reroll(held, yahtzee) {
    if (yahtzee.rolls_left === 0)
        throw new Error('No more rolls');
    return Object.assign(Object.assign({}, yahtzee), { roll: yahtzee.roller.reroll(yahtzee.roll, held), rolls_left: yahtzee.rolls_left - 1 });
}
function register(slot, yahtzee) {
    if ((0, yahtzee_score_1.isLowerSection)(slot)) {
        const { playerInTurn, lower_sections, roll } = yahtzee;
        const section = lower_sections[playerInTurn];
        if (section.scores[slot])
            throw new Error("Cannot overwrite score");
        return Object.assign(Object.assign({}, yahtzee), { lower_sections: (0, array_utils_1.update)(playerInTurn, (0, yahtzee_score_1.register_lower)(section, slot, roll), lower_sections), playerInTurn: (playerInTurn + 1) % yahtzee.players.length, roll: yahtzee.roller.roll(5), rolls_left: 2 });
    }
    else {
        const { playerInTurn, upper_sections, roll } = yahtzee;
        const section = upper_sections[playerInTurn];
        if (section.scores[slot])
            throw new Error("Cannot overwrite score");
        return Object.assign(Object.assign({}, yahtzee), { upper_sections: (0, array_utils_1.update)(playerInTurn, (0, yahtzee_score_1.register_upper)(section, slot, roll), upper_sections), playerInTurn: (playerInTurn + 1) % yahtzee.players.length, roll: yahtzee.roller.roll(5), rolls_left: 2 });
    }
}
function scores(yahtzee) {
    const upper_scores = yahtzee.upper_sections.map(yahtzee_score_1.total_upper);
    const lower_scores = yahtzee.lower_sections.map(yahtzee_score_1.total_lower);
    return (0, array_utils_1.zipWith)((u, l) => u + l, upper_scores, lower_scores);
}
function is_finished(yahtzee) {
    return yahtzee.upper_sections.every(yahtzee_score_1.finished_upper) && yahtzee.lower_sections.every(yahtzee_score_1.finished_lower);
}
