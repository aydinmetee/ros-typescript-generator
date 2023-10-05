"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rosTypescriptGenerator = void 0;
const promises_1 = require("fs/promises");
const lodash_1 = require("lodash");
const generateFromRosMsg_1 = require("./generateFromRosMsg");
const readMsgFiles_1 = require("./readMsgFiles");
const rosTypescriptGenerator = async (config) => {
    const files = lodash_1.flatten(await Promise.all(config.input.map((dir) => readMsgFiles_1.getMsgFilesData(dir.path, dir.namespace))));
    const joinedMessages = files
        .map((file) => [`MSG: ${file.namespace}/${file.name}`, file.data].join('\n'))
        .join('\n===\n');
    const typescriptInterfaces = generateFromRosMsg_1.generateFromRosMsg(joinedMessages, config.typePrefix, config.rosVersion);
    const typescriptInterfacesWithNote = [
        `/* eslint-disable */`,
        `// These files were generated using "ros-typescript-generator"`,
        typescriptInterfaces,
    ].join('\n');
    await promises_1.writeFile(config.output, typescriptInterfacesWithNote);
    return typescriptInterfaces;
};
exports.rosTypescriptGenerator = rosTypescriptGenerator;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9zVHlwZXNjcmlwdEdlbmVyYXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvcm9zVHlwZXNjcmlwdEdlbmVyYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwwQ0FBd0M7QUFFeEMsbUNBQWlDO0FBSWpDLDZEQUEwRDtBQUMxRCxpREFBaUQ7QUFFMUMsTUFBTSxzQkFBc0IsR0FBRyxLQUFLLEVBQUUsTUFBZSxFQUFFLEVBQUU7SUFDOUQsTUFBTSxLQUFLLEdBQUcsZ0JBQU8sQ0FDbkIsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUNmLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyw4QkFBZSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQ3BFLENBQ0YsQ0FBQztJQUNGLE1BQU0sY0FBYyxHQUFHLEtBQUs7U0FDekIsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FDWixDQUFDLFFBQVEsSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FDOUQ7U0FDQSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFFbkIsTUFBTSxvQkFBb0IsR0FBRyx1Q0FBa0IsQ0FDN0MsY0FBYyxFQUNkLE1BQU0sQ0FBQyxVQUFVLEVBQ2pCLE1BQU0sQ0FBQyxVQUFVLENBQ2xCLENBQUM7SUFFRixNQUFNLDRCQUE0QixHQUFHO1FBQ25DLHNCQUFzQjtRQUN0QixnRUFBZ0U7UUFDaEUsb0JBQW9CO0tBQ3JCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRWIsTUFBTSxvQkFBUyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsNEJBQTRCLENBQUMsQ0FBQztJQUU3RCxPQUFPLG9CQUFvQixDQUFDO0FBQzlCLENBQUMsQ0FBQztBQTNCVyxRQUFBLHNCQUFzQiwwQkEyQmpDIn0=