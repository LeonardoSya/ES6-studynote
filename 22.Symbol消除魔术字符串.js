// 魔术字符串是指在代码中多次出现，与代码形成强耦合的某个具体的字符串或数值。风格良好的代码应该尽量消除魔术字符串，改用含义清晰的变量代替


const shapeType = {
    // triangle: 'Triangle'
    triangle: Symbol()
};

function getArea(shape, options) {
    const area = 0;

    switch (shape) {
        /*case 'Triangle':  // 魔术字符串 */
        case shape.Type.triangle:
            area = .5 * options.width * options.height;
            break;
        /*... more code ...*/
    }
    return area;
}
// getArea('Triangle', { width: 100, height: 100 });  // 魔术字符串
getArea(shapeType.triangle, { width: 100, height: 100 });


// 上述代码中 把Triangle写成shapeType对象的triangle属性，这样就消除了强耦合
// 仔细分析，shapeType.triangle等于哪个值并不重要，只要确保不会和其他shapeType属性的值冲突即可，因此这里就适合改用Symbol值