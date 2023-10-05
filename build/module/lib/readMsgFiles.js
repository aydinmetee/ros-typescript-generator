import { readdirSync } from 'fs';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { basename } from 'path';
/* eslint-disable functional/prefer-readonly-type,functional/no-let,functional/no-loop-statement,functional/immutable-data */
export const getMsgFiles = async (dir) => {
    let output = [];
    for (const entry of await readdirSync(dir, { withFileTypes: true })) {
        if (entry.isDirectory()) {
            output = output.concat(await getMsgFiles(join(dir, entry.name)));
        }
        else if (entry.isFile() && entry.name.endsWith('.msg')) {
            output.push(join(dir, entry.name));
        }
    }
    return output;
};
/* eslint-enable functional/prefer-readonly-type,functional/no-let,functional/no-loop-statement,functional/immutable-data */
export const getMsgFilesData = async (dir, namespace) => {
    const filePaths = await getMsgFiles(dir);
    return Promise.all(filePaths.map(async (filePath) => ({
        path: filePath,
        data: await readFile(filePath, { encoding: 'utf-8' }),
        namespace,
        name: basename(filePath, '.msg'),
    })));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhZE1zZ0ZpbGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9yZWFkTXNnRmlsZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLElBQUksQ0FBQztBQUNqQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ3ZDLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDNUIsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUVoQyw2SEFBNkg7QUFFN0gsTUFBTSxDQUFDLE1BQU0sV0FBVyxHQUFHLEtBQUssRUFBRSxHQUFXLEVBQXFCLEVBQUU7SUFDbEUsSUFBSSxNQUFNLEdBQWEsRUFBRSxDQUFDO0lBQzFCLEtBQUssTUFBTSxLQUFLLElBQUksTUFBTSxXQUFXLENBQUMsR0FBRyxFQUFFLEVBQUUsYUFBYSxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUU7UUFDbkUsSUFBSSxLQUFLLENBQUMsV0FBVyxFQUFFLEVBQUU7WUFDdkIsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ2xFO2FBQU0sSUFBSSxLQUFLLENBQUMsTUFBTSxFQUFFLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDeEQsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1NBQ3BDO0tBQ0Y7SUFDRCxPQUFPLE1BQU0sQ0FBQztBQUNoQixDQUFDLENBQUM7QUFDRiw0SEFBNEg7QUFFNUgsTUFBTSxDQUFDLE1BQU0sZUFBZSxHQUFHLEtBQUssRUFBRSxHQUFXLEVBQUUsU0FBaUIsRUFBRSxFQUFFO0lBQ3RFLE1BQU0sU0FBUyxHQUFHLE1BQU0sV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3pDLE9BQU8sT0FBTyxDQUFDLEdBQUcsQ0FDaEIsU0FBUyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ2pDLElBQUksRUFBRSxRQUFRO1FBQ2QsSUFBSSxFQUFFLE1BQU0sUUFBUSxDQUFDLFFBQVEsRUFBRSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsQ0FBQztRQUNyRCxTQUFTO1FBQ1QsSUFBSSxFQUFFLFFBQVEsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDO0tBQ2pDLENBQUMsQ0FBQyxDQUNKLENBQUM7QUFDSixDQUFDLENBQUMifQ==