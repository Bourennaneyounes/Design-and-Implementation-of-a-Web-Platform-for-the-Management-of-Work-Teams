const mongoose = require("mongoose");
const Unit = require("./modules/unit");
const User = require("./modules/user");
const Project = require("./modules/project");
const Tree = require("./modules/projectTree");

function seed(){

    Unit.deleteMany({} ,function(err ,result){
        if(err){throw err}
    });
    Project.deleteMany({} ,function(err ,result){
        if(err){throw err}
    });
    Tree.deleteMany({} ,function(err ,result){
        if(err){throw err}
    });
    
    User.deleteMany({} ,function(err ,result){
        if(err){throw err}
    });
   /* var admin = new User({
        username: "admin",
        firstName: "admin",
        lastName: "leverling11",
        name: " Leverling Janet 1",
        imageUrl: "https://raw.githubusercontent.com/bumbeishvili/Assets/master/Projects/D3/Organization%20Chart/female.jpg",
        profileUrl: "http://example.com/employee/profile",
        office: "CEO office",
        tags: "Ceo,tag1, tag2",
        isLoggedUser: false,
        unit: {},
        equipe : "4",
        positionName: "CTO ",
        events: []
    });*/
 /*   var unit0 = new Unit({
        type: "unit",
        value: "Business",
        desc: "Laoreet non curabitur gravida arcu ac tortor. Sed adipiscing diam donec adipiscing. Placerat duis ultricies lacus sed turpis tincidunt. Mi sit amet mauris commodo quis imperdiet. Curabitur vitae nunc sed velit dignissim sodales ut eu sem. Mauris pharetra et ultrices neque ornare aenean. Facilisis sed odio morbi quis commodo odio aenean sed. Montes nascetur ridiculus mus mauris vitae ultricies. Risus nec feugiat in fermentum posuere. Aliquet eget sit amet tellus cras. Tristique sollicitudin nibh sit amet commodo nulla. Tortor condimentum lacinia quis vel eros donec ac odio tempor. Vitae sapien pellentesque habitant morbi tristique senectus. Aliquam id diam maecenas ultricies mi eget mauris pharetra. Eleifend donec pretium vulputate sapien. Diam vulputate ut pharetra sit. Non pulvinar neque laoreet suspendisse interdum.",
        currentHead: {}
    });
    var unit1 = new Unit({
        type: "department",
        value: "finance department",
        desc: "Laoreet non curabitur gravida arcu ac tortor. Sed adipiscing diam donec adipiscing. Placerat duis ultricies lacus sed turpis tincidunt. Mi sit amet mauris commodo quis imperdiet. Curabitur vitae nunc sed velit dignissim sodales ut eu sem. Mauris pharetra et ultrices neque ornare aenean. Facilisis sed odio morbi quis commodo odio aenean sed. Montes nascetur ridiculus mus mauris vitae ultricies. Risus nec feugiat in fermentum posuere. Aliquet eget sit amet tellus cras. Tristique sollicitudin nibh sit amet commodo nulla. Tortor condimentum lacinia quis vel eros donec ac odio tempor. Vitae sapien pellentesque habitant morbi tristique senectus. Aliquam id diam maecenas ultricies mi eget mauris pharetra. Eleifend donec pretium vulputate sapien. Diam vulputate ut pharetra sit. Non pulvinar neque laoreet suspendisse interdum.",
        currentHead: {}
    });
    var unit2 = new Unit({
        type: "department",
        value: "department of info",
        desc: "Laoreet non curabitur gravida arcu ac tortor. Sed adipiscing diam donec adipiscing. Placerat duis ultricies lacus sed turpis tincidunt. Mi sit amet mauris commodo quis imperdiet. Curabitur vitae nunc sed velit dignissim sodales ut eu sem. Mauris pharetra et ultrices neque ornare aenean. Facilisis sed odio morbi quis commodo odio aenean sed. Montes nascetur ridiculus mus mauris vitae ultricies. Risus nec feugiat in fermentum posuere. Aliquet eget sit amet tellus cras. Tristique sollicitudin nibh sit amet commodo nulla. Tortor condimentum lacinia quis vel eros donec ac odio tempor. Vitae sapien pellentesque habitant morbi tristique senectus. Aliquam id diam maecenas ultricies mi eget mauris pharetra. Eleifend donec pretium vulputate sapien. Diam vulputate ut pharetra sit. Non pulvinar neque laoreet suspendisse interdum.",
        currentHead: {}
    });
    var user1 = new User({
        username: "leverling",
        firstName: "Janet",
        lastName: "leverling11",
        name: " Leverling Janet 1",
        imageUrl: "https://raw.githubusercontent.com/bumbeishvili/Assets/master/Projects/D3/Organization%20Chart/female.jpg",
        profileUrl: "http://example.com/employee/profile",
        office: "CEO office",
        tags: "Ceo,tag1, tag2",
        isLoggedUser: false,
        unit: {},
        equipe : "4",
        positionName: "CTO ",
        events: []
    });
    var user2 = new User({
        username: "dudeee",
        firstName: "du",
        lastName: "deee",
        name: " dude99",
        imageUrl: "https://raw.githubusercontent.com/bumbeishvili/Assets/master/Projects/D3/Organization%20Chart/female.jpg",
        area: "Corporate",
        profileUrl: "http://example.com/employee/profile",
        office: "CEO office",
        tags: "Ceo,tag1, tag2",
        isLoggedUser: false,
        unit: {},
        equipe : "2",
        positionName: "CTO ",
        events: []
    });
    var user3 = new User({
        username: "bruh",
        firstName: "bruh",
        lastName: "bruh",
        name: "bruh BRUH",
        imageUrl: "https://raw.githubusercontent.com/bumbeishvili/Assets/master/Projects/D3/Organization%20Chart/female.jpg",
        area: "Corporate",
        profileUrl: "http://example.com/employee/profile",
        office: "CEO office",
        tags: "Ceo,tag1, tag2",
        isLoggedUser: false,
        unit: {},
        equipe : "2",
        positionName: "CTO ",
        events: []
    });
    var manager = new User({
        username: "ian",
        
        firstName: "Ian",
        lastName: "Devling",
        name: "Ian Devling",
        imageUrl: "https://raw.githubusercontent.com/bumbeishvili/Assets/master/Projects/D3/Organization%20Chart/cto.jpg",
        area: "Corporate",
        profileUrl: "http://example.com/employee/profile",
        office: "CTO office",
        tags: "Ceo,tag1,manager,cto",
        isLoggedUser: false,
        unit: {},
        equipe : "1",
        positionName: "Cheaf Executive Officer ",
        events: []
    });
    var user4 = new User({
        username: "pleb",
        firstName: "pleb",
        lastName: "pleb",
        name: "pleb pleb",
        imageUrl: "https://raw.githubusercontent.com/bumbeishvili/Assets/master/Projects/D3/Organization%20Chart/female.jpg",
        profileUrl: "http://example.com/employee/profile",
        office: "CEO office",
        tags: "Ceo,tag1, tag2",
        isLoggedUser: false,
        unit: {},
        equipe : "3",
        positionName: "CTO ",
        events: []
    });
    var user5 = new User({
        username: "idiot",
        firstName: "idiot",
        lastName: "idiot",
        name: "idiot idiot",
        imageUrl: "https://raw.githubusercontent.com/bumbeishvili/Assets/master/Projects/D3/Organization%20Chart/female.jpg",
        profileUrl: "http://example.com/employee/profile",
        office: "CEO office",
        tags: "Ceo,tag1, tag2",
        isLoggedUser: false,
        unit: {},
        equipe : "3",
        positionName: "CTO ",
        events: []
    });
    var user6 = new User({
        username: "dummy",
        firstName: "dummy",
        lastName: "dummy",
        name: "dummy dummy",
        imageUrl: "https://raw.githubusercontent.com/bumbeishvili/Assets/master/Projects/D3/Organization%20Chart/female.jpg",
        profileUrl: "http://example.com/employee/profile",
        office: "CEO office",
        tags: "Ceo,tag1, tag2",
        isLoggedUser: false,
        unit: {},
        positionName: "CTO ",
        events: [],
        usedReceivedMailsStorage: 49950000000,
        usedSentMailsStorage: 49950000000
    });

    unit1.currentHead = user3;
    unit2.currentHead = user2;
    unit0.currentHead = manager;

    user1.unit = unit1;
    user2.unit = unit2;
    user3.unit = unit1;
    user4.unit = unit2;
    user5.unit = unit2;
    user6.unit = unit1;
    manager.unit = unit0;

    // user2.children.push(user4);
    // user2.children.push(user5);
    // user1.children.push(user6);
    // user3.children.push(user1);

    // manager.children.push(user2);  
    // manager.children.push(user3); 

    // user2.appendChild(user4);
    // user2.appendChild(user5);
    // user1.appendChild(user6);
    // user3.appendChild(user1);

    // manager.appendChild(user2);  
    // manager.appendChild(user3); 


    unit0.save(function(){
        console.log("unit0 saved !");
        unit1.save(function(){
            console.log("unit1 saved !");
            unit2.save(function(){
                console.log("unit2 saved !");
                user4.save(function(err ,user4){
                    console.log("user4 saved !");
                    user5.save(function(err ,user5){
                        console.log("user5 saved !");
                        user6.save(function(err ,user6){
                            console.log("user6 saved !");
                            user1.save(function(err ,user1){
                                console.log("user1 saved !");
                                user2.save(function(err ,user2){
                                    console.log("user2 saved !");
                                    user3.save(function(err ,user3){
                                        console.log("user3 saved !");
                                        manager.save(function(err ,manager){
                                            console.log("manager saved !");
                                            user2.appendChild(user4 ,function(err){
                                                console.log("appending child done");
                                                user2.appendChild(user5 ,function(err){
                                                    console.log("appending child done");
                                                    user1.appendChild(user6 ,function(err){
                                                        console.log("appending child done");
                                                        user3.appendChild(user1 ,function(err){
                                                            console.log("appending child done");
                                                            manager.appendChild(user2 ,function(err){
                                                                console.log("appending child done");
                                                                manager.appendChild(user3 ,function(err){
                                                                    console.log("everything is ready !!!");
                                                                });
                                                            });
                                                        });
                                                    });
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
    
*/    
}

module.exports = seed;