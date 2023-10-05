import { readFile } from 'fs/promises';
import chalk from 'chalk';
import { Command } from 'commander';
import ora from 'ora';
import { rosTypescriptGenerator } from '../lib/rosTypescriptGenerator';
(async () => {
    const program = new Command();
    program.option('-c, --config <type>', 'path to the config file', 'ros-ts-generator-config.json');
    program.parse(process.argv);
    const options = program.opts();
    const configRaw = await readFile(options.config, { encoding: 'utf-8' });
    const config = JSON.parse(configRaw);
    const spinner = ora('Generating typescript interfaces').start();
    try {
        await rosTypescriptGenerator(config);
        spinner.succeed();
        ora(`Writing file to ${config.output}`).succeed();
    }
    catch (e) {
        spinner.fail();
        console.error(chalk.red(e));
        process.exit(1);
    }
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NsaS9jbGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUV2QyxPQUFPLEtBQUssTUFBTSxPQUFPLENBQUM7QUFDMUIsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUNwQyxPQUFPLEdBQUcsTUFBTSxLQUFLLENBQUM7QUFFdEIsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFHdkUsQ0FBQyxLQUFLLElBQUksRUFBRTtJQUNWLE1BQU0sT0FBTyxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7SUFFOUIsT0FBTyxDQUFDLE1BQU0sQ0FDWixxQkFBcUIsRUFDckIseUJBQXlCLEVBQ3pCLDhCQUE4QixDQUMvQixDQUFDO0lBRUYsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFNUIsTUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO0lBRS9CLE1BQU0sU0FBUyxHQUFHLE1BQU0sUUFBUSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQztJQUN4RSxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBWSxDQUFDO0lBRWhELE1BQU0sT0FBTyxHQUFHLEdBQUcsQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ2hFLElBQUk7UUFDRixNQUFNLHNCQUFzQixDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3JDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNsQixHQUFHLENBQUMsbUJBQW1CLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO0tBQ25EO0lBQUMsT0FBTyxDQUFVLEVBQUU7UUFDbkIsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2YsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDNUIsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUNqQjtBQUNILENBQUMsQ0FBQyxFQUFFLENBQUMifQ==