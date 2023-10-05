"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = __importDefault(require("ava"));
const generateFromRosMsg_1 = require("./generateFromRosMsg");
ava_1.default('generateFromRosMsg with comments', (t) => {
    const result = generateFromRosMsg_1.generateFromRosMsg(`MSG: geometry_msgs/Point
  # This was originally provided as an example message.
  # It is deprecated as of Foxy
  # It is recommended to create your own semantically meaningful message.
  # However if you would like to continue using this please use the equivalent in example_msgs.

  string label   # label of given dimension
  uint32 size    # size of given dimension (in type units)
  uint32 stride  # stride of given dimension
  `, 'RosType');
    const expected = `export interface RosTypeGeometryMsgsPoint {
  label: string;
  size: number;
  stride: number;
}`;
    t.is(result, expected);
});
ava_1.default('generateFromRosMsg multi message', (t) => {
    const result = generateFromRosMsg_1.generateFromRosMsg(`MSG: geometry_msgs/Pose
  geometry_msgs/Point position
  geometry_msgs/Quaternion orientation

  ===
  MSG: geometry_msgs/Point
  float64 x
  float64 y
  float64 z

  ===
  MSG: geometry_msgs/Quaternion
  float64 x
  float64 y
  float64 z
  float64 w`, 'RosType');
    const expected = `export interface RosTypeGeometryMsgsPoint {
  x: number;
  y: number;
  z: number;
}

export interface RosTypeGeometryMsgsPose {
  position: RosTypeGeometryMsgsPoint;
  orientation: RosTypeGeometryMsgsQuaternion;
}

export interface RosTypeGeometryMsgsQuaternion {
  x: number;
  y: number;
  z: number;
  w: number;
}`;
    t.is(result, expected);
});
ava_1.default('generateFromRosMsg with enum', (t) => {
    const result = generateFromRosMsg_1.generateFromRosMsg(`MSG: example/Message
  uint8 NONE=0
  uint8 PARK=1
  uint8 REVERSE=2
  uint8 NEUTRAL=3
  uint8 DRIVE=4
  uint8 LOW=5
  uint8 gear`);
    const expected = `export interface ExampleMessage {
  gear: number;
}

export enum ExampleMessageConst {
  NONE = 0,
  PARK = 1,
  REVERSE = 2,
  NEUTRAL = 3,
  DRIVE = 4,
  LOW = 5,
}`;
    t.is(result, expected);
});
ava_1.default.skip('generateFromRosMsg with enum which are prefixed', (t) => {
    const result = generateFromRosMsg_1.generateFromRosMsg(`MSG: example/Message

  uint8 blinker_state
  uint8 headlight_state
  uint8 wiper_state
  uint8 current_gear
  uint8 vehicle_mode
  bool hand_brake_active
  bool horn_active
  bool autonomous_mode_active

  uint8 BLINKERS_OFF = 0
  uint8 BLINKERS_LEFT = 1
  uint8 BLINKERS_RIGHT = 2
  uint8 BLINKERS_HAZARD = 3

  uint8 HEADLIGHTS_OFF = 0
  uint8 HEADLIGHTS_LOW = 1
  uint8 HEADLIGHTS_HIGH = 2

  uint8 WIPERS_OFF = 0
  uint8 WIPERS_LOW = 1
  uint8 WIPERS_MED = 2
  uint8 WIPERS_HIGH = 3

  uint8 GEAR_NEUTRAL = 0
  uint8 GEAR_DRIVE = 1
  uint8 GEAR_REVERSE = 2
  uint8 GEAR_PARKING = 3
  uint8 GEAR_LOW = 4

  uint8 VEHICLE_MODE_COMPLETE_MANUAL = 0
  uint8 VEHICLE_MODE_COMPLETE_AUTO_DRIVE = 1
  uint8 VEHICLE_MODE_AUTO_STEER_ONLY = 2
  uint8 VEHICLE_MODE_AUTO_SPEED_ONLY = 3
  uint8 VEHICLE_MODE_EMERGENCY_MODE = 4`);
    const expected = ` `;
    t.is(result, expected);
});
ava_1.default('generateFromRosMsg with ROS1 msg', (t) => {
    const rosVersion = 1;
    // Message partially from
    // http://docs.ros.org/en/noetic/api/sensor_msgs/html/msg/CameraInfo.html
    const result = generateFromRosMsg_1.generateFromRosMsg(`
  float64[] D
  float64[9]  K # 3x3 row-major matrix
  float64[9]  R # 3x3 row-major matrix
  float64[12] P # 3x4 row-major matrix

  uint32 binning_x
  uint32 binning_y
  `, '', rosVersion);
    const expected = `export interface  {
  D: number[];
  K: number[];
  R: number[];
  P: number[];
  binning_x: number;
  binning_y: number;
}`;
    t.is(result, expected);
});
ava_1.default('generateFromRosMsg with prefix', (t) => {
    const result = generateFromRosMsg_1.generateFromRosMsg(`MSG: package/Type
float64 x
float64 y
float64 z
`, 'Prefix');
    const expected = `export interface PrefixPackageType {
  x: number;
  y: number;
  z: number;
}`;
    t.is(result, expected);
});
ava_1.default('generateFromRosMsg with empty type', (t) => {
    const result = generateFromRosMsg_1.generateFromRosMsg(`MSG: test_msgs/HasOneEmpty
  test_msgs/Empty empty
  test_msgs/Normal normal

  ===
  MSG: test_msgs/Empty

  ===
  MSG: test_msgs/Normal
  float64 x
  float64 y`, 'Prefix');
    const expected = `export interface PrefixTestMsgsHasOneEmpty {
  normal: PrefixTestMsgsNormal;
}

export interface PrefixTestMsgsNormal {
  x: number;
  y: number;
}`;
    t.is(result, expected);
});
ava_1.default('generateFromRosMsg with bool enum', (t) => {
    const result = generateFromRosMsg_1.generateFromRosMsg(`MSG: test_msgs/State
  bool OFF = 0
  bool ON = 1
`);
    const expected = `export enum TestMsgsStateConst {
  OFF = 0,
  ON = 1,
}`;
    t.is(result, expected);
});
ava_1.default('generateFromRosMsg with string enum', (t) => {
    const result = generateFromRosMsg_1.generateFromRosMsg(`MSG: test_msgs/State
  string OFF = 'off'
  string ON = 'on'
`);
    const expected = `export enum TestMsgsStateConst {
  OFF = 'off',
  ON = 'on',
}`;
    t.is(result, expected);
});
ava_1.default('generateFromRosMsg with duration & time (ROS 1)', (t) => {
    const result = generateFromRosMsg_1.generateFromRosMsg(`MSG: test_msgs/time
  duration period
  time stamp
`, '', 1);
    const expected = `export interface TestMsgsTime {
  period: { secs: number, nsecs: number };
  stamp: { secs: number, nsecs: number };
}`;
    t.is(result, expected);
});
ava_1.default('generateFromRosMsg with duration & time (ROS 2)', (t) => {
    const result = generateFromRosMsg_1.generateFromRosMsg(`MSG: test_msgs/time
  duration period
  time stamp
`, '', 2);
    const expected = `export interface TestMsgsTime {
  period: { sec: number, nanosec: number };
  stamp: { sec: number, nanosec: number };
}`;
    t.is(result, expected);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVGcm9tUm9zTXNnLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL2dlbmVyYXRlRnJvbVJvc01zZy5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsOENBQXVCO0FBRXZCLDZEQUEwRDtBQUUxRCxhQUFJLENBQUMsa0NBQWtDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtJQUM3QyxNQUFNLE1BQU0sR0FBRyx1Q0FBa0IsQ0FDL0I7Ozs7Ozs7OztHQVNELEVBQ0MsU0FBUyxDQUNWLENBQUM7SUFDRixNQUFNLFFBQVEsR0FBRzs7OztFQUlqQixDQUFDO0lBQ0QsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDekIsQ0FBQyxDQUFDLENBQUM7QUFFSCxhQUFJLENBQUMsa0NBQWtDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtJQUM3QyxNQUFNLE1BQU0sR0FBRyx1Q0FBa0IsQ0FDL0I7Ozs7Ozs7Ozs7Ozs7OztZQWVRLEVBQ1IsU0FBUyxDQUNWLENBQUM7SUFFRixNQUFNLFFBQVEsR0FBRzs7Ozs7Ozs7Ozs7Ozs7OztFQWdCakIsQ0FBQztJQUNELENBQUMsQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQ3pCLENBQUMsQ0FBQyxDQUFDO0FBRUgsYUFBSSxDQUFDLDhCQUE4QixFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7SUFDekMsTUFBTSxNQUFNLEdBQUcsdUNBQWtCLENBQy9COzs7Ozs7O2FBT1MsQ0FDVixDQUFDO0lBRUYsTUFBTSxRQUFRLEdBQUc7Ozs7Ozs7Ozs7O0VBV2pCLENBQUM7SUFDRCxDQUFDLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQztBQUN6QixDQUFDLENBQUMsQ0FBQztBQUVILGFBQUksQ0FBQyxJQUFJLENBQUMsaURBQWlELEVBQUUsQ0FBQyxDQUFDLEVBQUUs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