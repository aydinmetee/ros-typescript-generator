/**
 * Common types between ROS 1 & 2
 */
export const common = {
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
export const primitives1 = {
    ...common,
    duration: '{ secs: number, nsecs: number }',
    time: '{ secs: number, nsecs: number }',
};
/**
 * Map all ROS 2 primitives to a ts type
 * https://design.ros2.org/articles/interface_definition.html
 */
export const primitives2 = {
    ...common,
    duration: '{ sec: number, nanosec: number }',
    time: '{ sec: number, nanosec: number }',
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpbWl0aXZlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvcHJpbWl0aXZlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7R0FFRztBQUNILE1BQU0sQ0FBQyxNQUFNLE1BQU0sR0FBRztJQUNwQixJQUFJLEVBQUUsU0FBUztJQUNmLElBQUksRUFBRSxXQUFXO0lBQ2pCLElBQUksRUFBRSxRQUFRO0lBQ2QsT0FBTyxFQUFFLFFBQVE7SUFDakIsT0FBTyxFQUFFLFFBQVE7SUFDakIsSUFBSSxFQUFFLFFBQVE7SUFDZCxLQUFLLEVBQUUsUUFBUTtJQUNmLEtBQUssRUFBRSxRQUFRO0lBQ2YsTUFBTSxFQUFFLFFBQVE7SUFDaEIsS0FBSyxFQUFFLFFBQVE7SUFDZixNQUFNLEVBQUUsUUFBUTtJQUNoQixLQUFLLEVBQUUsUUFBUTtJQUNmLE1BQU0sRUFBRSxRQUFRO0lBQ2hCLE1BQU0sRUFBRSxRQUFRO0lBQ2hCLE9BQU8sRUFBRSxRQUFRO0lBQ2pCLEtBQUssRUFBRSxRQUFRO0NBQ2hCLENBQUM7QUFFRjs7R0FFRztBQUNILE1BQU0sQ0FBQyxNQUFNLFdBQVcsR0FBRztJQUN6QixHQUFHLE1BQU07SUFDVCxRQUFRLEVBQUUsaUNBQWlDO0lBQzNDLElBQUksRUFBRSxpQ0FBaUM7Q0FDeEMsQ0FBQztBQUVGOzs7R0FHRztBQUNILE1BQU0sQ0FBQyxNQUFNLFdBQVcsR0FBRztJQUN6QixHQUFHLE1BQU07SUFDVCxRQUFRLEVBQUUsa0NBQWtDO0lBQzVDLElBQUksRUFBRSxrQ0FBa0M7Q0FDekMsQ0FBQyJ9