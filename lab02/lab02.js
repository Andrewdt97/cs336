// Andrew Thomas
// CS336 Lab02
// Person class and Student class that then inherits from Person

console.log("This is the person code:\n");

function Person(name, bDay) {
	this.name = name;
	this.birthday = bDay;
	this.friends = []
}

Person.prototype.changeName = function(newName)
{
	this.name = newName;
}

Person.prototype.computeAge = function()
{
	return Math.floor((Date.now() - this.birthday) / 31536000000); // Date difference devided my the number of miliseconds in a year
}

Person.prototype.addFriend = function(newFriend)
{
	this.friends.push(newFriend);
}

Person.prototype.greeting = function()
{
	console.log("I'm a person");
}

var p1 = new Person("Andrew", new Date("1997-07-11"));
p1.addFriend(new Person("Lucas", new Date()))

console.log(p1.computeAge());
console.log("\n");
console.log(p1.friends)
console.log("\n");
p1.greeting();

console.log("\n\nThis is the student code:\n");

function Student(name, bDay, subject)
{
	Person.call(this, name, bDay);
	this.subject = subject;
}

Student.prototype = Object.create(Person.prototype);
Student.prototype.greeting = function()
{
	console.log("I'm a student");
}

var s1 = new Student("Michael", new Date("1998-05-25"), "Math education");
s1.addFriend(p1);

console.log(s1.computeAge());
console.log("\n");
console.log(s1.friends);
console.log("\n");
s1.greeting();