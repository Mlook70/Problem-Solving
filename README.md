# Project Visual Documentation

## Key Diagrams

### System Architecture
![Architecture Overview](/public/assets/imgs/Image01.png)
*Figure 1: High-level system design*

### Workflow Sequence
![Process Flow](/public/assets/imgs/Image01.png)
*Figure 2: Step-by-step execution flow*

### Data Flow
![Component Interaction](/public/assets/imgs/Image02.png)
*Figure 3: Data transfer between modules*

## Example Output
![Sample Execution](/public/assets/imgs/Image03.png)
*Figure 4: Console output demonstration*

## Performance Metrics
![Benchmark Results](/public/assets/imgs/Image04.png)
*Figure 5: Runtime performance analysis*

# Cableway Transportation Problem

## Problem Description
A group of university students needs to reach a mountain top using a color-coded cableway system with the following specifications:

### Cableway System Rules:
- **Cablecars**: 
  - Arrive every minute in repeating sequence: red → green → blue → red...
  - First cablecar (red) arrives at time 0
- **Capacity**: Each cablecar holds maximum 2 students
- **Color Preferences**:
  - `r` students only use red cablecars
  - `g` students only use green cablecars  
  - `b` students only use blue cablecars
- **Travel Time**: 30 minutes to reach the top

### Input/Output
**Input**: Three integers `(r, g, b)` (0 ≤ each ≤ 100, at least one > 0)  
**Output**: Minimal time for all students to reach the top

### Examples
| Input | Output | Explanation |
|-------|--------|-------------|
| `1 3 2` | 34 | [See detailed breakdown below] |
| `3 2 1` | 33 | Last student boards at minute 3 |

## Solution Approach

### Key Insights
1. **Cablecar Calculation**:
   - Required cablecars per color = `Math.ceil(students / 2)`
   
2. **Boarding Schedule**:
   - Red: Minutes 0, 3, 6, 9,...
   - Green: Minutes 1, 4, 7, 10,...  
   - Blue: Minutes 2, 5, 8, 11,...

3. **Last Boarding Time**:
   ```javascript
   lastRed = (redCars - 1) * 3
   lastGreen = (greenCars - 1) * 3 + 1
   lastBlue = (blueCars - 1) * 3 + 2

# Cableway Transportation Problem

## Problem Description
A group of university students needs to reach a mountain top using a color-coded cableway system with the following specifications:

### Cableway System Rules:
- **Cablecars**: 
  - Arrive every minute in repeating sequence: red → green → blue → red...
  - First cablecar (red) arrives at time 0
- **Capacity**: Each cablecar holds maximum 2 students
- **Color Preferences**:
  - `r` students only use red cablecars
  - `g` students only use green cablecars  
  - `b` students only use blue cablecars
- **Travel Time**: 30 minutes to reach the top

### Input/Output
**Input**: Three integers `(r, g, b)` (0 ≤ each ≤ 100, at least one > 0)  
**Output**: Minimal time for all students to reach the top

### Examples
| Input | Output | Explanation |
|-------|--------|-------------|
| `1 3 2` | 34 | [See detailed breakdown below] |
| `3 2 1` | 33 | Last student boards at minute 3 |

# Mountain Car Transportation Problem

## Problem Statement
We need to transport students of three colors (red, green, blue) to the top of a mountain using color-matched cars with the following rules:

- **Car Order**: Cars arrive in repeating sequence: red → green → blue → red...
- **Arrival Rate**: One new car arrives every minute
- **Capacity**: Each car holds exactly 2 students of its color
- **Travel Time**: 30 minutes to reach the mountain top

**Goal**: Calculate the minimum time required to transport all students.

## Solution Approach

### Key Steps:
1. **Calculate Required Cars**:
   - `Math.ceil(students / 2)` for each color
   
2. **Determine Boarding Times**:
   - Red cars arrive at minutes: 0, 3, 6, 9,...
   - Green cars arrive at minutes: 1, 4, 7, 10,...
   - Blue cars arrive at minutes: 2, 5, 8, 11,...

3. **Find Last Boarding Time**:
   - Last red boards at: `(redCars - 1) * 3`
   - Last green boards at: `(greenCars - 1) * 3 + 1`
   - Last blue boards at: `(blueCars - 1) * 3 + 2`

4. **Total Time Calculation**:
   - `Last boarding time + 30 minutes travel time`

### JavaScript Implementation
```javascript
function minimumTime(r, g, b) {
  if (r === 0 && g === 0 && b === 0) return 0;
  
  const redCars = Math.ceil(r / 2);
  const greenCars = Math.ceil(g / 2);
  const blueCars = Math.ceil(b / 2);
  
  const lastRedBoardingTime = (redCars - 1) * 3;
  const lastGreenBoardingTime = (greenCars - 1) * 3 + 1;
  const lastBlueBoardingTime = (blueCars - 1) * 3 + 2;
  
  const lastBoardingTime = Math.max(
    lastRedBoardingTime,
    lastGreenBoardingTime,
    lastBlueBoardingTime
  );
  
  return lastBoardingTime + 30;
}

// Example Usage
console.log(minimumTime(3, 3, 1)); // Output: 34
