'use strict'

let startBtn = document.getElementById('start'),
		budgetValue = document.getElementsByClassName('budget-value')[0],
		daybudgetValue = document.getElementsByClassName('daybudget-value')[0],
		levelValue = document.getElementsByClassName('level-value')[0],
		expensesValue = document.getElementsByClassName('expenses-value')[0],
		optionalexpensesValue = document.getElementsByClassName('optionalexpenses-value')[0],
		incomeValue = document.getElementsByClassName('income-value')[0],
		monthsavingsValue = document.getElementsByClassName('monthsavings-value')[0],
		yearsavingsValue = document.getElementsByClassName('yearsavings-value')[0],
		expensesItem = document.getElementsByClassName('expenses-item'),
		expensesBtn = document.getElementsByTagName('button')[0],
		optionalExpensesBtn = document.getElementsByTagName('button')[1],
		countBtn = document.getElementsByTagName('button')[2],
		optionalexpensesItem = document.querySelectorAll('.optionalexpenses-item'),
		incomeItem = document.querySelector('.choose-income'),
		checkSavings = document.querySelector('#savings'),
		sumValue = document.querySelector('.choose-sum'),
		percentValue = document.querySelector('.choose-percent'),
		yearValue = document.querySelector('.year-value'),
		monthValue = document.querySelector('.month-value'),
		dayValue = document.querySelector('.day-value');

console.log(daybudgetValue);
console.log(expensesValue);

let money, time;

expensesBtn.disabled = true;
optionalExpensesBtn.disabled = true;
countBtn.disabled = true;

startBtn.addEventListener('click', function(){
	time = prompt('Введите дату в формате YYYY-MM-DD', '');
	money = +prompt("Ваш бюджет на месяц?", '');

	while(isNaN(money) || money == "" || money == null) {
		money = +prompt("Ваш бюджет на месяц?", '');

	}
	appData.budget = money;
	appData.timeData = time;
	budgetValue.textContent = money.toFixed();
	yearValue.value = new Date(Date.parse(time)).getFullYear();
	monthValue.value = new Date(Date.parse(time)).getMonth() + 1;
	dayValue.value = new Date(Date.parse(time)).getDate();
	expensesBtn.disabled = false;
	optionalExpensesBtn.disabled = false;
	countBtn.disabled = false;
});


expensesBtn.addEventListener('click', function(){
	let sum = 0;
	for ( let i = 0; i < expensesItem.length; i++) {
		let a = expensesItem[i].value,
				b = expensesItem[++i].value;
		
		if ((typeof(a))=== 'string' && (typeof(a)) !=null && (typeof(b)) !=null
			&& a != '' && b != '' && a.length < 50) {
				console.log("done")
	
			appData.expenses[a] = b;
			sum += +b;
		}else {
			i=i-1;
		}
	
	}
	expensesValue.textContent = ' ' + sum;

});

optionalExpensesBtn.addEventListener('click', function(){
	for (let i = 0; i < optionalexpensesItem.length; i++) {
		let Opt = optionalexpensesItem[i].value;
		appData.optionalExpenses[i] = Opt;
		optionalexpensesValue.textContent += appData.optionalExpenses[i] + ' ';
		
	}
});

countBtn.addEventListener('click', function(){
	if (appData.budget != undefined) {
		appData.moneyPerDya = ((appData.budget - +expensesValue.textContent) / 30).toFixed();
		daybudgetValue.textContent = appData.moneyPerDya;
	
		if(appData.moneyPerDya < 100) {
			levelValue.textContent = "Минимальный уровень достатка";
		}else if (appData.moneyPerDya > 100 && appData.moneyPerDya < 2000) {
			levelValue.textContent = "Средний уровень достатка";
		}else if (appData.moneyPerDya > 2000) {
			levelValue.textContent = "Высокий уровень достатка";
		}else {
			levelValue.textContent = "Произошла ошибка";
		}

	}else {
		daybudgetValue.textContent = 'Введите месячный бюджет'
	}


});
let appData = {
	budget: money,
	expenses: {},
	optionalExpenses: {},
	income: [],
	timeData: time,
	savings: true,
	chooseeExpenses: function() {
		
		
	},
	checkSavings: function() {
		if (appData.savings == true) {
			let save = +prompt("Какова сумма накоплений?"),
					percent = +prompt ("Под какой процент?");

			appData.monthIncome = save/100/12*percent;
			alert("Доход в месяц с вашего депозита" + appData.monthIncome);
		}
	},
	chooseOptExpenses: function() {

	},
	chooseeIncome: function() {
		let items = prompt("Что принесет дополнительный доход? (Перечислете через запятую)", "");
		if (typeof(items) != "string" || items == "" || typeof(items) == null) {
			console.log("Вы ввели некорректные данные или не ввели их вовсе");
		}else {
			appData.income = items.split(', ');
			appData.income.push(prompt("Может что то еще?"));
			appData.income.sort();
		}

		appData.income.forEach(function(itemmassive, i){50
			alert("Способы доп. заработка: " + (i+1) + " - " + itemmassive);
		});


	},
	
};

// for (let key in appData) {
// 	console.log("Наша программа включает в себя данные: " + key + " - " + appData[key]);
// }
