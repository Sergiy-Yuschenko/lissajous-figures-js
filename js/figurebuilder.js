


// ----------ДАНІ ДЛЯ ВИБОРУ СХЕМ РАНДОМНОГО ПІДБОРУ ПАРАМЕТРІВ ФІГУРИ ТА ЇЇ ПОБУДОВИ

const datasetting = {
    iterationСonst: 200,
    figureColor: '#000000',
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

//--------ВИЗНАЧЕННЯ ШИРИНИ ЕКРАНУ ТА ПОБУДОВА ПОЛЯ SVG ДЛЯ ФІГУРИ
const figuresContainerEl = document.querySelector('.figures-container');
let getAreaWidth = window.innerWidth * 0.5; //отримання розміру поля для фігури по ширині вьюпорта
const makeAreaSvg = (data,colour) => { //Функція для побудови поля для фігури
    figuresContainerEl.insertAdjacentHTML('afterbegin', `<svg width="${getAreaWidth}" height="${getAreaWidth}" style="outline: 4px solid #000000;" class="figure"></svg>`);
    figuresContainerEl.firstElementChild.insertAdjacentHTML('afterbegin', `<polygon points="${data}" fill="transparent" stroke="${colour}" stroke-width="2" />`);
}


makeAreaSvg("0,0 1,1", "transparent"); //Виконання функції для побудови поля для фігури

/*------ОБ'ЄКТ ДЛЯ ПРИЙОМУ ТА ПОТОЧНОГО ЗБЕРІГАННЯ ПАРАМЕТРІВ ФІГУРИ, ПАРАМЕТРІВ ЇЇ ПОБУДОВИ
        ТА ДЕЯКИХ МЕТОДІВ ДЛЯ ЇХ ОБРОБКИ ---------*/

const figureData = {
    frequencyX: 0, //Частота коливань по осі X
    frequencyY: 0, //Частота коливань по осі Y
    phaseShiftX: 0, //Зсув фаз по осі X
    phaseShiftY: 0, //Зсув фаз по осі Y
    iterationСonst: datasetting.iterationСonst,
    numberOfIterations: function () { //метод для розрахунку числа ітерацій
        return  this.iterationСonst * this.frequencyX + this.iterationСonst * this.frequencyY;     
    },
    iterationStep: function () { //метод для розрахунку кроку ітерації
        return 2 * Math.PI / this.numberOfIterations();
    },
    frequency: function () { //функція для оптимізації частоти коливань по осі X та У, щоб фігура не будувалася декілька разів підряд.
        let counter; /*Кількість циклів*/
        // for (let i = 1; i <= 100; i +=1) { 
            if (this.frequencyX >= this.frequencyY) {
                counter = this.frequencyY;
            } else {
                counter = this.frequencyX;
            }
            for (let i = counter; i >= 2; i -= 1) {
                if (this.frequencyX % i === 0 && this.frequencyY % i === 0) {
                    this.frequencyY = this.frequencyY / i;
                    this.frequencyX = this.frequencyX / i;
                }
            }
        // }
    },   
}

/*-------------------ФУНКЦІЇ ПОТРІБНІ ДЛЯ ПЕРЕДПІДГОТОВКИ ТА ПОБУДОВИ ФІГУРИ----------*/
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

/*------------------СТВОРЕННЯ ЕЛЕМЕНТІВ ДЛЯ ВИВОДУ ДАНИХ---------------*/
    const parameterListEl = document.querySelector('.parameter-list');
    parameterListEl.insertAdjacentHTML('beforeend', `<li class="parameter-list__list-item">wx = ${figureData.frequencyX} ;</li>`);
    parameterListEl.insertAdjacentHTML('beforeend', `<li class="parameter-list__list-item">wy = ${figureData.frequencyY} ;</li>`);
    parameterListEl.insertAdjacentHTML('beforeend', `<li class="parameter-list__list-item">&#8509x; = ${figureData.phaseShiftX} ;</li>`);
    parameterListEl.insertAdjacentHTML('beforeend',`<li class="parameter-list__list-item">&#8509y; = ${figureData.phaseShiftY}</li>`);



/*------------фУНКЦІЯ ДЛЯ ПОБУДОВИ ФІГУРИ ЗА ДАНИМИ З ОБ'ЄКТУ figureData-------------*/

const calculateFigurePoints = () => { //Функція для розрахунку точок фігури Лісажу, побудови фігури за цими точками та виведення параметрів
    figureData.frequency(); //Виконання методу об'єкту figureData по оптимізації його даних
    let figureDataString = ""; //Оголошуємо змінну для додавання та зберігання координат точок фігури під час роботи цієї функції
    let oscillationTime = 0; //Оголошуємо змінну для зберігання поточного значення часу коливань.
    for (let i = 1; i <= figureData.numberOfIterations(); i += 1) { //Цикл для розрахунку координат точок фігури
        figureDataString += `${getСoordinatePoint(oscillationTime, figureData.frequencyX, figureData.phaseShiftX)},${getСoordinatePoint(oscillationTime, figureData.frequencyY, figureData.phaseShiftY)} `; //Розрахунок координати X та Y поточної точки та додавання їх до рядка з координатами точок фігури
        oscillationTime += figureData.iterationStep(); //Збільшення часу коливань на один крок
    }
    figuresContainerEl.removeChild(figuresContainerEl.firstElementChild); //Видалення контейнеру з попередньою фігурою
    makeAreaSvg(figureDataString, datasetting.figureColor); //Створення контейнеру з новою фігурою по розрахованих данних
    //Виведення параметрів побудованої фігури у відповідні елементи списку над нею на сторінці
    parameterListEl.firstElementChild.textContent =`wx = ${figureData.frequencyX} ;`;
    parameterListEl.firstElementChild.nextElementSibling.textContent =`wy = ${figureData.frequencyY} ;`;
    parameterListEl.lastElementChild.previousElementSibling.textContent =`ℽx; = ${figureData.phaseShiftX} ;`;
    parameterListEl.lastElementChild.textContent =`ℽy; = ${figureData.phaseShiftY}`;
}



/*------------ПОБУДОВА РАНДОМНОЇ ФІГУРИ (МЕТОД 1)-------------*/

/*------------ВИБІР ЕЛЕМЕНТІВ ФОРМИ----------------------*/
const methodNameEl = document.querySelector('.js-method-description'); //Знаходимо елемент з назвою методу

const chooseFirstMethodEl = document.querySelector('.choose-first-method'); //Знаходимо радіо-кнопку першого методу
const chooseSecondMethodEl = document.querySelector('.choose-second-method'); //Знаходимо радіо-кнопку другого методу
const firstMethodEl = document.querySelector('.js-method-first'); //Знаходимо блок форми першого методу
const secondMethodEl = document.querySelector('.js-method-second'); //Знаходимо блок форми другого методу
const buttonFirstEl = document.querySelector('.js-button-first'); //Знаходимо кнопку побудови фігури першим методом
const buttonSecondEl = document.querySelector('.js-button-second');  //Знаходимо кнопку побудови фігури другим методом
//Слухачі на поля вводу параметрів фігури при побудові методом 2
const frequencyXInputEl = document.querySelector('[data-name = frequency-x]'); //Знаходимо елемент поля вводу частоти по осі x
const frequencyYInputEl = document.querySelector('[data-name = frequency-y]'); //Знаходимо елемент поля вводу частоти по осі y
const phaseShiftXInputEl = document.querySelector('[data-name = phaseShift-x]'); //Знаходимо елемент поля вводу зсуву фаз по осі x
const phaseShiftYInputEl = document.querySelector('[data-name = phaseShift-y]'); //Знаходимо елемент поля вводу зсуву фаз по осі y
const figureColorInputEl = document.querySelector('[data-name = figure-color]'); //Знаходимо елемент поля вибору кольору



/*------------------ВИБІР ПЕРШОГО МЕТОДУ------------------*/
const chooseFirstMethod = () => { //Функція для вибору методу 1
    if (firstMethodEl.classList.contains('hidden')) { //Якщо на елементі формули налаштування першого методу є клас "hidden" видаляємо слухач кнопки другого методу для побудови фігури
        buttonSecondEl.removeEventListener('click', buildingFigureMethodSecond); //Видаляємо слухач з кнопки другого методу для побудови фігури
    }
    
    methodNameEl.textContent = 'Побудова випадкової фігури'; //Записуємо назву метода у відповідний елемент параграфа
    if (firstMethodEl.classList.contains('hidden')) { //Якщо на елементі формули налаштування першого методу є клас "hidden" видаляємо наступні слухачі
        frequencyXInputEl.removeEventListener('input', addDataToSessionStorage); //Видаляємо слухач на поле вводу частоти по осі x
        frequencyYInputEl.removeEventListener('input', addDataToSessionStorage); //Видаляємо слухач на поле вводу частоти по осі y
        phaseShiftXInputEl.removeEventListener('input', addDataToSessionStorage); //Видаляємо слухач на поле вводу зсуву фаз по осі x
        phaseShiftYInputEl.removeEventListener('input', addDataToSessionStorage); //Видаляємо слухач на поле вводу зсуву фаз по осі y
        figureColorInputEl.removeEventListener('input', addDataToSessionStorage); //Видаляємо слухач на поле вибору кольору
        secondMethodEl.removeEventListener('click', checkDataFilling); //Додаємо слухач форму другого методу
    }
    

    if (firstMethodEl.classList.contains('hidden')) { //Якщо блок форми першого методу приховано, робимо його явним
        firstMethodEl.classList.remove('hidden');
    }
    secondMethodEl.classList.add('hidden');
    buttonFirstEl.addEventListener('click', buildingFigureMethodFirst);
}

const buildingFigureMethodFirst = () => { //Функція для побудови фігури з параметрами обраними по методу 1
    datasetting.figureColor = colorGeneration();
    generateData(datasetting.figParamForRandom); //Виконання функції для вибору рандомних параметрів фігури
    calculateFigurePoints();
    console.log(figureData);
}
// generateData(datasetting.figParamForRandom);
//Виконуємо цю функцію перший раз
chooseFirstMethod(); //Перше виконання функції вибору методу 1 при старті

chooseFirstMethodEl.addEventListener('change', chooseFirstMethod); //Додаємо слухач на кнопку першого методу для побудови фігури

/*------------ПОБУДОВА ФІГУРИ ПО ПАРАМЕТРАМ ВВЕДЕНИМ ВРУЧНУ (МЕТОД 2)-------------*/
/*------------------ВИБІР ДРУГОГО МЕТОДУ------------------*/


const checkDataFilling = () => { //функція для перевірки введення повноти всіх даних
    //Якщо всі дані є в sessionStorage (тобто кожне поле з параметром заповнене) то
    if (sessionStorage.getItem('frequency-x') && sessionStorage.getItem('frequency-y') && sessionStorage.getItem('frequency-x') && sessionStorage.getItem('phaseShift-x') && sessionStorage.getItem('phaseShift-y') && sessionStorage.getItem('figure-color')) {
        //Якщо кнопка для побудови фігури другим методом вимкнута, вмикаємо її
        if (buttonSecondEl.hasAttribute('disabled')) {
            buttonSecondEl.removeAttribute('disabled');
        }
    } else { //Якщо якесь із данних було видалено - вимикаємо кнопку для побудови фігури методом 2
        buttonSecondEl.disabled = 'true';
    }
}

function addDataToSessionStorage(element) { //Функція для додавання данних з поля вводу у відповідний запис sessionStorage для їх зберігання там
    sessionStorage.setItem(element.srcElement.dataset.name, element.target.value);
    checkDataFilling();
}

const chooseSecondMethod = () => {
    methodNameEl.textContent = 'Побудова заданої вручну фігури'; //Записуємо назву метода у відповідний елемент параграфа
    buttonFirstEl.removeEventListener('click', buildingFigureMethodFirst); //Видаляємо слухач з кнопки першого методу для побудови фігури
    
    if (secondMethodEl.classList.contains('hidden')) { //Якщо на елементі формули налаштування другого методу є клас "hidden" видаляємо його
        secondMethodEl.classList.remove('hidden');
    }
    firstMethodEl.classList.add('hidden'); // Додаємо клас "hidden" на елемент форми першого методу

    frequencyXInputEl.value = sessionStorage.getItem('frequency-x'); //Повертаємо назад у поле вводу значення  частоти по осі x із SessionStorage
    frequencyYInputEl.value = sessionStorage.getItem('frequency-y'); //Повертаємо назад у поле вводу значення частоти по осі y із SessionStorage
    phaseShiftXInputEl.value = sessionStorage.getItem('phaseShift-x'); //Повертаємо назад у  поле вводу значення зсуву фаз по осі x із SessionStorage
    phaseShiftYInputEl.value = sessionStorage.getItem('phaseShift-y'); //Повертаємо назад у поле вводу значення зсуву фаз по осі y із SessionStorage
    figureColorInputEl.value = sessionStorage.getItem('figure-color'); //Повертаємо назад у поле вибору значення кольору із SessionStorage
    if (sessionStorage.getItem('frequency-x') && sessionStorage.getItem('frequency-y') && sessionStorage.getItem('frequency-x') && sessionStorage.getItem('phaseShift-x') && sessionStorage.getItem('phaseShift-y') && sessionStorage.getItem('figure-color')) {
        if (buttonSecondEl.hasAttribute('disabled')) {
            buttonSecondEl.removeAttribute('disabled');
        }
    }

    frequencyXInputEl.addEventListener('input', addDataToSessionStorage); //Додаємо слухач на поле вводу частоти по осі x для внесення даних в SessionStorage
    frequencyYInputEl.addEventListener('input', addDataToSessionStorage); //Додаємо слухач на поле вводу частоти по осі y для внесення даних в SessionStorage
    phaseShiftXInputEl.addEventListener('input', addDataToSessionStorage); //Додаємо слухач на поле вводу зсуву фаз по осі x для внесення даних в SessionStorage
    phaseShiftYInputEl.addEventListener('input', addDataToSessionStorage); //Додаємо слухач на поле вводу зсуву фаз по осі y для внесення даних в SessionStorage
    figureColorInputEl.addEventListener('input', addDataToSessionStorage); //Додаємо слухач на поле вибору кольору для внесення даних в SessionStorage

    secondMethodEl.addEventListener('click', checkDataFilling); //Додаємо слухач форму другого методу для перевірки данних внесених в SessionStorage

 
    buttonSecondEl.addEventListener('click', buildingFigureMethodSecond); //Додаємо слухач на кнопку другого методу для побудови фігури

}

const buildingFigureMethodSecond = () => { //Функція побудови фігури другим методом
    //перенос параметрів фігури з sessionStorage в об'єкт для прийому та поточного зберігання параметрів фігури figureData
    figureData.frequencyX = Number(sessionStorage.getItem('frequency-x'));
    figureData.frequencyX = Number(sessionStorage.getItem('frequency-x'));
    figureData.frequencyY = Number(sessionStorage.getItem('frequency-y'));
    figureData.phaseShiftX = Number(sessionStorage.getItem('phaseShift-x'));
    figureData.phaseShiftY = Number(sessionStorage.getItem('phaseShift-y'));
    datasetting.figureColor = sessionStorage.getItem('figure-color');
    // transferData(); //зчитуємо дані з SessionStorage та заносимо у відповідні поля об'єкту datasetting
    calculateFigurePoints(); //Будуємо фігуру по перенесених даних, які до того були введені вручну та потрапили в sessionStorage
}


chooseSecondMethodEl.addEventListener('change', chooseSecondMethod); //

/*------------ПОБУДОВА ЗАДАНОЇ ФІГУРИ (МЕТОД 2)-------------*/
