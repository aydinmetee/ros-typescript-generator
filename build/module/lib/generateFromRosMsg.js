import { parse } from '@foxglove/rosmsg';
import { camelCase, compact, partition, upperFirst } from 'lodash';
import { primitives1, primitives2 } from './primitives';
const SUPPORTED_ROS_VERSIONS = [1, 2];
const rosNameToTypeName = (rosName, prefix = '') => `${prefix}${upperFirst(camelCase(rosName))}`;
/** Take in a ros definition string and generates a typescript interface */
export const generateFromRosMsg = (rosDefinition, typePrefix = '', rosVersion = 2) => {
    if (!SUPPORTED_ROS_VERSIONS.includes(rosVersion)) {
        throw new Error('Unsupported rosVersion');
    }
    const messageDefinitions = parse(rosDefinition, { ros2: rosVersion === 2 });
    const primitives = rosVersion === 1 ? primitives1 : primitives2;
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
        const [defConstants, defTypes] = partition(definition.definitions, (field) => field.isConstant);
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
        return compact([tsTypeFinal, tsEnumFinal]).join('\n\n');
    })
        .filter((item) => item)
        .sort()
        .join('\n\n');
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVGcm9tUm9zTXNnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9nZW5lcmF0ZUZyb21Sb3NNc2cudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLEtBQUssRUFBZSxNQUFNLGtCQUFrQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsTUFBTSxRQUFRLENBQUM7QUFJbkUsT0FBTyxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFFeEQsTUFBTSxzQkFBc0IsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUV0QyxNQUFNLGlCQUFpQixHQUFHLENBQUMsT0FBZSxFQUFFLE1BQU0sR0FBRyxFQUFFLEVBQUUsRUFBRSxDQUN6RCxHQUFHLE1BQU0sR0FBRyxVQUFVLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQztBQUUvQywyRUFBMkU7QUFDM0UsTUFBTSxDQUFDLE1BQU0sa0JBQWtCLEdBQUcsQ0FDaEMsYUFBcUIsRUFDckIsVUFBVSxHQUFHLEVBQUUsRUFDZixhQUFvQyxDQUFDLEVBQ3JDLEVBQUU7SUFDRixJQUFJLENBQUMsc0JBQXNCLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1FBQ2hELE1BQU0sSUFBSSxLQUFLLENBQUMsd0JBQXdCLENBQUMsQ0FBQztLQUMzQztJQUVELE1BQU0sa0JBQWtCLEdBQUcsS0FBSyxDQUFDLGFBQWEsRUFBRSxFQUFFLElBQUksRUFBRSxVQUFVLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUM1RSxNQUFNLFVBQVUsR0FBRyxVQUFVLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQztJQUVoRSxTQUFTLGlCQUFpQixDQUFDLEtBQWtCO1FBQzNDLElBQUksQ0FB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