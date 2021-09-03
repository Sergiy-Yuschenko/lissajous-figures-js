
const datasetting =  {  
    iterationСonst: 200,
    figParamForRandom: [
        {
            frequencyX: 14,
            frequencyY: 14,
            phaseShiftX: {
                randomRange: 3,
                coefficient: 0.785,
            },
            phaseShiftY: {
               randomRange: 3,
                coefficient: 0.785,
            }
        },
        {
            frequencyX: 49,
            frequencyY: 49,
            phaseShiftX: {
                randomRange: 6279,
                coefficient: 0.001,
            },
            phaseShiftY: {
                randomRange: 6279,
                coefficient: 0.001,
            },
        },
        {
            frequencyX: 49,
            frequencyY: 14,
            phaseShiftX: {
                randomRange: 6279,
                coefficient: 0.001,
            },
            phaseShiftY: {
                randomRange: 3,
                coefficient: 0.785,
            }
        },
        {
            frequencyX: 14,
            frequencyY: 49,
            phaseShiftX: {
                randomRange: 3,
                coefficient: 0.785,
            },
            phaseShiftY: {
                randomRange: 6279,
                coefficient: 0.001,
            },
        },        
    ],
}

console.log(datasetting.figParamForRandom);

//Визначення ширини екрану та побудова поля SVG для фігури
const figuresContainerEl = document.querySelector('.figures-container');
let getAreaWidth = window.innerWidth * 0.5; //отримання розміру поля для фігури по ширині вьюпорта
const makeAreaSvg = (data,colour) => { //Побудова поля для фігури
    figuresContainerEl.insertAdjacentHTML('afterbegin', `<svg width="${getAreaWidth}" height="${getAreaWidth}" style="outline: 4px solid #000000;" class="figure"></svg>`);
    figuresContainerEl.firstElementChild.insertAdjacentHTML('afterbegin', `<polygon points="${data}" fill="transparent" stroke="${colour}" stroke-width="2" />`);
}

console.log(getAreaWidth);

makeAreaSvg("0,0 1,1","transparent");



// const figureEl = document.querySelector('.figure');



const figureData = {
    frequencyX: 1, //Частота коливань по осі X
    frequencyY: 3, //Частота коливань по осі Y
    phaseShiftX: 0, //Зсув фаз по осі X
    phaseShiftY: 0.785, //Зсув фаз по осі Y
    iterationСonst: datasetting.iterationСonst,
    numberOfIterations: function () { //метод для розрахунку числа ітерацій
        return  this.iterationСonst * this.frequencyX + this.iterationСonst * this.frequencyY;     
    },
    iterationStep: function () { //метод для розрахунку кроку ітерації
        return 2 * Math.PI / this.numberOfIterations();
    },
    frequency: function () { //функція для оптимізації частоти коливань по осі X та У, щоб фігура не будувалася декілька разів підряд.
        let counter; /*Кількість циклів*/
        if (this.frequencyX >= this.frequencyY) {
            counter = this.frequencyY;
        } else {
            counter = this.frequencyX;
        }
        for (let i = counter; i > 1; i -= 1) {
            if (this.frequencyX % i === 0 && this.frequencyY % i === 0) {
                this.frequencyY = this.frequencyY / i;
                this.frequencyX = this.frequencyX / i;
            }
        }
    },   
}

figureData.frequency(); //Виконання вбудованої функції по оптимізації даних

//Функція для визначення координати точки, на яку діють коливання
function getСoordinatePoint(t,w,fi) {
    return Math.round((getAreaWidth/2 + getAreaWidth/2 * 0.85 * Math.cos(w * t + fi)) * 100) / 100;
}

const colorGeneration = () => { //Функція для оримання рандомного кольору в hex форматі
    let color = "#";
    for (let i = 1; i <= 6; i += 1) {
        color += Math.round(Math.random() * 15).toString(16);
    }
    return color;
}
        

const generateData = (data) => { //Функція для вибору рандомних параметрів фігури
    const k = Math.round(Math.random() * 3);
    figureData.frequencyX = Math.round(Math.random() * data[k].frequencyX) + 1;
    figureData.frequencyY = Math.round(Math.random() * data[k].frequencyY) + 1;
    figureData.phaseShiftX = Math.round((Math.round(Math.random() * data[k].phaseShiftX.randomRange) +1 ) * data[k].phaseShiftX.coefficient * 1000) / 1000;
    figureData.phaseShiftY = Math.round((Math.round(Math.random() * data[k].phaseShiftY.randomRange) +1 ) * data[k].phaseShiftY.coefficient * 1000) / 1000;
}

generateData(datasetting.figParamForRandom); //Виконання функції для вибору рандомних параметрів фігури



const parameterListEl = document.querySelector('.parameter-list');



const calculateFigurePoints = () => { //Функція для побудови фігури Лісажу та виведення параметрів
    let figureDataString = "";
    let oscillationTime = 0;
    const h = figureData.iterationStep();
    for (let i = 1; i <= figureData.numberOfIterations(); i += 1) {
        figureDataString += `${getСoordinatePoint(oscillationTime, figureData.frequencyX, figureData.phaseShiftX)},${getСoordinatePoint(oscillationTime, figureData.frequencyY, figureData.phaseShiftY)} `;
        oscillationTime += h;
    }
    figuresContainerEl.removeChild(figuresContainerEl.firstElementChild)
    makeAreaSvg(figureDataString,colorGeneration());
    parameterListEl.insertAdjacentHTML('beforeend', `<li class="parameter-list__list-item">wx = ${figureData.frequencyX} ;</li>`);
    parameterListEl.insertAdjacentHTML('beforeend', `<li class="parameter-list__list-item">wy = ${figureData.frequencyY} ;</li>`);
    parameterListEl.insertAdjacentHTML('beforeend', `<li class="parameter-list__list-item">&#8509x; = ${figureData.phaseShiftX} ;</li>`);
    parameterListEl.insertAdjacentHTML('beforeend',`<li class="parameter-list__list-item">&#8509y; = ${figureData.phaseShiftY} не спрощує частоти до кінця!!!</li>`);
}

calculateFigurePoints();



const d = 10;
console.log(d.toString(16));
// console.log(colorGeneration());
