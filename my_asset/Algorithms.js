		function newPath(str){		//产生一个精简的路径
			let first = str.indexOf("/");
			let last = str.lastIndexOf("/");
			let str1 = '';
			if (first === 0) {
				let second = str.indexOf("/",1);
				str1 = str.substring(first,second+1);
			}else{
				str1 = str.substring(0,first+1);
			}
			let str2 = str.substring(last+1,str.length);
			let new_str = str1 + str2;
			return new_str;
		}

		function myRandom(arr){		//打乱一个数组
			let len = arr.length;
			let random_index = Math.floor(Math.random()*len);
			let randoms = [];
			let new_arr = [];
			while(arr.length!==0){
				if(random_index in arr){
					let last = arr.length-1;
					let temp = arr[last];
					arr[last] = arr[random_index];
					arr[random_index] = temp;
					new_arr.push(arr[last]);
					arr.pop();
					random_index = Math.floor(Math.random()*len);
				}else{
					random_index = Math.floor(Math.random()*len);
				}
			}
			console.log(new_arr)
			console.log(arr);
		}

		function temp(arr){	//数组成员进行笛卡尔乘积（排列组合）
			let a = arr[0];
			let new_arr = [];
			for (var i = 0; i < a.length; i++) {
				for(let j = 1;j<arr.length;j++){
					for(let k = 0;k<arr[j].length;k++){
						let b = arr[j];
						let c = a[i] + b[k];
						new_arr.push(c);
					}
				}
			}
			console.log(new_arr);
		}

		//已知一个字符串形式的四则运算，计算其结果（最优：逆波兰表达式？）
        function compute() {
            let str = "9/9*2*3+4";
            let reg = /\D/g;
            //1、找出str中所有运算符,存入syms
            let syms = str.match(reg)
            console.log(syms);
            //2、找出str中所有数字，存入numbers
            let numbers = str.split(reg);
            for (var i = 0; i < numbers.length; i++) {
                numbers[i] = parseInt(numbers[i]);
            }
            console.log(numbers)

            //3、根据syms中的运算符，取出numbers中的数字计算，然后替换从numbers中取出的数字
            function cal(numbers, syms) {
                //先判断有无乘除法，有就先计算乘除法
                let a = syms.indexOf('*');
                let b = syms.indexOf('/');
                if (a !== -1 && b !== -1) {
                    if (a < b) {
                        let result = numbers[a] * numbers[a + 1];
                        numbers.splice(a, 2, result);
                        syms.splice(a, 1);
                        cal(numbers, syms);
                    } else {
                        let result = numbers[b] / numbers[b + 1];
                        console.log(result)
                        numbers.splice(b, 2, result);
                        syms.splice(b, 1);
                        cal(numbers, syms);
                    }
                }
                if (a !== -1) {
                    let result = numbers[a] * numbers[a + 1];
                    numbers.splice(a, 2, result);
                    syms.splice(a, 1);
                    cal(numbers, syms);
                } else if (b !== -1) {
                    let result = numbers[b] / numbers[b + 1];
                    console.log(result)
                    numbers.splice(b, 2, result);
                    syms.splice(b, 1);
                    cal(numbers, syms);
                } else {//完成乘除法后计算加减法
                    while (numbers.length > 1) {
                        if (syms[0] == '+') {
                            let result = numbers[0] + numbers[1];
                            numbers.splice(0, 2, result);
                            syms.splice(0, 1);
                        } else {
                            let result = numbers[0] - numbers[1];
                            numbers.splice(0, 2, result);
                            syms.splice(0, 1);
                        }
                    }
                    console.log(numbers)
                    console.log(numbers[0])
                    return numbers[0];
                }
            }

            cal(numbers, syms)
        }