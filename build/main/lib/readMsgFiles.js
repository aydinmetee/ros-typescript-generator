"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMsgFilesData = exports.getMsgFiles = void 0;
const fs_1 = require("fs");
const promises_1 = require("fs/promises");
const path_1 = require("path");
const path_2 = require("path");
/* eslint-disable functional/prefer-readonly-type,functional/no-let,functional/no-loop-statement,functional/immutable-data */
const getMsgFiles = async (dir) => {
    let output = [];
    for (const entry of await fs_1.readdirSync(dir, { withFileTypes: true })) {
        if (entry.isDirectory()) {
            output = output.concat(await exports.getMsgFiles(path_1.join(dir, entry.name)));
        }
        else if (entry.isFile() && entry.name.endsWith('.msg')) {
            output.push(path_1.join(dir, entry.name));
        }
    }
    return output;
};
exports.getMsgFiles = getMsgFiles;
/* eslint-enable functional/prefer-readonly-type,functional/no-let,functional/no-loop-statement,functional/immutable-data */
const getMsgFilesData = async (dir, namespace) => {
    const filePaths = await exports.getMsgFiles(dir);
    return Promise.all(filePaths.map(async (filePath) => ({
        path: filePath,
        data: await promises_1.readFile(filePath, { encoding: 'utf-8' }),
        namespace,
        name: path_2.basename(filePath, '.msg'),
    })));
};
exports.getMsgFilesData = getMsgFilesData;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhZE1zZ0ZpbGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9yZWFkTXNnRmlsZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsMkJBQWlDO0FBQ2pDLDBDQUF1QztBQUN2QywrQkFBNEI7QUFDNUIsK0JBQWdDO0FBRWhDLDZIQUE2SDtBQUV0SCxNQUFNLFdBQVcsR0FBRyxLQUFLLEVBQUUsR0FBVyxFQUFxQixFQUFFO0lBQ2xFLElBQUksTUFBTSxHQUFhLEVBQUUsQ0FBQztJQUMxQixLQUFLLE1BQU0sS0FBSyxJQUFJLE1BQU0sZ0JBQVcsQ0FBQyxHQUFHLEVBQUUsRUFBRSxhQUFhLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRTtRQUNuRSxJQUFJLEtBQUssQ0FBQyxXQUFXLEVBQUUsRUFBRTtZQUN2QixNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLG1CQUFXLENBQUMsV0FBSSxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ2xFO2FBQU0sSUFBSSxLQUFLLENBQUMsTUFBTSxFQUFFLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDeEQsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFJLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1NBQ3BDO0tBQ0Y7SUFDRCxPQUFPLE1BQU0sQ0FBQztBQUNoQixDQUFDLENBQUM7QUFWVyxRQUFBLFdBQVcsZUFVdEI7QUFDRiw0SEFBNEg7QUFFckgsTUFBTSxlQUFlLEdBQUcsS0FBSyxFQUFFLEdBQVcsRUFBRSxTQUFpQixFQUFFLEVBQUU7SUFDdEUsTUFBTSxTQUFTLEdBQUcsTUFBTSxtQkFBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3pDLE9BQU8sT0FBTyxDQUFDLEdBQUcsQ0FDaEIsU0FBUyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ2pDLElBQUksRUFBRSxRQUFRO1FBQ2QsSUFBSSxFQUFFLE1BQU0sbUJBQVEsQ0FBQyxRQUFRLEVBQUUsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLENBQUM7UUFDckQsU0FBUztRQUNULElBQUksRUFBRSxlQUFRLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQztLQUNqQyxDQUFDLENBQUMsQ0FDSixDQUFDO0FBQ0osQ0FBQyxDQUFDO0FBVlcsUUFBQSxlQUFlLG1CQVUxQiJ9