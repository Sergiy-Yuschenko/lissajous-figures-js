const figureEl = document.querySelector('.figure');




const figureData = {
    frequencyX: 60, //Частота коливань по осі X
    frequencyY: 80, //Частота коливань по осі Y
    phaseShiftX: 1, //Зсув фаз по осі X
    phaseShiftY: 1, //Зсув фаз по осі Y
    iterationСonst: 200,
    numberOfIterations: function () { //метод для розрахунку числа ітерацій
        return  this.iterationСonst * this.frequencyX + this.iterationСonst * this.frequencyY;     
    },
    iterationStep: function () { //метод для розрахунку кроку ітерації
        return Math.PI / this.numberOfIterations();
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

const makeFigure = () => {
    сщтіе
}




console.log(figureData.frequencyY);



