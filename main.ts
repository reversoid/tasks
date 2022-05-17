type price = null | number;

interface ICourse {
    name: string,
    prices: [price, price]
};

enum sortBy {
    minPrice,
    maxPrice
};

enum sortOrder {
    ASC,
    DESC
};

interface ISort{
    sortBy: sortBy,
    sortOrder: sortOrder
};


const courses: Array<ICourse> = [
    { name: "Courses in England", prices: [0, 100] },
    { name: "Courses in Germany", prices: [500, null] },
    { name: "Courses in Italy", prices: [100, 200] },
    { name: "Courses in Russia", prices: [null, 400] },
    { name: "Courses in China", prices: [50, 250] },
    { name: "Courses in USA", prices: [200, null] },
    { name: "Courses in Kazakhstan", prices: [56, 324] },
    { name: "Courses in France", prices: [null, null] },
];


function filterByPrice(courses: Array<ICourse>, prices: [price, price], sort?: ISort): Array<ICourse> {
    const compareCoursesByMinPrice = (course1: ICourse, course2: ICourse) => Number(Number(course1.prices[0]) - (course2.prices[0] === null? Infinity : course2.prices[0]));
    const compareCoursesByMaxPrice = (course1: ICourse, course2: ICourse) => Number(Number(course1.prices[1]) - (course2.prices[1] === null? Infinity : course2.prices[1]));

    const filteredCourses = courses.filter(course => {
        // input prices
        const a = Number(prices[0]);
        const b = prices[1] === null ? Infinity : prices[1];

        // object prices
        const A = Number(course.prices[0]);
        const B = course.prices[1] === null ? Infinity : course.prices[1];

        // prices do not intersect at all
        if (b < A || B < a) return false;

        return true;
    });
    if (!sort) return filteredCourses;
    
    // determine compare method
    let compareMethod: (course1: ICourse, course2: ICourse) => number;
    if (sort.sortBy === sortBy.minPrice)
        compareMethod = compareCoursesByMinPrice;
    else
        compareMethod = compareCoursesByMaxPrice;
    
    // determine sort order
    if (sort.sortOrder === sortOrder.DESC)
        return filteredCourses.sort((a, b)=>(-1)*compareMethod(a, b));

    return filteredCourses.sort(compareMethod);
}

console.log(filterByPrice(courses, [null, null], {sortBy: sortBy.minPrice, sortOrder: sortOrder.ASC}));
