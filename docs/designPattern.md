[上一级](../)




[设计模式](pages/concept/design-pattern/index.md?id=设计模式)

###### 设计模式的六大原则
  [单一原则](SRP)
  实现类要职责单一,一个类只做一件事或者一类事，不要将功能无法划分为一类的揉到一起，答应我好吗

  [里氏替换原则](LSP) 
  不要破坏继承体系，子类可以完全替换掉他们所继承的父类，可以理解为调用父类方法的地方换成子类也可以正常执行调用，爸爸打下的江山儿子继位得无压力好吗

  [依赖倒置原则](DIP)
  我说下我的理解，如果某套功能或者业务逻辑可能之后会出现并行的另外一种模式或者较大的调整，那不如把这部分逻辑抽象出来，创建一个包含相关方法的抽象类，
  而实现类继承这个抽象类来重写抽象类中的方法，完成具体的实现，调用这些功能方法的类不需要关心自己调用的这些个方法的具体实现，只管调用这些抽象类中定义好的形式上的方法即可，
  不与实际实现这些方法的类发生直接依赖关系，方便之后的实现逻辑的替换更改；

  [接口隔离原则](ISP) 
  在设计抽象类的时候要精简单一,白话说就是，A需要依赖B提供的一些方法，A我只用B的3个方法，B就尽量不要给A用不到的方法啦；

  [迪米特法则](LoD)   
  降低耦合,尽量减少对象之间的直接的交互，如果其中一个类需要调用另一个类的某一个方法的话，可通过一个关系类发起这个调用，这样一个模块修改时，就可以最大程度的减少波及。

  [开放-封闭原则](OCP)
  告诉我们要对扩展开放，对修改关闭，你可以继承扩展我所有的能力，到你手里你想咋改咋改，但是，别 动我 本人 好吗？好的

##### 设计模式

▇▇策略模式▇▇
class StrategyPattern{
  #strategy
  #name
  setStrategyObj(obj){this.#strategy = obj}
  useStrategy(name){this.#name = name}
  // 触手API
  addStrategy(name, fn){this.#strategy[name] = fn}
  get(){return this.#strategy[this.#name]}
  run(){return this.#strategy[this.#name].apply(null, arguments)}
}
▇▇状态模式▇▇
class StatePattern{
  #state      
  setStateObj(obj){this.#state = obj}
  // 触手API
  addState(name, fn){this.#state[name] = fn}
  get(name){return this.#state[name]}
  run(name){return this.#state[name].apply(null, arguments)}
}
▇▇策略模式&状态模式混合▇▇
class StateAndStrategy{
  #DATA_LIST
  #DEFAULT
  setData(obj){this.#DATA_LIST = obj}
  setDefault(key){this.#DEFAULT = key}
  // 触手API
  addData(key, value){this.#DATA_LIST[key] = value}
  get(key){return key ? this.#DATA_LIST[key] : this.#DATA_LIST[this.#DEFAULT]}
  runDefault(){ return this.#DATA_LIST[this.#DEFAULT].apply(null, arguments) }
  runState(key){ return this.#DATA_LIST[key].apply(null, Array.prototype.slice.call(arguments, 1)) }
}



▇▇观察者模式▇▇
class StatePattern{}
// 发布订阅模式 //
class StatePattern{}



