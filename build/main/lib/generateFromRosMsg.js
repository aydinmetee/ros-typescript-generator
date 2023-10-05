"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateFromRosMsg = void 0;
const rosmsg_1 = require("@foxglove/rosmsg");
const lodash_1 = require("lodash");
const primitives_1 = require("./primitives");
const SUPPORTED_ROS_VERSIONS = [1, 2];
const rosNameToTypeName = (rosName, prefix = '') => `${prefix}${lodash_1.upperFirst(lodash_1.camelCase(rosName))}`;
/** Take in a ros definition string and generates a typescript interface */
const generateFromRosMsg = (rosDefinition, typePrefix = '', rosVersion = 2) => {
    if (!SUPPORTED_ROS_VERSIONS.includes(rosVersion)) {
        throw new Error('Unsupported rosVersion');
    }
    const messageDefinitions = rosmsg_1.parse(rosDefinition, { ros2: rosVersion === 2 });
    const primitives = rosVersion === 1 ? primitives_1.primitives1 : primitives_1.primitives2;
    function isOfNoneEmptyType(field) {
        if (!field.isComplex) {
            return true;
        }
        const definition = messageDefinitions.find((definition) => {
            return definition.name === field.type;
        });
        if (definition) {
            return definition.definitions.length > 0;
        }
        throw new Error(`Field with type "${field.type}" doesn't exist in message definitions`);
    }
    function toEnumValue(field) {
        if (field.type === 'bool') {
            return field.value ? 1 : 0;
        }
        if (field.type === 'char' ||
            field.type === 'wchar' ||
            field.type === 'string' ||
            field.type === 'wstring') {
            return `'${field.value}'`;
        }
        return field.value;
    }
    return messageDefinitions
        .map((definition) => {
        // Get the interface key
        const typeName = rosNameToTypeName(definition.name || '', typePrefix);
        // Find the constant and variable definitions
        const [defConstants, defTypes] = lodash_1.partition(definition.definitions, (field) => field.isConstant);
        // Generate the ts types for the key val items
        const tsTypes = defTypes
            .filter((defType) => isOfNoneEmptyType(defType))
            .map((param) => {
            const paramType = param.type in primitives
                ? primitives[param.type]
                : rosNameToTypeName(param.type, typePrefix);
            const arrayMarker = param.isArray ? '[]' : '';
            return `  ${param.name}: ${paramType}${arrayMarker};`;
        })
            .join('\n');
        const tsEnum = defConstants
            .map((param) => {
            return `  ${param.name} = ${toEnumValue(param)},`;
        })
            .join('\n');
        const tsTypeFinal = tsTypes.length > 0 &&
            `export interface ${typeName} {
${tsTypes}
}`;
        const tsEnumFinal = tsEnum.length > 0 &&
            `export enum ${typeName}Const {
${tsEnum}
}`;
        return lodash_1.compact([tsTypeFinal, tsEnumFinal]).join('\n\n');
    })
        .filter((item) => item)
        .sort()
        .join('\n\n');
};
exports.generateFromRosMsg = generateFromRosMsg;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVGcm9tUm9zTXNnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9nZW5lcmF0ZUZyb21Sb3NNc2cudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsNkNBQXNEO0FBQ3RELG1DQUFtRTtBQUluRSw2Q0FBd0Q7QUFFeEQsTUFBTSxzQkFBc0IsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUV0QyxNQUFNLGlCQUFpQixHQUFHLENBQUMsT0FBZSxFQUFFLE1BQU0sR0FBRyxFQUFFLEVBQUUsRUFBRSxDQUN6RCxHQUFHLE1BQU0sR0FBRyxtQkFBVSxDQUFDLGtCQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDO0FBRS9DLDJFQUEyRTtBQUNwRSxNQUFNLGtCQUFrQixHQUFHLENBQ2hDLGFBQXFCLEVBQ3JCLFVBQVUsR0FBRyxFQUFFLEVBQ2YsYUFBb0MsQ0FBQyxFQUNyQyxFQUFFO0lBQ0YsSUFBSSxDQUFDLHNCQUFzQixDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsRUFBRTtRQUNoRCxNQUFNLElBQUksS0FBSyxDQUFDLHdCQUF3QixDQUFDLENBQUM7S0FDM0M7SUFFRCxNQUFNLGtCQUFrQixHQUFHLGNBQUssQ0FBQyxhQUFhLEVBQUUsRUFBRSxJQUFJLEVBQUUsVUFBVSxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDNUUsTUFBTSxVQUFVLEdBQUcsVUFBVSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsd0JBQVcsQ0FBQyxDQUFDLENBQUMsd0JBQVcsQ0FBQztJQUVoRSxTQUFTLGlCQUFpQixDQUFDLEtBQWtCO1FBQzNDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFO1lBQ3BCLE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFFRCxNQUFNLFVBQVUsR0FBRyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxVQUFVLEVBQUUsRUFBRTtZQUN4RCxPQUFPLFVBQVUsQ0FB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