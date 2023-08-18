// ts-node 执行

const classD: ClassDecorator = target => {
	console.log(target);
};
const propertyD: PropertyDecorator = (target, key) => {
	console.log(target, key);
};
const methodD: MethodDecorator = (target, key, desc) => {
	console.log(target, key, desc);
	// desc.value  可以获取函数本身
};
const parameterD: ParameterDecorator = (target, key, index) => {
	console.log(target, key, index);
};

@classD
class Apple {
	@propertyD
	public name: string;
	constructor() {
		this.name = 'name';
	}
	@methodD
	getName(@parameterD name: string, @parameterD age: number) {}
}

// 手动实现 get 装饰器
import axios from 'axios';

// 使用装饰器工厂（柯里化），因为装饰器默认会塞入一些参数
const Get = (url: string): MethodDecorator => {
	return (target, key, descriptor: PropertyDescriptor) => {
		const fnc = descriptor.value;
		axios
			.get(url)
			.then(res => {
				fnc(res, {
					status: 200,
				});
			})
			.catch(e => {
				fnc(e, {
					status: 500,
				});
			});
	};
};

//定义控制器
class Controller {
	constructor() {}
	@Get('https://api.apiopen.top/api/getHaoKanVideo?page=0&size=10')
	getList(res: any, status: any) {
		console.log(res.data.result.list, status);
	}
}
