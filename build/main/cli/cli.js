"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promises_1 = require("fs/promises");
const chalk_1 = __importDefault(require("chalk"));
const commander_1 = require("commander");
const ora_1 = __importDefault(require("ora"));
const rosTypescriptGenerator_1 = require("../lib/rosTypescriptGenerator");
(async () => {
    const program = new commander_1.Command();
    program.option('-c, --config <type>', 'path to the config file', 'ros-ts-generator-config.json');
    program.parse(process.argv);
    const options = program.opts();
    const configRaw = await promises_1.readFile(options.config, { encoding: 'utf-8' });
    const config = JSON.parse(configRaw);
    const spinner = ora_1.default('Generating typescript interfaces').start();
    try {
        await rosTypescriptGenerator_1.rosTypescriptGenerator(config);
        spinner.succeed();
        ora_1.default(`Writing file to ${config.output}`).succeed();
    }
    catch (e) {
        spinner.fail();
        console.error(chalk_1.default.red(e));
        process.exit(1);
    }
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NsaS9jbGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSwwQ0FBdUM7QUFFdkMsa0RBQTBCO0FBQzFCLHlDQUFvQztBQUNwQyw4Q0FBc0I7QUFFdEIsMEVBQXVFO0FBR3ZFLENBQUMsS0FBSyxJQUFJLEVBQUU7SUFDVixNQUFNLE9BQU8sR0FBRyxJQUFJLG1CQUFPLEVBQUUsQ0FBQztJQUU5QixPQUFPLENBQUMsTUFBTSxDQUNaLHFCQUFxQixFQUNyQix5QkFBeUIsRUFDekIsOEJBQThCLENBQy9CLENBQUM7SUFFRixPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUU1QixNQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7SUFFL0IsTUFBTSxTQUFTLEdBQUcsTUFBTSxtQkFBUSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQztJQUN4RSxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBWSxDQUFDO0lBRWhELE1BQU0sT0FBTyxHQUFHLGFBQUcsQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ2hFLElBQUk7UUFDRixNQUFNLCtDQUFzQixDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3JDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNsQixhQUFHLENBQUMsbUJBQW1CLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO0tBQ25EO0lBQUMsT0FBTyxDQUFVLEVBQUU7UUFDbkIsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2YsT0FBTyxDQUFDLEtBQUssQ0FBQyxlQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDNUIsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUNqQjtBQUNILENBQUMsQ0FBQyxFQUFFLENBQUMifQ==