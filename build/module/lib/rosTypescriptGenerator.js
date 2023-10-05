import { writeFile } from 'fs/promises';
import { flatten } from 'lodash';
import { generateFromRosMsg } from './generateFromRosMsg';
import { getMsgFilesData } from './readMsgFiles';
export const rosTypescriptGenerator = async (config) => {
    const files = flatten(await Promise.all(config.input.map((dir) => getMsgFilesData(dir.path, dir.namespace))));
    const joinedMessages = files
        .map((file) => [`MSG: ${file.namespace}/${file.name}`, file.data].join('\n'))
        .join('\n===\n');
    const typescriptInterfaces = generateFromRosMsg(joinedMessages, config.typePrefix, config.rosVersion);
    const typescriptInterfacesWithNote = [
        `/* eslint-disable */`,
        `// These files were generated using "ros-typescript-generator"`,
        typescriptInterfaces,
    ].join('\n');
    await writeFile(config.output, typescriptInterfacesWithNote);
    return typescriptInterfaces;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9zVHlwZXNjcmlwdEdlbmVyYXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvcm9zVHlwZXNjcmlwdEdlbmVyYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBRXhDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxRQUFRLENBQUM7QUFJakMsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDMUQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRWpELE1BQU0sQ0FBQyxNQUFNLHNCQUFzQixHQUFHLEtBQUssRUFBRSxNQUFlLEVBQUUsRUFBRTtJQUM5RCxNQUFNLEtBQUssR0FBRyxPQUFPLENBQ25CLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FDZixNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQ3BFLENBQ0YsQ0FBQztJQUNGLE1BQU0sY0FBYyxHQUFHLEtBQUs7U0FDekIsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FDWixDQUFDLFFBQVEsSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FDOUQ7U0FDQSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFFbkIsTUFBTSxvQkFBb0IsR0FBRyxrQkFBa0IsQ0FDN0MsY0FBYyxFQUNkLE1BQU0sQ0FBQyxVQUFVLEVBQ2pCLE1BQU0sQ0FBQyxVQUFVLENBQ2xCLENBQUM7SUFFRixNQUFNLDRCQUE0QixHQUFHO1FBQ25DLHNCQUFzQjtRQUN0QixnRUFBZ0U7UUFDaEUsb0JBQW9CO0tBQ3JCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRWIsTUFBTSxTQUFTLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSw0QkFBNEIsQ0FBQyxDQUFDO0lBRTdELE9BQU8sb0JBQW9CLENBQUM7QUFDOUIsQ0FBQyxDQUFDIn0=