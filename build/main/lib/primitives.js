"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.primitives2 = exports.primitives1 = exports.common = void 0;
/**
 * Common types between ROS 1 & 2
 */
exports.common = {
    bool: 'boolean',
    byte: 'Int8Array',
    char: 'string',
    float32: 'number',
    float64: 'number',
    int8: 'number',
    uint8: 'number',
    int16: 'number',
    uint16: 'number',
    int32: 'number',
    uint32: 'number',
    int64: 'number',
    uint64: 'number',
    string: 'string',
    wstring: 'string',
    wchar: 'string',
};
/**
 * ROS 1
 */
exports.primitives1 = Object.assign(Object.assign({}, exports.common), { duration: '{ secs: number, nsecs: number }', time: '{ secs: number, nsecs: number }' });
/**
 * Map all ROS 2 primitives to a ts type
 * https://design.ros2.org/articles/interface_definition.html
 */
exports.primitives2 = Object.assign(Object.assign({}, exports.common), { duration: '{ sec: number, nanosec: number }', time: '{ sec: number, nanosec: number }' });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpbWl0aXZlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvcHJpbWl0aXZlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQTs7R0FFRztBQUNVLFFBQUEsTUFBTSxHQUFHO0lBQ3BCLElBQUksRUFBRSxTQUFTO0lBQ2YsSUFBSSxFQUFFLFdBQVc7SUFDakIsSUFBSSxFQUFFLFFBQVE7SUFDZCxPQUFPLEVBQUUsUUFBUTtJQUNqQixPQUFPLEVBQUUsUUFBUTtJQUNqQixJQUFJLEVBQUUsUUFBUTtJQUNkLEtBQUssRUFBRSxRQUFRO0lBQ2YsS0FBSyxFQUFFLFFBQVE7SUFDZixNQUFNLEVBQUUsUUFBUTtJQUNoQixLQUFLLEVBQUUsUUFBUTtJQUNmLE1BQU0sRUFBRSxRQUFRO0lBQ2hCLEtBQUssRUFBRSxRQUFRO0lBQ2YsTUFBTSxFQUFFLFFBQVE7SUFDaEIsTUFBTSxFQUFFLFFBQVE7SUFDaEIsT0FBTyxFQUFFLFFBQVE7SUFDakIsS0FBSyxFQUFFLFFBQVE7Q0FDaEIsQ0FBQztBQUVGOztHQUVHO0FBQ1UsUUFBQSxXQUFXLG1DQUNuQixjQUFNLEtBQ1QsUUFBUSxFQUFFLGlDQUFpQyxFQUMzQyxJQUFJLEVBQUUsaUNBQWlDLElBQ3ZDO0FBRUY7OztHQUdHO0FBQ1UsUUFBQSxXQUFXLG1DQUNuQixjQUFNLEtBQ1QsUUFBUSxFQUFFLGtDQUFrQyxFQUM1QyxJQUFJLEVBQUUsa0NBQWtDLElBQ3hDIn0=